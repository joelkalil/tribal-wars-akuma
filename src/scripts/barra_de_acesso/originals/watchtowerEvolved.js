/*
 * Script Name: WatchTower Evolved
 * Version: v1.1.1
 * Last Updated: 2025-08-15
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2022-12-14
 * Mod: JawJaw
 */

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
        version: 'v1.1.0',
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
    `https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
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
