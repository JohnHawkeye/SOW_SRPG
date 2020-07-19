
//keys
var pressedKeys = [];
pressedKeys[9] = false;
var pressedWait = [];
pressedWait[0] = 0;
pressedWait[4] = 0;

var lockKey_P = false;
var lockKey_Enter = false;

//mouse
var mouseX = 0;
var mouseY = 0;
var dragUX = 0;
var dragUY = 0;
var dragDX = 0;
var dragDY = 0;
var flagDrag = 0;

var mouseLeftClick = false;
var mouseLeftClick_isClicked = false;
var mouseRightClick = false;
var mouseRightClick_isClicked = false;

//
//key events
function KeyDoun(e) {

    if (e.keyCode == 13) {  //enter key
        pressedKeys[0] = true;
    }

    e.preventDefault();
}

function KeyUp(e) {

    if (e.keyCode == 13) {
        pressedKeys[0] = false;
    }

    if (e.keyCode == 80) {  //P key
        pressedKeys[4] = false;
    }

    if (e.keyCode == 9) {
        pressedKeys[9] = !pressedKeys[9];
    }


}

function PressedKeyWait() {

    if (lockKey_Enter) {
        if (pressedWait[0] >= 0.2) {
            pressedWait[0] = 0;
            lockKey_P = false;
        } else {
            pressedWait[0] += fixedDeltaTime;
        }
    }


    if (lockKey_P) {
        if (pressedWait[4] >= 0.4) {
            pressedWait[4] = 0;
            lockKey_P = false;
        }
        else {
            pressedWait[4] += fixedDeltaTime;
        }

    }

}

//
//mouse events
function onMouseDown(e) {
    if (e.button == 0) {
        mouseLeftClick = true;
    } else
        if (e.button == 2) {
            mouseRightClick = true;
        }
}

function onMouseUp(e) {

    if (e.button == 0) {
        mouseLeftClick = false;
        mouseLeftClick_isClicked = false;
    } else
        if (e.button == 2) {
            mouseRightClick = false;
            mouseRightClick_isClicked = false;
        }
}

function onMouseMove(e) {

    var rect = canvas.getBoundingClientRect();

    mouseX = Math.floor(e.clientX - rect.left);
    mouseY = Math.floor(e.clientY - rect.top);

}