class SPGameMap extends SPGameObject{
    constructor(playground) {
        super();
        this.playground = playground;
        // 画布标签
        this.$canvas = $(`<canvas class="sp-game-map-canvas" tabindex=0></canvas>`);
        this.$canvas_back = $(`<div class="sp-game-map-back"></div>`);
        // 获取2D画布内容对象
        this.ctx = this.$canvas[0].getContext('2d');
        // 设置长宽
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$sp_game_playground.append(this.$canvas);
        this.playground.$sp_game_playground.append(this.$canvas_back);
        this.back_img = new Image();
        this.back_img.src = this.playground.root.login.back_img;
        this.$canvas_back.css("background-image","url(" + this.playground.root.login.back_img + ")");
}
    start(){
        this.$canvas.focus();
    }
    update(){
        this.render();
    }

    resize(){
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
    }

    render(){
        this.ctx.drawImage(this.back_img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.fillStyle = "rgba(0,0,0,0.2)";
        // this.ctx.fillRect(0,0,this.playground.width,this.playground.height);
    }
}
