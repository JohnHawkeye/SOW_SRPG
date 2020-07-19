//time managements
//
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000.0 / fps);
        };
})();

var now = window.performance && (
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow);

var getTime = function () {
    return (now && now.call(performance)) || (new Date().getTime());
}

var startTime = getTime();
var oldTime = 0;
var time_progress = 0;
var fps = 60.0;
var fixedDeltaTime = 0.0;
var fpscount = 0;
var fpsobsecond = 0;

// end time_managements

//screen managements
//
var SCREEN_WIDTH = 160;
var SCREEN_HEIGHT = 144;
var SCREEN_MAGNIFICATION = 4;
var CENTER_X = SCREEN_WIDTH / 2;
var CENTER_Y = SCREEN_HEIGHT / 2;
var stage_width = 800;
var stage_height = 800;

window.addEventListener('load', init);

var canvas;
var ctx;

var isPause = false;

//init
//
function init() {
    canvas = document.getElementById('maincanvas');
    ctx = canvas.getContext('2d');
    canvas.width = SCREEN_WIDTH * SCREEN_MAGNIFICATION;
    canvas.height = SCREEN_HEIGHT * SCREEN_MAGNIFICATION;

    document.oncontextmenu = function () {
        console.log("みぎくり");
        return false;  
    }

    //mouse event listener
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    //key event listener
    document.addEventListener('keydown', KeyDoun);
    document.addEventListener('keyup', KeyUp);

    //StartingSetting

    Asset.loadAssets(function () {
        requestAnimationFrame(update);
    });
}


//update
//
function update() {

    var lastTime = getTime();
    fixedDeltaTime = (lastTime - oldTime) / 1000;
    time_progress = Math.floor(lastTime - startTime);
    var nowSec = Math.floor(time_progress / 1000.0);

    if (fpscount >= 1) {
        fpsobsecond = fpscount;
        fpscount = 0;
    } else {
        fpscount += (lastTime - oldTime);
    }

    SceneManager();

    Render();

    //debug logs
    ctx.font = "bold 12px 'ＭＳ ゴシック'";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    if (!pressedKeys[9]) {

        ctx.fillText("Progress: " + time_progress + "Sec: " + nowSec, 10, 10);
        ctx.fillText("FPS:" + fpsobsecond, 10, 42);
        ctx.fillText("FixedDT: " + fixedDeltaTime, 10, 54);

        ctx.fillText("mouse_x: " + mouseX, 10, 118);
        ctx.fillText("mouse_y: " + mouseY, 10, 130);

        if (Novel.length >= 1) {
            ctx.fillText("CMD: " + Novel[novel_number].command, 10, 152);
        } else {
            ctx.fillText("CMD: -----", 10, 152);
        }

        ctx.fillText("renderT: " + render_TotalTime, 10, 164);
        ctx.fillText("mode: " + scene_mode, 10, 176);
        ctx.fillText("novelnumber: " + novel_number, 10, 188);
        ctx.fillText("novellength: " + Novel.length, 10, 200);
        ctx.fillText("Phase: " + tactics_Phase, 10, 224);
        ctx.fillText("EnemyPhase: " + tactics_enemyPhase, 10, 236);
        ctx.fillText("ShakeScreen: " + novel_shakeStart, 10, 248);

        ctx.fillText("[TAB:Hide DebugState] ", 10, 260);

    } else {
        ctx.fillText("[TAB:Show DebugState] ", 10, 10);
    }

    //end debuglogs

    //pause
    if (pressedKeys[4] && !lockKey_P) {
        lockKey_P = true;
        isPause = !isPause;
    }

    if (pressedKeys[0] && !lockKey_Enter) {
        lockKey_Enter = true;
    }

    PressedKeyWait();
    //end pause

    oldTime = lastTime;
    requestAnimationFrame(update);

}

