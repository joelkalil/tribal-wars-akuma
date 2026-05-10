/*
 * Script Name: WatchTower Evolved
 * Version: v1.1.2-akuma.1
 * Last Updated: 2025-08-15
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2022-12-14
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


/* Copyright (c) RedAlert
By uploading a user-generated mod (script) for use with Tribal Wars, you grant InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to you. InnoGames is entitled but not obligated to name you when exercising its rights. You represent and warrant that you have the legal right to grant this license and that the mod does not infringe upon any third-party rights. You are - with the exception of claims of infringement by third parties – not liable for any usage of the mod by InnoGames. German law applies.
*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
if ('TWMap' in window) mapOverlay = TWMap;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'watchtowerEvolved',
        name: 'WatchTower Evolved',
        version: 'v1.1.1-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/watchtower-evolved.290009/',
    },
    translations: {
        en_DK: {
            'WatchTower Evolved': 'WatchTower Evolved',
            Help: 'Help',
            'This script requires a Premium Account to be run!':
                'This script requires a Premium Account to be run!',
            'There was an error!': 'There was an error!',
            'Redirecting...': 'Redirecting...',
            Village: 'Village',
            'Wt. Level': 'Wt. Level',
            Color: 'Color',
            Action: 'Action',
            'Add Watchtower': 'Add Watchtower',
            Display: 'Display',
            Export: 'Export',
            'Mass Import': 'Mass Import',
            Reset: 'Reset',
            'Watchtower villages exported successfully!':
                'Watchtower villages exported successfully!',
            'Watchtower villages are already added!':
                'Watchtower villages are already added!',
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

        const LC_STORAGE_KEY = `${scriptConfig.scriptData.prefix}_data`;

        // Entry point
        (function () {
            if (isValidScreen) {
                try {
                    twSDK.loadJS(
                        'https://shinko-to-kuma.com/scripts/mapSdk.js',
                        initScript
                    );
                } catch (error) {
                    UI.ErrorMessage(twSDK.tt('There was an error!'));
                    console.error(`${scriptInfo} Error:`, error);
                }
            } else {
                UI.InfoMessage(twSDK.tt('Redirecting...'));
                twSDK.redirectTo('map');
            }
        })();

        // Main Script Logic
        function initScript() {
            // inititalize user interface
            buildUI();

            // populate user interface with previously selected wathctower villages
            populateWatchtowerVillages();

            // register map click handler
            mapClickHandler();

            // register action handlers
            handleAddWatchtower();
            handleRemoveWatchtower();
            handleShowWatchtowers();
            handleExport();
            handleMassImport();
            handleReset();
        }

        // Render: Build the user interface
        function buildUI() {
            const content = `
                <div class="ra-repeater-list ra-mb15">
                    <table class="ra-table ra-table-v3" width="100%">
                        <thead>
                            <tr>
                                <th class="ra-tac">
                                    ${twSDK.tt('Village')}
                                </th>
                                <th class="ra-tac">
                                    ${twSDK.tt('Wt. Level')}
                                </th>
                                <th class="ra-tac">
                                    ${twSDK.tt('Color')}
                                </th>
                                <th class="ra-tac">
                                    ${twSDK.tt('Action')}
                                </th>
                            </tr>
                        </thead>
                        <tbody id="raRepeaterItems"><tbody>
                        <tfoot>
                            <tr>
                                <td colspan="4" class="ra-tac">
                                    <a href="javascript:void(0);" id="raAddWatchTowerBtn" class="btn">
                                        ${twSDK.tt('Add Watchtower')}
                                    </a>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="ra-mb15">
                    <a href="javascript:void(0);" id="raShowWatchtowerVillagesBtn" class="btn">
                        ${twSDK.tt('Display')}
                    </a>
                    <a href="javascript:void(0);" id="raExportBtn" class="btn">
                        ${twSDK.tt('Export')}
                    </a>
                    <a href="javascript:void(0);" id="raMassImportBtn" class="btn">
                        ${twSDK.tt('Mass Import')}
                    </a>
                    <a href="javascript:void(0);" id="raResetWatchtowerVillagesBtn" class="btn">
                        ${twSDK.tt('Reset')}
                    </a>
                </div>
            `;

            const customStyle = `
                .ra-repeater-list {
                    max-height: 360px;
                    overflow-y: auto;
                    overflow-x: hidden;
                }

                .ra-input {
                    width: 100%;
                    padding: 4px;
                    text-align: center;
                    font-size: 14px;
                }

                .ra-color {
                    height: 28px;
                }

                .ra-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 4px;
                    background-color: #c1a264;
                    border-radius: 3px;
                    text-align: center;
                    line-height: 1;
                }

                .wt-circle {
                    position: relative;
                    border: 2px solid #000;
                }

                .wt-circle::before {
                    content: "+";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    color: #eee;
                    margin: 0 auto;
                    font-size: 16px;
                }

                .ra-added-watchtower {
                    filter: brightness(200%) grayscale(100%);
                    border-radius: 50%;
                }
            `;

            twSDK.renderFixedWidget(
                content,
                'raWatchtowerEvolved',
                'ra-watchtower-evolved',
                customStyle
            );
        }

        // Action Handler: Add a watchtower village
        function handleAddWatchtower() {
            jQuery('#raAddWatchTowerBtn').on('click', function (e) {
                e.preventDefault();

                const tableRow = `
                    <tr>
                        <td>
                            <input class="ra-input" type="text" name="ra_village_coord" value="">
                        </td>
                        <td>
                            <input class="ra-input" type="text" name="ra_village_wt_level" value="">
                        </td>
                        <td>
                            <input class="ra-color" type="color" name="ra_village_wt_color" value="#000000">
                        </td>
                        <td>
                            <a href="javascript:void(0)" class="ra-btn ra-remove-watchtower">
                                <img src="/graphic/delete.webp">
                            </a>
                        </td>
                    </tr>
                `;

                jQuery('#raRepeaterItems').append(tableRow);

                handleRemoveWatchtower();
            });
        }

        // Action Handler: Remove a watchtower village
        function handleRemoveWatchtower() {
            jQuery('.ra-remove-watchtower').on('click', function (e) {
                e.preventDefault();

                this.closest('tr').remove();

                jQuery('#raShowWatchtowerVillagesBtn').trigger('click');
            });
        }

        // Action Handler: Visualize watchtowers on map
        function handleShowWatchtowers() {
            jQuery('#raShowWatchtowerVillagesBtn').on('click', function (e) {
                e.preventDefault();

                MapSdk.init();
                MapSdk.circles = [];

                const villages = collectUserInput();

                villages.forEach((village) => {
                    const { coord, wtLevel, wtColor } = village;
                    const [x, y] = coord.split('|');
                    const { r, g, b } = hexToRgb(wtColor);
                    const radius = twSDK.watchtowerLevels[wtLevel - 1];

                    MapSdk.circles.push({
                        x: x,
                        y: y,
                        radius: radius,
                        styling: {
                            main: {
                                strokeStyle: '#000000',
                                lineWidth: 2,
                                fillStyle: `rgba(${r}, ${g}, ${b}, 0.5)`,
                            },
                            mini: {
                                strokeStyle: '#000000',
                                lineWidth: 2,
                                fillStyle: `rgba(${r}, ${g}, ${b}, 0.5)`,
                            },
                        },
                        drawOnMini: true,
                        drawOnMap: true,
                        markCircleOrigin: true,
                    });
                });

                MapSdk.mapOverlay.reload();

                saveWatchtowers();
            });
        }

        // Action Handler: Export watchtower villages
        function handleExport() {
            jQuery('#raExportBtn').on('click', function (e) {
                e.preventDefault();

                const villages = collectUserInput();
                twSDK.copyToClipboard(JSON.stringify(villages));
                UI.SuccessMessage(
                    twSDK.tt('Watchtower villages exported successfully!')
                );
            });
        }

        // Action Handler: Mass import watchtower villages
        function handleMassImport() {
            jQuery('#raMassImportBtn').on('click', function (e) {
                e.preventDefault();

                const content = `
                    <div class="ra-popup-content">
                        <div class="ra-mb15">
                            <textarea class="ra-textarea" id="raWatchtowerVillagesImport"></textarea>
                        </div>
                        <div class="ra-mb15">
                            <a href="javascript:void(0);" class="btn" id="raImportBtn">
                                ${twSDK.tt('Mass Import')}
                            </a>
                        </div>
                    </div>
                `;

                Dialog.show('widget', content);

                jQuery('#raImportBtn').on('click', function (e) {
                    e.preventDefault();

                    const currentVillages = collectUserInput();

                    const userInput = jQuery(
                        '#raWatchtowerVillagesImport'
                    ).val();
                    const watchtowerVillages = JSON.parse(userInput);
                    const difference = watchtowerVillages.filter(
                        ({ coord: id1 }) =>
                            !currentVillages.some(
                                ({ coord: id2 }) => id2 === id1
                            )
                    );

                    if (difference.length) {
                        difference.forEach((watchtowerVillage) => {
                            currentVillages.push(watchtowerVillage);
                        });

                        const watchtowerVillagesItems =
                            buildTableRows(currentVillages);
                        jQuery('#raRepeaterItems').html(
                            watchtowerVillagesItems
                        );

                        jQuery('#popup_box_widget .popup_box_close').trigger(
                            'click'
                        );
                    } else {
                        UI.ErrorMessage(
                            twSDK.tt('Watchtower villages are already added!')
                        );
                    }
                });
            });
        }

        // Action Handler: Reset
        function handleReset() {
            jQuery('#raResetWatchtowerVillagesBtn').on('click', function (e) {
                e.preventDefault();

                jQuery('.ra-remove-watchtower').trigger('click');
            });
        }

        // Helper: Save watchtowers list on localStorage
        function saveWatchtowers() {
            const villages = collectUserInput();
            localStorage.setItem(LC_STORAGE_KEY, JSON.stringify(villages));
        }

        // Helper: Populate user interface with previously saved watchtower villages
        function populateWatchtowerVillages() {
            const data = localStorage.getItem(LC_STORAGE_KEY);

            if (data) {
                const watchtowerVillages = JSON.parse(data);

                if (watchtowerVillages.length) {
                    const watchtowerVillagesItems =
                        buildTableRows(watchtowerVillages);
                    jQuery('#raRepeaterItems').html(watchtowerVillagesItems);
                }
            }

            handleRemoveWatchtower();
        }

        // Helper: Collect user input
        function collectUserInput() {
            const villages = [];

            jQuery('#raRepeaterItems > tr').each(function () {
                const villageCoord = jQuery(this)
                    .find('td input[name="ra_village_coord"]')
                    .val();
                const villageWtLevel = jQuery(this)
                    .find('td input[name="ra_village_wt_level"]')
                    .val();
                const villageWtColor = jQuery(this)
                    .find('td input[name="ra_village_wt_color"]')
                    .val();

                villages.push({
                    coord: villageCoord,
                    wtLevel: villageWtLevel,
                    wtColor: villageWtColor,
                });
            });

            return villages;
        }

        // Helper: Override the village map click handler of TWMap
        function mapClickHandler() {
            TWMap.map._handleClick = function (e) {
                let pos = this.coordByEvent(e);
                let coord = pos.join('|');
                let village = TWMap.villages[pos[0] * 1000 + pos[1]];
                if (village && village.id) {
                    jQuery(`[id="map_village_${village.id}"]`).addClass(
                        'ra-added-watchtower'
                    );
                    setTimeout(function () {
                        jQuery(`[id="map_village_${village.id}"]`).removeClass(
                            'ra-added-watchtower'
                        );
                    }, 1000);

                    const villages = collectUserInput();

                    const doesExist = villages.find(
                        (item) => item.coord === coord
                    );

                    if (!doesExist) {
                        villages.push({
                            coord: coord,
                            wtLevel: '',
                            wtColor: '#000000',
                        });

                        const watchtowerVillagesItems =
                            buildTableRows(villages);
                        jQuery('#raRepeaterItems').html(
                            watchtowerVillagesItems
                        );

                        saveWatchtowers();
                        handleRemoveWatchtower();
                    }
                }
                return false;
            };
        }

        // Helper: Build the table rows from an array of items
        function buildTableRows(villages) {
            let watchtowerVillagesItems = ``;

            villages.forEach((item) => {
                const { coord, wtLevel, wtColor } = item;

                watchtowerVillagesItems += `
                    <tr>
                        <td>
                            <input class="ra-input" type="text" name="ra_village_coord" value="${coord}">
                        </td>
                        <td>
                            <input class="ra-input" type="text" name="ra_village_wt_level" value="${wtLevel}">
                        </td>
                        <td>
                            <input class="ra-color" type="color" name="ra_village_wt_color" value="${wtColor}">
                        </td>
                        <td>
                            <a href="javascript:void(0)" class="ra-btn ra-remove-watchtower">
                                <img src="/graphic/delete.webp">
                            </a>
                        </td>
                    </tr>
                `;
            });

            return watchtowerVillagesItems;
        }

        // Helper: Convert hex code to rgb
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16),
                  }
                : null;
        }
    }
);
