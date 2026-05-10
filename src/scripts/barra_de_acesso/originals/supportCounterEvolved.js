/*
 * Script Name: Support Counter Evolved
 * Version: v1.1.5
 * Last Updated: 2025-08-15
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2023-01-18
 * Mod: JawJaw
 */

/* Copyright (c) RedAlert
By uploading a user-generated mod (script) for use with Tribal Wars, you grant InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to you. InnoGames is entitled but not obligated to name you when exercising its rights. You represent and warrant that you have the legal right to grant this license and that the mod does not infringe upon any third-party rights. You are - with the exception of claims of infringement by third parties – not liable for any usage of the mod by InnoGames. German law applies.
*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
if (typeof HC_AMOUNT === 'undefined') HC_AMOUNT = null;

if ('TWMap' in window) mapOverlay = TWMap;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'supportCounterEvolved',
        name: 'Support Counter Evolved',
        version: 'v1.1.4',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/support-counter-evolved.289857/',
    },
    translations: {
        en_DK: {
            'Support Counter Evolved': 'Support Counter Evolved',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'Support in your own villages': 'Support in your own villages',
            'Support in other players villages':
                'Support in other players villages',
            'Support in barbarian villages': 'Support in barbarian villages',
            population: 'population',
            Withdraw: 'Withdraw',
            'Player:': 'Player:',
            pop: 'pop',
            'Village Name': 'Village Name',
            Action: 'Action',
            'Mass Withdraw': 'Mass Withdraw',
            TOTAL: 'TOTAL',
            'supports selected': 'supports selected',
            'There was an error fetching supports data!':
                'There was an error fetching supports data!',
            'Amount of troops to call back in %':
                'Amount of troops to call back in %',
            '(example 20 for 20%)': '(example 20 for 20%)',
            'Fill Units': 'Fill Units',
            'Invalid amount!': 'Invalid amount!',
            Village: 'Village',
            Population: 'Population',
            'Fetching support data ...': 'Fetching support data ...',
            'Total Units': 'Total Units',
            'Selected Units': 'Selected Units',
            'Remaining Units': 'Remaining Units',
            'Toggle call back by unit amounts':
                'Toggle call back by unit amounts',
            'Invalid input!': 'Invalid input!',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['overview_villages'],
    allowedModes: ['units'],
    isDebug: DEBUG,
    enableCountApi: true,
};

window.twSDK = {
    // variables
    scriptData: {},
    translations: {},
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    enableCountApi: true,
    isDebug: false,
    isMobile: jQuery('#mobileHeader').length > 0,
    delayBetweenRequests: 200,
    // helper variables
    market: game_data.market,
    units: game_data.units,
    village: game_data.village,
    buildings: game_data.village.buildings,
    sitterId: game_data.player.sitter > 0 ? `&t=${game_data.player.id}` : '',
    coordsRegex: /\d{1,3}\|\d{1,3}/g,
    dateTimeMatch:
        /(?:[A-Z][a-z]{2}\s+\d{1,2},\s*\d{0,4}\s+|today\s+at\s+|tomorrow\s+at\s+)\d{1,2}:\d{2}:\d{2}:?\.?\d{0,3}/,
    worldInfoInterface: '/interface.php?func=get_config',
    unitInfoInterface: '/interface.php?func=get_unit_info',
    buildingInfoInterface: '/interface.php?func=get_building_info',
    worldDataVillages: '/map/village.txt',
    worldDataPlayers: '/map/player.txt',
    worldDataTribes: '/map/ally.txt',
    worldDataConquests: '/map/conquer_extended.txt',
    // game constants
    buildingsList: [
        'main',
        'barracks',
        'stable',
        'garage',
        'church',
        'church_f',
        'watchtower',
        'snob',
        'smith',
        'place',
        'statue',
        'market',
        'wood',
        'stone',
        'iron',
        'farm',
        'storage',
        'hide',
        'wall',
    ],
    // https://help.tribalwars.net/wiki/Points
    buildingPoints: {
        main: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133, 159, 191, 229, 274, 330,
        ],
        barracks: [
            16, 3, 4, 5, 5, 7, 8, 9, 12, 14, 16, 20, 24, 28, 34, 42, 49, 59, 71,
            85, 102, 123, 147, 177, 212,
        ],
        stable: [
            20, 4, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51, 62, 74,
            88, 107,
        ],
        garage: [24, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51],
        chuch: [10, 2, 2],
        church_f: [10],
        watchtower: [
            42, 8, 10, 13, 14, 18, 20, 25, 31, 36, 43, 52, 62, 75, 90, 108, 130,
            155, 186, 224,
        ],
        snob: [512],
        smith: [
            19, 4, 4, 6, 6, 8, 10, 11, 14, 16, 20, 23, 28, 34, 41, 49, 58, 71,
            84, 101,
        ],
        place: [0],
        statue: [24],
        market: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133,
        ],
        wood: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        stone: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        iron: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        farm: [
            5, 1, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27,
            32, 38, 46, 55, 66, 80, 95, 115, 137, 165,
        ],
        storage: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        hide: [5, 1, 1, 2, 1, 2, 3, 3, 3, 5],
        wall: [
            8, 2, 2, 2, 3, 3, 4, 5, 5, 7, 9, 9, 12, 15, 17, 20, 25, 29, 36, 43,
        ],
    },
    unitsFarmSpace: {
        spear: 1,
        sword: 1,
        axe: 1,
        archer: 1,
        spy: 2,
        light: 4,
        marcher: 5,
        heavy: 6,
        ram: 5,
        catapult: 8,
        knight: 10,
        snob: 100,
    },
    // https://help.tribalwars.net/wiki/Timber_camp
    // https://help.tribalwars.net/wiki/Clay_pit
    // https://help.tribalwars.net/wiki/Iron_mine
    resPerHour: {
        0: 2,
        1: 30,
        2: 35,
        3: 41,
        4: 47,
        5: 55,
        6: 64,
        7: 74,
        8: 86,
        9: 100,
        10: 117,
        11: 136,
        12: 158,
        13: 184,
        14: 214,
        15: 249,
        16: 289,
        17: 337,
        18: 391,
        19: 455,
        20: 530,
        21: 616,
        22: 717,
        23: 833,
        24: 969,
        25: 1127,
        26: 1311,
        27: 1525,
        28: 1774,
        29: 2063,
        30: 2400,
    },
    watchtowerLevels: [
        1.1, 1.3, 1.5, 1.7, 2, 2.3, 2.6, 3, 3.4, 3.9, 4.4, 5.1, 5.8, 6.7, 7.6,
        8.7, 10, 11.5, 13.1, 15,
    ],

    // internal methods
    _initDebug: function () {
        const scriptInfo = this.scriptInfo();
        console.debug(`${scriptInfo} It works 🚀!`);
        console.debug(`${scriptInfo} HELP:`, this.scriptData.helpLink);
        if (this.isDebug) {
            console.debug(`${scriptInfo} Market:`, game_data.market);
            console.debug(`${scriptInfo} World:`, game_data.world);
            console.debug(`${scriptInfo} Screen:`, game_data.screen);
            console.debug(
                `${scriptInfo} Game Version:`,
                game_data.majorVersion
            );
            console.debug(`${scriptInfo} Game Build:`, game_data.version);
            console.debug(`${scriptInfo} Locale:`, game_data.locale);
            console.debug(
                `${scriptInfo} PA:`,
                game_data.features.Premium.active
            );
            console.debug(
                `${scriptInfo} LA:`,
                game_data.features.FarmAssistent.active
            );
            console.debug(
                `${scriptInfo} AM:`,
                game_data.features.AccountManager.active
            );
        }
    },

    // public methods
    addGlobalStyle: function () {
        return `
            /* Table Styling */
            .ra-table-container { overflow-y: auto; overflow-x: hidden; height: auto; max-height: 400px; }
            .ra-table th { font-size: 14px; }
            .ra-table th label { margin: 0; padding: 0; }
            .ra-table th,
            .ra-table td { padding: 5px; text-align: center; }
            .ra-table td a { word-break: break-all; }
            .ra-table a:focus { color: blue; }
            .ra-table a.btn:focus { color: #fff; }
            .ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
            .ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }

            .ra-table-v2 th,
            .ra-table-v2 td { text-align: left; }

            .ra-table-v3 { border: 2px solid #bd9c5a; }
            .ra-table-v3 th,
            .ra-table-v3 td { border-collapse: separate; border: 1px solid #bd9c5a; text-align: left; }

            /* Inputs */
            .ra-textarea { width: 100%; height: 80px; resize: none; }

            /* Popup */
            .ra-popup-content { width: 360px; }
            .ra-popup-content * { box-sizing: border-box; }
            .ra-popup-content input[type="text"] { padding: 3px; width: 100%; }
            .ra-popup-content .btn-confirm-yes { padding: 3px !important; }
            .ra-popup-content label { display: block; margin-bottom: 5px; font-weight: 600; }
            .ra-popup-content > div { margin-bottom: 15px; }
            .ra-popup-content > div:last-child { margin-bottom: 0 !important; }
            .ra-popup-content textarea { width: 100%; height: 100px; resize: none; }

            /* Elements */
            .ra-details { display: block; margin-bottom: 8px; border: 1px solid #603000; padding: 8px; border-radius: 4px; }
            .ra-details summary { font-weight: 600; cursor: pointer; }
            .ra-details p { margin: 10px 0 0 0; padding: 0; }

            /* Helpers */
            .ra-pa5 { padding: 5px !important; }
            .ra-mt15 { margin-top: 15px !important; }
            .ra-mb10 { margin-bottom: 10px !important; }
            .ra-mb15 { margin-bottom: 15px !important; }
            .ra-tal { text-align: left !important; }
            .ra-tac { text-align: center !important; }
            .ra-tar { text-align: right !important; }

            /* RESPONSIVE */
            @media (max-width: 480px) {
                .ra-fixed-widget {
                    position: relative !important;
                    top: 0;
                    left: 0;
                    display: block;
                    width: auto;
                    height: auto;
                    z-index: 1;
                }

                .ra-box-widget {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    width: 97%;
                    height: auto;
                    margin: 10px auto;
                }

                .ra-table {
                    border-collapse: collapse !important;
                }

                .custom-close-button { display: none; }
                .ra-fixed-widget h3 { margin-bottom: 15px; }
                .ra-popup-content { width: 100%; }
            }
        `;
    },
    addScriptToQuickbar: function (name, script, callback) {
        let scriptData = `hotkey=&name=${name}&href=${encodeURI(script)}`;
        let action =
            '/game.php?screen=settings&mode=quickbar_edit&action=quickbar_edit&';

        jQuery.ajax({
            url: action,
            type: 'POST',
            data: scriptData + `&h=${csrf_token}`,
            success: function () {
                if (typeof callback === 'function') {
                    callback();
                }
            },
        });
    },
    arraysIntersection: function () {
        var result = [];
        var lists;

        if (arguments.length === 1) {
            lists = arguments[0];
        } else {
            lists = arguments;
        }

        for (var i = 0; i < lists.length; i++) {
            var currentList = lists[i];
            for (var y = 0; y < currentList.length; y++) {
                var currentValue = currentList[y];
                if (result.indexOf(currentValue) === -1) {
                    var existsInAll = true;
                    for (var x = 0; x < lists.length; x++) {
                        if (lists[x].indexOf(currentValue) === -1) {
                            existsInAll = false;
                            break;
                        }
                    }
                    if (existsInAll) {
                        result.push(currentValue);
                    }
                }
            }
        }
        return result;
    },
    buildUnitsPicker: function (
        selectedUnits = [],
        unitsToIgnore,
        type = 'checkbox'
    ) {
        let unitsTable = ``;

        let thUnits = ``;
        let tableRow = ``;

        game_data.units.forEach((unit) => {
            if (!unitsToIgnore.includes(unit)) {
                let checked = '';
                if (selectedUnits.includes(unit)) {
                    checked = `checked`;
                }

                thUnits += `
                    <th class="ra-tac">
                        <label for="unit_${unit}">
                            <img src="/graphic/unit/unit_${unit}.png">
                        </label>
                    </th>
                `;

                tableRow += `
                    <td class="ra-tac">
                        <input name="ra_chosen_units" type="${type}" ${checked} id="unit_${unit}" class="ra-unit-selector" value="${unit}" />
                    </td>
                `;
            }
        });

        unitsTable = `
            <table class="ra-table ra-table-v2" width="100%" id="raUnitSelector">
                <thead>
                    <tr>
                        ${thUnits}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${tableRow}
                    </tr>
                </tbody>
            </table>
        `;

        return unitsTable;
    },
    calculateCoinsNeededForNthNoble: function (noble) {
        return (noble * noble + noble) / 2;
    },
    calculateDistanceFromCurrentVillage: function (coord) {
        const x1 = game_data.village.x;
        const y1 = game_data.village.y;
        const [x2, y2] = coord.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculateDistance: function (from, to) {
        const [x1, y1] = from.split('|');
        const [x2, y2] = to.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculatePercentages: function (amount, total) {
        if (amount === undefined) amount = 0;
        return parseFloat((amount / total) * 100).toFixed(2);
    },
    calculateTimesByDistance: async function (distance) {
        const _self = this;

        const times = [];
        const travelTimes = [];

        const unitInfo = await _self.getWorldUnitInfo();
        const worldConfig = await _self.getWorldConfig();

        for (let [key, value] of Object.entries(unitInfo.config)) {
            times.push(value.speed);
        }

        const { speed, unit_speed } = worldConfig.config;

        times.forEach((time) => {
            let travelTime = Math.round(
                (distance * time * 60) / speed / unit_speed
            );
            travelTime = _self.secondsToHms(travelTime);
            travelTimes.push(travelTime);
        });

        return travelTimes;
    },
    checkValidLocation: function (type) {
        switch (type) {
            case 'screen':
                return this.allowedScreens.includes(
                    this.getParameterByName('screen')
                );
            case 'mode':
                return this.allowedModes.includes(
                    this.getParameterByName('mode')
                );
            default:
                return false;
        }
    },
    checkValidMarket: function () {
        if (this.market === 'yy') return true;
        return this.allowedMarkets.includes(this.market);
    },
    cleanString: function (string) {
        try {
            return decodeURIComponent(string).replace(/\+/g, ' ');
        } catch (error) {
            console.error(error, string);
            return string;
        }
    },
    copyToClipboard: function (string) {
        navigator.clipboard.writeText(string);
    },
    createUUID: function () {
        return crypto.randomUUID();
    },
    csvToArray: function (strData, strDelimiter = ',') {
        var objPattern = new RegExp(
            '(\\' +
                strDelimiter +
                '|\\r?\\n|\\r|^)' +
                '(?:"([^"]*(?:""[^"]*)*)"|' +
                '([^"\\' +
                strDelimiter +
                '\\r\\n]*))',
            'gi'
        );
        var arrData = [[]];
        var arrMatches = null;
        while ((arrMatches = objPattern.exec(strData))) {
            var strMatchedDelimiter = arrMatches[1];
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                arrData.push([]);
            }
            var strMatchedValue;

            if (arrMatches[2]) {
                strMatchedValue = arrMatches[2].replace(
                    new RegExp('""', 'g'),
                    '"'
                );
            } else {
                strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return arrData;
    },
    decryptAccountManangerTemplate: function (exportedTemplate) {
        const buildings = [];

        const binaryString = atob(exportedTemplate);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const payloadLength = bytes[0] + bytes[1] * 256;
        if (payloadLength <= bytes.length - 2) {
            const payload = bytes.slice(2, 2 + payloadLength);
            for (let i = 0; i < payload.length; i += 2) {
                const buildingId = payload[i];
                const buildingLevel = payload[i + 1];
                if (this.buildingsList[buildingId]) {
                    buildings.push({
                        id: this.buildingsList[buildingId],
                        upgrade: `+${buildingLevel}`,
                    });
                }
            }

            return buildings;
        }
    },
    filterVillagesByPlayerIds: function (playerIds, villages) {
        const playerVillages = [];
        villages.forEach((village) => {
            if (playerIds.includes(parseInt(village[4]))) {
                const coordinate = village[2] + '|' + village[3];
                playerVillages.push(coordinate);
            }
        });
        return playerVillages;
    },
    formatAsNumber: function (number) {
        return parseInt(number).toLocaleString('de');
    },
    formatDateTime: function (dateTime) {
        dateTime = new Date(dateTime);
        return (
            this.zeroPad(dateTime.getDate(), 2) +
            '/' +
            this.zeroPad(dateTime.getMonth() + 1, 2) +
            '/' +
            dateTime.getFullYear() +
            ' ' +
            this.zeroPad(dateTime.getHours(), 2) +
            ':' +
            this.zeroPad(dateTime.getMinutes(), 2) +
            ':' +
            this.zeroPad(dateTime.getSeconds(), 2)
        );
    },
    frequencyCounter: function (array) {
        return array.reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {});
    },
    generateRandomCoordinates: function () {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        return `${x}|${y}`;
    },
    getAll: function (
        urls, // array of URLs
        onLoad, // called when any URL is loaded, params (index, data)
        onDone, // called when all URLs successfully loaded, no params
        onError // called when a URL load fails or if onLoad throws an exception, params (error)
    ) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = this.delayBetweenRequests; // ms between requests
        loadNext();
        function loadNext() {
            if (numDone == urls.length) {
                onDone();
                return;
            }

            let now = Date.now();
            let timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) {
                let timeRemaining = minWaitTime - timeElapsed;
                setTimeout(loadNext, timeRemaining);
                return;
            }
            lastRequestTime = now;
            jQuery
                .get(urls[numDone])
                .done((data) => {
                    try {
                        onLoad(numDone, data);
                        ++numDone;
                        loadNext();
                    } catch (e) {
                        onError(e);
                    }
                })
                .fail((xhr) => {
                    onError(xhr);
                });
        }
    },
    getBuildingsInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 365; // fetch config only once since they don't change
        const LAST_UPDATED_TIME =
            localStorage.getItem('buildings_info_last_updated') ?? 0;
        let buildingsInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.buildingInfoInterface,
                });
                buildingsInfo = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'buildings_info',
                    JSON.stringify(buildingsInfo)
                );
                localStorage.setItem(
                    'buildings_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                buildingsInfo = JSON.parse(
                    localStorage.getItem('buildings_info')
                );
            }
        } else {
            const response = await jQuery.ajax({
                url: this.buildingInfoInterface,
            });
            buildingsInfo = this.xml2json(jQuery(response));
            localStorage.setItem('buildings_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'buildings_info_last_updated',
                Date.parse(new Date())
            );
        }

        return buildingsInfo;
    },
    getContinentByCoord: function (coord) {
        let [x, y] = Array.from(coord.split('|')).map((e) => parseInt(e));
        for (let i = 0; i < 1000; i += 100) {
            //x axes
            for (let j = 0; j < 1000; j += 100) {
                //y axes
                if (i >= x && x < i + 100 && j >= y && y < j + 100) {
                    let nr_continent =
                        parseInt(y / 100) + '' + parseInt(x / 100);
                    return nr_continent;
                }
            }
        }
    },
    getContinentsFromCoordinates: function (coordinates) {
        let continents = [];

        coordinates.forEach((coord) => {
            const continent = twSDK.getContinentByCoord(coord);
            continents.push(continent);
        });

        return [...new Set(continents)];
    },
    getCoordFromString: function (string) {
        if (!string) return [];
        return string.match(this.coordsRegex)[0];
    },
    getContinentSectorField: function (coordinate) {
        const continent = this.getContinentByCoord(coordinate);
        let [coordX, coordY] = coordinate.split('|');

        let tempX = Number(coordX);
        let tempY = Number(coordY);

        //==== sector ====
        if (tempX >= 100) tempX = Number(String(coordX).substring(1));
        if (tempY >= 100) tempY = Number(String(coordY).substring(1));

        let xPos = Math.floor(tempX / 5);
        let yPos = Math.floor(tempY / 5);
        let sector = yPos * 20 + xPos;

        //==== field ====
        if (tempX >= 10) tempX = Number(String(tempX).substring(1));
        if (tempY >= 10) tempY = Number(String(tempY).substring(1));

        if (tempX >= 5) tempX = tempX - 5;
        if (tempY >= 5) tempY = tempY - 5;
        let field = tempY * 5 + tempX;

        let name = continent + ':' + sector + ':' + field;

        return name;
    },
    getDestinationCoordinates: function (config, tribes, players, villages) {
        const {
            playersInput,
            tribesInput,
            continents,
            minCoord,
            maxCoord,
            distCenter,
            center,
            excludedPlayers,
            enable20To1Limit,
            minPoints,
            maxPoints,
            selectiveRandomConfig,
        } = config;

        // get target coordinates
        const chosenPlayers = playersInput.split(',');
        const chosenTribes = tribesInput.split(',');

        const chosenPlayerIds = twSDK.getEntityIdsByArrayIndex(
            chosenPlayers,
            players,
            1
        );
        const chosenTribeIds = twSDK.getEntityIdsByArrayIndex(
            chosenTribes,
            tribes,
            2
        );

        const tribePlayers = twSDK.getTribeMembersById(chosenTribeIds, players);

        const mergedPlayersList = [...tribePlayers, ...chosenPlayerIds];
        let uniquePlayersList = [...new Set(mergedPlayersList)];

        const chosenExcludedPlayers = excludedPlayers.split(',');
        if (chosenExcludedPlayers.length > 0) {
            const excludedPlayersIds = twSDK.getEntityIdsByArrayIndex(
                chosenExcludedPlayers,
                players,
                1
            );
            excludedPlayersIds.forEach((item) => {
                uniquePlayersList = uniquePlayersList.filter(
                    (player) => player !== item
                );
            });
        }

        // filter by 20:1 rule
        if (enable20To1Limit) {
            let uniquePlayersListArray = [];
            uniquePlayersList.forEach((playerId) => {
                players.forEach((player) => {
                    if (parseInt(player[0]) === playerId) {
                        uniquePlayersListArray.push(player);
                    }
                });
            });

            const playersNotBiggerThen20Times = uniquePlayersListArray.filter(
                (player) => {
                    return (
                        parseInt(player[4]) <=
                        parseInt(game_data.player.points) * 20
                    );
                }
            );

            uniquePlayersList = playersNotBiggerThen20Times.map((player) =>
                parseInt(player[0])
            );
        }

        let coordinatesArray = twSDK.filterVillagesByPlayerIds(
            uniquePlayersList,
            villages
        );

        // filter by min and max village points
        if (minPoints || maxPoints) {
            let filteredCoordinatesArray = [];

            coordinatesArray.forEach((coordinate) => {
                villages.forEach((village) => {
                    const villageCoordinate = village[2] + '|' + village[3];
                    if (villageCoordinate === coordinate) {
                        filteredCoordinatesArray.push(village);
                    }
                });
            });

            filteredCoordinatesArray = filteredCoordinatesArray.filter(
                (village) => {
                    const villagePoints = parseInt(village[5]);
                    const minPointsNumber = parseInt(minPoints) || 26;
                    const maxPointsNumber = parseInt(maxPoints) || 12124;
                    if (
                        villagePoints > minPointsNumber &&
                        villagePoints < maxPointsNumber
                    ) {
                        return village;
                    }
                }
            );

            coordinatesArray = filteredCoordinatesArray.map(
                (village) => village[2] + '|' + village[3]
            );
        }

        // filter coordinates by continent
        if (continents.length) {
            let chosenContinentsArray = continents.split(',');
            chosenContinentsArray = chosenContinentsArray.map((item) =>
                item.trim()
            );

            const availableContinents =
                twSDK.getContinentsFromCoordinates(coordinatesArray);
            const filteredVillagesByContinent =
                twSDK.getFilteredVillagesByContinent(
                    coordinatesArray,
                    availableContinents
                );

            const isUserInputValid = chosenContinentsArray.every((item) =>
                availableContinents.includes(item)
            );

            if (isUserInputValid) {
                coordinatesArray = chosenContinentsArray
                    .map((continent) => {
                        if (continent.length && $.isNumeric(continent)) {
                            return [...filteredVillagesByContinent[continent]];
                        } else {
                            return;
                        }
                    })
                    .flat();
            } else {
                return [];
            }
        }

        // filter coordinates by a bounding box of coordinates
        if (minCoord.length && maxCoord.length) {
            const raMinCoordCheck = minCoord.match(twSDK.coordsRegex);
            const raMaxCoordCheck = maxCoord.match(twSDK.coordsRegex);

            if (raMinCoordCheck !== null && raMaxCoordCheck !== null) {
                const [minX, minY] = raMinCoordCheck[0].split('|');
                const [maxX, maxY] = raMaxCoordCheck[0].split('|');

                coordinatesArray = [...coordinatesArray].filter(
                    (coordinate) => {
                        const [x, y] = coordinate.split('|');
                        if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
                            return coordinate;
                        }
                    }
                );
            } else {
                return [];
            }
        }

        // filter by radius
        if (distCenter.length && center.length) {
            if (!$.isNumeric(distCenter)) distCenter = 0;
            const raCenterCheck = center.match(twSDK.coordsRegex);

            if (distCenter !== 0 && raCenterCheck !== null) {
                let coordinatesArrayWithDistance = [];
                coordinatesArray.forEach((coordinate) => {
                    const distance = twSDK.calculateDistance(
                        raCenterCheck[0],
                        coordinate
                    );
                    coordinatesArrayWithDistance.push({
                        coord: coordinate,
                        distance: distance,
                    });
                });

                coordinatesArrayWithDistance =
                    coordinatesArrayWithDistance.filter((item) => {
                        return (
                            parseFloat(item.distance) <= parseFloat(distCenter)
                        );
                    });

                coordinatesArray = coordinatesArrayWithDistance.map(
                    (item) => item.coord
                );
            } else {
                return [];
            }
        }

        // apply multiplier
        if (selectiveRandomConfig) {
            const selectiveRandomizer = selectiveRandomConfig.split(';');

            const makeRepeated = (arr, repeats) =>
                Array.from({ length: repeats }, () => arr).flat();
            const multipliedCoordinatesArray = [];

            selectiveRandomizer.forEach((item) => {
                const [playerName, distribution] = item.split(':');
                if (distribution > 1) {
                    players.forEach((player) => {
                        if (
                            twSDK.cleanString(player[1]) ===
                            twSDK.cleanString(playerName)
                        ) {
                            let playerVillages =
                                twSDK.filterVillagesByPlayerIds(
                                    [parseInt(player[0])],
                                    villages
                                );
                            const flattenedPlayerVillagesArray = makeRepeated(
                                playerVillages,
                                distribution
                            );
                            multipliedCoordinatesArray.push(
                                flattenedPlayerVillagesArray
                            );
                        }
                    });
                }
            });

            coordinatesArray.push(...multipliedCoordinatesArray.flat());
        }

        return coordinatesArray;
    },
    getEntityIdsByArrayIndex: function (chosenItems, items, index) {
        const itemIds = [];
        chosenItems.forEach((chosenItem) => {
            items.forEach((item) => {
                if (
                    twSDK.cleanString(item[index]) ===
                    twSDK.cleanString(chosenItem)
                ) {
                    return itemIds.push(parseInt(item[0]));
                }
            });
        });
        return itemIds;
    },
    getFilteredVillagesByContinent: function (
        playerVillagesCoords,
        continents
    ) {
        let coords = [...playerVillagesCoords];
        let filteredVillagesByContinent = [];

        coords.forEach((coord) => {
            continents.forEach((continent) => {
                let currentVillageContinent = twSDK.getContinentByCoord(coord);
                if (currentVillageContinent === continent) {
                    filteredVillagesByContinent.push({
                        continent: continent,
                        coords: coord,
                    });
                }
            });
        });

        return twSDK.groupArrayByProperty(
            filteredVillagesByContinent,
            'continent',
            'coords'
        );
    },
    getGameFeatures: function () {
        const { Premium, FarmAssistent, AccountManager } = game_data.features;
        const isPA = Premium.active;
        const isLA = FarmAssistent.active;
        const isAM = AccountManager.active;
        return { isPA, isLA, isAM };
    },
    getKeyByValue: function (object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    },
    getLandingTimeFromArrivesIn: function (arrivesIn) {
        const currentServerTime = twSDK.getServerDateTimeObject();
        const [hours, minutes, seconds] = arrivesIn.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        const arrivalDateTime = new Date(
            currentServerTime.getTime() + totalSeconds * 1000
        );
        return arrivalDateTime;
    },
    getLastCoordFromString: function (string) {
        if (!string) return [];
        const regex = this.coordsRegex;
        let match;
        let lastMatch;
        while ((match = regex.exec(string)) !== null) {
            lastMatch = match;
        }
        return lastMatch ? lastMatch[0] : [];
    },
    getPagesToFetch: function () {
        let list_pages = [];

        const currentPage = twSDK.getParameterByName('page');
        if (currentPage == '-1') return [];

        if (
            document
                .getElementsByClassName('vis')[1]
                .getElementsByTagName('select').length > 0
        ) {
            Array.from(
                document
                    .getElementsByClassName('vis')[1]
                    .getElementsByTagName('select')[0]
            ).forEach(function (item) {
                list_pages.push(item.value);
            });
            list_pages.pop();
        } else if (
            document.getElementsByClassName('paged-nav-item').length > 0
        ) {
            let nr = 0;
            Array.from(
                document.getElementsByClassName('paged-nav-item')
            ).forEach(function (item) {
                let current = item.href;
                current = current.split('page=')[0] + 'page=' + nr;
                nr++;
                list_pages.push(current);
            });
        } else {
            let current_link = window.location.href;
            list_pages.push(current_link);
        }
        list_pages.shift();

        return list_pages;
    },
    getParameterByName: function (name, url = window.location.href) {
        return new URL(url).searchParams.get(name);
    },
    getRelativeImagePath: function (url) {
        const urlParts = url.split('/');
        return `/${urlParts[5]}/${urlParts[6]}/${urlParts[7]}`;
    },
    getServerDateTimeObject: function () {
        const formattedTime = this.getServerDateTime();
        return new Date(formattedTime);
    },
    getServerDateTime: function () {
        const serverTime = jQuery('#serverTime').text();
        const serverDate = jQuery('#serverDate').text();
        const [day, month, year] = serverDate.split('/');
        const serverTimeFormatted =
            year + '-' + month + '-' + day + ' ' + serverTime;
        return serverTimeFormatted;
    },
    getTimeFromString: function (timeLand) {
        let dateLand = '';
        let serverDate = document
            .getElementById('serverDate')
            .innerText.split('/');

        let TIME_PATTERNS = {
            today: 'today at %s',
            tomorrow: 'tomorrow at %s',
            later: 'on %1 at %2',
        };

        if (window.lang) {
            TIME_PATTERNS = {
                today: window.lang['aea2b0aa9ae1534226518faaefffdaad'],
                tomorrow: window.lang['57d28d1b211fddbb7a499ead5bf23079'],
                later: window.lang['0cb274c906d622fa8ce524bcfbb7552d'],
            };
        }

        let todayPattern = new RegExp(
            TIME_PATTERNS.today.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let tomorrowPattern = new RegExp(
            TIME_PATTERNS.tomorrow.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let laterDatePattern = new RegExp(
            TIME_PATTERNS.later
                .replace('%1', '([\\d+|\\.]+)')
                .replace('%2', '([\\d+|:]+)')
        ).exec(timeLand);

        if (todayPattern !== null) {
            // today
            dateLand =
                serverDate[0] +
                '/' +
                serverDate[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else if (tomorrowPattern !== null) {
            // tomorrow
            let tomorrowDate = new Date(
                serverDate[1] + '/' + serverDate[0] + '/' + serverDate[2]
            );
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            dateLand =
                ('0' + tomorrowDate.getDate()).slice(-2) +
                '/' +
                ('0' + (tomorrowDate.getMonth() + 1)).slice(-2) +
                '/' +
                tomorrowDate.getFullYear() +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else {
            // on
            let on = timeLand.match(/\d+.\d+/)[0].split('.');
            dateLand =
                on[0] +
                '/' +
                on[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        }

        return dateLand;
    },
    getTravelTimeInSecond: function (distance, unitSpeed) {
        let travelTime = distance * unitSpeed * 60;
        if (travelTime % 1 > 0.5) {
            return (travelTime += 1);
        } else {
            return travelTime;
        }
    },
    getTribeMembersById: function (tribeIds, players) {
        const tribeMemberIds = [];
        players.forEach((player) => {
            if (tribeIds.includes(parseInt(player[2]))) {
                tribeMemberIds.push(parseInt(player[0]));
            }
        });
        return tribeMemberIds;
    },
    getTroop: function (unit) {
        return parseInt(
            document.units[unit].parentNode
                .getElementsByTagName('a')[1]
                .innerHTML.match(/\d+/),
            10
        );
    },
    getVillageBuildings: function () {
        const buildings = game_data.village.buildings;
        const villageBuildings = [];

        for (let [key, value] of Object.entries(buildings)) {
            if (value > 0) {
                villageBuildings.push({
                    building: key,
                    level: value,
                });
            }
        }

        return villageBuildings;
    },
    getWorldConfig: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('world_config_last_updated') ?? 0;
        let worldConfig = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.worldInfoInterface,
                });
                worldConfig = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'world_config',
                    JSON.stringify(worldConfig)
                );
                localStorage.setItem(
                    'world_config_last_updated',
                    Date.parse(new Date())
                );
            } else {
                worldConfig = JSON.parse(localStorage.getItem('world_config'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.worldInfoInterface,
            });
            worldConfig = this.xml2json(jQuery(response));
            localStorage.setItem('world_config', JSON.stringify(unitInfo));
            localStorage.setItem(
                'world_config_last_updated',
                Date.parse(new Date())
            );
        }

        return worldConfig;
    },
    getWorldUnitInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('units_info_last_updated') ?? 0;
        let unitInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.unitInfoInterface,
                });
                unitInfo = this.xml2json(jQuery(response));
                localStorage.setItem('units_info', JSON.stringify(unitInfo));
                localStorage.setItem(
                    'units_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                unitInfo = JSON.parse(localStorage.getItem('units_info'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.unitInfoInterface,
            });
            unitInfo = this.xml2json(jQuery(response));
            localStorage.setItem('units_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'units_info_last_updated',
                Date.parse(new Date())
            );
        }

        return unitInfo;
    },
    groupArrayByProperty: function (array, property, filter) {
        return array.reduce(function (accumulator, object) {
            // get the value of our object(age in our case) to use for group    the array as the array key
            const key = object[property];
            // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            // add the value to the array
            accumulator[key].push(object[filter]);
            // return the transformed array
            return accumulator;
            // Also we also set the initial value of reduce() to an empty object
        }, {});
    },
    isArcherWorld: function () {
        return this.units.includes('archer');
    },
    isChurchWorld: function () {
        return 'church' in this.village.buildings;
    },
    isPaladinWorld: function () {
        return this.units.includes('knight');
    },
    isWatchTowerWorld: function () {
        return 'watchtower' in this.village.buildings;
    },
    loadJS: function (url, callback) {
        let scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.onload = callback;
        scriptTag.onreadystatechange = callback;
        document.body.appendChild(scriptTag);
    },
    redirectTo: function (location) {
        window.location.assign(game_data.link_base_pure + location);
    },
    removeDuplicateObjectsFromArray: function (array, prop) {
        return array.filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    },
    renderBoxWidget: function (body, id, mainClass, customStyle) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-box-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(this.scriptData.name)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(this.scriptData.name)} ${
            this.scriptData.version
        }
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
            </div>
            <style>
                .${mainClass} { position: relative; display: block; width: 100%; height: auto; clear: both; margin: 10px 0 15px; border: 1px solid #603000; box-sizing: border-box; background: #f4e4bc; }
                .${mainClass} * { box-sizing: border-box; }
                .${mainClass} > div { padding: 10px; }
                .${mainClass} .btn-confirm-yes { padding: 3px; }
                .${mainClass}-header { display: flex; align-items: center; justify-content: space-between; background-color: #c1a264 !important; background-image: url(/graphic/screen/tableheader_bg3.png); background-repeat: repeat-x; }
                .${mainClass}-header h3 { margin: 0; padding: 0; line-height: 1; }
                .${mainClass}-body p { font-size: 14px; }
                .${mainClass}-body label { display: block; font-weight: 600; margin-bottom: 6px; }
                
                ${globalStyle}

                /* Custom Style */
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            jQuery('#contentContainer').prepend(content);
            jQuery('#mobileContent').prepend(content);
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    renderFixedWidget: function (
        body,
        id,
        mainClass,
        customStyle,
        width,
        customName = this.scriptData.name
    ) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-fixed-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(customName)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(customName)} ${this.scriptData.version}
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
                <a class="popup_box_close custom-close-button" href="#">&nbsp;</a>
            </div>
            <style>
                .${mainClass} { position: fixed; top: 10vw; right: 10vw; z-index: 99999; border: 2px solid #7d510f; border-radius: 10px; padding: 10px; width: ${
            width ?? '360px'
        }; overflow-y: auto; padding: 10px; background: #e3d5b3 url('/graphic/index/main_bg.jpg') scroll right top repeat; }
                .${mainClass} * { box-sizing: border-box; }

                ${globalStyle}

                /* Custom Style */
                .custom-close-button { right: 0; top: 0; }
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            if (mobiledevice) {
                jQuery('#content_value').prepend(content);
            } else {
                jQuery('#contentContainer').prepend(content);
                jQuery(`#${id}`).draggable({
                    cancel: '.ra-table, input, textarea, button, select, option',
                });

                jQuery(`#${id} .custom-close-button`).on('click', function (e) {
                    e.preventDefault();
                    jQuery(`#${id}`).remove();
                });
            }
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    scriptInfo: function (scriptData = this.scriptData) {
        return `[${scriptData.name} ${scriptData.version}]`;
    },
    secondsToHms: function (timestamp) {
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - hours * 60;
        const seconds = timestamp % 60;
        return (
            hours.toString().padStart(2, '0') +
            ':' +
            minutes.toString().padStart(2, '0') +
            ':' +
            seconds.toString().padStart(2, '0')
        );
    },
    setUpdateProgress: function (elementToUpdate, valueToSet) {
        jQuery(elementToUpdate).text(valueToSet);
    },
    sortArrayOfObjectsByKey: function (array, key) {
        return array.sort((a, b) => b[key] - a[key]);
    },
    startProgressBar: function (total) {
        const width = jQuery('#content_value')[0].clientWidth;
        const preloaderContent = `
            <div id="progressbar" class="progress-bar" style="margin-bottom:12px;">
                <span class="count label">0/${total}</span>
                <div id="progress">
                    <span class="count label" style="width: ${width}px;">
                        0/${total}
                    </span>
                </div>
            </div>
        `;

        if (this.isMobile) {
            jQuery('#content_value').eq(0).prepend(preloaderContent);
        } else {
            jQuery('#contentContainer').eq(0).prepend(preloaderContent);
        }
    },
    sumOfArrayItemValues: function (array) {
        return array.reduce((a, b) => a + b, 0);
    },
    randomItemPickerString: function (items, splitter = ' ') {
        const itemsArray = items.split(splitter);
        const chosenIndex = Math.floor(Math.random() * itemsArray.length);
        return itemsArray[chosenIndex];
    },
    randomItemPickerArray: function (items) {
        const chosenIndex = Math.floor(Math.random() * items.length);
        return items[chosenIndex];
    },
    timeAgo: function (seconds) {
        var interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' Y';

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' M';

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' D';

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' H';

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' m';

        return Math.floor(seconds) + ' s';
    },
    tt: function (string) {
        if (this.translations[game_data.locale] !== undefined) {
            return this.translations[game_data.locale][string];
        } else {
            return this.translations['en_DK'][string];
        }
    },
    toggleUploadButtonStatus: function (elementToToggle) {
        jQuery(elementToToggle).attr('disabled', (i, v) => !v);
    },
    updateProgress: function (elementToUpate, itemsLength, index) {
        jQuery(elementToUpate).text(`${index}/${itemsLength}`);
    },
    updateProgressBar: function (index, total) {
        jQuery('#progress').css('width', `${((index + 1) / total) * 100}%`);
        jQuery('.count').text(`${index + 1}/${total}`);
        if (index + 1 == total) {
            jQuery('#progressbar').fadeOut(1000);
        }
    },
    xml2json: function ($xml) {
        let data = {};
        const _self = this;
        $.each($xml.children(), function (i) {
            let $this = $(this);
            if ($this.children().length > 0) {
                data[$this.prop('tagName')] = _self.xml2json($this);
            } else {
                data[$this.prop('tagName')] = $.trim($this.text());
            }
        });
        return data;
    },
    worldDataAPI: async function (entity) {
        const TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour
        const LAST_UPDATED_TIME = localStorage.getItem(
            `${entity}_last_updated`
        );

        // check if entity is allowed and can be fetched
        const allowedEntities = ['village', 'player', 'ally', 'conquer'];
        if (!allowedEntities.includes(entity)) {
            throw new Error(`Entity ${entity} does not exist!`);
        }

        // initial world data
        const worldData = {};

        const dbConfig = {
            village: {
                dbName: 'villagesDb',
                dbTable: 'villages',
                key: 'villageId',
                url: twSDK.worldDataVillages,
            },
            player: {
                dbName: 'playersDb',
                dbTable: 'players',
                key: 'playerId',
                url: twSDK.worldDataPlayers,
            },
            ally: {
                dbName: 'tribesDb',
                dbTable: 'tribes',
                key: 'tribeId',
                url: twSDK.worldDataTribes,
            },
            conquer: {
                dbName: 'conquerDb',
                dbTable: 'conquer',
                key: '',
                url: twSDK.worldDataConquests,
            },
        };

        // Helpers: Fetch entity data and save to localStorage
        const fetchDataAndSave = async () => {
            const DATA_URL = dbConfig[entity].url;

            try {
                // fetch data
                const response = await jQuery.ajax(DATA_URL);
                const data = twSDK.csvToArray(response);
                let responseData = [];

                // prepare data to be saved in db
                switch (entity) {
                    case 'village':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    villageName: twSDK.cleanString(item[1]),
                                    villageX: item[2],
                                    villageY: item[3],
                                    playerId: parseInt(item[4]),
                                    villagePoints: parseInt(item[5]),
                                    villageType: parseInt(item[6]),
                                };
                            });
                        break;
                    case 'player':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    playerId: parseInt(item[0]),
                                    playerName: twSDK.cleanString(item[1]),
                                    tribeId: parseInt(item[2]),
                                    villages: parseInt(item[3]),
                                    points: parseInt(item[4]),
                                    rank: parseInt(item[5]),
                                };
                            });
                        break;
                    case 'ally':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    tribeId: parseInt(item[0]),
                                    tribeName: twSDK.cleanString(item[1]),
                                    tribeTag: twSDK.cleanString(item[2]),
                                    players: parseInt(item[3]),
                                    villages: parseInt(item[4]),
                                    points: parseInt(item[5]),
                                    allPoints: parseInt(item[6]),
                                    rank: parseInt(item[7]),
                                };
                            });
                        break;
                    case 'conquer':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    unixTimestamp: parseInt(item[1]),
                                    newPlayerId: parseInt(item[2]),
                                    newPlayerId: parseInt(item[3]),
                                    oldTribeId: parseInt(item[4]),
                                    newTribeId: parseInt(item[5]),
                                    villagePoints: parseInt(item[6]),
                                };
                            });
                        break;
                    default:
                        return [];
                }

                // save data in db
                saveToIndexedDbStorage(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable,
                    dbConfig[entity].key,
                    responseData
                );

                // update last updated localStorage item
                localStorage.setItem(
                    `${entity}_last_updated`,
                    Date.parse(new Date())
                );

                return responseData;
            } catch (error) {
                throw Error(`Error fetching ${DATA_URL}`);
            }
        };

        // Helpers: Save to IndexedDb storage
        async function saveToIndexedDbStorage(dbName, table, keyId, data) {
            const dbConnect = indexedDB.open(dbName);

            dbConnect.onupgradeneeded = function () {
                const db = dbConnect.result;
                if (keyId.length) {
                    db.createObjectStore(table, {
                        keyPath: keyId,
                    });
                } else {
                    db.createObjectStore(table, {
                        autoIncrement: true,
                    });
                }
            };

            dbConnect.onsuccess = function () {
                const db = dbConnect.result;
                const transaction = db.transaction(table, 'readwrite');
                const store = transaction.objectStore(table);
                store.clear(); // clean store from items before adding new ones

                data.forEach((item) => {
                    store.put(item);
                });

                UI.SuccessMessage('Database updated!');
            };
        }

        // Helpers: Read all villages from indexedDB
        function getAllData(dbName, table) {
            return new Promise((resolve, reject) => {
                const dbConnect = indexedDB.open(dbName);

                dbConnect.onsuccess = () => {
                    const db = dbConnect.result;

                    const dbQuery = db
                        .transaction(table, 'readwrite')
                        .objectStore(table)
                        .getAll();

                    dbQuery.onsuccess = (event) => {
                        resolve(event.target.result);
                    };

                    dbQuery.onerror = (event) => {
                        reject(event.target.error);
                    };
                };

                dbConnect.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }

        // Helpers: Transform an array of objects into an array of arrays
        function objectToArray(arrayOfObjects, entity) {
            switch (entity) {
                case 'village':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.villageName,
                        item.villageX,
                        item.villageY,
                        item.playerId,
                        item.villagePoints,
                        item.villageType,
                    ]);
                case 'player':
                    return arrayOfObjects.map((item) => [
                        item.playerId,
                        item.playerName,
                        item.tribeId,
                        item.villages,
                        item.points,
                        item.rank,
                    ]);
                case 'ally':
                    return arrayOfObjects.map((item) => [
                        item.tribeId,
                        item.tribeName,
                        item.tribeTag,
                        item.players,
                        item.villages,
                        item.points,
                        item.allPoints,
                        item.rank,
                    ]);
                case 'conquer':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.unixTimestamp,
                        item.newPlayerId,
                        item.newPlayerId,
                        item.oldTribeId,
                        item.newTribeId,
                        item.villagePoints,
                    ]);
                default:
                    return [];
            }
        }

        // decide what to do based on current time and last updated entity time
        if (LAST_UPDATED_TIME !== null) {
            if (
                Date.parse(new Date()) >=
                parseInt(LAST_UPDATED_TIME) + TIME_INTERVAL
            ) {
                worldData[entity] = await fetchDataAndSave();
            } else {
                worldData[entity] = await getAllData(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable
                );
            }
        } else {
            worldData[entity] = await fetchDataAndSave();
        }

        // transform the data so at the end an array of array is returned
        worldData[entity] = objectToArray(worldData[entity], entity);

        return worldData[entity];
    },
    zeroPad: function (num, count) {
        var numZeropad = num + '';
        while (numZeropad.length < count) {
            numZeropad = '0' + numZeropad;
        }
        return numZeropad;
    },

    // initialize library
    init: async function (scriptConfig) {
        const {
            scriptData,
            translations,
            allowedMarkets,
            allowedScreens,
            allowedModes,
            isDebug,
            enableCountApi,
        } = scriptConfig;

        this.scriptData = scriptData;
        this.translations = translations;
        this.allowedMarkets = allowedMarkets;
        this.allowedScreens = allowedScreens;
        this.allowedModes = allowedModes;
        this.enableCountApi = enableCountApi;
        this.isDebug = isDebug;

        twSDK._initDebug();
    },
};

(async function () {
    // Initialize Library
    await twSDK.init(scriptConfig);
    const scriptInfo = twSDK.scriptInfo();
    const gameScreen = twSDK.getParameterByName('screen');
    const gameMode = twSDK.getParameterByName('mode');
    const screenType = twSDK.getParameterByName('type');
    const id = twSDK.getParameterByName('id');

    const hcPopAmount = HC_AMOUNT ?? twSDK.unitsFarmSpace['heavy']; // HC_AMOUNT is provided by the player

    // Entry point
    (function () {
        if (
            gameScreen === 'overview_villages' &&
            gameMode === 'units' &&
            screenType === 'away_detail'
        ) {
            initSupportUnitsScreen();
        } else if (gameScreen === 'map') {
            initMapScreen();
        } else if (gameScreen === 'info_village' && id) {
            initSingleVillageScreen();
        } else {
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            twSDK.redirectTo(
                'overview_villages&mode=units&type=away_detail&group=0&page=-1&filter_villages=1'
            );
        }
    })();

    // Initialize script logic for overview units screen
    function initSupportUnitsScreen() {
        //build the user interface
        const support = calculateSupport(jQuery('#units_table'));
        const sortedSupport = sortSupportByPop(support);
        const content = buildSupportTable(sortedSupport);

        const customStyle = `
                .ra-support-counter-box { display: block; margin-bottom: 8px; border: 1px solid #c59349; }
                .ra-support-counter-box:last-child { margin-bottom: 0; }
                .ra-support-counter-box h3 { user-select: none; font-weight: normal; margin: 0; padding: 5px; font-size: 14px; background-color: #ddc390 !important; position: relative; cursor: pointer; }
                .ra-player-support-table { padding: 5px; display: none; }
                .ra-player-support-table .ra-mb5 { margin-bottom: 5px; }
                .ra-player-support-table .ra-mb5:last-child { margin-bottom: 0 !important; }
                .ra-table-v2 th { background-image: none !important; }

                .ra-table-v3 { border-width: 1px; }
                .ra-table-v3 th { background-image: none; }

                .ra-main-table td { padding: 0; }

                .ra-villages-table tr:nth-of-type(2n) td { background-color: #f0e2be; padding: 5px; }
                .ra-villages-table tr:nth-of-type(2n+1) td { background-color: #fff5da; padding: 5px; }
                .ra-villages-table tfoot td { background-color: #c1a264 !important; }

                .ra-toggle-icon { float: right; }
                .ra-mr15 { margin-right: 15px; }
                .ra-red { color: #ff0000; }
                .ra-hidden { color: #b19661; }
                .btn-confirm-yes { padding: 3px; }
            `;

        twSDK.renderBoxWidget(
            content,
            'raSupportCounterEvolved',
            'ra-support-counter-evolved',
            customStyle
        );

        // register user actions
        toggleSupportBoxes();
        handleWithdrawSupport();
        handleMassWithdrawSupport();
    }

    // Initialize script logic for map screen
    async function initMapScreen() {
        const supports = await fetchSupportsData();
        const villages = extractCoordinatesAndSupport(supports);
        const mapVillagesTable = buildMapVillagesTable(villages);

        const content = `
                <div class="ra-mb15 ra-table-container">
                    ${mapVillagesTable}
                </div>
            `;

        twSDK.renderFixedWidget(
            content,
            'raSupportCounterEvolved',
            'ra-support-counter-evolved'
        );

        updateMap(villages);
    }

    // Initialize script logic for single village screen
    function initSingleVillageScreen() {
        const unitAmountHtml = buildUnitAmountSelector();

        // build user interface
        const content = `
                <div class="ra-mb15">
                    ${buildUnitsChoserTable()}
                </div>
                <div class="ra-mb15">
                    <table class="ra-table ra-table-v3" width="100%">
                        <tbody>
                            <tr id="raCallBackByPercentage">
                                <td>
                                    <label class="ra-label">
                                        ${twSDK.tt(
                                            'Amount of troops to call back in %'
                                        )}
                                    </label>
                                </td>
                                <td>
                                    <input type="text" class="ra-input" value="0" id="raAmountToCallBack" />
                                    <span class="ra-hint">${twSDK.tt(
                                        '(example 20 for 20%)'
                                    )}</span>
                                </td>
                            </tr>
                            <tr id="raCallBackByUnitAmounts" style="display:none;">
                                <td>
                                    ${unitAmountHtml}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <label for="raToggleCallBackMethod" class="ra-label">
                                        <input type="checkbox" id="raToggleCallBackMethod"> ${twSDK.tt(
                                            'Toggle call back by unit amounts'
                                        )}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <a href="javascript:void(0);" id="raSelectAmountOfUnitsBtn" class="btn">
                                        ${twSDK.tt('Fill Units')}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;

        const customStyle = `
                .ra-label { font-weight: 600; }
                .ra-input { padding: 5px; font-size: 14px; margin: 6px 0 3px; }
                .ra-hint { display: block; font-size: 12px; color: #999; }
                .ra-unit-picker-table th { padding: 0; }
                .ra-unit-picker-table label { cursor: pointer; display: block; padding: 5px !important; }
                .ra-unit { width: 35px; }
                .ra-label { font-weight: normal; cursor: pointer; }
            `;

        twSDK.renderFixedWidget(
            content,
            'raSupportCounterEvolved',
            'ra-support-counter-evolved',
            customStyle,
            '580px'
        );

        setTimeout(() => {
            const amount =
                localStorage.getItem(
                    `${scriptConfig.scriptData.prefix}_amount`
                ) ?? 0;
            if (amount) {
                jQuery('#raAmountToCallBack').val(amount);
            }
        }, 10);

        // show total unit amounts
        showTotalUnitAmounts();

        // register user action handlers
        handleFillUnits();
        handleCallBackMethod();
        handleUnitChoserToggle();
    }

    // Action Handler: Toggle player expandable widget
    function toggleSupportBoxes() {
        jQuery('.ra-support-counter-toggle').on('click', function () {
            jQuery(this)
                .parent()
                .find('> .ra-player-support-table')
                .slideToggle(50);
            const toggleIcon = jQuery(this).find('> .ra-toggle-icon img');
            const toggleIconSrc = jQuery(toggleIcon).attr('src');
            if (toggleIconSrc === '/graphic/minus.webp') {
                jQuery(toggleIcon).attr('src', '/graphic/plus.webp');
            } else {
                jQuery(toggleIcon).attr('src', '/graphic/minus.webp');
            }
        });
    }

    // Action Handler: Withdraw support
    function handleWithdrawSupport() {
        jQuery('.ra-btn-withdraw-support').on('click', function (e) {
            e.preventDefault();

            jQuery(this).addClass('btn-confirm-yes');

            const villageName = jQuery(this)
                .parent()
                .parent()
                .find('.ra-village-link')
                .text()
                .trim();

            let atLeastOneWasFound = 0;
            jQuery('.village_anchor a').each(function () {
                const currentVillageName = jQuery(this).text().trim();

                if (villageName === currentVillageName) {
                    const foundName = jQuery(this)
                        .parent()
                        .parent()
                        .find('.village_checkbox')
                        .attr('name');

                    if (foundName) {
                        jQuery(this)
                            .parent()
                            .parent()
                            .find(`input[type="checkbox"][name="${foundName}"]`)
                            .prop('checked', true);
                        atLeastOneWasFound++;
                    }
                }
            });

            if (atLeastOneWasFound) {
                UI.SuccessMessage(
                    `${atLeastOneWasFound} ${twSDK.tt('supports selected')}`
                );
                setTimeout(function () {
                    jQuery('form#overview_form').submit();
                }, 500);
            }
        });
    }

    // Action Handler: Mass withdraw support
    function handleMassWithdrawSupport() {
        jQuery('.ra-btn-mass-withraw-support').on('click', function (e) {
            e.preventDefault();

            jQuery(this).addClass('btn-confirm-yes');

            const villagesToSelect = [];

            jQuery(this)
                .closest('.ra-villages-table')
                .find('tbody > tr')
                .each(function () {
                    const currentVillageName = jQuery(this)
                        .find('.ra-village-link')
                        .text()
                        .trim();

                    villagesToSelect.push(currentVillageName);
                });

            let atLeastOneWasFound = 0;
            jQuery('.village_anchor a').each(function () {
                const currentVillageName = jQuery(this).text().trim();

                if (villagesToSelect.includes(currentVillageName)) {
                    const foundName = jQuery(this)
                        .parent()
                        .parent()
                        .find('.village_checkbox')
                        .attr('name');

                    if (foundName) {
                        jQuery(this)
                            .parent()
                            .parent()
                            .find(`input[type="checkbox"][name="${foundName}"]`)
                            .prop('checked', true);
                        atLeastOneWasFound++;
                    }
                }
            });

            if (atLeastOneWasFound) {
                UI.SuccessMessage(
                    `${atLeastOneWasFound} ${twSDK.tt('supports selected')}`
                );
                setTimeout(function () {
                    jQuery('form#overview_form').submit();
                }, 500);
            }
        });
    }

    // Action Handler: Fill units
    function handleFillUnits() {
        jQuery('#raSelectAmountOfUnitsBtn').on('click', function (e) {
            e.preventDefault();

            jQuery('.troop-request-selector-all').prop('checked', false);
            jQuery('.troop-request-selector-all').trigger('change');

            const isUnitAmountCallBackActive = jQuery(
                '#raToggleCallBackMethod'
            ).is(':checked');
            const amount = +jQuery('#raAmountToCallBack').val();

            const chosenUnits = [];
            jQuery('.ra-unit-selector').each(function () {
                if (jQuery(this).is(':checked')) {
                    chosenUnits.push(this.value);
                }
            });

            localStorage.setItem(
                `${scriptConfig.scriptData.prefix}_chosen_units`,
                JSON.stringify(chosenUnits)
            );

            if (isUnitAmountCallBackActive) {
                const villageUnitsTotals = getSingleVillageUnitTotals();
                let unitAmounts = {};

                jQuery('.ra-unit').each(function () {
                    const unitAmount = parseInt(jQuery(this).val());
                    const unitType = jQuery(this)
                        .attr('name')
                        .split('unit_')[1];
                    if (unitAmount > 0) {
                        unitAmounts = {
                            ...unitAmounts,
                            [unitType]: unitAmount,
                        };
                    }
                });

                let canCallBack = true;
                for (let [key, value] of Object.entries(unitAmounts)) {
                    if (villageUnitsTotals[key] < value) {
                        canCallBack = false;
                    }
                }

                if (canCallBack) {
                    const ownDefRows = jQuery(
                        `.troop-request-selector[name^="withdraw_unit"]`
                    ).length;
                    const outsideDefRows = jQuery(
                        `.troop-request-selector[name^="send_back"]`
                    ).length;

                    let unitFieldAmounts = {};
                    chosenUnits.forEach((unit) => {
                        const unitFieldAmount = jQuery(
                            `.unit-item-${unit}`
                        ).not('.hidden').length;
                        unitFieldAmounts = {
                            ...unitFieldAmounts,
                            [unit]: unitFieldAmount,
                        };
                    });

                    jQuery(
                        '#withdraw_selected_units_village_info tbody tr'
                    ).each(function (_, tableRow) {
                        const isOwnSupport =
                            jQuery(tableRow).find('td:eq(0) a').length;
                        if (isOwnSupport === 1) {
                            jQuery(tableRow)
                                .find('.troop-request-selector')
                                .prop('checked', true);
                            jQuery(tableRow)
                                .find('.troop-request-selector')
                                .trigger('change');

                            jQuery(tableRow)
                                .find('td.has-input')
                                .not('.hidden')
                                .each(function () {
                                    const unit = jQuery(this).attr('id');
                                    if (chosenUnits.includes(unit)) {
                                        jQuery(this)
                                            .find('.call-unit-box')
                                            .val(
                                                Math.ceil(
                                                    unitAmounts[unit] /
                                                        (unitFieldAmounts[
                                                            unit
                                                        ] -
                                                            outsideDefRows)
                                                )
                                            );
                                    } else {
                                        jQuery(this)
                                            .find('.call-unit-box')
                                            .val(0);
                                    }
                                });
                        }
                    });
                } else {
                    UI.ErrorMessage(twSDK.tt('Invalid input!'));
                }
            } else {
                if (!Number.isInteger(amount)) {
                    UI.ErrorMessage(twSDK.tt('Invalid amount!'));
                    jQuery('#raAmountToCallBack').val(0);
                    return;
                }

                if (amount < 0 || amount > 100 || amount === 0) {
                    UI.ErrorMessage(twSDK.tt('Invalid amount!'));
                    jQuery('#raAmountToCallBack').val(0);
                    return;
                }

                localStorage.setItem(
                    `${scriptConfig.scriptData.prefix}_amount`,
                    amount
                );

                jQuery('#withdraw_selected_units_village_info tbody tr').each(
                    function (_, tableRow) {
                        const isOwnSupport =
                            jQuery(tableRow).find('td:eq(0) a').length;
                        if (isOwnSupport === 1) {
                            jQuery(tableRow)
                                .find('.troop-request-selector')
                                .prop('checked', true);
                            jQuery(tableRow)
                                .find('.troop-request-selector')
                                .trigger('change');

                            jQuery(tableRow)
                                .find('td.has-input')
                                .not('.hidden')
                                .each(function () {
                                    const unit = jQuery(this).attr('id');
                                    if (chosenUnits.includes(unit)) {
                                        const unitAmount = parseInt(
                                            jQuery(this)
                                                .find('.call-unit-box')
                                                .val()
                                        );
                                        jQuery(this)
                                            .find('.call-unit-box')
                                            .val(
                                                Math.floor(
                                                    unitAmount * (amount / 100)
                                                )
                                            );
                                    } else {
                                        jQuery(this)
                                            .find('.call-unit-box')
                                            .val(0);
                                    }
                                });
                        }
                    }
                );
            }

            selectionSideEffects();
        });
    }

    // Action Handler: Toggle call back method handler
    function handleCallBackMethod() {
        jQuery('#raToggleCallBackMethod').on('change', function (event) {
            const isChecked = jQuery('#raToggleCallBackMethod').is(':checked');

            if (isChecked) {
                jQuery('#raCallBackByPercentage').hide();
                jQuery('#raCallBackByUnitAmounts').show();
            } else {
                jQuery('#raCallBackByPercentage').show();
                jQuery('#raCallBackByUnitAmounts').hide();
            }
        });
    }

    // Action Handler: Handle user changing the unit selected
    function handleUnitChoserToggle() {
        jQuery('.ra-unit-selector').on('change', function (event) {
            if (event.target.checked) {
                jQuery(`.ra-unit-${event.target.value}`).prop(
                    'disabled',
                    false
                );
            } else {
                jQuery(`.ra-unit-${event.target.value}`).prop('disabled', true);
            }
        });
    }

    // Helper: Build the unit amount selector
    function buildUnitAmountSelector() {
        const storedChosenUnits = JSON.parse(
            localStorage.getItem(
                `${scriptConfig.scriptData.prefix}_chosen_units`
            )
        ) ?? ['spear', 'sword'];

        let unitAmountHtml = `<table width="100%"><tbody><tr>`;

        game_data.units.forEach((unit) => {
            if (unit !== 'militia') {
                unitAmountHtml += `
                    <td>
                        <input class="ra-unit ra-unit-${unit}" ${
                    !storedChosenUnits.includes(unit) ? 'disabled' : ''
                } type="text" name="unit_${unit}">
                    </td>
                `;
            }
        });

        unitAmountHtml += `</tr></tbody></table>`;

        return unitAmountHtml;
    }

    // Helper: Handle side effects of select/deselecting a village
    function selectionSideEffects() {
        // update selected units amount
        const selectedUnitTotals = getSingleVillageUnitTotals('selected');
        const selectedUnitPop = calculatePop(selectedUnitTotals);
        let selectedUnitTotalsHtml = `<th>${twSDK.tt('Selected Units')}</th>`;
        for (let [_, value] of Object.entries(selectedUnitTotals)) {
            selectedUnitTotalsHtml += `
                    <th class="ra-tac ${value ? '' : 'hidden'}">
                        ${twSDK.formatAsNumber(value)}
                    </th>
                `;
        }
        selectedUnitTotalsHtml += `<th>${twSDK.formatAsNumber(
            selectedUnitPop
        )} ${twSDK.tt('pop')}</th></tr>`;
        jQuery('#raSelectedUnitsRow').html(selectedUnitTotalsHtml);

        // update remaining units amount
        const remainingUnitsAmount = getRemainingUnitsAmount();
        const remainingUnitsPop = calculatePop(remainingUnitsAmount);
        let remainingUnitsHtml = `<th>${twSDK.tt('Remaining Units')}</th>`;
        for (let [_, value] of Object.entries(remainingUnitsAmount)) {
            remainingUnitsHtml += `
                    <th class="ra-tac ${value ? '' : 'hidden'}">
                        ${twSDK.formatAsNumber(value)}
                    </th>
                `;
        }
        remainingUnitsHtml += `<th>${twSDK.formatAsNumber(
            remainingUnitsPop
        )} ${twSDK.tt('pop')}</th></tr>`;
        jQuery('#raRemainingUnitsRow').html(remainingUnitsHtml);
    }

    // Helper: Get amount of how many units will remain at a village
    function getRemainingUnitsAmount() {
        const totalUnitAmounts = [];
        const selectedUnitAmounts = [];
        let remainingUnitAmounts = {};

        jQuery('#raTotalUnitsRow th').each(function (index, element) {
            if (index !== 0 && jQuery(element).text().trim() !== '') {
                totalUnitAmounts.push(
                    +jQuery(element)
                        .text()
                        .trim()
                        .replace(/.(?=\d{3})/g, '')
                );
            }
        });

        jQuery('#raSelectedUnitsRow th').each(function (index, element) {
            if (index !== 0 && jQuery(element).text().trim() !== '') {
                selectedUnitAmounts.push(
                    +jQuery(element)
                        .text()
                        .trim()
                        .replace(/.(?=\d{3})/g, '')
                );
            }
        });

        game_data.units.forEach((unit, index) => {
            remainingUnitAmounts = {
                ...remainingUnitAmounts,
                [unit]: totalUnitAmounts[index] - selectedUnitAmounts[index],
            };
        });

        return remainingUnitAmounts;
    }

    // Helper: Show total unit amounts on single village screen
    function showTotalUnitAmounts() {
        const villageUnitsTotals = getSingleVillageUnitTotals();
        const population = calculatePop(villageUnitsTotals);

        let newRowHtml = `<tr id="raTotalUnitsRow"><th>${twSDK.tt(
            'Total Units'
        )}</th>`;
        for (let [_, value] of Object.entries(villageUnitsTotals)) {
            newRowHtml += `
                    <th class="ra-tac ${value ? '' : 'hidden'}">
                        ${twSDK.formatAsNumber(value)}
                    </th>
                `;
        }
        newRowHtml += `<th>${twSDK.formatAsNumber(population)} ${twSDK.tt(
            'pop'
        )}</th></tr>`;

        newRowHtml += `
                <tr id="raSelectedUnitsRow">
                    <th>${twSDK.tt('Selected Units')}</th>
                    ${game_data.units.map((unit) => {
                        return `<th class="ra-tac hidden unit-item-${unit}">0</th>`;
                    })}
                    <th>0 ${twSDK.tt('pop')}</th>
                </tr>
            `;

        newRowHtml += `<tr id="raRemainingUnitsRow"><th>${twSDK.tt(
            'Remaining Units'
        )}</th>`;
        for (let [_, value] of Object.entries(villageUnitsTotals)) {
            newRowHtml += `
                    <th class="ra-tac ${value ? '' : 'hidden'}">
                        ${twSDK.formatAsNumber(value)}
                    </th>
                `;
        }
        newRowHtml += `<th>${twSDK.formatAsNumber(population)} ${twSDK.tt(
            'pop'
        )}</th></tr>`;

        jQuery('#withdraw_selected_units_village_info table tbody').append(
            newRowHtml
        );
    }

    // Helper: Get support troop totals on single village screen
    function getSingleVillageUnitTotals(typeOfCollect = 'initial') {
        let villageUnitsTotals = [];

        jQuery('#withdraw_selected_units_village_info tbody tr').each(function (
            index,
            element
        ) {
            let rowsToRemoveCheck = index !== 0 && index !== 1;
            if (index === 1) {
                let isLink = jQuery(element).find('a').length;
                if (isLink === 1) {
                    rowsToRemoveCheck = index !== 0;
                }
            }

            if (rowsToRemoveCheck) {
                let villageUnits = {};
                jQuery(element)
                    .find('td.unit-item')
                    .each(function (_, tableCell) {
                        if (typeOfCollect === 'initial') {
                            const unit = jQuery(tableCell).attr('id');
                            const amount = jQuery(tableCell).text().trim();

                            villageUnits = {
                                ...villageUnits,
                                [unit]: parseInt(amount) ?? 0,
                            };
                        }

                        if (typeOfCollect === 'selected') {
                            const unit = jQuery(tableCell).attr('id');
                            const amount = jQuery(tableCell)
                                .find('input[type="number"')
                                .val();

                            villageUnits = {
                                ...villageUnits,
                                [unit]: parseInt(amount) || 0,
                            };
                        }
                    });

                villageUnitsTotals.push(villageUnits);
            }
        });

        villageUnitsTotals = villageUnitsTotals.filter(
            (item) => Object.keys(item).length !== 0
        );

        return getTotalHomeTroops(villageUnitsTotals);
    }

    // Helper: Get total home troops
    function getTotalHomeTroops(homeTroops) {
        let totalTroopsAtHome = {
            spear: 0,
            sword: 0,
            axe: 0,
            archer: 0,
            spy: 0,
            light: 0,
            marcher: 0,
            heavy: 0,
            ram: 0,
            catapult: 0,
            knight: 0,
            snob: 0,
            militia: 0,
        };

        for (const obj of homeTroops) {
            totalTroopsAtHome.spear += obj.spear;
            totalTroopsAtHome.sword += obj.sword;
            totalTroopsAtHome.axe += obj.axe;
            totalTroopsAtHome.archer += obj.archer;
            totalTroopsAtHome.spy += obj.spy;
            totalTroopsAtHome.light += obj.light;
            totalTroopsAtHome.marcher += obj.marcher;
            totalTroopsAtHome.heavy += obj.heavy;
            totalTroopsAtHome.ram += obj.ram;
            totalTroopsAtHome.catapult += obj.catapult;
            totalTroopsAtHome.knight += obj.knight;
            totalTroopsAtHome.snob += obj.snob;
            totalTroopsAtHome.militia += obj.militia;
        }

        // handle non-archer worlds
        if (!game_data.units.includes('archer')) {
            delete totalTroopsAtHome['archer'];
            delete totalTroopsAtHome['marcher'];
        }

        // handle non-paladin worlds
        if (!game_data.units.includes('knight')) {
            delete totalTroopsAtHome['knight'];
        }

        return totalTroopsAtHome;
    }

    // Helper: Build the table that shows village supports on map
    function buildMapVillagesTable(villages) {
        let mapVillagesTableHtml = `
                <table class="ra-table ra-table-v3" width="100%">
                    <thead>
                        <tr>
                            <th class="ra-tac">
                                ${twSDK.tt('Village')}
                            </th>
                            <th>
                                ${twSDK.tt('Population')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
            `;

        villages.forEach((village) => {
            const { coordinate, pop } = village;
            const [x, y] = coordinate.split('|');

            mapVillagesTableHtml += `
                    <tr>
                        <td class="ra-tac">
                            <a href="javascript:TWMap.focus(${x}, ${y})">
                                ${coordinate}
                            </a>
                        </td>
                        <td>
                            ${twSDK.formatAsNumber(pop)}
                        </td>
                    </tr>
                `;
        });

        mapVillagesTableHtml += '</tbody></table>';

        return mapVillagesTableHtml;
    }

    // Helper: Fetch supports data
    async function fetchSupportsData() {
        const supportsUrl =
            game_data.link_base_pure +
            `overview_villages&mode=units&type=away_detail&group=${game_data.group_id}&page=-1&filter_villages=1`;

        UI.InfoMessage(twSDK.tt('Fetching support data ...'));

        try {
            const villageEffects = await jQuery
                .get(supportsUrl)
                .then((response) => {
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(
                        response,
                        'text/html'
                    );

                    const tableRows = jQuery(htmlDoc).find('#units_table');
                    const data = calculateSupport(tableRows);
                    return data;
                });

            return villageEffects;
        } catch (error) {
            UI.ErrorMessage(
                twSDK.tt('There was an error fetching supports data!')
            );
            console.error(`${scriptInfo} Error: `, error);
        }
    }

    // Helper: Sort support by population
    function sortSupportByPop(support) {
        let sortedSupport = {};
        const sortedSupportArray = [];

        for (let [key, value] of Object.entries(support)) {
            sortedSupportArray.push({
                type: key,
                ...value,
            });
        }

        sortedSupportArray.sort((a, b) => {
            return b.pop - a.pop;
        });

        sortedSupportArray.forEach((supportData) => {
            const { type } = supportData;

            sortedSupport[type] = {
                ...supportData,
            };
        });

        return sortedSupport;
    }

    // Helper: Build support table
    function buildSupportTable(support) {
        let supportTableHtml = ``;

        for (let [key, value] of Object.entries(support)) {
            if (value.pop) {
                const { pop } = value;
                switch (key) {
                    case 'own':
                        supportTableHtml += `
                                <div class="ra-support-counter-box">
                                    <h3 class="ra-support-counter-toggle">
                                        <b>
                                            ${twSDK.tt(
                                                'Support in your own villages'
                                            )} (${twSDK.formatAsNumber(
                            pop
                        )} ${twSDK.tt('population')})
                                        </b>
                                        <span class="ra-toggle-icon">
                                            <img src="/graphic/plus.webp">
                                        </span>
                                    </h3>
                                    <div class="ra-player-support-table">
                                        ${buildTableData(value, key)}
                                    </div>
                                </div>
                            `;
                        break;
                    case 'barbs':
                        supportTableHtml += `
                                <div class="ra-support-counter-box">
                                    <h3 class="ra-support-counter-toggle">
                                        <b>
                                            ${twSDK.tt(
                                                'Support in barbarian villages'
                                            )}  (${twSDK.formatAsNumber(
                            pop
                        )} ${twSDK.tt('population')})
                                        </b>
                                        <span class="ra-toggle-icon">
                                            <img src="/graphic/plus.webp">
                                        </span>
                                    </h3>
                                    <div class="ra-player-support-table">
                                        ${buildTableData(value, key)}
                                    </div>
                                </div>
                            `;
                        break;
                    case 'players':
                        supportTableHtml += `
                                <div class="ra-support-counter-box">
                                    <h3 class="ra-support-counter-toggle">
                                        <b>
                                            ${twSDK.tt(
                                                'Support in other players villages'
                                            )}  (${twSDK.formatAsNumber(
                            pop
                        )} ${twSDK.tt('population')})
                                        </b>
                                        <span class="ra-toggle-icon">
                                            <img src="/graphic/plus.webp">
                                        </span>
                                    </h3>
                                    <div class="ra-player-support-table">
                                        ${buildTableData(value, key)}
                                    </div>
                                </div>
                            `;
                        break;
                    default:
                        return;
                }
            }
        }

        return supportTableHtml;
    }

    // Helper: Build table of support by type
    function buildTableData(support, type) {
        let tableData = ``;

        if (type === 'own') {
            const { totalUnits, villages } = support;

            tableData = `
                    <table class="ra-table ra-table-v2 ra-main-table" width="100%"><tbody>
                `;

            tableData += `
                    <tr>
                        <td colspan="2">
                            ${buildVillagesTable(villages, totalUnits)}
                        </td>
                    </tr>
                `;

            tableData += '</tbody></table>';
        }

        if (type === 'players') {
            const { tribes } = support;

            const sortedTribes = sortSupportByPop(tribes);

            let tribesHtml = ``;
            for (let [key, value] of Object.entries(sortedTribes)) {
                const sortedPlayers = sortSupportByPop(value.players);

                tribesHtml += `
                        <div class="ra-mb5">
                            <table class="ra-table ra-table-v2 ra-tribe-table" width="100%">
                                <tbody>
                                    <tr>
                                        <th width="15%" class="ra-tac">
                                            ${
                                                key ||
                                                '<span class="ra-red">N/A</span>'
                                            } (${twSDK.formatAsNumber(
                    value.pop
                )} ${twSDK.tt('pop')})
                                        </th>
                                        <td>
                                            ${buildTribeTroopTotals(
                                                value.totalUnits
                                            )}
                                            ${buildTribePlayersBoxes(
                                                sortedPlayers
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `;
            }

            tableData += `${tribesHtml}`;
        }

        if (type === 'barbs') {
            const { totalUnits, villages } = support;

            tableData = `
                    <table class="ra-table ra-table-v2 ra-main-table" width="100%"><tbody>
                `;

            tableData += `
                    <tr>
                        <td colspan="2">
                            ${buildVillagesTable(villages, totalUnits)}
                        </td>
                    </tr>
                `;

            tableData += '</tbody></table>';
        }

        return tableData;
    }

    // Helper: Build expandable tribe player boxes
    function buildTribePlayersBoxes(players) {
        let playerSupportHtml = ``;

        for (let [player, playerSupport] of Object.entries(players)) {
            const { pop } = playerSupport;

            playerSupportHtml += `
                    <div class="ra-support-counter-box">
                        <h3 class="ra-support-counter-toggle">
                            <b>
                                ${player} (${twSDK.formatAsNumber(
                pop
            )} ${twSDK.tt('pop')})
                            </b>
                            <span class="ra-toggle-icon">
                                <img src="/graphic/plus.webp">
                            </span>
                        </h3>
                        <div class="ra-player-support-table">
                            ${buildTableData(playerSupport, 'own')}
                        </div>
                    </div>
                `;
        }

        return playerSupportHtml;
    }

    // Helper: Build villages table
    function buildVillagesTable(villages, totalUnits) {
        const sortedVillages = sortSupportByPop(villages);

        let gameUnitsHtml = buildTableThUnits();

        let villagesTableHtml = `
                <table class="ra-table ra-table-v3 ra-villages-table" width="100%">
                    <thead>
                        <tr>
                            <th>
                                ${twSDK.tt('Village Name')}
                            </th>
                            ${gameUnitsHtml}
                            <th class="ra-tac">
                                ${twSDK.tt('Action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
            `;

        for (let [key, value] of Object.entries(sortedVillages)) {
            const { units, pop, url } = value;

            villagesTableHtml += `
                    <tr>
                        <td width="33%">
                            <a href="${url}" target="_blank" rel="noreferrer" class="ra-village-link">
                                ${key}
                            </a>
                            (${twSDK.formatAsNumber(pop)} ${twSDK.tt('pop')})
                        </td>
                        ${buildUnits(units)}
                        <td width="10%" class="ra-tac">
                            <a href="javascript:void(0);" class="btn ra-btn-withdraw-support">
                                ${twSDK.tt('Withdraw')}
                            </a>
                        </td>
                    </tr>
                `;
        }

        villagesTableHtml += `
                </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <b>${twSDK.tt('TOTAL')}<b>
                            </td>
                            ${buildUnits(totalUnits)}
                            <td>
                                <a href="javascript:void(0);" class="btn ra-btn-mass-withraw-support">
                                    ${twSDK.tt('Mass Withdraw')}
                                </a>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            `;

        return villagesTableHtml;
    }

    // Helper: Build the th for units with unit icon
    function buildTableThUnits() {
        let gameUnitsHtml = ``;

        game_data.units.forEach((unit) => {
            if (unit !== 'militia') {
                gameUnitsHtml += `
                        <th class="ra-tac">
                            <img src="/graphic/unit/unit_${unit}.webp">
                        </th>
                    `;
            }
        });

        return gameUnitsHtml;
    }

    // Helper: Build tribe total units
    function buildTribeTroopTotals(totalUnits, type = 'string') {
        let tribeTroopsHtml = ``;

        if (type === 'table') {
            let thCells = ``;
            let tdCells = ``;

            game_data.units.forEach((unit) => {
                if (unit !== 'militia') {
                    thCells += `
                            <th class="ra-tac">
                                <img src="/graphic/unit/unit_${unit}.webp">
                            </th>
                        `;

                    tdCells += `
                            <td class="ra-tac">
                                ${twSDK.formatAsNumber(totalUnits[unit])}
                            </td>
                        `;
                }
            });

            tribeTroopsHtml = `
                    <div class="ra-mb5">
                        <table class="ra-table ra-table-v3" width="100%">
                            <thead>
                                <tr>
                                    ${thCells}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    ${tdCells}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
        }

        if (type === 'string') {
            tribeTroopsHtml += `<div class="ra-mb10"><b>${twSDK.tt(
                'Total Units'
            )}</b>&nbsp;&nbsp;`;

            game_data.units.forEach((unit) => {
                if (totalUnits[unit]) {
                    tribeTroopsHtml += `<span class="ra-mr15"><b>${unit}</b>: ${twSDK.formatAsNumber(
                        totalUnits[unit]
                    )}</span>`;
                }
            });

            tribeTroopsHtml += `</div>`;
        }

        return tribeTroopsHtml;
    }

    // Helper: Build unit choser table
    function buildUnitsChoserTable() {
        const storedChosenUnits = JSON.parse(
            localStorage.getItem(
                `${scriptConfig.scriptData.prefix}_chosen_units`
            )
        ) ?? ['spear', 'sword'];

        let unitsTable = ``;

        let thUnits = ``;
        let tableRow = ``;

        game_data.units.forEach((unit) => {
            if (unit !== 'militia') {
                let checked = '';
                if (storedChosenUnits.includes(unit)) {
                    checked = `checked`;
                }

                thUnits += `
                        <th class="ra-tac">
                            <label for="unit_${unit}">
                                <img src="/graphic/unit/unit_${unit}.webp">
                            </label>
                        </th>
                    `;

                tableRow += `
                        <td class="ra-tac">
                            <input name="ra_chosen_units" type="checkbox" ${checked} id="unit_${unit}" class="ra-unit-selector" value="${unit}" />
                        </td>
                    `;
            }
        });

        unitsTable = `
                <table class="ra-table ra-table-v3 ra-unit-picker-table" width="100%" id="raUnitSelector">
                    <thead>
                        <tr>
                            ${thUnits}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            ${tableRow}
                        </tr>
                    </tbody>
                </table>
            `;

        return unitsTable;
    }

    // Helper: Build units list from object
    function buildUnits(totalUnits) {
        let totalUnitsHtml = ``;

        for (let [key, value] of Object.entries(totalUnits)) {
            totalUnitsHtml += `
                <td class="ra-tac ${value ? '' : 'ra-hidden'}">
                    ${twSDK.formatAsNumber(value)}
                </td>
            `;
        }

        return totalUnitsHtml;
    }

    // Helper: Collect support
    // https://forum.tribalwars.net/index.php?threads/support-counter.286689/
    function calculateSupport(element) {
        const players = { totalUnits: {}, pop: 0, tribes: {} };
        const barbs = { totalUnits: {}, pop: 0, villages: {} };
        const own = { totalUnits: {}, pop: 0, villages: {} };

        const tableRows = element.find('tbody tr');

        tableRows.each((i, row) => {
            if (jQuery(row).hasClass('units_away')) {
                return;
            }

            const rowData = jQuery(row).find('td').toArray();
            const { text, playerName, tribeName, villageUrl, villageName } =
                parseVillageData(jQuery(rowData.shift()));

            if (!villageName) return;

            let tribe = null;
            let player = null;

            if (!playerName) {
                player = isBarb(text) ? barbs : own;
            } else {
                if (!players.tribes[tribeName]) {
                    players.tribes[tribeName] = {
                        totalUnits: {},
                        pop: 0,
                        players: {},
                    };
                }

                tribe = players.tribes[tribeName];

                if (!tribe.players[playerName]) {
                    tribe.players[playerName] = {
                        totalUnits: {},
                        pop: 0,
                        villages: {},
                    };
                }

                player = tribe.players[playerName];
            }

            if (!player.villages[villageName]) {
                player.villages[villageName] = {
                    units: {},
                    pop: 0,
                    url: villageUrl,
                };
            }

            village = player.villages[villageName];

            //units
            for (let i = 1; i < rowData.length - 1; i++) {
                const unitName = game_data.units[i - 1];
                const unitCount = parseInt(jQuery(rowData[i]).text());
                const unitPopAmount =
                    unitName !== 'heavy'
                        ? twSDK.unitsFarmSpace[unitName]
                        : hcPopAmount;
                const unitPop = unitCount * unitPopAmount;

                if (!player.totalUnits[unitName]) {
                    player.totalUnits[unitName] = 0;
                }

                if (!village.units[unitName]) {
                    village.units[unitName] = 0;
                }

                player.totalUnits[unitName] += unitCount;
                player.pop += unitPop;
                village.units[unitName] += unitCount;
                village.pop += unitPop;

                if (tribe) {
                    if (!players.totalUnits[unitName]) {
                        players.totalUnits[unitName] = 0;
                    }
                    if (!tribe.totalUnits[unitName]) {
                        tribe.totalUnits[unitName] = 0;
                    }
                    players.totalUnits[unitName] += unitCount;
                    tribe.totalUnits[unitName] += unitCount;
                    tribe.pop += unitPop;
                    players.pop += unitPop;
                }
            }
        });

        return { players, own, barbs };
    }

    // Helper: Collect village info
    function parseVillageData(villageData) {
        if (villageData.length === 0) return {};

        const village = jQuery(villageData)
            .find('span.village_anchor > a')
            .first();

        const checkboxName = jQuery(villageData)
            .find('input[type=checkbox]')
            .attr('name');
        const spanId = 'label_text_' + checkboxName.match(/(\d)+/)[0];
        const [player, tribe] = jQuery(
            villageData.find(`#${spanId} > a`)
        ).toArray();

        return {
            text: villageData.text(),
            playerName: jQuery(player).text(),
            tribeName: jQuery(tribe).text(),
            villageUrl: jQuery(village).attr('href'),
            villageName: jQuery(village).text(),
        };
    }

    // Helper: Extract list of villages and support on each village
    function extractCoordinatesAndSupport(supports) {
        const villagesData = [];

        for (let [, value] of Object.entries(supports)) {
            const { tribes, villages } = value;

            if (tribes) {
                for (let [, tribe] of Object.entries(tribes)) {
                    const { players } = tribe;
                    for (let [, player] of Object.entries(players)) {
                        const { villages } = player;
                        for (let [villageName, village] of Object.entries(
                            villages
                        )) {
                            const coordinate = villageName.match(
                                twSDK.coordsRegex
                            )[0];
                            villagesData.push({
                                coordinate: coordinate,
                                pop: village.pop,
                            });
                        }
                    }
                }
            }

            if (villages) {
                for (let [villageName, village] of Object.entries(villages)) {
                    const coordinate = villageName.match(twSDK.coordsRegex)[0];
                    villagesData.push({
                        coordinate: coordinate,
                        pop: village.pop,
                    });
                }
            }
        }

        villagesData.sort((a, b) => b.pop - a.pop);

        return villagesData;
    }

    // Helper: Update the map UI
    function updateMap(villages) {
        const villageCoords = villages.map((village) => village.coordinate);
        // Show wall level of barbarian villages on the Map
        if (mapOverlay.mapHandler._spawnSector) {
            //exists already, don't recreate
        } else {
            //doesn't exist yet
            mapOverlay.mapHandler._spawnSector =
                mapOverlay.mapHandler.spawnSector;
        }

        TWMap.mapHandler.spawnSector = function (data, sector) {
            // Override Map Sector Spawn
            mapOverlay.mapHandler._spawnSector(data, sector);
            var beginX = sector.x - data.x;
            var endX = beginX + mapOverlay.mapSubSectorSize;
            var beginY = sector.y - data.y;
            var endY = beginY + mapOverlay.mapSubSectorSize;
            for (var x in data.tiles) {
                var x = parseInt(x, 10);
                if (x < beginX || x >= endX) {
                    continue;
                }
                for (var y in data.tiles[x]) {
                    var y = parseInt(y, 10);

                    if (y < beginY || y >= endY) {
                        continue;
                    }
                    var xCoord = data.x + x;
                    var yCoord = data.y + y;
                    var v = mapOverlay.villages[xCoord * 1000 + yCoord];
                    if (v) {
                        var vXY = '' + v.xy;
                        var vCoords = vXY.slice(0, 3) + '|' + vXY.slice(3, 6);
                        if (villageCoords.includes(vCoords)) {
                            const currentVillage = villages.find(
                                (obj) => obj.coordinate == vCoords
                            );

                            const villageDef = intToString(currentVillage.pop);

                            const eleDIV = $('<div></div>')
                                .css({
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '2px',
                                    padding: '1px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: '#fff',
                                    width: '50px',
                                    height: '35px',
                                    zIndex: '10',
                                    fontSize: '10px',
                                })
                                .attr('id', 'dsm' + v.id)
                                .html(villageDef);

                            sector.appendElement(
                                eleDIV[0],
                                data.x + x - sector.x,
                                data.y + y - sector.y
                            );
                        }
                    }
                }
            }
        };

        mapOverlay.reload();
    }

    // Helper: Calculate total pop
    function calculatePop(units) {
        let total = 0;

        for (let [key, value] of Object.entries(units)) {
            if (value) {
                const unitPopAmount =
                    key !== 'heavy' ? twSDK.unitsFarmSpace[key] : hcPopAmount;
                total += unitPopAmount * value;
            }
        }

        return total;
    }

    // Helper: Convert 1000 to 1k
    // https://www.html-code-generator.com/javascript/shorten-long-numbers
    function intToString(num) {
        num = num.toString().replace(/[^0-9.]/g, '');
        if (num < 1000) {
            return num;
        }
        let si = [
            { v: 1e3, s: 'K' },
            { v: 1e6, s: 'M' },
            { v: 1e9, s: 'B' },
            { v: 1e12, s: 'T' },
            { v: 1e15, s: 'P' },
            { v: 1e18, s: 'E' },
        ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (
            (num / si[index].v)
                .toFixed(2)
                .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
        );
    }

    // Helper: Check if the village is a barbarian village
    function isBarb(text) {
        return text.search('(---)') !== -1;
    }
})();
