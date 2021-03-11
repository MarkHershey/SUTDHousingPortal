from fastapi import HTTPException
from markkk.logger import logger

from .database import admins_collection, students_collection


def clean_dict(data: dict) -> None:
    if data is None:
        return
    if not isinstance(data, dict):
        raise TypeError("Not a dictionary.")

    data.pop("_id", None)
    data.pop("password", None)

    return


class Access:
    """
    Access Permission Levels:
    1. student
    2. student-hg
    3. admin (admin-read or admin-write)
    4. admin-write
    """

    @staticmethod
    def is_student(username: str) -> bool:
        """ Check if the given username is an existing Student in the database """
        try:
            student_info: dict = students_collection.find_one({"username": username})
            if student_info:
                return True
            return False
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    @staticmethod
    def is_student_hg(username: str) -> bool:
        """ Check if the given username is an existing Student House Guardian """
        try:
            student_info: dict = students_collection.find_one({"username": username})
            if student_info and student_info.get("is_house_guardian", False):
                return True
            return False
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    @staticmethod
    def is_admin(username: str) -> bool:
        try:
            admin_info: dict = admins_collection.find_one({"username": username})
            if admin_info:
                return True
            return False
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    @staticmethod
    def is_admin_write(username: str) -> bool:
        try:
            admin_info: dict = admins_collection.find_one({"username": username})
            if admin_info and admin_info.get("read_only", True) == False:
                return True
            return False
        except Exception as e:
            logger.error("Failed to query database.")
            logger.error(e)
            raise HTTPException(status_code=500, detail="Databse Error.")

    @staticmethod
    def at_least_student_hg_write(username: str) -> bool:
        if Access.is_student_hg(username):
            return True

        if Access.is_admin_write(username):
            return True

        return False
