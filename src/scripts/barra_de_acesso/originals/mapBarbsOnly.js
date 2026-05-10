/*
 * Script Name: Map Barbs Only
 * Version: v1.1.0
 * Last Updated: 2022-05-04
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14107291
 * Approved Date: 2020-07-26
 * Mod: JawJaw
 */

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
        version: 'v1.1.0',
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
    `https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
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
