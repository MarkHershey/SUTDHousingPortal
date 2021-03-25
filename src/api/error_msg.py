class ErrorMsg:
    EMPTY_LIST = "ZERO items found."
    ITEM_NOT_FOUND = "Requested item not found."
    TARGET_ITEM_NOT_FOUND = "Target item not found."
    DB_QUERY_ERROR = "Failed to query the database."
    DB_UPDATE_ERROR = "Failed to update the database."
    PERMISSION_ERROR = "Sorry, You do not have permission to access and/or update this."

    @staticmethod
    def permission_denied_msg(username: str) -> str:
        return f"User ({str(username)}) access denied due to insufficient permissions."
