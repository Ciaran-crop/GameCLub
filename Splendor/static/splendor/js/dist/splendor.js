const BASE_URL="https://app3774.acapp.acwing.com.cn";function refresh_tokens(){setInterval((()=>{$.ajax({url:`${BASE_URL}/gameclub/auth/jwt/token/refresh/`,type:"POST",data:{refresh:localStorage.getItem("gc-refresh")},success:t=>{localStorage.setItem("gc-access",t.access)}})}),27e4)}function clear_tokens(){localStorage.setItem("gc-access",""),localStorage.setItem("gc-refresh","")}export class SplendorLogin{constructor(t,s,n,i){this.id=t,this.os=s,this.$splendor_div=$("#"+t),localStorage.getItem("gc-access")||localStorage.setItem("gc-access",n),localStorage.getItem("gc-refresh")||localStorage.setItem("gc-refresh",i),this.start()}start(){this.$login_div=$("\n<div class='splendor-login-wrap'>\n    <div class='splendor-login-box'>\n        <div class='splendor-login-logo'>\n        </div>\n        <div class='splendor-login-content'>\n            <div class='splendor-login-title'>\n                <span>您还未登录,请前往GameClub登录</span>\n            </div>\n            <div class='splendor-login-button'>\n                <a>前往GameClub登录</a>\n            </div>\n        </div>\n    </div>\n</div>\n"),this.$login_div.hide(),this.$splendor_div.append(this.$login_div),this.add_listening_events(),this.get_info()}add_listening_events(){this.$login_div.find(".splendor-login-button").on("click",(()=>{window.location.href=`${BASE_URL}/?redirect=https://app3774.acapp.acwing.com.cn/splendor/signin/`}))}login(){this.$login_div.show()}get_info(){$.ajax({url:`${BASE_URL}/gameclub/auth/check/`,type:"post",headers:{Authorization:"Bearer "+localStorage.getItem("gc-access")},success:t=>{window.location.href=`${BASE_URL}/splendor/page/menu/`},error:t=>{this.login()}})}}export class SplendorMenu{constructor(t,s,n,i){this.id=t,this.os=s,this.room_id=n,this.need_pass=i,this.$menu_div=$("#"+this.id),this.start()}start(){this.start_ws(),this.start_room(),this.get_info(),this.create_settings()}start_ws(){this.socket=new SplendorRoomSocket(this)}start_room(){this.room=new SplendorRoom(this)}create_settings(){this.single_setting={single_mode:{name:"模式",content:["单人"]},single_player_number:{name:"人数",content:["2人","3人","4人","5人"]}},this.room_setting={room_mode:{name:"模式",content:["多人"]},room_player_number:{name:"人数",content:["2人","3人","4人","5人"]},room_round_second:{name:"回合秒数",content:["10s","15s","30s","35s"]},room_pass:{name:"房间密码",content:["none"]}}}create_element(){this.$base_wrap=$("\n<div class='menu-wrap'>\n    <div class='menu-player-info'>\n        <div class='player-info'>\n            <div class='player-info-left'>\n                <span></span>\n                <span></span>\n            </div>\n            <div class='player-info-right'>\n                <img>\n            </div>\n        </div>\n    </div>\n    <div class='menu-box'>\n    </div>\n</div>\n"),this.room_id&&this.room.create_room(this.player_info,this.room_id,this.need_pass,!1,null),this.$player_name=this.$base_wrap.find(".player-info-left > span:first"),this.$player_score=this.$base_wrap.find(".player-info-left > span:last"),this.$player_photo=this.$base_wrap.find(".player-info-right > img"),this.$menu_box=this.$base_wrap.find(".menu-box"),this.$menu_div.append(this.$base_wrap),this.$base_menu=$("\n<div class='menu-list' name='base-menu'>\n    <div class='menu-element' name='single'>\n        <span>单人游戏</span>\n    </div>\n    <div class='menu-element' name='multi'>\n        <span>多人游戏</span>\n    </div>\n    <div class='menu-element' name='ranklist'>\n        <span>排行榜</span>\n    </div>\n    <div class='menu-element' name='signout'>\n        <span>退出</span>\n    </div>\n</div>\n"),this.$single=this.$base_menu.find("[name='single']"),this.$multi=this.$base_menu.find("[name='multi']"),this.$rank=this.$base_menu.find("[name='ranklist']"),this.$signout=this.$base_menu.find("[name='signout']"),this.$menu_box.append(this.$base_menu),this.$single_setting=$("\n<div class='menu-setting-wrap'>\n    <div class='menu-setting-box'>\n        <div class='menu-setting-title'>\n            <span>单人设定</span>\n        </div>\n        <div class='menu-setting-config'>\n            <div class='menu-setting-content'>\n            </div>\n        </div>\n        <div class='menu-setting-button'>\n            <button>确定</button>\n            <button>取消</button>\n        </div>\n    </div>\n</div>\n"),this.$single_setting_content=this.$single_setting.find(".menu-setting-content"),this.contain_setting(this.$single_setting_content,this.single_setting),this.$single_check_button=this.$single_setting.find("button:first"),this.$single_cancel_button=this.$single_setting.find("button:last"),this.$single_setting.hide(),this.$menu_box.append(this.$single_setting),this.$multi_list=$("\n<div class='menu-list' name='multi-menu'>\n    <div class='menu-element' name='match'>\n        <span>开始匹配</span>\n    </div>\n    <div class='menu-element' name='create_room'>\n        <span>组队房间</span>\n    </div>\n    <div class='menu-element' name='multi-last'>\n        <span>上一级</span>\n    </div>\n</div>\n"),this.$match_loading=$("\n<div class='match-loading'>\n    <div class=\"rubik-loader\"></div>\n    <div></div>\n    <button>取消匹配</button>\n</div>\n"),this.$match=this.$multi_list.find("[name='match']"),this.$create_room=this.$multi_list.find("[name='create_room']"),this.$multi_last_menu=this.$multi_list.find("[name='multi-last']"),this.$multi_list.hide(),this.$menu_box.append(this.$multi_list),this.$menu_box.append(this.$match_loading),this.$create_room_setting=$("\n<div class='menu-setting-wrap'>\n    <div class='menu-setting-box'>\n        <div class='menu-setting-title'>\n            <span>房间设定</span>\n        </div>\n        <div class='menu-setting-config'>\n            <div class='menu-setting-content'>\n            </div>\n        </div>\n        <div class='menu-setting-button'>\n            <button>创建房间</button>\n            <button>取消</button>\n        </div>\n    </div>\n</div>\n"),this.$room_setting_content=this.$create_room_setting.find(".menu-setting-content"),this.contain_setting(this.$room_setting_content,this.room_setting),this.$room_check_button=this.$create_room_setting.find("button:first"),this.$room_cancel_button=this.$create_room_setting.find("button:last"),this.$create_room_setting.hide(),this.$menu_box.append(this.$create_room_setting),this.$ranklist=$("\n<div class='menu-ranklist-wrap'>\n    <div class='menu-ranklist-box'>\n        <div class='ranklist-title'>\n            <span>排行榜</span>\n            <img src=\"/static/gameclub/images/settings/cancel.svg\">\n        </div>\n        <div class='ranklist-box'>\n            <div class=\"rubik-loader\"></div>\n            <div class=\"ranklist-content-row ranklist-content-header\">\n                <span>排名</span>\n                <span>头像</span>\n                <span>昵称</span>\n                <span>分数</span>\n            </div>\n            <div class='ranklist-content'>\n            </div>\n        </div>\n        <div class=\"ranklist-content-row ranklist-content-me\">\n        </div>\n    </div>\n</div>\n"),this.$ranklist_content=this.$ranklist.find(".ranklist-content"),this.$ranklist_cancel=this.$ranklist.find("img"),this.$rubik_loader=this.$ranklist.find(".rubik-loader"),this.$ranklist_row_me=this.$ranklist.find(".ranklist-content-me"),this.$ranklist.hide(),this.$menu_box.append(this.$ranklist),$(".menu-setting-select-box").buttonset(),this.add_listening_events()}add_listening_events(){this.$single.on("click",(()=>{this.$base_menu.hide(),this.$single_setting.show()})),this.$multi.on("click",(()=>{this.$base_menu.hide(),this.$multi_list.show()})),this.$rank.on("click",(()=>{this.$base_menu.hide(),this.show_ranklist()})),this.$signout.on("click",(()=>{clear_tokens(),window.location.reload()})),this.$single_check_button.on("click",(()=>{let t=this.get_config(this.$single_setting_content);this.start_single_game(t)})),this.$single_cancel_button.on("click",(()=>{this.$single_setting.hide(),this.$base_menu.show()})),this.$room_check_button.on("click",(()=>{let t=this.get_config(this.$room_setting_content);this.create_room(t)})),this.$room_cancel_button.on("click",(()=>{this.$create_room_setting.hide(),this.$multi_list.show()})),this.$match.on("click",(()=>{this.$multi_list.hide(),this.$match_loading.show(),this.time_func_id=this.start_match_timing(),this.match_game(this.player_info)})),this.$match_loading.find("button").on("click",(()=>{this.stop_match(),this.$multi_list.show()})),this.$create_room.on("click",(()=>{this.$multi_list.hide(),this.$create_room_setting.show()})),this.$multi_last_menu.on("click",(()=>{this.$multi_list.hide(),this.$base_menu.show()})),this.$ranklist_cancel.on("click",(()=>{this.$ranklist.hide(),this.$base_menu.show()}))}create_room(t){this.socket.create_room(t)}receive_create_room(t){this.room.create_room(this.player_info,this.room_id,this.need_pass,!0,t)}match_success(t){this.stop_match_timing(this.time_func_id),this.$match_loading.find("button").hide(),this.$match_loading.find("div:last").css("color","rgb(68, 157, 68)"),this.$match_loading.find("div:last").text("匹配成功! loading..."),this.socket.join_room(t.room_id,this.player_info,t.pass,"true"),console.log("match_success")}start_game(t,s,n){console.log("start_game",t,s,n)}stop_match_timing(t){clearInterval(t)}start_match_timing(){let t=1;return this.$match_loading.find("div:last").text(""),setInterval((()=>{let s=t,n=s%60,i=Math.floor(s/60),e="匹配中... ";i>0&&(e+=i+"m"),e+=n+"s",this.$match_loading.find("div:last").text(e),t+=1}),1e3)}stop_match(){this.stop_match_timing(this.time_func_id),this.socket.stop_match(this.email,this.score),this.$match_loading.hide(),console.log("stop_match")}match_game(t){console.log("matching...",t),this.socket.match(t.email,t.score)}show_ranklist(){this.$ranklist.show(),this.rank_list?(this.$rubik_loader.hide(),this.$ranklist_content.show(),this.$ranklist_row_me.show()):this.get_ranklist()}get_ranklist(){$.ajax({url:`${BASE_URL}/splendor/auth/get_ranklist/`,type:"post",headers:{Authorization:"Bearer "+localStorage.getItem("gc-access")},data:{range_min:1,range_max:100},success:t=>{this.padding_ranklist(t),"none"!==this.$ranklist.css("display")&&(this.$rubik_loader.hide(),this.$ranklist_content.show(),this.$ranklist_row_me.show())}})}padding_ranklist(t){let s=-1,n=t.content;this.rank_list=n;let i=n.length;n.forEach(((t,n,e)=>{let o=n+1,a=t.photo,r=t.name,l=t.score,c=t.email,h=this.create_ranklist_row(o,a,r,l);1===o&&h.addClass("ranklist-content-first"),2===o&&h.addClass("ranklist-content-second"),3===o&&h.addClass("ranklist-content-third"),o===i&&h.addClass("ranklist-content-last-row"),this.email===c&&(s=o,h.addClass("ranklist-content-box-me")),this.$ranklist_content.append(h)})),-1===s&&(s="未上榜"),this.$ranklist_row_me.append($(`\n<span>${s}</span>\n<img src='${this.photo}'>\n<span>${this.name}</span>\n<span>${this.score}</span>\n`))}create_ranklist_row(t,s,n,i){return $(`\n<div class="ranklist-content-row">\n    <span>${t}</span>\n    <img src='${s}'>\n    <span>${n}</span>\n    <span>${i}</span>\n</div>\n`)}contain_setting(t,s){for(let n in s){let i=n,e=s[i],o=e.name,a=e.content;t.append(this.create_setting_config_element(i,o,a))}}get_config(t){let s=t.children("div"),n={};for(let t=0;t<s.length;t++){let i=$(s[t]),e=i.find("input")[0].name,o="";o="room_pass"===e?i.find("input").val():i.find("input:checked").val(),n[e]=o}return n}start_single_game(t){console.log(t)}padding_info(t){this.player_info=t,this.name=t.name,this.email=t.email,this.photo=t.photo,this.score=t.score,this.back=t.back,this.create_element(),this.$player_name.text(this.name),this.$player_score.text("Score: "+this.score),this.$player_photo.attr("src",this.photo),this.$base_wrap.css("background-image","linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("+this.back+")")}get_info(){$.ajax({url:`${BASE_URL}/splendor/auth/get_info/`,type:"post",headers:{Authorization:"Bearer "+localStorage.getItem("gc-access")},success:t=>{this.padding_info(t),refresh_tokens()},error:()=>{window.location.href=`${BASE_URL}`}})}show(){this.$base_wrap.show()}hide(){this.$base_wrap.hide()}create_setting_config_element(t,s,n){let i=$(`\n<div class='menu-setting-element'>\n    <div class='menu-setting-name'>\n        <span>${s}</span>\n        <span>:</span>\n    </div>\n    <div class='menu-setting-select'>\n        <div class='menu-setting-select-box'>\n        </div>\n    </div>\n</div>\n`);if("房间密码"===s){let t=$("\n<input type='text' maxlength='4' oninput = \"value=value.replace(/[^\\d]/g,'')\" name='room_pass'>\n<span>(不填视为不设置密码)</span>\n");i.find(".menu-setting-select-box").append(t)}else n.forEach(((s,n,e)=>{let o=$(`\n<input type="radio" id="${t}${n}" value='${s}' name="${t}"><label for="${t}${n}">${s}</label>\n`);0===n&&o.attr("checked","true"),i.find(".menu-setting-select-box").append(o)}));return i}}class SplendorPlayground{constructro(t){this.menu()}}class SplendorRoom{constructor(t){this.root=t,this.players=[],this.start()}start(){this.create_base()}add_listening_events(){this.$room_wrap.find(".room-check-button > button").on("click",(()=>{let t=this.$room_wrap.find(".room-check-input > input").val();if(""===t)return!1;this.check_pass(t)})),this.$room_wrap.find(".room-start > button:first").on("click",(()=>{if(this.is_owner){if(this.players.length<this.config.room_player_number)return!1;this.root.socket.start_game(),this.start_game()}})),this.$room_wrap.find(".room-start > button:last").on("click",(()=>{this.is_owner&&(this.root.socket.cancel_room(),this.cancel_room())})),this.$room_wrap.find(".room-start > button:nth-child(2)").on("click",(()=>{let t=s=>{s.preventDefault(),s.clipboardData.setData("text/plain",`${BASE_URL}/splendor/page/menu/?room_id=${this.room_id}&need_pass=${this.need_pass}`),alert("复制链接成功, 分享给好友邀请加入游戏"),document.removeEventListener("copy",t)};document.addEventListener("copy",t),document.execCommand("Copy")}))}cancel_room(){window.location.href=`${BASE_URL}/splendor/`}start_game(){this.root.start_game(this.config,this.players,this.room_id)}create_base(){this.$room_wrap=$("\n<div class='room-wrap'>\n    <div class='room-check'>\n        <div class='room-check-title'>\n            <span>请输入房间密码</span>\n        </div>\n        <div class='room-check-input'>\n            <input type='text' maxlength='4' oninput= \"value = value.replace(/[^\\d]/g, '')\" name='room_pass'>\n        </div>\n        <div class='room-check-button'>\n            <button>确认</button>\n        </div>\n    </div>\n    <div class='room-box'>\n        <div class='room-title'>\n            <span></span>\n        </div>\n        <div class='room-player'>\n        </div>\n        <div class='room-start'>\n            <button>开始游戏</button>\n            <button>邀请玩家</button>\n            <button>解散房间</button>\n        </div>\n    </div>\n</div>\n"),this.$check=this.$room_wrap.find(".room-check"),this.$check.hide(),this.$box=this.$room_wrap.find(".room-box"),this.$box.hide(),this.$room_wrap.hide(),this.root.$menu_div.append(this.$room_wrap),this.add_listening_events()}show(){this.$room_wrap.show()}hide(){this.$room_wrap.hide()}create_room(t,s,n,i,e){this.room_id=s,this.is_owner=i,this.player_info=t,this.need_pass=n,this.config=e,this.$room_wrap.css("background-image","linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("+t.back+")"),i?(this.players.push(t),this.$box.find(".room-title > span").text("房间 "+this.room_id),this.padding_info(t),this.root.hide(),this.show(),this.$box.show()):(this.root.hide(),this.show(),"true"===n?this.$check.show():this.join_room(t,""))}check_pass(t){this.join_room(this.player_info,t)}join_room(t,s){setTimeout((()=>{this.root.socket.join_room(this.room_id,t,s)}),1e3)}receive_join_room(t,s){this.config=t,this.$check.hide(),this.playernumber=t.room_player_number,this.round_second=t.room_round_second,this.players=s,this.$box.find(".room-title > span").text("房间 "+this.room_id),this.$box.find(".room-player").empty();for(let t=0;t<s.length;t++)this.padding_info(s[t]);this.$box.show()}padding_info(t){let s=this.$box.find(".room-player"),n=$(`\n<div class='player-element'>\n    <div class='player-photo'>\n        <img src='${t.photo}'>\n    </div>\n    <div class='player-name'>\n        <span>${t.name}</span>\n    </div>\n</div>\n`);s.append(n)}}class SplendorRoomSocket{BASE_WSS="wss://app3774.acapp.acwing.com.cn";constructor(t){this.root=t,this.start()}start(){this.ws=new WebSocket(`${this.BASE_WSS}/wss/splendor/multiplayer/room/?token=`+localStorage.getItem("gc-access")),this.receive()}receive_create_room(t){this.root.room_id=t.room_id,this.root.need_pass=t.need_pass,this.root.receive_create_room(t.config)}create_room(t){let s={room_config:t,room_owner:this.root.player_info};this.ws.send(JSON.stringify({event:"create_room",content:s}))}cancel_room(){this.ws.send(JSON.stringify({event:"cancel_room",content:{cancel_room:"true"}}))}start_game(){this.ws.send(JSON.stringify({event:"start_game",content:{start_game:"true"}}))}join_room(t,s,n,i="false"){let e={room_id:t,pass:n,player_info:s,player_info:s,match:i};this.ws.send(JSON.stringify({event:"join_room",content:e}))}receive_join_room(t){t.players.length>=4&&this.root.start_game(t.config,t.players,t.room_id)}receive_match_success(t){this.root.match_success(t)}stop_match(t,s){let n={email:t,score:s};this.ws.send(JSON.stringify({event:"stop_match",content:n}))}match(t,s){let n={email:t,score:s};this.ws.send(JSON.stringify({event:"match",content:n}))}receive(){this.ws.onmessage=t=>{let s=JSON.parse(t.data),n=s.event,i=s.content;if("create_room"===n)this.receive_create_room(i);else if("join_room"===n)"false"===i.match?this.root.room.receive_join_room(i.config,i.players):this.receive_join_room(i);else if("match_success"===n)this.receive_match_success(i);else{if(s.email===this.root.player_info.email)return!1;"start_game"===n?this.root.room.start_game():"cancel_room"===n&&this.root.room.cancel_room()}}}}
