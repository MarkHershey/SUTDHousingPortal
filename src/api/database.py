import pymongo
from markkk.logger import logger

try:
    from .db_secrete import _DB_NAME, _DB_PASS, _DB_USER
except ImportError:
    _DB_USER = "REPLACE_ME"
    _DB_PASS = "REPLACE_ME"
    _DB_NAME = "REPLACE_ME"

logger.info(
    f"""-----------------------------------
            MongoDB config:
            
            User: {_DB_USER}
            Database Name: {_DB_NAME}
         -----------------------------------
"""
)


_client = pymongo.MongoClient(
    f"mongodb+srv://{_DB_USER}:{_DB_PASS}@clusteresc.xvunj.mongodb.net/{_DB_NAME}?retryWrites=true&w=majority"
)
db = _client[f"{_DB_NAME}"]
