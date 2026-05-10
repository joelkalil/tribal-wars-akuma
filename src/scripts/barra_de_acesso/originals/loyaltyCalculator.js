/*
 * Script Name: Loyalty Calculator
 * Version: v2.0.5
 * Last Updated: 2022-05-26
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14092877
 * Approved Date: 2020-07-14
 * Mod: JawJaw
 */

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
        version: 'v2.0.5',
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
    `https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
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
