export class GameClubSpan {
    constructor(id, os){
        this.id = id;
        this.os = os;
        this.$root_div = $("#" + this.id);
        this.$span_loading = $(`
<div class="wrapper">
    <div class="rubik-loader"></div>
</div>
`);
        this.$span_div = $(`
<div class="gc-home-span">
    <div class="tool-wrap">
        <div class="tool-border"></div>
        <div class="tool-left">
            <img src="/static/gameclub/images/home/right.svg">
        </div>
        <div class="tool-list">
            <div class="tool-title">
                <span>工具栏</span>
            </div>
            <div class='tool-list-content'>
            </div>
        </div>
    </div>
    <section class="gc-home-span-top">
        <div class='gc-home-span-top-title'>
        </div>
        <div class='gc-home-span-top-opacity'>
            <img src='/static/gameclub/images/home/O.svg' id='O'>
            <img src='/static/gameclub/images/home/O1.svg' id='O1' style='display:none'>
            <div><span class="gc-home-span-top-opacity-title">页面设置</span></div>
        </div>
        <div class='gc-home-span-top-profile'>
            <div class='gc-home-span-top-profile-name'>

            </div>
            <div class='gc-home-span-top-profile-photo'>
                <img width='30' height='30' src=''>
            </div>
        </div>
        <div class='gc-home-span-top-setting'>
            <div class='gc-home-span-top-setting-img'><img src='/static/gameclub/images/home/setting.svg'>
            </div>
            <div class='gc-home-span-top-setting-title'>设置</div>
        </div>
        <div class="gc-home-span-top-signout">
            <button>退出</button>
        </div>
    </section>
    <div class='gc-home-span-page-setting'>
        <div class='opacity'>
            <div class='setting-title'> 背景透明度 </div>
            <div id='opacityslider'> </div>
        </div>
        <div class='color'>
            <div class='setting-title'> 字体颜色 </div>
            <div id="red"></div>
            <div id="green"></div>
            <div id="blue"></div>
        </div>
        <div class='button'>
            <button id='enter'> 确定 </button>
            <button id='cancel'> 取消 </button>
        </div>
    </div>
    <div class="gc-home-span-content">
        <div class="gc-home-span-comments"></div>
        <section class='gc-home-span-game'>
            <section class='gc-home-span-game-div'>
                <div class='gc-home-span-game-title-wrap'>
                    <div class='gc-home-span-game-title'>
                        全部游戏
                    </div>
                    <div class='gc-home-span-game-search-input'>
                        <input name='all-game-search' type='text' placeholder='输入游戏名' autocomplete='off'>
                    </div>
                </div>
                <div class='gc-home-span-game-list-wrap'>
                    <a class='gc-home-span-game-list-left' id='all-left'>
                        <img src="/static/gameclub/images/home/left.svg">
                    </a>
                    <div class='gc-home-span-game-content'>
                        <div class='gc-home-span-game-list' id='game-list'>
                        </div>
                    </div>
                    <a class='gc-home-span-game-list-search' id='all-search'>
                        <img src='/static/gameclub/images/home/search.png'>
                        <span>搜索</span>
                    </a>
                    <a class='gc-home-span-game-list-right' id='all-right'>
                        <img src="/static/gameclub/images/home/right.svg">
                    </a>
                </div>
            </section>
            <section class='gc-home-span-game-div'>
                <div class='gc-home-span-game-title-wrap'>
                    <div class='gc-home-span-game-title'>
                        最近游玩
                    </div>
                    <div class='gc-home-span-game-search-input'>
                        <input name='play-game-search' type='text' placeholder='输入游戏名' autocomplete='off'>
                    </div>
                </div>
                <div class='gc-home-span-game-list-wrap'>
                    <a class='gc-home-span-game-list-left' id='play-left'>
                        <img src="/static/gameclub/images/home/left.svg">
                    </a>
                    <div class='gc-home-span-game-content'>
                        <div class='gc-home-span-game-list' id='game-play'>
                        </div>
                    </div>
                    <a class='gc-home-span-game-list-search' id='play-search'>
                        <img src='/static/gameclub/images/home/search.png'>
                        <span>搜索</span>
                    </a>
                    <a class='gc-home-span-game-list-right' id='play-right'>
                        <img src="/static/gameclub/images/home/right.svg">
                    </a>
                </div>
            </section>
        </section>
        <div class="gc-home-span-social"></div>
    </div>
</div>
`);
        this.$span_div.hide();
        this.$root_div.append(this.$span_div);
        this.$root_div.append(this.$span_loading);
        this.$span_top = this.$span_div.find('.gc-home-span-top');
        this.$span_title = this.$span_div.find('.gc-home-span-top-title');
        this.$span_profile = this.$span_div.find('.gc-home-span-top-profile');
        this.$span_setting = this.$span_div.find('.gc-home-span-top-setting');
        this.$span_signout = this.$span_div.find('.gc-home-span-top-signout > button');
        this.$span_op = this.$span_div.find('.gc-home-span-top-opacity');
        this.$span_game_all = this.$span_div.find('#game-list');
        this.$span_game_play = this.$span_div.find('#game-play');
        this.$span_page_setting = this.$span_div.find('.gc-home-span-page-setting');
        this.setting = new GameClubSetting(this);
        this.$tool_wrap = this.$span_div.find('.tool-wrap');
        this.start();
    }

    start(){
        setTimeout(() => {
            this.$span_loading.fadeOut();
            this.$span_div.fadeIn();
        }, 500);
        this.get_info();
        this.get_tools();
        this.add_listening_events();
    }

    get_element(v){
        let name = v.name;
        let types = v.types
        let photo = v.photo;
        let url = v.url;
        let element = $(`
<div class='gc-home-game-element'>
    <a href='${url}' target='_blank'>
    <div class='gc-home-game-element-top'>
        <div class='gc-home-game-element-photo'>
            <img src=''>
        </div>
        <div class='gc-home-game-element-title'>
        </div>
    </div>
    <div class='gc-home-game-element-types'>
    </div>
    <div class='gc-home-game-element-date'>
    </div>
</div>
`);
        element.find('.gc-home-game-element-photo > img').attr('src', photo);
        element.find('.gc-home-game-element-title').text(name);
        if(types !== ''){
            let types_list = types.split(',');
            for(let i = 0;i < types_list.length;i++){
                let type_ele = $(`
<div class='gc-home-game-element-type'> </div>
`);
                type_ele.text(types_list[i]);
                element.find('.gc-home-game-element-types').append(type_ele);
            }
        }
        if(v.last_date){
            element.find('.gc-home-game-element-date').text('最近游玩: ' + v.last_date);
        }

        return element;
    }


    load_setting(){
        console.log(`${this.user_id}-setting`);
        console.log( localStorage.getItem(`${this.user_id}-setting`));
        let setting_json_str = localStorage.getItem(`${this.user_id}-setting`);
        if(setting_json_str){
            this.setting_json = JSON.parse(setting_json_str);
        }else{
            this.setting_json = {
                'opacity': 0.59,
                'rgb': '255,182,193',
            };
            let new_setting_json_str = JSON.stringify(this.setting_json);
            localStorage.setItem(`${this.user_id}-setting`, new_setting_json_str);
        }
        console.log(`${this.user_id}-setting`);
        console.log( localStorage.getItem(`${this.user_id}-setting`));
    }

    save_setting(){
        let new_setting_json_str = JSON.stringify(this.setting_json);
        localStorage.setItem(`${this.user_id}-setting`, new_setting_json_str);
    }

    get_setting(name){
        return this.setting_json[name];
    }

    set_setting(name, value){
        this.setting_json[name] = value;
    }

    add_widget(){
        let outer = this;
        $( "#opacityslider" ).slider({
            value: outer.get_setting('opacity'),
            min: 0,
            max: 1,
            step: 0.01,
            range: 'min',
            slide: () => {
                let value = $('#opacityslider').slider("value");
                outer.set_setting('opacity', value);
                outer.set_back();
            },
            change: () => {
                let value = $('#opacityslider').slider("value");
                outer.set_setting('opacity', value);
                outer.set_back();
            },
        });
        $( "#red, #green, #blue" ).slider({
            orientation: "horizontal",
            range: "min",
            max: 255,
            value: 127,
            slide: () => {
                var red = $( "#red" ).slider( "value" ),
                    green = $( "#green" ).slider( "value" ),
                    blue = $( "#blue" ).slider( "value" );
                outer.set_setting('rgb', red + ',' + green + ',' + blue);
                outer.set_color(true);
            },
            change: () => {
                var red = $( "#red" ).slider( "value" ),
                    green = $( "#green" ).slider( "value" ),
                    blue = $( "#blue" ).slider( "value" );
                outer.set_setting('rgb', red + ',' + green + ',' + blue);
                outer.set_color(true);
            },
        });
        let rgb = this.get_setting('rgb').split(',');
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        $( "#red" ).slider( "value", r);
        $( "#green" ).slider( "value", g );
        $( "#blue" ).slider( "value", b );

    }

    add_listening_events(){
        this.$span_signout.on('click', () => {
            clear_tokens();
            window.location.href = `${BASE_URL}/`;
        });
        this.$span_op.on('mouseenter', () => {
            this.$span_op.find('#O').hide();
            this.$span_op.find('#O1').show();
        }).on('mouseleave', () => {
            this.$span_op.find('#O1').hide();
            this.$span_op.find('#O').show();
        });
        this.$span_op.on('click', () => {
            this.$span_page_setting.addClass('gc-home-setting-flex');
        });
        this.$span_page_setting.find('#enter').on('click', () => {
            this.$span_op.find('#O1').hide();
            this.$span_op.find('#O').show();
            this.$span_page_setting.removeClass('gc-home-setting-flex');
            this.save_setting();
        });
        this.$span_page_setting.find('#cancel').on('click', () => {
            this.$span_op.find('#O1').hide();
            this.$span_op.find('#O').show();
            this.$span_page_setting.removeClass('gc-home-setting-flex');
        });
        this.$span_profile.find('img').on('click', () => {
            window.open(this.photo, '_blank');
        });

        this.$span_setting.on('click', () => {
            this.setting.show();
        });
        this.$tool_wrap.find('.tool-border').on('mouseenter', () => {
            this.$tool_wrap.find('.tool-border').hide();
            this.$tool_wrap.find('.tool-left').hide();
            this.$tool_wrap.find('.tool-list').animate({width:'100px'});
        });
        this.$tool_wrap.find('.tool-left').on('mouseenter', () => {
            this.$tool_wrap.find('.tool-border').hide();
            this.$tool_wrap.find('.tool-left').hide();
            this.$tool_wrap.find('.tool-list').animate({width:'100px'});
        });
        this.$tool_wrap.find('.tool-list').on('mouseleave', () => {
            this.$tool_wrap.find('.tool-list').animate({width:'0px'});
            this.$tool_wrap.find('.tool-border').fadeIn();
            this.$tool_wrap.find('.tool-left').fadeIn();
        });
        this.$span_div.find('#all-left').on('click', () => {
            this.add_slider('#game-list', this.all_game_length, true);
        });
        this.$span_div.find('#all-right').on('click', () => {
            this.add_slider('#game-list', this.all_game_length, false);
        });
        this.$span_div.find('#play-left').on('click', () => {
            this.add_slider('#game-play', this.play_game_length, true);
        });
        this.$span_div.find('#play-right').on('click', () => {
            this.add_slider('#game-play', this.play_game_length, false);
        });
        this.$span_div.find('#all-search').on('click', () => {
            let input_div = this.$span_div.find('[name=all-game-search]');
            console.log(input_div);
            input_div.fadeIn();
            input_div.focus();
        });
        this.$span_div.find('#play-search').on('click', () => {
            let input_div = this.$span_div.find('[name=play-game-search]');
            input_div.fadeIn();
            input_div.focus();
        });
        this.$span_div.find('[name=all-game-search]').keydown((e) => {
            if(e.which === 13){
                let input_div = this.$span_div.find('[name=all-game-search]');
                input_div.fadeOut();
                this.search_game('#game-list', input_div.val());
                input_div.val('');
                return true;
            }
        }).blur(() => {
            let input_div = this.$span_div.find('[name=all-game-search]');
            input_div.fadeOut();
            return true;
        });
        this.$span_div.find('[name=play-game-search]').keydown((e) => {
            if(e.which === 13){
                let input_div = this.$span_div.find('[name=play-game-search]');
                input_div.fadeOut();
                input_div.val('');
                this.search_game('#game-play', input_div.val());
                return true;
            }
        }).blur(() => {
            let input_div = this.$span_div.find('[name=play-game-search]');
            input_div.fadeOut();
            return true;
        });
    }

    search_game(ele, game_name){
        let re = new RegExp(".*" + game_name + ".*", 'i');
        let list = $(ele);
        let ch = list.children();
        for(let i = 0; i < ch.length;i++){
            let element = $(ch[i]);
            let name = element.find('.gc-home-game-element-title').text();
            if(name.match(re)){
                let value = -i * 280;
                this.$span_div.find(ele).css('transform', 'translateX(' + value + 'px)');
                element.hover();
                return true;
            }
        }
    }

    add_slider(ele, len, left){
        console.log(this.$span_div.find(ele));
        let value = parseInt(this.$span_div.find(ele).css('transform').split(',')[4]);
        if(left){
            if(value === 0){
                return ;
            }
            value = Math.min(0, value + 840);
        }else{
            if(value <= -140 * len){
                return ;
            }
            value = Math.max(-140 * len, value - 840);
        }
        this.$span_div.find(ele).css('transform', 'translateX(' + value + 'px)')

    }

    set_back(){
        let opacity = this.get_setting('opacity');
        this.$span_div.css('background', 'linear-gradient(rgba(0, 0, 0, ' + opacity + '), rgba(0, 0, 0, ' + opacity + ')), url(' + this.back + ') repeat 0% 20%/ cover');
    }

    set_color(element){
        let rgb = this.get_setting('rgb').split(',');
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        let color = '#' + hexFromRGB(r, g, b);
        this.$span_div.css('color', color);
        if(element) this.$span_div.find('.gc-home-game-element').css('background', color + "80");
    }


    padding_info(rep){
        this.name = rep.name;
        this.back = rep.back;
        this.photo = rep.photo;
        this.email = rep.email;
        this.user_id = rep.user_id;
        this.load_setting();
        this.set_back();
        this.set_color(false);
        this.add_widget();
        this.$span_profile.find('.gc-home-span-top-profile-name').text(rep.name);
        this.$span_profile.find('img').attr('src', rep.photo);
        this.$span_title.text(rep.name.toUpperCase() + '\'  个人空间');
        this.padding_game(rep.game_list, rep.game_play);
        this.setting.padding_info();
    }

    padding_game(all, me){
        this.all_game_length = all.length;
        this.play_game_length = me.length;
        if(all){
            all.forEach((value, index, array) => {
                this.$span_game_all.append(this.get_element(value));
            });
        }
        if(me){
            me.forEach((value, index, array) => {
                this.$span_game_play.append(this.get_element(value));
            });
        }
        this.set_color(true);
    }

    get_tool_element(value){
        let tool_element = $(`
<div class='tool-element-wrap'>
    <a>
        <div class='tool-element-photo'>
            <img>
        </div>
        <div class='tool-element-name'>
            <span></span>
        </div>
    </a>
</div>
`);
        tool_element.find('a').attr('href', value.url);
        tool_element.find('a').attr('name', value.name);
        tool_element.find('a').attr('target', "_blank");
        tool_element.find('.tool-element-photo > img').attr('src', value.photo);
        tool_element.find('.tool-element-name > span').text(value.name);
        return tool_element;
    }

    padding_tools(tools){
        console.log(tools);
        let tool_list = this.$tool_wrap.find('.tool-list-content');
        tools.forEach((value, index, array) => {
            tool_list.append(this.get_tool_element(value));
        });
    }

    get_tools(){
        $.ajax({
            url: `${BASE_URL}/tool/get_tool_list/`,
            type: 'get',
            data: {
                'type': 'all',
            },
            headers : {
                'Authorization': 'Bearer ' + localStorage.getItem('gc-access'),
            },
            success: rep => {
                if(rep.result === 'success'){
                    this.padding_tools(rep.content);
                }else{
                    console.log(rep.content);
                }
            },
            error : () => {
                window.location.href = `${BASE_URL}/`;
            }
        });
    }

    get_info(){
        $.ajax({
            url : `${BASE_URL}/gameclub/auth/get_info/`,
            type : 'post',
            headers : {
                'Authorization': "Bearer " + localStorage.getItem('gc-access'),
            },
            success : rep => {
                refresh_tokens();
                this.padding_info(rep);
            },
            error : () => {
                window.location.href = `${BASE_URL}/`;
            }
        });
    }
}
