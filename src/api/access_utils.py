from fastapi import HTTPException
from markkk.logger import logger

from .database import admins_collection, students_collection
from .error_msg import ErrorMsg as MSG


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
        except Exception as e:
            logger.error(MSG.DB_QUERY_ERROR)
            logger.error(e)
            raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)
        if student_info:
            return True
        return False

    @staticmethod
    def is_student_hg(username: str) -> bool:
        """ Check if the given username is an existing Student House Guardian """
        try:
            student_info: dict = students_collection.find_one({"username": username})
        except Exception as e:
            logger.error(MSG.DB_QUERY_ERROR)
            logger.error(e)
            raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)
        if student_info and student_info.get("is_house_guardian", False):
            return True
        return False

    @staticmethod
    def is_admin(username: str) -> bool:
        try:
            admin_info: dict = admins_collection.find_one({"username": username})
        except Exception as e:
            logger.error(MSG.DB_QUERY_ERROR)
            logger.error(e)
            raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)
        if admin_info:
            return True
        return False

    @staticmethod
    def is_admin_write(username: str) -> bool:
        try:
            admin_info: dict = admins_collection.find_one({"username": username})
        except Exception as e:
            logger.error(MSG.DB_QUERY_ERROR)
            logger.error(e)
            raise HTTPException(status_code=500, detail=MSG.DB_QUERY_ERROR)
        if admin_info and admin_info.get("read_only", True) == False:
            return True
        return False

    @staticmethod
    def at_least_student_hg_write(username: str) -> bool:
        if Access.is_student_hg(username):
            return True

        if Access.is_admin_write(username):
            return True

        return False
