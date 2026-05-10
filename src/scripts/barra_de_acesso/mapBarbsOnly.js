/*
 * Script Name: Map Barbs Only
 * Version: v1.1.1-akuma.1
 * Last Updated: 2022-05-04
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14107291
 * Approved Date: 2020-07-26
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

// Globals
var mapOverlay;
if ('TWMap' in window) mapOverlay = TWMap;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'mapBarbsOnly',
        name: 'Map Barbs Only',
        version: 'v1.1.1-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/map-barbs-only.285715/',
    },
    translations: {
        en_DK: {
            'Map Barbs Only': 'Map Barbs Only',
            Help: 'Help',
            'There has been an error!': 'There has been an error!',
            'Redirecting...': 'Redirecting...',
            'Reset Filters': 'Reset Filters',
        },
        pt_PT: {
            'Map Barbs Only': 'Mapa só barbaras',
            Help: 'Ajuda',
            'There has been an error!': 'Houve um erro!',
            'Redirecting...': 'Redirecionando...',
            'Reset Filters': 'Redefinir filtros',
        },
        pt_BR: {
            'Map Barbs Only': 'Mapa só barbaras',
            Help: 'Ajuda',
            'There has been an error!': 'Houve um erro!',
            'Redirecting...': 'Redirecionando...',
            'Reset Filters': 'Redefinir filtros',
        },
    },
    allowedMarkets: [],
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
        const isValidScreen = twSDK.checkValidLocation('screen');

        // Script business logic
        (async function () {
            if (isValidScreen) {
                try {
                    // build UI
                    const content = `
                        <div class="ra-mb15">
                            <a href="javascript:void(0);" id="raResetFiltersBtn" class="btn">
                                ${twSDK.tt('Reset Filters')}
                            </a>
                        </div>
                    `;

                    twSDK.renderFixedWidget(
                        content,
                        'raMapBarbsOnly',
                        'ra-map-barbs-only'
                    );

                    filterBarbs();

                    // register action handlers
                    handleResetFilters();
                } catch (error) {
                    UI.ErrorMessage(twSDK.tt('There has been an error!'));
                    console.error(`${scriptInfo} Error: `, error);
                }
            } else {
                UI.InfoMessage(twSDK.tt('Redirecting...'));
                twSDK.redirectTo('map');
            }
        })();

        // Here is where the filtering starts
        function filterBarbs() {
            mapOverlay.mapHandler._spawnSector =
                mapOverlay.mapHandler.spawnSector;
            TWMap.mapHandler.spawnSector = spawnSectorReplacer;
            mapOverlay.villages = TWMap.villages;

            const villagesData = mapOverlay.villages;

            for (key in villagesData) {
                if (villagesData.hasOwnProperty(key)) {
                    const currentVillage = villagesData[key];
                    doMapFiltering(currentVillage);
                }
            }
        }

        // Override Map Sector Spawn
        function spawnSectorReplacer(data, sector) {
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
                        doMapFiltering(v);
                    }
                }
            }
        }

        // Helper: Filter out villages
        function doMapFiltering(village) {
            if (village.owner != 0) {
                jQuery('#map_container > div:first-child').css({
                    display: 'none',
                });
                jQuery(`[id="map_village_${village.id}"]`).css({
                    display: 'none',
                });
                jQuery(`[id="map_icons_${village.id}"]`).css({
                    display: 'none',
                });
                jQuery(`[id="map_cmdicons_${village.id}_0"]`).css({
                    display: 'none',
                });
                jQuery(`[id="map_cmdicons_${village.id}_1"]`).css({
                    display: 'none',
                });
                jQuery(`[id="map_cmdicons_${village.id}_2"]`).css({
                    display: 'none',
                });
                jQuery('#map_village_undefined').css({
                    display: 'none',
                });
                jQuery('img[src="/graphic/map/reserved_player.png"]').css({
                    display: 'none',
                });
                jQuery('img[src="/graphic/map/reserved_team.png"]').css({
                    display: 'none',
                });
                jQuery('img[src="/graphic/map/return.png"]').css({
                    display: 'none',
                });
                jQuery('img[src="/graphic/map/attack.png"]').css({
                    display: 'none',
                });
                jQuery('#map canvas').css({
                    display: 'none',
                });
            }
        }

        // Action Handler: Reset map filters
        function handleResetFilters() {
            jQuery('#raResetFiltersBtn').click(function (e) {
                e.preventDefault();

                var mapOverlay = TWMap;
                mapOverlay.mapHandler.spawnSector =
                    mapOverlay.mapHandler._spawnSector;
                mapOverlay.villages = TWMap.villages;
                mapOverlay.reload();
            });
        }
    }
);
