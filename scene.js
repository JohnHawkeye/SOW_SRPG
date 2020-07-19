var scene_mode = 0; //0:title
var story_code = 28;
var event_code = 0;

var Novel = {};

var novel_number = 0;
var render_TotalTime = 0;
var wait_TotalTime = 0;
var title_enter = false;

var novel_shakeStart = false;
var novel_shakeTotalTime = 0;
var novel_shakeEnd = false;
var novel_shakeDirection = false;
var novel_shakePosition = 0;
var novel_shakeDepth = 0;
var novel_shakeTargetTime = 0;
var novel_shakeSpeed = 0;
var novel_shakeVorH = false;    //false:vertical    true:horizontal

var stand_brUnitCounter = 0;
var sentence_brUnitCounter = 0;

var sentence_isRead = false;
var sentence_readLine = false;
var sentence_lineValue = "";
var sentence_displayCharacters = "";
var sentence_waitingTotal = 0.2;
var sentence_charaCounter = 1;
var msgWindow_isOpen = false;
var msgWindow_layer = false;
var memory_scenery = "black";
var memory_fadehidden = "black";

var memory_stand = [];
var memory_picture = [];

var fade_isHidden = false;

function SceneManager() {

    switch (scene_mode) {
        case 0: //title
            if (pressedKeys[0] || mouseLeftClick) {
                title_enter = true;
            }

            if (title_enter)
                if (render_TotalTime >= 2) {
                    SetNovelData();
                    render_TotalTime = 0;
                    scene_mode = 1;
                } else {
                    render_TotalTime += fixedDeltaTime;
                }

            break;
        case 1: //novel
            ShakeScreen();
            StandMovingPosition();
            NovelMode();
            break;

        case 2: //event + game

            if (isEvent) {

                if (Novel[novel_number].command === 'placement') {
                    TacticsSquareConversion();
                }

                ShakeScreen();
                StandMovingPosition();
                EventMode();
            } else {

                TacticsSquareConversion();

                if (!tactics_isVictory) {
                    TacticsSquareClick();
                } else {
                    if (tactics_Phase === 'none')
                        TacticsGotoEventAfterVictory();
                }

                if (tactics_Phase === 'attack_battle')
                    TacticsBattleProcessManager();

            }

            break;

        case 3:
            StageSelectMode();
            break;

    }
}

function NovelMode() {

    switch (Novel[novel_number].command) {

        case "title":
            if (wait_TotalTime >= 3) {
                wait_TotalTime = 0;
                novel_number++;
            } else {
                wait_TotalTime += fixedDeltaTime;
            }
            break;

        case "scenery":
            memory_scenery = Novel[novel_number].name;
            novel_number++;
            break;

        case "fade":

            if (render_TotalTime >= Novel[novel_number].value) {
                render_TotalTime = 0;
                if (Novel[novel_number].type == 0) {
                    memory_fadehidden = Novel[novel_number].name;
                    fade_isHidden = true;
                }
                novel_number++;
            } else {
                if (Novel[novel_number].type == 1) {
                    fade_isHidden = false;
                }
                render_TotalTime += fixedDeltaTime;
            }
            break;

        case "shake":

            novel_shakeTargetTime = Novel[novel_number].time;
            novel_shakeDepth = Novel[novel_number].depth;
            novel_shakeSpeed = Novel[novel_number].speed;
            novel_shakeVorH = Novel[novel_number].vorh;
            novel_shakeStart = true;

            novel_number++;
            break;

        case "wait":

            if (wait_TotalTime >= Novel[novel_number].value) {
                wait_TotalTime = 0;
                novel_number++;
            } else {
                wait_TotalTime += fixedDeltaTime;
            }
            break;

        case "msgwindow":
            if (render_TotalTime >= 1) {
                if (Novel[novel_number].value == 1) {
                    msgWindow_isOpen = true;
                }
                render_TotalTime = 0;

                (Novel[novel_number].layer == true) ? msgWindow_layer = true : msgWindow_layer = false;

                novel_number++
            } else {
                render_TotalTime += fixedDeltaTime;
            }
            break;
        case "sentence":
            if (sentence_isRead) {
                sentence_readLine = false;
                sentence_lineValue = "";
                sentence_displayCharacters = "";
                sentence_charaCounter = 1;
                sentence_isRead = false;

                novel_number++;
            } else {
                SentenceManager();
            }
            break;

        case "stand":
            StandManager();
            novel_number++;
            break;

        case "stand_move_record":
            StandMoveRecorder();
            novel_number++;
            break;

        case "stand_move_start":

            for (let i = 0; i < memory_stand.length; i++) {
                if (memory_stand[i].name === Novel[novel_number].name) {
                    memory_stand[i].move_start = true;
                }
            }
            novel_number++;
            break;

        case "stand_change":
            StandChange();
            novel_number++;
            break;

        case "stand_delete":
            StandDelete();

            novel_number++;
            break;

        case "picture":
            PictureRecorder();
            novel_number++;
            break;

        case "picture_shift":
            PictureShifter();
            novel_number++;
            break;

        case "picture_delete":
            PictureDelete();
            novel_number++;
            break;

        case "animation":

            if (!animation_DataSet) {
                AnimeDataSetting(Novel[novel_number].name);
            } else {
                if (animation_celcount >= AnimeData.length) {
                    animation_DataSet = false;
                    animation_celcount = 0;
                    novel_number++;
                } else {
                    if (animation_totaltime >= AnimeData[animation_celcount].time) {
                        animation_totaltime = 0;
                        animation_celcount++;
                    } else {
                        animation_totaltime += fixedDeltaTime;
                    }

                }
            }
            break;

        case "end":

            novel_shakeStart = false;
            novel_isSetData = false;

            if(story_code < 29){ //code 29 is BattleRoyal
                story_code++;
            }

            if (Novel[novel_number].modechange) {

                let stageselect = Novel[novel_number].stageselect;
                if (stageselect) {
                    scene_mode = 3;
                    NovelEndInit();
                } else {
                    scene_mode = 2;
                    event_code = Novel[novel_number].code;
                    EnemyDefeatedList = [];
                    NovelEndInit();
                    SetEventData();
                }
            } else {
                NovelEndInit();
                SetNovelData();
            }

            break;
    }

}

function SentenceManager() {

    let msgspeed = 0.1;

    if (!sentence_readLine) {
        sentence_lineValue = Novel[novel_number].sentence;
        sentence_readLine = true;
    }

    if (sentence_charaCounter <= sentence_lineValue.length) {

        if (sentence_waitingTotal >= 0.04) {
            sentence_displayCharacters = sentence_lineValue.substr(0, sentence_charaCounter);
            sentence_charaCounter++;
            sentence_waitingTotal = 0;

        } else {
            sentence_waitingTotal += fixedDeltaTime;

            if (pressedKeys[0] || mouseLeftClick) {
                sentence_waitingTotal += fixedDeltaTime * 2;
            }

        }
    } else {
        if (pressedKeys[0] || mouseLeftClick) {
            sentence_isRead = true;
        }
    }
}


function SentenceManagerBattleRoyal() {

    if (sentence_brUnitCounter < Enemy.length) {

        if (!sentence_readLine) {
            switch (Enemy[sentence_brUnitCounter].icon) {
                case 'prmiel':
                    sentence_lineValue = "ごめんなさい。ここで死んでもらいます。";
                    break;
                case 'ward':
                    sentence_lineValue = "狩ってやる・・・。俺から逃げられると思うなよ。";
                    break;
                case 'iris':
                    sentence_lineValue = "構わず戦ってください。私が傷をいやしますから・・・。";
                    break;
                case 'megarand':
                    sentence_lineValue = "見るもの全てをぶち壊してやる！！！";
                    break;
                case 'michael':
                    sentence_lineValue = "僕・・・、本当は戦いたくないんです・・・。徴兵されて仕方なく・・・";
                    break;
                case 'shaorin':
                    sentence_lineValue = "一瞬にして息の根を止めてあげるわ。";
                    break;
                case 'jeda':
                    sentence_lineValue = "必ず守る。仲間には指一本触れさせない。";
                    break;
                case 'neyl':
                    sentence_lineValue = "僕のダンスを見ていくかい？";
                    break;
                case 'sizer':
                    sentence_lineValue = "目の前の敵はすべて倒す・・・！";
                    break;
            }
            sentence_brUnitCounter++;
            sentence_readLine = true;
        }

        if (sentence_charaCounter <= sentence_lineValue.length) {

            if (sentence_waitingTotal >= 0.04) {
                sentence_displayCharacters = sentence_lineValue.substr(0, sentence_charaCounter);
                sentence_charaCounter++;
                sentence_waitingTotal = 0;

            } else {
                sentence_waitingTotal += fixedDeltaTime;

                if (pressedKeys[0] || mouseLeftClick) {
                    sentence_waitingTotal += fixedDeltaTime * 2;
                }

            }
        } else {
            if (pressedKeys[0] || mouseLeftClick) {
                sentence_isRead = true;
            }
        }

    } else {
        sentence_brUnitCounter = 0;
    }
}

function StandManager() {
    memory_stand.push({
        name: Novel[novel_number].name,
        id: Novel[novel_number].value,
        pos_x: Novel[novel_number].pos_x,
        pos_y: Novel[novel_number].pos_y,
        add_x: 0,
        add_y: 0,
        total_distance: 0,
        speed: 0,
        move_start: false,
        move_end: false,
    });
}

function StandBattleRoyal() {

    let filename = 'stand_akino';

    switch (Enemy[stand_brUnitCounter].icon) {
        case 'prmiel':
            filename = 'stand_prmiel';
            break;
        case 'ward':
            filename = 'stand_ward';
            break;
        case 'iris':
            filename = 'stand_iris';
            break;
        case 'megarand':
            filename = 'stand_megarand';
            break;
        case 'michael':
            filename = 'stand_michael';
            break;
        case 'shaorin':
            filename = 'stand_shaorin';
            break;
        case 'jeda':
            filename = 'stand_jeda';
            break;
        case 'neyl':
            filename = 'stand_neyl';
            break;
        case 'sizer':
            filename = 'stand_sizer';
            break;
    }

    memory_stand.push({
        name: filename,
        id: Novel[novel_number].value,
        pos_x: Novel[novel_number].pos_x,
        pos_y: Novel[novel_number].pos_y,
        add_x: 0,
        add_y: 0,
        total_distance: 0,
        speed: 0,
        move_start: false,
        move_end: false,
    });

    if (stand_brUnitCounter < Enemy.length-1) {
        stand_brUnitCounter++;
    } else {
        stand_brUnitCounter = 0;
    }

}

function StandMoveRecorder() {

    for (let i = 0; i < memory_stand.length; i++) {
        if (memory_stand[i].name == Novel[novel_number].name) {
            memory_stand[i].add_x = Novel[novel_number].add_x;
            memory_stand[i].add_y = Novel[novel_number].add_y;
            memory_stand[i].speed = Novel[novel_number].speed;
            memory_stand[i].move_end = false;
        }
    }
}

function StandMovingPosition() {

    for (let i = 0; i < memory_stand.length; i++) {

        if (memory_stand[i].move_start) {

            if (!memory_stand[i].move_end) {
                if (memory_stand[i].speed == 0) {
                    memory_stand[i].pos_x += memory_stand[i].add_x;
                    memory_stand[i].total_distance = Math.abs(memory_stand[i].add_x);
                }
            }

            if (memory_stand[i].total_distance >= Math.abs(memory_stand[i].add_x)) {
                memory_stand[i].total_distance = 0;
                memory_stand[i].move_start = false;
                memory_stand[i].move_end = true;

            } else {
                let dx = memory_stand[i].add_x * memory_stand[i].speed * fixedDeltaTime;
                memory_stand[i].pos_x += dx;
                memory_stand[i].total_distance += Math.abs(dx);
            }
        }

    }

}

function StandChange() {
    for (let i = 0; i < memory_stand.length; i++) {
        if (memory_stand[i].name == Novel[novel_number].name) {
            memory_stand[i].id = Novel[novel_number].value;
        }
    }
}

function StandDelete() {
    for (let i = 0; i < memory_stand.length; i++) {

        if (memory_stand[i].name == Novel[novel_number].name) {
            memory_stand.splice(i, 1);
            break;
        }
    }
}

function PictureRecorder() {

    memory_picture.push({
        name: Novel[novel_number].name,
        sx: Novel[novel_number].sx,
        sy: Novel[novel_number].sy,
        w: Novel[novel_number].w,
        h: Novel[novel_number].h,
        pos_x: Novel[novel_number].pos_x,
        pos_y: Novel[novel_number].pos_y,
        add_x: 0,
        add_y: 0,
        total_distance: 0,
        speed: 0,
        move_end: false,
    });
}

function PictureShifter() {

    for (let i = 0; i < memory_picture.length; i++) {
        if (memory_picture[i].name === Novel[novel_number].name) {
            memory_picture[i].sx = Novel[novel_number].sx;
            memory_picture[i].sx = Novel[novel_number].sx;
            memory_picture[i].w = Novel[novel_number].w;
            memory_picture[i].h = Novel[novel_number].h;
            memory_picture[i].pos_x = Novel[novel_number].pos_x;
            memory_picture[i].pos_y = Novel[novel_number].pos_y;
        }
    }
}

function PictureChanger() {

    for (let i = 0; i < memory_picture.length; i++) {
        if (memory_picture[i].name == Novel[novel_number].name) {
            memory_picture[i].sx = Novel[novel_number].sx;
            memory_picture[i].sy = Novel[novel_number].sy;
            break;
        }
    }
}

function PictureDelete() {

    for (let i = 0; i < memory_picture.length; i++) {

        if (memory_picture[i].name == Novel[novel_number].name) {
            memory_picture.splice(i, 1);
            break;
        }
    }
}

function ShakeScreen() {

    if (novel_shakeStart)
        if (novel_shakeTotalTime >= novel_shakeTargetTime) {

            if (!novel_shakeEnd) {

                if (!novel_shakeDirection) {
                    novel_shakePosition -= novel_shakeSpeed * fixedDeltaTime;
                } else {
                    novel_shakePosition += novel_shakeSpeed * fixedDeltaTime;
                }

                if (!novel_shakeDirection) {
                    if (novel_shakePosition <= 0)
                        novel_shakeEnd = true;
                } else {
                    if (novel_shakePosition >= 0)
                        novel_shakeEnd = true;
                }

            } else {
                novel_shakeTotalTime = 0;
                novel_shakeEnd = false;
                novel_shakeStart = false;
                novel_shakeDirection = false;
                novel_shakePosition = 0;
            }
        } else {

            if (!novel_shakeDirection) {
                novel_shakePosition -= novel_shakeSpeed * fixedDeltaTime;
            } else {
                novel_shakePosition += novel_shakeSpeed * fixedDeltaTime;
            }

            if (!novel_shakeDirection) {
                if (novel_shakePosition <= -novel_shakeDepth)
                    novel_shakeDirection = true;
            } else {
                if (novel_shakePosition >= novel_shakeDepth)
                    novel_shakeDirection = false;
            }

            novel_shakeTotalTime += fixedDeltaTime;
        }

}

function NovelEndInit() {

    novel_number = 0;
    memory_stand = [];
    memory_picture = [];
    memory_scenery = "black";
    msgWindow_isOpen = false;

}

function EventWhenFound() {
    event_code = 30001;
    SetEventData();
    isEvent = true;
    tactics_isFound = false;
}