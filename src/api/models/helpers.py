from markkk.logger import logger
from markkk.time import timestamp_microseconds


def uid_gen(prefix: str = "") -> str:
    """
    Generate an unique identifier containing an optional prefix
    and current timestamp in microseconds.
    """
    uid: str = timestamp_microseconds()
    if prefix and isinstance(prefix, str):
        return prefix.strip().upper() + "_" + uid
    else:
        return uid
