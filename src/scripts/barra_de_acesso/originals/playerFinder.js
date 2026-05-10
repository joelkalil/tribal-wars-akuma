/*
 * Script Name: Player Finder
 * Version: v1.1.0
 * Last Updated: 2021-12-13
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2021-12-08
 * Mod: JawJaw
 */

/*--------------------------------------------------------------------------------------
 * This script can NOT be cloned and modified without permission from the script author.
 --------------------------------------------------------------------------------------*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

if (typeof TWMap === 'undefined') TWMap = {};
if ('TWMap' in window) mapOverlay = TWMap;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'playerFinder',
        name: 'Player Finder',
        version: 'v1.1.0',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/player-finder.288076/',
    },
    translations: {
        en_DK: {
            'Player Finder': 'Player Finder',
            Help: 'Help',
            'Fetching world data ...': 'Fetching world data ...',
            Rank: 'Rank',
            Player: 'Player',
            Villages: 'Villages',
            Points: 'Points',
            Action: 'Action',
            'There was an error!': 'There was an error!',
            'Min. Points': 'Min. Points',
            'Max. Points': 'Max. Points',
            'Filter Players': 'Filter Players',
            Reset: 'Reset',
            'Redirecting...': 'Redirecting...',
            Player: 'Player',
            'Nr. Villages': 'Nr. Villages',
            'Reset Selected Players': 'Reset Selected Players',
            'Highlight Selected Players on Map':
                'Highlight Selected Players on Map',
            'No players were selected!': 'No players were selected!',
            'Redrawing map ...': 'Redrawing map ...',
            'Export Coordinates': 'Export Coordinates',
            Coordinates: 'Coordinates',
            'No filter implemented!': 'No filter implemented!',
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

        if (isValidScreen) {
            try {
                // fetch world data
                const { villages, players, tribes } = await fetchWorldData();
                const sortedPlayersByRank = players.sort((a, b) => a[5] - b[5]);
                const playersTable = buildPlayersTable(sortedPlayersByRank);

                // build UI
                buildUI(playersTable);

                // register action handlers
                handleFilterPlayers(sortedPlayersByRank);
                handleResetFilters(sortedPlayersByRank);
                handleResetPlayersSelected(sortedPlayersByRank);
                handleHightlightPlayersMap(villages);
                handleExportCoordinates(villages);
                handleToggleCheckboxes();

                // register event handlers
                onBlurPointFields();
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo} Error:`, error);
            }
        } else {
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            twSDK.redirectTo('map');
        }

        // Render: Build the script interface
        function buildUI(playersTable) {
            const savedData = readStorage();
            const { minPoints, maxPoints, playerName, maxVillages } = savedData;

            const content = `
                <div class="ra-grid ra-mb15">
                    <div>
                        <label class="ra-label" for="raPlayerName">${twSDK.tt(
                            'Player'
                        )}</label>
                        <input type="text" id="raPlayerName" class="ra-input" value="${
                            playerName ?? ''
                        }">
                    </div>
                    <div>
                        <label class="ra-label" for="raMinPoints">${twSDK.tt(
                            'Min. Points'
                        )}</label>
                        <input type="text" id="raMinPoints" class="ra-input" value="${
                            minPoints ?? ''
                        }">
                    </div>
                    <div>
                        <label class="ra-label" for="raMaxPoints">${twSDK.tt(
                            'Max. Points'
                        )}</label>
                        <input type="text" id="raMaxPoints" class="ra-input" value="${
                            maxPoints ?? ''
                        }">
                    </div>
                    <div>
                        <label class="ra-label" for="raMaxPoints">${twSDK.tt(
                            'Nr. Villages'
                        )}</label>
                        <input type="text" id="raMaxVillages" class="ra-input" value="${
                            maxVillages ?? ''
                        }">
                    </div>
                </div>
                <div class="ra-mb15">
                    <a href="javascript:void(0);" id="raResetPlayerFiltersBtn" class="ra-filter-players-btn btn">
                        ${twSDK.tt('Reset')}
                    </a>
                    <a href="javascript:void(0);" id="raFilterPlayersBtn" class="ra-filter-players-btn btn">
                        ${twSDK.tt('Filter Players')}
                    </a>
                    <a href="javascript:void(0);" id="raResetPlayersSelectedBtn" class="ra-filter-players-btn btn">
                        ${twSDK.tt('Reset Selected Players')}
                    </a>
                    <a href="javascript:void(0);" id="raHighlightPlayersMapBtn" class="ra-filter-players-btn btn">
                        ${twSDK.tt('Highlight Selected Players on Map')}
                    </a>
                    <a href="javascript:void(0);" id="raExportCoordinatesBtn" class="ra-filter-players-btn btn">
                        ${twSDK.tt('Export Coordinates')}
                    </a>
                </div>
                <div class="ra-mh310 ra-mb15" id="raPlayersTable">
                    ${playersTable}
                </div>
            `;

            const customStyle = `
                .ra-mh310 { overflow-y: auto; max-height: 310px; }
                .ra-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; grid-gap: 15px; }
                .ra-label { display: block; font-weight: 600; margin-bottom: 5px; }
                .ra-input { display: block; width: 100%; height: auto; padding: 5px; font-size: 14px; }
            `;

            twSDK.renderBoxWidget(
                content,
                'raPlayerFinder',
                'ra-player-finder',
                customStyle
            );
        }

        // Action Handler: Filter players
        function handleFilterPlayers(players) {
            jQuery('#raFilterPlayersBtn').on('click', function (e) {
                e.preventDefault();

                const playerName = jQuery('#raPlayerName')
                    .val()
                    .trim()
                    .toLowerCase();
                const minPoints = parseInt(jQuery('#raMinPoints').val());
                const maxPoints = parseInt(jQuery('#raMaxPoints').val());
                const maxVillages = parseInt(jQuery('#raMaxVillages').val());

                if (!playerName && !minPoints && !maxPoints && !maxVillages) {
                    UI.ErrorMessage(twSDK.tt('No filter implemented!'));
                    return;
                }

                toggleCurrentActiveButtonState(this);

                let filteredPlayers = [...players];

                // filter players by name
                if (playerName.length) {
                    filteredPlayers = filteredPlayers.filter((player) => {
                        if (player[1] !== undefined) {
                            const currentPlayerName = player[1].toLowerCase();
                            return (
                                currentPlayerName.startsWith(playerName) ||
                                currentPlayerName.includes(playerName)
                            );
                        }
                    });
                }

                // filter players by points
                if (minPoints && maxPoints) {
                    filteredPlayers = players.filter((player) => {
                        return (
                            parseInt(player[4]) > minPoints &&
                            parseInt(player[4]) < maxPoints
                        );
                    });
                } else {
                    if (minPoints && !maxPoints) {
                        filteredPlayers = players.filter((player) => {
                            return parseInt(player[4]) > minPoints;
                        });
                    }
                    if (!minPoints && maxPoints) {
                        filteredPlayers = players.filter((player) => {
                            return parseInt(player[4]) < maxPoints;
                        });
                    }
                }

                // filter players by max villages
                if (maxVillages && maxVillages !== 0) {
                    filteredPlayers = players.filter((player) => {
                        return parseInt(player[3]) <= maxVillages;
                    });
                }

                const filteredPlayersTable = buildPlayersTable(filteredPlayers);
                jQuery('#raPlayersTable').html(filteredPlayersTable);

                handleToggleCheckboxes();

                writeStorage({
                    playerName,
                    minPoints,
                    maxPoints,
                    maxVillages,
                });

                jQuery('#raToggleCheckboxesBtn').trigger('click');
                jQuery('#raHighlightPlayersMapBtn').trigger('click');
            });
        }

        // Action Handler: Filter players
        function handleResetFilters(players) {
            jQuery('#raResetPlayerFiltersBtn').on('click', function (e) {
                e.preventDefault();

                toggleCurrentActiveButtonState(this);

                jQuery('#raPlayerName').val('');
                jQuery('#raMinPoints').val('');
                jQuery('#raMaxPoints').val('');
                jQuery('#raMaxVillages').val('');
                jQuery('#raCoordinateVillages').val('');

                const playersTable = buildPlayersTable(players);
                jQuery('#raPlayersTable').html(playersTable);

                jQuery('.custom-close-button').trigger('click');

                handleToggleCheckboxes();

                writeStorage({
                    playerName: '',
                    minPoints: '',
                    maxPoints: '',
                    maxVillages: '',
                });

                var mapOverlay = TWMap;
                mapOverlay.mapHandler.spawnSector =
                    mapOverlay.mapHandler._spawnSector;
                mapOverlay.villages = TWMap.villages;
                mapOverlay.reload();
            });
        }

        // Action Handler: Reset players selected
        function handleResetPlayersSelected(players) {
            jQuery('#raResetPlayersSelectedBtn').on('click', function (e) {
                e.preventDefault();

                if (jQuery('input[name="ra_filter_players"]').is(':checked')) {
                    toggleCurrentActiveButtonState(this);
                    jQuery('input[name="ra_filter_players"]').prop(
                        'checked',
                        false
                    );
                } else {
                    UI.ErrorMessage(twSDK.tt('No players were selected!'));
                    return;
                }
            });
        }

        // Action Handler: Highlight selected players on Map
        function handleHightlightPlayersMap(villages) {
            jQuery('#raHighlightPlayersMapBtn').on('click', function (e) {
                e.preventDefault();

                const selectedPlayerIds = collectSelectedPlayerIds();

                if (selectedPlayerIds.length > 1) {
                    toggleCurrentActiveButtonState(this);

                    const chosenPlayerVillages = villages.filter((village) => {
                        return selectedPlayerIds.includes(parseInt(village[4]));
                    });

                    updateMap(chosenPlayerVillages);
                } else {
                    UI.ErrorMessage(twSDK.tt('No players were selected!'));
                }
            });
        }

        // Action Handler: Export coordinates of chosen players
        function handleExportCoordinates(villages) {
            jQuery('#raExportCoordinatesBtn').on('click', function (e) {
                e.preventDefault();

                const selectedPlayerIds = collectSelectedPlayerIds();

                if (selectedPlayerIds.length) {
                    toggleCurrentActiveButtonState(this);

                    const chosenPlayerVillages = villages.filter((village) => {
                        return selectedPlayerIds.includes(parseInt(village[4]));
                    });

                    const coordinates = chosenPlayerVillages.map((village) => {
                        return village[2] + '|' + village[3];
                    });

                    const customStyle = `
                        .ra-label { font-weight: 600; display: block; margin-bottom: 6px; }
                    `;

                    const content = `
                        <div class="ra-mb15">
                            <label class="ra-label" for="raCoordinateVillages">${twSDK.tt(
                                'Coordinates'
                            )} ${coordinates.length}</label>
                            <textarea readonly id="raCoordinateVillages" class="ra-textarea">${coordinates.join(
                                ' '
                            )}</textarea>
                        </div>
                    `;

                    twSDK.renderFixedWidget(
                        content,
                        'raPlayerFinderWidget',
                        'ra-player-finder-widget',
                        customStyle
                    );
                } else {
                    UI.ErrorMessage(twSDK.tt('No players were selected!'));
                }
            });
        }

        // Action Handler: Toggle checkboxes
        function handleToggleCheckboxes() {
            jQuery('#raToggleCheckboxesBtn').on('click', function (e) {
                e.preventDefault();

                const isChecked = jQuery('input[name="ra_filter_players"]').is(
                    ':checked'
                );
                jQuery('input[name="ra_filter_players"]').prop(
                    'checked',
                    !isChecked
                );
            });
        }

        // Event Handler: Always enter 0 when user fills field incorrectly or leaves it empty
        function onBlurPointFields() {
            jQuery('#raMinPoints, #raMaxPoints, #raMaxVillages').blur(
                function () {
                    if (!$.isNumeric(this.value)) this.value = 0; // handle cases when field is filled incorrectly (example user input is non numeric)
                }
            );
        }

        // Helper: Build the players table
        function buildPlayersTable(players) {
            let playersTable = `
                <table class="ra-table" width="100%">
                    <thead>
                        <tr>
                            <th width="60px">
                                <a href="javascript:void(0);" id="raToggleCheckboxesBtn">
                                    ✅
                                </a>
                            </th>
                            <th width="100px">${twSDK.tt('Rank')}</th>
                            <th width="200px">ID</th>
                            <th class="ra-tal">${twSDK.tt('Player')}</th>
                            <th>${twSDK.tt('Villages')}</th>
                            <th>${twSDK.tt('Points')}</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

            players.forEach((player) => {
                const [id, name, ally, villages, points, rank] = player;
                const isDisabled =
                    parseInt(game_data.player.id) === parseInt(id)
                        ? 'disabled'
                        : '';

                if (name !== undefined && id) {
                    playersTable += `
                        <tr data-player-id="${id}">
                            <td>
                                <input type="checkbox" name="ra_filter_players" ${isDisabled} value="${id}" />
                            </td>
                            <td>${rank}</td>
                            <td>${id}</td>
                            <td class="ra-tal">
                                <a href="/game.php?screen=info_player&id=${id}" target="_blank" rel="noopener noreferrer">
                                    ${twSDK.cleanString(name)}
                                </a>
                            </td>
                            <td>
                                ${twSDK.formatAsNumber(villages)}
                            </td>
                            <td>
                                ${twSDK.formatAsNumber(points)}
                            </td>
                        </tr>
                    `;
                }
            });

            playersTable += `</tbody></table>`;

            return playersTable;
        }

        // Helper: Unselect all buttons and highlight current active one
        function toggleCurrentActiveButtonState(currentButton) {
            jQuery('.ra-filter-players-btn').removeClass('btn-confirm-yes');
            jQuery(currentButton).addClass('btn-confirm-yes');
        }

        // Helper: Collect selected player Ids
        function collectSelectedPlayerIds() {
            let selectedPlayerIds = [];

            jQuery('input[name="ra_filter_players"]:checked').each(function () {
                selectedPlayerIds.push(parseInt(jQuery(this).val()));
            });

            return selectedPlayerIds;
        }

        // Map: Rerender map to filter all villages so only bonus villages remain
        function updateMap(villages) {
            const coordinatesToKeep = [];
            const villagesToKeepIds = [];

            villages.forEach((village) => {
                const coordinate = village[2] + '|' + village[3];
                villagesToKeepIds.push(parseInt(village[0]));
                coordinatesToKeep.push(coordinate);
            });

            UI.InfoMessage(twSDK.tt('Redrawing map ...'));

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
                            if (!coordinatesToKeep.includes(vCoords)) {
                                if (
                                    !villagesToKeepIds.includes(parseInt(v.id))
                                ) {
                                    jQuery(
                                        '#map_container > div:first-child'
                                    ).css({
                                        display: 'none',
                                    });
                                    jQuery(`[id="map_village_${v.id}"]`).css({
                                        display: 'none',
                                    });
                                    jQuery(`[id="map_icons_${v.id}"]`).css({
                                        display: 'none',
                                    });
                                    jQuery(`[id="map_cmdicons_${v.id}_0"]`).css(
                                        {
                                            display: 'none',
                                        }
                                    );
                                    jQuery(`[id="map_cmdicons_${v.id}_1"]`).css(
                                        {
                                            display: 'none',
                                        }
                                    );
                                    jQuery(`[id="map_cmdicons_${v.id}_2"]`).css(
                                        {
                                            display: 'none',
                                        }
                                    );
                                    jQuery('#map_village_undefined').css({
                                        display: 'none',
                                    });
                                    jQuery(
                                        'img[src="/graphic/map/reserved_player.png"]'
                                    ).css({
                                        display: 'none',
                                    });
                                    jQuery(
                                        'img[src="/graphic/map/reserved_team.png"]'
                                    ).css({
                                        display: 'none',
                                    });
                                    jQuery(
                                        'img[src="/graphic/map/return.png"]'
                                    ).css({
                                        display: 'none',
                                    });
                                    jQuery(
                                        'img[src="/graphic/map/attack.png"]'
                                    ).css({
                                        display: 'none',
                                    });
                                    jQuery('#map canvas').css({
                                        display: 'none',
                                    });
                                }
                            }
                        }
                    }
                }
            };

            mapOverlay.reload();
        }

        // Helper: Save data into localStorage
        function writeStorage(data) {
            const initialStateData = readStorage();

            const dataToSave = {
                ...initialStateData,
                ...data,
            };

            localStorage.setItem(
                `${scriptConfig.scriptData.prefix}_data`,
                JSON.stringify(dataToSave)
            );
        }

        // Helper: Function read data from localStorage
        function readStorage() {
            const data =
                localStorage.getItem(
                    `${scriptConfig.scriptData.prefix}_data`
                ) ?? null;
            if (data !== null) {
                const dataJSON = JSON.parse(data);
                return dataJSON;
            }
            return {};
        }

        // Service: Fetch all required world data
        async function fetchWorldData() {
            try {
                const villages = await twSDK.worldDataAPI('village');
                const players = await twSDK.worldDataAPI('player');
                const tribes = await twSDK.worldDataAPI('ally');
                return { villages, players, tribes };
            } catch (error) {
                UI.ErrorMessage(error);
                console.error(`${scriptInfo} Error:`, error);
            }
        }
    }
);
