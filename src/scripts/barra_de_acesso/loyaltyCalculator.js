/*
 * Script Name: Loyalty Calculator
 * Version: v2.0.6-akuma.1
 * Last Updated: 2022-05-26
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14092877
 * Approved Date: 2020-07-14
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
        prefix: 'loyaltyCalculator',
        name: 'Loyalty Calculator',
        version: 'v2.0.6-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/loyalty-calculator.285636/',
    },
    translations: {
        en_DK: {
            'Loyalty Calculator': 'Loyalty Calculator',
            Help: 'Help',
            'Script must be executed from the Village Overview!':
                'Script must be executed from the Village Overview!',
            'Estimated Loyalty ≈': 'Estimated Loyalty ≈',
            'No incommings found!': 'No incommings found!',
            'No Noble incomings found!': 'No Noble incomings found!',
            'There has been an error!': 'There has been an error!',
            'Invalid screen!': 'Invalid screen!',
            'Loyalty:': 'Loyalty:',
            'Last known loyalty is saved!': 'Last known loyalty is saved!',
            'No info found on this village!': 'No info found on this village!',
            'Battle Time:': 'Battle Time:',
            'Time Elapsed:': 'Time Elapsed:',
        },
        fr_FR: {
            'Loyalty Calculator': 'Calculateur de Loyauté',
            Help: 'Aide',
            'Script must be executed from the Village Overview!':
                "Le Script doit être exécuté depuis la vue d'un village!",
            'Estimated Loyalty ≈': 'Loyauté estimée ≈',
            'No incommings found!': 'Aucun ordre entrant trouvé!',
            'No Noble incomings found!': 'Aucun noble entrant trouvé!',
            'There has been an error!': 'Une erreure est survenue!',
            'Invalid screen!': 'Mauvais écran!',
            'Loyalty:': 'Loyauté:',
            'Last known loyalty is saved!':
                'Dernière loyauté connue enregistrée!',
            'No info found on this village!':
                'Aucune info trouvé sur ce village!',
            'Battle Time:': 'Heure du combat:',
            'Time Elapsed:': 'Temps écoulé:',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['overview', 'report', 'info_village'],
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
        const gameScreen = twSDK.getParameterByName('screen');

        const worldConfig = await twSDK.getWorldConfig();

        // Entry point
        (function () {
            try {
                switch (gameScreen) {
                    case 'overview':
                        initLoyaltyCalculatorVillageOverview();
                        break;
                    case 'report':
                        initLoyaltyCalculatorSingleReport();
                        break;
                    case 'info_village':
                        initLoyaltyCalculatorSingleVillage();
                        break;
                    default:
                        UI.ErrorMessage(twSDK.tt('Invalid screen!'));
                        return;
                }
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There has been an error!'));
                console.error(`${scriptInfo} Error:`, error);
            }
        })();

        // Initialize Loyalty Calculator on village overview screen
        async function initLoyaltyCalculatorVillageOverview() {
            const villageId = twSDK.getParameterByName('village');

            if (villageId) {
                const currentLoyalty =
                    parseInt(
                        jQuery(
                            '#show_mood > .widget_content > .vis_item span b'
                        ).text()
                    ) || 100;

                if (jQuery('#commands_incomings').length > 0) {
                    let incRows = jQuery(
                        '#commands_incomings table tr.command-row'
                    );

                    let noblesFound = false;

                    incRows.each(function () {
                        let isCurrentAttackNoble =
                            jQuery(this)
                                .find('td:eq(0)')
                                .find('img:eq(1)')
                                .attr('src') &&
                            jQuery(this)
                                .find('td:eq(0)')
                                .find('img:eq(1)')
                                .attr('src')
                                .split('/')
                                .pop()
                                .split('#')[0]
                                .split('?')[0];

                        if (isCurrentAttackNoble && !noblesFound) {
                            let currentAttackTimeToLand = jQuery(this)
                                .find('td:eq(2)')
                                .text()
                                .trim();
                            let hoursToLand = parseInt(
                                currentAttackTimeToLand.split(':')[0]
                            );

                            jQuery(this).find('td').css({
                                'background-color': '#ffc800',
                            });

                            let loyaltyIncrease =
                                hoursToLand * worldConfig.config.speed;
                            let newLoyalty = currentLoyalty + loyaltyIncrease;
                            if (newLoyalty > 100) newLoyalty = 100;

                            const loyaltyIncreaseFactor =
                                hoursToLand > 0
                                    ? worldConfig.config.speed
                                    : worldConfig.config.speed / 2;

                            const content = `
                            <p>
                                <b>
                                    ${twSDK.tt('Estimated Loyalty ≈')}
                                    ${newLoyalty} (&#177;${loyaltyIncreaseFactor})
                                </b>
                            </p>
                        `;

                            twSDK.renderFixedWidget(
                                content,
                                'raLoyaltyCalculator',
                                'ra-loyalty-calculator'
                            );

                            noblesFound = true;
                        }
                    });

                    if (noblesFound === false) {
                        UI.SuccessMessage(
                            twSDK.tt('No Noble incomings found!')
                        );
                    }
                } else {
                    UI.ErrorMessage(twSDK.tt('No incommings found!'));
                }
            } else {
                UI.ErrorMessage(twSDK.tt('Invalid screen!'));
            }
        }

        // Initialize Loyalty Calculator on single report screen
        async function initLoyaltyCalculatorSingleReport() {
            const reportId = twSDK.getParameterByName('view');

            if (reportId) {
                const loyaltyDrop = jQuery(
                    `#attack_results th:contains("${twSDK.tt('Loyalty:')}")`
                )
                    .next('td')
                    .text()
                    .trim();
                const battleTime = jQuery('.small.grey').parent().text().trim();
                const defendingVillageId = jQuery(
                    '#attack_info_def .village_anchor'
                ).data('id');

                const loyaltyDropParts = loyaltyDrop.split(' ');
                const loyaltyNumbers = loyaltyDropParts.filter(
                    (part) => !isNaN(part)
                );
                const loyalty =
                    parseInt(loyaltyNumbers[1]) > 0
                        ? parseInt(loyaltyNumbers[1])
                        : 25;

                writeStorage({
                    villageId: defendingVillageId,
                    battleTime: new Date(battleTime),
                    loyalty: loyalty,
                });

                UI.SuccessMessage(twSDK.tt('Last known loyalty is saved!'));
            } else {
                UI.ErrorMessage(twSDK.tt('Invalid screen!'));
            }
        }

        // Initialize Loyalty Calculator on single village screen
        async function initLoyaltyCalculatorSingleVillage() {
            const villageId = twSDK.getParameterByName('id');

            if (villageId) {
                const data = readStorage();

                const currentVillageInfo = data.filter((item) => {
                    return parseInt(item.villageId) === parseInt(villageId);
                });

                const serverDateTime = twSDK.getServerDateTimeObject();

                const nearestInfo = currentVillageInfo.sort((item) => {
                    return new Date(serverDateTime) - new Date(item.battleTime);
                })[0];

                if (DEBUG) {
                    console.debug(
                        `${scriptInfo} serverDateTime`,
                        serverDateTime
                    );
                    console.debug(
                        `${scriptInfo} currentVillageInfo`,
                        currentVillageInfo
                    );
                    console.debug(`${scriptInfo} nearestInfo`, nearestInfo);
                }

                if (nearestInfo) {
                    const timeDifference =
                        (serverDateTime.getTime() -
                            new Date(nearestInfo.battleTime).getTime()) /
                        1000;
                    const formattedTimeDifference =
                        twSDK.secondsToHms(timeDifference);
                    const hoursDiff = parseInt(
                        formattedTimeDifference.split(':')[0]
                    );

                    const newLoyalty =
                        nearestInfo.loyalty +
                        hoursDiff * worldConfig.config.speed;
                    const loyaltyIncreaseFactor =
                        hoursDiff > 0
                            ? worldConfig.config.speed
                            : worldConfig.config.speed / 2;

                    const content = `
                        <div class="ra-mb15">
                            <p>
                                <b>${twSDK.tt(
                                    'Estimated Loyalty ≈'
                                )}</b> ${newLoyalty} (&#177;${loyaltyIncreaseFactor})
                            </p>
                            <p>
                                <b>${twSDK.tt(
                                    'Battle Time:'
                                )}</b> ${formatDateTime(nearestInfo.battleTime)}
                            </p>
                            <p>
                                <b>${twSDK.tt('Time Elapsed:')}</b> ${
                        formattedTimeDifference.split('.')[0]
                    }
                            </p>
                        </div>
                    `;

                    twSDK.renderFixedWidget(
                        content,
                        'raLoyaltyCalculator',
                        'ra-loyalty-calculator'
                    );
                } else {
                    UI.InfoMessage(twSDK.tt('No info found on this village!'));
                }
            } else {
                UI.ErrorMessage(twSDK.tt('Invalid screen!'));
            }
        }

        // Helper: Save data into localStorage
        function writeStorage(data) {
            const initialStateData = readStorage();
            initialStateData.push(data);
            localStorage.setItem(
                `${scriptConfig.scriptData.prefix}_data`,
                JSON.stringify(initialStateData)
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
            return [];
        }

        // Helper: Format date
        function formatDateTime(date) {
            let currentDateTime = new Date(date);

            var currentYear = currentDateTime.getFullYear();
            var currentMonth = currentDateTime.getMonth();
            var currentDate = '' + currentDateTime.getDate();
            var currentHours = '' + currentDateTime.getHours();
            var currentMinutes = '' + currentDateTime.getMinutes();
            var currentSeconds = '' + currentDateTime.getSeconds();

            currentMonth = currentMonth + 1;
            currentMonth = '' + currentMonth;
            currentMonth = currentMonth.padStart(2, '0');

            currentDate = currentDate.padStart(2, 0);

            currentHours = currentHours.padStart(2, '0');
            currentMinutes = currentMinutes.padStart(2, '0');
            currentSeconds = currentSeconds.padStart(2, '0');

            let formatted_date =
                currentDate +
                '/' +
                currentMonth +
                '/' +
                currentYear +
                ' ' +
                currentHours +
                ':' +
                currentMinutes +
                ':' +
                currentSeconds;

            return formatted_date;
        }
    }
);
