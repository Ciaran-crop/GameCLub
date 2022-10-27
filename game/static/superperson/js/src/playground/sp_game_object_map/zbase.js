class SPGameMap extends SPGameObject{
    constructor(playground) {
        super();
        this.playground = playground;
        // 画布标签
        this.$canvas = $(`<canvas class="sp-game-map-canvas"></canvas>`);
        // 获取2D画布内容对象
        this.ctx = this.$canvas[0].getContext('2d');
        // 设置长宽
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$sp_game_playground.append(this.$canvas);
    }
    start(){
        this.render();
    }
    update(){
        this.render();
    }
    render(){
        this.ctx.fillStyle = "rgba(0,0,0,0.2)";
        this.ctx.fillRect(0,0,this.playground.width,this.playground.height);
    }
}
