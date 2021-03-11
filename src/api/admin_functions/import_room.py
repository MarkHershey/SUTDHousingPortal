import pandas as pd 

import sys
import os
sys.path.append(os.path.abspath('../models'))
from room import Room

def import_room(file):
    room_info = pd.read_excel(file)
    room_info.fillna('', inplace=True)
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

if __name__ == '__main__':
    room_list = import_room(r'./rooms_dummy_data.xlsx')
    print(room_list)