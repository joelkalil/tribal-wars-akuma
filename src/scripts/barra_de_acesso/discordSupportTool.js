/*
 * Script Name: Discord Support Tool
 * Version: v1.1.1-akuma.1
 * Last Updated: 2023-11-27
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: N/A
 * Approved Date: 2022-07-04
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
if (typeof config !== 'object') config = null;

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'discordSupportTool',
        name: 'Discord Support Tool',
        version: 'v1.1.1-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/discord-support-tool.289204/',
    },
    translations: {
        en_DK: {
            'Discord Support Tool': 'Discord Support Tool',
            Help: 'Help',
            'Village:': 'Village:',
            'Wall level:': 'Wall level:',
            'Loyalty:': 'Loyalty:',
            'Defender:': 'Defender:',
            Noble: 'Noble',
            'Extracted Data': 'Extracted Data',
            'Send to Discord': 'Send to Discord',
            Reset: 'Reset',
            'Invalid input!': 'Invalid input!',
            'This script can only be run on an in-game forum thread!':
                'This script can only be run on an in-game forum thread!',
            'Selected text does not follow the required format!':
                'Selected text does not follow the required format!',
            'There was an error!': 'There was an error!',
            'There was an error fetching village info!':
                'There was an error fetching village info!',
            'You need to provide a configuration to run this script!':
                'You need to provide a configuration to run this script!',
            'Sigil of Distress': 'Sigil of Distress',
            Flag: 'Flag',
            Sigil: 'Sigil',
            'Wall Level': 'Wall level',
            Loyalty: 'Loyalty',
            'Defending Troops': 'Defending Troops',
            'Script is not allowed to be used on this TW market!':
                'Script is not allowed to be used on this TW market!',
            'No noble incomings found on the selected incomings!':
                'No noble incomings found on the selected incomings!',
            'Inc. Support:': 'Inc. Support:',
            'Incoming Support': 'Incoming Support',
            'TW SnipeBot': 'TW SnipeBot',
        },
        fr_FR: {
            'Discord Support Tool': 'Discord - Outil soutien',
            Help: 'Aide',
            'Village:': 'Village:',
            'Wall level:': 'Niveau mur:',
            'Loyalty:': 'Loyaute:',
            'Defender:': 'Defenseur:',
            Noble: 'Noble',
            'Extracted Data': 'Donnee extraites',
            'Send to Discord': 'Envoyer vers Discord',
            Reset: 'Reinitialiser',
            'Invalid input!': 'Entree invalide!',
            'This script can only be run on an in-game forum thread!':
                'Ce script ne peut etre lance que sur un post du forum !',
            'Selected text does not follow the required format!':
                'Texte selectionne au mauvais format',
            'There was an error!': 'Oupsi il y a eu une erreur!',
            'There was an error fetching village info!':
                'Une erreur s est produite lors de la recuperation des informations sur le village !',
            'You need to provide a configuration to run this script!':
                'Vous devez fournir une configuration pour executer ce script !',
            'Sigil of Distress': 'Signal de detresse',
            Flag: 'Drapeau',
            Sigil: 'Signal',
            'Wall Level': 'Niveau mur',
            Loyalty: 'Loyaute',
            'Defending Troops': 'Troupes en defense',
            'Script is not allowed to be used on this TW market!':
                'Script non autorise sur ce serveur!',
            'No noble incomings found on the selected incomings!':
                'Aucun noble entrant sur les ordres arrivants',
            'Inc. Support:': 'Soutiens entr.:',
            'Incoming Support': 'Soutiens entrants',
            'TW SnipeBot': 'TW SnipeBot',
        },
        es_ES: {
            'Discord Support Tool': 'Herramienta de Apoyo de Discord',
            Help: 'Ayuda',
            'Village:': 'Pueblo:',
            'Wall level:': 'Nivel de la muralla:',
            'Loyalty:': 'Lealtad:',
            'Defender:': 'Defensor:',
            Noble: 'Noble',
            'Extracted Data': 'Datos extraídos',
            'Send to Discord': 'Envíar a Discord',
            Reset: 'Reiniciar',
            'Invalid input!': '¡Entrada no válida!',
            'This script can only be run on an in-game forum thread!':
                'Este script solamente puede ser ejecutado en el foro de la tribu.',
            'Selected text does not follow the required format!':
                'El texto seleccionado no cumple el formato requerido.',
            'There was an error!': '¡Ha ocurrido un error!',
            'There was an error fetching village info!':
                'Ocurrió un problema al obtener la información del pueblo.',
            'You need to provide a configuration to run this script!':
                'Necesitas proporcionar una configuración para ejecutar este script.',
            'Sigil of Distress': 'Mejora de Apoyo',
            Flag: 'Bandera',
            Sigil: 'Sigilo',
            'Wall Level': 'Nivel de la muralla',
            Loyalty: 'Lealtad',
            'Defending Troops': 'Tropas Defensoras',
            'Script is not allowed to be used on this TW market!':
                'Este script no está disponible en el servidor!',
            'No noble incomings found on the selected incomings!':
                'No hay nobles entrantes en los ataques seleccionados.',
            'Inc. Support:': 'Ap. Entrante:',
            'Incoming Support': 'Apoyo Entrante',
            'TW SnipeBot': 'TW SnipeBot',
        },
    },
    allowedMarkets: ['en', 'us', 'fr', 'es'],
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
        const isValidMarket = twSDK.checkValidMarket();
        const threadId = twSDK.getParameterByName('thread_id');

        const { villages } = await fetchWorldData();

        // Check if we are on a valid market
        if (!isValidMarket) {
            UI.ErrorMessage(
                twSDK.tt('Script is not allowed to be used on this TW market!')
            );
            return;
        }

        // Check if a configuration has been provided to the script
        if (config === null) {
            UI.ErrorMessage(
                twSDK.tt(
                    'You need to provide a configuration to run this script!'
                )
            );
            return;
        }

        // Entry point
        if (isValidScreen && threadId) {
            try {
                //build the user interface
                buildUI();

                // text select listener
                handleOnTextSelect();

                // handle user actions
                handleSendToDiscord();
                handleReset();
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
                    <table class="ra-table ra-table-v2" width="100%">
                        <tbody>
                            <tr>
                                <td width="25%">
                                    <b>${twSDK.tt('Village:')}</b>
                                </td>
                                <td id="raVillageInfo"></td>
                            </tr>
                            <tr>
                                <td width="25%">
                                    <b>${twSDK.tt('Wall level:')}</b>
                                </td>
                                <td id="raWallLevel"></td>
                            </tr>
                            <tr>
                                <td width="25%">
                                    <b>${twSDK.tt('Loyalty:')}</b>
                                </td>
                                <td id="raLoyalty"></td>
                            </tr>
                            <tr>
                                <td width="25%">
                                    <b>${twSDK.tt('Defender:')}</b>
                                </td>
                                <td id="raDefender"></td>
                            </tr>
                            <tr>
                                <td width="25%">
                                    <b>${twSDK.tt('Inc. Support:')}</b>
                                </td>
                                <td id="raIncomingSupport"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="ra-mb15">
                    <label class="ra-label" for="raSelectedText">${twSDK.tt(
                        'Extracted Data'
                    )}</label>
                    <textarea class="ra-textarea" id="raSelectedText"></textarea>
                </div>
                <div class="ra-mb15">
                    <a href="javascript:void(0);" id="raSendToDiscord" class="btn btn-disabled" data-village="">
                        ${twSDK.tt('Send to Discord')}
                    </a>
                    <a href="javascript:void(0);" id="raResetBtn" class="btn" data-village="">
                        ${twSDK.tt('Reset')}
                    </a>
                </div>
            `;

            const customStyle = `
                .ra-label { font-weight: bold; margin-bottom: 6px; display: block; }
            `;

            twSDK.renderFixedWidget(
                content,
                'raDiscordSupportTool',
                'ra-discord-support-tool',
                customStyle
            );
        }

        // Event Handler: On text select event listener
        function handleOnTextSelect() {
            jQuery('.text').mouseup(async function (event) {
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
                        const { wallLevel, loyalty, defendingTroops } =
                            parseVillageInfo(selectedText);
                        const [id, name, x, y] = villageUnderAttack;
                        const incomingSupport = await fetchIncomingSupport(id);

                        const villageName = `${name} (${x}|${y})`;
                        const villageLink = `/game.php?screen=info_village&id=${id}`;

                        let defendingTroopsHtml = '';
                        if (defendingTroops) {
                            defendingTroops.forEach((item) => {
                                const { unit, amountHome } = item;
                                defendingTroopsHtml += `${amountHome} ${unit}, `;
                            });
                        }

                        let incomingTroopsHtml = '';
                        if (incomingSupport) {
                            incomingSupport.forEach((item) => {
                                const { unit, amount } = item;
                                if (parseInt(amount) > 0) {
                                    incomingTroopsHtml += `${amount} ${unit}, `;
                                }
                            });
                        }

                        jQuery('#raSelectedText').val(trainInfo);
                        jQuery('#raSendToDiscord').removeClass('btn-disabled');
                        jQuery('#raSendToDiscord').attr(
                            'data-village',
                            JSON.stringify(villageUnderAttack)
                        );
                        jQuery('#raVillageInfo').html(`
                        <a href="${villageLink}" target="_blank" rel="noreferrer nofollow noopener">
                            ${villageName}
                        </a>
                    `);
                        jQuery('#raWallLevel').text(wallLevel || 'N/A');
                        jQuery('#raLoyalty').text(loyalty || 'N/A');
                        jQuery('#raDefender').text(
                            defendingTroopsHtml || 'N/A'
                        );
                        jQuery('#raIncomingSupport').text(
                            incomingTroopsHtml || 'N/A'
                        );

                        if (
                            wallLevel === undefined &&
                            loyalty === undefined &&
                            defendingTroops === undefined
                        ) {
                            jQuery('#raResetBtn').trigger('click');
                        }
                    } else {
                        jQuery('#raResetBtn').trigger('click');
                        UI.ErrorMessage(
                            twSDK.tt(
                                'Selected text does not follow the required format!'
                            )
                        );
                    }
                }
            });
        }

        // Action Handler: Send support request details on Discord
        function handleSendToDiscord() {
            jQuery('#raSendToDiscord').on('click', async function (e) {
                e.preventDefault();

                const supportText = jQuery('#raSelectedText').val();
                const villageData = JSON.parse(
                    jQuery(this).attr('data-village')
                );

                const [id, name, x, y] = villageData;
                const villageName = `${name} (${x}|${y})`;
                const villageLink = `${window.location.origin}/game.php?screen=info_village&id=${id}`;

                if (supportText !== '' && id !== '') {
                    const villageEffects = await fetchVillageEffects(id);

                    const supportTextWithNoblesHighlighted = replaceGlobally(
                        supportText,
                        twSDK.tt('Noble'),
                        `***${twSDK.tt('Noble')}***`
                    );

                    const { author, name, version } = scriptConfig.scriptData;
                    let messageContent = `[${game_data.world}] - **${game_data.player.name}**`;

                    // prepare body
                    /*
                    https://discord.com/developers/docs/resources/webhook
                    https://discord.com/developers/docs/resources/channel#embed-object-embed-limits
                    */
                    const body = {
                        username: twSDK.tt('TW SnipeBot'),
                        avatar_url:
                            'https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/assets/tribal-wars-icon.png',
                        embeds: [
                            {
                                color: 12690020,
                                timestamp: new Date(),
                                title: `${messageContent} - ${villageName.substring(
                                    0,
                                    200
                                )}`,
                                url: villageLink,
                                description:
                                    '```yaml\n' +
                                    supportTextWithNoblesHighlighted +
                                    '```'.substring(0, 4096),
                                fields: [
                                    {
                                        name: twSDK.tt('Wall Level'),
                                        value:
                                            jQuery('#raWallLevel')
                                                .text()
                                                .trim() ?? 'N/A',
                                        inline: false,
                                    },
                                    {
                                        name: twSDK.tt('Loyalty'),
                                        value:
                                            jQuery('#raLoyalty')
                                                .text()
                                                .trim() ?? 'N/A',
                                        inline: false,
                                    },
                                    {
                                        name: twSDK.tt('Sigil'),
                                        value:
                                            `${villageEffects.sigil}%` ?? 'N/A',
                                        inline: false,
                                    },
                                    {
                                        name: twSDK.tt('Flag'),
                                        value: villageEffects.flag ?? 'N/A',
                                        inline: false,
                                    },
                                    {
                                        name: twSDK.tt('Defending Troops'),
                                        value:
                                            jQuery('#raDefender')
                                                .text()
                                                .trim() ?? 'N/A',
                                        inline: false,
                                    },
                                    {
                                        name: twSDK.tt('Incoming Support'),
                                        value:
                                            jQuery('#raIncomingSupport')
                                                .text()
                                                .trim() ?? 'N/A',
                                        inline: false,
                                    },
                                ],
                                footer: {
                                    text: `${name} ${version} - ${author}`,
                                    icon_url:
                                        'https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/assets/tribal-wars-icon.png',
                                },
                            },
                        ],
                    };

                    // send the data to discord
                    sendData(config.webhookURL, body);

                    // reset the data after being sent
                    setTimeout(function () {
                        jQuery('#raResetBtn').trigger('click');
                    }, 500);
                } else {
                    UI.ErrorMessage(twSDK.tt('Invalid input!'));
                }
            });
        }

        // Action Handler: Reset form with data to be sent to Discord
        function handleReset() {
            jQuery('#raResetBtn').on('click', function (e) {
                e.preventDefault();

                jQuery('#raSelectedText').val('');
                jQuery('#raSendToDiscord').addClass('btn-disabled');
                jQuery('#raSendToDiscord').attr('data-village', '');
                jQuery('#raVillageInfo').html('');
                jQuery('#raWallLevel').text('');
                jQuery('#raLoyalty').text('');
                jQuery('#raDefender').text('');
                jQuery('#raIncomingSupport').text('');

                window.getSelection().removeAllRanges();
            });
        }

        // Service: Send data to Discord
        function sendData(url, body) {
            return $.ajax({
                url: url,
                async: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(body),
            });
        }

        // Helper: Fetch village info
        async function fetchVillageEffects(villageId) {
            try {
                const villageEffects = await jQuery
                    .get(`/game.php?village=${villageId}&screen=overview`)
                    .then((response) => {
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(
                            response,
                            'text/html'
                        );

                        const tableRows = jQuery(htmlDoc).find(
                            '#show_effects .widget_content .village_overview_effect'
                        );

                        if (tableRows.length) {
                            let effects = {
                                sigil: 0,
                                flag: null,
                            };

                            tableRows.each(function () {
                                let dataTitle = jQuery(this)
                                    .attr('title')
                                    ?.trim();
                                let tdText = jQuery(this).text()?.trim();

                                if (dataTitle) {
                                    if (
                                        tdText.includes(
                                            twSDK.tt('Sigil of Distress')
                                        )
                                    ) {
                                        dataTitle = dataTitle.split('<i>')[1];
                                        dataTitle = dataTitle.split('</i>')[0];
                                        dataTitle = dataTitle.split(' ');
                                        dataTitle = dataTitle
                                            .map((item) => parseInt(item))
                                            .filter((item) => item >= 0);
                                        effects = {
                                            ...effects,
                                            sigil: dataTitle[0],
                                        };
                                    }
                                } else {
                                    effects = {
                                        ...effects,
                                        flag: tdText,
                                    };
                                }
                            });

                            return effects;
                        } else {
                            return {};
                        }
                    });

                return villageEffects;
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt('There was an error fetching village info!')
                );
                console.error(`${scriptInfo} Error: `, error);
            }
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

        // Helper: Parse village info from selected text
        function parseVillageInfo(selectedText) {
            if (!selectedText.includes(twSDK.tt('Noble'))) {
                UI.ErrorMessage(
                    twSDK.tt(
                        'No noble incomings found on the selected incomings!'
                    )
                );
                return {};
            } else {
                let linesOfText = selectedText.split('\n');

                linesOfText = linesOfText.filter((line) => line !== ''); // remove empty lines

                linesOfText = linesOfText.filter(
                    (line) =>
                        line.includes(twSDK.tt('Wall level:')) ||
                        line.includes(twSDK.tt('Loyalty:')) ||
                        line.includes(twSDK.tt('Defender:'))
                );

                let villageInfo = {
                    wallLevel: '',
                    loyalty: '',
                    defendingTroops: [],
                };

                linesOfText.map((item) => {
                    if (item.includes(twSDK.tt('Wall level:'))) {
                        villageInfo.wallLevel = parseInt(
                            item.replace(twSDK.tt('Wall level:'), '')
                        );
                    } else if (item.includes(twSDK.tt('Loyalty:'))) {
                        villageInfo.loyalty = parseInt(
                            item.replace(twSDK.tt('Loyalty:'), '')
                        );
                    } else if (item.includes(twSDK.tt('Defender:'))) {
                        let defenderTroops = item.split(' ');
                        defenderTroops = defenderTroops
                            .map((item) => parseInt(item))
                            .filter((item) => item >= 0);

                        const defendingTroops = [];
                        game_data.units.forEach((unit, index) => {
                            if (parseInt(defenderTroops[index]) !== 0) {
                                defendingTroops.push({
                                    unit: [unit],
                                    amountHome: defenderTroops[index],
                                });
                            }
                        });

                        villageInfo = {
                            ...villageInfo,
                            defendingTroops: defendingTroops,
                        };
                    }
                });

                return villageInfo;
            }
        }

        // Helper: Get village under attack from selected text
        function getVillageUnderAttack(selectedText) {
            const linesOfText = selectedText.split('\n');
            const villageCoordinate = linesOfText[0].match(
                twSDK.coordsRegex
            )[0]; // returns 111|222

            const villageUnderAttack = villages.filter((village) => {
                const villageCoord = village[2] + '|' + village[3];
                return villageCoord === villageCoordinate;
            })[0];

            return villageUnderAttack;
        }

        // Helper: Globally replace a string within a string
        function replaceGlobally(original, searchTxt, replaceTxt) {
            const regex = new RegExp(searchTxt, 'g');
            return original.replace(regex, replaceTxt);
        }

        // Fetch incomings information for village
        async function fetchIncomingSupport(villageId) {
            try {
                const response = await jQuery.get(
                    `/game.php?village=${villageId}&screen=place&mode=call&target=${villageId}`
                );
                const htmlDoc = jQuery.parseHTML(response);
                const troopsRows = jQuery(htmlDoc).find(
                    '#support_sum tbody tr'
                );

                const troopsInVillage = [];
                game_data.units.forEach((unit) => {
                    troopsRows.each(function () {
                        const unitAmount = jQuery(this)
                            .find(`td[data-unit="${unit}"]`)
                            .text()
                            .trim();
                        if (unitAmount) {
                            troopsInVillage.push({
                                unit: unit,
                                amount: parseInt(unitAmount),
                            });
                        }
                    });
                });

                return troopsInVillage;
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt(
                        'There was an error fetching incomings information!'
                    )
                );
                console.error(`${scriptInfo} Error: `, error);
            }
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

