/*
 * Script Name: Tribe Stats Tools
 * Version: v1.0.4
 * Last Updated: 2023-04-19
 * Author: RedAlert
 * Author URL: https://twscripts.dev/
 * Author Contact: redalert_tw (Discord)
 * Approved: t14211665
 * Approved Date: 2020-09-11
 * Mod: JawJaw
 */

/*--------------------------------------------------------------------------------------
 * This script can NOT be cloned and modified without permission from the script author.
 --------------------------------------------------------------------------------------*/

var scriptData = {
    name: 'Tribe Stats Tools',
    version: 'v1.0.4',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.dev/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/tribe-stats-tools.285950/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Translations
var translations = {
    en_DK: {
        'Tribe Stats Tools': 'Tribe Stats Tools',
        Help: 'Help',
        'Script is already loaded and running!':
            'Script is already loaded and running!',
        Actions: 'Actions',
        'Error while fetching "ally.txt"!': 'Error while fetching "ally.txt"!',
        Rank: 'Rank',
        'Tribe Name': 'Tribe Name',
        Points: 'Points',
        Players: 'Players',
        Villages: 'Villages',
        Actions: 'Actions',
        Allies: 'Allies',
        Enemies: 'Enemies',
        'Add Ally': 'Add Ally',
        'Add Enemy': 'Add Enemy',
        Remove: 'Remove',
        'Added as Enemy!': 'Added as Enemy!',
        'Is already added as Enemy!': 'Is already added as Enemy!',
        'Added as Ally!': 'Added as Ally!',
        'Is already added as Ally!': 'Is already added as Ally!',
        'Invalid Action!': 'Invalid Action!',
        'No Allies!': 'No Allies!',
        'No Enemies!': 'No Enemies!',
        'Total Points': 'Total Points',
        'Total Tribes': 'Total Tribes',
        'Total Players': 'Total Players',
        'Total Villages': 'Total Villages',
        'Points/Player': 'Points/Player',
        'Points/Village': 'Points/Village',
        Reset: 'Reset',
        'Generate Map': 'Generate Map',
        'Tribes Map': 'Tribes Map',
        'Open Image': 'Open Image',
        'BB Export': 'BB Export',
    },
    pl_PL: {
        'Tribe Stats Tools': 'Tribe Stats Tools',
        Help: 'Pomoc',
        'Script is already loaded and running!':
            'Skrypt jest załadowany i działa!',
        Actions: 'Akcje',
        'Error while fetching "ally.txt"!':
            'Błąd podczas pobierania "ally.txt"!',
        Rank: 'Rank',
        'Tribe Name': 'Nazwa Plemienia',
        Points: 'Punkty',
        Players: 'Gracze',
        Villages: 'Wioski',
        Actions: 'Akcje',
        Allies: 'Sojusznicy',
        Enemies: 'Przeciwnicy',
        'Add Ally': 'Dodaj Sojusznika',
        'Add Enemy': 'Dodaj Przeciwnika',
        Remove: 'Usuń',
        'Added as Enemy!': 'Dodano jako przeciwnika!',
        'Is already added as Enemy!': 'Jest już dodany jako wróg!',
        'Added as Ally!': 'Dodano jako sojusznika!',
        'Is already added as Ally!': 'Jest już dodany jako sojusznik!',
        'Invalid Action!': 'Nieprawidłowa akcja!',
        'No Allies!': 'Brak Sojuszników!',
        'No Enemies!': 'Brak Przeciwników!',
        'Total Points': 'Suma Punktów',
        'Total Tribes': 'Suma Plemion',
        'Total Players': 'Suma Graczy',
        'Total Villages': 'Suma Wiosek',
        'Points/Player': 'Średnia punktów na gracza',
        'Points/Village': 'Średnia punktów na wioskę',
        Reset: 'Reset',
        'Generate Map': 'Generuj Mapę',
        'Tribes Map': 'Mapa Plemion',
        'Open Image': 'Otwórz obraz',
        'BB Export': 'BB Export',
    },
    pt_PT: {
        'Tribe Stats Tools': 'Ferramenta de estatísticas de tribo',
        Help: 'Ajuda',
        'Script is already loaded and running!':
            'O script já carregou e está a correr!',
        Actions: 'Ações',
        'Error while fetching "ally.txt"!': 'Erro a procurar "ally.txt"!',
        Rank: 'Classificação',
        'Tribe Name': 'Nome da tribo',
        Points: 'Pontos',
        Players: 'Jiogadores',
        Villages: 'Aldeias',
        Actions: 'Ações',
        Allies: 'Aliados',
        Enemies: 'Inimigos',
        'Add Ally': 'Adicionar aliado',
        'Add Enemy': 'Adicionar inimigo',
        Remove: 'Remover',
        'Added as Enemy!': 'Adicionado como inimigo!',
        'Is already added as Enemy!': 'Já está adicionado como inimigo!',
        'Added as Ally!': 'Adicionado como aliado!',
        'Is already added as Ally!': 'Já está adicionado como aliado!',
        'Invalid Action!': 'Ação inválida!',
        'No Allies!': 'Sem aliados!',
        'No Enemies!': 'Sem inimigos!',
        'Total Points': 'Total de pontos',
        'Total Tribes': 'Total de tribos',
        'Total Players': 'Total de jogadores',
        'Total Villages': 'Total de aldeias',
        'Points/Player': 'Pontos/Jogador',
        'Points/Village': 'Pontos/Aldeia',
        Reset: 'Reset',
        'Generate Map': 'Gerar mapa',
        'Tribes Map': 'Mapa das tribos',
        'Open Image': 'Abrir imagem',
        'BB Export': 'Exportar código BB',
    },
};

// Globals
var tribes = [];
var allies = [];
var enemies = [];

// Constants
var ALLY_LAST_UPDATED = 'mapAllyTime'; // localStorage key name
var ALLY_LIST = 'mapAllyList'; // localStorage key name
var TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour

// Init Debug
initDebug();

// Auto-update localStorage villages list
if (localStorage.getItem(ALLY_LAST_UPDATED) != null) {
    var mapAllyLastUpdated = parseInt(localStorage.getItem(ALLY_LAST_UPDATED));
    if (Date.parse(new Date()) >= mapAllyLastUpdated + TIME_INTERVAL) {
        // hour has passed, refetch village.txt
        fetchTribesData();
    } else {
        // hour has not passed, work with village list from localStorage
        var data = localStorage.getItem(ALLY_LIST);
        tribes = CSVToArray(data);
        initTribeStatsTool();
    }
} else {
    // Fetch village.txt
    fetchTribesData();
}

// Fetch 'ally.txt' file
function fetchTribesData() {
    $.get('map/ally.txt', function (data) {
        tribes = CSVToArray(data);
        localStorage.setItem(ALLY_LAST_UPDATED, Date.parse(new Date()));
        localStorage.setItem(ALLY_LIST, data);
    })
        .done(function () {
            initTribeStatsTool();
        })
        .fail(function (error) {
            console.error(`${scriptInfo()} Error:`, error);
            UI.ErrorMessage(tt('Error while fetching "ally.txt"!'), 4000);
        });
}

// Initialize Tribe Stats Tool
function initTribeStatsTool() {
    if (jQuery('#ra-tribe-stats-tool').length < 1) {
        // sort tribes by ranking
        tribes.sort((a, b) => (parseInt(a[7]) > parseInt(b[7]) ? 1 : -1));

        let tribeStats = `
            <div class="ra-tribes-stats">
                <div class="ra-tribes-ally">
                    <h4>${tt('Allies')}</h4>
                    <table class="vis" width="100%" id="allyTotals"></table>
                    <table class="vis" width="100%">
                        <thead>
                            <tr>
                                <th>${tt('Rank')}</th>
                                <th>${tt('Tribe Name')}</th>
                                <th>${tt('Points')}</th>
                                <th>${tt('Players')}</th>
                                <th>${tt('Villages')}</th>
                                <th>${tt('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody id="alliesList">
                            <tr>
                                <td colspan="6" class="td-placeholder">
                                    ${tt('No Allies!')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="ra-tribes-enemy">
                    <h4>${tt('Enemies')}</h4>
                    <table class="vis" width="100%" id="enemyTotals"></table>
                    <table class="vis" width="100%">
                        <thead>
                            <tr>
                                <th>${tt('Rank')}</th>
                                <th>${tt('Tribe Name')}</th>
                                <th>${tt('Points')}</th>
                                <th>${tt('Players')}</th>
                                <th>${tt('Villages')}</th>
                                <th>${tt('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody id="enemiesList">
                            <tr>
                                <td colspan="6" class="td-placeholder">
                                    ${tt('No Enemies!')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        const tribeTableRows = getTribeTableRows();

        const tribesTable = `
            <div class="ra-tribes-table">
                <table class="vis" width="100%">
                    <thead>
                        <tr>
                            <th>${tt('Rank')}</th>
                            <th>${tt('Tribe Name')}</th>
                            <th>${tt('Points')}</th>
                            <th>${tt('Players')}</th>
                            <th>${tt('Villages')}</th>
                            <th>${tt('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tribeTableRows}
                    </tbody>
                </table>
            </div>
        `;

        const content = `
            <div id="ra-tribe-stats-tool" class="vis">
                <h2>${tt(scriptData.name)}</h2>
                <div class="ra-tribe-tools">
                    <a href="javascript:void(0);" onClick="resetAll();" class="btn btn-confirm-no">
                        ${tt('Reset')}
                    </a>
                    <a href="javascript:void(0);" onClick="generateMap();" class="btn btn-confirm-yes">
                        ${tt('Generate Map')}
                    </a>
                    <a href="javascript:void(0);" onClick="bbExport();" class="btn btn-confirm-yes">
                        ${tt('BB Export')}
                    </a>
                </div>
                <div class="ra-tribes-map">
                    <a href="#" class="ra-tribes-map-link" target="_blank" rel="noopener noreferrer">
                        ${tt('Tribes Map')}
                    </a>
                    <a href="#" class="ra-tribes-map-image" target="_blank" rel="noopener noreferrer">
                        ${tt('Open Image')}
                    </a>
                </div>
                <div class="ra-tribes-bbexport">
                    <textarea id="bbExportValue" readonly></textarea>
                </div>
                ${tribeStats}
                ${tribesTable}
                <small>
                    <strong>
                        ${tt(scriptData.name)} ${scriptData.version}
                    </strong> -
                    <a href="${
                        scriptData.authorUrl
                    }" target="_blank" rel="noreferrer noopener">
                        ${scriptData.author}
                    </a> -
                    <a href="${
                        scriptData.helpLink
                    }" target="_blank" rel="noreferrer noopener">
                        ${tt('Help')}
                    </a>
                </small>
            </div>
            <style>
                #ra-tribe-stats-tool { position: relative; display: block; width: auto; height: auto; clear: both; margin: 0 auto 15px; padding: 10px; border: 1px solid #603000; box-sizing: border-box; background: #e3d5b3 url('/graphic/index/main_bg.jpg') scroll right top repeat; }
                .custom-close-button { right: 0; top: 0; }
                .ra-tribes-table { display: block; height: 480px; overflow-y: auto; margin-bottom: 15px; }
                .ra-tribes-table table th,
                .ra-tribes-table table td { padding: 2px 3px; }
                .ra-tribes-stats { display: grid; grid-template-columns: 1fr 1fr; grid-gap: 15px; margin-bottom: 15px; }
                .ra-tribes-stats tfoot td { font-weight: 600; }
                .tr-tribe-info td.ally-tribe { background-color: #49eb92; }
                .tr-tribe-info td.enemy-tribe { background-color: #fca903; }
                .ra-tribes-stats h4 { font-size: 18px; font-weight: 600; font-style: normal; text-align: center; }
                .td-placeholder { text-align: center; padding: 10px !important; font-size: 14px; }
                .ra-tribes-ally h4 { background-color: rgb(0,0,244); color: #fff; }
                .ra-tribes-enemy h4 { background-color: rgb(244,0,0); color: #fff; }
                .ra-tribe-tools { margin-bottom: 15px; }
                .ra-tribes-map { margin-bottom: 15px; display: none; padding: 10px; border: 1px dashed #000; text-align: center; }
                .ra-tribes-map-link { display: inline-block; margin: 0 15px; font-size: 16px; }
                .ra-tribes-map-image { display: inline-block; margin: 0 15px; font-size: 16px; }
                .ra-tribes-bbexport { margin-bottom: 15px; display: none; padding: 10px; border: 1px dashed #000; }
                .ra-tribes-bbexport textarea { width: 100%; height: 150px; resize: none; box-sizing: border-box; }
            </style>
        `;

        jQuery('#content_value').prepend(content);
    } else {
        UI.ErrorMessage(tt('Script is already loaded and running!'));
    }
}

// Get Tribe Table Rows
function getTribeTableRows() {
    let tribeTableRows = ``;
    tribes.forEach((tribe) => {
        const id = parseInt(tribe[0]);
        const rank = parseInt(tribe[7]);
        const name = decodeURIComponent(tribe[2]);
        const points = parseInt(tribe[6]);
        const players = parseInt(tribe[3]);
        const villages = parseInt(tribe[4]);

        if (name !== 'undefined') {
            tribeTableRows += `
                <tr data-tribe-id="${id}" class="tr-tribe-info">
                    <td>${rank}</td>
                    <td>
                        <a href="/game.php?screen=info_ally&id=${id}" target="_blank" rel="noopener noreferrer">
                            ${name}
                        </a>
                    </td>
                    <td>${formatAsNumber(points)}</td>
                    <td>${players}</td>
                    <td>${villages}</td>
                    <td>
                        <a href="javascript:void(0);" onClick="addAlly(${id})" class="btn btn-confirm-yes">
                            ${tt('Add Ally')}
                        </a>
                        <a href="javascript:void(0);" onClick="addEnemy(${id})" class="btn btn-confirm-no">
                            ${tt('Add Enemy')}
                        </a>
                    </td>
                </tr>
            `;
        }
    });
    return tribeTableRows;
}

// Render tribes list
function renderTribesList(tribes, type) {
    let tribeTableRows = '';
    tribes.forEach((tribe) => {
        const id = parseInt(tribe[0]);
        const rank = parseInt(tribe[7]);
        const name = decodeURIComponent(tribe[2]);
        const points = parseInt(tribe[6]);
        const players = parseInt(tribe[3]);
        const villages = parseInt(tribe[4]);

        tribeTableRows += `
            <tr>
                <td>${rank}</td>
                <td>
                    <a href="/game.php?screen=info_ally&id=${id}" target="_blank" rel="noopener noreferrer">
                        ${name}
                    </a>
                </td>
                <td>${formatAsNumber(points)}</td>
                <td>${players}</td>
                <td>${villages}</td>
                <td>
                    <a href="javascript:void(0);" onClick="removeRelationship(${id}, '${type}')" class="btn">
                        ${tt('Remove')}
                    </a>
                </td>
            </tr>
        `;
    });
    return tribeTableRows;
}

// Add Ally
function addAlly(tribeId) {
    const isAlreadyAlly = allies.filter(
        (ally) => parseInt(ally[0]) === parseInt(tribeId)
    );

    if (isAlreadyAlly.length === 0) {
        const newAlly = tribes.filter(
            (tribe) => parseInt(tribe[0]) === parseInt(tribeId)
        );
        allies = [...allies, ...newAlly];
        allies.sort((a, b) => (parseInt(a[7]) > parseInt(b[7]) ? 1 : -1));
        const alliesList = renderTribesList(allies, 'ally');
        jQuery(`.tr-tribe-info[data-tribe-id="${tribeId}"] td`).addClass(
            'ally-tribe'
        );
        jQuery('#alliesList').html(alliesList);
        UI.SuccessMessage(tt('Added as Ally!'), 600);
        updateTotals('ally');
    } else {
        UI.ErrorMessage(tt('Is already added as Ally!'), 600);
    }
}

// Add Enemy
function addEnemy(tribeId) {
    const isAlreadyEnemy = enemies.filter(
        (enemy) => parseInt(enemy[0]) === parseInt(tribeId)
    );

    if (isAlreadyEnemy.length === 0) {
        const newEnemy = tribes.filter(
            (tribe) => parseInt(tribe[0]) === parseInt(tribeId)
        );
        enemies = [...enemies, ...newEnemy];
        enemies.sort((a, b) => (parseInt(a[7]) > parseInt(b[7]) ? 1 : -1));
        const enemiesList = renderTribesList(enemies, 'enemy');
        jQuery(`.tr-tribe-info[data-tribe-id="${tribeId}"] td`).addClass(
            'enemy-tribe'
        );
        jQuery('#enemiesList').html(enemiesList);
        UI.SuccessMessage(tt('Added as Enemy!'), 600);
        updateTotals('enemy');
    } else {
        UI.ErrorMessage(tt('Is already added as Enemy!'), 600);
    }
}

// Remove tribe relationship
function removeRelationship(id, type) {
    if (type === 'ally') {
        allies = allies.filter((ally) => parseInt(ally[0]) !== parseInt(id));
        allies.sort((a, b) => (parseInt(a[7]) > parseInt(b[7]) ? 1 : -1));
        const alliesList = renderTribesList(allies, 'ally');
        jQuery(`.tr-tribe-info[data-tribe-id="${id}"] td`).removeClass(
            'ally-tribe'
        );
        jQuery('#alliesList').html(alliesList);
        updateTotals('ally');
    } else if (type === 'enemy') {
        enemies = enemies.filter(
            (enemy) => parseInt(enemy[0]) !== parseInt(id)
        );
        enemies.sort((a, b) => (parseInt(a[7]) > parseInt(b[7]) ? 1 : -1));
        const enemiesList = renderTribesList(enemies, 'enemy');
        jQuery(`.tr-tribe-info[data-tribe-id="${id}"] td`).removeClass(
            'enemy-tribe'
        );
        jQuery('#enemiesList').html(enemiesList);
        updateTotals('enemy');
    } else {
        UI.ErrorMessage(tt('Invalid Action!'));
    }
}

// Update tribe stats totals
function updateTotals(type) {
    if (type === 'ally') {
        let allyPoints = 0;
        let allyPlayers = 0;
        let allyVillages = 0;
        allies.forEach((tribe) => {
            const points = parseInt(tribe[6]);
            const players = parseInt(tribe[3]);
            const villages = parseInt(tribe[4]);
            allyPoints += points;
            allyPlayers += players;
            allyVillages += villages;
        });

        const allyPointsPlayer = allyPoints / allyPlayers;
        const allyPointsVillage = allyPoints / allyVillages;

        const allyTotals = `
            <tbody>
                <tr>
                    <th>${tt('Total Points')}</th>
                    <td>${formatAsNumber(allyPoints)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Tribes')}</th>
                    <td>${formatAsNumber(allies.length)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Players')}</th>
                    <td>${formatAsNumber(allyPlayers)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Villages')}</th>
                    <td>${formatAsNumber(allyVillages)}</td>
                </tr>
                <tr>
                    <th>${tt('Points/Player')}</th>
                    <td>${formatAsNumber(allyPointsPlayer)}</td>
                </tr>
                <tr>
                    <th>${tt('Points/Village')}</th>
                    <td>${formatAsNumber(allyPointsVillage)}</td>
                </tr>
            </tbody>
        `;
        jQuery('#allyTotals').html(allyTotals);
    } else {
        let enemyPoints = 0;
        let enemyPlayers = 0;
        let enemyVillages = 0;
        enemies.forEach((tribe) => {
            const points = parseInt(tribe[6]);
            const players = parseInt(tribe[3]);
            const villages = parseInt(tribe[4]);
            enemyPoints += points;
            enemyPlayers += players;
            enemyVillages += villages;
        });

        const enemyPointsPlayer = enemyPoints / enemyPlayers;
        const enemyPointsVillage = enemyPoints / enemyVillages;

        const enemyTotals = `
            <tbody>
                <tr>
                    <th>${tt('Total Points')}</th>
                    <td>${formatAsNumber(enemyPoints)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Tribes')}</th>
                    <td>${formatAsNumber(enemies.length)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Players')}</th>
                    <td>${formatAsNumber(enemyPlayers)}</td>
                </tr>
                <tr>
                    <th>${tt('Total Villages')}</th>
                    <td>${formatAsNumber(enemyVillages)}</td>
                </tr>
                <tr>
                    <th>${tt('Points/Player')}</th>
                    <td>${formatAsNumber(enemyPointsPlayer)}</td>
                </tr>
                <tr>
                    <th>${tt('Points/Village')}</th>
                    <td>${formatAsNumber(enemyPointsVillage)}</td>
                </tr>
            </tbody>
        `;
        jQuery('#enemyTotals').html(enemyTotals);
    }
}

// Reset all diplomatic relationships
function resetAll() {
    const defaultAlliesList = `
        <tr>
            <td colspan="6" class="td-placeholder">
                ${tt('No Allies!')}
            </td>
        </tr>
    `;

    const defaultEnemiesList = `
        <tr>
            <td colspan="6" class="td-placeholder">
                ${tt('No Enemies!')}
            </td>
        </tr>
    `;

    allies = [];
    enemies = [];
    jQuery('#allyTotals').html('');
    jQuery('#enemyTotals').html('');
    jQuery('#alliesList').html(defaultAlliesList);
    jQuery('#enemiesList').html(defaultEnemiesList);
    jQuery('.tr-tribe-info td')
        .removeClass('ally-tribe')
        .removeClass('enemy-tribe');
    jQuery('.ra-tribes-map').fadeOut(200);
    jQuery('.ra-tribes-bbexport').fadeOut(200);
    jQuery('#bbExportValue').val('');
}

// Generate Map
function generateMap(returnValue = false) {
    const allyColor = '0000ff';
    const enemyColor = 'ff0000';
    const allyTribeIds = [];
    const enemyTribeIds = [];

    allies.forEach((ally) => {
        allyTribeIds.push(parseInt(ally[0]));
    });

    enemies.forEach((enemy) => {
        enemyTribeIds.push(parseInt(enemy[0]));
    });

    let enemyTribes = '';
    let allyTribes = '';

    const alliesCount = allyTribeIds.length;
    const enemiesCount = enemyTribeIds.length;
    const totalTribes = alliesCount + enemiesCount;

    allyTribeIds.forEach((tribeId, index) => {
        allyTribes += `&ti${index}=${tribeId}&tc${index}=${allyColor}`;
    });

    enemyTribeIds.forEach((tribeId, index) => {
        enemyTribes += `&ti${totalTribes - index}=${tribeId}&tc${
            totalTribes - index
        }=${enemyColor}`;
    });

    const urlPrefix = game_data.market === 'en' ? '' : game_data.market + '.';

    const startURL = `//${urlPrefix}twstats.com/${game_data.world}/index.php?page=map&zoom=300&centrex=500&centrey=500&nocache=1&fill=000000${allyTribes}${enemyTribes}`;
    const imageURL = `http://twsmap.com/mapservice/${game_data.world}?${allyTribes}${enemyTribes}&zoom=300&centrex=500&centrey=500&nocache=1&fill=000000`;

    if (returnValue === false) {
        if (startURL && imageURL) {
            jQuery('.ra-tribes-map').fadeIn(200);
            jQuery('.ra-tribes-map-link').attr('href', startURL);
            jQuery('.ra-tribes-map-image').attr('href', imageURL);
        }
    } else {
        return startURL;
    }
}

// BB Export
function bbExport() {
    const allyTribeTags = [];
    const enemyTribeTags = [];

    allies.forEach((tribe) => {
        allyTribeTags.push(decodeURIComponent(tribe[2]));
    });

    enemies.forEach((tribe) => {
        enemyTribeTags.push(decodeURIComponent(tribe[2]));
    });

    let allyTribeTagsList = '';
    let enemyTribeTagsList = '';

    allyTribeTags.forEach((tribe) => {
        allyTribeTagsList += `[ally]${tribe}[/ally], `;
    });

    enemyTribeTags.forEach((tribe) => {
        enemyTribeTagsList += `[ally]${tribe}[/ally], `;
    });

    let allyPoints = 0;
    let allyPlayers = 0;
    let allyVillages = 0;

    let enemyPoints = 0;
    let enemyPlayers = 0;
    let enemyVillages = 0;

    allies.forEach((tribe) => {
        const points = parseInt(tribe[6]);
        const players = parseInt(tribe[3]);
        const villages = parseInt(tribe[4]);
        allyPoints += points;
        allyPlayers += players;
        allyVillages += villages;
    });

    enemies.forEach((tribe) => {
        const points = parseInt(tribe[6]);
        const players = parseInt(tribe[3]);
        const villages = parseInt(tribe[4]);
        enemyPoints += points;
        enemyPlayers += players;
        enemyVillages += villages;
    });

    const allyPointsPlayer = allyPoints / allyPlayers;
    const allyPointsVillage = allyPoints / allyVillages;

    const enemyPointsPlayer = enemyPoints / enemyPlayers;
    const enemyPointsVillage = enemyPoints / enemyVillages;

    const allyTotals = `[b]${tt('Total Points')}:[/b] ${formatAsNumber(
        allyPoints
    )}\n[b]${tt('Total Tribes')}:[/b] ${allies.length}\n[b]${tt(
        'Total Players'
    )}:[/b] ${allyPlayers}\n[b]${tt('Total Villages')}:[/b] ${formatAsNumber(
        allyVillages
    )}\n[b]${tt('Points/Player')}:[/b] ${formatAsNumber(
        allyPointsPlayer
    )}\n[b]${tt('Points/Village')}:[/b] ${formatAsNumber(allyPointsVillage)}
    `;

    const enemyTotals = `[b]${tt('Total Points')}:[/b] ${formatAsNumber(
        enemyPoints
    )}\n[b]${tt('Total Tribes')}:[/b] ${enemies.length}\n[b]${tt(
        'Total Players'
    )}:[/b] ${enemyPlayers}\n[b]${tt('Total Villages')}:[/b] ${formatAsNumber(
        enemyVillages
    )}\n[b]${tt('Points/Player')}:[/b] ${formatAsNumber(
        enemyPointsPlayer
    )}\n[b]${tt('Points/Village')}:[/b] ${formatAsNumber(enemyPointsVillage)}
    `;

    const tribesDiploURL = generateMap(true);

    const bbExport = `[b]${tt('Allies')}:[/b] ${allyTribeTagsList}\n[b]${tt(
        'Enemies'
    )}:[/b] ${enemyTribeTagsList}\n\n[u][b]${tt(
        'Allies'
    )}[/b][/u]\n${allyTotals}\n[u][b]${tt(
        'Enemies'
    )}[/b][/u]\n${enemyTotals}\n[url=https:${tribesDiploURL}]${tt(
        'Tribes Map'
    )}[/url]
    `;

    jQuery('.ra-tribes-bbexport').fadeIn(200);
    jQuery('#bbExportValue').val(bbExport);
}

// Helper: Format as number
function formatAsNumber(number) {
    return parseInt(number).toLocaleString('de');
}

//Helper: Convert CSV data into Array
function CSVToArray(strData, strDelimiter) {
    strDelimiter = strDelimiter || ',';
    var objPattern = new RegExp(
        '(\\' +
            strDelimiter +
            '|\\r?\\n|\\r|^)' +
            '(?:"([^"]*(?:""[^"]*)*)"|' +
            '([^"\\' +
            strDelimiter +
            '\\r\\n]*))',
        'gi'
    );
    var arrData = [[]];
    var arrMatches = null;
    while ((arrMatches = objPattern.exec(strData))) {
        var strMatchedDelimiter = arrMatches[1];
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {
            arrData.push([]);
        }
        var strMatchedValue;

        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
        } else {
            strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
}

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

// Helper: Text Translator
function tt(string) {
    var gameLocale = game_data.locale;

    if (translations[gameLocale] !== undefined) {
        return translations[gameLocale][string];
    } else {
        return translations['en_DK'][string];
    }
}
