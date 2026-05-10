/*
 * Script Name: Convert Text to Village Note
 * Version: v1.0.6-akuma.1
 * Last Updated: 2023-05-11
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2022-06-06
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
        prefix: 'convertTextToNote',
        name: 'Convert Text to Village Note',
        version: 'v1.0.6-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/convert-text-to-village-note.288987/#',
    },
    translations: {
        en_DK: {
            'Convert Text to Village Note': 'Convert Text to Village Note',
            Help: 'Help',
            'Village:': 'Village:',
            'Wall level:': 'Wall level:',
            'Loyalty:': 'Loyalty:',
            'Defender:': 'Defender:',
            Noble: 'Noble',
            'Extracted Text': 'Extracted Text',
            'Save as Village Note': 'Save as Village Note',
            'Invalid input!': 'Invalid input!',
            'Note added!': 'Note added!',
            'This script can only be run on an in-game forum thread!':
                'This script can only be run on an in-game forum thread!',
            'Selected text does not follow the required format!':
                'Selected text does not follow the required format!',
            'There was an error!': 'There was an error!',
        },
        fr_FR: {
            'Convert Text to Village Note':
                'Convertir un texte en note de village',
            Help: 'Aide',
            'Village:': 'Village:',
            'Wall level:': 'Niveau Mur:',
            'Loyalty:': 'Loyauté:',
            'Defender:': 'Défenseur:',
            Noble: 'Noble',
            'Extracted Text': 'Text extrait',
            'Save as Village Note': 'Sauvegarder comme note de village',
            'Invalid input!': 'Entrée invalide!',
            'Note added!': 'Note ajoutée!',
            'This script can only be run on an in-game forum thread!':
                'Ce script ne peut être exécuté que dans un message sur le forum!',
            'Selected text does not follow the required format!':
                'Le texte sélectionné ne respecte pas le format requis!',
            'There was an error!': 'There was an error!',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['forum'],
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
        const forumId = twSDK.getParameterByName('forum_id');
        const threadId = twSDK.getParameterByName('thread_id');

        const { villages } = await fetchWorldData();

        // Entry point
        if (isValidScreen && forumId && threadId) {
            try {
                //build the user interface
                buildUI();

                // initialize text select listener
                handleOnTextSelect();

                // handle user actions
                handleSaveTextAsNote();
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo} Error:`, error);
            }
        } else {
            UI.ErrorMessage(
                twSDK.tt(
                    'This script can only be run on an in-game forum thread!'
                )
            );
        }

        // Render: Build the user interface
        function buildUI() {
            const content = `
                <div class="ra-mb15">
                    <label class="ra-label" for="raSelectedText">${twSDK.tt(
                        'Extracted Text'
                    )}</label>
                    <textarea class="ra-textarea" id="raSelectedText"></textarea>
                </div>
                <div class="ra-mb15">
                    <a href="javascript:void(0);" id="raSaveAsNoteBtn" class="btn btn-disabled" data-village-id="">
                        ${twSDK.tt('Save as Village Note')}
                    </a>
                </div>
            `;

            const customStyle = `
                .ra-label { font-weight: bold; margin-bottom: 6px; display: block; }
            `;

            twSDK.renderFixedWidget(
                content,
                'raConvertTextToNote',
                'ra-convert-text-to-note',
                customStyle
            );
        }

        // Event Handler: On text select event listener
        function handleOnTextSelect() {
            jQuery('.text').mouseup(function (event) {
                var selectedText = getSelectedText();
                if (selectedText !== '') {
                    if (
                        selectedText.includes(
                            twSDK.tt('Village:'),
                            twSDK.tt('Noble')
                        )
                    ) {
                        const villageUnderAttack =
                            getVillageUnderAttack(selectedText);
                        const trainInfo = parseTrainInfo(selectedText);

                        jQuery('#raSelectedText').val(trainInfo);
                        jQuery('#raSaveAsNoteBtn').removeClass('btn-disabled');
                        jQuery('#raSaveAsNoteBtn').attr(
                            'data-village-id',
                            villageUnderAttack[0]
                        );
                    } else {
                        jQuery('#raSelectedText').val('');
                        jQuery('#raSaveAsNoteBtn').addClass('btn-disabled');
                        jQuery('#raSaveAsNoteBtn').attr('data-village-id', '');
                        UI.ErrorMessage(
                            twSDK.tt(
                                'Selected text does not follow the required format!'
                            )
                        );
                    }
                }
            });
        }

        // Action Handler: Handle save selected text as village note
        function handleSaveTextAsNote() {
            jQuery('#raSaveAsNoteBtn').on('click', function (e) {
                e.preventDefault();

                const noteText = jQuery('#raSelectedText').val();
                const villageId = jQuery(this).attr('data-village-id');
                if (noteText !== '' && villageId !== '') {
                    TribalWars.post(
                        'info_village',
                        {
                            ajaxaction: 'edit_notes',
                            id: villageId,
                        },
                        {
                            note: noteText,
                        },
                        function () {
                            UI.SuccessMessage(twSDK.tt('Note added!'));
                        }
                    );
                } else {
                    UI.ErrorMessage(twSDK.tt('Invalid input!'));
                }
            });
        }

        // Helper: Get selected text value
        function getSelectedText() {
            if (window.getSelection) {
                return window.getSelection().toString();
            } else if (document.selection) {
                return document.selection.createRange().text;
            }
            return '';
        }

        // Helper: Parse train info from selected text
        function parseTrainInfo(selectedText) {
            if (!selectedText.includes(twSDK.tt('Noble'))) {
                return '';
            } else {
                let linesOfText = selectedText.split('\n');

                linesOfText = linesOfText.filter((line) => line !== ''); // remove empty lines
                linesOfText = linesOfText.filter(
                    (line) => !line.includes(twSDK.tt('Village:'))
                ); // remove village info
                linesOfText = linesOfText.filter(
                    (line) => !line.includes(twSDK.tt('Wall level:'))
                ); // remove wall level info
                linesOfText = linesOfText.filter(
                    (line) => !line.includes(twSDK.tt('Loyalty:'))
                ); // remove loyalty info
                linesOfText = linesOfText.filter(
                    (line) => !line.includes(twSDK.tt('Defender:'))
                ); // remove defender info

                linesOfText = linesOfText.map((line) => line.trim());

                if (linesOfText && linesOfText.length) {
                    return linesOfText.join('\n');
                } else {
                    return '';
                }
            }
        }

        // Helper: Get village under attack from selected text
        function getVillageUnderAttack(selectedText) {
            const linesOfText = selectedText.split('\n');
            const [a, b, c] = linesOfText[0].split(' '); // [_, _, (111|222)]
            const villageCoordinate = c.slice(1, -1); // returns 111|222

            const villageUnderAttack = villages.filter((village) => {
                const villageCoord = village[2] + '|' + village[3];
                return villageCoord === villageCoordinate;
            })[0];

            return villageUnderAttack;
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
