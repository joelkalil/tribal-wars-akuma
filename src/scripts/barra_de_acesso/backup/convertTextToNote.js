/*
 * Script Name: Convert Text to Village Note
 * Version: v1.0.5
 * Last Updated: 2023-05-11
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2022-06-06
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
        prefix: 'convertTextToNote',
        name: 'Convert Text to Village Note',
        version: 'v1.0.5',
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
    `https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
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
