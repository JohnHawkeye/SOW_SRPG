
function DrawingStageSelectMap() {
    ctx.drawImage(Asset.images['picture_worldmap'], 0, 0,
        Asset.images['picture_worldmap'].width * SCREEN_MAGNIFICATION,
        Asset.images['picture_worldmap'].height * SCREEN_MAGNIFICATION);

    ctx.font = 4 * SCREEN_MAGNIFICATION + "px PixelMplus12";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("反応のあるポイントをクリックして出撃しましょう。", 80 * SCREEN_MAGNIFICATION, 140 * SCREEN_MAGNIFICATION);
}

function DrawingStageSelectBFPoint() {
    for (let i = 0; i < stageSelect_battlefieldpoint.length; i++) {
        if (stageSelect_battlefieldpoint[i].light) {

            ctx.globalAlpha = stageSelect_flashingRate;
            ctx.drawImage(Asset.images['picture_mappoint'],
                0, 0, 8, 8,
                stageSelect_battlefieldpoint[i].pos_x * 8 * SCREEN_MAGNIFICATION,
                stageSelect_battlefieldpoint[i].pos_y * 8 * SCREEN_MAGNIFICATION,
                8 * SCREEN_MAGNIFICATION, 8 * SCREEN_MAGNIFICATION);
            ctx.globalAlpha = 1;
        }

    }
}

function DrawingStageSelectBSWindow() {

    let screen_width = CENTER_X * SCREEN_MAGNIFICATION;
    let screen_height = CENTER_Y * SCREEN_MAGNIFICATION;

    if (stageSelect_process >= 6) {
        let rate = stageSelect_waitTotalTime / 0.4;
        let per_width = (Asset.images['picture_bf_info'].width * SCREEN_MAGNIFICATION) * rate;
        let per_height = (Asset.images['picture_bf_info'].height * SCREEN_MAGNIFICATION) * rate;


        if (stageSelect_process == 6) {
            per_height = 4 * SCREEN_MAGNIFICATION;
        }

        if (stageSelect_process == 7) {
            per_width = Asset.images['picture_bf_info'].width * SCREEN_MAGNIFICATION;
        }

        if (stageSelect_process == 9) {
            per_width = Asset.images['picture_bf_info'].width * SCREEN_MAGNIFICATION;
            per_height = (Asset.images['picture_bf_info'].height * SCREEN_MAGNIFICATION) * stageSelect_waitTotalTime;
            per_height = (Asset.images['picture_bf_info'].height * SCREEN_MAGNIFICATION) - per_height;
        }

        //close
        //

        ctx.drawImage(Asset.images['picture_bf_info'],
            screen_width - per_width / 2, screen_height - per_height / 2,
            per_width, per_height);

    }

    if (stageSelect_process == 8) {
        ctx.drawImage(Asset.images['picture_bf_info'], 0, 0,
            Asset.images['picture_bf_info'].width * SCREEN_MAGNIFICATION, Asset.images['picture_bf_info'].height * SCREEN_MAGNIFICATION);

        ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        ctx.fillStyle = "rgb(64,64,64)";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText(stageSelect_battlefieldpoint[stageSelect_selectID].name,
            5 * 16 * SCREEN_MAGNIFICATION,
            (2 * 16 + 8) * SCREEN_MAGNIFICATION);

        for (let i = 0; i < stageSelect_battlefieldpoint.length; i++) {
            
        }

        ctx.fillText("このバトルフィールドに出撃しますか？",
            5 * 16 * SCREEN_MAGNIFICATION,
            5 * 16 * SCREEN_MAGNIFICATION);
        ctx.fillText("出撃",
            (3 * 16 + 8) * SCREEN_MAGNIFICATION,
            (6 * 16 + 8) * SCREEN_MAGNIFICATION);
        ctx.fillText("取消",
            (6 * 16 + 8) * SCREEN_MAGNIFICATION,
            (6 * 16 + 8) * SCREEN_MAGNIFICATION);
    }

    if (stageSelect_process >= 10) {

        ctx.fillStyle = "rgb(128,128,128)";
        ctx.fillRect(0, screen_height - stageSelect_transitionMain * SCREEN_MAGNIFICATION / 2,
            160 * SCREEN_MAGNIFICATION, stageSelect_transitionMain * SCREEN_MAGNIFICATION);
    }

    if (stageSelect_process >= 11) {
        ctx.drawImage(Asset.images['battle_skill'],
            0, 0, 16, 16,
            stageSelect_transitionLineA * SCREEN_MAGNIFICATION,
            0,
            160 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
        ctx.drawImage(Asset.images['battle_skill'],
            0, 0, 16, 16,
            stageSelect_transitionLineA * SCREEN_MAGNIFICATION,
            (144 - 16) * SCREEN_MAGNIFICATION,
            160 * SCREEN_MAGNIFICATION, 16 * SCREEN_MAGNIFICATION);
    }

    if (stageSelect_process >= 12) {
        //lines
        for (let i = 0; i < stageSelect_transitionLineB.length; i++) {
            ctx.fillStyle = stageSelect_transitionLineB[i].color;
            ctx.fillRect(stageSelect_transitionLineB[i].pos_x * SCREEN_MAGNIFICATION,
                stageSelect_transitionLineB[i].pos_y * SCREEN_MAGNIFICATION,
                stageSelect_transitionLineB[i].value * SCREEN_MAGNIFICATION,
                stageSelect_transitionLineB[i].size * SCREEN_MAGNIFICATION);

        }

        //squares
        for (let i = 0; i < stageSelect_transitionSquare.length; i++) {

            if (stageSelect_transitionSquare[i].visible) {

                let offset = stageSelect_transitionSquare[i].value / 2;
                ctx.fillStyle = stageSelect_transitionSquare[i].color;
                ctx.fillRect((stageSelect_transitionSquare[i].pos_x - offset) * SCREEN_MAGNIFICATION,
                    (stageSelect_transitionSquare[i].pos_y - offset) * SCREEN_MAGNIFICATION,
                    stageSelect_transitionSquare[i].value * SCREEN_MAGNIFICATION,
                    stageSelect_transitionSquare[i].value * SCREEN_MAGNIFICATION);
            }

        }
    }

}