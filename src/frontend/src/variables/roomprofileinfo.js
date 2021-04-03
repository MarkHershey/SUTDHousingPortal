import {getUsername,checkValidity, getToken} from "./localstorage";
import axios from "axios";
import {url} from "./url";

export var room_type = "string";
export var room_type_2nd = "string";
export var block = "stirng";
export var block_2nd = "string";
export var level_range = "string";
export var window_facing = "string";
export var near_to_lift = false;
export var near_to_washroom = false;
export var level_has_pantry = false;
export var level_has_mr = false;
export var level_has_gsr = false;
export var level_has_rr = false;
export var weightage_order = []; // list of int


export async function updateRoomProfileInfo(room_type,room_type_2nd,block,block_2nd,level_range,
    window_facing,near_to_lift,near_to_washroom,level_has_pantry,level_has_mr,level_has_gsr,
    level_has_rr,weightage_order){
      if (!checkValidity()) return undefined;
      var data = JSON.stringify({"room_type":room_type,"room_type_2nd":room_type_2nd,
      "block":block,"block_2nd":block_2nd,"level_range":level_range,"window_facing":window_facing,
      "near_to_lift":near_to_lift,"near_to_washroom":near_to_washroom,"level_has_pantry":level_has_pantry,"level_has_mr":level_has_mr,
      "level_has_gsr":level_has_gsr,"level_has_rr":level_has_rr,"weightage_order":[1,2,3,4,5,6,7,8,9]});
      
      var config = {
         method: 'put',
         url: url+'/api/students/'+getUsername()+'/update_room_profile',
         headers: { 
            'accept': 'application/json', 
            'Authorization': 'Bearer '+getToken(), 
            'Content-Type': 'application/json'
         },
         data : data
      };
      
      axios(config)
      .then(function (response) {
         console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
         console.log(error);
      });
}
