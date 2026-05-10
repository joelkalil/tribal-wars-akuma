/*
 * Script Name: Last Village Growth
 * Version: v1.0.8-akuma.1
 * Last Updated: 2023-06-15
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2021-07-19
 * Mod: JawJaw
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


/*--------------------------------------------------------------------------------------
 * This script can NOT be cloned and modified without permission from the script author.
 --------------------------------------------------------------------------------------*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'lastVillageGrowth',
        name: 'Last Village Growth',
        version: 'v1.0.8-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/last-village-growth.287184/',
    },
    translations: {
        en_DK: {
            'Last Village Growth': 'Last Village Growth',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'There was an error fetching information!':
                'There was an error fetching information!',
            'Script is not allowed to be used on this TW market!':
                'Script is not allowed to be used on this TW market!',
        },
    },
    allowedMarkets: ['en', 'us'],
    allowedScreens: ['map'],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: true,
};

$.getScript(
    `https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/twSDK.js?url=${document.currentScript.src}`,
    async function () {
        // Initialize Library
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();
        const isValidMarket = twSDK.checkValidMarket();
        const isValidScreen = twSDK.checkValidLocation('screen');

        // check if we are on a valid market
        if (!isValidMarket) {
            UI.ErrorMessage(
                twSDK.tt('Script is not allowed to be used on this TW market!')
            );
            return;
        }

        // check if the current screen is valid
        if (!isValidScreen) {
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            twSDK.redirectTo('map');
            return;
        }

        if (typeof TWMap === 'undefined') TWMap = {};
        if ('TWMap' in window) mapOverlay = TWMap;

        const API_ENDPOINT = 'https://red.ibragonza.nl/api/last-village-growth';
        const { market, world, version } = game_data;

        // Script business logic
        (function () {
            let coordinates = collectCoordinatesFromMap();

            jQuery
                .ajax(
                    `${API_ENDPOINT}?market=${market}&world=${world}&version=${version}&coords=${coordinates.join(
                        ','
                    )}`
                )
                .done((response) => {
                    const { error, data } = response;
                    if (error) {
                        UI.ErrorMessage(data);
                        console.error(`${scriptInfo} Error:`, data);
                    } else {
                        const jsonData = JSON.parse(data);
                        updateMap(jsonData);
                        const customStyle = ``;
                        twSDK.renderFixedWidget(
                            '',
                            'raLastVillageGrowth',
                            'ra-last-village-growth',
                            customStyle
                        );
                    }
                })
                .catch((error) => {
                    UI.ErrorMessage(
                        twSDK.tt('There was an error fetching information!')
                    );
                    console.error(`${scriptInfo} Error:`, error);
                });
        })();

        // Helper: Add additional map layer
        function updateMap(mapData) {
            const villageCoords = [];
            const villages = [];

            for (const [_, value] of Object.entries(mapData)) {
                villageCoords.push(value.x + '|' + value.y);
                villages.push(value);
            }

            if (villageCoords.length) {
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
                                var vCoords =
                                    vXY.slice(0, 3) + '|' + vXY.slice(3, 6);
                                if (villageCoords.includes(vCoords)) {
                                    const currentVillage = villages.find(
                                        (obj) => obj.id == v.id
                                    );
                                    let eleDIV = $('<div></div>')
                                        .attr('id', 'dsm' + v.id)
                                        .html(
                                            currentVillage.lasttime +
                                                '<br>' +
                                                currentVillage.lastpoints
                                        )
                                        .css({
                                            position: 'absolute',
                                            width: '50px',
                                            height: '35px',
                                            marginTop: '0',
                                            marginLeft: '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: '10',
                                            fontSize: '10px',
                                            textAlign: 'center',
                                        });

                                    villageMapHighlighter(
                                        eleDIV,
                                        currentVillage.lastpoints
                                    );
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
        }

        // Helper: Collect coordinates from the map
        function collectCoordinatesFromMap() {
            const coordinates = [];
            for (row = 0; row < 30; row++) {
                for (col = 0; col < 30; col++) {
                    coord = TWMap.map.coordByPixel(
                        TWMap.map.pos[0] + TWMap.tileSize[0] * col,
                        TWMap.map.pos[1] + TWMap.tileSize[1] * row
                    );
                    if (TWMap.villages[coord.join('')]) {
                        coordinates.push(coord[0] + '|' + coord[1]);
                    }
                }
            }
            return coordinates;
        }

        // Helper: Highlight differently based on last points growth villages on the map
        function villageMapHighlighter(el, points) {
            const academyPoints = ['+512'];
            const watchTowerPoints = [
                '+90',
                '+108',
                '+130',
                '+155',
                '+186',
                '+224',
            ];
            if (academyPoints.includes(points)) {
                el.css({
                    border: '1px solid #333',
                    backgroundColor: 'rgba(245, 43, 43, 0.9)',
                    color: '#fff',
                    textShadow: '1px 0 #222',
                    fontWeight: 'normal',
                });
            } else if (watchTowerPoints.includes(points)) {
                el.css({
                    border: '1px solid #333',
                    backgroundColor: 'rgba(0, 166, 255, 0.9)',
                    color: '#000',
                    textShadow: '1px 0 #eee',
                    fontWeight: 'bold',
                });
            } else {
                el.css({
                    border: '1px solid #333',
                    backgroundColor: 'rgba(250, 250, 236, 0.7)',
                    color: '#000',
                    textShadow: '1px 0 #eee',
                    fontWeight: 'bold',
                });
            }
        }
    }
);
