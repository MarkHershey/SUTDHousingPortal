from typing import List

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


def clean_dict(data: dict) -> None:
    if not isinstance(data, dict):
        logger.warning(f"Not a dictionary: {type(data)}")
        return

    data.pop("_id", None)
    data.pop("password", None)

    return


def remove_none_value_keys(data: dict) -> None:
    to_be_removed_keys = []
    for key, value in data.items():
        if value is None:
            to_be_removed_keys.append(key)

    for key in to_be_removed_keys:
        data.pop(key, None)

    return


def deduct_list_from_list(host_list: List[str], deduct_list: List[str]) -> None:
    for i in deduct_list:
        # make sure no duplications
        while i in host_list:
            host_list.remove(i)
    return