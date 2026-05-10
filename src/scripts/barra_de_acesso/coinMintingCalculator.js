/*
 * Script Name: Coin Minting Calculator
 * Version: v1.0.2-akuma.1
 * Last Updated: 2022-10-01
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: 2022-06-19
 * Approved Date: 2022-06-19
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
        prefix: 'coinMintingCalculator',
        name: 'Coin Minting Calculator',
        version: 'v1.0.2-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/coin-minting-calculator.288648/',
    },
    translations: {
        en_DK: {
            'Coin Minting Calculator': 'Coin Minting Calculator',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            'Total Wood/Hour': 'Total Wood/Hour',
            'Total Stone/Hour': 'Total Stone/Hour',
            'Total Iron/Hour': 'Total Iron/Hour',
            'Wood Limit': 'Wood Limit',
            'Stone Limit': 'Stone Limit',
            'Iron Limit': 'Iron Limit',
            Coins: 'Coins',
        },
        fr_FR: {
            'Coin Minting Calculator': 'Calculateur - Frapper des pièces',
            Help: 'Aide',
            'Redirecting...': 'Redirection...',
            'There was an error!': 'Il y a eu une erreur!',
            'Total Wood/Hour': 'Total Bois/Heure',
            'Total Stone/Hour': 'Total Argile/Heure',
            'Total Iron/Hour': 'Total Fer/Heure',
            'Wood Limit': 'Limite de Bois',
            'Stone Limit': "Limite d'Argile",
            'Iron Limit': 'Limite de Fer',
            Coins: 'Pièces',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['snob'],
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
                initMain();
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo} Error:`, error);
            }
        } else {
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            twSDK.redirectTo('snob');
        }

        // Initialize main script logic
        async function initMain() {
            const worldConfig = await twSDK.getWorldConfig();

            const { totalWoodPerHour, totalStonePerHour, totalIronPerHour } =
                await getResourcesPerHour(worldConfig.config.speed);
            const { woodLimit, stoneLimit, ironLimit, coins } = calculateCoins(
                totalWoodPerHour,
                totalStonePerHour,
                totalIronPerHour
            );

            if (DEBUG) {
                console.debug(
                    `${scriptInfo} worldSpeed`,
                    worldConfig.config.speed
                );
                console.debug(
                    `${scriptInfo} totalWoodPerHour`,
                    totalWoodPerHour
                );
                console.debug(
                    `${scriptInfo} totalStonePerHour`,
                    totalStonePerHour
                );
                console.debug(
                    `${scriptInfo} totalIronPerHour`,
                    totalIronPerHour
                );
                console.debug(`${scriptInfo} woodLimit`, woodLimit);
                console.debug(`${scriptInfo} stoneLimit`, stoneLimit);
                console.debug(`${scriptInfo} ironLimit`, ironLimit);
                console.debug(`${scriptInfo} coins`, coins);
            }

            const content = `
                <div class="ra-table-container ra-mb15">
                    <table class="ra-table" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Total Wood/Hour')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(totalWoodPerHour)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Total Stone/Hour')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(totalStonePerHour)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Total Iron/Hour')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(totalIronPerHour)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Wood Limit')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(woodLimit)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Stone Limit')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(stoneLimit)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Iron Limit')}</b>
                                </td>
                                <td>
                                    ${twSDK.formatAsNumber(ironLimit)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>${twSDK.tt('Coins')}</b>
                                </td>
                                <td>
                                    <b>${twSDK.formatAsNumber(coins)}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;

            const customStyle = `
                .ra-table-container td { text-align: left; }
            `;

            twSDK.renderFixedWidget(
                content,
                'raCoinMintingCalculator',
                'ra-coin-minting-calculator',
                customStyle
            );
        }

        // Helper: Get amount of resources per hour
        async function getResourcesPerHour(worldSpeed) {
            const response = await jQuery.get(
                game_data.link_base_pure + 'overview_villages&mode=buildings'
            );
            const htmlDoc = jQuery.parseHTML(response);

            const woodLevels = [];
            const stoneLevels = [];
            const ironLevels = [];

            const woodLevelsEl = jQuery(htmlDoc).find(
                '.upgrade_building.b_wood'
            );
            const stoneLevelsEl = jQuery(htmlDoc).find(
                '.upgrade_building.b_stone'
            );
            const ironLevelsEl = jQuery(htmlDoc).find(
                '.upgrade_building.b_iron'
            );

            woodLevelsEl.each(function () {
                woodLevels.push(parseInt(jQuery(this).text()));
            });
            stoneLevelsEl.each(function () {
                stoneLevels.push(parseInt(jQuery(this).text()));
            });
            ironLevelsEl.each(function () {
                ironLevels.push(parseInt(jQuery(this).text()));
            });

            const { totalWoodPerHour, totalStonePerHour, totalIronPerHour } =
                calculateTotalResources(
                    woodLevels,
                    stoneLevels,
                    ironLevels,
                    worldSpeed
                );

            return { totalWoodPerHour, totalStonePerHour, totalIronPerHour };
        }

        // Helper: Calculate total resources produced for each resource type
        function calculateTotalResources(
            woodLevels,
            stoneLevels,
            ironLevels,
            worldSpeed
        ) {
            let totalWoodPerHour = 0;
            let totalStonePerHour = 0;
            let totalIronPerHour = 0;

            woodLevels.forEach((item) => {
                totalWoodPerHour += twSDK.resPerHour[item] * worldSpeed;
            });

            stoneLevels.forEach((item) => {
                totalStonePerHour += twSDK.resPerHour[item] * worldSpeed;
            });

            ironLevels.forEach((item) => {
                totalIronPerHour += twSDK.resPerHour[item] * worldSpeed;
            });

            return { totalWoodPerHour, totalStonePerHour, totalIronPerHour };
        }

        // Helper: Calculate amount of coins based on total resources produced in a day
        function calculateCoins(woodHour, stoneHour, ironHour) {
            const coinCost = BuildingSnob.Modes.train.storage_item;

            const woodLimit = (woodHour * 24) / coinCost.wood;
            const stoneLimit = (stoneHour * 24) / coinCost.stone;
            const ironLimit = (ironHour * 24) / coinCost.iron;

            const coins = Math.min(woodLimit, stoneLimit, ironLimit);

            return { woodLimit, stoneLimit, ironLimit, coins };
        }
    }
);
