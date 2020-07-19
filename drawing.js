
function Render() {
    ctx.imageSmoothingEnabled = false;

    let sw = canvas.width * SCREEN_MAGNIFICATION;
    let sh = canvas.height * SCREEN_MAGNIFICATION;
    ctx.clearRect(0, 0, sw, sh);

    ctx.drawImage(Asset.images['black'], 0, 0,
        Asset.images['black'].width * SCREEN_MAGNIFICATION,
        Asset.images['black'].height * SCREEN_MAGNIFICATION);

    switch (scene_mode) {
        case 0:
            DrawingTitle();
            break;

        case 1:

            if (novel_isSetData) {
                //scenery
                DrawingScenery();

                //stand
                DrawingStand();

                //picture
                DrawingPicture();

                //back_msgwindow and sentence
                if (Novel.length >= 1)
                    if (Novel[novel_number].command == "msgwindow" && !Novel[novel_number].layer) {
                        DrawingMsgWindow();
                    }
                if (msgWindow_isOpen && !msgWindow_layer) {
                    ctx.drawImage(Asset.images['msgwindow'], 0, (96 * SCREEN_MAGNIFICATION),
                        Asset.images['msgwindow'].width * SCREEN_MAGNIFICATION,
                        Asset.images['msgwindow'].height * SCREEN_MAGNIFICATION);
                }
                if (!msgWindow_layer)
                    DrawingSentence();

                //fade
                if (Novel.length >= 1)
                    if (Novel[novel_number].command == "fade") {
                        DrawingFade();
                    }


            }

            if (fade_isHidden) {
                ctx.drawImage(Asset.images[memory_fadehidden], 0, 0,
                    Asset.images[memory_fadehidden].width * SCREEN_MAGNIFICATION,
                    Asset.images[memory_fadehidden].height * SCREEN_MAGNIFICATION);
            }


            DrawingAnimation();

            //shake
            DrawingShakeScreen();

            //front_msgwindow and sentence
            if (Novel.length >= 1)
                if (Novel[novel_number].command == "msgwindow" && Novel[novel_number].layer) {
                    DrawingMsgWindow();
                }
            if (msgWindow_isOpen && msgWindow_layer) {
                ctx.drawImage(Asset.images['msgwindow'], 0, (96 * SCREEN_MAGNIFICATION),
                    Asset.images['msgwindow'].width * SCREEN_MAGNIFICATION,
                    Asset.images['msgwindow'].height * SCREEN_MAGNIFICATION);
            }

            if (msgWindow_layer)
                DrawingSentence();

            DrawingStoryNumber();

            break;

        case 2:

            //tactics
            DrawingStage();
            DrawingTacticsTerrain();
            DrawingTacticsUpperLayer();
            DrawingTacticsItems();

            DrawingPlacement();

           

            DrawingTacticsPlayer();
            DrawingTacticsEnemyUnit(); 
            DrawingTacticsBuilding();
            
            DrawingTacticsTargetShow();
            DrawingTacticsMovableRange();
            DrawingTacticsCursor();

            DrawingTacticsInfoView();
            DrawingTacticsCommand();

            DrawingTacticsPlacementCursor();

            DrawingTacticsBattleStatus();
            DrawingTacticsCommandCounterSkill();
            DrawingTacticsCommandSkillSelect();

            DrawingTacticsTurnString();

            if (novel_isSetData) {

                //stand
                DrawingStand();
                //picture
                DrawingPicture();

                //shake
                DrawingShakeScreen();

                //msgwindow
                if (Novel.length >= 1)
                    if (Novel[novel_number].command == "msgwindow") {
                        DrawingMsgWindow();
                    }
                if (msgWindow_isOpen) {
                    ctx.drawImage(Asset.images['msgwindow'], 0, (96 * SCREEN_MAGNIFICATION),
                        Asset.images['msgwindow'].width * SCREEN_MAGNIFICATION,
                        Asset.images['msgwindow'].height * SCREEN_MAGNIFICATION);
                }
                //sentence
                DrawingSentence();

                //fade
                if (Novel.length >= 1)
                    if (Novel[novel_number].command == "fade") {
                        DrawingFade();
                    }
            }

            if (fade_isHidden) {
                ctx.drawImage(Asset.images[memory_fadehidden], 0, 0,
                    Asset.images[memory_fadehidden].width * SCREEN_MAGNIFICATION,
                    Asset.images[memory_fadehidden].height * SCREEN_MAGNIFICATION);
            }

            DrawingAnimation();

            break;

        case 3:
            DrawingStageSelectMap();
            DrawingStageSelectBFPoint();
            DrawingStageSelectBSWindow();
            break;
    }
    DrawingPauseString();

}

function DrawingTitle() {

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(Asset.images['title'], 0, 0,
        Asset.images['title'].width * SCREEN_MAGNIFICATION,
        Asset.images['title'].height * SCREEN_MAGNIFICATION);

    let rate = 100 / 2000;
    rate *= render_TotalTime * 1000;
    ctx.globalAlpha = Math.floor(rate) / 100;

    ctx.drawImage(Asset.images['black'], 0, 0,
        Asset.images['black'].width * SCREEN_MAGNIFICATION,
        Asset.images['black'].height * SCREEN_MAGNIFICATION);

    ctx.globalAlpha = 1;

}

function DrawingStoryNumber() {

    console.log("brake_test");

    if (Novel[novel_number].command === "title") {
        ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
        ctx.fillStyle = "rgb(204,204,204)";
        ctx.textBeaseline = "middle";
        ctx.textAlign = "center";

        ctx.fillText(Novel[novel_number].num,
            (5 * 16) * SCREEN_MAGNIFICATION,
            (3 * 16 + 8) * SCREEN_MAGNIFICATION);

        ctx.fillText(Novel[novel_number].name,
            (5 * 16) * SCREEN_MAGNIFICATION,
            (4 * 16 + 8) * SCREEN_MAGNIFICATION);
    }
}

function DrawingFade() {

    let rate = 100 / (Novel[novel_number].value * 1000);
    rate *= render_TotalTime * 1000;

    if (Novel[novel_number].type == 1) {
        ctx.globalAlpha = 1 - Math.floor(rate) / 100;
    } else {
        ctx.globalAlpha = Math.floor(rate) / 100;
    }

    ctx.drawImage(Asset.images[Novel[novel_number].name], 0, 0,
        Asset.images[Novel[novel_number].name].width * SCREEN_MAGNIFICATION,
        Asset.images[Novel[novel_number].name].height * SCREEN_MAGNIFICATION);

    ctx.globalAlpha = 1;
}

function DrawingScenery() {

    if (memory_scenery != "")
        ctx.drawImage(Asset.images[memory_scenery], 0, 0,
            Asset.images[memory_scenery].width * SCREEN_MAGNIFICATION,
            Asset.images[memory_scenery].height * SCREEN_MAGNIFICATION);
}

function DrawingShakeScreen() {
    if (novel_shakeStart) {
        let image = ctx.getImageData(0, 0, SCREEN_WIDTH * SCREEN_MAGNIFICATION, SCREEN_HEIGHT * SCREEN_MAGNIFICATION);
        let x = 0; let y = 0;

        if (!novel_shakeVorH) {
            y = novel_shakePosition;
        } else {
            x = novel_shakePosition;
        }
        ctx.putImageData(image, x * SCREEN_MAGNIFICATION, y * SCREEN_MAGNIFICATION);
    }
}

function DrawingMsgWindow() {

    let per_height = (Asset.images['msgwindow'].height * SCREEN_MAGNIFICATION) * render_TotalTime;

    if (Novel[novel_number].value == 0) { //close
        msgWindow_isOpen = false;
        per_height = (Asset.images['msgwindow'].height * SCREEN_MAGNIFICATION) - per_height;

    }

    ctx.drawImage(Asset.images['msgwindow'], 0, (96 * SCREEN_MAGNIFICATION) +
        (48 * SCREEN_MAGNIFICATION - per_height) / 2,
        Asset.images['msgwindow'].width * SCREEN_MAGNIFICATION, per_height);

}

function DrawingSentence() {

    let margin_x = 8 * SCREEN_MAGNIFICATION;
    let margin_y = 16 * SCREEN_MAGNIFICATION;
    let start_x = 0;
    let start_y = 96 * SCREEN_MAGNIFICATION;

    ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
    ctx.fillStyle = "rgb(32,32,32)";
    ctx.textBeaseline = "top";
    ctx.textAlign = "left";

    for (let i = 0; i < sentence_displayCharacters.length; i++) {

        ctx.fillText(sentence_displayCharacters[i],
            margin_x + start_x * 8 * SCREEN_MAGNIFICATION,
            margin_y + start_y);
        if (start_x == 17) {
            start_x = 0;
            start_y += 16 * SCREEN_MAGNIFICATION;
        } else {
            start_x++;
        }

    }

    if (sentence_charaCounter >= sentence_lineValue.length && sentence_readLine) {
        ctx.fillText("▼",
            160 * SCREEN_MAGNIFICATION - 48,
            144 * SCREEN_MAGNIFICATION - 16);
    }
}

function DrawingStand() {

    let line = 0;
    let num = 0;

    for (let i = 0; i < memory_stand.length; i++) {

        line = 0;
        num = memory_stand[i].id;

        while (num >= 10) {
            num -= 10;
            line++;
        }

        ctx.drawImage(Asset.images[memory_stand[i].name],
            num * 80, line * 144,
            80, 144,
            memory_stand[i].pos_x * SCREEN_MAGNIFICATION, memory_stand[i].pos_y * SCREEN_MAGNIFICATION,
            80 * SCREEN_MAGNIFICATION,
            144 * SCREEN_MAGNIFICATION);
    }
}

function DrawingPicture() {
    for (let i = 0; i < memory_picture.length; i++) {

        ctx.drawImage(Asset.images[memory_picture[i].name],
            memory_picture[i].sx, memory_picture[i].sy,
            memory_picture[i].w, memory_picture[i].h,
            memory_picture[i].pos_x * SCREEN_MAGNIFICATION, memory_picture[i].pos_y * SCREEN_MAGNIFICATION,
            memory_picture[i].w * SCREEN_MAGNIFICATION, memory_picture[i].h * SCREEN_MAGNIFICATION);


    }
}

function DrawingUI() {

    let s_width = SCREEN_WIDTH / 2 - 256;
    let s_height = SCREEN_HEIGHT / 2 - 256;

    ctx.beginPath();
    ctx.rect(s_width, s_height, 512, 512);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();

}

function DrawingPauseString() {

    if (isPause) {

        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = "bold 30px 'Roland'";
        ctx.textBeaseline = "middle";
        ctx.textAlign = "center";

        let str = "- PAUSE -";

        ctx.lineWidth = 2;
        ctx.fillText(str, CENTER_X, CENTER_Y);
        ctx.strokeText(str, CENTER_X, CENTER_Y);
    }
}
