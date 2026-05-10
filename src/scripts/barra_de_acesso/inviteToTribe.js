/*
 * Script Name: Invite to Tribe
 * Version: v1.0-akuma.1
 * Last Updated: 2023-04-16
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2023-10-15
 * Mod: MKich
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
    `https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/twSDK.js?url=${document.currentScript.src}`,
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
