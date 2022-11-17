class SPGameMenu{constructor(t){this.root=t,this.$sp_game_menu=$('\n<div class="sp-game-menu">\n    <div class="sp-game-menu-field">\n        <div class="sp-game-menu-item sp-game-menu-item-single-mode">单人模式</div>\n        <div class="sp-game-menu-item sp-game-menu-item-multi-mode">多人模式</div>\n        <div class="sp-game-menu-item sp-game-menu-item-settings">退出</div>\n    </div>\n</div>\n'),this.hide(),this.root.$sp_game_div.append(this.$sp_game_menu),this.$single_mode=this.$sp_game_menu.find(".sp-game-menu-item-single-mode"),this.$multi_mode=this.$sp_game_menu.find(".sp-game-menu-item-multi-mode"),this.$settings=this.$sp_game_menu.find(".sp-game-menu-item-settings"),this.start()}start(){this.add_listening_events()}add_listening_events(){this.$single_mode.click((()=>{this.hide(),this.root.playground.show("single mode")})),this.$multi_mode.click((()=>{this.hide(),this.root.playground.show("multi mode")})),this.$settings.click((()=>{localStorage.setItem("superperson-access",""),localStorage.setItem("superperson-refresh",""),"ACAPP"===this.root.login.platform?this.root.os.api.window.close():location.reload()}))}show(){this.back_img=this.root.login.back_img,this.$sp_game_menu.css("background-image","url("+this.back_img+")"),this.$sp_game_menu.show()}hide(){this.$sp_game_menu.hide()}}class SPGameChatField{constructor(t){this.playground=t,this.$history=$('\n<div class="sp-game-chat-field-history">\n\n</div>\n'),this.$input=$("\n<input type='text' class=\"sp-game-chat-field-input\">\n"),this.hide_input(),this.hide_history(),this.func_id=null,this.playground.$sp_game_playground.append(this.$history),this.playground.$sp_game_playground.append(this.$input),this.start()}start(){this.add_listening_events()}add_listening_events(){let t=this;this.$input.on("contextmenu",(function(){return!1})),this.$history.on("contextmenu",(function(){return!1})),this.$input.keydown((function(s){if(27===s.which)return t.hide_input(),!1;if(13===s.which){let s=t.playground.root.login.username,e=t.$input.val();return e&&(t.$input.val(""),t.add_message(s,e),t.playground.mps.send_message(s,e)),!1}}))}render_message(t,s){return s===this.playground.root.login.username?$(`<div style="color: LightPink">${t}</div>`):$(`<div>${t}</div>`)}add_message(t,s){this.show_history();let e=`[${t}] ${s}`;this.$history.append(this.render_message(e,t)),this.$history.scrollTop(this.$history[0].scrollHeight)}show_input(){this.show_history(),this.$input.show(),this.$input.focus()}hide_input(){this.$input.hide(),this.playground.sp_game_map.$canvas.focus()}show_history(){this.$history.fadeIn();let t=this;this.func_id&&clearTimeout(this.func_id),this.func_id=setTimeout((function(){t.$history.fadeOut(),t.func_id=null}),3e3)}hide_history(){this.$history.fadeOut()}}class MultiPlayerSocket{constructor(t){this.playground=t,this.ws=new WebSocket("wss://app3774.acapp.acwing.com.cn/wss/superperson/multiplayer/?token="+localStorage.getItem("superperson-access")),this.start()}start(){this.receive()}receive(){let t=this;this.ws.onmessage=function(s){let e=JSON.parse(s.data);if(e.uuid===t.uuid)return!1;"create_player"===e.event?t.receive_create_player(e):"move_to"===e.event?t.receive_move_to(e):"shoot_fireball"===e.event?t.receive_shoot_fireball(e):"attack"===e.event?t.receive_attack(e):"blink"===e.event?t.receive_blink(e):"send_message"===e.event&&t.receive_message(e)}}send_create_player(t,s,e,i){this.ws.send(JSON.stringify({uuid:this.uuid,x:t,y:s,event:"create_player",username:e,photo:i}))}receive_create_player(t){let s=t.username,e=t.photo,i=t.uuid,a=t.x,h=t.y,r=this.playground,n=new SPGamePlayer(r,a,h,"white",.25,.05,!1,!1,e,s);r.players.push(n),n.uuid=i}send_move_to(t,s){this.ws.send(JSON.stringify({uuid:this.uuid,tx:t,ty:s,event:"move_to"}))}receive_move_to(t){let s=t.uuid,e=t.tx,i=t.ty,a=this.get_player(s);a&&a.move_to(e,i)}send_shoot_fireball(t,s,e,i){this.ws.send(JSON.stringify({event:"shoot_fireball",uuid:t,ball_uuid:s,tx:e,ty:i}))}receive_shoot_fireball(t){let s=t.uuid,e=t.ball_uuid,i=t.tx,a=t.ty,h=this.get_player(s);if(h){h.unleash_skills(i,a,"fireball").uuid=e}}send_attack(t,s,e,i,a,h,r){this.ws.send(JSON.stringify({event:"attack",x:h,y:r,damage:a,angle:i,ball_uuid:e,attackee_uuid:s,uuid:t}))}receive_attack(t){let s=t.x,e=t.y,i=t.damage,a=t.angle,h=t.ball_uuid,r=t.uuid,n=t.attackee_uuid,l=this.get_player(r),o=this.get_player(n);if(l&&o){l.get_fireball(h).receive_attack(a,i,s,e,o)}}send_blink(t,s,e,i){this.ws.send(JSON.stringify({event:"blink",uuid:t,blink_uuid:s,tx:e,ty:i}))}receive_blink(t){let s=this.get_player(t.uuid),e=t.tx,i=t.ty;s&&(s.x=e,s.y=i)}send_message(t,s){this.ws.send(JSON.stringify({event:"send_message",uuid:this.uuid,username:t,text:s}))}receive_message(t){let s=t.username,e=t.text;this.playground.chat.add_message(s,e)}get_player(t){let s=this.playground.players;for(let e=0;e<s.length;e++)if(s[e].uuid===t)return s[e]}}let last_timestamp,SP_GAME_OBJECTS=[];class SPGameObject{constructor(){SP_GAME_OBJECTS.push(this),this.is_called_start=!1,this.timedelta=0,this.uuid=this.create_uuid()}create_uuid(){let t="";for(let s=0;s<8;s++)t+=Math.floor(10*Math.random());return t}start(){}update(){}late_update(){}on_destroy(){}destroy(){this.on_destroy();for(let t=0;t<SP_GAME_OBJECTS.length;t++)if(SP_GAME_OBJECTS[t]===this){SP_GAME_OBJECTS.splice(t,1);break}}}let SP_GAME_ANIMATION=function(t){for(let s=0;s<SP_GAME_OBJECTS.length;s++){let e=SP_GAME_OBJECTS[s];!1===e.is_called_start?(e.start(),e.is_called_start=!0):(e.update(),e.timedelta=t-last_timestamp)}for(let t=0;t<SP_GAME_OBJECTS.length;t++){SP_GAME_OBJECTS[t].late_update()}last_timestamp=t,requestAnimationFrame(SP_GAME_ANIMATION)};requestAnimationFrame(SP_GAME_ANIMATION);class SPGameScoreBoard extends SPGameObject{constructor(t){super(),this.playground=t,this.ctx=this.playground.sp_game_map.ctx,this.state="none",this.win_img=new Image,this.win_img.src="https://app3774.acapp.acwing.com.cn/static/superperson/images/playground/win.jpg",this.lose_img=new Image,this.lose_img.src="https://app3774.acapp.acwing.com.cn/static/superperson/images/playground/lose.jpg",this.$canvas=this.playground.sp_game_map.$canvas}start(){}add_listening_events(){let t=this;this.$canvas.on("click",(function(){t.playground.hide(),t.playground.root.menu.show()}))}add_return_func(){let t=this;setTimeout((function(){t.add_listening_events()}),1e3)}win(){this.state="win",this.add_return_func()}lose(){this.state="lose",this.add_return_func()}late_update(){this.render()}render(){let t=this.playground.height/2;"win"===this.state&&this.ctx.drawImage(this.win_img,this.playground.width/2-t/2,this.playground.height/2-t/2,t,t),"lose"===this.state&&this.ctx.drawImage(this.lose_img,this.playground.width/2-t/2,this.playground.height/2-t/2,t,t)}}class SPGameBoard extends SPGameObject{constructor(t){super(),this.playground=t,this.ctx=this.playground.sp_game_map.ctx,this.room_capity=3,this.text="Wating! 已就绪: "+this.playground.players.length+"人",this.start()}start(){}write(t){this.text=t}update_text(){this.playground.players.length>=3&&"waiting"===this.playground.status?(this.write("Game Fighting!"),this.playground.status="fighting"):this.playground.players.length<3&&"waiting"===this.playground.status?this.write("Waiting! 已就绪"+this.playground.players.length+"人"):null===this.playground.get_me()&&"fighting"===this.playground.status?(this.write("Game Over!"),this.playground.status="over",this.playground.sp_game_score_board.lose()):1===this.playground.players.length&&("me"===this.playground.players[0].is_who()?(this.write("End!"),this.playground.status="end",this.playground.sp_game_score_board.win()):(this.write("Game Over!"),this.playground.status="over",this.playground.sp_game_score_board.lose()))}update(){this.update_text(),this.render()}render(){this.ctx.font="48px serif",this.ctx.textBaseline="top",this.ctx.textAlign="center",this.ctx.fillText(this.text,this.playground.width/2,0)}}class SPGameMap extends SPGameObject{constructor(t){super(),this.playground=t,this.$canvas=$('<canvas class="sp-game-map-canvas" tabindex=0></canvas>'),this.$canvas_back=$('<div class="sp-game-map-back"></div>'),this.ctx=this.$canvas[0].getContext("2d"),this.ctx.canvas.width=this.playground.width,this.ctx.canvas.height=this.playground.height,this.playground.$sp_game_playground.append(this.$canvas),this.playground.$sp_game_playground.append(this.$canvas_back),this.back_img=new Image,this.back_img.src=this.playground.root.login.back_img,this.$canvas_back.css("background-image","url("+this.playground.root.login.back_img+")")}start(){this.$canvas.focus()}update(){this.render()}resize(){this.ctx.canvas.width=this.playground.width,this.ctx.canvas.height=this.playground.height}render(){this.ctx.drawImage(this.back_img,0,0,this.ctx.canvas.width,this.ctx.canvas.height)}}class SPGameParticle extends SPGameObject{constructor(t,s,e,i,a,h,r,n){super(),this.playground=t,this.ctx=this.playground.sp_game_map.ctx,this.x=e,this.y=i,this.vx=Math.cos(s),this.vy=Math.sin(s),this.color=a,this.speed=h,this.friction=.9,this.eps=.01,this.radius=r,this.move_length=n}start(){}update(){if(!(this.speed>this.eps&&this.move_length>this.eps))return this.destroy(),!1;{let t=Math.min(this.move_length,this.timedelta*this.speed/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.speed*=this.friction,this.move_length-=t}this.render()}render(){this.ctx.beginPath(),this.ctx.fillStyle=this.color,this.ctx.arc(this.x*this.playground.scale,this.y*this.playground.scale,this.radius*this.playground.scale,0,2*Math.PI,!1),this.ctx.fill()}}class SPGamePlayer extends SPGameObject{constructor(t,s,e,i,a,h,r,n,l,o){super(),this.playground=t,this.ctx=this.playground.sp_game_map.ctx,this.x=s,this.y=e,this.vx=this.vy=0,this.move_length=0,this.eps=.01,this.color=i,this.speed=a,this.other_speed=0,this.radius=h,this.is_me=r,this.friction=.9,this.cur_skill=null,this.is_robot=n,this.photo=l,this.username=o,this.fireballs=[],this.fireball_cold_time_static=3,this.fireball_cold_time=0,this.fireball_img=new Image,this.fireball_img.src="https://app3774.acapp.acwing.com.cn/static/superperson/images/playground/fireball.jpg",this.blink_cold_time_static=10,this.blink_cold_time=0,this.blink_img=new Image,this.blink_img.src="https://app3774.acapp.acwing.com.cn/static/superperson/images/playground/blink.jpg",("me"===this.is_who()&&" "!==this.photo||"enemy"===this.is_who()&&" "!==this.photo)&&(this.img=new Image,this.img.src=this.photo)}is_who(){return this.is_me?"me":this.is_robot?"robot":"enemy"}start(){if("me"===this.is_who())this.add_listening_events();else if("robot"===this.is_who()){let t=Math.random()*this.playground.width/this.playground.scale,s=Math.random()*this.playground.height/this.playground.scale;this.move_to(t,s)}}add_listening_events(){let t=this;this.playground.sp_game_map.$canvas.on("contextmenu",(function(){return!1}));let s=function(s){if("fighting"!==t.playground.status)return!0;const e=t.ctx.canvas.getBoundingClientRect();let i=(s.clientX-e.left)/t.playground.scale,a=(s.clientY-e.top)/t.playground.scale;if(3===s.which)t.move_to(i,a),"multi mode"===t.playground.mode&&t.playground.mps.send_move_to(i,a);else if(1===s.which){let s=t.unleash_skills(i,a,t.cur_skill);"multi mode"===t.playground.mode&&("fireball"===s.name?t.playground.mps.send_shoot_fireball(t.uuid,s.uuid,i,a):"blink"===s.name&&t.playground.mps.send_blink(t.uuid,s.uuid,i,a))}};this.playground.sp_game_map.$canvas.mousedown(s),"multi mode"===this.playground.mode&&(this.playground.chat.$input.mousedown(s),this.playground.chat.$history.mousedown(s)),this.playground.sp_game_map.$canvas.keydown((function(s){if("multi mode"===t.playground.mode){if(13===s.which)return t.playground.chat.show_input(),!1;if(27===s.which)return t.playground.chat.hide_input(),!1}return"fighting"===t.playground.status&&(81===s.which?(t.fireball_cold_time>t.eps||(t.cur_skill="fireball"),!1):68===s.which?(console.log("blink"),t.blink_cold_time>t.eps||(t.cur_skill="blink"),!1):void 0)}))}unleash_skills(t,s,e){let i;if("fireball"===e)i=this.shoot_fireball(t,s),this.fireball_cold_time=this.fireball_cold_time_static;else if("blink"===e)i=this.blink(t,s),this.blink_cold_time=this.blink_cold_time_static;else if(null===e)return!1;return this.cur_skill=null,i}blink(t,s){this.x=t,this.y=s}shoot_fireball(t,s){let e=Math.atan2(s-this.y,t-this.x),i=new SPGameSkillFireBall(this.playground,this,this.x,this.y,e);return this.fireballs.push(i),i}get_dist(t,s,e,i){let a=(e-t)*(e-t),h=(i-s)*(i-s);return Math.sqrt(a+h)}move_to(t,s){this.move_length=this.get_dist(t,s,this.x,this.y);let e=Math.atan2(s-this.y,t-this.x);this.vx=Math.cos(e),this.vy=Math.sin(e)}attacked(t,s){this.radius-=s,this.move_length=0,this.vx=Math.cos(t),this.vy=Math.sin(t),this.other_speed=2*this.speed;for(let t=0;t<10+15*Math.random();t++){let t=10*this.speed,s=.01*Math.random(),e=Math.random()*Math.PI*2,i=this.radius*Math.random()*10;new SPGameParticle(this.playground,e,this.x,this.y,this.color,t,s,i)}this.radius<this.eps&&this.destroy()}get_fireball(t){for(let s=0;s<this.fireballs.length;s++)if(this.fireballs[s].uuid===t)return this.fireballs[s]}update(){this.update_move(),"enemy"!==this.is_who()&&"fighting"===this.playground.status&&this.update_skill(),this.render()}update_skill(){let t=this.timedelta/1e3;this.fireball_cold_time=Math.max(0,this.fireball_cold_time-t),this.blink_cold_time=Math.max(0,this.blink_cold_time-t)}update_move(){if(this.other_speed>this.eps&&this.move_length<this.eps)this.x+=this.vx*this.other_speed*this.timedelta/1e3,this.y+=this.vy*this.other_speed*this.timedelta/1e3,this.other_speed*=this.friction;else{let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}if("me"===this.is_who());else if("robot"===this.is_who()){let t=Math.random()*this.playground.width/this.playground.scale,s=Math.random()*this.playground.height/this.playground.scale;if(this.move_length<5/this.playground.scale&&this.move_to(t,s),null===this.cur_skill&&Math.random()<.01){let e=this.playground.players[Math.floor(Math.random()*this.playground.players.length)];this.fireball_cold_time<this.eps&&this.unleash_skills(e.x,e.y,"fireball"),this.blink_cold_time<this.eps&&this.unleash_skills(t,s,"blink")}}}render(){this.render_player(),"me"===this.is_who()&&this.render_skill()}render_skill(){this.render_fireball(),this.render_blink()}render_blink(){let t=1.7,s=.9,e=.04;this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t*this.playground.scale,s*this.playground.scale,e*this.playground.scale,0,2*Math.PI,!1),this.ctx.strokeStyle="white",this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.blink_img,(t-e)*this.playground.scale,(s-e)*this.playground.scale,2*e*this.playground.scale,2*e*this.playground.scale),this.ctx.restore(),this.blink_cold_time>this.eps&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(t*this.playground.scale,s*this.playground.scale),this.ctx.arc(t*this.playground.scale,s*this.playground.scale,e*this.playground.scale,0-Math.PI/2,2*Math.PI*(1-this.blink_cold_time/this.blink_cold_time_static)-Math.PI/2,!0),this.ctx.lineTo(t*this.playground.scale,s*this.playground.scale),this.ctx.fillStyle="rgba(0,0,255,0.6)",this.ctx.fill(),this.ctx.restore())}render_fireball(){let t=1.5,s=.9,e=.04;this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t*this.playground.scale,s*this.playground.scale,e*this.playground.scale,0,2*Math.PI,!1),this.ctx.strokeStyle="white",this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.fireball_img,(t-e)*this.playground.scale,(s-e)*this.playground.scale,2*e*this.playground.scale,2*e*this.playground.scale),this.ctx.restore(),this.fireball_cold_time>this.eps&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(t*this.playground.scale,s*this.playground.scale),this.ctx.arc(t*this.playground.scale,s*this.playground.scale,e*this.playground.scale,0-Math.PI/2,2*Math.PI*(1-this.fireball_cold_time/this.fireball_cold_time_static)-Math.PI/2,!0),this.ctx.lineTo(t*this.playground.scale,s*this.playground.scale),this.ctx.fillStyle="rgba(0,0,255,0.6)",this.ctx.fill(),this.ctx.restore())}draw_img(){this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(this.x*this.playground.scale,this.y*this.playground.scale,this.radius*this.playground.scale,0,2*Math.PI,!1),this.ctx.strokeStyle="white",this.ctx.stroke(),this.ctx.clip(),this.ctx.drawImage(this.img,(this.x-this.radius)*this.playground.scale,(this.y-this.radius)*this.playground.scale,2*this.radius*this.playground.scale,2*this.radius*this.playground.scale),this.ctx.restore()}draw_color(){this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(this.x*this.playground.scale,this.y*this.playground.scale,this.radius*this.playground.scale,0,2*Math.PI,!1),this.ctx.fillStyle=this.color,this.ctx.fill(),this.ctx.restore()}render_player(){"me"===this.is_who()&&" "!==this.photo?this.draw_img():"robot"===this.is_who()?this.draw_color():this.draw_img()}on_destroy(){for(let t=0;t<this.playground.players.length;t++)if(this.playground.players[t]===this){this.playground.players.splice(t,1);break}}}class SPGameSkillFireBall extends SPGameObject{constructor(t,s,e,i,a){super(),this.name="fireball",this.playground=t,this.ctx=this.playground.sp_game_map.ctx,this.x=e,this.y=i,this.vx=Math.cos(a),this.vy=Math.sin(a),this.radius=.01,this.move_length=.5,this.damage=.01,this.speed=.4,this.eps=.01,this.color="orange",this.player=s}start(){this.player.vx=this.player.vy=0,this.player.move_length=0}get_dist(t,s,e,i){let a=(t-e)*(t-e),h=(s-i)*(s-i);return Math.sqrt(a+h)}attack(t){let s=Math.atan2(t.y-this.y,t.x-this.x);t.attacked(s,this.damage),"multi mode"===this.playground.mode&&"me"===this.player.is_who()&&this.playground.mps.send_attack(this.player.uuid,t.uuid,this.uuid,s,this.damage,t.x,t.y),this.destroy()}receive_attack(t,s,e,i,a){a.x=e,a.y=i,a.attacked(t,s),this.destroy()}update(){this.update_move(),"enemy"!==this.player.is_who()&&this.update_attack(),this.render()}update_attack(){for(let t=0;t<this.playground.players.length;t++){let s=this.playground.players[t],e=this.get_dist(s.x,s.y,this.x,this.y);s!==this.player&&e<=this.radius+s.radius&&this.attack(s)}}update_move(){if(!(this.eps<this.move_length))return this.destroy(),!1;{let t=Math.min(this.speed*this.timedelta/1e3,this.move_length);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}}render(){this.ctx.beginPath(),this.ctx.fillStyle=this.color,this.ctx.arc(this.x*this.playground.scale,this.y*this.playground.scale,this.radius*this.playground.scale,0,2*Math.PI,!1),this.ctx.fill()}on_destroy(){let t=this.player.fireballs;for(let s=0;s<t.length;s++)if(t[s]===this){t.splice(s,1);break}}}class SPGamePlayGround{constructor(t){this.root=t,this.$sp_game_playground=$('\n    <div class="sp-game-playground"></div>\n'),this.hide(),this.root.$sp_game_div.append(this.$sp_game_playground),this.start()}create_single_mode(t,s,e,i){let a=new SPGamePlayer(this,Math.random()*this.width/this.scale,Math.random()*this.height/this.scale,t,e,i,!0,!1,this.root.login.photo,this.root.login.username);this.players.push(a);for(let t=0;t<s-1;t++){let s=new SPGamePlayer(this,Math.random()*this.width/this.scale,Math.random()*this.height/this.scale,this.colors[t%this.colors.length],e,i,!1,!0);this.players.push(s)}}create_multi_mode(t,s,e,i){let a=this,h=Math.random()*this.width/this.scale,r=Math.random()*this.height/this.scale,n=new SPGamePlayer(this,h,r,t,e,i,!0,!1,this.root.login.photo,this.root.login.username);this.players.push(n),this.chat=new SPGameChatField(this),this.mps=new MultiPlayerSocket(this),this.mps.uuid=this.players[0].uuid,this.mps.ws.onopen=function(){a.mps.send_create_player(h,r,a.root.login.username,a.root.login.photo,"false")}}start(){let t=this;$(window).resize((function(){t.resize()}))}hide(){for(;this.players&&this.players.length>0;)this.players[0].destroy();this.sp_game_map&&(this.sp_game_map.destroy(),this.sp_game_map=null),this.sp_game_board&&(this.sp_game_board.destroy(),this.sp_game_board=null),this.sp_game_score_board&&(this.sp_game_score_board.destroy(),this.sp_game_score_board=null),this.$sp_game_playground.empty(),this.$sp_game_playground.hide()}resize(){this.width=this.$sp_game_playground.width(),this.height=this.$sp_game_playground.height();let t=Math.min(this.width/16,this.height/9);this.width=16*t,this.height=9*t,this.scale=this.height,this.sp_game_map&&this.sp_game_map.resize()}show(t){this.players=[],this.sp_game_map=new SPGameMap(this),this.status="waiting",this.sp_game_board=new SPGameBoard(this),this.sp_game_score_board=new SPGameScoreBoard(this),this.resize(),this.colors=["Chocolate","Crimson","DarkGoldenRod","Gainsboro","Gold","NavajoWhite","Salmon","SlateGray"],this.mode=t,"single mode"===t?this.create_single_mode("MidnightBlue",3,.25,.05):"multi mode"===t&&this.create_multi_mode("MidnightBlue",3,.25,.05),this.$sp_game_playground.show()}get_me(){for(let t=0;t<this.players.length;t++)if("me"===this.players[t].is_who())return this.players[t];return null}}class SPGameLogin{constructor(t,s){this.root=t,this.platform="WEB",this.root.os&&(this.platform="ACAPP"),this.$sp_index_page=$('\n<div class="sp-index-page">\n    <div class="sp-login-page">\n        <div class="sp-login-title">\n            登录\n        </div>\n        <div class="sp-login-item">\n            <div class="sp-login-username-input">\n                <input type=\'text\' placeholder="请输入用户名">\n            </div>\n        </div>\n        <div class="sp-login-item">\n            <div class="sp-login-password-input">\n                <input type=\'password\' placeholder="请输入密码">\n            </div>\n        </div>\n        <div class="sp-login-item">\n            <button class="sp-login-button">登录</button>\n        </div>\n        <div class="sp-login-error-message">\n        </div>\n        <div class="sp-login-to-register">\n            注册\n        </div>\n        <br>\n        <div class="sp-login-other">\n            <div class="sp-login-other-logo">\n                <img width="30" height=\'30\' src="https://app3774.acapp.acwing.com.cn/static/superperson/images/settings/acapp.jpg">\n            </div>\n            <div class="sp-login-other-font">\n                ACWing登录\n            </div>\n        </div>\n    </div>\n    <div class="sp-register-page">\n        <div class="sp-login-title">\n            注册\n        </div>\n        <div class="sp-login-item">\n            <div class="sp-register-username-input">\n                <input type=\'text\' placeholder=\'请输入用户名\'>\n            </div>\n        </div>\n        <div class="sp-login-item">\n            <div class="sp-register-password-input">\n                <input type=\'password\' placeholder=\'请输入密码\'>\n            </div>\n        </div>\n        <div class="sp-login-item">\n            <div class="sp-register-password-confirm-input">\n                <input type=\'password\' placeholder=\'请再次输入密码\'>\n            </div>\n        </div>\n        <div class="sp-login-item">\n            <button class="sp-register-button">注册</button>\n        </div>\n        <div class="sp-register-error-message">\n        </div>\n        <div class="sp-login-to-login">\n                登录\n        </div>\n    </div>\n</div>\n'),this.hide(),this.root.$sp_game_div.append(this.$sp_index_page),this.$sp_login_page=this.$sp_index_page.find(".sp-login-page"),this.$sp_register_page=this.$sp_index_page.find(".sp-register-page"),this.$sp_login_page.hide(),this.$sp_register_page.hide(),this.$sp_login_button=this.$sp_index_page.find(".sp-login-button"),this.$sp_login_username=this.$sp_index_page.find(".sp-login-username-input > input"),this.$sp_login_password=this.$sp_index_page.find(".sp-login-password-input > input"),this.$sp_login_to_register=this.$sp_index_page.find(".sp-login-to-register"),this.$sp_login_error_message=this.$sp_index_page.find(".sp-login-error-message"),this.$sp_login_acapp=this.$sp_index_page.find(".sp-login-other-logo > img"),this.$sp_register_button=this.$sp_index_page.find(".sp-register-button"),this.$sp_register_username=this.$sp_index_page.find(".sp-register-username-input > input"),this.$sp_register_password=this.$sp_index_page.find(".sp-register-password-input > input"),this.$sp_register_password_confirm=this.$sp_index_page.find(".sp-register-password-confirm-input > input"),this.$sp_login_to_login=this.$sp_index_page.find(".sp-login-to-login"),this.$sp_register_error_message=this.$sp_index_page.find(".sp-register-error-message"),this.photo="",this.back_img="",this.start()}start(){"ACAPP"===this.platform?this.acapp_getinfo():(this.get_info(),this.add_listening_events_login(),this.add_listening_events_register())}add_listening_events_login(){let t=this;this.$sp_login_username.click((function(){t.$sp_login_error_message.empty()})),this.$sp_login_password.click((function(){t.$sp_login_error_message.empty()})),this.$sp_login_to_register.click((function(){t.register()})),this.$sp_login_button.click((function(){t.remote_login()})),this.$sp_login_acapp.click((function(){t.login_acapp()}))}add_listening_events_register(){let t=this;this.$sp_register_username.click((function(){t.$sp_register_error_message.empty()})),this.$sp_register_password.click((function(){t.$sp_register_error_message.empty()})),this.$sp_register_password_confirm.click((function(){t.$sp_register_error_message.empty()})),this.$sp_login_to_login.click((function(){t.login()})),this.$sp_register_button.click((function(){t.remote_register()}))}getCookie(t){let s="";if(document.cookie&&""!==document.cookie){let e=document.cookie.split(";");for(let i=0;i<e.length;i++){let a=e[i].trim();a.substring(0,t.length+1)==t+"="&&(s=decodeURIComponent(a.substring(t.length+1)))}}return s}refresh_jwt_interval(){setInterval((()=>{$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/api/token/refresh",type:"post",data:{refresh:localStorage.getItem("superperson-refresh")},success:t=>{localStorage.setItem("superperson-access",t.access)}})}),27e4)}remote_login(t,s){const e=t||this.$sp_login_username.val(),i=s||this.$sp_login_password.val();$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/api/token/",type:"post",data:{username:e,password:i},success:t=>{localStorage.setItem("superperson-access",t.access),localStorage.setItem("superperson-refresh",t.refresh),this.get_info(),this.refresh_jwt_interval()},error:()=>{this.$sp_login_error_message.html("用户名或密码错误")}})}login_acapp(){$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/web/acwing/apply_code/",type:"GET",success:function(t){"success"===t.result&&window.location.replace(t.url)}})}remote_register(){let t=this;const s=this.$sp_register_username.val(),e=this.$sp_register_password.val(),i=this.$sp_register_password_confirm.val();$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/register/",type:"POST",data:{username:s,password:e,password_confirm:i},success:i=>{"success"===i.result?this.remote_login(s,e):t.$sp_register_error_message.html(i.text)}})}login(){this.show(),this.$sp_register_page.hide(),this.$sp_login_page.show()}register(){this.show(),this.$sp_login_page.hide(),this.$sp_register_page.show()}acapp_login(t,s,e,i){let a=this;a.root.os.api.oauth2.authorize(t,s,e,i,(t=>{"success"===t.result&&(a.username=t.username,a.photo=t.photo,a.back_img=t.back_img,localStorage.setItem("superperson-access",t.access),localStorage.setItem("superperson-refresh",t.refresh),a.hide(),a.root.menu.show(),this.refresh_jwt_interval())}))}acapp_getinfo(){let t=this;$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/acwing/acwing/apply_code/",type:"GET",success:function(s){if("success"===s.result){let e=s.appid,i=s.redirect_uri,a=s.scope,h=s.state;t.acapp_login(e,i,a,h)}}})}get_ranklist(){$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/get_ranklist/",type:"get",headers:{Authorization:"Bearer "+localStorage.getItem("superperson-access")},success:t=>{console.log(t)}})}get_info(){$.ajax({url:"https://app3774.acapp.acwing.com.cn/superperson/settings/get_info/",type:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("superperson-access")},success:t=>{this.username=t.username,this.photo=t.photo,this.back_img=t.back_img,this.hide(),this.root.menu.show()},error:()=>{this.login()}})}hide(){this.$sp_index_page.hide()}show(){this.$sp_index_page.show()}}export class SuperPersonGame{constructor(t,s,e,i){this.id=t,this.$sp_game_div=$("#"+t),this.os=s,localStorage.getItem("superperson-access")||localStorage.setItem("superperson-access",e),localStorage.getItem("superperson-refresh")||localStorage.setItem("superperson-refresh",i),this.login=new SPGameLogin(this),this.menu=new SPGameMenu(this),this.playground=new SPGamePlayGround(this),this.start()}start(){}}
