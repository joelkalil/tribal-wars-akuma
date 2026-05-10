// ==UserScript==
// @name         Etiquetador Avançado
// @namespace    http://your.homepage/
// @version      0.2
// @description  Gera etiquetas para ataques chegando.
// @author       noone
// @include      https://*.tribalwars.com.br/*screen=info_command*
// @include      https://*.tribalwars.com.br/*mode=incomings*
// @include      https://*.tribalwars.com.br/*type=unignored*
// @include      https://*.tribalwars.com.br/*subtype=all*
// @grant        none
// ==/UserScript==

const MARCAR_TODAS = true;

const FORMATO_DETALHE = window.Formato || ' %enviado_as% %unidade% %atacante% %data de retorno%';

const FORMATO_ETIQUETA_BASE = window.FormatoEtiqueta || ' %unidade% %atacante% %enviado_as% %data de retorno%';

const LABEL_INTERVAL_MIN = 80000;

const LABEL_INTERVAL_MAX = 100000;

const UNIT_NAMES = ['Explorador ', 'Cavalaria leve ', 'Cavalaria pesada ', 'bárbaro', 'Espadachim ', 'aríete', ' * NOBRE * '];

const UNIT_SPEEDS = [9, 10, 11, 18, 22, 30, 35];

const REPLACE_KEYS = [
    'unidade',
    'aldeia_atacante',
    'atacante',
    'distancia',
    'enviado_as',
    'duracao',
    'chegada_em',
    'coordenada_aldeia_atacante',
    'aldeia_defensor',
    'coordenada_aldeia_defensor',
    'data de retorno',
    'registrado'
];

const TABLE_HEADS = ['Unidade', 'Enviado', 'Duração', 'Renomear'];

const MONTHS_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'];

let unitSpeed = 1;

let worldSpeed = 1;

window.onerror = function () {

    return true;

};

if (game_data.player.premium === false) {

    alert('Para utilizar esse script é necessária uma Conta Premium.');

    throw new Error('Conta Premium obrigatória.');

}

const serverDate = $('#serverDate').text();

const serverTime = $('#serverTime').text();

const serverNow = parseDate(`${serverDate} ${serverTime}`);

const registeredAt = formatDate(serverNow);

const replaceRegexList = REPLACE_KEYS.map(function (key) {

    return new RegExp(`%${key}%`, 'ig');

});

const labelFormat = buildListLabelFormat();

if (game_data.screen === 'info_command') {

    labelAttack();

}

if (game_data.mode === 'incomings') {

    startIncomingLabelLoop();

}

void (0);

function buildListLabelFormat() {

    const values = ['%unit%', '%origin%', '%player%', '%distance%', '%sent%', '%duration%', '%arrival%', '%coords%', '%target%', '%target%', '%return%', registeredAt];

    return replaceValues(FORMATO_ETIQUETA_BASE, values);

}

function startIncomingLabelLoop() {

    const interval = randomInt(LABEL_INTERVAL_MIN, LABEL_INTERVAL_MAX);

    console.log(interval);

    setInterval(function () {

        if (MARCAR_TODAS) {

            $(':checkbox').each(function (index, element) {

                element.checked = true;

            });

        }

        $('input[name=label]').val(labelFormat).parents('form').find('input[name=label]').click();

    }, interval);

}

function labelAttack() {

    const table = document.getElementById('command_comment').parentNode.parentNode.parentNode.parentNode.parentNode;

    table.removeAttribute('width');

    normalizeTable(table);

    readWorldConfig();

    const rows = table.rows;

    const arrivalIn = getInner(rows[6].cells[1]).match(/\d+/ig);

    const arrivalInMs = (arrivalIn[0] * 3600 + arrivalIn[1] * 60 + arrivalIn[2] * 1) * 1000;

    const targetCoord = getLastCoord(rows[4].cells[1].textContent);

    const targetName = rows[4].cells[1].textContent;

    const attackerCoord = getLastCoord(rows[2].cells[1].textContent);

    const distance = getDistance(attackerCoord, targetCoord);

    const arrivalText = typeof rows[5].cells[1].innerText === 'undefined' ? rows[5].cells[1].textContent : rows[5].cells[1].innerText;

    const arrivalDate = new Date(monthsToEnglish(arrivalText));

    const values = REPLACE_KEYS.slice();

    values[1] = rows[2].cells[1].textContent;

    values[2] = getInnerOfFirstLink(rows[1].cells[2]);

    values[3] = distance.toFixed(2);

    values[6] = formatDate(arrivalDate);

    values[7] = attackerCoord;

    values[8] = targetCoord;

    values[9] = targetName;

    insertDistanceRow(table, distance);

    insertHeaderRow(table);

    insertUnitRows(table, values, distance, arrivalDate, arrivalInMs);

}

function normalizeTable(table) {

    Array.from(table.rows).forEach(function (row) {

        const length = row.cells ? row.cells.length : 0;

        if (length) {

            row.cells[length - 1].colSpan = 5 - length;

        }

    });

}

function insertDistanceRow(table, distance) {

    const rowIndex = table.rows.length - 2;

    const row = table.insertRow(rowIndex);

    setInner(row.insertCell(0), 'Distância:').colSpan = 2;

    setInner(row.insertCell(1), `${distance.toFixed(2)} Campos`).colSpan = 2;

}

function insertHeaderRow(table) {

    const row = table.insertRow(table.rows.length - 2);

    TABLE_HEADS.forEach(function (head) {

        const cell = row.appendChild(document.createElement('th'));

        setInner(cell, head);

    });

}

function insertUnitRows(table, values, distance, arrivalDate, arrivalInMs) {

    let rowIndex = table.rows.length - 2;

    UNIT_NAMES.forEach(function (unitName, index) {

        const durationMs = Math.round(UNIT_SPEEDS[index] * 60 * 1000 * distance / worldSpeed / unitSpeed);

        const secondsDiff = (durationMs - arrivalInMs) / 1000;

        if (secondsDiff <= 0) {

            return;

        }

        values[0] = unitName;

        values[4] = formatDate(new Date(arrivalDate - durationMs));

        values[5] = formatTime(durationMs / 1000);

        values[10] = formatDate(new Date(arrivalDate.getTime() + durationMs));

        values[11] = registeredAt;

        const row = table.insertRow(rowIndex);

        rowIndex += 1;

        setInner(row.insertCell(0), unitName);

        setInner(row.insertCell(1), getSentLabel(secondsDiff));

        setInner(row.insertCell(2), values[5]);

        createRenameControls(row.insertCell(3), index, values);

    });

}

function createRenameControls(cell, index, values) {

    const button = document.createElement('input');

    button.setAttribute('type', 'button');

    button.setAttribute('value', 'OK');

    button.setAttribute('name', index);

    button.onclick = function () {

        $('.rename-icon').click();

        const quickedit = document.getElementsByClassName('quickedit-edit')[0];

        const editlabel = quickedit.getElementsByTagName('input');

        editlabel[0].value = document.getElementsByName(`label${this.name}`)[0].value;

        editlabel[1].click();

    };

    cell.appendChild(button);

    const input = document.createElement('input');

    input.setAttribute('type', 'text');

    input.setAttribute('name', `label${index}`);

    input.size = 20;

    input.value = replaceValues(FORMATO_DETALHE, values);

    cell.appendChild(input);

}

function readWorldConfig() {

    const url = `https://${window.location.hostname}/interface.php?func=get_config`;

    const request = new XMLHttpRequest();

    request.open('GET', url, false);

    request.send(null);

    if (request.status !== 200) {

        alert('Erro ao ler as configurações!');

        return;

    }

    const worldConfig = request.responseXML;

    unitSpeed = worldConfig.getElementsByTagName('unit_speed')[0].childNodes[0].nodeValue;

    worldSpeed = worldConfig.getElementsByTagName('speed')[0].childNodes[0].nodeValue;

}

function replaceValues(format, values) {

    let label = format;

    values.forEach(function (value, index) {

        label = label.replace(replaceRegexList[index], value);

    });

    return label;

}

function getLastCoord(text) {

    const coords = text.match(/\d+\|\d+/ig);

    return coords[coords.length - 1];

}

function getDistance(a, b) {

    const first = a.split('|');

    const second = b.split('|');

    const x = second[0] - first[0];

    const y = second[1] - first[1];

    return Math.sqrt(x * x + y * y);

}

function monthsToEnglish(text) {

    let parsed = text;

    MONTHS_PT.forEach(function (month, index) {

        parsed = parsed.replace(month, MONTHS_EN[index]);

    });

    return parsed;

}

function parseDate(text) {

    const milliseconds = text.match(/:(\d{3})$/i);

    let parsedText = milliseconds ? text.replace(/:(\d{3})$/i, '') : text;

    let date = new Date(parsedText);

    if (date == 'Invalid Date') {

        let dateParts = parsedText.match(/\b(\d+)\b/ig);

        dateParts = dateParts.map(toInt);

        if (dateParts[2] < 2000) {

            dateParts[2] += 2000;

        }

        date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], dateParts[3], dateParts[4], dateParts[5]);

    }

    if (milliseconds) {

        date.setMilliseconds(milliseconds[1]);

    }

    return date;

}

function zeroPad(value) {

    const number = parseInt(value, 10);

    return number > 9 ? number : `0${number}`;

}

function formatTime(seconds) {

    return `${zeroPad(seconds / 3600)}:${zeroPad(seconds % 3600 / 60)}:${zeroPad(seconds % 60)}`;

}

function formatDate(date) {

    const milliseconds = date.getMilliseconds();

    const formattedMs = milliseconds > 99 ? milliseconds : `0${zeroPad(milliseconds)}`;

    return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}.${formattedMs} ${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}`;

}

function getSentLabel(secondsDiff) {

    if (secondsDiff < 60) {

        return 'just now';

    }

    if (secondsDiff < 3600) {

        return `${Math.floor(secondsDiff / 60)} min atrás`;

    }

    return `${formatTime(secondsDiff)} atrás`;

}

function toInt(value) {

    return parseInt(value, 10);

}

function getElementsByTagName(element, tagName) {

    return element.getElementsByTagName(tagName);

}

function getInner(element) {

    return element.innerHTML;

}

function getInnerOfFirstLink(element) {

    return getInner(getElementsByTagName(element, 'a')[0]);

}

function setInner(element, text) {

    element.innerHTML = text;

    return element;

}

function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}
