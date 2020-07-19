


function DrawingAnimation() {

    if (animation_DataSet &&
        typeof AnimeData[animation_celcount] !== 'undefined') {

        let line = 0;
        let celnum = AnimeData[animation_celcount].cel;

        while (celnum >= 10) {
            celnum -= 10;
            line++;
        }

        if (!animation_centerpoint) {
            ctx.drawImage(Asset.images[animation_name],
                celnum * 96, line * 80,
                96, 80,
                32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                96 * SCREEN_MAGNIFICATION, 80 * SCREEN_MAGNIFICATION);
        } else {

            let p_x = tactics_enemyRangeAttackList[tactics_battleRangeAttackIndex].pos_x;
            let p_y = tactics_enemyRangeAttackList[tactics_battleRangeAttackIndex].pos_y;

            ctx.drawImage(Asset.images[animation_name],
                celnum * 64, line * 64,
                64, 64,
                (p_x * 16 - 32 + 8) * SCREEN_MAGNIFICATION, (p_y * 16 - 32 + 8) * SCREEN_MAGNIFICATION,
                64 * SCREEN_MAGNIFICATION, 64 * SCREEN_MAGNIFICATION);
        }
    }
}

function DrawingTacticsTerrain() {

    for (let i = 0; i < stage_terrain.length; i++) {
        for (let j = 0; j < stage_terrain[i].length; j++) {
            if (stage_terrain[i][j] == 2) {
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon.electric.sx, Asset.icon.electric.sy,
                    16, 16,
                    j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                    16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
            }
        }
    }
}


function DrawingTacticsUpperLayer() {

    for (let i = 0; i < stage_layer_upper.length; i++) {
        for (let j = 0; j < stage_layer_upper[i].length; j++) {
            if (stage_layer_upper[i][j] == 1) {
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon.gate.sx, Asset.icon.gate.sy,
                    16, 16,
                    j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                    16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            }
        }
    }
}

function DrawingTacticsItems() {
    for (let i = 0; i < stage_items.length; i++) {
        if (stage_items[i].icon === 'chip') {
            ctx.drawImage(Asset.images['icon'],
                Asset.icon[stage_items[i].icon].sx, Asset.icon[stage_items[i].icon].sy,
                16, 16,
                stage_items[i].pos_x * 16 * SCREEN_MAGNIFICATION, stage_items[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        }
    }
}

function DrawingTacticsBuilding() {

    if (Building.length >= 1)
        for (let i = 0; i < Building.length; i++) {
            for (let j = 0; j < Building[i].length; j++) {
                if (Building[i][j].type == 1) {
                    let flag = false;
                    for (let p = 0; p < Player.length; p++) {
                        if (Player[p].pos_x == j && Player[p].pos_y == i) {
                            ctx.drawImage(Asset.images['icon'],
                                Asset.icon['venom'].sx, Asset.icon['venom'].sy, 16, 16,
                                (j * 16 + 8) * SCREEN_MAGNIFICATION, (i * 16 + 8) * SCREEN_MAGNIFICATION,
                                8 * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        ctx.drawImage(Asset.images['icon'],
                            Asset.icon['venom'].sx, Asset.icon['venom'].sy, 16, 16,
                            j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                            16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
                    }
                    // ctx.drawImage(Asset.images['icon'],
                    //     Asset.icon['venom'].sx, Asset.icon['venom'].sy, 16, 16,
                    //     (j * 16 + 8) * SCREEN_MAGNIFICATION, (i * 16 + 8) * SCREEN_MAGNIFICATION,
                    //     8 * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);

                }
            }
        }
}

function DrawingTacticsPlayer() {

    for (let i = 0; i < Player.length; i++) {

        if (tactics_Phase === 'player_select') {
            ctx.drawImage(Asset.images['icon'],
                Asset.icon.chara_cursor.sx, Asset.icon.chara_cursor.sy, 16, 16,
                Player[i].pos_x * 16 * SCREEN_MAGNIFICATION, Player[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        }

        ctx.drawImage(Asset.images['icon'],
            Asset.icon[Player[i].icon].sx, Asset.icon[Player[i].icon].sy, 16, 16,
            Player[i].pos_x * 16 * SCREEN_MAGNIFICATION, Player[i].pos_y * 16 * SCREEN_MAGNIFICATION,
            16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
    }

}

function DrawingTacticsEnemyUnit() {

    if (Enemy.length >= 1)

        DrawingEnemyRangeShow();

    for (let i = 0; i < Enemy.length; i++) {

        ctx.drawImage(Asset.images['icon'],
            Asset.icon[Enemy[i].icon].sx, Asset.icon[Enemy[i].icon].sy, 16, 16,
            Enemy[i].pos_x * 16 * SCREEN_MAGNIFICATION, Enemy[i].pos_y * 16 * SCREEN_MAGNIFICATION,
            16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

        if (Enemy[i].nowhp <= 0) {
            ctx.drawImage(Asset.images['icon'],
                Asset.icon['ko'].sx, Asset.icon['ko'].sy, 16, 16,
                Enemy[i].pos_x * 16 * SCREEN_MAGNIFICATION, Enemy[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        }

        if (Enemy[i].end && Enemy[i].nowhp > 0) {
            ctx.drawImage(Asset.images['icon'],
                Asset.icon['end'].sx, Asset.icon['end'].sy, 16, 16,
                Enemy[i].pos_x * 16 * SCREEN_MAGNIFICATION, Enemy[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        }
    }
}

function DrawingTacticsTargetShow() {

    if (tactics_enemyTUShow) {
        ctx.drawImage(Asset.images['icon'],
            Asset.icon['target'].sx, Asset.icon['target'].sy, 16, 16,
            tactics_targetPoint[0] * 16 * SCREEN_MAGNIFICATION, tactics_targetPoint[1] * 16 * SCREEN_MAGNIFICATION,
            16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
    }


}

function DrawingTacticsCursor() {

    if (!isEvent)
        if (tactics_Turn && tactics_Phase === 'none') {

            ctx.globalAlpha = 0.6;

            ctx.drawImage(Asset.images['icon'],
                Asset.icon.white.sx, Asset.icon.white.sy,
                16, 16,
                tacticsCursor_x * 16 * SCREEN_MAGNIFICATION, tacticsCursor_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            ctx.globalAlpha = 1;
        }
}

function DrawingTacticsPlacementCursor() {

    if (tactics_PlacementRangeSet) {
        if (typeof tactics_PlacementMember[tactics_PlacementCount] !== 'undefined') {
            ctx.drawImage(Asset.images['icon'],
                Asset.icon[tactics_PlacementMember[tactics_PlacementCount]].sx,
                Asset.icon[tactics_PlacementMember[tactics_PlacementCount]].sy, 16, 16,
                tacticsCursor_x * 16 * SCREEN_MAGNIFICATION, tacticsCursor_y * 16 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        }
    }

}


function DrawingTacticsCommand() {

    if (!isEvent)
        if (tactics_Phase === 'none' || tactics_Phase === 'player_select') {

            let offset_x = 0;
            let offset_y = 80;

            if (Player[tactics_SelectedPlayer].pos_x < 5) {
                offset_x = 80;
            }

            for (let i = 0; i < Command.length; i++) {

                let iconname = 'cmd_idle';
                let textcolor = "rgb(32,32,32)";

                if (Command[i].phase === 'move' && Player[tactics_SelectedPlayer].end_mv) {
                    iconname = 'cmd_inactive';
                    textcolor = "rgb(204,204,204)";
                }
                if (Command[i].phase === 'attack' &&
                    (Player[tactics_SelectedPlayer].end_at || TacticsBuffDoubleChecker('stan', Player[tactics_SelectedPlayer].condition))) {
                    iconname = 'cmd_inactive';
                    textcolor = "rgb(204,204,204)";
                }

                ctx.drawImage(Asset.images['icon'],
                    Asset.icon[iconname].sx, Asset.icon[iconname].sy, 16, 16,
                    (Command[i].pos_x + offset_x) * SCREEN_MAGNIFICATION,
                    (Command[i].pos_y + offset_y) * SCREEN_MAGNIFICATION,
                    16 * 2 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
                ctx.fillStyle = textcolor;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillText(Command[i].name,
                    (16 + Command[i].pos_x + offset_x) * SCREEN_MAGNIFICATION,
                    8 * 4 + (Command[i].pos_y + offset_y) * SCREEN_MAGNIFICATION);
            }
        }
}

function DrawingTacticsCommandCounterSkill() {
    if (tactics_CmdButtonSet) {

        ctx.drawImage(Asset.images['icon'],
            Asset.icon['strline'].sx, Asset.icon['strline'].sy, 16, 16,
            2 * 16 * SCREEN_MAGNIFICATION,
            16 * SCREEN_MAGNIFICATION,
            6 * 16 * SCREEN_MAGNIFICATION, 2 * 16 * SCREEN_MAGNIFICATION);

        ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        ctx.fillStyle = "rgb(32,32,32)";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText("攻撃されています。",
            5 * 16 * SCREEN_MAGNIFICATION,
            (16 + 8) * SCREEN_MAGNIFICATION);

        ctx.fillText("カウンターしますか？",
            5 * 16 * SCREEN_MAGNIFICATION,
            32 * SCREEN_MAGNIFICATION);


        let w = 1;
        let offset_x = 0;

        for (let i = 0; i < Command.length; i++) {

            if (Command[i].phase === 'no') {
                w = 3;
                offset_x = 6 * 16 + (16 + 8);
            } else {  //skill
                w = 8;
                offset_x = 5 * 16;
            }

            ctx.drawImage(Asset.images['icon'],
                Asset.icon['cmd_idle'].sx, Asset.icon['cmd_idle'].sy, 16, 16,
                Command[i].pos_x * 16 * SCREEN_MAGNIFICATION,
                Command[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * w * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            ctx.fillText(Command[i].name,
                offset_x * SCREEN_MAGNIFICATION,
                (Command[i].pos_y * 16 + 8) * SCREEN_MAGNIFICATION);
        }
    }
}
//
function DrawingTacticsCommandSkillSelect() {
    if (tactics_Phase === "attack" && tactics_skillListSetup && !tactics_skillSelected) {

        ctx.drawImage(Asset.images['icon'],
            Asset.icon['strline'].sx, Asset.icon['strline'].sy, 16, 16,
            2 * 16 * SCREEN_MAGNIFICATION,
            16 * SCREEN_MAGNIFICATION,
            6 * 16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

        ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        ctx.fillStyle = "rgb(32,32,32)";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText("スキルを選択してください。",
            5 * 16 * SCREEN_MAGNIFICATION,
            (16 + 8) * SCREEN_MAGNIFICATION);

        let w = 1;
        let offset_x = 0;

        for (let i = 0; i < Command.length; i++) {

            if (Command[i].phase === 'none') {
                w = 3;
                offset_x = 6 * 16 + (16 + 8);
            } else {  //skill
                w = 8;
                offset_x = 5 * 16;
            }

            ctx.drawImage(Asset.images['icon'],
                Asset.icon['cmd_idle'].sx, Asset.icon['cmd_idle'].sy, 16, 16,
                Command[i].pos_x * 16 * SCREEN_MAGNIFICATION,
                Command[i].pos_y * 16 * SCREEN_MAGNIFICATION,
                16 * w * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            ctx.fillText(Command[i].name,
                offset_x * SCREEN_MAGNIFICATION,
                (Command[i].pos_y * 16 + 8) * SCREEN_MAGNIFICATION);
        }
    }
}

function DrawingPlacement() {

    if (tactics_PlacementRangeSet) {

        //PlacementRange
        for (let i = 0; i < tactics_MovableRange.length; i++) {
            for (let j = 0; j < tactics_MovableRange[i].length; j++) {
                if (tactics_MovableRange[i][j] == 1) {
                    ctx.globalAlpha = 0.6;
                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon.white.sx, Asset.icon.white.sy,
                        16, 16,
                        j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
                    ctx.globalAlpha = 1;
                }
            }
        }

        if (tactics_PlacementSelected) {

            let cmdy_x = 7;
            let cmdy_y = 5;
            let cmdn_x = 7;
            let cmdn_y = 7;

            if (stage_number >= 8) {  //batorowa ver
                cmdy_x = 2;
                cmdy_y = 4;
                cmdn_x = 6;
                cmdn_y = 4;
            }

            //cmd
            ctx.drawImage(Asset.images['icon'],
                Asset.icon['cmd_idle'].sx, Asset.icon['cmd_idle'].sy, 16, 16,
                cmdy_x * 16 * SCREEN_MAGNIFICATION,
                cmdy_y * 16 * SCREEN_MAGNIFICATION,
                16 * 2 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
            ctx.drawImage(Asset.images['icon'],
                Asset.icon['cmd_idle'].sx, Asset.icon['cmd_idle'].sy, 16, 16,
                cmdn_x * 16 * SCREEN_MAGNIFICATION,
                cmdn_y * 16 * SCREEN_MAGNIFICATION,
                16 * 2 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
            ctx.fillStyle = "rgb(32,32,32)";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";

            ctx.fillText("確定",
                (cmdy_x * 16 + 16) * SCREEN_MAGNIFICATION,
                (cmdy_y * 16 + 8) * SCREEN_MAGNIFICATION);
            ctx.fillText("取消",
                (cmdn_x * 16 + 16) * SCREEN_MAGNIFICATION,
                (cmdn_y * 16 + 8) * SCREEN_MAGNIFICATION);
        }

    }
}

function DrawingTacticsInfoView() {

    if (!isEvent)
        if (tactics_Phase === 'none' || (tactics_Phase ==='attack' && tactics_isARSet)) {

            let name = "";
            let icon_name = "empty";
            let isUnit = false;
            let nowhp = 0; let maxhp = 0;
            let ap = 0; let of = 0; let df = 0;
            let status = ["empty"];

            //player
            for (let i = 0; i < Player.length; i++) {
                if (Player[i].pos_x == tacticsCursor_x && Player[i].pos_y == tacticsCursor_y) {
                    name = Player[i].name;
                    icon_name = Player[i].icon;
                    nowhp = Player[i].nowhp;
                    maxhp = Player[i].maxhp;
                    ap = Player[i].ap;
                    of = Player[i].of;
                    df = Player[i].df;
                    status = Player[i].condition;
                    isUnit = true;
                    break;
                }
            }

            //enemy
            for (let i = 0; i < Enemy.length; i++) {
                if (Enemy[i].pos_x == tacticsCursor_x && Enemy[i].pos_y == tacticsCursor_y) {
                    name = Enemy[i].name;
                    icon_name = Enemy[i].icon;
                    nowhp = Enemy[i].nowhp;
                    maxhp = Enemy[i].maxhp;
                    ap = Enemy[i].ap;
                    of = Enemy[i].of;
                    df = Enemy[i].df;
                    status = Enemy[i].condition;
                    isUnit = true;
                    break;
                }
            }

            let offset_x = 0;

            if (tacticsCursor_x < 5) {
                offset_x = 80;
            }

            //frame
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "white";
            ctx.fillRect(offset_x * SCREEN_MAGNIFICATION, 0, 16 * 5 * SCREEN_MAGNIFICATION, 16 * 4 * SCREEN_MAGNIFICATION);
            ctx.globalAlpha = 1;

            //unit icon
            // ctx.fillStyle = "rgb(32,32,32)";
            // ctx.fillRect((8 + offset_x) * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION,
            //     16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            ctx.drawImage(Asset.images['icon'],
                Asset.icon[icon_name].sx, Asset.icon[icon_name].sy, 16, 16,
                (8 + offset_x) * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION,
                16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

            //unit name
            ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
            ctx.fillStyle = "rgb(32,32,32)";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";

            ctx.fillText(name,
                ((16 * 2) + offset_x) * SCREEN_MAGNIFICATION,
                8 * SCREEN_MAGNIFICATION);


            if (isUnit) {
                //health bar
                let rate = nowhp / maxhp;
                (rate <= 0) ? rate = 0 : rate *= 40;
                ctx.fillStyle = "rgb(32,32,32)";
                ctx.fillRect((32 + offset_x) * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION,
                    42 * SCREEN_MAGNIFICATION, 6 * SCREEN_MAGNIFICATION);
                ctx.fillStyle = "white";
                ctx.fillRect((33 + offset_x) * SCREEN_MAGNIFICATION, 17 * SCREEN_MAGNIFICATION,
                    rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);

                ctx.font = 4 * SCREEN_MAGNIFICATION + "px PixelMplus12";
                ctx.fillStyle = "rgb(128,128,128)";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                ctx.fillText(nowhp,
                    (48 + 8 + offset_x) * SCREEN_MAGNIFICATION, 19 * SCREEN_MAGNIFICATION);

                //ap,of,df etc
                ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
                ctx.fillStyle = "rgb(32,32,32)";
                ctx.textBaseline = "top";
                ctx.textAlign = "left";

                ctx.fillText("AP:" + ap + " OF:" + of + " DF:" + df,
                    (8 + offset_x) * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION);

                //status icon
                if (typeof status !== 'undefined')
                    for (let i = 0; i < status.length; i++) {
                        if (typeof status[i].name !== 'undefined') {
                            if (status[i].name !== 'normal') {

                                ctx.drawImage(Asset.images['icon_status'],
                                    Asset.icon_status[status[i].name].sx, Asset.icon_status[status[i].name].sy, 16, 16,
                                    ((8 + offset_x) + i * 8) * SCREEN_MAGNIFICATION, 3 * 16 * SCREEN_MAGNIFICATION,
                                    8 * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);
                            }
                        }
                    }
            } else {  //suppresson

                let p_unit = 0;
                for (let p = 0; p < Player.length; p++) {
                    if (Player[p].nowhp > 0)
                        p_unit++;
                }
                let e_unit = 0;
                for (let e = 0; e < Enemy.length; e++) {
                    if (Enemy[e].nowhp > 0)
                        e_unit++;
                }
                let totalunit = p_unit + e_unit;
                let rate = p_unit / totalunit;
                rate = rate * 10;
                rate = Math.round(rate);
                rate = rate / 10;
                tactics_suppressonPlayerPer = rate;
                let p_bar = Math.floor(64 * rate);
                let e_bar = 64 - p_bar;

                ctx.font = 4 * SCREEN_MAGNIFICATION + "px PixelMplus12";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText("* SUPPRESSION *", (8 + offset_x + 32) * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                //player
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon['sprbar_p'].sx, Asset.icon['sprbar_p'].sy, 16, 16,
                    (8 + offset_x) * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION,
                    p_bar * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);

                ctx.fillText(p_unit, (8 + offset_x + 4) * SCREEN_MAGNIFICATION, 12 * SCREEN_MAGNIFICATION);

                //enemy
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon['sprbar_e'].sx, Asset.icon['sprbar_e'].sy, 16, 16,
                    (8 + offset_x + p_bar) * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION,
                    e_bar * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);

                ctx.fillText(e_unit, (8 + offset_x + 64 - 4) * SCREEN_MAGNIFICATION, 12 * SCREEN_MAGNIFICATION);
            }
            //message
            ctx.font = 4 * SCREEN_MAGNIFICATION + "px PixelMplus12";
            ctx.textBaseline = "bottom";
            ctx.textAlign = "left";
            ctx.fillText("行動するユニットを選んでね♪", (3 + offset_x) * SCREEN_MAGNIFICATION, 4 * 16 * SCREEN_MAGNIFICATION);
        }

    if (tactics_Phase === 'player_select') {

        let offset_x = 0;

        if (Player[0].pos_x < 5) {
            offset_x = 80;
        }

        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "white";
        ctx.fillRect(offset_x * SCREEN_MAGNIFICATION, 0, 16 * 5 * SCREEN_MAGNIFICATION, 16 * 4 * SCREEN_MAGNIFICATION);
        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgb(32,32,32)";
        ctx.fillRect((8 + offset_x) * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION,
            16 * 2 * SCREEN_MAGNIFICATION, 16 * 2 * SCREEN_MAGNIFICATION);

        ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        ctx.fillStyle = "rgb(32,32,32)";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        ctx.fillText("場所",
            ((16 * 3) + offset_x) * SCREEN_MAGNIFICATION,
            8 * SCREEN_MAGNIFICATION);

    }

}

function DrawingTacticsMovableRange() {

    if ((tactics_Phase === 'move' && tactics_isMRset) || (tactics_Phase === 'attack' && tactics_isARSet)) {

        let range = Player[tactics_SelectedPlayer].mr;
        if (tactics_Phase === 'attack') {
            range = Player[tactics_SelectedPlayer].ar;

            if (stage_number >= 8) {
                range = tactics_skillSelectedAbility[0].ar;
            }
        }

        for (let i = 0; i < movable_range.length; i++) {
            for (let j = 0; j < movable_range[i].length; j++) {
                if (movable_range[i][j] == 1) {
                    ctx.globalAlpha = 0.6;

                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon.white.sx, Asset.icon.white.sy,
                        16, 16,
                        ((Player[tactics_SelectedPlayer].pos_x - range + j) * 16 * SCREEN_MAGNIFICATION),
                        ((Player[tactics_SelectedPlayer].pos_y - range + i) * 16 * SCREEN_MAGNIFICATION),
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                    ctx.globalAlpha = 1;
                }

            }

        }

        let index_x = Math.abs(tacticsCursor_x - Player[tactics_SelectedPlayer].pos_x);
        let index_y = Math.abs(tacticsCursor_y - Player[tactics_SelectedPlayer].pos_y);
        let mr_x = tacticsCursor_x - Player[tactics_SelectedPlayer].pos_x;
        let mr_y = tacticsCursor_y - Player[tactics_SelectedPlayer].pos_y;

        if (index_x <= range && index_y <= range) {

            if (movable_range[mr_y + range][mr_x + range] == 1) {
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon.chara_cursor.sx, Asset.icon.chara_cursor.sy,
                    16, 16,
                    tacticsCursor_x * 16 * SCREEN_MAGNIFICATION,
                    tacticsCursor_y * 16 * SCREEN_MAGNIFICATION,
                    16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
            }
        }

        // for (let i = 0; i < tactics_MovableRange.length; i++) {
        //     for (let j = 0; j < tactics_MovableRange[i].length; j++) {

        //         ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        //         ctx.fillStyle = "white";
        //         ctx.textBaseline = "middle";
        //         ctx.textAlign = "center";

        //         ctx.fillText(tactics_MovableRange[i][j],
        //             j * 16 * SCREEN_MAGNIFICATION + 8,
        //             i * 16 * SCREEN_MAGNIFICATION + 8);

        //     }

        // }
    }
}

function DrawingEnemyRangeShow() {

    if (tactics_enemyMRShow) {
        for (let i = 0; i < tactics_MovableRange.length; i++) {
            for (let j = 0; j < tactics_MovableRange[i].length; j++) {

                if (tactics_MovableRange[i][j] > 0) {
                    ctx.globalAlpha = 0.6;

                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon.white.sx, Asset.icon.white.sy,
                        16, 16,
                        j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    if (tactics_enemyARShow) {
        for (let i = 0; i < tactics_AttackRange.length; i++) {
            for (let j = 0; j < tactics_AttackRange[i].length; j++) {

                if (tactics_AttackRange[i][j] > 0) {
                    ctx.globalAlpha = 0.6;

                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon.white.sx, Asset.icon.white.sy,
                        16, 16,
                        j * 16 * SCREEN_MAGNIFICATION, i * 16 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                    ctx.globalAlpha = 1;
                }
            }
        }
    }
}

function DrawingTacticsBattleStatus() {

    if (!isEvent)
        if (tactics_Phase === 'attack_battle' ||
            (tactics_enemyPhase === 'attack' && tactics_battleViewEnabled &&
                typeof Enemy[tactics_enemyUnitCount] !== 'undefined')) {

            let offset_y = 5 * 16 * SCREEN_MAGNIFICATION;

            let enemyIndex = tactics_attackTarget;
            let skillName = "";
            let battlePicture = [,];
            let shake_e = 0;
            let shake_p = 0;

            if (tactics_Turn) {     //Player > Enemy
                if (tactics_skillSelectedAbility[0].type !== 'support') {
                    enemyIndex = tactics_attackTarget;
                } else {
                    enemyIndex = tactics_supportTarget;
                }

                GetSkillData();
                skillName = tactics_skillName;
                battlePicture = tactics_skillPicture;
                shake_e = tactics_shakeDistance;

                if (typeof Enemy[tactics_attackTarget].counter !== 'undefined')
                    GetCounterSkillData(Enemy[tactics_attackTarget].counter);

            } else {                //Enemy >Player
                enemyIndex = tactics_enemyUnitCount;
                skillName = Enemy[enemyIndex].skill;
                if (typeof 'battle_' + Enemy[enemyIndex].icon + '_a' !== 'undefined') {
                    battlePicture = ['battle_' + Enemy[enemyIndex].icon + '_a', 'battle_' + Enemy[enemyIndex].icon + '_b'];
                }
                else {
                    battlePicture = ['battle_anime', 'battle_anime'];
                }
                GetEnemySkillData();
                if (tactics_skillPicture[0] !== "") {
                    battlePicture = tactics_skillPicture;
                }
                shake_p = tactics_shakeDistance;

                GetCounterSkillData(tactics_CmdSelectedSkill);

            }


            if (!tactics_Turn && TacticsRangeAttackEnemyClassifier(Enemy[enemyIndex].icon) && tactics_battleProcess >= 8) {
                if (tactics_battleProcess >= 9) {

                    for (let i = 0; i < tactics_enemyRangeAttackList.length; i++) {

                        //hp bar
                        //back
                        ctx.fillStyle = "rgb(32,32,32)";
                        ctx.fillRect((tactics_enemyRangeAttackList[i].pos_x * 16) * SCREEN_MAGNIFICATION, (tactics_enemyRangeAttackList[i].pos_y * 16 + 12) * SCREEN_MAGNIFICATION,
                            16 * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);

                        //white
                        let rate = Player[tactics_enemyRangeAttackList[i].id].nowhp / Player[tactics_enemyRangeAttackList[i].id].maxhp;
                        (rate <= 0) ? rate = 0 : rate *= 16;
                        ctx.fillStyle = "white";
                        ctx.fillRect((tactics_enemyRangeAttackList[i].pos_x * 16) * SCREEN_MAGNIFICATION, (tactics_enemyRangeAttackList[i].pos_y * 16 + 12) * SCREEN_MAGNIFICATION,
                            rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                    }
                }
                return;
            }

            //battlestate
            ctx.drawImage(Asset.images['battle_status'], 0, 5 * 16 * SCREEN_MAGNIFICATION,
                Asset.images['battle_status'].width * SCREEN_MAGNIFICATION,
                Asset.images['battle_status'].height * SCREEN_MAGNIFICATION);

            //unit icon and hpbar 
            if (tactics_Turn) {   //player > enemy 

                //a
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon[Player[tactics_SelectedPlayer].icon].sx, Asset.icon[Player[tactics_SelectedPlayer].icon].sy, 16, 16,
                    8 * SCREEN_MAGNIFICATION + shake_p, offset_y + 8 * SCREEN_MAGNIFICATION,
                    16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                //b
                if (tactics_skillSelectedAbility[0].type !== 'support') {

                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon[Enemy[enemyIndex].icon].sx, Asset.icon[Enemy[enemyIndex].icon].sy, 16, 16,
                        (160 - 16 - 8) * SCREEN_MAGNIFICATION + shake_e, offset_y + 8 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                } else {
                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon[Player[enemyIndex].icon].sx, Asset.icon[Player[enemyIndex].icon].sy, 16, 16,
                        (160 - 16 - 8) * SCREEN_MAGNIFICATION + shake_e, offset_y + 8 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
                }

                //state bar
                let rate = Player[tactics_SelectedPlayer].nowhp / Player[tactics_SelectedPlayer].maxhp;
                (rate <= 0) ? rate = 0 : rate *= 48;
                ctx.fillStyle = "white";
                ctx.fillRect((16 + 8) * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                    rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);


                if (tactics_skillSelectedAbility[0].type !== 'support') {

                    rate = Enemy[enemyIndex].nowhp / Enemy[enemyIndex].maxhp;
                    (rate <= 0) ? rate = 0 : rate *= 48;
                    ctx.fillRect(88 * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                        rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                } else {
                    rate = Player[enemyIndex].nowhp / Player[enemyIndex].maxhp;
                    (rate <= 0) ? rate = 0 : rate *= 48;
                    ctx.fillRect(88 * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                        rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                }

            } else {
                //a
                if (Enemy[tactics_enemyUnitCount].mode !== 'accompany') {
                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon[Player[tactics_SelectedPlayer].icon].sx, Asset.icon[Player[tactics_SelectedPlayer].icon].sy, 16, 16,
                        8 * SCREEN_MAGNIFICATION + shake_p, offset_y + 8 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
                } else {
                    ctx.drawImage(Asset.images['icon'],
                        Asset.icon[Enemy[tactics_SelectedPlayer].icon].sx, Asset.icon[Enemy[tactics_SelectedPlayer].icon].sy, 16, 16,
                        8 * SCREEN_MAGNIFICATION + shake_p, offset_y + 8 * SCREEN_MAGNIFICATION,
                        16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
                }

                //b
                ctx.drawImage(Asset.images['icon'],
                    Asset.icon[Enemy[enemyIndex].icon].sx, Asset.icon[Enemy[enemyIndex].icon].sy, 16, 16,
                    (160 - 16 - 8) * SCREEN_MAGNIFICATION + shake_e, offset_y + 8 * SCREEN_MAGNIFICATION,
                    16 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);

                //state bar

                let rate;

                if (Enemy[tactics_enemyUnitCount].mode !== 'accompany') {

                    rate = Player[tactics_SelectedPlayer].nowhp / Player[tactics_SelectedPlayer].maxhp;
                    (rate <= 0) ? rate = 0 : rate *= 48;
                    ctx.fillStyle = "white";
                    ctx.fillRect((16 + 8) * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                        rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                } else {
                    rate = Enemy[tactics_SelectedPlayer].nowhp / Enemy[tactics_SelectedPlayer].maxhp;
                    (rate <= 0) ? rate = 0 : rate *= 48;
                    ctx.fillStyle = "white";
                    ctx.fillRect((16 + 8) * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                        rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
                }
                rate = Enemy[enemyIndex].nowhp / Enemy[enemyIndex].maxhp;
                (rate <= 0) ? rate = 0 : rate *= 48;
                ctx.fillRect(88 * SCREEN_MAGNIFICATION, (16 * 7 + 6) * SCREEN_MAGNIFICATION,
                    rate * SCREEN_MAGNIFICATION, 4 * SCREEN_MAGNIFICATION);
            }




            //skill name
            if (tactics_battleProcess >= 1) {

                ctx.drawImage(Asset.images['battle_skill'],
                    tactics_skillnamePosX, 8 * SCREEN_MAGNIFICATION,
                    Asset.images['battle_skill'].width * SCREEN_MAGNIFICATION,
                    Asset.images['battle_skill'].height * SCREEN_MAGNIFICATION);

                ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
                ctx.fillStyle = "rgb(32,32,32)";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";


                ctx.fillText(skillName,
                    tactics_skillnamePosX + Math.floor(Asset.images['battle_skill'].width * SCREEN_MAGNIFICATION / 2),
                    16 * SCREEN_MAGNIFICATION);

            }

            //counter skill back
            if (tactics_battleProcess >= 5 && tactics_CmdSelectedSkill !== 'no') { //player
                ctx.drawImage(Asset.images['battle_skill'],
                    (16 - (tactics_skillnameSize / 2)) * SCREEN_MAGNIFICATION, (8 - (tactics_skillnameSize / 2)) * SCREEN_MAGNIFICATION,
                    (Asset.images['battle_skill'].width + tactics_skillnameSize) * SCREEN_MAGNIFICATION,
                    (Asset.images['battle_skill'].height + tactics_skillnameSize) * SCREEN_MAGNIFICATION);
            }
            if (tactics_battleProcess >= 5 && tactics_bpm_enemycounter) { //enemy
                ctx.drawImage(Asset.images['battle_skill'],
                    (16 - (tactics_skillnameSize / 2)) * SCREEN_MAGNIFICATION, (8 - (tactics_skillnameSize / 2)) * SCREEN_MAGNIFICATION,
                    (Asset.images['battle_skill'].width + tactics_skillnameSize) * SCREEN_MAGNIFICATION,
                    (Asset.images['battle_skill'].height + tactics_skillnameSize) * SCREEN_MAGNIFICATION);
            }


            //battle picture
            if (tactics_battleProcess == 3) {
                ctx.drawImage(Asset.images[battlePicture[0]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[battlePicture[0]].width * SCREEN_MAGNIFICATION,
                    Asset.images[battlePicture[0]].height * SCREEN_MAGNIFICATION);
            }

            if (tactics_battleProcess >= 4) {
                ctx.drawImage(Asset.images[battlePicture[1]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[battlePicture[1]].width * SCREEN_MAGNIFICATION,
                    Asset.images[battlePicture[1]].height * SCREEN_MAGNIFICATION);
            }

            //counter battle picture
            //player
            if (tactics_battleProcess == 6 && tactics_CmdSelectedSkill !== 'no') {
                ctx.fillText(tactics_counterSkillName,
                    tactics_skillnamePosX + Math.floor(Asset.images['battle_skill'].width * SCREEN_MAGNIFICATION / 2),
                    16 * SCREEN_MAGNIFICATION);
                ctx.drawImage(Asset.images[tactics_counterSkillPicture[0]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[0]].width * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[0]].height * SCREEN_MAGNIFICATION);
            }
            if (tactics_battleProcess >= 7 && tactics_CmdSelectedSkill !== 'no') {
                ctx.drawImage(Asset.images[tactics_counterSkillPicture[1]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[1]].width * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[1]].height * SCREEN_MAGNIFICATION);
            }
            //enemy
            if (tactics_battleProcess == 6 && tactics_bpm_enemycounter) {
                ctx.fillText(tactics_counterSkillName,
                    tactics_skillnamePosX + Math.floor(Asset.images['battle_skill'].width * SCREEN_MAGNIFICATION / 2),
                    16 * SCREEN_MAGNIFICATION);
                ctx.drawImage(Asset.images[tactics_counterSkillPicture[0]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[0]].width * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[0]].height * SCREEN_MAGNIFICATION);
            }
            if (tactics_battleProcess >= 7 && tactics_bpm_enemycounter) {
                ctx.drawImage(Asset.images[tactics_counterSkillPicture[1]],
                    32 * SCREEN_MAGNIFICATION, 32 * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[1]].width * SCREEN_MAGNIFICATION,
                    Asset.images[tactics_counterSkillPicture[1]].height * SCREEN_MAGNIFICATION);
            }


        }
}

function DrawingTacticsTurnString() {
    if (tactics_turnString) {
        let name = 'turn_player';

        if (tactics_Turn)
            name = 'turn_enemy';

        ctx.drawImage(Asset.images[name], 0, 0,
            Asset.images[name].width * SCREEN_MAGNIFICATION,
            Asset.images[name].height * SCREEN_MAGNIFICATION);
    }
}

function DrawingStage() {

    if (stage_name == "") {
        stage_name == "black";
    }

    ctx.drawImage(Asset.images[stage_name], 0, 0,
        Asset.images[stage_name].width * SCREEN_MAGNIFICATION,
        Asset.images[stage_name].height * SCREEN_MAGNIFICATION);

}

function GetSkillData() {

    let skill = "";

    if (stage_number >= 8) {  //system change
        skill = tactics_skillSelectedAbility[0].skill;
    } else {
        skill = Player[tactics_SelectedPlayer].skill;
    }

    switch (skill) {
        case 'binta':
            tactics_skillName = 'あねごのビンタ';
            tactics_skillPicture = ['battle_akino_binta_a', 'battle_akino_binta_b'];
            break;

        case 'flame':
            tactics_skillName = 'フレイムスワロー';
            tactics_skillPicture = ['battle_akino_flame_a', 'battle_akino_flame_b'];
            break;

        case 'ground':
            tactics_skillName = 'アースプレッシング';
            tactics_skillPicture = ['battle_akino_ground_a', 'battle_akino_ground_b'];
            break;

        case 'blade':
            tactics_skillName = 'ソードスラッシュ';
            tactics_skillPicture = ['battle_sfsoldier_a', 'battle_sfsoldier_b'];
            break;

        case 'oneshotkill':
            tactics_skillName = 'ワンショットキル';
            tactics_skillPicture = ['battle_hawk_a', 'battle_hawk_b'];
            break;

        case 'dontmove':
            tactics_skillName = 'Don\'t move!';
            tactics_skillPicture = ['battle_hawk_dm_a', 'battle_hawk_dm_b'];
            break;

        case 'cosmicslash':
            tactics_skillName = 'コズミックスラッシュ';
            tactics_skillPicture = ['battle_gester_cs_a', 'battle_gester_cs_b'];
            break;

        case 'injection':
            tactics_skillName = 'ヒールインジェクション';
            tactics_skillPicture = ['battle_kazami_injection_a', 'battle_kazami_injection_b'];
            break;

        case '':
            break;

        default:
            tactics_skillName = 'あねごのビンタ';
            tactics_skillPicture = ['battle_akino_binta_a', 'battle_akino_binta_b'];
            break;
    }
}

function GetCounterSkillData(skillname) {
    switch (skillname) {
        case 'sunlight':
            tactics_counterSkillName = 'サンライトシールド';
            tactics_counterSkillPicture = ['battle_akino_sunlight_a', 'battle_akino_sunlight_b'];
            break;

        case 'transtech':
            tactics_counterSkillName = 'トランシングフェイク';
            tactics_counterSkillPicture = ['battle_shaorin_counter_a', 'battle_shaorin_counter_b'];
            break;
        default:
            tactics_counterSkillName = 'なんもなし';
            tactics_counterSkillPicture = ['battle_akino_sunlight_a', 'battle_akino_sunlight_b'];
            break;
    }
}

function GetEnemySkillData() {
    switch (Enemy[tactics_enemyUnitCount].icon) {
        case 'marc':
            tactics_skillPicture = ['battle_marc_es_a', 'battle_marc_es_b'];
            break;
        case 'spark':
            tactics_skillPicture = ['battle_spark_a', 'battle_spark_b'];
            break;
        case 'blacktornado':
            tactics_skillPicture = ['battle_blacktornado_a', 'battle_blacktornado_b'];
            break;
        case 'shaorin':
            tactics_skillPicture = ['battle_shaorin_attack_a', 'battle_shaorin_attack_b'];
            break;
        case 'kozue_bc':
            tactics_skillPicture = ['battle_kozue_a', 'battle_kozue_b'];
            break;
        default:
            tactics_skillPicture = ['', ''];
            break;
    }
}