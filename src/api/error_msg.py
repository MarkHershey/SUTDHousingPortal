class ErrorMsg:
    UNEXPECTED = "Unexpected Error Occurred Here."
    EMPTY_LIST = "ZERO items found."
    ITEM_NOT_FOUND = "Requested item not found."
    TARGET_ITEM_NOT_FOUND = "Target item not found."
    DB_QUERY_ERROR = "Failed to query the database."
    DB_UPDATE_ERROR = "Failed to update the database."
    PERMISSION_ERROR = "Sorry, You do not have permission to access and/or update this."
    DEL_REF_COUNT_ERR = "Unable to delete item due to non-zero reference count."
    INVALID_APPLICATION = "Invalid Application."
    INVALID_PRE_STATUS = "Unsatisfied pre-status requirement."
    INVALID_STATUS_UPDATE_REQ = "Invalid application status update request."
    NOT_YOUR_AF = "Failed. Not your application."
    NO_AVAILABLE_SLOTS = "Failed. Not enough slots."

    @staticmethod
    def permission_denied_msg(username: str) -> str:
        return f"User ({str(username)}) access denied due to insufficient permissions."
