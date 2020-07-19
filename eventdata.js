
function SetEventData() {

    Novel = [];

    //0     : start event
    //10000 : map event
    //20000 : end event
    //30000 : battle event
    //40000 : item event

    if (event_code < 10000) {
        EventData_Start();
    } else
        if (event_code < 20000) {
            EventData_Map();
        } else
            if (event_code < 30000) {
                EventData_End();
            } else
                if (event_code < 40000) {
                    EventData_Battle();
                } else
                    if (event_code < 50000) {
                        EventData_Item();
                    } else
                        if (event_code < 60000) {
                            EventData_TurnTalk();
                        }

    novel_isSetData = true;
}

function EventData_Start() {
    switch (event_code) {
        case 0: //stage1 start
            Novel = [
                { command: 'stage_set', name: 'stage_town01' },
                { command: 'fade', name: 'black', value: 1, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: '－翌日－' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_konta', value: 3, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 64, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「まさか本当に抜け出すだなんてね。」' },
                { command: 'sentence', sentence: 'こずえ「しかも先生直々の許可って・・・。」' },
                { command: 'sentence', sentence: 'こずえ「こんな事していたら、絶対変だって思われるわよ・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_change', name: 'stand_akino', value: 3 },
                { command: 'sentence', sentence: 'あきの「うふふ♪　探索、早く始めようよ。　何が出て来るのか楽しみ♪」' },
                { command: 'sentence', sentence: 'こずえ「お構いなしね・・・。」' },
                { command: 'stand_change', name: 'stand_akino', value: 1 },
                { command: 'sentence', sentence: 'あきの「そういえば、こん太くん、」' },
                { command: 'sentence', sentence: 'こんた「？？」' },
                { command: 'sentence', sentence: 'あきの「先生にお札、もらったんでしょ？」' },
                { command: 'sentence', sentence: 'こんた（コクッ）' },
                { command: 'sentence', sentence: 'あきの「あやしい所でそれを使うと、かくれた物が出て来るんだよね？」' },
                { command: 'sentence', sentence: 'こんた（コクッ）' },
                { command: 'sentence', sentence: 'こずえ「えぇ～・・・。　信じてるの・・・？」' },
                { command: 'sentence', sentence: 'あきの「先生の作ったお札だもん。　きっとすごい力があるに決まってるよ！」' },
                { command: 'sentence', sentence: 'こずえ「あぁ～、んむ。　はいはい、早く始めよう。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 1: //stage 2 start
            Novel = [
                { command: 'stage_set', name: 'stage_ground' },
                {
                    command: 'addenemy', name: "宇津木戸和樹", icon: 'utukido', skill: 'クレイジーオービット',
                    pos_x: 1, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 0, ar: 1, mode: 'none',
                    direction: 0, distance: 0, resist: 'blow', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "野球ボール", icon: 'baseball', skill: 'ショットガンスプレッド',
                    pos_x: 2, pos_y: 2, ap: 0, nowhp: 10, maxhp: 10, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'rotation',
                    direction: 0, distance: 0, resist: 'blow', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "バスケットボール", icon: 'basketball', skill: 'キャノンブレイカー',
                    pos_x: 1, pos_y: 6, ap: 0, nowhp: 20, maxhp: 20, condition: [], of: 20, df: 10, mr: 2, ar: 1, mode: 'diagonal',
                    direction: 3, distance: 0, resist: 'blow', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "ラグビーボール", icon: 'rugbyball', skill: 'デッドリーグレネード',
                    pos_x: 3, pos_y: 0, ap: 0, nowhp: 20, maxhp: 20, condition: [], of: 20, df: 10, mr: 2, ar: 1, mode: 'straight',
                    direction: 0, distance: 0, resist: 'blow', end: false, dfid: ''
                },
                { command: 'p_pos_set', pos_x: 3, pos_y: 7 },
                { command: 'fade', name: 'black', value: 1, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: '－数時間後－' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_konta', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: 16, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「また休んじゃって・・・。単位取れるのかしら・・・。」' },
                { command: 'wait', value: 2 },
                { command: 'sentence', sentence: 'こずえ「どうしたの？夢人？」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'グラウンドがざわついている。' },
                { command: 'wait', value: 1 },
                { command: 'stand_change', name: 'stand_kozue', value: 4 },
                { command: 'sentence', sentence: '男子生徒の声「うぎゃあああああああああ！！！」' },
                { command: 'sentence', sentence: 'こずえ「なにあれ！！ボールがとんでもない速度で飛んでいる・・・」' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_utukido', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: '男子生徒「ぐああああああ！！！」' },
                { command: 'sentence', sentence: 'こずえ「あれは宇津木戸くん・・・？　彼が引き起こしているというの・・・？」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「とりぁ～！！！」' },
                { command: 'stand_change', name: 'stand_kozue', value: 6 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「なんでアッキーがあんなところに・・・」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「ちょっとー！！　危ないわよー！！」' },
                { command: 'sentence', sentence: 'あきの「だいじょうーぶ！！　なんとかするー！！」' },
                { command: 'sentence', sentence: 'こずえ「なんとかするって、いったい何を・・・」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
        case 2: //stage 3 start
            Novel = [
                { command: 'stage_set', name: 'stage_gs_parking' },
                {
                    command: 'addenemy', name: "谷山量子", icon: 'taniyama', skill: 'なし',
                    pos_x: 1, pos_y: 1, ap: 0, nowhp: 120, maxhp: 120, condition: [], of: 0, df: 10, mr: 0, ar: 1, mode: 'none',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "空きカン", icon: 'can', skill: 'ダストレイ',
                    pos_x: 1, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "空きカン", icon: 'can', skill: 'ダストレイ',
                    pos_x: 7, pos_y: 4, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "空きカン", icon: 'can', skill: 'ダストレイ',
                    pos_x: 5, pos_y: 6, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "のぼり", icon: 'flag', skill: 'フラッグランサー',
                    pos_x: 3, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "のぼり", icon: 'flag', skill: 'フラッグランサー',
                    pos_x: 3, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, condition: [], of: 20, df: 10, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "車", icon: 'car', skill: 'メテオクラッシュ',
                    pos_x: 8, pos_y: 1, ap: 0, nowhp: 60, maxhp: 60, condition: [], of: 30, df: 20, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "車", icon: 'car', skill: 'メテオクラッシュ',
                    pos_x: 1, pos_y: 6, ap: 0, nowhp: 60, maxhp: 60, condition: [], of: 30, df: 20, mr: 1, ar: 1, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },

                { command: 'p_pos_set', pos_x: 8, pos_y: 7 },
                { command: 'addskill', name: 'ground' },
                { command: 'fade', name: 'black', value: 1, type: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「はっ・・・！　あんなところに！」' },
                { command: 'stand', name: 'stand_taniyama', value: 0, pos_x: 80, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'たにやま「あはっ！　ここまで来れる？！」' },
                { command: 'sentence', sentence: 'こずえ「重力を操っている・・・？！　こんなことが・・・」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「ん・・・？　アッキー？」' },
                { command: 'wait', value: 0.6 },
                { command: 'animation', name: 'anime_odori_daiti' },
                { command: 'sentence', sentence: 'ゴゴゴゴ・・・' },
                { command: 'wait', value: 1 },
                { command: 'stand_change', name: 'stand_kozue', value: 8 },
                { command: 'sentence', sentence: 'ドカーン！！' },
                { command: 'sentence', sentence: 'ひび割れた地面から大地の精霊が姿をあらわした！' },
                { command: 'sentence', sentence: 'こずえ「・・・・・」' },
                { command: 'sentence', sentence: 'たにやま「うっそ・・・」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'たにやま「ち、近寄るな！　近寄ったら攻撃するからな！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];

            break;
        case 3:
            Novel = [
                { command: 'stage_set', name: 'stage_meguroku' },
                { command: 'p_pos_set', pos_x: 0, pos_y: 5 },
                { command: 'addskill', name: 'flame' },
                { command: 'fade', name: 'black', value: 1, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_konta', value: 4, pos_x: 32, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 64, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「先生の指示していた場所はこのあたりだけれど、」' },
                { command: 'sentence', sentence: '「それでもまだ範囲は絞り切れていないわね。」' },
                { command: 'sentence', sentence: 'あきの「だいじょうぶ！」' },
                { command: 'sentence', sentence: 'あきの「探していればきっとみつかる！」' },
                { command: 'sentence', sentence: 'こずえ「そうね。あんたってそういう感覚鋭いから、頼りにしてるわ。」' },
                { command: 'sentence', sentence: 'こずえ「でもほどほどにね。」' },
                { command: 'sentence', sentence: '「高校生がこんな昼間っぱからうろうろしているなんて、変に思われるから。」' },
                { command: 'sentence', sentence: 'あきの「こずえちゃん。」' },
                { command: 'sentence', sentence: 'こずえ「？？？」' },
                { command: 'sentence', sentence: 'あきの「気にしたら負けだよ？」' },
                { command: 'sentence', sentence: 'こずえ「いやぁ・・・、少しは恥じらいを持ちなさいよ・・・。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'stand_delete', name: 'stand_konta' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'wait', value: 1 },

                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 2, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 1 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 7, pos_y: 4, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 1 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 4, pos_y: 6, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 1 },

                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_konta', value: 4, pos_x: 32, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 64, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「なんか変なのが出て来たわね。」' },
                { command: 'sentence', sentence: 'あきの「だいじょーぶ。　私がやっつけてあげる！」' },
                { command: 'sentence', sentence: 'こずえ「気を付けてね。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },

            ];
            break;

        case 4:
            Novel = [
                { command: 'stage_set', name: 'stage_movie' },
                { command: 'p_pos_set', pos_x: 4, pos_y: 7 },
                { command: 'addskill', name: 'flame' },

                {
                    command: 'addenemy', name: "サンダーワーム", icon: 'tworm', skill: 'ボルティックディガー',
                    pos_x: 5, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 3, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "セキュアタレット", icon: 'cannon', skill: 'ブラスターキャノン',
                    pos_x: 1, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 0, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "セキュアタレット", icon: 'cannon', skill: 'ブラスターキャノン',
                    pos_x: 8, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 0, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "オーブスイッチ", icon: 'orbswitch_on', skill: 'のーん',
                    pos_x: 1, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 0, df: 10, mr: 0, ar: 3, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: 'orb_a'
                },
                {
                    command: 'addenemy', name: "オーブスイッチ", icon: 'orbswitch_on', skill: 'のーん',
                    pos_x: 8, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 0, df: 10, mr: 0, ar: 3, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: 'orb_b'
                },

                {
                    command: 'addplayer', name: 'ソルジャー', icon: 'sfsoldier',
                    pos_x: 3, pos_y: 6, ap: 0, mr: 2, ar: 1,
                    nowhp: 100, maxhp: 100, of: 30, df: 30, end_mv: false, end_at: false,
                    skill: 'blade', operation: false,
                },
                {
                    command: 'addplayer', name: 'ソルジャー', icon: 'sfsoldier',
                    pos_x: 6, pos_y: 6, ap: 0, mr: 2, ar: 1,
                    nowhp: 100, maxhp: 100, of: 30, df: 30, end_mv: false, end_at: false,
                    skill: 'blade', operation: false,
                },

                { command: 'stand', name: 'stand_konta', value: 8, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 4, pos_x: 32, pos_y: 0 },
                { command: 'fade', name: 'white', value: 1, type: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こんた「・・・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_change', name: 'stand_akino', value: 1 },
                { command: 'sentence', sentence: 'あきの「こん太くん！よかった、目が覚めた！」' },
                { command: 'sentence', sentence: 'あきの「大変なの！　映画観てたら世界に引き込まれちゃって、」' },
                { command: 'sentence', sentence: '「閉じ込められてしまったみたい。」' },
                { command: 'sentence', sentence: 'こんた「・・・・・。」' },
                { command: 'stand_change', name: 'stand_akino', value: 4 },
                { command: 'sentence', sentence: 'あきの「困ったなぁ・・・どうしよう・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: '兵士らしき者「どうしたんだ君たち！　なぜこんな所に・・・」' },
                { command: 'sentence', sentence: '「クソッ！　ゲートが閉まっている！」' },
                { command: 'sentence', sentence: '「あのオーブスイッチを破壊しなければ！」' },
                { command: 'sentence', sentence: '兵士らしき者「君たちはここにいなさい！我々が何とかするから！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },

            ];
            break;

        case 5:
            Novel = [
                { command: 'stage_set', name: 'stage_sephirastower' },
                { command: 'p_pos_set', pos_x: 0, pos_y: 7 },
                { command: 'addskill', name: 'flame' },
                {
                    command: 'addenemy', name: "ホプネイト", icon: 'hopnate', skill: 'なっしんぐ',
                    pos_x: 2, pos_y: 2, ap: 0, nowhp: 100, maxhp: 100, of: 10, df: 100, mr: 2, ar: 2, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "ホプネイト", icon: 'hopnate', skill: 'なっしんぐ',
                    pos_x: 8, pos_y: 1, ap: 0, nowhp: 100, maxhp: 100, of: 10, df: 100, mr: 2, ar: 2, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "ホプネイト", icon: 'hopnate', skill: 'なっしんぐ',
                    pos_x: 8, pos_y: 6, ap: 0, nowhp: 100, maxhp: 100, of: 10, df: 100, mr: 2, ar: 2, mode: 'random',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },

                { command: 'fade', name: 'black', value: 1, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_konta', value: 3, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 3, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「ウフフ♪　いきおいでこんな所まできちゃった♪」' },
                { command: 'sentence', sentence: 'こずえ「ちょっと・・・！　本当にまずいってば・・・」' },
                { command: 'sentence', sentence: 'こずえ「みてよあれ。　きっと偵察機よ。」' },
                { command: 'sentence', sentence: '「見つかったら、ただではすまない。大人しく帰りましょ。」' },
                { command: 'stand_change', name: 'stand_akino', value: 1 },
                { command: 'sentence', sentence: 'あきの「だめだよ、こずえちゃん。　まだ何も手に入れてない。」' },
                { command: 'sentence', sentence: '「せっかく来れたのに、このまま帰るわけにはいかないよ。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete', name: 'stand_konta' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'sentence', sentence: 'あきの「ほら、あれみて！」' },
                { command: 'sentence', sentence: 'こずえ「あれは・・・、キューブ？」' },
                { command: 'stand', name: 'stand_konta', value: 3, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: 'あきの「そう、キューブ。　あの中に大事な情報が入っているはずだよ！」' },
                { command: 'sentence', sentence: 'こずえ「何でわかるの？」' },
                { command: 'sentence', sentence: 'あきの「そんな気がするだけ！」' },
                { command: 'sentence', sentence: 'あきの「あれを取ったらすぐ帰るから、もう少しだけ付き合って！」' },
                { command: 'sentence', sentence: 'こずえ「あれだけだよ！？　絶対よ！？」' },
                { command: 'stand_delete', name: 'stand_konta' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'キューブを取得し、ゲートへ帰還せよ' },
                { command: 'sentence', sentence: 'ミッション　スタート！' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
        case 6:
            Novel = [
                { command: 'stage_set', name: 'stage_minato_souko' },

                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'fade', name: 'black', value: 2, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「はあ・・・。　本当に一人で来てしまった・・・。」' },
                { command: 'sentence', sentence: 'こずえ「思いもしないことが起こりうるから、」' },
                { command: 'sentence', sentence: '「二人にはどうしても言えなかった・・・。」' },
                { command: 'sentence', sentence: '「いまさら後悔してもね・・・。でも何されるか怖いな・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ガタン　ガタガタッ' },
                { command: 'stand_change', name: 'stand_kozue', value: 4 },
                { command: 'sentence', sentence: 'こずえ（来たっ・・・！！）' },
                { command: 'msgwindow', value: 0 },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 4, pos_y: 1, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 3, pos_y: 3, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 5, pos_y: 3, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 4, pos_y: 4, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 8, pos_y: 2, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 0.6 },
                {
                    command: 'addenemy', name: "アンチヤクザ", icon: 'yakuza', skill: 'スランドプレッシャー',
                    pos_x: 7, pos_y: 4, ap: 0, nowhp: 100, maxhp: 100, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「そんな・・・、あんなにいっぱい・・・」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ヤクザA「ハハハ！！　本当に一人で来やがったぜ！！」' },
                { command: 'sentence', sentence: 'ヤクザB「馬鹿だなこいつ。　どうする？痛めつける？」' },
                { command: 'sentence', sentence: 'ヤクザC「いや、身代金を要求しようぜ。その方がうめぇだろ？」' },
                { command: 'sentence', sentence: 'ヤクザD「はぁ？　もったいねぇーな。こいつで遊ぼうぜ。」' },
                { command: 'sentence', sentence: 'ヤクザC「何言ってんだ？　こんなので満足できねーよ。」' },
                { command: 'sentence', sentence: 'ヤクザA「うるせーなお前ら！」' },
                { command: 'sentence', sentence: '「ごちゃごちゃ抜かしてねーで、さっさとつかまえろ！！」' },
                { command: 'sentence', sentence: 'ヤクザ「お、おう！！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ（もう・・・だめかも・・・）' },
                { command: 'wait', value: 2 },
                { command: 'sentence', sentence: 'ズギャン！！！' },
                { command: 'sentence', sentence: 'ヤクザA「こっは！！」' },
                { command: 'enemy_delete', pos_x: 4, pos_y: 4 },
                { command: 'stand_change', name: 'stand_kozue', value: 4 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「！！？」' },
                { command: 'sentence', sentence: '聞き覚えのある声「水臭いなぁ～。こずえちゃんったら～。」' },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 48, pos_y: 0 },
                {
                    command: 'addplayer', name: "あっきーの", icon: "akino",
                    pos_x: 4, pos_y: 4, ap: 1, mr: 4, ar: 1,
                    nowhp: 100, maxhp: 100, of: 20, df: 10, end_mv: false, end_at: false,
                    skill: 'flame', operation: true
                },
                {
                    command: 'addplayer', name: 'ホーク', icon: 'hawk',
                    pos_x: 5, pos_y: 6, ap: 4, mr: 3, ar: 4,
                    nowhp: 200, maxhp: 200, of: 200, df: 50, end_mv: false, end_at: false,
                    skill: 'oneshotkill', operation: false,
                },
                { command: 'sentence', sentence: 'こずえ「アッキー！　なんで？！」' },
                { command: 'sentence', sentence: 'あきの「なんか変だなぁ～と思って、ついてきちゃった。」' },
                { command: 'sentence', sentence: 'こずえ「こん太は・・・大丈夫なの？」' },
                { command: 'sentence', sentence: 'あきの「うん。安全なところにいるよ。」' },
                { command: 'stand_change', name: 'stand_akino', value: 0 },
                { command: 'sentence', sentence: '「それじゃあホーク、ちゃっちゃとすませちゃおっか♪」' },
                { command: 'sentence', sentence: 'こずえ「？！」' },
                { command: 'stand', name: 'stand_hawk', value: 1, pos_x: 96, pos_y: 0 },
                { command: 'sentence', sentence: 'ホーク「わかりやした。姉御。」' },
                { command: 'stand_change', name: 'stand_akino', value: 2 },
                { command: 'sentence', sentence: 'あきの「さ～、何秒で倒しきれるかな？　ＲＴＡだよ？！」' },
                { command: 'sentence', sentence: 'ホーク「そんな、ゲームじゃあるまいし、急かさないで下さいよ。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete', name: 'stand_hawk' },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'アンチヤクザを殲滅せよ' },
                { command: 'sentence', sentence: 'ミッション　スタート！' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
        case 7:
            Novel = [
                { command: 'stage_set', name: 'stage_sweetsfactory' },
                { command: 'turnevent', code: 10014, value: 6 },

                { command: 'fade', name: 'black', value: 2, type: 1 },
                { command: 'wait', value: 2 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'ロボット「ギギギ。コレヨリ、サギョウニ、ハイリマス。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「あのロボットはたぶん、攻撃が通らないかも。」' },
                { command: 'sentence', sentence: 'あきの「お助けマンが来るまで、何とか耐えていこう。」' },
                { command: 'sentence', sentence: '攻撃されている時に、カウンター技を使うことで防ぐことができます。' },
                { command: 'sentence', sentence: 'ただし、使用するにはAPが必要になります。' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: '護衛の到着まで耐え、敵を殲滅せよ。' },
                { command: 'sentence', sentence: 'ミッション　スタート！' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 8:
            Novel = [
                { command: 'stage_set', name: 'stage_electcity' },
                { command: 'fade', name: 'white', value: 1, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_delta', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'デルタ「空間が入り乱れていますね。」' },
                { command: 'sentence', sentence: 'デルタ「どうやら、あのキューブが原因のようです。」' },
                { command: 'sentence', sentence: 'デルタ「敵の陣地には近づかない方が良いでしょう。」' },
                { command: 'sentence', sentence: '「逆にこちらもキューブ内の範囲ならば、」' },
                { command: 'sentence', sentence: '「ダメージを軽減させてくれるようです。」' },
                { command: 'sentence', sentence: 'デルタ「皆さんを転送します。場所を指定してください。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'stand_delete', name: 'stand_delta' },
                { command: 'placement' },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'stand', name: 'stand_delta', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: 'デルタ「目標は敵リーダー、マルクの撃破です。　どうか、ご武運を。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete', name: 'stand_delta' },
                { command: 'sentence', sentence: 'ミッション　スタート！' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 9: //free battle royal
            Novel = [
                { command: 'stage_set', name: 'stage_factory' },

                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: '　 勝利条件：全ての敵をせん滅せよ 　' },
                { command: 'msgwindow', value: 0 },
                { command: 'placement' },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'バトル　スタート！' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10:    //third BR 
            Novel = [

                { command: 'stage_set', name: 'stage_graveyard' },

                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 1 },
                { command: 'stand_br', name: '', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence_br', sentence: '' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete_br' },
                { command: 'wait', value: 2 },
                {
                    command: 'addenemy_br', name: "蓮華こずえ", icon: 'kozue_bc', skill: '呪怨憑依',
                    pos_x: 9, pos_y: 0, ap: 1, nowhp: 10, maxhp: 10,
                    condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                    of: 4, df: 0, mr: 1, ar: 3, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_akino', value: 4, pos_x: 0, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「あっ！　あれは・・・！」' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 9, pos_x: 80, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「どうしてこずえちゃんが・・・」' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「とりあえず、ほかのやつをやっつけて、話を聞いてみよう。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: '　　　　バトル　スタート！！　　　　' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
    }
}

function EventData_Map() {
    switch (event_code) {
        case 10000:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'とくになにもないみたい。' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10001:
            Novel = [
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 0, pos_x: 16, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「なんだかさびれた空地ね。　だれも使ってないのかしら。」' },
                { command: 'sentence', sentence: 'こずえ「んふぅ。」' },
                { command: 'sentence', sentence: 'こずえ「どうせ何も変わらない情景だし、帰りましょうよ。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「クンクン、クンクン」' },
                { command: 'sentence', sentence: 'こずえ「？？」' },
                { command: 'sentence', sentence: 'あきの「やっぱりニオイがする！」' },
                { command: 'sentence', sentence: 'あきの「こん太くん！　お札、なげてみて！」' },
                { command: 'stand', name: 'stand_konta', value: 3, pos_x: -16, pos_y: 0 },
                { command: 'sentence', sentence: 'こんた（コクッ）' },
                { command: 'sentence', sentence: 'こんたはお札を投げてみた！' },
                { command: 'sentence', sentence: 'お札は茂みの方に吸い込まれるように飛んで行った！' },
                { command: 'sentence', sentence: 'シューン！！！' },
                { command: 'fade', name: 'white', value: 0.3, type: 0 },
                { command: 'stand', name: 'stand_deafie', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'fade', name: 'white', value: 0.3, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'stand_delete', name: 'stand_konta', value: 1 },
                { command: 'stand_change', name: 'stand_kozue', value: 4 },
                { command: 'sentence', sentence: '悪そうなネコ「ちっ、ばれちまったか。」' },
                { command: 'sentence', sentence: '悪そうなネコ「おい、野郎ども！　こいつらの相手をしろ！」' },
                { command: 'sentence', sentence: 'ネコの子分A「しょうがねぇーなぁ・・・」' },
                { command: 'sentence', sentence: 'ネコの子分B「わかったで！」' },
                {
                    command: 'addenemy', name: "ディーフィー", icon: 'deafie', skill: 'デッドリードライブ',
                    pos_x: 4, pos_y: 5, ap: 0, nowhp: 40, maxhp: 40, of: 20, df: 10, mr: 2, ar: 1, mode: 'escape',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "オズ", icon: 'ozu', skill: 'ごろにゃん',
                    pos_x: 3, pos_y: 4, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                {
                    command: 'addenemy', name: "カズ", icon: 'kazu', skill: 'まえば',
                    pos_x: 3, pos_y: 6, ap: 0, nowhp: 20, maxhp: 20, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'msgwindow', value: 0 },
                { command: 'rewriting_event', value: 10000 },
                { command: 'end', modechange: false },
            ];
            break;
        case 10002:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'ここはコンビニみたい。' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
        case 10003:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: '運動場だね。' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10004:
            //flame
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'stand', name: 'stand_syoukyakuro', value: 0, pos_x: 160, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'sentence', sentence: 'あきの「ボールが弾んでどうしようもないなぁ～・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_move_record', name: 'stand_syoukyakuro', add_x: -64, add_y: 0, speed: 0 },
                { command: 'stand_move_start', name: 'stand_syoukyakuro' },
                { command: 'sentence', sentence: 'あきの「おや・・・？　あれは・・・？」' },
                { command: 'stand_move_record', name: 'stand_akino', add_x: 64, add_y: 0, speed: 2 },
                { command: 'stand_move_start', name: 'stand_akino' },
                { command: 'wait', value: 0.6 },
                { command: 'stand', name: 'stand_flame', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'stand_change', name: 'stand_akino', value: 4 },
                { command: 'stand_move_record', name: 'stand_akino', add_x: -32, add_y: 0, speed: 8 },
                { command: 'stand_move_start', name: 'stand_akino' },
                { command: 'wait', value: 0.4 },
                { command: 'sentence', sentence: 'あきの「わっ！　びっくりした～！」' },
                { command: 'stand_change', name: 'stand_akino', value: 0 },
                { command: 'sentence', sentence: 'あきの「なあに？　助けてくれるの？」' },
                { command: 'sentence', sentence: '炎の自然霊「ボゥ、ボゥ」' },
                { command: 'stand_change', name: 'stand_akino', value: 2 },
                { command: 'sentence', sentence: 'あきの「ほんと？！　やったー！！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'アッキーノは炎の自然霊「フレイム」を仲間にした！' },
                { command: 'addskill', name: 'flame' },
                { command: 'msgwindow', value: 0 },
                { command: 'rewriting_event', value: 10000 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10005:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 1, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10006:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 7, pos_y: 1, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10007:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 6, pos_y: 3, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10008:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 1, pos_y: 5, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10009:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 2, pos_y: 6, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10010:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 5, pos_y: 6, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10011:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「この電柱！なんかあやしい！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「と、思ったけど、気のせいだったみたい。」' },
                { command: 'sentence', sentence: 'あきの「ざんねんでした、はずれです。」' },
                { command: 'sentence', sentence: 'こずえ「なんじゃそりゃ。」' },
                { command: 'msgwindow', value: 0 },
                {
                    command: 'addenemy', name: "ビッツ", icon: 'bits', skill: 'スターライトビッツ',
                    pos_x: 8, pos_y: 6, ap: 0, nowhp: 30, maxhp: 30, of: 20, df: 10, mr: 1, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'rewriting_event', value: 10012 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10012:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「ここはもう調べたよ。　ちがう所をさがそっ♪」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
        case 10013:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'rewriting_terrain', pos_x: 3, pos_y: 8, value: 0 },
                { command: 'rewriting_terrain', pos_x: 4, pos_y: 8, value: 0 },
                { command: 'rewriting_terrain', pos_x: 5, pos_y: 8, value: 0 },
                { command: 'rewriting_terrain', pos_x: 6, pos_y: 8, value: 0 },
                { command: 'wait', value: 2 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「やったー！　びりびりがなくなったよ！　早く出口へ向かおう！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 10014:
            Novel = [
                { command: 'wait', value: 2 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'キィーーーン・・・' },
                { command: 'wait', value: 1 },
                { command: 'shake', time: 1, depth: 4, speed: 96, vorh: false },
                { command: 'sentence', sentence: 'ドゴォーーーン！！！' },
                { command: 'sentence', sentence: 'あきの「キター！！」' },
                { command: 'stand', name: 'stand_akino', value: 0, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_gester', value: 1, pos_x: 96, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ゲシュテル「流星の英雄ゲシュテル、ただいま参上！！」' },
                { command: 'sentence', sentence: 'ゲシュテル「大丈夫？お姉ちゃん。　待たせてしまってごめんね！」' },
                { command: 'sentence', sentence: 'あきの「ううん♪　来てくれてありがとう！」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ゲシュテル「ふむふむ。　あいつらをやっつければいいんだね。」' },
                { command: 'sentence', sentence: 'あきの「うん！おねがいね！」' },
                { command: 'stand_change', name: 'stand_gester', value: 3 },
                { command: 'sentence', sentence: 'ゲシュテル「わかった！僕、お姉ちゃんのためにひと肌脱ぐよ。」' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_hawk', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'sentence', sentence: 'ホーク「ロボットのくせに脱げんのかよ。」' },
                { command: 'wait', value: 1 },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'stand_delete', name: 'stand_gester' },
                { command: 'stand_delete', name: 'stand_hawk' },
                { command: 'sentence', sentence: '参戦ユニット「ゲシュテル」の配置場所を決めてください。' },
                { command: 'msgwindow', value: 0 },
                { command: 'placement' },
                { command: 'wait', value: 1 },
                { command: 'end', modechange: false },
            ];
            break;
    }
}

function EventData_End() {
    switch (event_code) {
        case 20000:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'stand', name: 'stand_akino', value: 2, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_deafie', value: 2, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: 'ディーフィー「んぎゃぁ～！　ま、ま、まいったーっ！」' },
                { command: 'stand', name: 'stand_kozue', value: 6, pos_x: -16, pos_y: 0 },
                { command: 'wait', value: 0.6 },
                { command: 'sentence', sentence: 'こずえ「一体何をしたら、そんなにぼこぼこになるのよ・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20001:
            Novel = [
                { command: 'stand', name: 'stand_akino', value: 0, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_utukido', value: 2, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: '宇津木戸「うぇ～・・・　げろげろーん・・・」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「なんとかとまったみたい。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20002:
            Novel = [
                { command: 'stand', name: 'stand_taniyama', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'たにやま「のわーーー！！」' },
                { command: 'stand_move_record', name: 'stand_taniyama', add_x: 0, add_y: -144, speed: 8 },
                { command: 'stand_move_start', name: 'stand_taniyama' },
                { command: 'wait', value: 0.6 },
                { command: 'sentence', sentence: '谷山量子は精霊のパンチを食らって天高く飛んで行ってしまった・・・' },
                { command: 'stand_delete', name: 'stand_taniyama' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'sentence', sentence: 'こずえ「ありゃもうダメね・・・。大気圏を貫いて行っちゃったわ。」' },
                { command: 'wait', value: 2 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: true },
            ];
            break;
        case 20003:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'picture', name: 'picture_dentyu', sx: 0, sy: 0, w: 96, h: 80, pos_x: 32, pos_y: 16 },
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「わっ！　なにこの電柱・・・」' },
                { command: 'sentence', sentence: 'こずえ「バグっているの・・・？」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こん太はそーっと手で触れようとしている。' },
                { command: 'sentence', sentence: 'こずえ「ちょっと、危ないって！」' },
                { command: 'fade', name: 'white', value: 0.3, type: 0 },
                { command: 'picture', name: 'picture_dentyu', sx: 96, sy: 0, w: 96, h: 80, pos_x: 32, pos_y: 16 },
                { command: 'fade', name: 'white', value: 0.3, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'こずえ「あれ・・・？　消えた・・・？」' },
                { command: 'sentence', sentence: 'こずえ「なんだったのかしら・・・」' },
                { command: 'picture_delete', name: 'picture_dentyu' },
                { command: 'picture_delete', name: 'picture_dentyu' },
                { command: 'msgwindow', value: 0 },
                { command: 'wait', value: 1 },
                { command: 'enemy_destroy' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_kozue', value: 0, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 4, pos_x: 32, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「あれれ？　まわりにいた妖精さんもいなくなっちゃった。」' },
                { command: 'sentence', sentence: 'こずえ「妖精なのかしら・・・。」' },
                { command: 'sentence', sentence: 'あきの「つま～んないの。」' },
                { command: 'stand_change', name: 'stand_akino', value: 1 },
                { command: 'sentence', sentence: 'あきの「もう、帰ろっ。」' },
                { command: 'sentence', sentence: 'こずえ「あんた、きりかえ早いわね・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'stand_delete', name: 'stand_akino' },
                { command: 'stand_delete', name: 'stand_kozue' },
                { command: 'wait', value: 2 },
                { command: 'stand', name: 'stand_telest', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: '？？？「ありゃりゃぁ・・・気付いちゃったワネ・・・」' },
                { command: 'sentence', sentence: '？？？「でもまだいいワ。向こうはまだ知らないみたいだかラ。」' },
                { command: 'sentence', sentence: '？？？「なんとかごまかさないとネ・・・。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20004:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_konta', value: 8, pos_x: 0, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 4, pos_x: 64, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「・・・・！！」' },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'white', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20005:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_konta', value: 3, pos_x: 16, pos_y: 0 },
                { command: 'stand', name: 'stand_kozue', value: 6, pos_x: -16, pos_y: 0 },
                { command: 'stand', name: 'stand_akino', value: 3, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'こずえ「はぁ・・・、なんとか逃げ切った・・・。」' },
                { command: 'sentence', sentence: 'あきの「うふふ！　うれしー！！」' },
                { command: 'sentence', sentence: 'あきの「早く帰って、中身あけてみよっ♪」' },
                { command: 'sentence', sentence: 'こんた（コクッ）' },
                { command: 'sentence', sentence: 'こずえ「もう生きたここちしないわ・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20006:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'stand', name: 'stand_matoi', value: 3, pos_x: 0, pos_y: 0 },
                { command: 'sentence', sentence: 'まとい「チッ！！　やられたか！！」' },
                { command: 'stand', name: 'stand_hawk', value: 1, pos_x: 96, pos_y: 0 },
                { command: 'sentence', sentence: 'ホーク「逃がさん。　死ね。」' },
                { command: 'fade', name: 'white', value: 0.4, type: 0 },
                { command: 'picture', name: 'picture_matoi_death', sx: 0, sy: 0, w: 96, h: 80, pos_x: 32, pos_y: 16 },
                { command: 'fade', name: 'white', value: 0.4, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'picture_change', name: 'picture_matoi_death', sx: 96, sy: 0 },
                { command: 'stand_delete', name: 'stand_matoi' },
                { command: 'wait', value: 2 },
                { command: 'picture_delete', name: 'picture_matoi_death' },
                { command: 'stand', name: 'stand_kozue', value: 4, pos_x: -16, pos_y: 0 },
                { command: 'sentence', sentence: 'こずえ「なにも殺さなくても・・・」' },
                { command: 'sentence', sentence: 'ホーク「やらなきゃやられるぜ？　それでもいいのか？」' },
                { command: 'sentence', sentence: 'ホーク「それによく見てみろ。」' },
                { command: 'sentence', sentence: 'こずえ「？？」' },
                { command: 'picture', name: 'picture_matoi_death', sx: 96, sy: 0, w: 96, h: 80, pos_x: 32, pos_y: 16 },
                { command: 'wait', value: 1 },
                { command: 'fade', name: 'white', value: 0.4, type: 0 },
                { command: 'picture_change', name: 'picture_matoi_death', sx: 192, sy: 0 },
                { command: 'fade', name: 'white', value: 0.4, type: 1 },
                { command: 'sentence', sentence: 'こずえ「どういうこと・・・？　彼女が消えてゆく・・・」' },
                { command: 'picture_delete', name: 'picture_matoi_death' },
                { command: 'sentence', sentence: 'ホーク「こいつらはバグラウズ。」' },
                { command: 'sentence', sentence: '「世界の真実に気付き、得た能力を悪用する悪い連中だ。」' },
                { command: 'sentence', sentence: '「俺もよく知らんのだが、こいつらが死んだとき、」' },
                { command: 'sentence', sentence: '「その肉体は違う次元へ飛ばされるらしい。」' },
                { command: 'sentence', sentence: 'こずえ「・・・・・。」' },
                { command: 'stand', name: 'stand_akino', value: 1, pos_x: 48, pos_y: 0 },
                { command: 'sentence', sentence: 'あきの「そーゆーこと。」' },
                { command: 'sentence', sentence: 'あきの「だけど、安心して。　これからはホークもついてくれるから！」' },
                { command: 'stand_change', name: 'stand_akino', value: 0 },
                { command: 'sentence', sentence: '「なんたって、伝説のヒットマンなんだから！」' },
                { command: 'sentence', sentence: 'ホーク「そんな、姉御。照れますぜ。」' },
                { command: 'sentence', sentence: 'あきの「本当なんだもん。でもな、その、」' },
                { command: 'sentence', sentence: 'ホーク「？？」' },
                { command: 'stand_change', name: 'stand_akino', value: 10 },
                { command: 'sentence', sentence: 'あきの「タバコ臭いよ、やめろ。」' },
                { command: 'sentence', sentence: 'ホーク「すんません！姉御！　つい癖で・・・」' },
                { command: 'wait', value: 2 },
                { command: 'stand_change', name: 'stand_kozue', value: 0 },
                { command: 'sentence', sentence: 'こずえ（あっきー、あんたって一体・・・）' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20007:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'msgwindow', value: 1 },
                { command: 'stand', name: 'stand_okune', value: 0, pos_x: 80, pos_y: 0 },
                { command: 'sentence', sentence: '奥根「・・・・・、ハッ！」' },
                { command: 'sentence', sentence: '奥根「何だここは・・・？　私は何を・・・？」' },
                { command: 'stand', name: 'stand_gester', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'sentence', sentence: 'ゲシュテル「おじさん！！　早くコードを解除して！！」' },
                { command: 'sentence', sentence: '奥根「コード？　何を言っているんだ？君たちは・・・」' },
                { command: 'sentence', sentence: '奥根「はっ！！！」' },
                { command: 'sentence', sentence: '壊れかけたロボット「ギギギ・・・　モクヒョウホソク、ショリシマス・・・」' },
                { command: 'stand_change', name: 'stand_okune', value: 1 },
                { command: 'shake', time: 2, depth: 4, speed: 96, vorh: true },
                { command: 'sentence', sentence: 'ゴリゴリゴリゴリ！！' },
                { command: 'sentence', sentence: '奥根「ぎゃあああああああああああああああああ！！！」' },
                { command: 'wait', value: 2 },
                { command: 'fade', name: 'white', value: 0.4, type: 0 },
                { command: 'stand_delete', name: 'stand_okune' },
                { command: 'fade', name: 'white', value: 0.4, type: 1 },
                { command: 'sentence', sentence: '恐怖のロボットたちは奥根と共に消え去った。' },
                { command: 'stand_move_record', name: 'stand_gester', add_x: 32, add_y: 0, speed: 8 },
                { command: 'stand_move_start', name: 'stand_gester' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ゲシュテル「そんな・・・」' },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_hawk', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'sentence', sentence: 'ホーク「ふむ・・・。　なんか知らずに働いていたって感じだな。」' },
                { command: 'stand_change', name: 'stand_gester', value: 1 },
                { command: 'sentence', sentence: 'ホーク「あまり、気にするんじゃないぞ。」' },
                { command: 'sentence', sentence: 'ゲシュテル「うん・・・。」' },
                { command: 'wait', value: 2 },
                { command: 'sentence', sentence: 'ホーク（なんか逆に彼が引き寄せたように思えるのは気のせいか・・・？）' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20008:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_marc', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'マルク「ちっ・・・。仲間がいたのか・・・。」' },
                { command: 'sentence', sentence: 'マルク「しかし、だいぶ力の使い方がつかめてきた。」' },
                { command: 'sentence', sentence: '「今回はここで引き下がる。次にあった時は命がないと思え。」' },
                { command: 'wait', value: 1 },
                { command: 'fade', name: 'white', value: 0.4, type: 0 },
                { command: 'stand_delete', name: 'stand_marc' },
                { command: 'fade', name: 'white', value: 0.4, type: 1 },
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_akino', value: 0, pos_x: 0, pos_y: 0 },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'あきの「どっかいっちゃった。」' },
                { command: 'sentence', sentence: 'あきの「・・・あの力、」' },
                { command: 'sentence', sentence: 'あきの「ちょっとヤバイかも・・・。」' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: 'ミッション　クリア！' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;

        case 20009:
            Novel = [
                { command: 'wait', value: 1 },
                { command: 'stand', name: 'stand_delta', value: 1, pos_x: 80, pos_y: 0 },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: '敵ユニット、全滅確認。' },
                { command: 'sentence', sentence: 'ポータルで帰還してください。' },
                { command: 'wait', value: 1 },
                { command: 'sentence', sentence: '　　　　　　　勝利！！　　　　　　　' },
                { command: 'msgwindow', value: 0 },
                { command: 'fade', name: 'black', value: 2, type: 0 },
                { command: 'end', modechange: true },
            ];
            break;
    }
}

function EventData_Battle() {
    switch (event_code) {
        case 30000:  //battle msg
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「いたた～・・・。　ぜんぜんきいてないみたい・・・。」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;

        case 30001:  //battle msg
            Novel = [
                { command: 'fade', name: 'black', value: 0.4, type: 0 },
                { command: 'fade', name: 'black', value: 0.4, type: 1 },
                { command: 'fade', name: 'black', value: 0.4, type: 0 },
                { command: 'fade', name: 'black', value: 0.4, type: 1 },
                {
                    command: 'overwrite_enemy', name: "エンジェルナイト", icon: 'angelknight', skill: 'セイクレッドソード',
                    ap: 0, nowhp: 100, maxhp: 100, of: 50, df: 200, mr: 3, ar: 1, mode: 'militant',
                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                },
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「しまった！みつかっちゃった！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'end', modechange: false },
            ];
            break;
    }
}

function EventData_Item() {
    switch (event_code) {
        case 40000:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「やったぁ！　キューブをゲット！」' },
                { command: 'sentence', sentence: 'こずえ「もういいでしょ？かえろう。」' },
                { command: 'sentence', sentence: 'あきの「わかってるってば～。こずえちゃんってば、せっかちなんだから～。」' },
                { command: 'sentence', sentence: 'こずえ「ヴォー！！さっさとしろぉー！！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'add_vcpoint', pos_x: 0, pos_y: 8 },
                { command: 'item_delete', name: 'chip' },
                { command: 'end', modechange: false },
            ];
            break;
    }
}


function EventData_TurnTalk() {
    switch (event_code) {
        case 50000:
            Novel = [
                { command: 'msgwindow', value: 1 },
                { command: 'sentence', sentence: 'あきの「やったぁ！　キューブをゲット！」' },
                { command: 'sentence', sentence: 'こずえ「もういいでしょ？かえろう。」' },
                { command: 'sentence', sentence: 'あきの「わかってるってば～。こずえちゃんってば、せっかちなんだから～。」' },
                { command: 'sentence', sentence: 'こずえ「ヴォー！！さっさとしろぉー！！」' },
                { command: 'msgwindow', value: 0 },
                { command: 'add_vcpoint', pos_x: 0, pos_y: 8 },
                { command: 'item_delete', name: 'chip' },
                { command: 'end', modechange: false },
            ];
            break;
    }
}