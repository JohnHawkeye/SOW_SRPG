
var tactics_enemyPhase = 'none';
var tactics_enemySubPhase = 0;
var tactics_enemyUnitCount = 0;
var tactics_enemyUnitMemory = 0;
var tactics_enemyThinking = true;
var tactics_enemyThinkingTime = 0;
var tactics_enemyMRSet = false;
var tactics_enemyARSet = false;
var tactics_enemyMRShow = false;
var tactics_enemyARShow = false;
var tactics_enemyTUShow = false;
var tactics_targetPoint = [0, 0];
var tactics_enemyRangeAttackList = [];

function TacticsEnemyPhaseManager() {
    switch (tactics_enemyPhase) {
        case 'none':
            break;

        case 'upkeep':
            TacticsEnemyUpkeep();
            tactics_enemyPhase = 'targeting';
            break;

        case 'targeting':
            if (tactics_enemyUnitCount < Enemy.length) {
                TacticsTargetSetting();
                tactics_enemyUnitCount++;
            } else {
                tactics_enemyUnitCount = 0;
                tactics_enemyPhase = 'move';
            }

            break;
        case 'move':
            if (tactics_enemyUnitCount < Enemy.length) {

                if (Enemy[tactics_enemyUnitCount].nowhp > 0 && !TacticsEnemyConditionCheck()) {

                    switch (tactics_enemySubPhase) {
                        case 0:
                            TacticsEnemyMRSetting();
                            tactics_enemyMRShow = true;
                            tactics_targetPoint = [Enemy[tactics_enemyUnitCount].pos_x, Enemy[tactics_enemyUnitCount].pos_y];
                            tactics_enemyTUShow = true;
                            tactics_enemySubPhase++;
                            break;

                        case 1:
                            if (tactics_enemyThinkingTime >= 0.6) {
                                tactics_enemyThinkingTime = 0;
                                tactics_enemySubPhase++;
                            } else {
                                tactics_enemyThinkingTime += fixedDeltaTime;
                            }
                            break;

                        case 2:
                            switch (Enemy[tactics_enemyUnitCount].mode) {
                                case 'militant':
                                    TacticsEnemyMoving();
                                    break;
                                case 'escape':
                                    TacticsEnemyEscape();
                                    break;
                                case 'rotation':
                                    TacticsMovingAI_Rotation();
                                    break;
                                case 'straight':
                                    TacticsMovingAI_Straight();
                                    break;
                                case 'diagonal':
                                    TacticsMovingAI_Diagonal();
                                    break;
                                case 'random':
                                    TacticsMovingAI_Random();
                                    break;
                                case 'unique':
                                    TacticsEnemyMoveUnique();
                                    break;
                                case 'accompany':
                                    TacticsEnemyAccompanyMoving();
                                    break;
                                default:
                                    break;
                            }

                            //bpbuff
                            let condition = Array.from(Enemy[tactics_enemyUnitCount].condition);
                            if (Enemy[tactics_enemyUnitCount].pos_y >= 0 && Enemy[tactics_enemyUnitCount].pos_y <= 2) {
                                if (!TacticsBuffDoubleChecker('bpbuff', condition)) {
                                    condition.push({ name: 'bpbuff', turn: 0 });
                                    Enemy[tactics_enemyUnitCount].condition = condition;
                                }
                            } else {
                                TacticsBuffReleaser('bpbuff', condition);
                                Enemy[tactics_enemyUnitCount].condition = condition;
                            }


                            tactics_enemySubPhase++;
                            break;

                        case 3:

                            if (tactics_enemyThinkingTime >= 0.6) {
                                tactics_enemyThinkingTime = 0;
                                tactics_enemySubPhase = 0;
                                tactics_enemyMRShow = false;
                                tactics_enemyUnitCount++;
                            } else {
                                tactics_enemyThinkingTime += fixedDeltaTime;
                            }
                            break;
                    }

                } else {
                    tactics_enemyUnitCount++;
                }

            } else {
                tactics_enemyUnitCount = 0;
                tactics_enemyPhase = 'attack';
            }

            break;

        case 'attack':
            if (tactics_enemyUnitCount < Enemy.length) {

                if (Enemy[tactics_enemyUnitCount].nowhp > 0 &&
                    Enemy[tactics_enemyUnitCount].of > 0 &&
                    Enemy[tactics_enemyUnitCount].ap >= 1) {

                    switch (tactics_enemySubPhase) {
                        case 0:
                            TacticsAttackRangeSetting_new();
                            tactics_targetPoint = [Enemy[tactics_enemyUnitCount].pos_x, Enemy[tactics_enemyUnitCount].pos_y];
                            tactics_enemyARShow = true;
                            tactics_enemySubPhase++;
                            break;

                        case 1:
                            if (tactics_enemyThinkingTime >= 0.6) {
                                tactics_enemyThinkingTime = 0;
                                tactics_enemyARhow = false;
                                tactics_enemySubPhase++;
                            } else {
                                tactics_enemyThinkingTime += fixedDeltaTime;
                            }
                            break;
                        case 2:

                            if (Enemy[tactics_enemyUnitCount].mode !== 'accompany') {

                                TacticsEnemyBuilding();

                                if (!TacticsRangeAttackEnemyClassifier(Enemy[tactics_enemyUnitCount].icon)) {

                                    //normal attack
                                    if (TacticsAttackSearch()) {
                                        tactics_targetPoint = [Player[tactics_SelectedPlayer].pos_x, Player[tactics_SelectedPlayer].pos_y];
                                        tactics_enemySubPhase++;
                                    } else {
                                        tactics_enemyARSet = false;
                                        tactics_enemySubPhase = 0;
                                        tactics_enemyUnitCount++;
                                    }

                                } else {
                                    //range attack
                                    TacticsRangeAttackSearch();
                                    if (tactics_enemyRangeAttackList.length >= 1) {
                                        tactics_targetPoint = [tactics_enemyRangeAttackList[0].pos_x, tactics_enemyRangeAttackList[0].pos_y];
                                        tactics_enemySubPhase++;
                                    } else {
                                        tactics_enemyARSet = false;
                                        tactics_enemySubPhase = 0;
                                        tactics_enemyUnitCount++;
                                    }
                                }


                            } else {
                                if (TacticsEnemySupportSearch()) {
                                    tactics_targetPoint = [Enemy[tactics_SelectedPlayer].pos_x, Enemy[tactics_SelectedPlayer].pos_y];
                                    tactics_enemySubPhase++;
                                } else {
                                    tactics_enemyARSet = false;
                                    tactics_enemySubPhase = 0;
                                    tactics_enemyUnitCount++;
                                }
                            }
                            break;

                        case 3:
                            if (tactics_enemyThinkingTime >= 1.2) {
                                tactics_battleViewEnabled = true;
                                tactics_enemyThinkingTime = 0;
                                tactics_enemySubPhase++;

                                if (Player[tactics_SelectedPlayer].icon !== "akino") {
                                    tactics_enemySubPhase++;
                                }

                            } else {
                                tactics_enemyThinkingTime += fixedDeltaTime;
                            }

                            break;

                        case 4://counter skill
                            if (!tactics_CmdButtonSet) {
                                TacticsCommandCounterSkillSetting();
                                tactics_CmdButtonSet = true;
                            }

                            if (TacticsCommandCounterSkillClick()) {
                                tactics_CmdButtonSet = false;
                                tactics_enemySubPhase++;
                            }

                            break;

                        case 5:
                            if (tactics_battleViewEnabled) {
                                TacticsBattleProcessManager();
                            }
                            break;
                    }
                } else {
                    Enemy[tactics_enemyUnitCount].end = true;
                    tactics_enemyUnitCount++;
                }

            } else {

                if (tactics_enemyThinkingTime >= 1) {
                    tactics_enemyThinkingTime = 0;
                    for (let i = 0; i < Enemy.length; i++) {
                        Enemy[i].end = false;
                    }
                    tactics_enemyTUShow = false;
                    tactics_enemyMRShow = false;
                    tactics_enemyARShow = false;
                    tactics_enemyUnitCount = 0;

                    tactics_enemyPhase = 'end';
                } else {
                    tactics_enemyThinkingTime += fixedDeltaTime;

                }
            }
            break;

        case 'end':
            if (tactics_waitTotalTime >= 3) {
                tactics_waitTotalTime = 0;
                tactics_turnString = false;
                tactics_Turn = true;
                tactics_enemyPhase = 'playerturn';
                tactics_Phase = 'none';
                tactics_TurnNum++;

                TacticsEnemyCondition();
                TacticsPlayerAPInit();
                TacticsTurnElapsedEvent();
                TacticsUnitApAdder();
            } else {
                tactics_turnString = true;
                tactics_waitTotalTime += fixedDeltaTime;
            }
            break;
        case 'playerturn':
            break;
    }
}

function TacticsTargetSetting() {

    let topPriority = false;

    //Unique Unit priority
    switch (Enemy[tactics_enemyUnitCount].icon) {
        case 'tworm':
            if (!TacticsPlayerUnitNowHpChecker('sfsoldier')) {
                Enemy[tactics_enemyUnitCount].target = TacticsGetPlayerUnitID('sfsoldier');
                topPriority = true;
            }
            break;

        case 'cannon':
            if (!TacticsPlayerUnitNowHpChecker('sfsoldier')) {
                Enemy[tactics_enemyUnitCount].target = TacticsGetPlayerUnitID('sfsoldier');
                topPriority = true;
            }
            break;

        case 'mark':
            if (!TacticsPlayerUnitNowHpChecker('akino')) {
                Enemy[tactics_enemyUnitCount].target = TacticsGetPlayerUnitID('akino');
                topPriority = true;
            }
            break;
        case 'ward':
            if (!TacticsPlayerUnitNowHpChecker('hawk')) {
                Enemy[tactics_enemyUnitCount].target = TacticsGetPlayerUnitID('hawk');
                topPriority = true;
            }
            break;
        case 'iris':    //accompany move
            Enemy[tactics_enemyUnitCount].target = TacticsEnemyUnitClosestChecker();
            topPriority = true;
            break;

        case 'jeda':
            Enemy[tactics_enemyUnitCount].target = TacticsPlayerUnitFarthestChecker();
            topPriority = true;
            break;

        default:
            Enemy[tactics_enemyUnitCount].target = TacticsPlayerUnitClosestChecker();
            //Enemy[tactics_enemyUnitCount].target = Math.floor(Math.random() * Enemy.length);
            break;
    }

    if (!topPriority)
        if (TacticsEnemyUnitTypeCheker('human')) {
            Enemy[tactics_enemyUnitCount].target = TacticsPlayerUnitMinHpChecker();
        }

    //if random selected ,Aim for the unit with the lowest hp

}

function TacticsGetPlayerUnitID(name) {

    let id = 0;

    for (let i = 0; i < Player.length; i++) {
        if (name === Player[i].icon) {
            id = i;
            break;
        }

    }
    return id;
}

function TacticsPlayerUnitNowHpChecker(name) {

    for (let i = 0; i < Player.length; i++) {
        if (name === Player[i].icon) {
            if (Player[i].nowhp <= 0) {
                return true;
            }
        }
    }
    return false;

}

function TacticsEnemyUnitTypeCheker(type) {

    if (typeof Enemy[tactics_enemyUnitCount].condition !== 'undefined') {
        for (let i = 0; i < Enemy[tactics_enemyUnitCount].condition.length; i++) {
            if (Enemy[tactics_enemyUnitCount].condition[i].name === type) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }

}

function TacticsPlayerUnitMinHpChecker() {

    let id = 0;

    let hp_rank = Player[0].nowhp;
    for (let i = 1; i < Player.length; i++) {

        if (Player[i].nowhp <= hp_rank) {
            hp_rank = Player[i].nowhp;
            id = i;
        }
    }

    return id;
}

function TacticsEnemyUnitMinHpChecker() {

    let id = 0;

    let hp_rank = Enemy[0].nowhp;
    for (let i = 1; i < Enemy.length; i++) {

        if (tactics_enemyUnitCount != i)
            if (Enemy[i].nowhp <= hp_rank) {
                hp_rank = Enemy[i].nowhp;
                id = i;
            }
    }

    return id;
}

function TacticsPlayerUnitClosestChecker() {

    let abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Player[0].pos_x));
    (abs_dx == 0) ? abs_dx = 1 : abs_dx;
    let abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Player[0].pos_y));
    (abs_dy == 0) ? abs_dy = 1 : abs_dy;

    let d_vector = abs_dx * abs_dy;
    let target = 0; //player id

    //Target the closest enemy
    for (let i = 0; i < Player.length; i++) {
        abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Player[i].pos_x));
        (abs_dx == 0) ? abs_dx = 1 : abs_dx;
        abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Player[i].pos_y));
        (abs_dy == 0) ? abs_dy = 1 : abs_dy;

        if (d_vector > abs_dx * abs_dy) {
            d_vector = abs_dx * abs_dy;
            target = i;
        }
    }

    return target;
}

function TacticsPlayerUnitFarthestChecker() {

    let abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Player[0].pos_x));
    (abs_dx == 0) ? abs_dx = 1 : abs_dx;
    let abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Player[0].pos_y));
    (abs_dy == 0) ? abs_dy = 1 : abs_dy;

    let d_vector = abs_dx * abs_dy;
    let target = 0; //player id

    //Target the closest enemy
    for (let i = 0; i < Player.length; i++) {
        abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Player[i].pos_x));
        (abs_dx == 0) ? abs_dx = 1 : abs_dx;
        abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Player[i].pos_y));
        (abs_dy == 0) ? abs_dy = 1 : abs_dy;

        if (d_vector < abs_dx * abs_dy) {
            d_vector = abs_dx * abs_dy;
            target = i;
        }
    }

    return target;
}


function TacticsEnemyUnitClosestChecker() {

    let abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Enemy[0].pos_x));
    let abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Enemy[0].pos_y));
    let d_vector = abs_dx * abs_dy;
    let target = 0; //player id

    for (let i = 0; i < Enemy.length; i++) {

        if (tactics_enemyUnitCount != i) {
            abs_dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Enemy[i].pos_x));
            abs_dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Enemy[i].pos_y));
            if (d_vector < abs_dx * abs_dy) {
                d_vector = abs_dx * abs_dy;
                target = i;
            }
        }
    }

    return target;
}

function TacticsSearchPlayerUnit(range) {

    let pos_x = Enemy[tactics_enemyUnitCount].pos_x;
    let pos_y = Enemy[tactics_enemyUnitCount].pos_y;

    for (let i = -range; i < range + 1; i++) {
        for (let j = -range; j < range + 1; j++) {
            if ((j + pos_x >= 0 && j + pos_x <= 9) && (i + pos_y >= 0 && i + pos_y <= 8)) {
                for (let p = 0; p < Player.length; p++) {
                    if (Player[p].pos_x == j + pos_x && Player[p].pos_y == i + pos_y) {
                        tactics_buildEnemyTarget = p;
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function TacticsEnemyMoving() {

    let target = 0; //player id

    if (typeof Enemy[tactics_enemyUnitCount].target !== 'undefined') {
        target = Enemy[tactics_enemyUnitCount].target;
    }

    let dd_x = 0;
    let dd_y = 0;
    let mc = Enemy[tactics_enemyUnitCount].mr;

    for (let move = 0; move < mc; move++) {

        let moved = false;
        dd_x = Math.abs(Enemy[tactics_enemyUnitCount].pos_x - Player[target].pos_x);
        dd_y = Math.abs(Enemy[tactics_enemyUnitCount].pos_y - Player[target].pos_y);

        if (dd_x > dd_y) {
            if (Player[target].pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }

            } else {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
            }
        } else
            if (dd_x < dd_y) {
                if (Player[target].pos_y < Enemy[tactics_enemyUnitCount].pos_y) {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                        Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_y--;
                        moved = true;
                    }
                } else {

                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                        Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                        Enemy[tactics_enemyUnitCount].pos_y++;
                        moved = true;
                    }
                }
            }

        if (!moved) {
            if (Player[target].pos_x != Enemy[tactics_enemyUnitCount].pos_x)
                if (Player[target].pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0) &&
                        Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_x--;
                        moved = true;
                    }
                } else {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                        Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                        Enemy[tactics_enemyUnitCount].pos_x++;
                        moved = true;
                    }
                }
            if (!moved)
                if (Player[target].pos_y != Enemy[tactics_enemyUnitCount].pos_y)
                    if (Player[target].pos_y < Enemy[tactics_enemyUnitCount].pos_y) {
                        if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                            Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                            Enemy[tactics_enemyUnitCount].pos_y--;
                            moved = true;
                        }
                    } else {
                        if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                            Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                            Enemy[tactics_enemyUnitCount].pos_y++;
                            moved = true;
                        }
                    }
        }
    }
}

function TacticsEnemyMoveUnique() {

    switch (Enemy[tactics_enemyUnitCount].icon) {
        case 'marc':
            let alive = 0;
            for (let i = 0; i < Enemy.length; i++) {
                if (Enemy[i].icon === 'blacktornado' && Enemy[i].nowhp > 0) {
                    alive++;
                }
            }
            if (alive == 0) {
                TacticsEnemyMoving();
            }
            break;

        case 'ward':
            if (TacticsSearchPlayerUnit(3)) {
                TacticsEnemyEscape();
            } else {
                TacticsEnemyMoving();
            }
            break;

        case 'jeda':
            let t_id = Enemy[tactics_enemyUnitCount].target;
            let dx = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_x) - Math.abs(Player[t_id].pos_x));
            let dy = Math.abs(Math.abs(Enemy[tactics_enemyUnitCount].pos_y) - Math.abs(Player[t_id].pos_y));

            if (Enemy[tactics_enemyUnitCount].pos_x == Player[t_id].pos_x) {

                for (let i = 0; i < dy - 1; i++) {
                    if (Enemy[tactics_enemyUnitCount].pos_y < Player[t_id].pos_y) {
                        if (TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1)) {
                            break;
                        } else {
                            Enemy[tactics_enemyUnitCount].pos_y++;
                        }
                    } else {
                        if (TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1)) {
                            break;
                        } else {
                            Enemy[tactics_enemyUnitCount].pos_y--;
                        }
                    }
                }
            } else
                if (Enemy[tactics_enemyUnitCount].pos_y == Player[t_id].pos_y) {

                    for (let i = 0; i < dx - 1; i++) {
                        if (Enemy[tactics_enemyUnitCount].pos_x < Player[t_id].pos_x) {
                            if (TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0)) {
                                break;
                            } else {
                                Enemy[tactics_enemyUnitCount].pos_x++;
                            }
                        } else {
                            if (TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0)) {
                                break;
                            } else {
                                Enemy[tactics_enemyUnitCount].pos_x--;
                            }
                        }
                    }

                } else {
                    TacticsEnemyMoving();
                }


            break;

    }
}


function TacticsEnemyAccompanyMoving() {

    let target = 0; //player id

    if (typeof Enemy[tactics_enemyUnitCount].target !== 'undefined') {
        target = Enemy[tactics_enemyUnitCount].target;
    }

    let dd_x = 0;
    let dd_y = 0;
    let mc = Enemy[tactics_enemyUnitCount].mr;

    for (let move = 0; move < mc; move++) {

        let moved = false;
        dd_x = Math.abs(Enemy[tactics_enemyUnitCount].pos_x - Enemy[target].pos_x);
        dd_y = Math.abs(Enemy[tactics_enemyUnitCount].pos_y - Enemy[target].pos_y);

        if (dd_x > dd_y) {
            if (Enemy[target].pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }

            } else {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
            }
        } else
            if (dd_x < dd_y) {
                if (Enemy[target].pos_y < Enemy[tactics_enemyUnitCount].pos_y) {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                        Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_y--;
                        moved = true;
                    }
                } else {

                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                        Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                        Enemy[tactics_enemyUnitCount].pos_y++;
                        moved = true;
                    }
                }
            }

        if (!moved) {
            if (Enemy[target].pos_x != Enemy[tactics_enemyUnitCount].pos_x)
                if (Enemy[target].pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0) &&
                        Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_x--;
                        moved = true;
                    }
                } else {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                        Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                        Enemy[tactics_enemyUnitCount].pos_x++;
                        moved = true;
                    }
                }
            if (!moved)
                if (Enemy[target].pos_y != Enemy[tactics_enemyUnitCount].pos_y)
                    if (Enemy[target].pos_y < Enemy[tactics_enemyUnitCount].pos_y) {
                        if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                            Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                            Enemy[tactics_enemyUnitCount].pos_y--;
                            moved = true;
                        }
                    } else {
                        if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                            Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                            Enemy[tactics_enemyUnitCount].pos_y++;
                            moved = true;
                        }
                    }
        }
    }
}

function TacticsEnemyEscape() {

    let dd_x = 0;
    let dd_y = 0;
    let mc = Enemy[tactics_enemyUnitCount].mr;
    let playerId = 0;

    if (stage_number >= 8) {
        playerId = Enemy[tactics_enemyUnitCount].target;
    }

    for (let move = 0; move < mc; move++) {

        let moved = false;
        dd_x = Math.abs(Enemy[tactics_enemyUnitCount].pos_x - playerId.pos_x);
        dd_y = Math.abs(Enemy[tactics_enemyUnitCount].pos_y - playerId.pos_y);

        if (dd_x < dd_y) {
            if (playerId.pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
            } else {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }
            }
        } else
            if (dd_x > dd_y) {
                if (playerId.pos_y < Enemy[tactics_enemyUnitCount].pos_y) {

                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                        Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                        Enemy[tactics_enemyUnitCount].pos_y++;
                        moved = true;
                    }
                } else {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                        Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_y--;
                        moved = true;
                    }
                }
            }

        if (!moved) {
            if (playerId.pos_x < Enemy[tactics_enemyUnitCount].pos_x) {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
            } else {
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }
            }
            if (!moved) {
                if (playerId.pos_y < Enemy[tactics_enemyUnitCount].pos_y) {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                        Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                        Enemy[tactics_enemyUnitCount].pos_y++;
                        moved = true;
                    }
                } else {
                    if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                        Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                        Enemy[tactics_enemyUnitCount].pos_y--;
                        moved = true;
                    }
                }
            }
        }
    }
}

function TacticsMovingAI_Rotation() {

    let mr = Enemy[tactics_enemyUnitCount].mr;

    for (let i = 0; i < mr; i++) {
        let moved = false;

        switch (Enemy[tactics_enemyUnitCount].direction) {
            case 0:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1)) {
                    Enemy[tactics_enemyUnitCount].pos_y++;
                    moved = true;
                }
                break;
            case 1:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0)) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }
                break;
            case 2:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1)) {
                    Enemy[tactics_enemyUnitCount].pos_y--;
                    moved = true;
                }
                break;
            case 3:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0)) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
                break;
        }

        if (moved) {

            Enemy[tactics_enemyUnitCount].distance++;

            if (Enemy[tactics_enemyUnitCount].distance == 2) {
                Enemy[tactics_enemyUnitCount].direction++;
                Enemy[tactics_enemyUnitCount].distance = 0;

                if (Enemy[tactics_enemyUnitCount].direction == 4) {
                    Enemy[tactics_enemyUnitCount].direction = 0;
                }
            }
        }
    }
}

function TacticsMovingAI_Straight() {

    let mr = Enemy[tactics_enemyUnitCount].mr;

    for (let i = 0; i < mr; i++) {
        let moved = false;

        switch (Enemy[tactics_enemyUnitCount].direction) {
            case 0:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1)) {
                    Enemy[tactics_enemyUnitCount].pos_y++;
                    moved = true;
                }
                break;
            case 1:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1)) {
                    Enemy[tactics_enemyUnitCount].pos_y--;
                    moved = true;
                }
                break;
        }

        if (moved) {

            if (Enemy[tactics_enemyUnitCount].pos_y == 8) {
                Enemy[tactics_enemyUnitCount].direction = 1;
            }
            if (Enemy[tactics_enemyUnitCount].pos_y == 0) {
                Enemy[tactics_enemyUnitCount].direction = 0;
            }
        }
    }
}
function TacticsMovingAI_Diagonal() {

    let mr = Enemy[tactics_enemyUnitCount].mr;

    for (let i = 0; i < mr; i++) {
        let moved = false;

        switch (Enemy[tactics_enemyUnitCount].direction) {
            case 0:
                if (!TacticsMovedUnitCollisionCheck_XY(tactics_enemyUnitCount, -1, -1)) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    Enemy[tactics_enemyUnitCount].pos_y--;
                    moved = true;
                }
                break;
            case 1:
                if (!TacticsMovedUnitCollisionCheck_XY(tactics_enemyUnitCount, 1, -1)) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    Enemy[tactics_enemyUnitCount].pos_y--;
                    moved = true;
                }
                break;
            case 2:
                if (!TacticsMovedUnitCollisionCheck_XY(tactics_enemyUnitCount, -1, 1)) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    Enemy[tactics_enemyUnitCount].pos_y++;
                    moved = true;
                }
                break;
            case 3:
                if (!TacticsMovedUnitCollisionCheck_XY(tactics_enemyUnitCount, 1, 1)) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    Enemy[tactics_enemyUnitCount].pos_y++;
                    moved = true;
                }
                break;
        }

        if (moved) {

            if (Enemy[tactics_enemyUnitCount].pos_y == 8) {
                Enemy[tactics_enemyUnitCount].direction = 1;
            }
            if (Enemy[tactics_enemyUnitCount].pos_x == 9) {
                Enemy[tactics_enemyUnitCount].direction = 0;
            }
            if (Enemy[tactics_enemyUnitCount].pos_y == 0) {
                Enemy[tactics_enemyUnitCount].direction = 2;
            }
            if (Enemy[tactics_enemyUnitCount].pos_x == 0) {
                Enemy[tactics_enemyUnitCount].direction = 3;
            }

        }
    }

}


function TacticsMovingAI_Random() {

    let mc = Enemy[tactics_enemyUnitCount].mr;

    for (let move = 0; move < mc; move++) {

        let rn = Math.floor(Math.random() * 4);

        switch (rn) {
            case 0:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, -1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_x--;
                    moved = true;
                }
                break;
            case 1:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 1, 0) &&
                    Enemy[tactics_enemyUnitCount].pos_x + 1 < 9) {
                    Enemy[tactics_enemyUnitCount].pos_x++;
                    moved = true;
                }
                break;
            case 2:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, -1) &&
                    Enemy[tactics_enemyUnitCount].pos_y - 1 > 0) {
                    Enemy[tactics_enemyUnitCount].pos_y--;
                    moved = true;
                }
                break;
            case 3:
                if (!TacticsMovedUnitCollisionCheck(tactics_enemyUnitCount, 0, 1) &&
                    Enemy[tactics_enemyUnitCount].pos_y + 1 < 8) {
                    Enemy[tactics_enemyUnitCount].pos_y++;
                    moved = true;
                }
                break;
        }
    }
}

function TacticsMovedUnitCollisionCheck(index, dx, dy) {

    for (let i = 0; i < Player.length; i++) {
        if (dx != 0) {
            if (Enemy[index].pos_x + dx == Player[i].pos_x && Enemy[index].pos_y == Player[i].pos_y) {
                return true;
            }
        }
        if (dy != 0) {
            if (Enemy[index].pos_y + dy == Player[i].pos_y && Enemy[index].pos_x == Player[i].pos_x) {
                return true;
            }
        }
    }

    for (let i = 0; i < Enemy.length; i++) {

        if (dx != 0) {
            if (Enemy[index].pos_x + dx == Enemy[i].pos_x && Enemy[index].pos_y == Enemy[i].pos_y) {
                return true;
            }
        }

        if (dy != 0) {
            if (Enemy[index].pos_y + dy == Enemy[i].pos_y && Enemy[index].pos_x == Enemy[i].pos_x) {
                return true;
            }
        }
    }
    return false;
}

function TacticsMovedUnitCollisionCheck_XY(index, dx, dy) {

    if (Enemy[index].pos_x + dx == Player[0].pos_x && Enemy[index].pos_y + dy == Player[0].pos_y) {
        return true;
    }

    for (let i = 0; i < Enemy.length; i++) {

        if (Enemy[index].pos_x + dx == Enemy[i].pos_x && Enemy[index].pos_y + dy == Enemy[i].pos_y) {
            return true;
        }
    }
    return false;
}

function TacticsAttackRangeSetting_new() {

    let ar = Enemy[tactics_enemyUnitCount].ar + 1;
    let tx = Enemy[tactics_enemyUnitCount].pos_x;
    let ty = Enemy[tactics_enemyUnitCount].pos_y;

    for (let i = 0; i < tactics_AttackRange.length; i++) {
        for (let j = 0; j < tactics_AttackRange[i].length; j++) {
            tactics_AttackRange[i][j] = 0;
        }
    }

    for (let i = 1; i < ar; i++) {
        if (tx - i >= 0)
            tactics_AttackRange[ty][tx - i] = 1;
        if (tx + i <= 9)
            tactics_AttackRange[ty][tx + i] = 1;
    }


    for (let j = 0; j < ar; j++) {
        for (let i = 1; i < ar; i++) {
            if (ty - i >= 0 && tx - j >= 0) {
                tactics_AttackRange[ty - i][tx - j] = ar - j - i;
                if (tactics_AttackRange[ty - i][tx - j] < 0)
                    tactics_AttackRange[ty - i][tx - j] = 0;
            }
            if (ty - i >= 0 && tx + j <= 9) {
                tactics_AttackRange[ty - i][tx + j] = ar - j - i;
                if (tactics_AttackRange[ty - i][tx + j] < 0)
                    tactics_AttackRange[ty - i][tx + j] = 0;
            }

            if (ty + i <= 8 && tx - j >= 0) {
                tactics_AttackRange[ty + i][tx - j] = ar - j - i;
                if (tactics_AttackRange[ty + i][tx - j] < 0)
                    tactics_AttackRange[ty + i][tx - j] = 0;
            }
            if (ty + i <= 8 && tx + j <= 9) {
                tactics_AttackRange[ty + i][tx + j] = ar - j - i;
                if (tactics_AttackRange[ty + i][tx + j] < 0)
                    tactics_AttackRange[ty + i][tx + j] = 0;
            }
        }
    }

    //console.log(tactics_AttackRange);
}

function TacticsAttackSearch() {

    let targetlist = [];
    let foundUnit = false;

    //List of players within range
    for (let i = 0; i < tactics_AttackRange.length; i++) {
        for (let j = 0; j < tactics_AttackRange[i].length; j++) {
            if (tactics_AttackRange[i][j] >= 1) {
                for (let p = 0; p < Player.length; p++) {
                    if (j == Player[p].pos_x && i == Player[p].pos_y) {
                        targetlist.push(p);
                    }
                }
            }
        }
    }

    if (typeof Enemy[tactics_enemyUnitCount].target !== 'undefined') {
        tactics_SelectedPlayer = Enemy[tactics_enemyUnitCount].target;
    }

    for (let i = 0; i < targetlist.length; i++) {
        if (targetlist[i] == Enemy[tactics_enemyUnitCount].target) {
            tactics_SelectedPlayer = targetlist[i];
            foundUnit = true;
            break;
        }
    }

    if (!foundUnit && targetlist.length >= 1) {
        tactics_SelectedPlayer = targetlist[0];
        foundUnit = true;
    }

    //SearchEnemy
    if (Enemy[tactics_enemyUnitCount].icon === 'hopnate') {
        EventWhenFound();
        tactics_enemyUnitMemory = tactics_enemyUnitCount;
        return false;
    }

    return foundUnit;
}

function TacticsRangeAttackSearch() {
    //enemyunit one perimeter range

    tactics_enemyRangeAttackList = [];
    let range = 1;
    let e_x = Enemy[tactics_enemyUnitCount].pos_x;
    let e_y = Enemy[tactics_enemyUnitCount].pos_y;

    for (let i = e_y - range; i < e_y + range + 1; i++) {
        for (let j = e_x - range; j < e_x + range + 1; j++) {
            if ((j >= 0 && j <= 9) && (i >= 0 && i <= 8)) {
                for (let p = 0; p < Player.length; p++) {
                    if (j == Player[p].pos_x && i == Player[p].pos_y) {
                        tactics_enemyRangeAttackList.push({ id: p, pos_x: j, pos_y: i });
                    }
                }
            }
        }
    }

    if (Enemy[tactics_enemyUnitCount].icon === 'megarand')
        if (tactics_enemyRangeAttackList.length >= 1) {

            let rn = Math.floor(Math.random() * tactics_enemyRangeAttackList.length);
            let target_x = tactics_enemyRangeAttackList[rn].pos_x;
            let target_y = tactics_enemyRangeAttackList[rn].pos_y;

            for (let i = 0; i < tactics_enemyRangeAttackList.length; i++) {
                if (target_x != tactics_enemyRangeAttackList[i].pos_x && target_y != tactics_enemyRangeAttackList[i].pos_y) {
                    tactics_enemyRangeAttackList.splice(i, 1);
                }
            }

        }
}

function TacticsRangeAttackEnemyClassifier(name) {

    let match = false;
    switch (name) {
        case 'megarand':
            match = true;
            break;

        case 'neyl':
            match = true;
            break;
    }

    return match;
}

function TacticsEnemySupportSearch() {

    let targetlist = [];
    let foundUnit = false;

    //List of enemy within range
    for (let i = 0; i < tactics_AttackRange.length; i++) {
        for (let j = 0; j < tactics_AttackRange[i].length; j++) {
            if (tactics_AttackRange[i][j] == 1) {
                for (let p = 0; p < Enemy.length; p++) {
                    if (tactics_enemyUnitCount != p)
                        if (j == Enemy[p].pos_x && i == Enemy[p].pos_y) {
                            if (Enemy[p].nowhp < Enemy[p].maxhp)
                                targetlist.push(p);
                        }
                }
            }
        }
    }

    if (typeof Enemy[tactics_enemyUnitCount].target !== 'undefined') {
        tactics_SelectedPlayer = Enemy[tactics_enemyUnitCount].target;
    }

    for (let i = 0; i < targetlist.length; i++) {
        if (targetlist == Enemy[tactics_enemyUnitCount].target) {
            tactics_SelectedPlayer = targetlist[i];
            foundUnit = true;
            break;
        }
    }

    if (!foundUnit && targetlist.length >= 1) {
        tactics_SelectedPlayer = targetlist[0];
        foundUnit = true;
    }

    return foundUnit;
}


function TacticsEnemyMRSetting() {

    let mr = Enemy[tactics_enemyUnitCount].mr + 1;
    let tx = Enemy[tactics_enemyUnitCount].pos_x;
    let ty = Enemy[tactics_enemyUnitCount].pos_y;
    tactics_MovableRange[ty][tx] = mr;

    //init
    for (let i = 0; i < stage_terrain.length; i++) {
        for (let j = 0; j < stage_terrain[i].length; j++) {
            tactics_MovableRange[i][j] = stage_terrain[i][j];
        }
    }

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
function TacticsEnemyCondition() {
    for (let i = 0; i < Enemy.length; i++) {
        for (let j = 0; j < Enemy[i].condition.length; j++) {
            if (Enemy[i].condition[j].name === 'dontmove') {
                Enemy[i].condition[j].turn++;
            }
            if (Enemy[i].condition[j].name === 'dontmove' && Enemy[i].condition[j].turn >= 3) {
                let condition = Array.from(Enemy[i].condition);
                TacticsBuffReleaser('dontmove', condition);
                Enemy[i].condition = condition;
            }
        }
    }
}

function TacticsUnitApAdder() {
    for (let i = 0; i < Enemy.length; i++) {
        Enemy[i].ap++;
        if (Enemy[i].icon === 'shaorin')
            Enemy[i].ap++;

    }
}

function TacticsEnemyConditionCheck() {

    if (typeof Enemy[tactics_enemyUnitCount].condition !== 'undefined')
        for (let i = 0; i < Enemy[tactics_enemyUnitCount].condition.length; i++) {
            if (Enemy[tactics_enemyUnitCount].condition[i].name === 'dontmove') {
                return true;
            }
        }

    return false;
}

function TacticsEnemyUpkeep() {


    //build effective
    for (let i = 0; i < Building.length; i++) {
        for (let j = 0; j < Building[i].length; j++) {

            if (Building[i][j].type == 1) {
                Building[i][j].turn--;
                if (Building[i][j].turn <= 0) {
                    Building[i][j].type = 0;
                }
            }
        }
    }


    //token destroy

    for (let i = 0; i < Enemy.length; i++) {
        if (typeof Enemy[i].upkeep !== 'undefined')
            if (Enemy[i].icon === Enemy[i].upkeep[0].name && Enemy[i].nowhp <= 0) {
                Enemy.splice(i, 1);
            }
    }

    for (let i = 0; i < Enemy.length; i++) {
        if (typeof Enemy[i].upkeep !== 'undefined')
            if (Enemy[i].upkeep[0].type === 'generate') {
                //enemycheck
                let count = 0;
                for (let j = 0; j < Enemy.length; j++) {
                    if (Enemy[j].icon === Enemy[i].upkeep[0].name) {
                        count++;
                    }
                }

                switch (Enemy[i].upkeep[0].name) {
                    case 'spark':
                        if (count < 2) {
                            let gpos_x = Enemy[i].pos_x;
                            let gpos_y = Enemy[i].pos_y;
                            let register = false;

                            if (gpos_x >= 1 && !TacticsEnemyUnitPosCheck(gpos_x - 1, gpos_y)) {
                                gpos_x -= 1;
                                register = true;
                            }

                            if (!register && gpos_x <= 8 && !TacticsEnemyUnitPosCheck(gpos_x + 1, gpos_y)) {
                                gpos_x += 1;
                                register = true;
                            }

                            if (register) {
                                Enemy.push({
                                    name: "スパーク", icon: 'spark', skill: 'ボルトエクスプロ―ジョン',
                                    pos_x: gpos_x, pos_y: gpos_y, ap: 1, nowhp: 4, maxhp: 4,
                                    condition: [{ name: 'spirit', turn: 0 }, { name: 'empty', turn: 0 }],
                                    of: 2, df: 0, mr: 2, ar: 2, mode: 'random',
                                    direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                                });
                                Enemy[i].ap--;
                            }
                        }
                        break;

                    case 'speaker':

                        if (count == 0) {
                            let gpos = [0, 0];
                            let rn = Math.floor(Math.random() * Player.length);

                            gpos = TacticsEmptySearchFromTheTarget(Player[rn].pos_x, Player[rn].pos_y);

                            Enemy.push({
                                name: "スピーカー", icon: 'speaker', skill: 'カーズドスクラッチ',
                                pos_x: gpos[0], pos_y: gpos[1], ap: 1, nowhp: 4, maxhp: 4,
                                condition: [{ name: 'spirit', turn: 0 }, { name: 'empty', turn: 0 }],
                                of: 3, df: 0, mr: 2, ar: 1, mode: 'militant',
                                direction: 0, distance: 0, resist: 'none', end: false, dfid: ''
                            });
                            Enemy[i].ap--;
                        }
                        break;
                }
            }
    }
}

function TacticsEnemyUnitPosCheck(pos_x, pos_y) {

    for (let i = 0; i < Enemy.length; i++) {
        if (Enemy[i].pos_x == pos_x && Enemy[i].pos_y == pos_y) {
            return true;
        }
    }
    return false;
}

function TacticsEnemyBuilding() {

    //building
    if (Enemy[tactics_enemyUnitCount].icon === 'prmiel')
        if (TacticsSearchPlayerUnit(2)) {
            Building[Player[tactics_buildEnemyTarget].pos_y][Player[tactics_buildEnemyTarget].pos_x].type = 1;
            Building[Player[tactics_buildEnemyTarget].pos_y][Player[tactics_buildEnemyTarget].pos_x].turn = 3;

            let condition = Array.from(Player[tactics_SelectedPlayer].condition);
            if (!TacticsBuffDoubleChecker('venom', condition)) {
                condition.push({ name: 'venom', turn: 3 });
                Player[tactics_buildEnemyTarget].condition = condition;
            }

        } else {
            let buildpoint = [];
            let pos_x = Enemy[tactics_enemyUnitCount].pos_x;
            let pos_y = Enemy[tactics_enemyUnitCount].pos_y;

            for (let i = -2; i < 2; i++) {
                for (let j = -2; j < 2; j++) {
                    if ((pos_x + j >= 0 && pos_x + j <= 9) && (pos_y + i >= 0 && pos_y + i <= 9)) {
                        buildpoint.push({ pos_x: pos_x + j, pos_y: pos_y + i });
                    }
                }
            }

            let rn = Math.floor(Math.random() * buildpoint.length);

            Building[buildpoint[rn].pos_y][buildpoint[rn].pos_x].type = 1;
            Building[buildpoint[rn].pos_y][buildpoint[rn].pos_x].turn = 3;
        }


    TacticsBuildIconReductionSetting(tactics_buildEnemyTarget);
}

function TacticsEmptySearchFromTheTarget(txx, tyy) {

    let unit_square = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let targetPoint = [0, 0];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            for (let p = 0; p < Player.length; p++) {
                if (j == Player[p].pos_x && i == Player[p].pos_y) {
                    unit_square[i][j] = 1;
                }
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            for (let e = 0; e < Enemy.length; e++) {
                if (j == Enemy[e].pos_x && i == Enemy[e].pos_y) {
                    unit_square[i][j] = 1;
                }
            }
        }
    }

    //search
    for (let n = 1; n < 10; n++) {

        for (let i = -n; i < n + 1; i++) {
            for (let j = -n; j < n + 1; j++) {
                if ((txx + j >= 0 && txx + j <= 9) && (tyy + i >= 0 && tyy + i <= 8)) {
                    if (unit_square[tyy + i][txx + j] == 0) {
                        return targetPoint = [txx + j, tyy + i];
                    }
                }
            }
        }
    }

    return targetPoint;
}