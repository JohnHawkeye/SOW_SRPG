
var isEvent = true;

var stage_name = "black";
var stage_terrain = [];
var stage_layer_upper = [];
var stage_events = [];
var stage_items = [];

var movable_range = new Array();

var Player = [];
var tactics_SelectedPlayer = 0;

var Enemy = [];

var TerrainInfo = {
    name: 'Name', event: 0,
};

var Command = [];
var tactics_CmdButtonSet = false;
var tactics_CmdSelectedSkill = 'no';
var EnemyDefeatedList = [];

var tactics_MovableRange = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];

var tactics_AttackRange = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];

var Building = [];
var building_reduction = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],];
var tactics_buildEnemyTarget = 0;

var tactics_TurnEvent = [];
var tactics_TurnNum = 1;

var tactics_PlacementRangeSet = false;
var tactics_PlacementSelected = false;
var tactics_PlacementMember = ["akino", "hawk", "kazami", "gester"];
var tactics_PlacementCount = 0;

var tactics_DefeatedFlag = [];

var tacticsCursor_x = 0;
var tacticsCursor_y = 0;

var tactics_Turn = true;    //true:player false:enemy
var tactics_InfiniteMode = true;

var tactics_Phase = 'none';
var tactics_isMRSelected = false;
var tactics_SquareClickPoint = [0, 0];
var tactics_isTESet = false;
var tactics_isPUSelect = false;
var tactics_isMRset = false;
var tactics_isARSet = false;
var tactics_attackTarget = 0;
var tactics_supportTarget = 0;
var tactics_battleProcess = 0;
var tactics_battleViewEnabled = false;
var tactics_waitTotalTime = 0;
var tactics_battleRangeAttackIndex = 0;
var tactics_bpm_enemycounter = false;

var tactics_skillListSetup = false;
var tactics_skillSelected = false;
var tactics_skillList = [];
var tactics_skillSelectedAbility = [{ name: '', skill: '', ar: 0, of: 0, type: '', attribute: '' }];
var tactics_skillSelectedName = "none";
var tactics_skillnamePosX = -160;
var tactics_skillnameSize = 32;
var tactics_shakeCount = 0;
var tactics_shakeDirection = false;
var tactics_shakeDistance = 0;
var tactics_shakeStrength = 0;
var tactics_skillName = 'あねごのビンタ';
var tactics_skillPicture = ['battle_akino_binta_a', 'battle_akino_binta_b'];
var tactics_counterSkillName = 'かうんたー';
var tactics_counterSkillPicture = ['battle_akino_binta_a', 'battle_akino_binta_b'];
var tactics_suppressonPlayerPer = 0;

var tactics_vcType = 'boss';
var tactics_vcTargetEnemyName = 'deafie';
var tactics_vcPointList = [];
var tactics_vcNextEventCode = 0;
var tactics_isVictory = false;
var tactics_isFound = false;

var tactics_turnString = false;

function TacticsSquareClick() {

    switch (tactics_Phase) {
        case 'none':

            if (!tactics_isTESet) {
                TacticsCommandSetting();
                tactics_isTESet = true;
            }
            TacticsCommandClick();

            for (let i = 0; i < Player.length; i++) {
                if (tacticsCursor_x == Player[i].pos_x && tacticsCursor_y == Player[i].pos_y &&
                    (mouseLeftClick && !mouseLeftClick_isClicked)) {

                    tactics_Phase = 'player_select';
                    tactics_SelectedPlayer = i;
                    mouseLeftClick_isClicked = true;
                    break;
                }
            }

            break;

        case 'player_select':
            if (!tactics_isPUSelect) {
                TacticsCommandSetting();
                tactics_isPUSelect = true;
            }
            TacticsCommandClick();
            break;

        case 'move':
            if (!tactics_isMRset) {
                TacticsMovableRangeSetting();
                tactics_isMRset = true;
            }
            TacticsMovableRangeClick();
            break;

        case 'attack':
            if (stage_number >= 8) {  //atc system version

                if (!tactics_skillListSetup) {
                    TacticsPlayerUnitSkillListSetting();
                    TacticsCommandSkillSelectSetting();
                    tactics_skillListSetup = true;
                }

                if (!tactics_skillSelected) {
                    TacticsCommandSkillSelectClick();
                } else {
                    if (!tactics_isARSet) {
                        TacticsAttackRangeSetting();
                        tactics_isARSet = true;
                    }

                    TacticsAttackRangeClick();
                }

            } else {  //old version
                if (!tactics_isARSet) {
                    TacticsCommandSetting();
                    TacticsAttackRangeSetting();
                    tactics_isARSet = true;
                }
                TacticsCommandClick();
                TacticsAttackRangeClick();
            }


            break;
        case 'search':
            tactics_Phase = 'none';
            break;
        case 'end':
            if (tactics_waitTotalTime >= 3) {
                tactics_waitTotalTime = 0;
                tactics_turnString = false;
                tactics_Turn = false;
                tactics_Phase = 'enemyturn';
                tactics_enemyPhase = 'upkeep';

                //debuff 
                TacticsPlayerConditionManager();
                //debuff damage
                for (let p = 0; p < Player.length; p++) {
                    for (let c = 0; c < Player[p].condition.length; c++) {
                        if (Player[p].condition[c].name === 'venom') {
                            Player[p].nowhp -= 1;
                        }
                    }
                }

            } else {
                tactics_turnString = true;
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 'enemyturn':
            TacticsEnemyPhaseManager();

            break;
        default:
            break;
    }

}

function TacticsCommandSetting() {

    Command = [];

    switch (tactics_Phase) {

        case 'player_select':
            Command = [
                { name: '移動', phase: 'move', pos_x: 16, pos_y: 0 },
                { name: '行動', phase: 'attack', pos_x: 16, pos_y: 16 },
                { name: '探索', phase: 'search', pos_x: 16, pos_y: 32 },
                { name: '戻る', phase: 'none', pos_x: 16, pos_y: 48 },
                { name: '終了', phase: 'end', pos_x: 48, pos_y: 0 },
            ];
            break;

        case 'attack':

            if (!tactics_skillSelected) {
                Command = [
                    { name: '戻る', phase: 'none', pos_x: 16, pos_y: 0 },
                ];
            } else {
                Command = [
                    { name: '戻る', phase: 'skill_select', pos_x: 16, pos_y: 0 },
                ];
            }
            break;
    }
}

function TacticsCommandCounterSkillSetting() {
    Command = [];
    Command = [
        { name: 'サンライトシールド（AP:1）', phase: 'sunlight', pos_x: 1, pos_y: 4 },
        { name: 'いいえ', phase: 'no', pos_x: 6, pos_y: 6 },
    ];
}

function TacticsCommandSkillSelectSetting() {
    Command = [];
    let line = 0;

    for (let i = 0; i < tactics_skillList.length; i++) {
        tactics_skillSelectedName = tactics_skillList[i];
        TacticsPlayerSkillValueSetting();
        let name = tactics_skillSelectedAbility[0].name;

        Command.push({ name: name, phase: tactics_skillList[i], pos_x: 1, pos_y: 3 + line * 2 });
        line++;
    }

    Command.push({ name: '戻る', phase: 'none', pos_x: 6, pos_y: 3 + line * 2 });
}

function TacticsCommandClick() {

    let cmd_x = 0;
    let cmd_y = 0;
    let offset_x = 0;
    let offset_y = 80;
    let w = 16 * 2 * SCREEN_MAGNIFICATION;
    let h = 16 * SCREEN_MAGNIFICATION;

    if (Player[tactics_SelectedPlayer].pos_x < 5) {
        offset_x = 80;
    }

    for (let i = 0; i < Command.length; i++) {

        cmd_x = (Command[i].pos_x + offset_x) * SCREEN_MAGNIFICATION;
        cmd_y = (Command[i].pos_y + offset_y) * SCREEN_MAGNIFICATION;

        if ((cmd_x <= mouseX && cmd_x + w >= mouseX) &&
            (cmd_y <= mouseY && cmd_y + h >= mouseY)) {


            if (Command[i].phase === 'move') {
                if (Player[tactics_SelectedPlayer].end_mv) {
                    break;
                }
            }
            if (Command[i].phase === 'attack') {
                if (Player[tactics_SelectedPlayer].end_at ||
                    TacticsBuffDoubleChecker('stan', Player[tactics_SelectedPlayer].condition)) {
                    break;
                }
            }

            if (mouseLeftClick && !mouseLeftClick_isClicked) {

                if (Command[i].phase === 'search') {
                    TacticsTerrainInfoSetting();
                    event_code = TerrainInfo.event;
                    TacticsItemEvent();
                    SetEventData();
                    isEvent = true;
                }

                if (Command[i].phase === 'end') {
                    Player[tactics_SelectedPlayer].end_mv = false;
                    Player[tactics_SelectedPlayer].end_at = false;
                }

                tactics_Phase = Command[i].phase;

                mouseLeftClick_isClicked = true;

                tactics_isTESet = false;
                tactics_isPUSelect = false;
                tactics_isARSet = false;
            }

            break;
        }

    }

}

function TacticsCommandCounterSkillClick() {

    let cmd_x = 0;
    let cmd_y = 0;
    let w = 16 * 2 * SCREEN_MAGNIFICATION;
    let h = 16 * SCREEN_MAGNIFICATION;

    for (let i = 0; i < Command.length; i++) {
        if (Command[i].phase === "no") {
            cmd_x = Command[i].pos_x * 16 * SCREEN_MAGNIFICATION;
            cmd_y = Command[i].pos_y * 16 * SCREEN_MAGNIFICATION;
            w = 16 * 3 * SCREEN_MAGNIFICATION;
        } else {
            cmd_x = Command[i].pos_x * 16 * SCREEN_MAGNIFICATION;
            cmd_y = Command[i].pos_y * 16 * SCREEN_MAGNIFICATION;
            w = 16 * 8 * SCREEN_MAGNIFICATION;
        }

        if ((cmd_x <= mouseX && cmd_x + w >= mouseX) &&
            (cmd_y <= mouseY && cmd_y + h >= mouseY)) {

            if (mouseLeftClick && !mouseLeftClick_isClicked) {

                tactics_CmdSelectedSkill = Command[i].phase;
                mouseLeftClick_isClicked = true;

                return true;

            }

        }
    }

    return false;
}

//

function TacticsCommandSkillSelectClick() {

    let cmd_x = 0;
    let cmd_y = 0;
    let w = 16 * 2 * SCREEN_MAGNIFICATION;
    let h = 16 * SCREEN_MAGNIFICATION;

    for (let i = 0; i < Command.length; i++) {
        if (Command[i].phase === "none") {
            cmd_x = Command[i].pos_x * 16 * SCREEN_MAGNIFICATION;
            cmd_y = Command[i].pos_y * 16 * SCREEN_MAGNIFICATION;
            w = 16 * 3 * SCREEN_MAGNIFICATION;
        } else {
            cmd_x = Command[i].pos_x * 16 * SCREEN_MAGNIFICATION;
            cmd_y = Command[i].pos_y * 16 * SCREEN_MAGNIFICATION;
            w = 16 * 8 * SCREEN_MAGNIFICATION;
        }

        if ((cmd_x <= mouseX && cmd_x + w >= mouseX) &&
            (cmd_y <= mouseY && cmd_y + h >= mouseY)) {

            if (mouseLeftClick && !mouseLeftClick_isClicked) {
                if (Command[i].phase === "none") {
                    tactics_Phase = Command[i].phase;
                    tactics_skillListSetup = false;
                } else {
                    tactics_skillSelectedName = Command[i].phase;
                    tactics_skillSelected = true;
                }
                mouseLeftClick_isClicked = true;
            }

        }
    }

}

function TacticsMovableRangeClick() {

    let select_x = tacticsCursor_x;
    let select_y = tacticsCursor_y;
    let mr = Player[tactics_SelectedPlayer].mr;

    if (!tactics_isMRSelected) {
        if (mouseLeftClick && !mouseLeftClick_isClicked) {
            if (Player[tactics_SelectedPlayer].pos_x == tacticsCursor_x &&
                Player[tactics_SelectedPlayer].pos_y == tacticsCursor_y) {
                tactics_isMRset = false;
                tactics_Phase = 'none';
            } else {

                tactics_SquareClickPoint[0] = tacticsCursor_x;
                tactics_SquareClickPoint[1] = tacticsCursor_y;
                tactics_isMRSelected = true;
                mouseLeftClick_isClicked = true;

            }
        }
    } else {

        let index_x = Math.abs(select_x - Player[tactics_SelectedPlayer].pos_x);
        let index_y = Math.abs(select_y - Player[tactics_SelectedPlayer].pos_y);
        let mr_x = select_x - Player[tactics_SelectedPlayer].pos_x;
        let mr_y = select_y - Player[tactics_SelectedPlayer].pos_y;
        if (index_x <= mr && index_y <= mr) {

            if (movable_range[mr_y + mr][mr_x + mr] == 1) {

                //
                let dx = tacticsCursor_x - Player[tactics_SelectedPlayer].pos_x;
                let dy = tacticsCursor_y - Player[tactics_SelectedPlayer].pos_y;
                let count = 0;
                let impassable = false;
                let virtual_x = Player[tactics_SelectedPlayer].pos_x;
                let virtual_y = Player[tactics_SelectedPlayer].pos_y;

                while (Math.abs(dx) < Math.abs(count)) {


                    if (stage_terrain[tacticsCursor_y][Player[tactics_SelectedPlayer].pos_x + count] == 1) {
                        impassable = true;
                    }

                    (dx < 0) ? dx++ : dx--;
                    (dx < 0) ? count-- : count++;
                }
                count = 0;

                while (Math.abs(dy) < Math.abs(count)) {

                    if (stage_terrain[Player[tactics_SelectedPlayer].pos_y + count][tacticsCursor_x] == 1) {
                        impassable = true;
                    }

                    (dx < 0) ? dx++ : dx--;
                    (dx < 0) ? count-- : count++;
                }

                if (!impassable &&
                    (tactics_MovableRange[tacticsCursor_y][tacticsCursor_x] >= 1)) {
                    Player[tactics_SelectedPlayer].pos_x = tacticsCursor_x;
                    Player[tactics_SelectedPlayer].pos_y = tacticsCursor_y;

                    TacticsVCPointReaching();
                }


                if (!tactics_InfiniteMode)
                    Player[tactics_SelectedPlayer].end_mv = true;


                let condition = Array.from(Player[tactics_SelectedPlayer].condition);
                if (Player[tactics_SelectedPlayer].pos_y >= 6 && Player[tactics_SelectedPlayer].pos_y <= 8) {
                    if (!TacticsBuffDoubleChecker('bpbuff', condition)) {
                        condition.push({ name: 'bpbuff', turn: 0 });
                        Player[tactics_SelectedPlayer].condition = condition;
                    }
                } else {
                    TacticsBuffReleaser('bpbuff', condition);
                    Player[tactics_SelectedPlayer].condition = condition;
                }

                //building buff
                condition = Array.from(Player[tactics_SelectedPlayer].condition);
                switch (Building[Player[tactics_SelectedPlayer].pos_y][Player[tactics_SelectedPlayer].pos_x].type) {
                    case 0:
                        TacticsBuffReleaser('venom', condition);
                        Player[tactics_SelectedPlayer].condition = condition;
                        break;
                    case 1:
                        if (!TacticsBuffDoubleChecker('venom', condition)) {
                            condition.push({ name: 'venom', turn: 0 });
                            Player[tactics_SelectedPlayer].condition = condition;
                        }
                        break;
                }

                TacticsBuildIconReductionSetting(tactics_SelectedPlayer);

                tactics_Phase = 'none';
                tactics_isMRset = false;
            }
        }
        tactics_isMRSelected = false;
    }
}

function TacticsAttackRangeClick() {

    let select_x = tacticsCursor_x;
    let select_y = tacticsCursor_y;
    let ar = Player[tactics_SelectedPlayer].ar;
    let skilltype = "attack";

    //stage 8 or later
    if (stage_number >= 8) {
        TacticsPlayerSkillValueSetting();
        ar = tactics_skillSelectedAbility[0].ar;
        skilltype = tactics_skillSelectedAbility[0].type;
    }

    Player[tactics_SelectedPlayer].pos_x, Player[tactics_SelectedPlayer].pos_y;

    if (!tactics_isMRSelected) {
        if (mouseLeftClick && !mouseLeftClick_isClicked) {
            tactics_SquareClickPoint[0] = tacticsCursor_x;
            tactics_SquareClickPoint[1] = tacticsCursor_y;
            tactics_isMRSelected = true;
            mouseLeftClick_isClicked = true;
        } else
            if (mouseRightClick && !mouseRightClick_isClicked) {
                tactics_Phase = "attack";
                tactics_skillSelected = false;
                tactics_skillListSetup = false;
                mouseRightClick_isClicked = true;
                tactics_isARSet = false;
            }
    } else {

        let index_x = Math.abs(select_x - Player[tactics_SelectedPlayer].pos_x);
        let index_y = Math.abs(select_y - Player[tactics_SelectedPlayer].pos_y);
        let ar_x = select_x - Player[tactics_SelectedPlayer].pos_x;
        let ar_y = select_y - Player[tactics_SelectedPlayer].pos_y;

        if (index_x <= ar && index_y <= ar) {
            if (movable_range[ar_y + ar][ar_x + ar] == 1) {

                if (skilltype !== "support") {
                    for (let i = 0; i < Enemy.length; i++) {
                        if (Enemy[i].pos_x == tacticsCursor_x &&
                            Enemy[i].pos_y == tacticsCursor_y) {
                            tactics_attackTarget = i;
                            tactics_Phase = 'attack_battle';
                            tactics_isARSet = false;
                            tactics_skillListSetup = false;
                            tactics_skillSelected = false;

                            if (!tactics_InfiniteMode)
                                Player[tactics_SelectedPlayer].end_at = true;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < Player.length; i++) {
                        if (Player[i].pos_x == tacticsCursor_x &&
                            Player[i].pos_y == tacticsCursor_y) {
                            tactics_supportTarget = i;
                            tactics_Phase = 'attack_battle';
                            tactics_isARSet = false;
                            tactics_skillListSetup = false;
                            tactics_skillSelected = false;

                            if (!tactics_InfiniteMode)
                                Player[tactics_SelectedPlayer].end_at = true;
                            break;
                        }
                    }
                }
            }
        }
        tactics_isMRSelected = false;
    }
}

function TacticsSquareConversion() {

    tacticsCursor_x = Math.floor(mouseX / (16 * SCREEN_MAGNIFICATION));
    tacticsCursor_y = Math.floor(mouseY / (16 * SCREEN_MAGNIFICATION));
}

function TacticsMovableRangeSetting() {

    let range = Player[tactics_SelectedPlayer].mr * 2 + 1;
    let empty = 0;

    movable_range = new Array(range);
    for (let i = 0; i < movable_range.length; i++) {
        movable_range[i] = new Array(range);
    }

    for (let i = 0; i < movable_range.length; i++) {
        empty = Math.abs((i + 1) - (Player[tactics_SelectedPlayer].mr + 1));

        for (let j = 0; j < movable_range[i].length; j++) {
            if (j <= empty - 1 || j >= movable_range[i].length - empty) {
                movable_range[i][j] = 0;
            } else {

                if ((Player[tactics_SelectedPlayer].pos_x - (Player[tactics_SelectedPlayer].mr - j) >= 0 &&
                    Player[tactics_SelectedPlayer].pos_y - (Player[tactics_SelectedPlayer].mr - i) >= 0) &&
                    (Player[tactics_SelectedPlayer].pos_x - (Player[tactics_SelectedPlayer].mr - j) <= 9 &&
                        Player[tactics_SelectedPlayer].pos_y - (Player[tactics_SelectedPlayer].mr - i) <= 8)) {
                    movable_range[i][j] = 1;
                } else {
                    movable_range[i][j] = 0;
                }

            }
        }
    }

    //new 
    for (let i = 0; i < stage_terrain.length; i++) {
        for (let j = 0; j < stage_terrain[i].length; j++) {
            tactics_MovableRange[i][j] = stage_terrain[i][j];
        }
    }

    let mr = Player[tactics_SelectedPlayer].mr + 1;
    let tx = Player[tactics_SelectedPlayer].pos_x;
    let ty = Player[tactics_SelectedPlayer].pos_y;

    tactics_MovableRange[ty][tx] = mr;

    for (let i = 1; i < mr; i++) {
        if (tx - i >= 0)
            tactics_MovableRange[ty][tx - i] = mr - i;
        if (tx + i <= 9)
            tactics_MovableRange[ty][tx + i] = mr - i;
    }

    for (let j = 0; j < mr; j++) {
        for (let i = 1; i < mr; i++) {
            if (ty - i >= 0 && tx - j >= 0) {
                tactics_MovableRange[ty - i][tx - j] = mr - j - i;
                if (tactics_MovableRange[ty - i][tx - j] < 0)
                    tactics_MovableRange[ty - i][tx - j] = 0;
            }
            if (ty - i >= 0 && tx + j <= 9) {
                tactics_MovableRange[ty - i][tx + j] = mr - j - i;
                if (tactics_MovableRange[ty - i][tx + j] < 0)
                    tactics_MovableRange[ty - i][tx + j] = 0;
            }

            if (ty + i <= 8 && tx - j >= 0) {
                tactics_MovableRange[ty + i][tx - j] = mr - j - i;
                if (tactics_MovableRange[ty + i][tx - j] < 0)
                    tactics_MovableRange[ty + i][tx - j] = 0;
            }
            if (ty + i <= 8 && tx + j <= 9) {
                tactics_MovableRange[ty + i][tx + j] = mr - j - i;
                if (tactics_MovableRange[ty + i][tx + j] < 0)
                    tactics_MovableRange[ty + i][tx + j] = 0;
            }
        }
    }

    for (let i = 0; i < tactics_MovableRange.length; i++) {
        for (let j = 0; j < tactics_MovableRange[i].length; j++) {
            if (stage_terrain[i][j] >= 1) {
                tactics_MovableRange[i][j] = -1;
            }

            for (let e = 0; e < Enemy.length; e++) {
                if (j == Enemy[e].pos_x && i == Enemy[e].pos_y) {
                    tactics_MovableRange[i][j] = -1;
                }
            }

            for (let p = 0; p < Player.length; p++) {
                if (tactics_SelectedPlayer != p &&
                    (j == Player[p].pos_x && i == Player[p].pos_y)) {
                    tactics_MovableRange[i][j] = -1;
                }
            }
        }

    }

}

function TacticsAttackRangeSetting() {

    let player_ar = Player[tactics_SelectedPlayer].ar;
    let range = Player[tactics_SelectedPlayer].ar * 2 + 1;
    let empty = 0;

    //stage 8 or later
    if (stage_number >= 8) {

        TacticsPlayerSkillValueSetting();
        player_ar = tactics_skillSelectedAbility[0].ar;
        range = tactics_skillSelectedAbility[0].ar * 2 + 1;
    }


    movable_range = new Array(range);
    for (let i = 0; i < movable_range.length; i++) {
        movable_range[i] = new Array(range);
    }

    for (let i = 0; i < movable_range.length; i++) {
        empty = Math.abs((i + 1) - (player_ar + 1));

        for (let j = 0; j < movable_range[i].length; j++) {
            if (j <= empty - 1 || j >= movable_range[i].length - empty) {
                movable_range[i][j] = 0;
            } else {

                if ((Player[tactics_SelectedPlayer].pos_x - (player_ar - j) >= 0 &&
                    Player[tactics_SelectedPlayer].pos_y - (player_ar - i) >= 0) &&
                    (Player[tactics_SelectedPlayer].pos_x - (player_ar - j) <= 9 &&
                        Player[tactics_SelectedPlayer].pos_y - (player_ar - i) <= 8)) {
                    movable_range[i][j] = 1;
                } else {
                    movable_range[i][j] = 0;
                }

            }
        }
    }



}

function TacticsTerrainInfoSetting() {

    let id = stage_events[Player[tactics_SelectedPlayer].pos_y][Player[tactics_SelectedPlayer].pos_x];
    switch (id) {
        case 10000:
            TerrainInfo.name = '－';
            break;
        case 10001:
            TerrainInfo.name = '空地';
            break;
        case 10002:
            TerrainInfo.name = 'コンビニ';
            break;
        case 10003:
            TerrainInfo.name = '運動場';
            break;
        case 10004:
            TerrainInfo.name = '焼却炉';
            break;
        case 20003:
            TerrainInfo.name = '電柱';
            break;
    }

    if (id >= 10005 && id <= 10012) {
        TerrainInfo.name = '電柱';

    }
    TerrainInfo.event = id;
}

function TacticsItemEvent() {

    for (let i = 0; i < stage_items.length; i++) {
        if (stage_items[i].pos_x == Player[0].pos_x &&
            stage_items[i].pos_y == Player[0].pos_y) {
            event_code = stage_items[i].ec;
            console.log(event_code);
        }

    }
}

function TacticsAdditionEnemyUnit() {

    //duplication prevention
    for (let i = 0; i < Enemy.length; i++) {
        if (Enemy[i].pos_x == Novel[novel_number].pos_x &&
            Enemy[i].pos_y == Novel[novel_number].pos_y) {
            return;
        }
    }

    Enemy.push({
        name: Novel[novel_number].name,
        icon: Novel[novel_number].icon,
        skill: Novel[novel_number].skill,
        pos_x: Novel[novel_number].pos_x, pos_y: Novel[novel_number].pos_y,
        ap: Novel[novel_number].ap,
        nowhp: Novel[novel_number].nowhp,
        maxhp: Novel[novel_number].maxhp,
        of: Novel[novel_number].of, df: Novel[novel_number].df,
        mr: Novel[novel_number].mr, ar: Novel[novel_number].ar,
        mode: Novel[novel_number].mode,
        direction: Novel[novel_number].direction,
        distance: Novel[novel_number].distance,
        resist: Novel[novel_number].resist,
        end: false,
        dfid: Novel[novel_number].dfid,
    });

}

function TacticsAdditionEnemy_BattleRoyal(){
    
    Enemy.push({
        name: Novel[novel_number].name,
        icon: Novel[novel_number].icon,
        skill: Novel[novel_number].skill,
        pos_x: Novel[novel_number].pos_x, pos_y: Novel[novel_number].pos_y,
        ap: Novel[novel_number].ap,
        nowhp: Novel[novel_number].nowhp,
        maxhp: Novel[novel_number].maxhp,
        condition:Array.from(Novel[novel_number].condition),
        of: Novel[novel_number].of, df: Novel[novel_number].df,
        mr: Novel[novel_number].mr, ar: Novel[novel_number].ar,
        mode: Novel[novel_number].mode,
        direction: Novel[novel_number].direction,
        distance: Novel[novel_number].distance,
        resist: Novel[novel_number].resist,
        end: false,
        dfid: Novel[novel_number].dfid,
    });
}


function TacticsOverwriteEnemyUnit() {

    Enemy[tactics_enemyUnitMemory].name = Novel[novel_number].name;
    Enemy[tactics_enemyUnitMemory].icon = Novel[novel_number].icon;
    Enemy[tactics_enemyUnitMemory].skill = Novel[novel_number].skill;
    Enemy[tactics_enemyUnitMemory].ap = Novel[novel_number].ap;
    Enemy[tactics_enemyUnitMemory].nowhp = Novel[novel_number].nowhp;
    Enemy[tactics_enemyUnitMemory].maxhp = Novel[novel_number].maxhp;
    Enemy[tactics_enemyUnitMemory].of = Novel[novel_number].of;
    Enemy[tactics_enemyUnitMemory].df = Novel[novel_number].df;
    Enemy[tactics_enemyUnitMemory].mr = Novel[novel_number].mr;
    Enemy[tactics_enemyUnitMemory].ar = Novel[novel_number].ar;
    Enemy[tactics_enemyUnitMemory].mode = Novel[novel_number].mode;
    Enemy[tactics_enemyUnitMemory].direction = Novel[novel_number].direction;
    Enemy[tactics_enemyUnitMemory].distance = Novel[novel_number].distance;
    Enemy[tactics_enemyUnitMemory].resist = Novel[novel_number].resist;
    Enemy[tactics_enemyUnitMemory].end = false;
    Enemy[tactics_enemyUnitMemory].dfid = Novel[novel_number].dfid;

}

function TacticsAdditionPlayerUnit() {
    Player.push({
        name: Novel[novel_number].name, icon: Novel[novel_number].icon,
        pos_x: Novel[novel_number].pos_x, pos_y: Novel[novel_number].pos_y,
        ap: Novel[novel_number].ap, mr: Novel[novel_number].mr, ar: Novel[novel_number].ar,
        nowhp: Novel[novel_number].nowhp, maxhp: Novel[novel_number].maxhp,
        of: Novel[novel_number].of, df: Novel[novel_number].df,
        end_mv: false, end_at: false,
        skill: Novel[novel_number].skill, operation: Novel[novel_number].operation
    });
}

function TacticsBattleProcessManager() {

    switch (tactics_battleProcess) {
        case 0:
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 1: //skillname
            if (tactics_skillnamePosX >= 16 * SCREEN_MAGNIFICATION) {
                tactics_battleProcess++;
            } else {
                tactics_skillnamePosX += 128 * SCREEN_MAGNIFICATION * fixedDeltaTime;
            }
            break;
        case 2:
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 3: //battle picture
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 4:
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;

                //if Counter
                if (tactics_Turn) {   //player > enemy
                    if (tactics_skillSelectedAbility[0].type !== 'support') {
                        if (Enemy[tactics_attackTarget].ap >= 1 &&
                            typeof Enemy[tactics_attackTarget].counter !== 'undefined') {
                            Enemy[tactics_attackTarget].ap--;
                            tactics_bpm_enemycounter = true;
                            tactics_battleProcess++;
                        } else {
                            tactics_battleProcess = 8;
                        }
                    } else {
                        tactics_battleProcess = 8;
                    }

                } else {  //enemy> player

                    if (tactics_CmdSelectedSkill === 'no' ||
                        tactics_Turn) {
                        tactics_battleProcess = 8;
                    } else {
                        tactics_battleProcess++;
                    }
                }


            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 5: //counter string
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_skillnameSize -= 32 * fixedDeltaTime;
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 6: //counter picture
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 7:
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess++;
            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;

        case 8: //shakeicon

            if (tactics_shakeCount > 4) {
                tactics_shakeCount = 0;
                tactics_shakeDirection = false;
                tactics_battleProcess++;
            } else {
                tactics_shakeStrength = 64 * SCREEN_MAGNIFICATION;

                if (tactics_shakeCount == 1 || tactics_shakeCount == 3)
                    tactics_shakeStrength = 128 * SCREEN_MAGNIFICATION;

                let last = 1;
                (tactics_shakeCount == 4) ? last = 0 : last = 1;

                if (!tactics_shakeDirection) {
                    if (tactics_shakeDistance <= -(4 * SCREEN_MAGNIFICATION) * last) {
                        tactics_shakeDirection = !tactics_shakeDirection;
                        tactics_shakeCount++;
                    } else {
                        tactics_shakeDistance -= tactics_shakeStrength * fixedDeltaTime;

                        if (tactics_shakeDistance <= 0 && tactics_shakeCount == 4)
                            tactics_shakeDistance = 0;
                    }
                } else {
                    if (tactics_shakeDistance >= 4 * SCREEN_MAGNIFICATION) {
                        tactics_shakeDirection = !tactics_shakeDirection;
                        tactics_shakeCount++;
                    } else {
                        tactics_shakeDistance += tactics_shakeStrength * fixedDeltaTime;
                    }
                }
            }
            break;

        case 9:
            if (tactics_Turn) { //Player -> Enemy

                if (stage_number >= 8) {  //system change

                    if (tactics_skillSelectedAbility[0].type !== 'support') {
                        if (Enemy[tactics_attackTarget].resist !== tactics_skillSelectedAbility[0].attribute) {

                            let damage = tactics_skillSelectedAbility[0].of;
                            if (TacticsBuffDoubleChecker('bpbuff', Enemy[tactics_attackTarget].condition)) {
                                damage -= 1;
                                (damage < 0) ? damage = 0 : damage;
                            }

                            //counter less
                            if (tactics_bpm_enemycounter) {
                                damage = 0;
                            }

                            //suppresson by subtraction
                            if (tactics_suppressonPlayerPer >= 0.8) {
                                damage += 2;
                            }

                            Enemy[tactics_attackTarget].nowhp -= damage;

                            //add debuff
                            if (tactics_skillSelectedAbility[0].skill === 'dontmove') {
                                let condition = Array.from(Enemy[tactics_attackTarget].condition);
                                if (!TacticsBuffDoubleChecker('dontmove', condition)) {
                                    condition.push({ name: 'dontmove', turn: 0 });
                                    Enemy[tactics_attackTarget].condition = condition;
                                } else {
                                    for (let i = 0; i < Enemy[tactics_attackTarget].condition.length; i++) {
                                        if (Enemy[tactics_attackTarget].condition[i].name === 'dontmove') {
                                            Enemy[tactics_attackTarget].condition[i].turn = 0;
                                        }

                                    }
                                }
                            }

                            //
                            if (Enemy[tactics_attackTarget].nowhp <= 0) {
                                Enemy[tactics_attackTarget].nowhp = 0;
                                EnemyDefeatedList.push(Enemy[tactics_attackTarget].icon);
                                TacticsVictoryConditionChecker();

                                TacticsDefeatedFlagChecker();

                            }
                        }
                        tactics_battleProcess++;

                    } else {
                        if (Player[tactics_supportTarget].nowhp + tactics_skillSelectedAbility[0].of >= Player[tactics_supportTarget].maxhp) {
                            Player[tactics_supportTarget].nowhp = Player[tactics_supportTarget].maxhp;
                        } else {
                            Player[tactics_supportTarget].nowhp += tactics_skillSelectedAbility[0].of;
                        }
                        tactics_battleProcess++;
                    }

                } else {
                    if (Enemy[tactics_attackTarget].resist !== TacticsResistChecker(Player[tactics_SelectedPlayer].skill)) {

                        Enemy[tactics_attackTarget].nowhp -=
                            (Player[tactics_SelectedPlayer].of + TacticsPlayerSkillSelector()) *
                            TacticsPlayerBufEffect() - Enemy[tactics_attackTarget].df;

                        //add debuff
                        if (tactics_skillSelectedAbility[0].skill === 'dontmove') {
                            let condition = Array.from(Enemy[tactics_attackTarget].condition);
                            if (!TacticsBuffDoubleChecker('dontmove', condition)) {
                                condition.push({ name: 'dontmove', turn: 0 });
                                Enemy[tactics_attackTarget].condition = condition;
                            } else {
                                for (let i = 0; i < Enemy[tactics_attackTarget].condition.length; i++) {
                                    if (Enemy[tactics_attackTarget].condition[i].name === 'dontmove') {
                                        Enemy[tactics_attackTarget].condition[i].turn = 0;
                                    }

                                }
                            }
                        }
                        //
                        if (Enemy[tactics_attackTarget].nowhp <= 0) {
                            Enemy[tactics_attackTarget].nowhp = 0;
                            EnemyDefeatedList.push(Enemy[tactics_attackTarget].icon);
                            TacticsVictoryConditionChecker();

                            TacticsDefeatedFlagChecker();
                        }
                    }
                    tactics_battleProcess++;
                }

            } else {    //Enemy -> Player

                if (stage_number >= 8) {

                    if (Enemy[tactics_enemyUnitCount].mode !== 'accompany') {

                        if (!TacticsRangeAttackEnemyClassifier(Enemy[tactics_enemyUnitCount].icon)) {
                            let damage = Enemy[tactics_enemyUnitCount].of;
                            if (TacticsBuffDoubleChecker('bpbuff', Player[tactics_SelectedPlayer].condition)) {
                                damage -= 1;
                                (damage < 0) ? damage = 0 : damage;
                            }

                            //counter less
                            (tactics_CmdSelectedSkill !== 'no') ? damage -= 1 : damage;
                            (damage < 0) ? damage = 0 : damage;

                            //suppresson by subtraction
                            if (tactics_suppressonPlayerPer <= 0.2) {
                                damage += 2;
                            }

                            Player[tactics_SelectedPlayer].nowhp -= damage;

                            //add debuff
                            if (Enemy[tactics_enemyUnitCount].icon === 'jeda' ||
                                Enemy[tactics_enemyUnitCount].icon === 'sizer') {
                                let condition = Array.from(Player[tactics_SelectedPlayer].condition);
                                if (!TacticsBuffDoubleChecker('stan', condition)) {
                                    condition.push({ name: 'stan', turn: 0 });
                                    Player[tactics_SelectedPlayer].condition = condition;
                                } else {
                                    for (let i = 0; i < Player[tactics_SelectedPlayer].condition.length; i++) {
                                        if (Player[tactics_SelectedPlayer].condition[i].name === 'stan') {
                                            Player[tactics_SelectedPlayer].condition[i].turn = 0;
                                        }

                                    }
                                }
                            }

                            tactics_battleProcess++;

                        } else {

                            //range attack

                            if (!animation_DataSet) {
                                AnimeDataSetting("effect_damage");
                            }

                            if (tactics_battleRangeAttackIndex >= tactics_enemyRangeAttackList.length) {
                                tactics_battleRangeAttackIndex = 0;
                                animation_DataSet = false;
                                tactics_battleProcess++;

                            } else {
                                if (animation_celcount >= AnimeData.length) { //anim end and damage calculate

                                    let damage = Enemy[tactics_enemyUnitCount].of;
                                    if (TacticsBuffDoubleChecker('bpbuff', Player[tactics_enemyRangeAttackList[tactics_battleRangeAttackIndex].id].condition)) {
                                        damage -= 1;
                                        (damage < 0) ? damage = 0 : damage;
                                    }

                                    //counter less
                                    (tactics_CmdSelectedSkill !== 'no') ? damage -= 1 : damage;
                                    (damage < 0) ? damage = 0 : damage;

                                    Player[tactics_enemyRangeAttackList[tactics_battleRangeAttackIndex].id].nowhp -= damage;

                                    animation_DataSet = false;
                                    animation_celcount = 0;
                                    tactics_battleRangeAttackIndex++;
                                } else {
                                    if (animation_totaltime >= AnimeData[animation_celcount].time) {
                                        animation_totaltime = 0;
                                        animation_celcount++;
                                    } else {
                                        animation_totaltime += fixedDeltaTime;
                                    }
                                }
                            }
                        }


                    } else {

                        let recoveryHP = Enemy[tactics_enemyUnitCount].of;

                        if (recoveryHP + Enemy[tactics_SelectedPlayer].nowhp >= Enemy[tactics_SelectedPlayer].maxhp) {
                            Enemy[tactics_SelectedPlayer].nowhp = Enemy[tactics_SelectedPlayer].maxhp;
                        } else {
                            Enemy[tactics_SelectedPlayer].nowhp += recoveryHP;
                        }
                        tactics_battleProcess++;
                    }

                } else {

                    let damage = Enemy[tactics_enemyUnitCount].of - Player[tactics_SelectedPlayer].df;
                    (tactics_CmdSelectedSkill !== 'no') ? damage = 10 : damage;
                    (damage < 0) ? damage = 0 : damage;
                    Player[tactics_SelectedPlayer].nowhp -= damage;
                    tactics_battleProcess++;
                }
            }
            break;
        case 10:
            if (tactics_waitTotalTime >= 1) {
                tactics_waitTotalTime = 0;
                tactics_battleProcess = 0;
                tactics_skillnamePosX = -160;
                tactics_skillnameSize = 32;
                tactics_CmdSelectedSkill = 'no';
                tactics_bpm_enemycounter = false;

                if (!tactics_Turn) {
                    Enemy[tactics_enemyUnitCount].end = true;
                    Enemy[tactics_enemyUnitCount].ap--;
                    tactics_enemyARSet = false;
                    tactics_enemyThinking = true;
                    tactics_battleViewEnabled = false;
                    tactics_enemySubPhase = 0;
                    tactics_enemyUnitCount++;
                } else {
                    tactics_Phase = 'none';
                }

                if (tactics_Turn &&
                    Enemy[tactics_attackTarget].resist === TacticsResistChecker(Player[tactics_SelectedPlayer].skill)) {
                    event_code = 30000;
                    SetEventData();
                    isEvent = true;
                }

                TacticsGotoEventAfterDefeating();

            } else {
                tactics_waitTotalTime += fixedDeltaTime;
            }

            break;
    }
}

function TacticsPlayerSkillSelector() {

    switch (Player[tactics_SelectedPlayer].skill) {

        case 'ground':
            return 30;
        default:
            return 0;
    }
}

function TacticsPlayerBufEffect() {

    if (typeof Player[tactics_SelectedPlayer].condition !== 'undefined')
        for (let i = 0; i < Player[tactics_SelectedPlayer].condition.length; i++) {
            if (Player[tactics_SelectedPlayer].condition[i].name === 'hero') {
                return Player[tactics_SelectedPlayer].of * 10;
            }
        }
    return 1;
}

//singlePlayerUnit
function TacticsPlayerUnitPlacement() {

    if (!tactics_PlacementRangeSet) {
        tactics_MovableRange = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],];
        tactics_PlacementRangeSet = true;
    } else {

        if (!tactics_PlacementSelected) {
            if (mouseLeftClick && !mouseLeftClick_isClicked) {
                if (tactics_MovableRange[tacticsCursor_y][tacticsCursor_x] == 1 &&
                    !TacticsUnitExistenceChecker(tacticsCursor_x, tacticsCursor_y)) {

                    Player.push({
                        name: 'ゲシュテル', icon: 'gester',
                        pos_x: tacticsCursor_x, pos_y: tacticsCursor_y, ap: 4, mr: 3, ar: 1,
                        nowhp: 777, maxhp: 777, of: 80, df: 40, condition: [{ name: 'hero', turn: 0 }],
                        end_mv: false, end_at: false,
                        skill: 'cosmicslash', operation: false,
                    });
                    tactics_PlacementSelected = true;
                    mouseLeftClick_isClicked = true;
                }
            }
        } else {

            let cmdy_x = 7 * 16 * SCREEN_MAGNIFICATION;
            let cmdy_y = 5 * 16 * SCREEN_MAGNIFICATION;
            let cmdn_x = 7 * 16 * SCREEN_MAGNIFICATION;
            let cmdn_y = 7 * 16 * SCREEN_MAGNIFICATION;
            let w = 2 * 16 * SCREEN_MAGNIFICATION;
            let h = 16 * SCREEN_MAGNIFICATION;

            if ((cmdy_x <= mouseX && cmdy_x + w >= mouseX) &&
                (cmdy_y <= mouseY && cmdy_y + h >= mouseY)) {

                if (mouseLeftClick && !mouseLeftClick_isClicked) {

                    tactics_PlacementRangeSet = false;
                    tactics_PlacementSelected = false;
                    mouseLeftClick_isClicked = true;
                    novel_number++; //placement end
                }

            } else {
                if ((cmdn_x <= mouseX && cmdn_x + w >= mouseX) &&
                    (cmdn_y <= mouseY && cmdn_y + h >= mouseY)) {

                    if (mouseLeftClick && !mouseLeftClick_isClicked) {

                        for (let i = 0; i < Player.length; i++) {
                            if (Player[i].icon === 'gester') {
                                Player.splice(i, 1);
                                break;
                            }

                        }

                        tactics_PlacementSelected = false;
                        mouseLeftClick_isClicked = true;

                    }
                }
            }
        }
    }
}

//PlayerUnitMemver
function TacticsPlayerUnitMemberPlacement() {

    if (!tactics_PlacementRangeSet) {
        tactics_MovableRange = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],];
        tactics_PlacementRangeSet = true;
        tactics_PlacementCount = 0;
    } else {

        if (!tactics_PlacementSelected) {
            if (mouseLeftClick && !mouseLeftClick_isClicked) {
                if (tactics_MovableRange[tacticsCursor_y][tacticsCursor_x] == 1 &&
                    !TacticsUnitExistenceChecker(tacticsCursor_x, tacticsCursor_y)) {

                    switch (tactics_PlacementMember[tactics_PlacementCount]) {
                        case "akino":
                            Player.push({
                                name: 'アッキーノ', icon: 'akino',
                                pos_x: tacticsCursor_x, pos_y: tacticsCursor_y, ap: 2, mr: 2, ar: 1,
                                nowhp: 10, maxhp: 10, of: 2, df: 0,
                                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                                end_mv: false, end_at: false,
                                skill: 'binta', counter: 'sunlight', operation: false,
                            });
                            break;
                        case "hawk":
                            Player.push({
                                name: 'ホーク', icon: 'hawk',
                                pos_x: tacticsCursor_x, pos_y: tacticsCursor_y, ap: 2, mr: 2, ar: 3,
                                nowhp: 10, maxhp: 10, of: 2, df: 0,
                                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                                end_mv: false, end_at: false,
                                skill: 'oneshotkill', operation: false,
                            });
                            break;
                        case "kazami":
                            Player.push({
                                name: '風見正博', icon: 'kazami',
                                pos_x: tacticsCursor_x, pos_y: tacticsCursor_y, ap: 2, mr: 2, ar: 2,
                                nowhp: 10, maxhp: 10, of: 2, df: 0,
                                condition: [{ name: 'human', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                                end_mv: false, end_at: false,
                                skill: '', operation: false,
                            });
                            break;
                        case "gester":
                            Player.push({
                                name: 'ゲシュテル', icon: 'gester',
                                pos_x: tacticsCursor_x, pos_y: tacticsCursor_y, ap: 2, mr: 3, ar: 1,
                                nowhp: 10, maxhp: 10, of: 2, df: 0,
                                condition: [{ name: 'machine', turn: 0 }, { name: 'empty', turn: 0 }, { name: 'bpbuff', turn: 0 }],
                                end_mv: false, end_at: false,
                                skill: 'binta', operation: false,
                            });
                            break;
                    }

                    tactics_PlacementCount++;
                    if (tactics_PlacementCount == tactics_PlacementMember.length) {
                        tactics_PlacementSelected = true;
                    }
                    mouseLeftClick_isClicked = true;
                }
            }
        } else {

            let cmdy_x = 2 * 16 * SCREEN_MAGNIFICATION;
            let cmdy_y = 4 * 16 * SCREEN_MAGNIFICATION;
            let cmdn_x = 6 * 16 * SCREEN_MAGNIFICATION;
            let cmdn_y = 4 * 16 * SCREEN_MAGNIFICATION;
            let w = 2 * 16 * SCREEN_MAGNIFICATION;
            let h = 16 * SCREEN_MAGNIFICATION;

            if ((cmdy_x <= mouseX && cmdy_x + w >= mouseX) &&
                (cmdy_y <= mouseY && cmdy_y + h >= mouseY)) {

                if (mouseLeftClick && !mouseLeftClick_isClicked) {

                    tactics_PlacementRangeSet = false;
                    tactics_PlacementSelected = false;
                    mouseLeftClick_isClicked = true;
                    novel_number++; //placement end
                }

            } else {
                if ((cmdn_x <= mouseX && cmdn_x + w >= mouseX) &&
                    (cmdn_y <= mouseY && cmdn_y + h >= mouseY)) {

                    if (mouseLeftClick && !mouseLeftClick_isClicked) {

                        Player = [];
                        tactics_PlacementCount = 0;
                        tactics_PlacementSelected = false;
                        mouseLeftClick_isClicked = true;

                    }
                }
            }

        }
    }
}

function EventMode() {

    switch (Novel[novel_number].command) {

        case "p_pos_set":
            Player[0].pos_x = Novel[novel_number].pos_x;
            Player[0].pos_y = Novel[novel_number].pos_y;
            novel_number++;
            break;

        case "stage_set":
            stage_name = Novel[novel_number].name;
            TacticsStageDataSetting();
            novel_number++;
            break;

        case "placement":
            if (stage_number >= 8) {
                TacticsPlayerUnitMemberPlacement();
            } else {
                TacticsPlayerUnitPlacement();
            }

            break;

        case "turnevent":
            tactics_TurnEvent.push({ code: Novel[novel_number].code, value: Novel[novel_number].value });
            novel_number++;
            break;

        case "add_vcpoint":
            tactics_vcPointList = [{ pos_x: Novel[novel_number].pos_x, pos_y: Novel[novel_number].pos_y }];
            novel_number++;
            break;

        case "addenemy":
            TacticsAdditionEnemyUnit();
            novel_number++;
            break;
        
        case "addenemy_br":
            TacticsAdditionEnemy_BattleRoyal();
            novel_number++;
            break;

        case "overwrite_enemy":
            TacticsOverwriteEnemyUnit();
            novel_number++;
            break;

        case "addplayer":
            TacticsAdditionPlayerUnit();
            novel_number++;
            break;

        case "enemy_delete":
            for (let i = 0; i < Enemy.length; i++) {
                if (Enemy[i].pos_x == Novel[novel_number].pos_x &&
                    Enemy[i].pos_y == Novel[novel_number].pos_y) {
                    Enemy.splice(i, 1);
                }

            }
            novel_number++;
            break;
        case "enemy_destroy":
            Enemy = [];
            novel_number++;
            break;

        case "item_delete":
            for (let i = 0; i < stage_items.length; i++) {
                if (stage_items[i].icon === Novel[novel_number].name) {
                    stage_items.splice(i, 1);
                }
            }
            novel_number++;
            break;

        case "rewriting_event":
            stage_events[Player[0].pos_y][Player[0].pos_x] = Novel[novel_number].value;
            novel_number++;
            break;

        case "rewriting_terrain":
            stage_terrain[Novel[novel_number].pos_y][Novel[novel_number].pos_x] = Novel[novel_number].value;
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

        case "msgwindow":
            if (render_TotalTime >= 1) {
                if (Novel[novel_number].value == 1) {
                    msgWindow_isOpen = true;
                }

                (Novel[novel_number].layer == true) ? msgWindow_layer = true : msgWindow_layer = false;

                render_TotalTime = 0;
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

        case "sentence_br":
            if (sentence_isRead) {
                sentence_readLine = false;
                sentence_lineValue = "";
                sentence_displayCharacters = "";
                sentence_charaCounter = 1;
                sentence_isRead = false;

                novel_number++;
            } else {
                SentenceManagerBattleRoyal();
            }
            break;

        case "stand":
            StandManager();
            novel_number++;
            break;

        case "stand_br":
            StandBattleRoyal();
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

        case "stand_delete_br":
            memory_stand.splice(0, 1);
            novel_number++;
            break;

        case "picture":
            PictureRecorder();
            novel_number++;
            break;

        case "picture_change":
            PictureChanger();
            novel_number++;
            break;

        case "picture_delete":
            PictureDelete();
            novel_number++;
            break;

        case "addskill":

            Player[0].skill = Novel[novel_number].name;
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

            if (Novel[novel_number].modechange) {
                TacticsInitialize();
                novel_isSetData = false;
                scene_mode = 1;
                NovelEndInit();
                SetNovelData();
            } else {
                NovelEndInit();
                novel_isSetData = false;
                isEvent = false;
            }
            break;
    }
}

function TacticsVictoryConditionChecker() {

    switch (tactics_vcType) {
        case 'boss':
            for (let i = 0; i < EnemyDefeatedList.length; i++) {
                if (EnemyDefeatedList[i] === tactics_vcTargetEnemyName) {
                    tactics_isVictory = true;
                    break;
                }
            }
            break;

        case 'annihilation':

            let count = 0;

            for (let i = 0; i < Enemy.length; i++) {
                if (Enemy[i].nowhp <= 0) {
                    count++;
                }
            }

            if (count == Enemy.length) {
                tactics_isVictory = true;
            }

            break;
    }
}

function TacticsVCPointReaching() {

    for (let i = 0; i < tactics_vcPointList.length; i++) {
        if (tactics_vcPointList[i].pos_x == Player[0].pos_x &&
            tactics_vcPointList[i].pos_y == Player[0].pos_y) {
            tactics_isVictory = true;
        }

    }

}

function TacticsDefeatedFlagChecker() {

    for (let i = 0; i < tactics_DefeatedFlag.length; i++) {
        if (tactics_DefeatedFlag[i].dfid === Enemy[tactics_attackTarget].dfid) {
            tactics_DefeatedFlag[i].flag = true;
        }
    }


}

function TacticsGotoEventAfterDefeating() {

    let count = tactics_DefeatedFlag.length;
    switch (stage_number) {
        case 4:
            for (let i = 0; i < tactics_DefeatedFlag.length; i++) {
                if (tactics_DefeatedFlag[i].flag) {
                    count--;
                }
            }
            if (count == 0) {
                event_code = 10013;
                SetEventData();
                isEvent = true;
            }
            break;
    }
}


function TacticsGotoEventAfterVictory() {
    event_code = tactics_vcNextEventCode;
    SetEventData();
    isEvent = true;
}

function TacticsBuffDoubleChecker(buffname, buffarray) {

    for (let i = 0; i < buffarray.length; i++) {
        if (buffname === buffarray[i].name) {
            return true;
        }
    }
    return false;
}

function TacticsBuffReleaser(buffname, buffarray) {
    for (let i = 0; i < buffarray.length; i++) {
        if (buffname === buffarray[i].name) {
            buffarray.splice(i, 1);
            break;
        }
    }
    return buffarray;
}

function TacticsResistChecker(skill) {
    switch (skill) {
        case 'binta':
            return 'blow';

        case 'flame':
            return 'flame';

        default:
            return 'blow';
    }
}

function TacticsPlayerUnitSkillListSetting() {
    switch (Player[tactics_SelectedPlayer].icon) {
        case 'akino':
            tactics_skillList = ["binta", "ground"];
            break;
        case 'hawk':
            tactics_skillList = ["oneshotkill", "dontmove"];
            break;
        case 'kazami':
            tactics_skillList = ["injection"];
            break;
        case 'gester':
            tactics_skillList = ["cosmicslash"];
            break;
        default:
            break;
    }
}

function TacticsPlayerSkillValueSetting() {
    switch (tactics_skillSelectedName) {
        case 'binta':
            tactics_skillSelectedAbility = [{ name: 'あねごのビンタ', skill: 'binta', ar: 1, of: 666, type: 'attack', attribute: 'blow' }];
            break;
        case 'ground':
            tactics_skillSelectedAbility = [{ name: 'アースプレッシング', skill: 'ground', ar: 2, of: 3, type: 'attack', attribute: 'ground' }];
            break;
        case 'oneshotkill':
            tactics_skillSelectedAbility = [{ name: 'ワンショットキル', skill: 'oneshotkill', ar: 3, of: 3, type: 'attack', attribute: 'shooting' }];
            break;
        case 'dontmove':
            tactics_skillSelectedAbility = [{ name: 'Don\'t move!', skill: 'dontmove', ar: 3, of: 2, type: 'attack', attribute: 'shooting' }];
            break;
        case 'cosmicslash':
            tactics_skillSelectedAbility = [{ name: 'コズミックスラッシュ', skill: 'cosmicslash', ar: 1, of: 3, type: 'attack', attribute: 'slaching' }];
            break;
        case 'injection':
            tactics_skillSelectedAbility = [{ name: 'ヒールインジェクション', skill: 'injection', ar: 2, of: 3, type: 'support', attribute: 'recovery' }];
            break;

    }
}

function TacticsTurnElapsedEvent() {
    for (let i = 0; i < tactics_TurnEvent.length; i++) {
        if (tactics_TurnEvent[i].value == tactics_TurnNum) {
            event_code = tactics_TurnEvent[i].code;
            tactics_TurnEvent.splice(i, 1);
            SetEventData();
            isEvent = true;
            break;
        }

    }
}

function TacticsUnitExistenceChecker(x, y) {

    let result = false;

    for (let i = 0; i < Player.length; i++) {
        if (Player[i].pos_x == x && Player[i].pos_y == y) {
            result = true;
            break;
        }
    }

    for (let i = 0; i < Enemy.length; i++) {
        if (Enemy[i].pos_x == x && Enemy[i].pos_y == y) {
            result = true;
            break;
        }
    }

    return result;
}

function TacticsBuildIconReductionSetting(playerid) {

    for (let i = 0; i < Building.length; i++) {
        for (let j = 0; j < Building[i].length; j++) {
            if (Building[i][j].type == 1) {
                for (let p = 0; p < Player.length; p++) {

                    if (Player[p].pos_x == j && Player[p].pos_y == i) {
                        building_reduction[i][j] = 1;
                    } else {
                        building_reduction[i][j] = 0;
                    }

                }
            }
        }
    }
}

function TacticsPlayerConditionManager() {
    for (let i = 0; i < Player.length; i++) {
        for (let j = 0; j < Player[i].condition.length; j++) {

            if (Player[i].condition[j].name === 'stan') {
                let condition = Array.from(Player[i].condition);
                TacticsBuffReleaser('stan', condition);
                Player[i].condition = condition;
            }
        }
    }
}

function TacticsPlayerAPInit() {
    for (let i = 0; i < Player.length; i++) {
        Player[i].ap = 1;
    }
}

function TacticsInitialize() {
    isEvent = true;
    stage_name = "black";
    stage_terrain = [];
    stage_events = [];
    movable_range = new Array();

    Player = {
        name: "あっきーの",
        pos_x: 0, pos_y: 0,
        ap: 4, mr: 2, ar: 1,
        nowhp: 100, maxhp: 100, of: 20, df: 10,
        end_mv: false, end_at: false
    };

    Enemy = [];
    Building = [];

    TerrainInfo = {
        name: 'Name', event: 0,
    };

    Command = [];
    tactics_TurnEvent = [];
    tactics_TurnNum = 1;
    EnemyDefeatedList = [];

    tacticsCursor_x = 0;
    tacticsCursor_y = 0;

    tactics_Turn = true;
    tactics_Phase = 'none';
    tactics_isMRSelected = false;
    tactics_SquareClickPoint = [0, 0];
    tactics_isTESet = false;
    tactics_isPUSelect = false;
    tactics_isMRset = false;
    tactics_isARSet = false;
    tactics_attackTarget = 0;
    tactics_battleProcess = 0;
    tactics_battleViewEnabled = false;
    tactics_waitTotalTime = 0;

    tactics_skillnamePosX = -160;
    tactics_shakeCount = 0;
    tactics_shakeDirection = false;
    tactics_shakeDistance = 0;
    tactics_shakeStrength = 0;

    tactics_turnString = false;

    tactics_enemyPhase = 'none';
    tactics_enemyUnitCount = 0;
    tactics_enemyThinking = true;
    tactics_enemyThinkingTime = 0;

    tactics_isVictory = false;
}