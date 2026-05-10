/*
 * Script Name: Player Finder
 * Version: v1.1.1-akuma.1
 * Last Updated: 2021-12-13
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2021-12-08
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

if (typeof TWMap === 'undefined') TWMap = {};
if ('TWMap' in window) mapOverlay = TWMap;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'playerFinder',
        name: 'Player Finder',
        version: 'v1.1.1-akuma.1',
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
    `https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/twSDK.js?url=${document.currentScript.src}`,
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
