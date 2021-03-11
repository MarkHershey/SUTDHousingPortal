class Event{
    constructor(uid,title,event_type,description,start_time,duration,count,
        floor,block,signups,attendance){
        this.uid = uid;
        this.title = title;
        this.event_type = event_type;
        this.description = description;
        this.start_time = start_time;
        this.duration = duration;
        this.count = count;
        this.floor = floor;
        this.block = block;
        this.signups = signups;
        this.attendance = attendance; 
    }
    getEnd_time = function(){
        //To do
        //uses start time and duration to get a end time
        return "18:00";
    }
}

module.exports = Event;