
//assets
var Asset = {};

Asset.images = {};
Asset.sounds = {};
//
//AssetData
Asset.assets = [
	//window and effect
	{ type: 'image', name: 'logo', src: 'Assets/Images/logo.png' },
	{ type: 'image', name: 'title', src: 'Assets/Images/title.png' },
	{ type: 'image', name: 'white', src: 'Assets/Images/white.png' },
	{ type: 'image', name: 'black', src: 'Assets/Images/black.png' },
	{ type: 'image', name: 'msgwindow', src: 'Assets/Images/msgwindow.png' },

	//scenery
	{ type: 'image', name: 'scenery_apart', src: 'Assets/Images/scenery_apart.png' },
	{ type: 'image', name: 'scenery_jyutaku', src: 'Assets/Images/scenery_jyutaku.png' },
	{ type: 'image', name: 'scenery_souko', src: 'Assets/Images/scenery_souko.png' },
	{ type: 'image', name: 'scenery_school', src: 'Assets/Images/scenery_school.png' },
	{ type: 'image', name: 'scenery_school_ura', src: 'Assets/Images/scenery_school_ura.png' },
	{ type: 'image', name: 'scenery_bc_door', src: 'Assets/Images/scenery_bc_door.png' },
	{ type: 'image', name: 'scenery_bc_room', src: 'Assets/Images/scenery_bc_room.png' },
	{ type: 'image', name: 'scenery_kyousitu', src: 'Assets/Images/scenery_kyousitu.png' },
	{ type: 'image', name: 'scenery_gs_parking', src: 'Assets/Images/scenery_gs_parking.png' },
	{ type: 'image', name: 'scenery_gs_inside', src: 'Assets/Images/scenery_gs_inside.png' },
	{ type: 'image', name: 'scenery_eigakan_out', src: 'Assets/Images/scenery_eigakan_out.png' },
	{ type: 'image', name: 'scenery_eigakan_in', src: 'Assets/Images/scenery_eigakan_in.png' },
	{ type: 'image', name: 'scenery_konta_room', src: 'Assets/Images/scenery_konta_room.png' },
	{ type: 'image', name: 'scenery_uk_room', src: 'Assets/Images/scenery_uk_room.png' },
	{ type: 'image', name: 'scenery_flam_town', src: 'Assets/Images/scenery_flam_town.png' },
	{ type: 'image', name: 'scenery_flam_port', src: 'Assets/Images/scenery_flam_port.png' },
	{ type: 'image', name: 'scenery_skytree', src: 'Assets/Images/scenery_skytree.png' },
	{ type: 'image', name: 'scenery_skytree_kiretu', src: 'Assets/Images/scenery_skytree_kiretu.png' },
	{ type: 'image', name: 'scenery_library', src: 'Assets/Images/scenery_library.png' },
	{ type: 'image', name: 'scenery_akino_room', src: 'Assets/Images/scenery_akino_room.png' },
	{ type: 'image', name: 'scenery_minato_souko', src: 'Assets/Images/scenery_minato_souko.png' },
	{ type: 'image', name: 'scenery_kozue_room', src: 'Assets/Images/scenery_kozue_room.png' },
	{ type: 'image', name: 'scenery_sweetsfactory', src: 'Assets/Images/scenery_sweetsfactory.png' },
	{ type: 'image', name: 'scenery_healthroom', src: 'Assets/Images/scenery_healthroom.png' },
	{ type: 'image', name: 'scenery_school_corridor', src: 'Assets/Images/scenery_school_corridor.png' },
	{ type: 'image', name: 'scenery_cf_room', src: 'Assets/Images/scenery_cf_room.png' },
	{ type: 'image', name: 'scenery_opensea', src: 'Assets/Images/scenery_opensea.png' },
	{ type: 'image', name: 'scenery_milkyway', src: 'Assets/Images/scenery_milkyway.png' },
	{ type: 'image', name: 'scenery_magicforest', src: 'Assets/Images/scenery_magicforest.png' },
	{ type: 'image', name: 'scenery_atrias_town', src: 'Assets/Images/scenery_atrias_town.png' },
	{ type: 'image', name: 'scenery_polaris_in', src: 'Assets/Images/scenery_polaris_in.png' },
	{ type: 'image', name: 'scenery_nekoroom', src: 'Assets/Images/scenery_nekoroom.png' },
	{ type: 'image', name: 'scenery_step', src: 'Assets/Images/scenery_step.png' },

	{ type: 'image', name: 'scenery_date_ent', src: 'Assets/Images/scenery_date_ent.png' },
	{ type: 'image', name: 'scenery_date_th', src: 'Assets/Images/scenery_date_th.png' },
	{ type: 'image', name: 'scenery_date_sh', src: 'Assets/Images/scenery_date_sh.png' },
	{ type: 'image', name: 'scenery_date_nf', src: 'Assets/Images/scenery_date_nf.png' },
	{ type: 'image', name: 'scenery_date_ff', src: 'Assets/Images/scenery_date_ff.png' },
	{ type: 'image', name: 'scenery_date_ice', src: 'Assets/Images/scenery_date_ice.png' },
	{ type: 'image', name: 'scenery_date_as', src: 'Assets/Images/scenery_date_as.png' },
	{ type: 'image', name: 'scenery_date_kl', src: 'Assets/Images/scenery_date_kl.png' },
	{ type: 'image', name: 'scenery_monitor_room', src: 'Assets/Images/scenery_monitor_room.png' },
	{ type: 'image', name: 'scenery_hideaway_medical', src: 'Assets/Images/scenery_hideaway_medical.png' },

	//stand
	{ type: 'image', name: 'stand_kozue', src: 'Assets/Images/stand_kozue.png' },
	{ type: 'image', name: 'stand_kuroma', src: 'Assets/Images/stand_kuroma.png' },
	{ type: 'image', name: 'stand_konta', src: 'Assets/Images/stand_konta.png' },
	{ type: 'image', name: 'stand_deafie', src: 'Assets/Images/stand_deafie.png' },
	{ type: 'image', name: 'stand_akino', src: 'Assets/Images/stand_akino.png' },
	{ type: 'image', name: 'stand_extra', src: 'Assets/Images/stand_extra.png' },
	{ type: 'image', name: 'stand_syoukyakuro', src: 'Assets/Images/stand_syoukyakuro.png' },
	{ type: 'image', name: 'stand_flame', src: 'Assets/Images/stand_flame.png' },
	{ type: 'image', name: 'stand_utukido', src: 'Assets/Images/stand_utukido.png' },
	{ type: 'image', name: 'stand_taniyama', src: 'Assets/Images/stand_taniyama.png' },
	{ type: 'image', name: 'stand_telest', src: 'Assets/Images/stand_telest.png' },
	{ type: 'image', name: 'stand_gamma', src: 'Assets/Images/stand_gamma.png' },
	{ type: 'image', name: 'stand_matoi', src: 'Assets/Images/stand_matoi.png' },
	{ type: 'image', name: 'stand_hawk', src: 'Assets/Images/stand_hawk.png' },
	{ type: 'image', name: 'stand_gester', src: 'Assets/Images/stand_gester.png' },
	{ type: 'image', name: 'stand_okune', src: 'Assets/Images/stand_okune.png' },
	{ type: 'image', name: 'stand_nurse', src: 'Assets/Images/stand_nurse.png' },
	{ type: 'image', name: 'stand_kazami', src: 'Assets/Images/stand_kazami.png' },
	{ type: 'image', name: 'stand_hidden_casey', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_hidden_villanze', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_hidden_en', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_hidden_general', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_hidden_gram', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_hidden_asal', src: 'Assets/Images/stand_hiddenchara.png' },
	{ type: 'image', name: 'stand_plane', src: 'Assets/Images/stand_plane.png' },
	{ type: 'image', name: 'stand_delta', src: 'Assets/Images/stand_delta.png' },
	{ type: 'image', name: 'stand_marc', src: 'Assets/Images/stand_marc.png' },
	{ type: 'image', name: 'stand_cube', src: 'Assets/Images/stand_cube.png' },
	{ type: 'image', name: 'stand_prmiel', src: 'Assets/Images/stand_prmiel.png' },
	{ type: 'image', name: 'stand_iris', src: 'Assets/Images/stand_iris.png' },
	{ type: 'image', name: 'stand_ward', src: 'Assets/Images/stand_ward.png' },
	{ type: 'image', name: 'stand_megarand', src: 'Assets/Images/stand_megarand.png' },
	{ type: 'image', name: 'stand_michael', src: 'Assets/Images/stand_michael.png' },
	{ type: 'image', name: 'stand_shaorin', src: 'Assets/Images/stand_shaorin.png' },
	{ type: 'image', name: 'stand_jeda', src: 'Assets/Images/stand_jeda.png' },
	{ type: 'image', name: 'stand_neyl', src: 'Assets/Images/stand_neyl.png' },
	{ type: 'image', name: 'stand_sizer', src: 'Assets/Images/stand_sizer.png' },

	//picture
	{ type: 'image', name: 'kaisou_souko', src: 'Assets/Images/kaisou_souko.png' },
	{ type: 'image', name: 'picture_tenkousei', src: 'Assets/Images/picture_tenkousei.png' },
	{ type: 'image', name: 'picture_dentyu', src: 'Assets/Images/picture_dentyu.png' },
	{ type: 'image', name: 'picture_matoi_death', src: 'Assets/Images/picture_matoi_death.png' },
	{ type: 'image', name: 'picture_sumaho', src: 'Assets/Images/picture_sumaho.png' },
	{ type: 'image', name: 'picture_mesmerizer', src: 'Assets/Images/picture_mesmerizer.png' },
	{ type: 'image', name: 'picture_pirateship_a', src: 'Assets/Images/picture_pirateship_a.png' },
	{ type: 'image', name: 'picture_pirateship_b', src: 'Assets/Images/picture_pirateship_b.png' },
	{ type: 'image', name: 'picture_sternisland', src: 'Assets/Images/picture_sternisland.png' },
	{ type: 'image', name: 'picture_melave_a', src: 'Assets/Images/picture_melave_a.png' },
	{ type: 'image', name: 'picture_melave_b', src: 'Assets/Images/picture_melave_b.png' },
	{ type: 'image', name: 'picture_teisatuki', src: 'Assets/Images/picture_teisatuki.png' },
	{ type: 'image', name: 'picture_worldmap', src: 'Assets/Images/picture_worldmap.png' },
	{ type: 'image', name: 'picture_mappoint', src: 'Assets/Images/picture_mappoint.png' },
	{ type: 'image', name: 'picture_badweather', src: 'Assets/Images/picture_badweather.png' },
	{ type: 'image', name: 'picture_bf_info', src: 'Assets/Images/picture_bf_info.png' },

	//stage
	{ type: 'image', name: 'stage_town01', src: 'Assets/Images/stage_town01.png' },
	{ type: 'image', name: 'stage_ground', src: 'Assets/Images/stage_ground.png' },
	{ type: 'image', name: 'stage_gs_parking', src: 'Assets/Images/stage_gs_parking.png' },
	{ type: 'image', name: 'stage_meguroku', src: 'Assets/Images/stage_meguroku.png' },
	{ type: 'image', name: 'stage_movie', src: 'Assets/Images/stage_movie.png' },
	{ type: 'image', name: 'stage_sephirastower', src: 'Assets/Images/stage_sephirastower.png' },
	{ type: 'image', name: 'stage_minato_souko', src: 'Assets/Images/stage_minato_souko.png' },
	{ type: 'image', name: 'stage_sweetsfactory', src: 'Assets/Images/stage_sweetsfactory.png' },
	{ type: 'image', name: 'stage_electcity', src: 'Assets/Images/stage_electcity.png' },
	{ type: 'image', name: 'stage_factory', src: 'Assets/Images/stage_factory.png' },
	{ type: 'image', name: 'stage_graveyard', src: 'Assets/Images/stage_graveyard.png' },
	{ type: 'image', name: 'stage_western', src: 'Assets/Images/stage_western.png' },
	{ type: 'image', name: 'stage_atlantis', src: 'Assets/Images/stage_atlantis.png' },

	//icons
	{ type: 'image', name: 'icon', src: 'Assets/Images/icon.png' },
	{ type: 'image', name: 'icon_status', src: 'Assets/Images/icon_status.png' },

	//battle
	{ type: 'image', name: 'battle_anime', src: 'Assets/Images/battle_anime.png' },
	{ type: 'image', name: 'battle_skill', src: 'Assets/Images/battle_skill.png' },
	{ type: 'image', name: 'battle_status', src: 'Assets/Images/battle_status.png' },

	{ type: 'image', name: 'turn_enemy', src: 'Assets/Images/turn_enemy.png' },
	{ type: 'image', name: 'turn_player', src: 'Assets/Images/turn_player.png' },

	{ type: 'image', name: 'battle_akino_binta_a', src: 'Assets/Images/battle_akino_binta_a.png' },
	{ type: 'image', name: 'battle_akino_binta_b', src: 'Assets/Images/battle_akino_binta_b.png' },
	{ type: 'image', name: 'battle_akino_flame_a', src: 'Assets/Images/battle_akino_flame_a.png' },
	{ type: 'image', name: 'battle_akino_flame_b', src: 'Assets/Images/battle_akino_flame_b.png' },
	{ type: 'image', name: 'battle_deafie_a', src: 'Assets/Images/battle_deafie_a.png' },
	{ type: 'image', name: 'battle_deafie_b', src: 'Assets/Images/battle_deafie_b.png' },
	{ type: 'image', name: 'battle_kazu_a', src: 'Assets/Images/battle_kazu_a.png' },
	{ type: 'image', name: 'battle_kazu_b', src: 'Assets/Images/battle_kazu_b.png' },
	{ type: 'image', name: 'battle_ozu_a', src: 'Assets/Images/battle_ozu_a.png' },
	{ type: 'image', name: 'battle_ozu_b', src: 'Assets/Images/battle_ozu_b.png' },
	{ type: 'image', name: 'battle_baseball_a', src: 'Assets/Images/battle_baseball_a.png' },
	{ type: 'image', name: 'battle_baseball_b', src: 'Assets/Images/battle_baseball_b.png' },
	{ type: 'image', name: 'battle_basketball_a', src: 'Assets/Images/battle_basketball_a.png' },
	{ type: 'image', name: 'battle_basketball_b', src: 'Assets/Images/battle_basketball_b.png' },
	{ type: 'image', name: 'battle_rugbyball_a', src: 'Assets/Images/battle_rugbyball_a.png' },
	{ type: 'image', name: 'battle_rugbyball_b', src: 'Assets/Images/battle_rugbyball_b.png' },
	{ type: 'image', name: 'battle_utukido_a', src: 'Assets/Images/battle_utukido_a.png' },
	{ type: 'image', name: 'battle_utukido_b', src: 'Assets/Images/battle_utukido_b.png' },

	{ type: 'image', name: 'battle_akino_ground_a', src: 'Assets/Images/battle_akino_ground_a.png' },
	{ type: 'image', name: 'battle_akino_ground_b', src: 'Assets/Images/battle_akino_ground_b.png' },
	{ type: 'image', name: 'battle_akino_sunlight_a', src: 'Assets/Images/battle_akino_sunlight_a.png' },
	{ type: 'image', name: 'battle_akino_sunlight_b', src: 'Assets/Images/battle_akino_sunlight_b.png' },
	{ type: 'image', name: 'battle_can_a', src: 'Assets/Images/battle_can_a.png' },
	{ type: 'image', name: 'battle_can_b', src: 'Assets/Images/battle_can_b.png' },
	{ type: 'image', name: 'battle_car_a', src: 'Assets/Images/battle_car_a.png' },
	{ type: 'image', name: 'battle_car_b', src: 'Assets/Images/battle_car_b.png' },
	{ type: 'image', name: 'battle_flag_a', src: 'Assets/Images/battle_flag_a.png' },
	{ type: 'image', name: 'battle_flag_b', src: 'Assets/Images/battle_flag_b.png' },
	{ type: 'image', name: 'battle_bits_a', src: 'Assets/Images/battle_bits_a.png' },
	{ type: 'image', name: 'battle_bits_b', src: 'Assets/Images/battle_bits_b.png' },

	{ type: 'image', name: 'battle_sfsoldier_a', src: 'Assets/Images/battle_sfsoldier_a.png' },
	{ type: 'image', name: 'battle_sfsoldier_b', src: 'Assets/Images/battle_sfsoldier_b.png' },
	{ type: 'image', name: 'battle_tworm_a', src: 'Assets/Images/battle_tworm_a.png' },
	{ type: 'image', name: 'battle_tworm_b', src: 'Assets/Images/battle_tworm_b.png' },
	{ type: 'image', name: 'battle_cannon_a', src: 'Assets/Images/battle_cannon_a.png' },
	{ type: 'image', name: 'battle_cannon_b', src: 'Assets/Images/battle_cannon_b.png' },
	{ type: 'image', name: 'battle_yakuza_a', src: 'Assets/Images/battle_yakuza_a.png' },
	{ type: 'image', name: 'battle_yakuza_b', src: 'Assets/Images/battle_yakuza_b.png' },
	{ type: 'image', name: 'battle_hawk_a', src: 'Assets/Images/battle_hawk_a.png' },
	{ type: 'image', name: 'battle_hawk_b', src: 'Assets/Images/battle_hawk_b.png' },
	{ type: 'image', name: 'battle_hawk_dm_a', src: 'Assets/Images/battle_hawk_dm_a.png' },
	{ type: 'image', name: 'battle_hawk_dm_b', src: 'Assets/Images/battle_hawk_dm_b.png' },

	{ type: 'image', name: 'battle_angelknight_a', src: 'Assets/Images/battle_angelknight_a.png' },
	{ type: 'image', name: 'battle_angelknight_b', src: 'Assets/Images/battle_angelknight_b.png' },

	{ type: 'image', name: 'battle_konpou_a', src: 'Assets/Images/battle_konpou_a.png' },
	{ type: 'image', name: 'battle_konpou_b', src: 'Assets/Images/battle_konpou_b.png' },
	{ type: 'image', name: 'battle_yakimasu_a', src: 'Assets/Images/battle_yakimasu_a.png' },
	{ type: 'image', name: 'battle_yakimasu_b', src: 'Assets/Images/battle_yakimasu_b.png' },
	{ type: 'image', name: 'battle_mazemasu_a', src: 'Assets/Images/battle_mazemasu_a.png' },
	{ type: 'image', name: 'battle_mazemasu_b', src: 'Assets/Images/battle_mazemasu_b.png' },

	{ type: 'image', name: 'battle_gester_cs_a', src: 'Assets/Images/battle_gester_cs_a.png' },
	{ type: 'image', name: 'battle_gester_cs_b', src: 'Assets/Images/battle_gester_cs_b.png' },

	{ type: 'image', name: 'battle_blacktornado_a', src: 'Assets/Images/battle_blacktornado_a.png' },
	{ type: 'image', name: 'battle_blacktornado_b', src: 'Assets/Images/battle_blacktornado_b.png' },
	{ type: 'image', name: 'battle_spark_a', src: 'Assets/Images/battle_spark_a.png' },
	{ type: 'image', name: 'battle_spark_b', src: 'Assets/Images/battle_spark_b.png' },
	{ type: 'image', name: 'battle_marc_es_a', src: 'Assets/Images/battle_marc_es_a.png' },
	{ type: 'image', name: 'battle_marc_es_b', src: 'Assets/Images/battle_marc_es_b.png' },
	{ type: 'image', name: 'battle_kazami_injection_a', src: 'Assets/Images/battle_kazami_injection_a.png' },
	{ type: 'image', name: 'battle_kazami_injection_b', src: 'Assets/Images/battle_kazami_injection_b.png' },
	{ type: 'image', name: 'battle_prmiel_a', src: 'Assets/Images/battle_prmiel_a.png' },
	{ type: 'image', name: 'battle_prmiel_b', src: 'Assets/Images/battle_prmiel_b.png' },
	{ type: 'image', name: 'battle_iris_a', src: 'Assets/Images/battle_iris_a.png' },
	{ type: 'image', name: 'battle_iris_b', src: 'Assets/Images/battle_iris_b.png' },
	{ type: 'image', name: 'battle_ward_a', src: 'Assets/Images/battle_ward_a.png' },
	{ type: 'image', name: 'battle_ward_b', src: 'Assets/Images/battle_ward_b.png' },
	{ type: 'image', name: 'battle_megarand_a', src: 'Assets/Images/battle_megarand_a.png' },
	{ type: 'image', name: 'battle_megarand_b', src: 'Assets/Images/battle_megarand_b.png' },
	{ type: 'image', name: 'battle_speaker_a', src: 'Assets/Images/battle_speaker_a.png' },
	{ type: 'image', name: 'battle_speaker_b', src: 'Assets/Images/battle_speaker_b.png' },
	{ type: 'image', name: 'battle_shaorin_attack_a', src: 'Assets/Images/battle_shaorin_attack_a.png' },
	{ type: 'image', name: 'battle_shaorin_attack_b', src: 'Assets/Images/battle_shaorin_attack_b.png' },
	{ type: 'image', name: 'battle_shaorin_counter_a', src: 'Assets/Images/battle_shaorin_counter_a.png' },
	{ type: 'image', name: 'battle_shaorin_counter_b', src: 'Assets/Images/battle_shaorin_counter_b.png' },
	{ type: 'image', name: 'battle_jeda_a', src: 'Assets/Images/battle_jeda_a.png' },
	{ type: 'image', name: 'battle_jeda_b', src: 'Assets/Images/battle_jeda_b.png' },
	{ type: 'image', name: 'battle_neyl_a', src: 'Assets/Images/battle_neyl_a.png' },
	{ type: 'image', name: 'battle_neyl_b', src: 'Assets/Images/battle_neyl_b.png' },
	{ type: 'image', name: 'battle_sizer_a', src: 'Assets/Images/battle_sizer_a.png' },
	{ type: 'image', name: 'battle_sizer_b', src: 'Assets/Images/battle_sizer_b.png' },
	{ type: 'image', name: 'battle_kozue_a', src: 'Assets/Images/battle_kozue_a.png' },
	{ type: 'image', name: 'battle_kozue_b', src: 'Assets/Images/battle_kozue_b.png' },

	//anime
	{ type: 'image', name: 'anime_odori_daiti', src: 'Assets/Images/anime_odori_daiti.png' },
	{ type: 'image', name: 'effect_damage', src: 'Assets/Images/effect_damage.png' },
	//sounds
	//{ type: 'sound', name: 'item', src: 'Assets/Sounds/item.wav' },
];

Asset.icon = {
	empty: { sx: 0, sy: 0 },
	white: { sx: 16, sy: 0 },
	chara_cursor: { sx: 32, sy: 0 },
	cmd_idle: { sx: 48, sy: 0 },
	cmd_cursor: { sx: 64, sy: 0 },
	cmd_inactive: { sx: 80, sy: 0 },
	ko: { sx: 96, sy: 0 },
	end: { sx: 112, sy: 0 },
	target: { sx: 128, sy: 0 },
	strline: { sx: 144, sy: 0 },
	akino: { sx: 0, sy: 16 },
	deafie: { sx: 16, sy: 16 },
	ozu: { sx: 32, sy: 16 },
	kazu: { sx: 48, sy: 16 },
	utukido: { sx: 64, sy: 16 },
	baseball: { sx: 80, sy: 16 },
	basketball: { sx: 96, sy: 16 },
	rugbyball: { sx: 112, sy: 16 },
	sprbar_p:{ sx: 128, sy: 16 },
	sprbar_e:{ sx: 144, sy: 16 },
	taniyama: { sx: 0, sy: 32 },
	car: { sx: 16, sy: 32 },
	flag: { sx: 32, sy: 32 },
	can: { sx: 48, sy: 32 },
	bits: { sx: 64, sy: 32 },
	item: { sx: 80, sy: 32 },
	sfsoldier: { sx: 96, sy: 32 },
	cannon: { sx: 112, sy: 32 },
	tworm: { sx: 128, sy: 32 },
	electric: { sx: 0, sy: 48 },
	orbswitch_on: { sx: 16, sy: 48 },
	orbswitch_off: { sx: 32, sy: 48 },
	angelknight: { sx: 48, sy: 48 },
	hopnate: { sx: 64, sy: 48 },
	chip: { sx: 80, sy: 48 },
	gate: { sx: 96, sy: 48 },
	yakuza: { sx: 112, sy: 48 },
	hawk: { sx: 128, sy: 48 },
	kozue: { sx: 144, sy: 48 },
	gester: { sx: 0, sy: 64 },
	mazemasu: { sx: 16, sy: 64 },
	yakimasu: { sx: 32, sy: 64 },
	konpou: { sx: 48, sy: 64 },
	marc: { sx: 64, sy: 64 },
	blacktornado: { sx: 80, sy: 64 },
	spark: { sx: 96, sy: 64 },
	kazami: { sx: 112, sy: 64 },
	prmiel: { sx: 128, sy: 64 },
	venom: { sx: 144, sy: 64 },
	iris: { sx: 0, sy: 80 },
	ward: { sx: 16, sy: 80 },
	megarand:{sx:32, sy: 80},
	michael:{sx:48,sy:80},
	speaker:{sx:64,sy:80},
	shaorin:{sx:80,sy:80},
	jeda:{sx:96,sy:80},
	neyl:{sx:112,sy:80},
	sizer:{sx:128,sy:80},
	kozue_bc:{sx:144,sy:80},
};


Asset.icon_status = {
	empty: { sx: 0, sy: 0 },
	death: { sx: 16, sy: 0 },
	dontmove: { sx: 32, sy: 0 },
	dontact: { sx: 48, sy: 0 },
	venom: { sx: 64, sy: 0 },
	hero: { sx: 80, sy: 0 },
	bpbuff: { sx: 96, sy: 0 },
	stopwatch: { sx: 112, sy: 0 },

	human: { sx: 0, sy: 16 },
	spirit: { sx: 16, sy: 16 },
	machine: { sx: 32, sy: 16 },
	nebula: { sx: 48, sy: 16 },
	stan: { sx: 64, sy: 16 },

}

Asset.loadAssets = function (onComplete) {
	var total = Asset.assets.length;
	var loadCount = 0;

	var onLoad = function () {

		ctx.font = 6 * SCREEN_MAGNIFICATION + "px PixelMplus12";
		ctx.fillStyle = "rgb(204,204,204)";
		ctx.textBeaseline = "middle";
		ctx.textAlign = "center";

		ctx.fillText("ろーどちゅん",
			80 * SCREEN_MAGNIFICATION,
			72 * SCREEN_MAGNIFICATION);

		ctx.fillText("("+ loadCount + "/" + total + ")",
			80 * SCREEN_MAGNIFICATION,
			82 * SCREEN_MAGNIFICATION);

		loadCount++;
		if (loadCount >= total) {
			onComplete();
			// console.log(Asset.images);
		}
	};

	Asset.assets.forEach(function (asset) {
		switch (asset.type) {
			case 'image':
				Asset._loadImage(asset, onLoad);
				break;
			case 'sound':
				Asset._loadSounds(asset, onLoad);
				break;
		}
	});
};

Asset._loadImage = function (asset, onLoad) {
	var image = new Image();
	image.src = asset.src;
	image.onload = onLoad;
	Asset.images[asset.name] = image;
};

Asset._loadSounds = function (asset, onLoad) {
	var audio = new Audio();
	audio.src = asset.src;
	audio.onload = onLoad;
	Asset.sounds[asset.name] = audio;
};