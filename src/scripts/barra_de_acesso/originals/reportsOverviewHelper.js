/*
 * Script Name: Reports Overview Helper
 * Version: v1.0
 * Last Updated: 2021-11-17
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2021-11-17
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
        prefix: 'reportsOverviewHelper',
        name: 'Reports Overview Helper',
        version: 'v1.0',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/reports-overview-helper.288014/',
    },
    translations: {
        en_DK: {
            'Reports Overview Helper': 'Reports Overview Helper',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'Select all': 'Select all',
            'Delete all': 'Delete all',
            'Scroll to bottom': 'Scroll to bottom',
            'Scroll to top': 'Scroll to top',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['report'],
    allowedModes: ['all'],
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

        // Entry Point
        if (isValidScreen && isValidMode) {
            buildUI();

            // register action handlers
            handleSelectAll();
            handleDeleteAll();
            handleScrollToBottom();
            handleScrollToTop();
        } else {
            twSDK.tt('Redirecting...');
            twSDK.redirectTo('report&mode=all');
        }

        // Render: Build the UI and add it on the DOM
        function buildUI() {
            const content = `
                <div class="ra-mb15">
                    <a href="javascript:void(0);" id="raToggleSelectAllBtn" class="btn ra-action-btn">
                        ${twSDK.tt('Select all')}
                    </a>
                    <a href="javascript:void(0);" id="raDeleteAllReportsBtn" class="btn ra-action-btn">
                        ${twSDK.tt('Delete all')}
                    </a>
                    <a hef="javascript:void(0);" id="raScrollToBottomBtn" class="btn ra-action-btn">
                        ${twSDK.tt('Scroll to bottom')}
                    </a>
                    <a hef="javascript:void(0);" id="raScrollToTopBtn" class="btn ra-action-btn">
                        ${twSDK.tt('Scroll to top')}
                    </a>
                </div>
            `;

            const customStyle = `
                .ra-reports-overview-helper .btn { margin-bottom: 8px; }
                .ra-reports-overview-helper .btn-confirm-yes { padding: 3px; }
            `;

            twSDK.renderFixedWidget(
                content,
                'raReportsOverviewHelper',
                'ra-reports-overview-helper',
                customStyle
            );
        }

        // Action Handler: Handle select all button click
        function handleSelectAll() {
            jQuery('#raToggleSelectAllBtn').on('click', function (e) {
                e.preventDefault();

                setActiveButtonState(this);

                jQuery('#select_all').trigger('click');
            });
        }

        // Action Handler: Handle delete all button click
        function handleDeleteAll() {
            jQuery('#raDeleteAllReportsBtn').on('click', function (e) {
                e.preventDefault();

                setActiveButtonState(this);

                jQuery('table td form input[type="submit"].btn-cancel').trigger(
                    'click'
                );
            });
        }

        // Action Handler: Handle scroll to bottom button click
        function handleScrollToBottom() {
            jQuery('#raScrollToBottomBtn').on('click', function (e) {
                e.preventDefault();

                setActiveButtonState(this);

                jQuery([document.documentElement, document.body]).animate(
                    {
                        scrollTop: jQuery(
                            'table td form input[type="submit"].btn-cancel'
                        ).offset().top,
                    },
                    500
                );
            });
        }

        // Action Handler: Handle scroll to bottom button click
        function handleScrollToTop() {
            jQuery('#raScrollToTopBtn').on('click', function (e) {
                e.preventDefault();

                setActiveButtonState(this);

                jQuery([document.documentElement, document.body]).animate(
                    {
                        scrollTop: jQuery('#content_value').offset().top,
                    },
                    500
                );
            });
        }

        // Helper: Set active button state
        function setActiveButtonState(currentElement) {
            jQuery('.ra-action-btn').removeClass('btn-confirm-yes');
            jQuery(currentElement).addClass('btn-confirm-yes');
        }
    }
);
