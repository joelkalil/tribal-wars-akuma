/*
 * Script Name: Mass Attack Planner
 * Version: v1.1.9-akuma.1
 * Last Updated: 2023-07-24
 * Author: RedAlert
 * Modified by: Akuma
 * Akuma Modified: 2026-05-10
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14001534
 * Approved Date: 2020-06-05
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

var scriptData = {
    name: 'Mass Attack Planner',
    version: 'v1.1.9-akuma.1',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.dev/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/mass-attack-planner.285331/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Local Storage
var LS_PREFIX = `ra_massAttackPlanner_`;
var TIME_INTERVAL = 60 * 60 * 1000 * 24 * 30; /* fetch data every 30 days */
var LAST_UPDATED_TIME = localStorage.getItem(`${LS_PREFIX}_last_updated`) ?? 0;

var unitInfo;

// Init Debug
initDebug();

/* Fetch unit info only when needed */
(function () {
    if (LAST_UPDATED_TIME !== null) {
        if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
            fetchUnitInfo();
        } else {
            unitInfo = JSON.parse(
                localStorage.getItem(`${LS_PREFIX}_unit_info`)
            );
            init(unitInfo);
        }
    } else {
        fetchUnitInfo();
    }
})();

// Script Initializer
function init(unitInfo) {
    var currentDateTime = getCurrentDateTime();

    // fix for no paladin worlds
    let knightSpeed = 0;
    const worldUnits = game_data.units;
    if (worldUnits.includes('knight')) {
        knightSpeed = unitInfo?.config['knight'].speed || 0;
    } else {
        jQuery('#support_unit option[data-option-unit="knight"]').attr(
            'disabled'
        );
    }

    const content = `
			<div class="ra-mb15">
				<label for="arrival_time">Arrival Time</label>
				<input id="arrival_time" type="text" placeholder="yyyy-mm-dd hh:mm:ss" value="${currentDateTime}">
			</div>
			<input type="hidden" id="nobleSpeed" value="${unitInfo.config['snob'].speed}" />
			<div class="ra-flex">
				<div class="ra-flex-6">
					<div class="ra-mb15">
						<label for="nuke_unit">Slowest Nuke unit</label>
						<select id="nuke_unit">
							<option value="${unitInfo.config['axe'].speed}">Axe</option>
							<option value="${unitInfo.config['light'].speed}">LC/MA/Paladin</option>
							<option value="${unitInfo.config['heavy'].speed}">HC</option>
							<option value="${unitInfo.config['ram'].speed}" selected="selected">Ram/Cat</option>
						</select>
					</div>
				</div>
				<div class="ra-flex-6">
					<div class="ra-mb15">
						<label for="support_unit">Slowest Support unit</label>
						<select id="support_unit">
							<option value="${unitInfo.config['spear'].speed}">Spear/Archer</option>
							<option value="${unitInfo.config['sword'].speed}" selected="selected">Sword</option>
							<option value="${unitInfo.config['spy'].speed}">Spy</option>
							<option value="${knightSpeed}" data-option-unit="knight">Paladin</option>
							<option value="${unitInfo.config['heavy'].speed}">HC</option>
							<option value="${unitInfo.config['catapult'].speed}">Cat</option>
						</select>
					</div>
				</div>
			</div>
			<div class="ra-mb15">
				<label for="target_coords">Targets Coords</label>
				<textarea id="target_coords"></textarea>
			</div>
			<div class="ra-flex">
				<div class="ra-flex-4">
					<div class="ra-mb15">
						<label for="nobel_coords">Nobles Coords</label>
						<textarea id="nobel_coords"></textarea>
					</div>
					<div class="ra-mb15">
						<label for="nobel_count">Nobles per Target</label>
						<input id="nobel_count" type="text" value="1">
					</div>
				</div>
				<div class="ra-flex-4">
					<div class="ra-mb15">
						<label for="nuke_coords">Nukes Coords</label>
						<textarea id="nuke_coords"></textarea>
					</div>
					<div class="ra-mb15">
						<label for="nuke_count">Nukes per Target</label>
						<input id="nuke_count" type="text" value="1">
					</div>
				</div>
				<div class="ra-flex-4">
					<div class="ra-mb15">
						<label for="support_coords">Support Coords</label>
						<textarea id="support_coords"></textarea>
					</div>
					<div class="ra-mb15">
						<label for="support_count">Support per Target</label>
						<input id="support_count" type="text" value="1">
					</div>
				</div>
			</div>
			<div class="ra-mb15">
				<a id="submit_btn" class="button" onClick="handleSubmit();">Get Plan!</a>
			</div>
			<div class="ra-mb15">
				<label for="results">Results</label>
				<textarea id="results"></textarea>
			</div>
		`;

    const windowContent = prepareWindowContent(content);
    attackPlannerWindow = window.open(
        '',
        '',
        'left=10px,top=10px,width=480,height=670,toolbar=0,resizable=0,location=0,menubar=0,scrollbars=0,status=0'
    );
    attackPlannerWindow.document.write(windowContent);
}

// Helper: Window Content
function prepareWindowContent(windowBody) {
    const windowHeader = `<h1 class="ra-fs18 ra-fw600">${scriptData.name}</h1>`;
    const windowFooter = `<small><strong>${scriptData.name} ${scriptData.version}</strong> - <a href="${scriptData.authorUrl}" target="_blank" rel="noreferrer noopener">${scriptData.author}</a> - <a href="${scriptData.helpLink}" target="_blank" rel="noreferrer noopener">Help</a></small>`;
    const windowStyle = `
		<style>
			body { background-color: #f4e4bc; font-family: Verdana, Arial, sans-serif; font-size: 14px; line-height: 1; }
			main { max-width: 768px; margin: 0 auto; }
			h1 { font-size: 27px; }
			a { font-weight: 700; text-decoration: none; color: #603000; }
			small { font-size: 10px; }
			input[type="text"],
			select { display: block; width: 100%; height: auto; line-height: 1; box-sizing: border-box; padding: 5px; outline: none; border: 1px solid #999; }
			input[type="text"]:focus { outline: none; box-shadow: none; border: 1px solid #603000; background-color: #eee; }
			label { font-weight: 600; display: block; margin-bottom: 5px; font-size: 12px; }
			textarea { width: 100%; height: 80px; box-sizing: border-box; padding: 5px; resize: none; }
			textarea:focus { box-shadow: none; outline: none; border: 1px solid #603000; background-color: #eee; }
			.ra-mb15 { margin-bottom: 15px; }
			.ra-flex { display: flex; flex-flow: row wrap; justify-content: space-between; }
			.ra-flex-6 { flex: 0 0 48%; }
			.ra-flex-4 { flex: 0 0 30%; }
			.button { padding: 10px 20px; background-color: #603000; font-weight: 500; color: #fff; text-align: center; display: inline-block; cursor: pointer; text-transform: uppercase; }
		</style>
	`;

    const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${scriptData.name} ${scriptData.version}</title>
			${windowStyle}
		</head>
		<body>
			<main>
				${windowHeader}
				${windowBody}
				${windowFooter}
			</main>
			<script>
				function loadJS(url, callback) {
					var scriptTag = document.createElement('script');
					scriptTag.src = url;
					scriptTag.onload = callback;
					scriptTag.onreadystatechange = callback;
					document.body.appendChild(scriptTag);
				}

				loadJS('https://code.jquery.com/jquery-3.6.0.min.js', function() {
					loadJS('https://raw.githubusercontent.com/joelkalil/tribal-wars-akuma/refs/heads/main/src/scripts/barra_de_acesso/attackPlannerHelper.js', function() {
						console.log('Helper libraries loaded!');
					});
				});
			</script>
		</body>
		</html>
	`;

    return html;
}

// Helper: Get and format current datetime
function getCurrentDateTime() {
    let currentDateTime = new Date();

    var currentYear = currentDateTime.getFullYear();
    var currentMonth = currentDateTime.getMonth();
    var currentDate = '' + currentDateTime.getDate();
    var currentHours = '' + currentDateTime.getHours();
    var currentMinutes = '' + currentDateTime.getMinutes();
    var currentSeconds = '' + currentDateTime.getSeconds();

    currentMonth = currentMonth + 1;
    currentMonth = '' + currentMonth;
    currentMonth = currentMonth.padStart(2, '0');

    currentDate = currentDate.padStart(2, '0');
    currentHours = currentHours.padStart(2, '0');
    currentMinutes = currentMinutes.padStart(2, '0');
    currentSeconds = currentSeconds.padStart(2, '0');

    let formatted_date =
        currentYear +
        '-' +
        currentMonth +
        '-' +
        currentDate +
        ' ' +
        currentHours +
        ':' +
        currentMinutes +
        ':' +
        currentSeconds;

    return formatted_date;
}

/* Helper: Fetch World Unit Info */
function fetchUnitInfo() {
    jQuery
        .ajax({
            url: '/interface.php?func=get_unit_info',
        })
        .done(function (response) {
            unitInfo = xml2json($(response));
            localStorage.setItem(
                `${LS_PREFIX}_unit_info`,
                JSON.stringify(unitInfo)
            );
            localStorage.setItem(
                `${LS_PREFIX}_last_updated`,
                Date.parse(new Date())
            );
            init(unitInfo);
        });
}

// Helper: XML to JSON converter
var xml2json = function ($xml) {
    var data = {};
    $.each($xml.children(), function (i) {
        var $this = $(this);
        if ($this.children().length > 0) {
            data[$this.prop('tagName')] = xml2json($this);
        } else {
            data[$this.prop('tagName')] = $.trim($this.text());
        }
    });
    return data;
};

// Helper: Generates script info
function scriptInfo() {
    return `[${scriptData.name} ${scriptData.version}]`;
}

// Helper: Prints universal debug information
function initDebug() {
    console.debug(`${scriptInfo()} It works 🚀!`);
    console.debug(`${scriptInfo()} HELP:`, scriptData.helpLink);
    if (DEBUG) {
        console.debug(`${scriptInfo()} Market:`, game_data.market);
        console.debug(`${scriptInfo()} World:`, game_data.world);
        console.debug(`${scriptInfo()} Screen:`, game_data.screen);
        console.debug(`${scriptInfo()} Game Version:`, game_data.majorVersion);
        console.debug(`${scriptInfo()} Game Build:`, game_data.version);
        console.debug(`${scriptInfo()} Locale:`, game_data.locale);
        console.debug(
            `${scriptInfo()} Premium:`,
            game_data.features.Premium.active
        );
    }
}
