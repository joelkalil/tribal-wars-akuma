/*
 * Script Name: Invite to Tribe
 * Version: v1.0
 * Last Updated: 2023-04-16
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2023-10-15
 * Mod: MKich
 */

/*--------------------------------------------------------------------------------------
 * This script can NOT be cloned and modified without permission from the script author.
 --------------------------------------------------------------------------------------*/

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'inviteToTribe',
        name: 'Invite to Tribe',
        version: 'v1.0',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/invite-to-tribe.290612/',
    },
    translations: {
        en_DK: {
            'Invite to Tribe': 'Invite to Tribe',
            Help: 'Help',
            Rank: 'Rank',
            Player: 'Player',
            Villages: 'Villages',
            Points: 'Points',
            Action: 'Action',
            Invite: 'Invite',
            'There was an error!': 'There was an error!',
            'You can only run this script if you are in a tribe!':
                'You can only run this script if you are in a tribe!',
            'Player name...': 'Player name...',
        },
    },
    allowedMarkets: [],
    allowedScreens: [],
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

        // Check that the player is a member of a tribe
        if (!parseInt(game_data.player.ally)) {
            UI.ErrorMessage(
                twSDK.tt('You can only run this script if you are in a tribe!')
            );
            return;
        }

        try {
            const players = await twSDK.worldDataAPI('player');
            const sortedPlayersByRank = players.sort((a, b) => a[5] - b[5]);

            const playersTable = buildPlayersTable(sortedPlayersByRank);

            // build the user interface
            buildUI(playersTable);

            // register action Handlers
            handleInviteToTribe();
            handlePlayersFilterChange(players);
        } catch (error) {
            UI.ErrorMessage(twSDK.tt('There was an error!'));
            console.error(`${scriptInfo} Error:`, error);
        }

        // Build user interface
        function buildUI(playersTable) {
            const content = `
                <div class="ra-mb15">
                    <input class="ra-input" type="search" id="raSearchPlayers" placeholder="${twSDK.tt(
                        'Player name...'
                    )}" />
                </div>
                <div class="ra-mb15 ra-table-container" id="raPlayersTable">
                    ${playersTable}
                </div>
            `;

            const customStyle = `
                .btn-confirm-yes { padding: 3px; }
                .ra-input { padding: 10px; font-size: 16px; width: 100%; height: auto; line-height: 1; }
                .ra-is-tribe-member td { background-color: #ffca6a !important; }
                .ra-is-tribe-member .btn { pointer-events: none; cursor: not-allowed; }
            `;

            twSDK.renderFixedWidget(
                content,
                'raInviteToTribe',
                'ra-invite-to-tribe',
                customStyle,
                '560px'
            );
        }

        // Action Handler: Add to tribe click handler
        function handleInviteToTribe() {
            jQuery('.btn-invite-player').on('click', function () {
                const link = jQuery(this).attr('data-href');
                jQuery(this).addClass('btn-confirm-yes');
                jQuery('.btn-invite-player').attr('disabled', 'disabled');
                setTimeout(() => {
                    jQuery('.btn-invite-player').removeAttr('disabled');
                }, twSDK.delayBetweenRequests);
                jQuery.get(link);
            });
        }

        // Action Handler: Filter players shown by name
        function handlePlayersFilterChange(players) {
            jQuery('#raSearchPlayers').on('input', function () {
                const filteredPlayers = filterByValue(
                    players,
                    jQuery(this).val().trim()
                );
                const playersTable = buildPlayersTable(filteredPlayers);
                jQuery('#raPlayersTable').html(playersTable);

                handleInviteToTribe();
            });
        }

        // Helper: Filter an array by value
        function filterByValue(arr = [], query = '') {
            return arr.filter((item) => {
                if (
                    item[1] &&
                    item[1].toLowerCase().includes(query.toLocaleLowerCase())
                ) {
                    return item;
                }
            });
        }

        // Helper: Build the players table
        function buildPlayersTable(players) {
            let playersTable = `
                <table class="ra-table" width="100%">
                    <thead>
                        <tr>
                            <th>${twSDK.tt('Rank')}</th>
                            <th class="ra-tal">${twSDK.tt('Player')}</th>
                            <th>${twSDK.tt('Villages')}</th>
                            <th>${twSDK.tt('Points')}</th>
                            <th>${twSDK.tt('Action')}</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            players.forEach((player) => {
                const [id, name, ally, villages, points, rank] = player;
                const hash = game_data.csrf;
                const isAlly = ally == game_data.player.ally;
                if (name !== undefined && id) {
                    playersTable += `
                        <tr class="${isAlly ? 'ra-is-tribe-member' : ''}">
                            <td>${rank}</td>
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
                            <td>
                                <span class="btn btn-invite-player" data-href="/game.php?screen=ally&mode=invite&action=invite_id&id=${id}&h=${hash}">
                                    ${twSDK.tt('Invite')}
                                </span>
                            </td>
                        </tr>
                    `;
                }
            });

            playersTable += `</tbody></table>`;

            return playersTable;
        }
    }
);
