/*
 * Script Name: Filter Reports
 * Version: v1.1.1-akuma.1
 * Last Updated: 2023-04-17
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14043639
 * Approved Date: 2020-06-21
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
        prefix: 'filterReports',
        name: 'Filter Reports',
        version: 'v1.1.1-akuma.1',
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
    `https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/twSDK.js?url=${document.currentScript.src}`,
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
