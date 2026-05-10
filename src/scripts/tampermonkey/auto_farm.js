// ==UserScript==
// @name         Farm Oficial
// @author       FaelZito
// @include      https://br119*screen=am_farm*
// @include      https://br119*screen=am_farm&Farm_page=0*
// @include      https://br119*screen=am_farm&Farm_page=0&group=0*
// @include      https://br125*screen=am_farm*
// @include      https://br125*screen=am_farm&Farm_page=0*
// @include      https://br125*screen=am_farm&Farm_page=0&group=0*
// ==/UserScript==

const MAX_DISTANCE = 28;

const MAX_ROWS = 100;

const INITIAL_DELAY = 1000;

const CLICK_INTERVAL = 600;

const CLICK_DELAY_MIN = 200;

const CLICK_DELAY_MAX = 240;

const NO_TROOPS_CHECK_INTERVAL = 5000;

const SWITCH_VILLAGE_DELAY = 15000;

const RELOAD_DELAY = 20000;

const FARM_BUTTON_SELECTOR = '#am_widget_Farm a.farm_icon_b';

const SCOUT_BUTTON_SELECTOR = '#am_widget_Farm a.farm_icon_a';

const LOOT_BUTTON_SELECTOR = '#am_widget_Farm a.farm_icon_c';

const KNOWN_COORDS_SELECTOR = "td[style^='font-weight:bold; width:100px; text-align:right']";

const NO_UNITS_TEXT = 'Não existem unidades suficientes';

let clickCount = 0;

const tempCell = document.createElement('td');

setTimeout(runFarm, INITIAL_DELAY);

if (!document.getElementsByClassName('rc-anchor-center-item rc-anchor-checkbox-label').length) {

    setInterval(switchVillage, SWITCH_VILLAGE_DELAY);

}

setTimeout(function () {

    window.location.reload();

}, RELOAD_DELAY);

function runFarm() {

    const knownCoords = getKnownCoords();

    watchTroops();

    for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex += 1) {

        const menu = $(FARM_BUTTON_SELECTOR);

        $(menu).eq(rowIndex).each(function () {

            processFarmRow(this, rowIndex, knownCoords);

        });

    }

}

function processFarmRow(button, rowIndex, knownCoords) {

    const row = $(button).parents('tr:eq(0)');

    const hasBlueReport = hasImage(row.find('td:eq(1)').html(), 'dots/blue.png') || !hasImage(row.find('td:eq(1)').html(), 'dots/yellow.png');

    const targetDistance = Number(row.find('td:eq(7)').html());

    const targetCoords = extractTargetCoords(row.find('td:eq(3)').html());

    const closestKnownDistance = getClosestDistance(knownCoords, targetCoords, targetDistance);

    const scoutInfo = row.find('td:eq(6)').html().toString();

    const disabledInfo = row.find('td:eq(10)').html().toString();

    if (targetDistance > MAX_DISTANCE || !hasBlueReport) {

        return;

    }

    if (closestKnownDistance !== targetDistance) {

        setTimeout(switchVillage, SWITCH_VILLAGE_DELAY);

        return;

    }

    if (scoutInfo === '?') {

        clickRowButton(SCOUT_BUTTON_SELECTOR, rowIndex);

        return;

    }

    if (disabledInfo.includes('Sem tropas suficientes')) {

        clickRowButton(FARM_BUTTON_SELECTOR, rowIndex);

        return;

    }

    clickRowButton(LOOT_BUTTON_SELECTOR, rowIndex);

}

function clickRowButton(selector, rowIndex) {

    const menu = $(selector);

    $(menu).eq(rowIndex).each(function () {

        if ($(this).parent().parent().find('img.tooltip').length) {

            return;

        }

        const delay = CLICK_INTERVAL * ++clickCount - randomInt(CLICK_DELAY_MIN, CLICK_DELAY_MAX);

        setTimeout(function (element) {

            $(element).click();

        }, delay, this);

    });

}

function watchTroops() {

    setInterval(function () {

        const errorMessage = document.querySelector('.autoHideBox.error p');

        const lightCavalry = document.getElementById('light');

        if (errorMessage && errorMessage.textContent === NO_UNITS_TEXT) {

            switchVillage();

        }

        if (lightCavalry && lightCavalry.textContent.trim() === '0') {

            switchVillage();

        }

    }, NO_TROOPS_CHECK_INTERVAL);

}

function getKnownCoords() {

    const elements = document.querySelectorAll(KNOWN_COORDS_SELECTOR);

    return Array.from(elements).map(function (element) {

        return parseCoords(element.innerText);

    });

}

function extractTargetCoords(html) {

    tempCell.innerHTML = html;

    const coordsText = String(tempCell.innerText).substring(2, 9);

    return parseCoords(coordsText);

}

function parseCoords(coordsText) {

    const coords = coordsText.split('|');

    return [
        Number(coords[0]),
        Number(coords[1])
    ];

}

function getClosestDistance(knownCoords, targetCoords, fallbackDistance) {

    return knownCoords.reduce(function (closestDistance, coords) {

        const distance = Number(Math.sqrt(Math.pow(coords[0] - targetCoords[0], 2) + Math.pow(coords[1] - targetCoords[1], 2)).toFixed(1));

        return distance <= closestDistance ? distance : closestDistance;

    }, fallbackDistance);

}

function hasImage(html, imagePath) {

    return html && html.indexOf(imagePath) >= 0;

}

function switchVillage() {

    $('.arrowRight').click();

    $('.groupRight').click();

    $('div.arrow.arrowRight').click();

    $('div.arrow.groupRight').click();

}

function randomInt(min, max) {

    return Math.round(min + Math.random() * (max - min));

}
