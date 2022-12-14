class CardsManager extends GameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.sm = this.playground.shader_manager;
        this.gl = this.playground.gl;
        // card: [id, gem, score, backIndex, spend]
        this.cards = {
            instance: [],
            count: { level1: 40, level2: 30, level3: 20 },
            // count: { level1: 4, level2: 4, level3: 4 },
            board_cards: {
                level1: [null, null, null, null],
                level2: [null, null, null, null],
                level3: [null, null, null, null],
            },
            all_cards: { level1: [], level2: [], level3: [] },
        };
        this.init();
    }

    init() {
        this.init_cards();
    }

    get_card(card_uuid){
        for(let key in this.cards.instance){
            let c = this.cards.instance[key];
            if(c.uuid === card_uuid){
                return c;
            }
        }
    }

    init_cards() {
        // multi to ajax
        if (this.playground.mode !== '单人') {
            this.init_cards_from_web();
        } else {
            // single init
            this.init_cards_from_local();
        }

        for (let i = 0; i < 4; i++) {
            for (let level = 1; level <= 3; level++) {
                this.next_card(level, i);
            }
        }
    }

    init_cards_from_local() {
        let base_level1_list = [];
        for (let i = 0; i < this.cards.count.level1; i++) {
            base_level1_list.push(i);
        }
        base_level1_list.sort(() => {
            return (0.5 - Math.random());
        });
        let base_level2_list = [];
        for (let i = 0; i < this.cards.count.level2; i++) {
            base_level2_list.push(i);
        }
        base_level2_list.sort(() => {
            return (0.5 - Math.random());
        });
        let base_level3_list = [];
        for (let i = 0; i < this.cards.count.level3; i++) {
            base_level3_list.push(i);
        }
        base_level3_list.sort(() => {
            return (0.5 - Math.random());
        });
        this.cards.all_cards.level1 = base_level1_list;
        this.cards.all_cards.level2 = base_level2_list;
        this.cards.all_cards.level3 = base_level3_list;
    }

    init_cards_from_web() {
        this.cards.all_cards.level1 = this.playground.config['base_level1_list'];
        this.cards.all_cards.level2 = this.playground.config['base_level2_list'];
        this.cards.all_cards.level3 = this.playground.config['base_level3_list'];
    }

    next_card(level, location) {
        const gl = this.gl;
        let offset_x = fix(gl, card_next_card_offset_x, true);
        let offset_y = fix(gl, card_next_card_offset_y, false);
        let x_step = fix(gl, card_next_card_x_step, true);
        let y_step = fix(gl, card_next_card_y_step, false);
        let bLevel = level;
        level = 'level' + level;
        let cardIndex = this.cards.all_cards[level].pop();
        if (cardIndex >= 0) {
            let card = origin_cards[level][cardIndex];
            this.cards.count[level]--;
            let card_instance = new Card(this, card, offset_x, offset_y + (bLevel - 1) * y_step, bLevel, location);
            console.log('next ' + level + ' card | now ' + level + ' cards count:' + this.cards.count[level]);
            this.cards.instance.push(card_instance);
            this.cards.board_cards[level][location] = card_instance;
            card_instance.move_to(offset_x + (location + 1) * x_step,
                offset_y + (bLevel - 1) * y_step);
        }
    }

    update() {
        this.render();
    }

    render() {
        const gl = this.gl;
        let offset_x = fix(gl, card_next_card_offset_x, true);
        let offset_y = fix(gl, card_next_card_offset_y, false);
        let x_step = fix(gl, card_next_card_x_step, true);
        let y_step = fix(gl, card_next_card_y_step, false);
        // 渲染第一列
        for (let i = 1; i <= 3; i++) {
            this.sm.shader_card_back(offset_x, offset_y + (i - 1) * y_step, i - 1, 5);
            this.sm.shader_top_back(offset_x, offset_y + (i - 1) * y_step, [1, 1, 1, 0.5]);
            let c = this.cards.count['level' + i];
            if(c > 0 && c < 10){
                this.sm.shader_score(offset_x, offset_y + (i - 1) * y_step, c - 1);
            }else if(c >= 10){
                this.sm.shader_score(offset_x, offset_y + (i - 1) * y_step, 9);
            }
        }
    }
    click_card(x, y){
        for(let i in this.cards.instance){
            if(this.cards.instance[i].clicked(x, y)){
                return this.cards.instance[i];
            }
        }
        return null;
    }
}