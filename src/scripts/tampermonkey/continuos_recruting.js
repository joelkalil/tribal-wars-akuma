// ==UserScript==
// @name         Continuous Recruiting Atk
// @version      0.3
// @description  Recruta unidades configuradas quando não há nenhuma na fila.
// @author       Blackwatch
// @include      https://br139.tribalwars.com.br/game.php?*&screen=train*
// @require      https://code.jquery.com/jquery-2.2.4.min.js
// @run-at       document-end
// ==/UserScript==

const RELOAD_DELAY_MIN = 60000;

const RELOAD_DELAY_MAX = 180000;

const QUANTIDADE_RECRUTAR = 1;

const RECRUTAR_UNIDADES = {
    lanca: true,
    espada: false,
    barbaro: false,
    explorador: false,
    cavalariaLeve: false,
    cavalariaPesada: false,
    ariete: false,
    catapulta: false
};

const UNIT_CONFIGS = [
    { chave: 'lanca', nomeUnidade: 'spear', seletorFila: '.unit_sprite_smaller.spear' },
    { chave: 'espada', nomeUnidade: 'sword', seletorFila: '.unit_sprite_smaller.sword' },
    { chave: 'barbaro', nomeUnidade: 'axe', seletorFila: '.unit_sprite_smaller.axe' },
    { chave: 'explorador', nomeUnidade: 'spy', seletorFila: '.unit_sprite_smaller.spy' },
    { chave: 'cavalariaLeve', nomeUnidade: 'light', seletorFila: '.unit_sprite_smaller.light' },
    { chave: 'cavalariaPesada', nomeUnidade: 'heavy', seletorFila: '.unit_sprite_smaller.heavy' },
    { chave: 'ariete', nomeUnidade: 'ram', seletorFila: '.unit_sprite_smaller.ram' },
    { chave: 'catapulta', nomeUnidade: 'catapult', seletorFila: '.unit_sprite_smaller.catapult' }
];

const RESOURCE_IDS = ['wood', 'stone', 'iron'];

const reloadDelay = randomInt(RELOAD_DELAY_MIN, RELOAD_DELAY_MAX);

$(document).ready(function () {

    let shouldRecruit = false;

    UNIT_CONFIGS.forEach(function (unitConfig) {

        const filled = validarPreencher(unitConfig);

        if (filled) {

            shouldRecruit = true;

        }

    });

    if (shouldRecruit) {

        $('.btn-recruit').click();

    }

    console.log(`Próximo reload em ${reloadDelay}ms`);

    setInterval(function () {

        location.reload(true);

    }, reloadDelay);

});

function validarPreencher(unitConfig) {

    if (!RECRUTAR_UNIDADES[unitConfig.chave]) {

        return false;

    }

    const input = $(`input[name="${unitConfig.nomeUnidade}"]`);

    const hasUnitInQueue = $(unitConfig.seletorFila).length > 0;

    if (hasUnitInQueue || input.length === 0) {

        return false;

    }

    input.focus().val(QUANTIDADE_RECRUTAR).blur();

    return hasResources(input, unitConfig.nomeUnidade);

}

function hasResources(input, unitName) {

    return RESOURCE_IDS.every(function (resourceId) {

        const unitCost = parseInt(input.parents('tr').find(`#${unitName}_0_cost_${resourceId}`).text(), 10);

        const available = parseInt($(`#${resourceId}`).text(), 10);

        return unitCost * QUANTIDADE_RECRUTAR <= available;

    });

}

function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);

}
