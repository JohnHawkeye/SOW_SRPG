
var stageSelect_process = 0;
var stageSelect_bfPointCounter = 0;
var stageSelect_battlefieldpoint = [];
var stageSelect_waitTotalTime = 0.4;
var stageSelect_flashingRate = 1;
var stageSelect_bfinfoOpened = false;


var stageSelect_transitionMain = 0;
var stageSelect_transitionLineA = -160;
var stageSelect_transitionTimeSet = false;
var stageSelect_transitionTargetTime = 1;
var stageSelect_transitionGenerateStart = false;
var stageSelect_transitionLineB = [];
var stageSelect_transitionLineBlock = [];
var stageSelect_transitionObjCycleTime = 0;

var stageSelect_transitionSquareTimeSet = false;
var stageSelect_transitionSquareTargetTime = 1;
var stageSelect_transitionSquare = [];
var stageSelect_transitionSquareBlock = [];
var stageSelect_transitionSquareCycleTime = 0;

var stageSelect_battleNum = 0;
var stageSelect_enemyUnitSPList = ['prmiel', 'ward', 'iris', 'megarand', 'jeda', 'neyl', 'sizer', 'shaorin', 'michael'];
var stageSelect_enemyUnitSPTask = [];
var stageSelect_enemyUnitData = [];
var stageSelect_selectID = 0;


function StageSelectInit() {

    stageSelect_process = 0;
    stageSelect_bfPointCounter = 0;
    stageSelect_battlefieldpoint = [];
    stageSelect_waitTotalTime = 0.4;
    stageSelect_flashingRate = 1;
    stageSelect_bfinfoOpened = false;


    stageSelect_transitionMain = 0;
    stageSelect_transitionLineA = -160;
    stageSelect_transitionTimeSet = false;
    stageSelect_transitionTargetTime = 1;
    stageSelect_transitionGenerateStart = false;
    stageSelect_transitionLineB = [];
    stageSelect_transitionLineBlock = [];
    stageSelect_transitionObjCycleTime = 0;

    stageSelect_transitionSquareTimeSet = false;
    stageSelect_transitionSquareTargetTime = 1;
    stageSelect_transitionSquare = [];
    stageSelect_transitionSquareBlock = [];
    stageSelect_transitionSquareCycleTime = 0;

}


function StageSelectMode() {

    switch (stageSelect_process) {
        case 0: //fade remove
            fade_isHidden = false;
            StageSelectInit();
            
            stageSelect_battleNum++;
            stageSelect_enemyUnitSPTask = Array.from(stageSelect_enemyUnitSPList);

            stageSelect_process++;
            break;

        case 1: //wait
            if (stageSelect_waitTotalTime >= 1.4) {
                stageSelect_process++;
                stageSelect_waitTotalTime = 0.4;
            } else {
                stageSelect_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 2: //battlefield point set
            //8pixel * position value
            stageSelect_battlefieldpoint = [{
                name: "アトランティス", tag: 'stage_atlantis',
                pos_x: 1, pos_y: 8, light: false, flashing: false,
                enemy: BattleRoyaleEnemySelector()
            },
            {
                name: "ファクトリー", tag: 'stage_factory',
                pos_x: 5, pos_y: 2, light: false, flashing: false,
                enemy: BattleRoyaleEnemySelector()
            },
            {
                name: "ウェスタン", tag: 'stage_western',
                pos_x: 14, pos_y: 5, light: false, flashing: false,
                enemy: BattleRoyaleEnemySelector()
            }];
            stageSelect_process++;
            break;

        case 3: //point light

            if (stageSelect_bfPointCounter >= stageSelect_battlefieldpoint.length) {
                stageSelect_bfPointCounter = 0;
                stageSelect_process++;
            } else {

                if (stageSelect_waitTotalTime >= 0.4) {
                    stageSelect_battlefieldpoint[stageSelect_bfPointCounter].light = true;
                    stageSelect_bfPointCounter++;
                    stageSelect_waitTotalTime = 0;

                } else {
                    stageSelect_waitTotalTime += fixedDeltaTime;
                }

            }

            break;
        case 4: //wait

            if (stageSelect_waitTotalTime >= 1) {
                stageSelect_process++;
                stageSelect_waitTotalTime = 0;
                stageSelect_flashingRate = 1;
            } else {
                stageSelect_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 5:
            StageSelectBFPointClick();
            break;

        case 6: //open info window
            if (stageSelect_waitTotalTime >= 0.4) {
                stageSelect_process++;
                stageSelect_waitTotalTime = 0;
            } else {
                stageSelect_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 7:
            if (stageSelect_waitTotalTime >= 0.4) {
                stageSelect_process++;
                stageSelect_waitTotalTime = 0;
            } else {
                stageSelect_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 8: //select
            StageSelectBFInfoWindowClick();
            break;

        case 9: //cancel and close window
            if (stageSelect_waitTotalTime >= 1) {
                stageSelect_process = 5;
                stageSelect_waitTotalTime = 0;
            } else {
                stageSelect_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 10:    //transition : mainback
            if (stageSelect_transitionMain >= 144) {
                stageSelect_process++;
                stageSelect_waitTotalTime = 0;
            } else {
                stageSelect_transitionMain += 144 * fixedDeltaTime;
            }
            break;
        case 11:
            if (stageSelect_transitionLineA >= 0) {
                stageSelect_waitTotalTime = 0;
                stageSelect_process++;
            } else {
                stageSelect_transitionLineA += 160 * fixedDeltaTime;
                if (stageSelect_transitionLineA >= 0)
                    stageSelect_transitionLineA = 0;
            }

            break;
        case 12:

            if (stageSelect_transitionLineB.length < 1 &&
                stageSelect_transitionSquare.length < 1 &&
                stageSelect_transitionGenerateStart) {
                stageSelect_process++;
            } else {

                if (stageSelect_waitTotalTime <= 3) {

                    StageSelectTransitionLineGenerate();
                    StageSelectTransitionSquareGenerate();

                    stageSelect_waitTotalTime += fixedDeltaTime;
                }

                //line
                for (let i = 0; i < stageSelect_transitionLineB.length; i++) {
                    if (!stageSelect_transitionLineB[i].end) {
                        if (stageSelect_transitionLineB[i].value >= stageSelect_transitionLineB[i].width) {
                            stageSelect_transitionLineB[i].end = true;
                        } else {
                            if (stageSelect_transitionLineB[i].value >= stageSelect_transitionLineB[i].width) {
                                stageSelect_transitionLineB[i].value = stageSelect_transitionLineB[i].width;
                            } else {
                                stageSelect_transitionLineB[i].value += stageSelect_transitionLineB[i].width * fixedDeltaTime;
                            }
                        }
                    } else {
                        if (stageSelect_transitionLineB[i].totaltime >= stageSelect_transitionLineB[i].lifetime) {
                            if (stageSelect_transitionLineB[i].value <= 0) {
                                stageSelect_transitionLineB.splice(i, 1);
                            } else {
                                if (stageSelect_transitionLineB[i].value <= 0) {
                                    stageSelect_transitionLineB[i].value = 0;
                                } else {
                                    stageSelect_transitionLineB[i].value -= stageSelect_transitionLineB[i].width * fixedDeltaTime;
                                    stageSelect_transitionLineB[i].pos_x += stageSelect_transitionLineB[i].width * fixedDeltaTime;
                                }
                            }
                        } else {
                            stageSelect_transitionLineB[i].totaltime += fixedDeltaTime;
                        }
                    }
                }

                //square
                for (let i = 0; i < stageSelect_transitionSquare.length; i++) {

                    if (!stageSelect_transitionSquare[i].end) {
                        if (stageSelect_transitionSquare[i].value >= stageSelect_transitionSquare[i].size) {
                            stageSelect_transitionSquare[i].end = true;
                        } else {
                            if (stageSelect_transitionSquare[i].value >= stageSelect_transitionSquare[i].size) {
                                stageSelect_transitionSquare[i].value = stageSelect_transitionSquare[i].size;
                            } else {
                                stageSelect_transitionSquare[i].value += stageSelect_transitionSquare[i].size * 2 * fixedDeltaTime;
                            }
                        }
                    } else {
                        if (stageSelect_transitionSquare[i].totaltime >= stageSelect_transitionSquare[i].lifetime) {

                            if (stageSelect_transitionSquare[i].count >= 6) {
                                stageSelect_transitionSquare.splice(i, 1);
                            } else {
                                if (stageSelect_transitionSquare[i].flashtime >= 0.1) {
                                    stageSelect_transitionSquare[i].flashtime = 0;
                                    stageSelect_transitionSquare[i].visible = !stageSelect_transitionSquare[i].visible;
                                    stageSelect_transitionSquare[i].count++;
                                } else {
                                    stageSelect_transitionSquare[i].flashtime += fixedDeltaTime;
                                }

                            }
                        } else {
                            stageSelect_transitionSquare[i].totaltime += fixedDeltaTime;
                        }
                    }
                }
            }

            break;
        case 13:

            if (stageSelect_transitionLineA >= 160) {
                stageSelect_waitTotalTime = 0;
                stageSelect_process++;
            } else {
                stageSelect_transitionLineA += 160 * fixedDeltaTime;
                if (stageSelect_transitionLineA >= 160)
                    stageSelect_transitionLineA = 160;
            }

            break;
        case 14:
            stageSelect_process = 0;
            scene_mode = 2;
            event_code = 9;

            if(stageSelect_battleNum == 3){
                event_code = 10;
            }
            
            EnemyDefeatedList = [];
            NovelEndInit();
            SetEventData();
            break;
    }
}

function StageSelectBFPointClick() {

    let cmd_x = 0;
    let cmd_y = 0;
    let w = 8 * SCREEN_MAGNIFICATION;
    let h = 8 * SCREEN_MAGNIFICATION;

    for (let i = 0; i < stageSelect_battlefieldpoint.length; i++) {

        cmd_x = stageSelect_battlefieldpoint[i].pos_x * 8 * SCREEN_MAGNIFICATION;
        cmd_y = stageSelect_battlefieldpoint[i].pos_y * 8 * SCREEN_MAGNIFICATION;

        if ((cmd_x <= mouseX && cmd_x + w >= mouseX) &&
            (cmd_y <= mouseY && cmd_y + h >= mouseY)) {

            if (!stageSelect_battlefieldpoint[i].flashing) {
                stageSelect_flashingRate = 1;
                stageSelect_battlefieldpoint[i].flashing = true;
            } else {
                StageSelectBFPointFlashing();
            }

            if (mouseLeftClick && !mouseLeftClick_isClicked) {

                stageSelect_battlefieldpoint[i].flashing = false;
                stageSelect_flashingRate = 1;
                stageSelect_selectID = i;
                console.log("select :" + stageSelect_selectID);

                mouseLeftClick_isClicked = true;
                stageSelect_process++;

            }

            break;

        } else {
            stageSelect_battlefieldpoint[i].flashing = false;
            stageSelect_flashingRate = 1;
        }

    }

}
//

function StageSelectBFInfoWindowClick() {

    let cmd = [{ pos_x: 40, pos_y: 96, value: true }, { pos_x: 88, pos_y: 96, value: false }];
    let w = 2 * 16 * SCREEN_MAGNIFICATION;
    let h = 16 * SCREEN_MAGNIFICATION;

    for (let i = 0; i < cmd.length; i++) {

        let cmd_x = cmd[i].pos_x * SCREEN_MAGNIFICATION;
        let cmd_y = cmd[i].pos_y * SCREEN_MAGNIFICATION;

        if ((cmd_x <= mouseX && cmd_x + w >= mouseX) &&
            (cmd_y <= mouseY && cmd_y + h >= mouseY)) {

            if (mouseLeftClick && !mouseLeftClick_isClicked) {

                if (!cmd[i].value) {
                    stageSelect_process = 9;
                } else {
                    stageSelect_process = 10;
                }

                mouseLeftClick_isClicked = true;

            }

            break;
        }

    }

}
function StageSelectBFPointFlashing() {
    if (stageSelect_flashingRate <= 0) {
        stageSelect_flashingRate = 1;
    } else {
        stageSelect_flashingRate -= 0.8 * fixedDeltaTime;
    }
}

function BattleRoyaleEnemySelector() {

    let rn = 0;
    let r_x = 0;

    stageSelect_enemyUnitData = [];

    for (let e = 0; e < 3; e++) {

        rn = Math.floor(Math.random() * stageSelect_enemyUnitSPTask.length);
        r_x = Math.floor(Math.random() * 6) + 2;

        BattleRoyaleZodiacGuardianSelector(stageSelect_enemyUnitSPTask[rn], r_x, e);

        stageSelect_enemyUnitSPTask.splice(rn, 1);
    }
    return stageSelect_enemyUnitData;
}

function BattleRoyaleZodiacGuardianSelector(name, pos_x, pos_y) {

    switch (name) {
        case 'prmiel':
            stageSelect_enemyUnitData.push({
                name: "プルミエル", icon: 'prmiel', skill: 'ドラッグ・ハイ',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 4, df: 0, mr: 2, ar: 1, mode: 'militant',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'ward':
            stageSelect_enemyUnitData.push({
                name: "ウォード", icon: 'ward', skill: 'ソリッドスナイプ',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 2, ar: 7, mode: 'unique',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'iris':
            stageSelect_enemyUnitData.push({
                name: "アイリス", icon: 'iris', skill: 'ヒーリングプラント',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 4, df: 0, mr: 2, ar: 1, mode: 'accompany',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'megarand':
            stageSelect_enemyUnitData.push({

                name: "メガランド", icon: 'megarand', skill: 'インテンスプレディション',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 2, ar: 1, mode: 'militant',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'jeda':
            stageSelect_enemyUnitData.push({
                name: "ジェダ", icon: 'jeda', skill: 'ヘビィブルラッシュ',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 2, ar: 1, mode: 'unique',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'neyl':
            stageSelect_enemyUnitData.push({
                name: "ネイル", icon: 'neyl', skill: 'ブレイドダンス',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 2, ar: 1, mode: 'militant',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'sizer':
            stageSelect_enemyUnitData.push({
                name: "サイザー", icon: 'sizer', skill: 'タイガーファング',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 2, ar: 1, mode: 'militant',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'shaorin':
            stageSelect_enemyUnitData.push({
                name: "紗綾", icon: 'shaorin', skill: 'アサシネイション',
                pos_x: pos_x, pos_y: pos_y, ap: 3, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 3, df: 0, mr: 4, ar: 1, mode: 'militant', counter: 'transtech',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
            });
            break;
        case 'michael':
            stageSelect_enemyUnitData.push({
                name: "マイケル", icon: 'michael', skill: 'カーズドスクラッチ',
                pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 10, maxhp: 10,
                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                of: 0, df: 0, mr: 2, ar: 0, mode: 'escape',
                direction: 0, distance: 0, resist: 'none', end: false, dfid: '',
                upkeep: [{ type: 'generate', name: 'speaker' }]
            });
            break;
    }

    if (typeof stageSelect_enemyUnitData === 'undefined') {
        stageSelect_enemyUnitData.push({
            name: "うんこ", icon: 'prmiel', skill: 'ぷりぷり',
            pos_x: pos_x, pos_y: pos_y, ap: 1, nowhp: 1, maxhp: 1,
            condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
            of: 1, df: 0, mr: 1, ar: 1, mode: 'militant',
            direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
        });
    }

}

function StageSelectTransitionLineGenerate() {
    if (!stageSelect_transitionTimeSet) {
        //settings
        stageSelect_transitionTargetTime = Math.random() * 0.2 + 0.2;
        stageSelect_transitionLineBlock = [1, 3, 6];

        stageSelect_transitionTimeSet = true;
    } else {
        if (stageSelect_transitionObjCycleTime >= stageSelect_transitionTargetTime) {

            //block select
            let blocknum = Math.floor(Math.random() * 3);
            let rn_y = Math.floor(Math.random() * 49);
            let pos_x = Math.floor(Math.random() * 128) + 16;
            let pos_y = stageSelect_transitionLineBlock[blocknum] * 16 + rn_y;
            let width = Math.floor(Math.random() * 33) + 32;
            let rn_c = Math.floor(Math.random() * 2);
            let color = "";
            (rn_c == 0) ? color = "rgb(191,191,191)" : color = "rgb(255,255,255)";
            let size = Math.floor(Math.random() * 4) + 1;
            let lifetime = Math.random() * 0.2 + 0.2;

            stageSelect_transitionLineBlock.splice(blocknum, 1);

            if (stageSelect_transitionLineBlock.length < 1) {
                stageSelect_transitionLineBlock = [1, 3, 6];
            }

            stageSelect_transitionLineB.push({
                pos_x: pos_x, pos_y: pos_y,
                width: width, value: size, size: size, color: color,
                end: false, lifetime: lifetime, totaltime: 0
            });

            stageSelect_transitionGenerateStart = true;

            stageSelect_transitionObjCycleTime = 0;
            stageSelect_transitionTimeSet = false;
        } else {
            stageSelect_transitionObjCycleTime += fixedDeltaTime;
        }
    }

}

//

function StageSelectTransitionSquareGenerate() {
    if (!stageSelect_transitionSquareTimeSet) {
        //settings
        stageSelect_transitionSquareTargetTime = Math.random() * 0.4 + 0.2;
        //stageSelect_transitionLineBlock = [1, 3, 6];

        stageSelect_transitionSquareTimeSet = true;
    } else {
        if (stageSelect_transitionSquareCycleTime >= stageSelect_transitionSquareTargetTime) {

            //block select
            //let blocknum = Math.floor(Math.random() * 3);
            let rn_y = Math.floor(Math.random() * 49);
            let pos_x = Math.floor(Math.random() * 128) + 16;
            let pos_y = Math.floor(Math.random() * 112) + 16;
            let rn_c = Math.floor(Math.random() * 2);
            let color = "";
            (rn_c == 0) ? color = "rgb(191,191,191)" : color = "rgb(255,255,255)";
            let size = Math.floor(Math.random() * 8) + 8;
            let lifetime = Math.random() * 0.2 + 0.4;

            //stageSelect_transitionLineBlock.splice(blocknum, 1);
            /*
            if (stageSelect_transitionLineBlock.length < 1) {
                stageSelect_transitionLineBlock = [1, 3, 6];
            }
            */

            stageSelect_transitionSquare.push({
                pos_x: pos_x, pos_y: pos_y,
                value: 0, size: size, color: color,
                end: false, lifetime: lifetime, totaltime: 0, flashtime: 0, count: 0, visible: true
            });
            stageSelect_transitionSquareCycleTime = 0;
            stageSelect_transitionSquareTimeSet = false;
        } else {
            stageSelect_transitionSquareCycleTime += fixedDeltaTime;
        }
    }

}
