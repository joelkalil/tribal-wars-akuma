// ==UserScript==
// @name         Busca eficiente automatica V2.2
// @version      2.3
// @description  Automatiza a coleta quando todas as tropas disponíveis estão em casa.
// @author       filipescp96 - Based on Jeff + edit Frozzen work
// @include      https://br139.tribalwars.com.br/game.php?*screen=place*&*mode=scavenge*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async function () {

    'use strict';

    const TOTAL_BUSCAS = 4;

    const INITIAL_LOAD_DELAY = 3000;

    const SCAVENGE_SCRIPT_DELAY = 10000;

    const SEND_DELAY = 2000;

    const SWITCH_DELAY = 1000;

    const SCAVENGE_SCRIPT_URL = 'https://shinko-to-kuma.com/scripts/scavengingFinal.js';

    const SELECTOR_UNLOCK_BUTTON = 'a.btn.btn-default.unlock-button:not(.btn-disabled)';

    const SELECTOR_UNLOCKING_TIMER = 'span.unlock-countdown-text';

    const SELECTOR_SEND_BUTTON = 'a.btn.btn-default.free_send_button:not(.btn-disabled)';

    await sleep(INITIAL_LOAD_DELAY);

    console.log('Página carregada. Iniciando coleta.');

    $.getScript(SCAVENGE_SCRIPT_URL);

    await sleep(SCAVENGE_SCRIPT_DELAY);

    await runFirstVillage();

    async function runFirstVillage() {

        const blockedCount = countAvailable(SELECTOR_UNLOCK_BUTTON);

        const unlockingCount = countAvailable(SELECTOR_UNLOCKING_TIMER);

        const sendButtons = findObjects(SELECTOR_SEND_BUTTON);

        if (!sendButtons) {

            console.log('Não existem botões de envio disponíveis. Iniciando loop.');

            await startRefreshOrSwitchLoop();

            return;

        }

        const availableSearches = TOTAL_BUSCAS - (blockedCount + unlockingCount);

        const availableSendButtons = getAvailableButtonInfo(sendButtons);

        if (availableSendButtons.count !== availableSearches) {

            console.log(`Tropas ainda não chegaram todas. Disponíveis: ${availableSendButtons.count}/${availableSearches}.`);

            await startRefreshOrSwitchLoop();

            return;

        }

        console.log('Todas as tropas estão em casa. Executando envios.');

        await sendAvailableSearches(availableSearches);

        await startRefreshOrSwitchLoop();

    }

    async function sendAvailableSearches(availableSearches) {

        for (let i = 0; i < availableSearches; i += 1) {

            const sendButtons = findObjects(SELECTOR_SEND_BUTTON);

            const buttonInfo = getAvailableButtonInfo(sendButtons);

            $.getScript(SCAVENGE_SCRIPT_URL);

            await sleep(SEND_DELAY);

            if (buttonInfo.count > 0) {

                buttonInfo.button.click();

                console.log(`Busca enviada. Restam ${buttonInfo.count - 1} botões.`);

                await sleep(SEND_DELAY);

            }

        }

    }

    async function startRefreshOrSwitchLoop() {

        while (true) {

            console.log('Mudando de aldeia para procurar tropas disponíveis.');

            await sleep(SWITCH_DELAY);

            switchVillage();

            const blockedCount = countAvailable(SELECTOR_UNLOCK_BUTTON);

            const unlockingCount = countAvailable(SELECTOR_UNLOCKING_TIMER);

            const sendButtons = findObjects(SELECTOR_SEND_BUTTON);

            if (!sendButtons) {

                await sleep(SWITCH_DELAY);

                switchVillage();

                continue;

            }

            const availableSearches = TOTAL_BUSCAS - (blockedCount + unlockingCount);

            const sendButtonInfo = getAvailableButtonInfo(sendButtons);

            if (sendButtonInfo.count === availableSearches) {

                console.log('Tropas disponíveis encontradas. Recarregando a página.');

                await sleep(SWITCH_DELAY);

                window.location.reload();

                return;

            }

            await sleep(SWITCH_DELAY);

            switchVillage();

        }

    }

    function findObjects(selector) {

        const objects = document.querySelectorAll(selector);

        return objects.length > 0 ? objects : undefined;

    }

    function countAvailable(selector) {

        const objects = findObjects(selector);

        return objects ? getAvailableButtonInfo(objects).count : 0;

    }

    function getAvailableButtonInfo(objects) {

        const info = {
            button: null,
            count: 0
        };

        if (!objects) {

            return info;

        }

        for (let i = 0; i < TOTAL_BUSCAS; i += 1) {

            if (objects[i] !== undefined) {

                info.count += 1;

                info.button = objects[i];

            }

        }

        return info;

    }

    function switchVillage() {

        $('.arrowRight').click();

        $('.groupRight').click();

    }

    function sleep(ms) {

        return new Promise((resolve) => setTimeout(resolve, ms));

    }

})();
