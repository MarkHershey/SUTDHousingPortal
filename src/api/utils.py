def clean_dict(data: dict) -> None:
    if data is None:
        return
    if not isinstance(data, dict):
        raise TypeError("Not a dictionary.")

    data.pop("_id", None)
    data.pop("password", None)

    return
