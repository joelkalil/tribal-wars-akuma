/*
 * Script Name: Command Timer
 * Version: v1.1.3-akuma.1
 * Last Updated: 2024-09-24
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14018890
 * Approved Date: 2020-06-16
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
        prefix: 'commandTimer',
        name: 'Command Timer',
        version: 'v1.1.3-akuma.1',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/command-launch-timer.285377/',
    },
    translations: {
        en_DK: {
            'Command Timer': 'Command Timer',
            Help: 'Help',
            'Script must be executed from a Command Confirm screen!':
                'Script must be executed from a Command Confirm screen!',
            'Already loaded!': 'Already loaded!',
            'Launching Time must not be empty!':
                'Launching Time must not be empty!',
            'Invalid Launching Time!': 'Invalid Launching Time!',
            "It's time!": "It's time!",
            'Send in:': 'Send in:',
            'Launch Time': 'Launch Time',
            'Start Timer': 'Start Timer',
        },
        sk_SK: {
            'Command Timer': 'Časovač príkazov',
            Help: 'Pomoc',
            'Script must be executed from a Command Confirm screen!':
                'Skript musí byť spustený z potvrdzovacej obrazovky príkazu!',
            'Already loaded!': 'Už načítané!',
            'Launching Time must not be empty!':
                'Čas poslania nesmie byť prázdny!',
            'Invalid Launching Time!': 'Neplatný čas poslania!',
            "It's time!": 'Je čas!',
            'Send in:': 'Pošli o:',
            'Launch Time': 'Čas poslania',
            'Start Timer': 'Spustiť časovač',
        },
        pt_BR: {
            'Command Timer': 'Temporizador de Comandos',
            Help: 'Ajuda',
            'Script must be executed from a Command Confirm screen!':
                ' esse script deve ser utilizado na tela de confirmaçao de comandos!',
            'Already loaded!': 'Carregando!',
            'Launching Time must not be empty!':
                'Horario de inicio não deve estar vazio!',
            'Invalid Launching Time!': 'Horario de Inicialização Invalido!',
            "It's time!": 'Esta Na Hora!',
            'Send in:': 'Enviar:',
            'Launch Time': 'Horario de Lançamento',
            'Start Timer': 'Iniciar Tempo',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['place'],
    allowedModes: [],
    isDebug: DEBUG,
    enableCountApi: true,
};

$.getScript(
    `https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/twSDK.js?url=${document.currentScript.src}`,
    async function () {
        // Initialize Library
        await twSDK.init(scriptConfig);
        const isValidScreen = twSDK.checkValidLocation('screen');
        const isTry = twSDK.getParameterByName('try');

        var commandTimerInterval;

        // Entry point
        if (isValidScreen && isTry === 'confirm') {
            // build user interface
            buildUI();

            // register action handlers
            handleInitCommandTimer();
        } else {
            UI.ErrorMessage(
                twSDK.tt(
                    'Script must be executed from a Command Confirm screen!'
                )
            );
        }

        // Build the user interface
        function buildUI() {
            const [serverTime, serverDate] = getServerTime();
            const serverDateTime = serverTime + ' ' + serverDate;

            const content = `
                <div class="ra-mb15">
                    <label for="launching_time" class="ra-label">
                        ${twSDK.tt('Launch Time')}
                    </label>
                    <input type="text" class="ra-input" id="launching_time" value="${serverDateTime}" />
                </div>
                <div class="ra-mb15">
                    <a href="javascript:void(0);" class="btn" id="raCommandTimerBtn">
                        ${twSDK.tt('Start Timer')}
                    </a>
                </div>
                <div class="ra-mb15 ra-remaining-time">
                    <strong>${twSDK.tt('Send in:')}</strong>
                    <span id="remainingTime">0</span>
                </div>
            `;

            const customStyle = `
                .ra-label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 5px; }
                .ra-input { display: block; line-height: 1; font-size: 14px; padding: 5px; }
                .ra-remaining-time { display:none; font-size: 14px; font-weight: 600; }
                #remainingTime { font-size: 20px; }
                .launch-time-approaching { color: #ff0000; }
            `;

            twSDK.renderFixedWidget(
                content,
                scriptConfig.scriptData.prefix,
                'ra-command-timer',
                customStyle
            );
        }

        // Action Handler: Init command timer
        function handleInitCommandTimer() {
            jQuery('#raCommandTimerBtn').on('click', function (e) {
                e.preventDefault();

                const launchingTime = jQuery('#launching_time').val();
                if (launchingTime !== '') {
                    const [launchingTimeFormatted, serverDateTimeFormatted] =
                        getTimes(launchingTime);

                    if (launchingTimeFormatted <= serverDateTimeFormatted) {
                        UI.ErrorMessage(twSDK.tt('Invalid Launching Time!'));
                        clearInterval(commandTimerInterval);
                    } else {
                        initTimeCalculations(launchingTime);
                    }
                } else {
                    UI.ErrorMessage(
                        twSDK.tt('Launching Time must not be empty!')
                    );
                }
            });
        }

        // Helper: Get server time
        function getServerTime() {
            const serverTime = jQuery('#serverTime').text();
            const serverDate = jQuery('#serverDate').text();
            return [serverTime, serverDate];
        }

        // Helper: Parse string as date
        function parseAsDate(string) {
            let [time, date] = string.split(' ');
            let [hours, minutes, seconds] = time.split(':');
            let [day, month, year] = date.split('/');

            const parsedDate = Date.parse(
                `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            );

            return parsedDate;
        }

        // Helper: Get times
        function getTimes(launchingTime) {
            const [serverTime, serverDate] = getServerTime();
            const serverDateTime = serverTime + ' ' + serverDate;

            const launchingTimeTimestamp = parseAsDate(launchingTime);
            const serverDateTimeTimestamp = parseAsDate(serverDateTime);

            return [launchingTimeTimestamp, serverDateTimeTimestamp];
        }

        // Initialize Timer Calculations
        function initTimeCalculations(launchingTime) {
            commandTimerInterval = setInterval(function () {
                const [launchingTimeFormatted, serverDateTimeFormatted] =
                    getTimes(launchingTime);

                const timeDiff =
                    launchingTimeFormatted - serverDateTimeFormatted;
                const timeDiffSeconds = timeDiff / 1000;

                if (timeDiffSeconds <= 10) {
                    jQuery('#remainingTime').addClass(
                        'launch-time-approaching'
                    );
                }

                if (timeDiffSeconds == 0) {
                    jQuery('.ra-remaining-time').text(`${tt("It's time!")}`);
                    clearInterval(commandTimerInterval);
                }

                jQuery('.ra-remaining-time').show();
                jQuery('#remainingTime').text(timeDiffSeconds + ' seconds');
            }, 1000);
        }
    }
);
