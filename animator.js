

var animation_DataSet = false;
var AnimeData = [];
var animation_name = "anime_odori_daiti";
var animation_celcount = 0;
var animation_totaltime = 0;
var animation_centerpoint = false;

function AnimeDataSetting(name) {

    animation_name = name;
    AnimeData = [];
    animation_totaltime = 0;
    animation_celcount = 0;

    switch (name) {
        case "anime_odori_daiti":
            animation_centerpoint = false;
            AnimeData = [
                { cel:0, time:0.08 },
                { cel:1, time:0.08 },
                { cel:2, time:0.08 },
                { cel:2, time:0.08 },
                { cel:3, time:0.16 },
                { cel:4, time:0.1 },
                { cel:5, time:0.08 },
                { cel:4, time:0.08 },
                { cel:5, time:0.08 },
                { cel:6, time:0.08 },
                { cel:6, time:0.16 },
                { cel:8, time:0.1 },
                { cel:7, time:0.08 },
                { cel:8, time:0.08 },
                { cel:7, time:0.08 },
                { cel:9, time:0.08 },
                { cel:9, time:0.08 },
                { cel:9, time:0.1 },
                { cel:9, time:0.1 },
                { cel:10, time:0.1 },
                { cel:10, time:0.08 },
                { cel:10, time:0.08 },
                { cel:10, time:0.08 },
                { cel:10, time:0.8 },
            ];
            break;

        case "effect_damage":
            animation_centerpoint = true;
            AnimeData = [
                { cel:0, time:0.3 },
                { cel:1, time:0.3 },
            ];
            break;
        default:
            AnimeData = [];
            break;
    }

    animation_DataSet = true;
}