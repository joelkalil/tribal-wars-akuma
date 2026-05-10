/*
 * Script Name: Filter Reports
 * Version: v1.1.0
 * Last Updated: 2023-04-17
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14043639
 * Approved Date: 2020-06-21
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
        prefix: 'filterReports',
        name: 'Filter Reports',
        version: 'v1.1.0',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/filter-reports.285476/',
    },
    translations: {
        en_DK: {
            'Filter Reports': 'Filter Reports',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'Reset Filters': 'Reset Filters',
            'Players Only': 'Players Only',
            'Barbarians Only': 'Barbarians Only',
            'No reports found!': 'No reports found!',
            'Reports have been selected!': 'Reports have been selected!',
            'No reports found fitting the criteria!':
                'No reports found fitting the criteria!',
        },
        sk_SK: {
            'Filter Reports': 'Filtrovanie oznámení',
            Help: 'Pomoc',
            'Script must be run from': 'Skript musí byť spustený z',
            'Reports Overview': 'Náhľadov oznámení',
            'Error while fetching "village.txt"!':
                'Chyba pri načítaní "village.txt"!',
            'Script is already loaded and running!':
                'Skript je už načítaný a spustený!',
            'Reset Filters': 'Resetovať filtre',
            'Players Only': 'Filtrovať oznámenia hráčov',
            'Barbarians Only': 'Filtrovať oznámenia barbarov',
            'No reports found!': 'Žiadne oznámenia!',
            'Reports have been selected!': 'Oznámenia boli vybrané!',
            'No reports found fitting the criteria!':
                'Žiadne oznámenie nesplnilo kritériá!',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['report'],
    allowedModes: ['attack'],
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
        const isValidMode = twSDK.checkValidLocation('mode');

        const { villages } = await fetchWorldData();

        // Entry point
        (async function () {
            if (isValidScreen && isValidMode) {
                // build UI
                const content = `
                    <div class="ra-mb15">
                        <a href="javascript:void(0);" id="raResetFiltersBtn" class="btn">
                            ${twSDK.tt('Reset Filters')}
                        </a>
                        <a href="javascript:void(0);" id="raFilterPlayersBtn" class="btn">
                            ${twSDK.tt('Players Only')}
                        </a>
                        <a href="javascript:void(0);" id="raFilterBarbsBtn" class="btn">
                            ${twSDK.tt('Barbarians Only')}
                        </a>
                    </div>
                `;

                twSDK.renderFixedWidget(
                    content,
                    scriptConfig.scriptData.prefix,
                    'ra-report-filters'
                );

                jQuery('#report_list tr')
                    .find('td:eq(0)')
                    .find('input[type="checkbox"]')
                    .attr('checked', false);

                // register action handlers
                handlerResetFilters();
                handleFilterPlayers();
                handleFilterBarbs();
            } else {
                UI.InfoMessage(twSDK.tt('Redirecting...'));
                twSDK.redirectTo('report&mode=attack');
            }
        })();

        // Action Handler: Reset Report Filters
        function handlerResetFilters() {
            jQuery('#raResetFiltersBtn').on('click', function (e) {
                e.preventDefault();

                jQuery('#report_list tr')
                    .find('td:eq(0)')
                    .find('input[type="checkbox"]')
                    .attr('checked', false);
                jQuery('#select_all').attr('checked', false);
                jQuery('#report_list tbody tr').show();

                const totalRows = jQuery('#report_list tr')
                    .not(':first')
                    .not(':last').length;
                if (totalRows === 0) {
                    UI.ErrorMessage(twSDK.tt('No reports found!'), 3000);
                }
            });
        }

        // Action Handler: Show only Player Reports
        function handleFilterPlayers() {
            jQuery('#raFilterPlayersBtn').on('click', function (e) {
                e.preventDefault();

                jQuery('#raResetFiltersBtn').trigger('click');

                const barbarians = getBarbarianVillages(villages);

                const reportsTableRows = jQuery('#report_list tbody tr')
                    .not(':first')
                    .not(':last');

                let visibleRow = 0;

                reportsTableRows.each(function (index) {
                    const reportName = jQuery(this)
                        .find('.report-link')
                        .find('.quickedit-label')
                        .text()
                        .trim();
                    const defenderVillageCoords =
                        getDefenderVillageCoords(reportName);
                    const isBarbarian = barbarians.includes(
                        defenderVillageCoords
                    );

                    if (isBarbarian) {
                        jQuery(this).hide();
                    } else {
                        visibleRow++;
                    }
                });

                if (visibleRow > 0) {
                    UI.SuccessMessage(twSDK.tt('Reports have been selected!'));
                    jQuery(
                        '#report_list tr:visible input[type="checkbox"]'
                    ).prop('checked', true);
                } else {
                    UI.ErrorMessage(
                        twSDK.tt('No reports found fitting the criteria!')
                    );
                }
            });
        }

        // Action Handler: Show only Barbarian Reports
        function handleFilterBarbs() {
            jQuery('#raFilterBarbsBtn').on('click', function (e) {
                e.preventDefault();

                jQuery('#raResetFiltersBtn').trigger('click');

                const barbarians = getBarbarianVillages(villages);

                const reportsTableRows = jQuery('#report_list tbody tr')
                    .not(':first')
                    .not(':last');

                let visibleRow = 0;

                reportsTableRows.each(function (index) {
                    const reportName = jQuery(this)
                        .find('.report-link')
                        .find('.quickedit-label')
                        .text()
                        .trim();
                    const defenderVillageCoords =
                        getDefenderVillageCoords(reportName);
                    const isBarbarian = barbarians.includes(
                        defenderVillageCoords
                    );

                    if (!isBarbarian) {
                        jQuery(this).hide();
                    } else {
                        visibleRow++;
                    }
                });

                if (visibleRow > 0) {
                    UI.SuccessMessage(twSDK.tt('Reports have been selected!'));
                    jQuery(
                        '#report_list tr:visible input[type="checkbox"]'
                    ).prop('checked', true);
                } else {
                    UI.ErrorMessage(
                        twSDK.tt('No reports found fitting the criteria!')
                    );
                }
            });
        }

        // Helper: Get Coords of defender village
        function getDefenderVillageCoords(reportName) {
            const [_, defender] = reportName.match(/\d+\|\d+/g);
            return defender;
        }

        // Helper: Get list of barbarians
        function getBarbarianVillages(villages) {
            let barbarians = [];
            villages.forEach((village) => {
                if (village[4] == '0') {
                    const barbCoords = village[2] + '|' + village[3];
                    barbarians.push(barbCoords);
                }
            });
            return barbarians;
        }

        // Helper: Fetch all required world data
        async function fetchWorldData() {
            try {
                const villages = await twSDK.worldDataAPI('village');
                return { villages };
            } catch (error) {
                UI.ErrorMessage(error);
                console.error(`${scriptInfo} Error:`, error);
            }
        }
    }
);
