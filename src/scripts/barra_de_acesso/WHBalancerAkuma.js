/*
 * Script Name: Akuma WH Cluster Balancer
 * Version: v1.0.0-akuma.1
 * Last Updated: 2026-05-10
 * Author: Akuma
 * Inspired by: Sophie "Shinko to Kuma"
 * Original reference: WHBalancerShinkoToKuma.js
 */

(function () {

    'use strict';

    const SCRIPT = {
        name: 'Akuma WH Cluster Balancer',
        storageKey: 'AKUMA_WH_CLUSTER_BALANCER_SETTINGS'
    };

    const DEFAULT_SETTINGS = {
        maxClusterDistance: 18,
        absorbSingletons: true,
        targetWarehouseRatio: 0.70,
        maxTargetWarehouseRatio: 0.85,
        minTransfer: 1000,
        reservedMerchants: 0,
        includeIncomingResources: true
    };

    const RESOURCES = ['wood', 'stone', 'iron'];

    const RESOURCE_LABELS = {
        wood: 'Madeira',
        stone: 'Argila',
        iron: 'Ferro'
    };

    const RESOURCE_CLASSES = {
        wood: 'wood',
        stone: 'stone',
        iron: 'iron'
    };

    let villages = [];

    let clusters = [];

    let transfers = [];

    let settings = loadSettings();

    applyAkumaTheme();

    exposeGlobals();

    init();

    async function init() {

        renderShell('Carregando dados das aldeias...');

        try {

            const incomingResources = settings.includeIncomingResources ? await fetchIncomingResources() : {};

            villages = await fetchVillages(incomingResources);

            if (villages.length === 0) {

                renderError('Nenhuma aldeia encontrada na visao de producao.');

                return;

            }

            clusters = createClusters(villages, settings.maxClusterDistance, settings.absorbSingletons);

            transfers = createTransfers(clusters, settings);

            renderApp();

        } catch (error) {

            console.error(`${SCRIPT.name}:`, error);

            renderError('Erro ao carregar o balanceador. Veja o console para detalhes.');

        }

    }

    function loadSettings() {

        const stored = localStorage.getItem(SCRIPT.storageKey);

        if (!stored) {

            return { ...DEFAULT_SETTINGS };

        }

        try {

            return {
                ...DEFAULT_SETTINGS,
                ...JSON.parse(stored)
            };

        } catch (error) {

            return { ...DEFAULT_SETTINGS };

        }

    }

    function saveSettings(nextSettings) {

        settings = nextSettings;

        localStorage.setItem(SCRIPT.storageKey, JSON.stringify(settings));

    }

    async function fetchVillages(incomingResources) {

        const url = buildGameUrl('overview_villages&mode=prod&page=-1');

        const page = await jQuery.get(url);

        const parsed = jQuery(jQuery.parseHTML(page));

        const villageElements = parsed.find('.quickedit-vn');

        return Array.from(villageElements).map(function (element) {

            return parseVillage(parsed, element, incomingResources);

        }).filter(Boolean);

    }

    function parseVillage(parsedPage, villageElement, incomingResources) {

        const row = jQuery(villageElement).closest('tr');

        const id = String(villageElement.dataset.id || extractIdFromHref(jQuery(villageElement).find('a').attr('href')));

        const name = jQuery(villageElement).text().trim();

        const coords = extractCoords(name);

        if (!id || !coords) {

            return null;

        }

        const woodElement = row.find('.res.wood,.warn_90.wood,.warn.wood,.res.mwood,.warn_90.mwood,.warn.mwood').first();

        const stoneElement = row.find('.res.stone,.warn_90.stone,.warn.stone,.res.mstone,.warn_90.mstone,.warn.mstone').first();

        const ironElement = row.find('.res.iron,.warn_90.iron,.warn.iron,.res.miron,.warn_90.miron,.warn.miron').first();

        const resourceCell = ironElement.closest('td');

        const warehouseCapacity = parseNumber(resourceCell.next().text()) || parseWarehouseFallback(parsedPage, id);

        const merchantCellText = resourceCell.next().next().text();

        const merchants = parseMerchants(merchantCellText);

        const incoming = incomingResources[id] || emptyResources();

        return {
            id,
            name,
            x: coords.x,
            y: coords.y,
            url: jQuery(villageElement).find('a').attr('href') || buildGameUrl(`info_village&id=${id}`),
            warehouseCapacity,
            merchantsAvailable: merchants.available,
            merchantsTotal: merchants.total,
            resources: {
                wood: parseNumber(woodElement.text()),
                stone: parseNumber(stoneElement.text()),
                iron: parseNumber(ironElement.text())
            },
            incoming
        };

    }

    function parseWarehouseFallback(parsedPage, villageId) {

        const villageElement = parsedPage.find(`.quickedit-vn[data-id="${villageId}"]`);

        const row = villageElement.closest('tr');

        const resourceHeader = row.find('.mheader.ressources').parent().text();

        return parseNumber(resourceHeader);

    }

    async function fetchIncomingResources() {

        const url = buildGameUrl('overview_villages&mode=trader&type=inc&page=-1');

        const incoming = {};

        try {

            const page = await jQuery.get(url);

            const parsed = jQuery(jQuery.parseHTML(page));

            parsed.find('#trades_table tr').each(function () {

                const row = jQuery(this);

                const rowText = row.text();

                const targetId = extractIdFromHref(row.find('a[href*="info_village"]').last().attr('href'));

                if (!targetId || /Premium|Sistema|System/i.test(rowText)) {

                    return;

                }

                incoming[targetId] = incoming[targetId] || emptyResources();

                RESOURCES.forEach(function (resource) {

                    const value = parseResourceFromRow(row, resource);

                    incoming[targetId][resource] += value;

                });

            });

        } catch (error) {

            console.warn(`${SCRIPT.name}: nao foi possivel ler recursos a caminho.`, error);

        }

        return incoming;

    }

    function parseResourceFromRow(row, resource) {

        const selector = `.icon.header.${RESOURCE_CLASSES[resource]}, .icon.mheader.${RESOURCE_CLASSES[resource]}, .${RESOURCE_CLASSES[resource]}`;

        const icon = row.find(selector).first();

        if (!icon.length) {

            return 0;

        }

        const text = icon.parent().text() || icon.closest('td').text();

        return parseNumber(text);

    }

    function createClusters(sourceVillages, maxDistance, absorbSingletons) {

        const sortedVillages = [...sourceVillages].sort(function (a, b) {

            return a.x - b.x || a.y - b.y;

        });

        const nextClusters = [];

        sortedVillages.forEach(function (village) {

            const compatibleCluster = nextClusters.find(function (cluster) {

                return cluster.villages.every(function (clusterVillage) {

                    return distance(village, clusterVillage) <= maxDistance;

                });

            });

            if (compatibleCluster) {

                compatibleCluster.villages.push(village);

                return;

            }

            nextClusters.push({
                id: nextClusters.length + 1,
                villages: [village]
            });

        });

        if (absorbSingletons) {

            absorbSingleVillageClusters(nextClusters);

        }

        return nextClusters.map(function (cluster, index) {

            return {
                id: index + 1,
                villages: cluster.villages,
                centroid: getCentroid(cluster.villages)
            };

        });

    }

    function absorbSingleVillageClusters(nextClusters) {

        const singletons = nextClusters.filter((cluster) => cluster.villages.length === 1);

        singletons.forEach(function (singleton) {

            if (!nextClusters.includes(singleton) || nextClusters.length === 1) {

                return;

            }

            const village = singleton.villages[0];

            const targetCluster = nextClusters
                .filter((cluster) => cluster !== singleton)
                .sort(function (a, b) {

                    return distanceToCluster(village, a) - distanceToCluster(village, b);

                })[0];

            targetCluster.villages.push(village);

            nextClusters.splice(nextClusters.indexOf(singleton), 1);

        });

    }

    function createTransfers(clusterList, currentSettings) {

        return clusterList.flatMap(function (cluster) {

            return createClusterTransfers(cluster, currentSettings);

        }).sort(function (a, b) {

            return a.clusterId - b.clusterId || a.distance - b.distance;

        });

    }

    function createClusterTransfers(cluster, currentSettings) {

        const plans = [];

        const merchantLimits = {};

        cluster.villages.forEach(function (village) {

            merchantLimits[village.id] = Math.max(0, village.merchantsAvailable - currentSettings.reservedMerchants);

        });

        RESOURCES.forEach(function (resource) {

            plans.push(...createResourceTransfers(cluster, resource, currentSettings, merchantLimits));

        });

        return mergeTransfers(plans);

    }

    function createResourceTransfers(cluster, resource, currentSettings, merchantLimits) {

        const clusterVillages = cluster.villages;

        const total = clusterVillages.reduce(function (sum, village) {

            return sum + village.resources[resource] + village.incoming[resource];

        }, 0);

        const average = Math.floor(total / clusterVillages.length);

        const donors = [];

        const receivers = [];

        clusterVillages.forEach(function (village) {

            const effectiveAmount = village.resources[resource] + village.incoming[resource];

            const targetAmount = getTargetAmount(village, average, currentSettings);

            const delta = effectiveAmount - targetAmount;

            if (delta >= currentSettings.minTransfer) {

                donors.push({
                    village,
                    amount: Math.floor(Math.min(delta, village.resources[resource]) / currentSettings.minTransfer) * currentSettings.minTransfer
                });

                return;

            }

            if (delta <= -currentSettings.minTransfer) {

                receivers.push({
                    village,
                    amount: Math.floor(Math.abs(delta) / currentSettings.minTransfer) * currentSettings.minTransfer
                });

            }

        });

        const resourceTransfers = [];

        receivers.sort((a, b) => b.amount - a.amount);

        receivers.forEach(function (receiver) {

            donors.sort(function (a, b) {

                return distance(a.village, receiver.village) - distance(b.village, receiver.village);

            });

            donors.forEach(function (donor) {

                if (receiver.amount <= 0 || donor.amount <= 0 || merchantLimits[donor.village.id] <= 0) {

                    return;

                }

                const merchantCapacity = merchantLimits[donor.village.id] * currentSettings.minTransfer;

                const amount = Math.min(receiver.amount, donor.amount, merchantCapacity);

                const roundedAmount = Math.floor(amount / currentSettings.minTransfer) * currentSettings.minTransfer;

                if (roundedAmount <= 0) {

                    return;

                }

                resourceTransfers.push(createTransfer(cluster.id, donor.village, receiver.village, resource, roundedAmount));

                donor.amount -= roundedAmount;

                merchantLimits[donor.village.id] -= roundedAmount / currentSettings.minTransfer;

                receiver.amount -= roundedAmount;

            });

        });

        return resourceTransfers;

    }

    function createTransfer(clusterId, source, target, resource, amount) {

        return {
            clusterId,
            source,
            target,
            distance: Math.round(distance(source, target) * 10) / 10,
            wood: resource === 'wood' ? amount : 0,
            stone: resource === 'stone' ? amount : 0,
            iron: resource === 'iron' ? amount : 0
        };

    }

    function mergeTransfers(transferList) {

        const byRoute = {};

        transferList.forEach(function (transfer) {

            const key = `${transfer.clusterId}:${transfer.source.id}:${transfer.target.id}`;

            byRoute[key] = byRoute[key] || {
                clusterId: transfer.clusterId,
                source: transfer.source,
                target: transfer.target,
                distance: transfer.distance,
                wood: 0,
                stone: 0,
                iron: 0
            };

            byRoute[key].wood += transfer.wood;

            byRoute[key].stone += transfer.stone;

            byRoute[key].iron += transfer.iron;

        });

        return Object.values(byRoute).filter(function (transfer) {

            return transfer.wood + transfer.stone + transfer.iron > 0;

        });

    }

    function getTargetAmount(village, average, currentSettings) {

        const maxTarget = Math.floor(village.warehouseCapacity * currentSettings.maxTargetWarehouseRatio);

        const preferredTarget = Math.floor(village.warehouseCapacity * currentSettings.targetWarehouseRatio);

        return Math.min(average, maxTarget, Math.max(preferredTarget, currentSettings.minTransfer));

    }

    function renderShell(message) {

        removeExistingApp();

        const host = getHost();

        host.prepend(`
            <div id="akuma-wh-balancer" class="akuma-wh">
                <div class="akuma-wh__header">
                    <div>
                        <div class="akuma-wh__eyebrow">Akuma Scripts</div>
                        <h2>${SCRIPT.name}</h2>
                    </div>
                    <button class="akuma-wh__ghost" onclick="window.akumaWHBalancer.reload()">Recarregar</button>
                </div>
                <div class="akuma-wh__body">
                    <div class="akuma-wh__notice">${message}</div>
                </div>
            </div>
        `);

    }

    function renderError(message) {

        const app = jQuery('#akuma-wh-balancer .akuma-wh__body');

        app.html(`<div class="akuma-wh__notice akuma-wh__notice--danger">${message}</div>`);

    }

    function renderApp() {

        const app = jQuery('#akuma-wh-balancer .akuma-wh__body');

        const totals = getTotals(villages);

        app.html(`
            ${renderSettings()}
            ${renderSummary(totals)}
            ${renderClusters()}
            ${renderTransfers()}
        `);

    }

    function renderSettings() {

        return `
            <div class="akuma-wh__panel">
                <div class="akuma-wh__panel-title">Configuracao</div>
                <div class="akuma-wh__grid">
                    ${inputField('maxClusterDistance', 'Raio maximo', settings.maxClusterDistance, 'number', '1', '1')}
                    ${inputField('targetWarehouseRatio', 'Alvo do armazem', settings.targetWarehouseRatio, 'number', '0.01', '0.05')}
                    ${inputField('maxTargetWarehouseRatio', 'Limite maximo do armazem', settings.maxTargetWarehouseRatio, 'number', '0.01', '0.05')}
                    ${inputField('minTransfer', 'Minimo por envio', settings.minTransfer, 'number', '1000', '1000')}
                    ${inputField('reservedMerchants', 'Mercadores reservados', settings.reservedMerchants, 'number', '1', '0')}
                    <label class="akuma-wh__toggle">
                        <input id="akuma-setting-absorbSingletons" type="checkbox" ${settings.absorbSingletons ? 'checked' : ''}>
                        <span>Aldeia isolada entra no cluster mais proximo</span>
                    </label>
                    <label class="akuma-wh__toggle">
                        <input id="akuma-setting-includeIncomingResources" type="checkbox" ${settings.includeIncomingResources ? 'checked' : ''}>
                        <span>Considerar recursos a caminho</span>
                    </label>
                </div>
                <div class="akuma-wh__actions">
                    <button onclick="window.akumaWHBalancer.save()">Salvar e recalcular</button>
                    <button class="akuma-wh__ghost" onclick="window.akumaWHBalancer.reset()">Resetar</button>
                </div>
            </div>
        `;

    }

    function renderSummary(totals) {

        return `
            <div class="akuma-wh__stats">
                <div><span>Aldeias</span><strong>${villages.length}</strong></div>
                <div><span>Clusters</span><strong>${clusters.length}</strong></div>
                <div><span>Envios</span><strong>${transfers.length}</strong></div>
                <div><span>Madeira</span><strong>${formatNumber(totals.wood)}</strong></div>
                <div><span>Argila</span><strong>${formatNumber(totals.stone)}</strong></div>
                <div><span>Ferro</span><strong>${formatNumber(totals.iron)}</strong></div>
            </div>
        `;

    }

    function renderClusters() {

        const rows = clusters.map(function (cluster) {

            const names = cluster.villages.map((village) => village.name).join('<br>');

            return `
                <tr>
                    <td>#${cluster.id}</td>
                    <td>${cluster.villages.length}</td>
                    <td>${cluster.centroid.x.toFixed(1)}|${cluster.centroid.y.toFixed(1)}</td>
                    <td>${names}</td>
                </tr>
            `;

        }).join('');

        return `
            <div class="akuma-wh__panel">
                <div class="akuma-wh__panel-title">Clusters</div>
                <div class="akuma-wh__table-wrap">
                    <table class="akuma-wh__table">
                        <thead>
                            <tr>
                                <th>Cluster</th>
                                <th>Aldeias</th>
                                <th>Centro</th>
                                <th>Lista</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        `;

    }

    function renderTransfers() {

        if (transfers.length === 0) {

            return `
                <div class="akuma-wh__panel">
                    <div class="akuma-wh__panel-title">Envios</div>
                    <div class="akuma-wh__notice">Nenhum envio necessario com as configuracoes atuais.</div>
                </div>
            `;

        }

        const rows = transfers.map(function (transfer, index) {

            return `
                <tr id="akuma-transfer-${index}">
                    <td>#${transfer.clusterId}</td>
                    <td><a href="${transfer.source.url}" target="_blank" rel="noreferrer">${transfer.source.name}</a></td>
                    <td><a href="${transfer.target.url}" target="_blank" rel="noreferrer">${transfer.target.name}</a></td>
                    <td>${transfer.distance}</td>
                    <td>${resourceCell('wood', transfer.wood)}</td>
                    <td>${resourceCell('stone', transfer.stone)}</td>
                    <td>${resourceCell('iron', transfer.iron)}</td>
                    <td><button onclick="window.akumaWHBalancer.send(${index})">Enviar</button></td>
                </tr>
            `;

        }).join('');

        return `
            <div class="akuma-wh__panel">
                <div class="akuma-wh__panel-title">Envios sugeridos</div>
                <div class="akuma-wh__table-wrap">
                    <table class="akuma-wh__table">
                        <thead>
                            <tr>
                                <th>Cluster</th>
                                <th>Origem</th>
                                <th>Destino</th>
                                <th>Dist.</th>
                                <th>Madeira</th>
                                <th>Argila</th>
                                <th>Ferro</th>
                                <th>Acao</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        `;

    }

    function inputField(name, label, value, type, step, min) {

        return `
            <label class="akuma-wh__field">
                <span>${label}</span>
                <input id="akuma-setting-${name}" type="${type}" value="${value}" step="${step}" min="${min}">
            </label>
        `;

    }

    function resourceCell(resource, amount) {

        if (!amount) {

            return '-';

        }

        return `<span class="icon header ${RESOURCE_CLASSES[resource]}"></span> ${formatNumber(amount)}`;

    }

    function sendTransfer(index) {

        const transfer = transfers[index];

        if (!transfer) {

            return;

        }

        const payload = {
            target_id: transfer.target.id,
            wood: transfer.wood,
            stone: transfer.stone,
            iron: transfer.iron
        };

        TribalWars.post('market', {
            ajaxaction: 'map_send',
            village: transfer.source.id
        }, payload, function (response) {

            UI.SuccessMessage(response.message || 'Recursos enviados.');

            jQuery(`#akuma-transfer-${index}`).fadeOut(150);

        }, false);

    }

    function saveFromForm() {

        const nextSettings = {
            maxClusterDistance: readNumberSetting('maxClusterDistance'),
            targetWarehouseRatio: readNumberSetting('targetWarehouseRatio'),
            maxTargetWarehouseRatio: readNumberSetting('maxTargetWarehouseRatio'),
            minTransfer: readNumberSetting('minTransfer'),
            reservedMerchants: readNumberSetting('reservedMerchants'),
            absorbSingletons: jQuery('#akuma-setting-absorbSingletons').prop('checked'),
            includeIncomingResources: jQuery('#akuma-setting-includeIncomingResources').prop('checked')
        };

        saveSettings(sanitizeSettings(nextSettings));

        init();

    }

    function sanitizeSettings(nextSettings) {

        return {
            maxClusterDistance: Math.max(1, nextSettings.maxClusterDistance || DEFAULT_SETTINGS.maxClusterDistance),
            targetWarehouseRatio: clamp(nextSettings.targetWarehouseRatio || DEFAULT_SETTINGS.targetWarehouseRatio, 0.05, 1),
            maxTargetWarehouseRatio: clamp(nextSettings.maxTargetWarehouseRatio || DEFAULT_SETTINGS.maxTargetWarehouseRatio, 0.05, 1),
            minTransfer: Math.max(1000, nextSettings.minTransfer || DEFAULT_SETTINGS.minTransfer),
            reservedMerchants: Math.max(0, nextSettings.reservedMerchants || 0),
            absorbSingletons: Boolean(nextSettings.absorbSingletons),
            includeIncomingResources: Boolean(nextSettings.includeIncomingResources)
        };

    }

    function readNumberSetting(name) {

        return Number(jQuery(`#akuma-setting-${name}`).val());

    }

    function exposeGlobals() {

        window.akumaWHBalancer = {
            reload: init,
            save: saveFromForm,
            reset: function () {

                localStorage.removeItem(SCRIPT.storageKey);

                settings = loadSettings();

                init();

            },
            send: sendTransfer
        };

    }

    function getTotals(sourceVillages) {

        return sourceVillages.reduce(function (totals, village) {

            RESOURCES.forEach(function (resource) {

                totals[resource] += village.resources[resource] + village.incoming[resource];

            });

            return totals;

        }, emptyResources());

    }

    function getCentroid(clusterVillages) {

        const total = clusterVillages.reduce(function (sum, village) {

            sum.x += village.x;

            sum.y += village.y;

            return sum;

        }, { x: 0, y: 0 });

        return {
            x: total.x / clusterVillages.length,
            y: total.y / clusterVillages.length
        };

    }

    function distanceToCluster(village, cluster) {

        const centroid = getCentroid(cluster.villages);

        return Math.hypot(village.x - centroid.x, village.y - centroid.y);

    }

    function distance(a, b) {

        return Math.hypot(a.x - b.x, a.y - b.y);

    }

    function buildGameUrl(path) {

        const sitter = game_data.player.sitter > 0 ? `t=${game_data.player.id}&` : '';

        return `/game.php?${sitter}screen=${path}`;

    }

    function getHost() {

        if (jQuery('#content_value').length) {

            return jQuery('#content_value').eq(0);

        }

        if (jQuery('.content-border').length) {

            return jQuery('.content-border').eq(0);

        }

        return jQuery('body');

    }

    function removeExistingApp() {

        jQuery('#akuma-wh-balancer').remove();

    }

    function emptyResources() {

        return {
            wood: 0,
            stone: 0,
            iron: 0
        };

    }

    function extractCoords(text) {

        const match = String(text).match(/(\d{1,3})\|(\d{1,3})/);

        if (!match) {

            return null;

        }

        return {
            x: Number(match[1]),
            y: Number(match[2])
        };

    }

    function extractIdFromHref(href) {

        const match = String(href || '').match(/[?&]id=(\d+)/);

        return match ? match[1] : '';

    }

    function parseMerchants(text) {

        const match = String(text || '').match(/(\d+)\s*\/\s*(\d+)/);

        if (!match) {

            const amount = parseNumber(text);

            return {
                available: amount,
                total: amount
            };

        }

        return {
            available: Number(match[1]),
            total: Number(match[2])
        };

    }

    function parseNumber(value) {

        const normalized = String(value || '').replace(/[^\d]/g, '');

        return normalized ? Number(normalized) : 0;

    }

    function formatNumber(value) {

        return Number(value || 0).toLocaleString('pt-BR');

    }

    function clamp(value, min, max) {

        return Math.max(min, Math.min(max, value));

    }

    function applyAkumaTheme() {

        if (document.getElementById('akuma-wh-theme')) {

            return;

        }

        const style = document.createElement('style');

        style.id = 'akuma-wh-theme';

        style.textContent = `
            #akuma-wh-balancer.akuma-wh {
                --akuma-bg: #171820;
                --akuma-panel: #20212a;
                --akuma-panel-soft: #292a35;
                --akuma-border: #3b3e4c;
                --akuma-text: #f5f7ff;
                --akuma-muted: #a9afc4;
                --akuma-green: #22ff7a;
                --akuma-blue: #35a7ff;
                --akuma-red: #ff315f;
                --akuma-orange: #ff8a24;
                color: var(--akuma-text);
                background: var(--akuma-bg);
                border: 1px solid var(--akuma-border);
                border-radius: 8px;
                box-shadow: 0 18px 50px rgba(0, 0, 0, 0.42);
                margin: 0 0 16px;
                overflow: hidden;
            }

            .akuma-wh__header {
                align-items: center;
                background: linear-gradient(90deg, rgba(34, 255, 122, 0.12), rgba(53, 167, 255, 0.1));
                border-bottom: 1px solid var(--akuma-border);
                display: flex;
                justify-content: space-between;
                padding: 16px 18px;
            }

            .akuma-wh__eyebrow {
                color: var(--akuma-green);
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
            }

            .akuma-wh h2 {
                color: var(--akuma-text);
                font-size: 18px;
                letter-spacing: 0;
                margin: 4px 0 0;
            }

            .akuma-wh__body {
                display: grid;
                gap: 16px;
                padding: 16px;
            }

            .akuma-wh__panel,
            .akuma-wh__stats > div,
            .akuma-wh__notice {
                background: var(--akuma-panel);
                border: 1px solid var(--akuma-border);
                border-radius: 8px;
            }

            .akuma-wh__panel {
                padding: 16px;
            }

            .akuma-wh__panel-title {
                color: var(--akuma-green);
                font-weight: 800;
                margin-bottom: 12px;
            }

            .akuma-wh__grid {
                display: grid;
                gap: 12px;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            }

            .akuma-wh__field,
            .akuma-wh__toggle {
                color: var(--akuma-muted);
                display: grid;
                gap: 6px;
                font-size: 12px;
            }

            .akuma-wh__toggle {
                align-content: end;
                grid-template-columns: 18px 1fr;
            }

            .akuma-wh input {
                background: #15161d;
                border: 1px solid var(--akuma-border);
                border-radius: 7px;
                color: var(--akuma-text);
                padding: 8px 10px;
            }

            .akuma-wh input:focus {
                border-color: var(--akuma-blue);
                box-shadow: 0 0 0 2px rgba(53, 167, 255, 0.22);
                outline: none;
            }

            .akuma-wh__actions {
                display: flex;
                gap: 10px;
                margin-top: 14px;
            }

            .akuma-wh button {
                background: linear-gradient(135deg, #12c976, var(--akuma-green));
                border: 0;
                border-radius: 7px;
                color: #07130d;
                cursor: pointer;
                font-weight: 800;
                padding: 8px 12px;
            }

            .akuma-wh button.akuma-wh__ghost {
                background: linear-gradient(135deg, #7367f0, var(--akuma-blue));
                color: #fff;
            }

            .akuma-wh__stats {
                display: grid;
                gap: 10px;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }

            .akuma-wh__stats > div {
                padding: 12px;
            }

            .akuma-wh__stats span {
                color: var(--akuma-muted);
                display: block;
                font-size: 12px;
            }

            .akuma-wh__stats strong {
                color: var(--akuma-blue);
                display: block;
                font-size: 18px;
                margin-top: 4px;
            }

            .akuma-wh__notice {
                color: var(--akuma-muted);
                padding: 14px;
            }

            .akuma-wh__notice--danger {
                border-color: rgba(255, 49, 95, 0.5);
                color: var(--akuma-red);
            }

            .akuma-wh__table-wrap {
                max-height: 520px;
                overflow: auto;
            }

            .akuma-wh__table {
                border-collapse: collapse;
                width: 100%;
            }

            .akuma-wh__table th,
            .akuma-wh__table td {
                border-bottom: 1px solid var(--akuma-border);
                color: var(--akuma-text);
                padding: 9px;
                text-align: left;
                vertical-align: top;
            }

            .akuma-wh__table th {
                background: rgba(34, 255, 122, 0.08);
                color: var(--akuma-green);
                position: sticky;
                top: 0;
                z-index: 1;
            }

            .akuma-wh__table tr:hover td {
                background: rgba(53, 167, 255, 0.08);
            }

            .akuma-wh a {
                color: var(--akuma-blue);
                font-weight: 700;
            }
        `;

        document.head.appendChild(style);

    }

})();
