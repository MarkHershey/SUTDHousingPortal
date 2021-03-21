import sys
from pathlib import Path
from pprint import pprint

import pandas as pd

api_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(api_dir))

from models.room import Room


def import_room(file):
    room_info = pd.read_excel(file, engine="openpyxl")
    room_info.fillna("", inplace=True)
    room_info = room_info.to_dict()

    number_of_rooms = len(list(room_info.values())[0])

    key_list = []
    for key in room_info:
        key_list.append(key)

    rooms = []
    for i in range(number_of_rooms):
        r = Room(
            uid=room_info[key_list[0]][i],
            room_type=room_info[key_list[1]][i],
            block=room_info[key_list[2]][i],
            level=room_info[key_list[3]][i],
            location_idx=room_info[key_list[4]][i],
        )
        rooms.append(r)
    return rooms


if __name__ == "__main__":
    STUDENT_DATA_FILEPATH = Path("templates/rooms_dummy_data.xlsx").resolve()
    assert STUDENT_DATA_FILEPATH.is_file()

    room_list = import_room(str(STUDENT_DATA_FILEPATH))
    pprint(room_list)
