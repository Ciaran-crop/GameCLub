let SP_GAME_OBJECTS = []

class SPGameObject {
    constructor(){
        SP_GAME_OBJECTS.push(this);

        this.is_called_start = false;
        this.timedelta = 0;

        this.uuid = this.create_uuid();

    }

    create_uuid(){
        let res = "";
        for(let i = 0;i < 8; i++){
            res += Math.floor(Math.random() * 10);
        }
        return res;
    }

    start() { // 第一帧执行

    }

    update(){ // 后续每一帧执行一次

    }

    late_update(){

    }

    on_destroy(){ // 删除之前的操作

    }

    destroy(){ // 删除对象
        this.on_destroy();
        for(let i = 0;i < SP_GAME_OBJECTS.length; i++){

            if(SP_GAME_OBJECTS[i] === this){
                SP_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let SP_GAME_ANIMATION = function(timestamp){
    for(let i = 0;i < SP_GAME_OBJECTS.length;i ++){
        let obj = SP_GAME_OBJECTS[i];
        if(obj.is_called_start === false){
            obj.start();
            obj.is_called_start = true;
        }else {
            obj.update();
            obj.timedelta = timestamp - last_timestamp;
        }
    }

    for(let i = 0;i < SP_GAME_OBJECTS.length;i++){
        let obj = SP_GAME_OBJECTS[i];
        obj.late_update();
    }
    last_timestamp = timestamp;
    requestAnimationFrame(SP_GAME_ANIMATION);
}


requestAnimationFrame(SP_GAME_ANIMATION);
