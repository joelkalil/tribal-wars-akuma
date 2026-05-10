// ==UserScript==
// @name         Reservador Automático
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Reserva aldeias em massa a partir de uma lista de coordenadas.
// @author       Lucas Frois
// @match        https://*.tribalwars.com.br/*screen=ally*mode=reservations*
// @grant        none
// ==/UserScript==

(function () {

    'use strict';

    const STORAGE_KEY = 'tw_reserva_coords';

    const INPUT_SELECTOR = 'input[name="input"]';

    const SUBMIT_SELECTOR = 'input#save_reservations';

    const COORD_REGEX = /\d{3}\|\d{3}/g;

    const CLICK_DELAY_MIN = 300;

    const CLICK_DELAY_MAX = 600;

    const TYPE_DELAY_MIN = 500;

    const TYPE_DELAY_MAX = 1000;

    const PANEL_STYLE = {
        position: 'fixed',
        top: '50px',
        right: '50px',
        padding: '15px',
        background: '#f4e4bc',
        border: '2px solid #7d510f',
        zIndex: '99999'
    };

    const STATUS_STYLE = {
        position: 'fixed',
        top: '10px',
        left: '10px',
        padding: '10px',
        background: 'yellow',
        border: '2px solid black',
        zIndex: '99999',
        fontWeight: 'bold'
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const randomDelay = (min, max) => min + Math.random() * (max - min);

    function applyStyles(element, styles) {

        Object.assign(element.style, styles);

    }

    function readQueue() {

        const storedCoords = localStorage.getItem(STORAGE_KEY);

        return storedCoords ? JSON.parse(storedCoords) : [];

    }

    function saveQueue(coords) {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));

    }

    function clearQueue() {

        localStorage.removeItem(STORAGE_KEY);

    }

    function init() {

        const coords = readQueue();

        if (coords.length > 0) {

            processNext(coords);

            return;

        }

        createInterface();

    }

    async function processNext(coords) {

        const currentCoord = coords[0];

        const statusDiv = document.createElement('div');

        applyStyles(statusDiv, STATUS_STYLE);

        statusDiv.innerHTML = `Script trabalhando...<br>Reservando: ${currentCoord}<br>Restantes: ${coords.length - 1}<br><button id="stop_script_btn">PARAR TUDO</button>`;

        document.body.appendChild(statusDiv);

        document.getElementById('stop_script_btn').onclick = function () {

            clearQueue();

            location.reload();

        };

        const inputField = document.querySelector(INPUT_SELECTOR);

        const submitBtn = document.querySelector(SUBMIT_SELECTOR);

        if (!inputField || !submitBtn) {

            alert('Campos de reserva não encontrados. Certifique-se de estar na página correta.');

            return;

        }

        await sleep(randomDelay(TYPE_DELAY_MIN, TYPE_DELAY_MAX));

        inputField.value = currentCoord;

        coords.shift();

        saveQueue(coords);

        await sleep(randomDelay(CLICK_DELAY_MIN, CLICK_DELAY_MAX));

        submitBtn.click();

    }

    function createInterface() {

        const panel = document.createElement('div');

        applyStyles(panel, PANEL_STYLE);

        const title = document.createElement('h3');

        title.innerText = 'Reservador Automático';

        title.style.marginTop = '0';

        panel.appendChild(title);

        const textarea = document.createElement('textarea');

        textarea.placeholder = 'Cole as coordenadas aqui (ex: 564|459 566|456...)';

        textarea.style.width = '200px';

        textarea.style.height = '100px';

        panel.appendChild(textarea);

        panel.appendChild(document.createElement('br'));

        panel.appendChild(createStartButton(textarea));

        panel.appendChild(createClearButton());

        document.body.appendChild(panel);

    }

    function createStartButton(textarea) {

        const startBtn = document.createElement('button');

        startBtn.innerText = 'Iniciar Reservas';

        startBtn.style.marginTop = '5px';

        startBtn.style.padding = '5px';

        startBtn.onclick = function () {

            const found = textarea.value.match(COORD_REGEX);

            if (!found || found.length === 0) {

                alert('Nenhuma coordenada válida encontrada no texto.');

                return;

            }

            saveQueue(found);

            alert(`${found.length} coordenadas carregadas! O script começará agora.`);

            location.reload();

        };

        return startBtn;

    }

    function createClearButton() {

        const clearBtn = document.createElement('button');

        clearBtn.innerText = 'Limpar Memória';

        clearBtn.style.marginLeft = '5px';

        clearBtn.onclick = function () {

            clearQueue();

            alert('Memória limpa.');

            location.reload();

        };

        return clearBtn;

    }

    init();

})();
