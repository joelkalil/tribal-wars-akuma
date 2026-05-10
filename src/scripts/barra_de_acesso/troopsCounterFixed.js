/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Notes	: thanks to slowtarget for some initial ideas/functions
	
	TODO	:
		* Display foreign troop summary
____________________________________________________________

Copyright (C) 2010 Dale McKay, all rights reserved
version 1.0, 9 April 2010

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/

/* Akuma modifier: dark neon interface theme. */
(function applyAkumaTheme() {

    const THEME_ID = 'akuma-tw-theme';

    if (typeof document === 'undefined' || document.getElementById(THEME_ID)) {

        return;

    }

    const style = document.createElement('style');

    style.id = THEME_ID;

    style.textContent = "\n        :root {\n            --akuma-bg: #171820;\n            --akuma-panel: #20212a;\n            --akuma-panel-soft: #292a35;\n            --akuma-border: #3b3e4c;\n            --akuma-text: #f5f7ff;\n            --akuma-muted: #a9afc4;\n            --akuma-green: #22ff7a;\n            --akuma-blue: #35a7ff;\n            --akuma-red: #ff315f;\n            --akuma-orange: #ff8a24;\n            --akuma-purple: #7367f0;\n        }\n\n        .ra-fixed-widget,\n        .ra-box-widget,\n        .popup_box_container,\n        .popup_box_content,\n        .ra-popup-content,\n        .ra-card,\n        .ra-table-container,\n        .ra-fieldset,\n        .vis:has(.ra-table),\n        #content_value .ra-main-container {\n            background: var(--akuma-panel) !important;\n            color: var(--akuma-text) !important;\n            border: 1px solid var(--akuma-border) !important;\n            border-radius: 8px !important;\n            box-shadow: 0 18px 50px rgba(0, 0, 0, 0.42) !important;\n        }\n\n        .ra-fixed-widget,\n        .popup_box_container {\n            overflow: hidden !important;\n        }\n\n        .ra-fixed-widget [class$='-header'],\n        .ra-box-widget [class$='-header'],\n        .popup_box_container .popup_box_header,\n        .ra-title,\n        .ra-section-title,\n        .ra-table th {\n            background: linear-gradient(90deg, rgba(34, 255, 122, 0.12), rgba(53, 167, 255, 0.08)) !important;\n            color: var(--akuma-text) !important;\n            border-color: var(--akuma-border) !important;\n        }\n\n        .ra-fixed-widget h3,\n        .ra-box-widget h3,\n        .popup_box_container h3,\n        .ra-title,\n        .ra-section-title {\n            color: var(--akuma-green) !important;\n            letter-spacing: 0 !important;\n        }\n\n        .ra-fixed-widget a,\n        .ra-box-widget a,\n        .popup_box_container a,\n        .ra-popup-content a {\n            color: var(--akuma-blue) !important;\n        }\n\n        .ra-table,\n        .ra-table-v2,\n        .ra-table-v3,\n        .ra-table tbody,\n        .ra-table tr,\n        .ra-table td,\n        .ra-table th {\n            background-color: var(--akuma-panel) !important;\n            color: var(--akuma-text) !important;\n            border-color: var(--akuma-border) !important;\n        }\n\n        .ra-table tr:nth-child(even) td,\n        .ra-table-v2 tr:nth-child(even) td,\n        .ra-table-v3 tr:nth-child(even) td {\n            background-color: rgba(255, 255, 255, 0.025) !important;\n        }\n\n        .ra-table tr:hover td,\n        .ra-table-v2 tr:hover td,\n        .ra-table-v3 tr:hover td {\n            background-color: rgba(53, 167, 255, 0.1) !important;\n        }\n\n        .ra-input,\n        .ra-select,\n        .ra-textarea,\n        .ra-fixed-widget input[type='text'],\n        .ra-fixed-widget input[type='number'],\n        .ra-fixed-widget select,\n        .ra-fixed-widget textarea,\n        .ra-box-widget input[type='text'],\n        .ra-box-widget input[type='number'],\n        .ra-box-widget select,\n        .ra-box-widget textarea,\n        .popup_box_container input[type='text'],\n        .popup_box_container input[type='number'],\n        .popup_box_container select,\n        .popup_box_container textarea {\n            background: #15161d !important;\n            color: var(--akuma-text) !important;\n            border: 1px solid var(--akuma-border) !important;\n            border-radius: 7px !important;\n            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02) !important;\n        }\n\n        .ra-input:focus,\n        .ra-select:focus,\n        .ra-textarea:focus,\n        .ra-fixed-widget input:focus,\n        .ra-fixed-widget select:focus,\n        .ra-fixed-widget textarea:focus,\n        .popup_box_container input:focus,\n        .popup_box_container select:focus,\n        .popup_box_container textarea:focus {\n            border-color: var(--akuma-blue) !important;\n            box-shadow: 0 0 0 2px rgba(53, 167, 255, 0.22) !important;\n            outline: none !important;\n        }\n\n        .ra-fixed-widget .btn,\n        .ra-box-widget .btn,\n        .popup_box_container .btn,\n        .ra-popup-content .btn,\n        .ra-fixed-widget button,\n        .ra-box-widget button,\n        .popup_box_container button {\n            background: linear-gradient(135deg, var(--akuma-purple), var(--akuma-blue)) !important;\n            color: #fff !important;\n            border: 0 !important;\n            border-radius: 7px !important;\n            box-shadow: 0 8px 22px rgba(53, 167, 255, 0.18) !important;\n            font-weight: 700 !important;\n            text-shadow: none !important;\n        }\n\n        .ra-fixed-widget .btn-confirm-yes,\n        .ra-box-widget .btn-confirm-yes,\n        .popup_box_container .btn-confirm-yes,\n        .ra-fixed-widget .btn-green,\n        .ra-box-widget .btn-green {\n            background: linear-gradient(135deg, #12c976, var(--akuma-green)) !important;\n            color: #07130d !important;\n        }\n\n        .ra-fixed-widget .btn-confirm-no,\n        .ra-box-widget .btn-confirm-no,\n        .popup_box_container .btn-confirm-no,\n        .ra-fixed-widget .btn-red,\n        .ra-box-widget .btn-red {\n            background: linear-gradient(135deg, #b71335, var(--akuma-red)) !important;\n            color: #fff !important;\n        }\n\n        .ra-label,\n        .ra-hint,\n        .ra-muted,\n        .ra-help,\n        .ra-small,\n        .ra-fixed-widget small,\n        .ra-box-widget small,\n        .popup_box_container small {\n            color: var(--akuma-muted) !important;\n        }\n\n        .ra-green,\n        .ra-success,\n        .success,\n        .ra-fixed-widget .plus,\n        .ra-box-widget .plus {\n            color: var(--akuma-green) !important;\n        }\n\n        .ra-red,\n        .ra-error,\n        .error,\n        .ra-fixed-widget .minus,\n        .ra-box-widget .minus {\n            color: var(--akuma-red) !important;\n        }\n\n        .ra-orange,\n        .warning,\n        .warn {\n            color: var(--akuma-orange) !important;\n        }\n\n        .custom-close-button,\n        .popup_box_close {\n            filter: drop-shadow(0 0 6px rgba(255, 49, 95, 0.8)) !important;\n        }\n\n        #progressbar,\n        #progressbar #progress,\n        .progress-bar,\n        .progress {\n            background: #14151c !important;\n            border-color: var(--akuma-border) !important;\n            border-radius: 999px !important;\n        }\n\n        #progressbar #progress span,\n        .progress-bar span,\n        .progress span {\n            background: linear-gradient(90deg, var(--akuma-green), var(--akuma-blue)) !important;\n            color: #07130d !important;\n        }\n    ";

    (document.head || document.documentElement).appendChild(style);

})();


var strVersion = 'v8.6';
var latestUpdated = '2023-12-25';

var unitDesc = {
    spear: 'Spear fighters',
    sword: 'Swordsmen',
    axe: 'Axemen',
    archer: 'Archers',
    spy: 'Scouts',
    light: 'Light cavalry',
    marcher: 'Mounted archers',
    heavy: 'Heavy cavalry',
    ram: 'Rams',
    catapult: 'Catapults',
    knight: 'Paladin',
    snob: 'Noblemen',
    militia: 'Militia',
    offense: 'Offensive',
    defense: 'Defensive',
};

if (typeof unitConfig == 'undefined') {
    unitConfig = fnCreateUnitConfig();
}

// User Input
if (typeof DRAGGABLE !== 'boolean') DRAGGABLE = false;

function fnExecuteScript() {
    initDebug();

    var isTroopsOverviewScreen = checkScreen('overview_villages', 'units');

    if (isTroopsOverviewScreen) {
        fnCalculateTroopCount();
    } else {
        UI.ErrorMessage(
            'Script must be run from <a href="/game.php?screen=overview_villages&mode=units" class="btn">Troops Overview</a>',
            5000
        );
    }
}

function fnTranslate(id) {
    var translation = {
        en: [
            'Full Train Nukes',
            'Full Defense Trains',
            'Other Nobles',
            'Full Nukes',
            '3/4 Nukes',
            '1/2 Nukes',
            '1/4 Nukes',
            'Catapult Nukes',
            'Full Defense',
            '3/4 Defense',
            '1/2 Defense',
            '1/4 Defense',
            'Full Scouts',
            '3/4 Scouts',
            '1/2 Scouts',
            '1/4 Scouts',
            'Other',
            'Troops Counter',
            'Noble Armies',
            'Offensive Armies',
            'Defensive Armies',
            'Scout Armies',
            'Other Armies',
            'Offensive Units',
            'Defensive Units',
            'Other Units',
            'Total Units',
            'Co-ordinates',
        ],
    };

    /* Default to English "en". */
    var lang = typeof (translation[game_data.market] == 'undefined')
        ? 'en'
        : game_data.market;
    if (typeof translation[lang][id] == 'undefined') {
        return '';
    }

    return translation[lang][id];
}

function fnAjaxRequest(url, sendMethod, params, type) {
    var payload = null;

    $.ajax({
        async: false,
        url: url,
        data: params,
        dataType: type,
        type: String(sendMethod || 'GET').toUpperCase(),
        error: function (req, status, err) {
            console.error('[Troops Counter] Error: ', err);
        },
        success: function (data, status, req) {
            payload = data;
        },
    });

    return payload;
}

function fnCreateConfig(name) {
    var response = null;
    response = fnAjaxRequest('/interface.php', 'GET', { func: name }, 'xml');
    console.log($(response).find('config'));
    return $(response).find('config');
}

function fnCreateUnitConfig() {
    return fnCreateConfig('get_unit_info');
}

function fnHasArchers() {
    return game_data.units.includes('archer');
}

function fnHasMilitia() {
    return game_data.units.includes('militia');
}

function fnGetTroopCount() {
    /* Number of Columns - VillageColumn - ActionColumn */
    var gameVersion = parseFloat(
        game_data.version.split(' ')[1].replace('release_', '')
    ); // Fix for new game version format (RedAlert)

    var colCount =
        $(
            '#units_table ' +
                (gameVersion >= 7.1 ? 'thead' : 'tbody:eq(0)') +
                ' th'
        ).length - 2;
    var villageTroopInfo = [];

    // Fix for removing the new row added in the Village tables showing village total troops (RedAlert)
    $('#units_table > tbody').each(function (row) {
        $(this).find('tr:last').remove();
    });

    $('#units_table tbody' + (gameVersion < 7.1 ? ':gt(0)' : '')).each(
        function (row, eleRow) {
            /* Reset for next Village */
            var villageData = {
                troops: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            };

            /* Village */
            coords = $(eleRow)
                .find('td:eq(0)')
                .text()
                .match(/\d+\|\d+/g);
            coords = coords
                ? coords[coords.length - 1].match(/(\d+)\|(\d+)/)
                : null;
            villageData.x = parseInt(coords[1], 10);
            villageData.y = parseInt(coords[2], 10);
            villageData.coords = coords[0];

            /* Skip the Village Cell */
            $(eleRow)
                .find('td:gt(0):not(:has(>a))')
                .each(function (cell, eleCell) {
                    /* Skip the RowType Cell */
                    if (cell % colCount) {
                        /* Ignore In the village (your own + foreign) */
                        if (Math.floor(cell / colCount) != 1) {
                            villageData.troops[(cell % colCount) - 1] +=
                                parseInt($(eleCell).text() || '0', 10);
                        }
                    }
                });

            /* Cache the Data */
            villageTroopInfo.push(villageData);
        }
    );

    return villageTroopInfo;
}

function fnCriteriaToStr(criteria) {
    var valueStr = '';

    if (criteria && criteria.length > 0) {
        for (var ii = 0; ii < criteria.length; ii++) {
            if (typeof criteria[ii].minpop != 'undefined') {
                valueStr +=
                    (valueStr ? ' and ' : '') +
                    '(' +
                    unitDesc[criteria[ii].unit] +
                    '[pop] >= ' +
                    criteria[ii].minpop +
                    ')';
            }
            if (typeof criteria[ii].maxpop != 'undefined') {
                valueStr +=
                    (valueStr ? ' and ' : '') +
                    '(' +
                    unitDesc[criteria[ii].unit] +
                    '[pop] < ' +
                    criteria[ii].maxpop +
                    ')';
            }
        }
    }

    return valueStr;
}

function fnCalculateTroopCount() {
    const playerName = game_data.player.name;
    const playerId = game_data.player.id;
    const playerPoints = game_data.player.points;

    let totalTroops = 0;

    const showPlayer = `<b>Player:</b> <a href="/game.php?screen=info_player&id=${playerId}" target="_blank" rel="noopener noreferrer">${playerName}</a><br>`;
    const showTroopsPointRatio = `<b>Troops/Points Ratio:</b> <span id="troopsPointsRatio"></span><br>`;

    const serverTime = jQuery('#serverTime').text();
    const serverDate = jQuery('#serverDate').text();

    const serverDateTime = `<b>Server Time:</b> ${serverTime} ${serverDate}<br><hr>`;

    const currentGroupValue = jQuery('#paged_view_content .vis_item > strong')
        .text()
        .trim()
        .slice(1, -1);

    const currentGroup = `<b>Current Group:</b> ${currentGroupValue}<br>`;

    var maxGroups = 17;
    var outputSummary = {
        'Full Train Nuke': {
            group: 'Nobles',
            criteria: [
                { unit: 'snob', minpop: 400 },
                { unit: 'offense', minpop: 19600 },
            ],
            descID: 0,
        },
        'Full Defense Train': {
            group: 'Nobles',
            criteria: [
                { unit: 'snob', minpop: 400 },
                { unit: 'defense', minpop: 19600 },
            ],
            descID: 1,
        },
        'Other Nobles': {
            group: 'Nobles',
            criteria: [
                { unit: 'snob', minpop: 100 },
                { unit: 'defense', maxpop: 19600 },
                { unit: 'offense', maxpop: 19600 },
            ],
            descID: 2,
        },
        'Full Nuke': {
            group: 'Offensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'offense', minpop: 20000 },
            ],
            descID: 3,
        },
        'Semi Nuke': {
            group: 'Offensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'offense', minpop: 15000, maxpop: 20000 },
            ],
            descID: 4,
        },
        'Half Nuke': {
            group: 'Offensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'offense', minpop: 10000, maxpop: 15000 },
            ],
            descID: 5,
        },
        'Quarter Nuke': {
            group: 'Offensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'offense', minpop: 5000, maxpop: 10000 },
            ],
            descID: 6,
        },
        'Cat Nuke': {
            group: 'Offensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'catapult', minpop: 800 },
                { unit: 'offense', minpop: 20000 },
            ],
            descID: 7,
        },
        'Full Defense': {
            group: 'Defensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'defense', minpop: 20000 },
            ],
            descID: 8,
        },
        'Semi Defense': {
            group: 'Defensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'defense', minpop: 15000, maxpop: 20000 },
            ],
            descID: 9,
        },
        'Half Defense': {
            group: 'Defensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'defense', minpop: 10000, maxpop: 15000 },
            ],
            descID: 10,
        },
        'Quarter Defense': {
            group: 'Defensive',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'defense', minpop: 5000, maxpop: 10000 },
            ],
            descID: 11,
        },
        'Full Scout': {
            group: 'Scouts',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'spy', minpop: 20000 },
            ],
            descID: 12,
        },
        'Semi Scout': {
            group: 'Scouts',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'spy', minpop: 15000, maxpop: 20000 },
            ],
            descID: 13,
        },
        'Half Scout': {
            group: 'Scouts',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'spy', minpop: 10000, maxpop: 15000 },
            ],
            descID: 14,
        },
        'Quarter Scout': {
            group: 'Scouts',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'spy', minpop: 5000, maxpop: 10000 },
            ],
            descID: 15,
        },
        Other: {
            group: 'Other',
            criteria: [
                { unit: 'snob', maxpop: 100 },
                { unit: 'spy', maxpop: 5000 },
                { unit: 'defense', maxpop: 5000 },
                { unit: 'offense', maxpop: 5000 },
            ],
            descID: 16,
        },
    };

    var ii,
        jj,
        village,
        total,
        index,
        count,
        unit,
        item,
        key,
        criteria,
        condition,
        isValid;
    var defense = ['spear', 'sword', 'heavy', 'catapult'];
    var offense = ['axe', 'light', 'ram', 'catapult'];

    if (fnHasArchers()) {
        defense.push('archer');
        offense.push('marcher');
    }

    if (fnHasMilitia()) {
        defense.push('militia');
    }

    /* Initialize */
    var summary = {
        unitTotal: { tally: 0, population: 0 },
        defense: { tally: 0, count: 0, population: 0, coords: [] },
        offense: { tally: 0, count: 0, population: 0, coords: [] },
    };

    $(unitConfig)
        .children()
        .each(function (i, e) {
            summary[e.nodeName] = {
                tally: 0,
                count: 0,
                population: 0,
                coords: [],
            };
        });

    for (item in outputSummary) {
        if (outputSummary.hasOwnProperty(item)) {
            summary[item] = {
                tally: 0,
                count: 0,
                population: 0,
                coords: [],
            };
        }
    }

    var villageTroops = fnGetTroopCount();
    for (ii = 0; ii < villageTroops.length; ii++) {
        village = villageTroops[ii];
        total = {
            defense: { tally: 0, count: 0, population: 0, coords: [] },
            offense: { tally: 0, count: 0, population: 0, coords: [] },
        };

        $(unitConfig)
            .children()
            .each(function (i, e) {
                total[e.nodeName] = {
                    tally: 0,
                    count: 0,
                    population: 0,
                    coords: [],
                };
            });

        /* Calculate total count & population for each unit type */
        index = 0;
        $(unitConfig)
            .children()
            .each(function (i, e) {
                var unit = e.nodeName;
                total[unit].count += village.troops[index];
                total[unit].population +=
                    village.troops[index] *
                    parseInt($(e).find('pop').text(), 10);

                /* Defense */
                if (new RegExp('^(' + defense.join('|') + ')$').test(unit)) {
                    total.defense.count += total[unit].count;
                    total.defense.population += total[unit].population;
                }

                /* Offense */
                if (new RegExp('^(' + offense.join('|') + ')$').test(unit)) {
                    total.offense.count += total[unit].count;
                    total.offense.population += total[unit].population;
                }

                /* Units */
                summary[unit].count += total[unit].count;
                summary[unit].population += total[unit].population;

                /* All Units */
                summary.unitTotal.tally += total[unit].count;
                summary.unitTotal.population += total[unit].population;

                index++;
            });

        summary.defense.count += total.defense.count;
        summary.defense.population += total.defense.population;

        summary.offense.count += total.offense.count;
        summary.offense.population += total.offense.population;

        /* Calculate other summaries */
        for (item in outputSummary) {
            if (outputSummary.hasOwnProperty(item)) {
                isValid = true;

                for (jj = 0; jj < outputSummary[item].criteria.length; jj++) {
                    criteria = outputSummary[item].criteria[jj];

                    if (
                        !(
                            typeof criteria.minpop == 'undefined' ||
                            !criteria.minpop ||
                            total[criteria.unit].population >= criteria.minpop
                        )
                    ) {
                        isValid = false;
                    }

                    if (
                        !(
                            typeof criteria.maxpop == 'undefined' ||
                            !criteria.maxpop ||
                            total[criteria.unit].population < criteria.maxpop
                        )
                    ) {
                        isValid = false;
                    }
                }

                if (isValid) {
                    summary[item].coords.push(village.coords);
                    summary[item].tally++;
                }
            }
        }
    }

    var groupSummary = {};
    for (item in outputSummary) {
        if (outputSummary.hasOwnProperty(item)) {
            if (typeof groupSummary[outputSummary[item].group] == 'undefined') {
                groupSummary[outputSummary[item].group] = [];
            }

            groupSummary[outputSummary[item].group].push(item);
        }
    }

    var curGroup = maxGroups;

    totalTroops = summary.unitTotal.population;

    const intPlayerPoints = parseInt(playerPoints);

    let troopsToPointsRatio = 0.0;

    if (intPlayerPoints !== 0) {
        troopsToPointsRatio = (totalTroops / intPlayerPoints).toFixed(2);
    }

    setTimeout(function () {
        jQuery('#troopsPointsRatio').text(troopsToPointsRatio);
    }, 100);

    var docSource = '';
    docSource +=
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n';
    docSource += '<html><head>';
    docSource += '<script type="text/javascript">';
    docSource += 'function fnShowCoords(id,description){';
    docSource += 'var coords={};';
    for (item in outputSummary) {
        if (outputSummary.hasOwnProperty(item)) {
            if (summary[item].coords.length) {
                docSource +=
                    'coords["' +
                    item +
                    '"] = "' +
                    summary[item].coords.join(' ') +
                    '";\n';
            }
        }
    }
    docSource +=
        'document.getElementById("coords_group").innerHTML = description;';
    docSource += 'var eleCoords = document.getElementById("coords_container");';
    docSource += 'eleCoords.value = coords[id]?coords[id]:"";';
    docSource += 'eleCoords.focus();';
    docSource += 'eleCoords.select();';
    docSource += '}';
    docSource += '</script>';
    docSource += '</head>';
    docSource += '<body>';
    docSource += '<table class="main" width="100%" align="center"><tr><td>';
    docSource +=
        '<h2>' +
        fnTranslate(curGroup++) +
        '<sup><span style="font-size:small;">' +
        '</span></sup></h2>';
    docSource += `${showPlayer}`;
    docSource += `${showTroopsPointRatio}`;
    docSource += `${currentGroup}`;
    docSource += `${serverDateTime}`;
    docSource += '<table class="not-draggable">';
    docSource +=
        '<tr><td width="450" valign="top"><table class="vis" width="100%">';
    for (item in groupSummary) {
        if (groupSummary.hasOwnProperty(item)) {
            count = 0;
            docSource +=
                '<tr><th colspan="2">' + fnTranslate(curGroup++) + '</th></tr>';
            for (jj = 0; jj < groupSummary[item].length; jj++) {
                docSource +=
                    '<tr class="' + (count++ % 2 ? 'row_b' : 'row_a') + '">';
                docSource +=
                    '<td width="240" style="white-space:nowrap;"><a href="#" onclick="fnShowCoords(\'' +
                    groupSummary[item][jj] +
                    "','" +
                    fnTranslate(outputSummary[groupSummary[item][jj]].descID) +
                    '\');" title="' +
                    fnCriteriaToStr(
                        outputSummary[groupSummary[item][jj]].criteria
                    ) +
                    '">&raquo;&nbsp; ' +
                    fnTranslate(outputSummary[groupSummary[item][jj]].descID) +
                    '</a></td>\n';
                docSource +=
                    '<td width="240"' +
                    (summary[groupSummary[item][jj]].tally > 0
                        ? ''
                        : ' class="hidden"') +
                    ' style="text-align:right;"><span>' +
                    summary[groupSummary[item][jj]].tally +
                    '</span></td>';
                docSource += '</tr>';
            }
        }
    }
    docSource += '</table>';
    docSource += '<td valign="top">';

    /* Offensive Units */

    docSource += '<table class="vis" width="100%">';
    docSource +=
        '<tr><th colspan="2" style="white-space:nowrap;">' +
        fnTranslate(curGroup++) +
        '</th></tr>';
    count = 0;
    for (key in offense) {
        if (offense.hasOwnProperty(key)) {
            docSource +=
                '<tr class="' +
                (count++ % 2 ? 'row_b' : 'row_a') +
                '"><td><img src="https://' +
                location.hostname +
                '/graphic/unit/unit_' +
                offense[key] +
                '.png?1" alt=""/></td><td style="white-space:nowrap;"><span> ' +
                formatAsNumber(summary[offense[key]].count) +
                ' ' +
                unitDesc[offense[key]] +
                '</span></td></tr>';
        }
    }
    docSource += '</table>';

    /* Defensive Units */
    docSource += '<table class="vis" width="100%">';
    docSource +=
        '<tr><th colspan="2" style="white-space:nowrap;">' +
        fnTranslate(curGroup++) +
        '</th></tr>';
    count = 0;
    for (key in defense) {
        if (defense.hasOwnProperty(key)) {
            docSource +=
                '<tr class="' +
                (count++ % 2 ? 'row_b' : 'row_a') +
                '"><td><img src="https://' +
                location.hostname +
                '/graphic/unit/unit_' +
                defense[key] +
                '.png?1" alt=""/></td><td style="white-space:nowrap;"><span> ' +
                formatAsNumber(summary[defense[key]].count) +
                ' ' +
                unitDesc[defense[key]] +
                '</span></td></tr>';
        }
    }
    docSource += '</table>';

    /* Other Units */
    docSource += '<table class="vis" width="100%">';
    docSource +=
        '<tr><th colspan="2" style="white-space:nowrap;">' +
        fnTranslate(curGroup++) +
        '</th></tr>';
    count = 0;
    $(unitConfig)
        .children()
        .each(function (i, e) {
            var unit = e.nodeName;
            if (
                !new RegExp(
                    '^(' + defense.join('|') + '|' + offense.join('|') + ')$'
                ).test(unit)
            ) {
                docSource +=
                    '<tr class="' +
                    (count++ % 2 ? 'row_b' : 'row_a') +
                    '"><td><img src="https://' +
                    location.hostname +
                    '/graphic/unit/unit_' +
                    unit +
                    '.png?1" alt=""/></td><td style="white-space:nowrap;"><span> ' +
                    formatAsNumber(summary[unit].count) +
                    ' ' +
                    unitDesc[unit] +
                    '</span></td></tr>';
            }
        });
    docSource += '</table>';

    /* Total Units */
    docSource += '<table class="vis" width="100%">';
    docSource +=
        '<tr><th colspan="2" style="white-space:nowrap;">' +
        fnTranslate(curGroup++) +
        '</th></tr>';
    docSource +=
        '<tr class="' +
        'row_a' +
        '"><td><span>Count:</span></td><td style="white-space:nowrap;"><span> ' +
        formatAsNumber(summary.unitTotal.tally) +
        '</span></td></tr>';
    docSource +=
        '<tr class="' +
        'row_b' +
        '"><td><span>Pop:</span></td><td style="white-space:nowrap;"><span> ' +
        formatAsNumber(summary.unitTotal.population) +
        '</span></td></tr>';
    docSource += '</table></td></td></tr></table><br>';
    docSource +=
        '<table id="coordinate_table" class="vis" style="width:100%;">';
    docSource +=
        '<tr><th>' +
        fnTranslate(curGroup++) +
        ': <span id="coords_group" style="font-weight:100;"></span>';
    docSource +=
        '<tr><td style="box-sizing:border-box;width:100%;"><textarea id="coords_container" style="resize:none;width:100%;box-sizing:border-box;height:60px;"></textarea></td></tr>';
    docSource += '</table>';
    docSource += `<small><strong>Troops Counter ${strVersion}</strong> - <a href="https://twscripts.dev/" rel="noopener noreferrer" target="_blank">RedAlert</a> - <a href="https://forum.tribalwars.net/index.php?threads/troops-counter-by-dalesmckay-fixed.285246/" rel="noopener noreferrer" target="_blank">Help</a>`;
    docSource += '</body>';
    docSource += '</html>';

    if (DRAGGABLE) {
        docSource += `
			<a class="popup_box_close custom-close-button" onClick="clickDraggableEl();" href="#">&nbsp;</a>
			<style>
				.troops-counter-content {
					position: fixed;
					background-color: #f4e4bc !important;
					border: 1px solid #603000;
					padding: 10px;
					top: 10vh;
					right: 15vw;
					z-index: 1000;
					width: 440px;
					height: auto;
				}
				.custom-close-button {
					right: 0;
					top: 0;
				}
			</style>
		`;
        if (jQuery('.troops-counter-content').length > 0) {
            UI.ErrorMessage('Troops Counter is already loaded!');
        } else {
            var troopsCounterContent = document.createElement('div');
            troopsCounterContent.classList.add('troops-counter-content');
            troopsCounterContent.innerHTML = docSource;
            jQuery('body').append(troopsCounterContent);
            jQuery('.troops-counter-content').draggable({
                cancel: '.not-draggable',
            });
        }
    } else {
        const popupContent = preparePopupContent(docSource, '440px');
        Dialog.show('content', popupContent);
    }
}

function clickDraggableEl() {
    jQuery('.troops-counter-content').remove();
}

// Helper: Prints universal debug information
function initDebug() {
    console.debug(`[Troops Counter] It works 🚀!`);
    console.debug(
        `[Troops Counter] HELP:`,
        'https://forum.tribalwars.net/index.php?threads/troops-counter-by-dalesmckay-fixed.285246/'
    );
    console.debug(`[Troops Counter] Market:`, game_data.market);
    console.debug(`[Troops Counter] World:`, game_data.world);
    console.debug(`[Troops Counter] Screen:`, game_data.screen);
    console.debug(`[Troops Counter] Game Version:`, game_data.majorVersion);
    console.debug(`[Troops Counter] Game Build:`, game_data.version);
    console.debug(`[Troops Counter] Locale:`, game_data.locale);
    console.debug(
        `[Troops Counter] Premium:`,
        game_data.features.Premium.active
    );
}

// Helper: Format as number
function formatAsNumber(number) {
    return parseInt(number).toLocaleString('de');
}

// Helper: Check that we are on a correct screen
function checkScreen(userScreen, userMode) {
    const currentLocation = window.location.href;
    const url = new URL(currentLocation);

    const gameScreen = url.searchParams.get('screen');
    const gameMode = url.searchParams.get('mode');
    const gameView = url.searchParams.get('view');

    if (gameScreen === userScreen && gameMode === userMode) {
        if (gameView !== null) return false;
        return true;
    }

    return false;
}

// Helper: Prepare Popup Content
function preparePopupContent(popupBody, maxWidth) {
    const popupHeader = `<div class="ra-body" style="max-width: ${maxWidth}">`;
    const popupFooter = `</div>`;

    let popupContent = `
		${popupHeader}
		${popupBody}
		${popupFooter}
	`;

    return popupContent;
}

(async function () {
    if (!game_data.features.Premium.active) {
        UI.ErrorMessage(
            'Premium Account needs to be active for this script to work!',
            6000
        );
    } else {
        fnExecuteScript();
    }
})();
