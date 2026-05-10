// ==UserScript==
// @name         Akuma Signature Panel
// @namespace    https://github.com/joelkalil/tribal-wars-akuma
// @version      1.0.0
// @description  Painel Akuma para orquestrar scripts de barra de acesso no Tribal Wars.
// @author       Akuma
// @match        https://*.tribalwars.com.br/game.php*
// @match        https://*.tribalwars.com.pt/game.php*
// @match        https://*.tribalwars.net/game.php*
// @connect      cdn.jsdelivr.net
// @connect      raw.githubusercontent.com
// @connect      twscripts.dev
// @connect      shinko-to-kuma.com
// @connect      www.shinko-to-kuma.com
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {

    'use strict';

    const PANEL_ID = 'akuma-signature-panel';

    const REGISTRY_URL = 'https://cdn.jsdelivr.net/gh/joelkalil/tribal-wars-akuma@main/src/scripts/barra_de_acesso/akuma_signature/registry.js';

    const BASE_URL = REGISTRY_URL.replace(/\/registry\.js$/, '');

    const STORAGE_KEY_OPEN = 'akuma_signature_panel_open';

    const state = {
        open: GM_getValue(STORAGE_KEY_OPEN, true),
        loading: true,
        scripts: [],
        activeCategory: 'Todos',
        search: '',
        status: 'Carregando assinatura Akuma...'
    };

    addTheme();

    addScriptTheme();

    renderPanel();

    loadRegistry();

    function addTheme() {

        GM_addStyle(`
            #${PANEL_ID} {
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
                --akuma-purple: #7367f0;
                color: var(--akuma-text);
                font-family: Arial, Helvetica, sans-serif;
                left: 50%;
                max-width: min(1180px, calc(100vw - 24px));
                position: fixed;
                top: 8px;
                transform: translateX(-50%);
                width: 1180px;
                z-index: 999999;
            }

            #${PANEL_ID} * {
                box-sizing: border-box;
                letter-spacing: 0;
            }

            #${PANEL_ID} .akuma-shell {
                background: rgba(23, 24, 32, 0.96);
                border: 1px solid var(--akuma-border);
                border-radius: 8px;
                box-shadow: 0 18px 50px rgba(0, 0, 0, 0.52);
                overflow: hidden;
            }

            #${PANEL_ID} .akuma-topbar {
                align-items: center;
                background: linear-gradient(90deg, rgba(34, 255, 122, 0.12), rgba(53, 167, 255, 0.10));
                border-bottom: 1px solid var(--akuma-border);
                display: flex;
                gap: 12px;
                justify-content: space-between;
                padding: 10px 12px;
            }

            #${PANEL_ID} .akuma-brand {
                align-items: center;
                display: flex;
                gap: 10px;
                min-width: 210px;
            }

            #${PANEL_ID} .akuma-mark {
                align-items: center;
                background: #15161d;
                border: 1px solid var(--akuma-border);
                border-radius: 7px;
                color: var(--akuma-green);
                display: grid;
                font-size: 17px;
                font-weight: 900;
                height: 34px;
                place-items: center;
                width: 34px;
            }

            #${PANEL_ID} .akuma-title {
                color: var(--akuma-text);
                font-size: 14px;
                font-weight: 900;
                margin: 0;
            }

            #${PANEL_ID} .akuma-subtitle {
                color: var(--akuma-muted);
                font-size: 11px;
                margin-top: 2px;
            }

            #${PANEL_ID} .akuma-controls {
                align-items: center;
                display: flex;
                gap: 8px;
                min-width: 0;
            }

            #${PANEL_ID} .akuma-search {
                background: #15161d;
                border: 1px solid var(--akuma-border);
                border-radius: 7px;
                color: var(--akuma-text);
                height: 34px;
                min-width: 260px;
                padding: 0 10px;
            }

            #${PANEL_ID} .akuma-search:focus {
                border-color: var(--akuma-blue);
                box-shadow: 0 0 0 2px rgba(53, 167, 255, 0.22);
                outline: none;
            }

            #${PANEL_ID} button {
                background: linear-gradient(135deg, var(--akuma-purple), var(--akuma-blue));
                border: 0;
                border-radius: 7px;
                color: #fff;
                cursor: pointer;
                font-size: 12px;
                font-weight: 800;
                height: 34px;
                padding: 0 12px;
                text-shadow: none;
            }

            #${PANEL_ID} button:hover {
                filter: brightness(1.08);
            }

            #${PANEL_ID} .akuma-toggle {
                min-width: 38px;
                padding: 0;
            }

            #${PANEL_ID} .akuma-body {
                display: grid;
                gap: 10px;
                max-height: min(560px, calc(100vh - 76px));
                overflow: auto;
                padding: 12px;
            }

            #${PANEL_ID} .akuma-status {
                background: var(--akuma-panel);
                border: 1px solid var(--akuma-border);
                border-radius: 8px;
                color: var(--akuma-muted);
                padding: 10px 12px;
            }

            #${PANEL_ID} .akuma-categories {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            #${PANEL_ID} .akuma-chip {
                background: var(--akuma-panel-soft);
                border: 1px solid var(--akuma-border);
                color: var(--akuma-muted);
            }

            #${PANEL_ID} .akuma-chip.is-active {
                background: linear-gradient(135deg, #12c976, var(--akuma-green));
                color: #07130d;
            }

            #${PANEL_ID} .akuma-grid {
                display: grid;
                gap: 10px;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }

            #${PANEL_ID} .akuma-card {
                background: var(--akuma-panel);
                border: 1px solid var(--akuma-border);
                border-radius: 8px;
                display: grid;
                gap: 8px;
                min-height: 148px;
                padding: 12px;
            }

            #${PANEL_ID} .akuma-card-title {
                color: var(--akuma-text);
                font-size: 13px;
                font-weight: 900;
                line-height: 1.3;
            }

            #${PANEL_ID} .akuma-card-meta {
                color: var(--akuma-muted);
                font-size: 11px;
                line-height: 1.35;
            }

            #${PANEL_ID} .akuma-card-footer {
                align-items: end;
                display: flex;
                gap: 8px;
                justify-content: space-between;
                margin-top: auto;
            }

            #${PANEL_ID} .akuma-category {
                color: var(--akuma-green);
                font-size: 11px;
                font-weight: 800;
            }

            #${PANEL_ID} .akuma-run {
                background: linear-gradient(135deg, var(--akuma-orange), var(--akuma-red));
            }

            #${PANEL_ID}.is-closed .akuma-body {
                display: none;
            }

            @media (max-width: 720px) {
                #${PANEL_ID} {
                    top: 4px;
                    width: calc(100vw - 8px);
                }

                #${PANEL_ID} .akuma-topbar {
                    align-items: stretch;
                    flex-direction: column;
                }

                #${PANEL_ID} .akuma-controls {
                    width: 100%;
                }

                #${PANEL_ID} .akuma-search {
                    min-width: 0;
                    width: 100%;
                }
            }
        `);

    }

    function addScriptTheme() {

        GM_addStyle(`
            :root {
                --akuma-script-bg: #171820;
                --akuma-script-panel: #20212a;
                --akuma-script-panel-soft: #292a35;
                --akuma-script-border: #3b3e4c;
                --akuma-script-text: #f5f7ff;
                --akuma-script-muted: #a9afc4;
                --akuma-script-green: #22ff7a;
                --akuma-script-blue: #35a7ff;
                --akuma-script-red: #ff315f;
                --akuma-script-orange: #ff8a24;
                --akuma-script-purple: #7367f0;
            }

            .ra-fixed-widget,
            .ra-box-widget,
            .popup_box_container,
            .popup_box_content,
            .ra-popup-content,
            .ra-table-container,
            .ra-fieldset,
            #restart,
            #totals,
            #sendResources,
            #tableSend,
            .sophHeader,
            .sophRowA,
            .sophRowB,
            .content {
                background: var(--akuma-script-panel) !important;
                border-color: var(--akuma-script-border) !important;
                color: var(--akuma-script-text) !important;
            }

            .ra-fixed-widget,
            .ra-box-widget,
            .popup_box_container,
            #restart,
            #tableSend {
                border: 1px solid var(--akuma-script-border) !important;
                border-radius: 8px !important;
                box-shadow: 0 18px 50px rgba(0, 0, 0, 0.42) !important;
                overflow: hidden !important;
            }

            .ra-fixed-widget [class$='-header'],
            .ra-box-widget [class$='-header'],
            .popup_box_container .popup_box_header,
            .ra-title,
            .ra-section-title,
            .ra-table th,
            #tableSend > tbody > tr:first-child td,
            #tableSend > tbody > tr:nth-child(2) td,
            #totalsAndAverages tr:first-child td,
            .collapsible {
                background: linear-gradient(90deg, rgba(34, 255, 122, 0.12), rgba(53, 167, 255, 0.08)) !important;
                border-color: var(--akuma-script-border) !important;
                color: var(--akuma-script-green) !important;
            }

            .ra-table,
            .ra-table-v2,
            .ra-table-v3,
            .ra-table tbody,
            .ra-table tr,
            .ra-table td,
            .ra-table th,
            #tableSend td,
            #totalsAndAverages td {
                background-color: var(--akuma-script-panel) !important;
                border-color: var(--akuma-script-border) !important;
                color: var(--akuma-script-text) !important;
            }

            .ra-table tr:nth-child(even) td,
            .ra-table-v2 tr:nth-child(even) td,
            .ra-table-v3 tr:nth-child(even) td,
            .sophRowB {
                background-color: #242631 !important;
            }

            .ra-table tr:hover td,
            .ra-table-v2 tr:hover td,
            .ra-table-v3 tr:hover td,
            .sophRowA:hover,
            .sophRowB:hover {
                background-color: rgba(53, 167, 255, 0.10) !important;
            }

            .ra-input,
            .ra-select,
            .ra-textarea,
            .ra-fixed-widget input[type='text'],
            .ra-fixed-widget input[type='number'],
            .ra-fixed-widget select,
            .ra-fixed-widget textarea,
            .ra-box-widget input[type='text'],
            .ra-box-widget input[type='number'],
            .ra-box-widget select,
            .ra-box-widget textarea,
            .popup_box_container input[type='text'],
            .popup_box_container input[type='number'],
            .popup_box_container select,
            .popup_box_container textarea {
                background: #15161d !important;
                border: 1px solid var(--akuma-script-border) !important;
                border-radius: 7px !important;
                color: var(--akuma-script-text) !important;
            }

            .ra-fixed-widget .btn,
            .ra-box-widget .btn,
            .popup_box_container .btn,
            .ra-popup-content .btn,
            .ra-fixed-widget button,
            .ra-box-widget button,
            .popup_box_container button,
            .btnSophie,
            #sendResources .btn,
            #aftermath .btn,
            #tableSend .btn {
                background: linear-gradient(135deg, var(--akuma-script-purple), var(--akuma-script-blue)) !important;
                border: 0 !important;
                border-radius: 7px !important;
                box-shadow: 0 8px 22px rgba(53, 167, 255, 0.18) !important;
                color: #fff !important;
                font-weight: 800 !important;
                text-shadow: none !important;
            }

            .ra-fixed-widget .btn-confirm-yes,
            .ra-box-widget .btn-confirm-yes,
            .popup_box_container .btn-confirm-yes,
            .btn-confirm-yes {
                background: linear-gradient(135deg, #12c976, var(--akuma-script-green)) !important;
                color: #07130d !important;
            }

            .ra-fixed-widget .btn-confirm-no,
            .ra-box-widget .btn-confirm-no,
            .popup_box_container .btn-confirm-no,
            .btn-confirm-no {
                background: linear-gradient(135deg, #b71335, var(--akuma-script-red)) !important;
                color: #fff !important;
            }

            .ra-label,
            .ra-hint,
            .ra-muted,
            .ra-help,
            .ra-small {
                color: var(--akuma-script-muted) !important;
            }

            .ra-fixed-widget a,
            .ra-box-widget a,
            .popup_box_container a,
            .ra-popup-content a,
            .sophLink,
            #tableSend a {
                color: var(--akuma-script-blue) !important;
                font-weight: 700 !important;
            }

            #progressbar,
            #progressbar #progress,
            .progress-bar,
            .progress {
                background: #14151c !important;
                border-color: var(--akuma-script-border) !important;
                border-radius: 999px !important;
            }

            #progressbar #progress span,
            .progress-bar span,
            .progress span,
            #progress {
                background: linear-gradient(90deg, var(--akuma-script-green), var(--akuma-script-blue)) !important;
                color: #07130d !important;
            }
        `);

    }

    function renderPanel() {

        let panel = document.getElementById(PANEL_ID);

        if (!panel) {

            panel = document.createElement('div');

            panel.id = PANEL_ID;

            document.body.appendChild(panel);

        }

        panel.className = state.open ? '' : 'is-closed';

        panel.innerHTML = `
            <div class="akuma-shell">
                <div class="akuma-topbar">
                    <div class="akuma-brand">
                        <div class="akuma-mark">A</div>
                        <div>
                            <p class="akuma-title">Akuma Signature</p>
                            <div class="akuma-subtitle">${state.scripts.length} scripts carregados</div>
                        </div>
                    </div>
                    <div class="akuma-controls">
                        <input class="akuma-search" type="search" value="${escapeHtml(state.search)}" placeholder="Buscar script...">
                        <button class="akuma-reload" type="button">Atualizar</button>
                        <button class="akuma-toggle" type="button">${state.open ? '▲' : '▼'}</button>
                    </div>
                </div>
                <div class="akuma-body">
                    <div class="akuma-status">${escapeHtml(state.status)}</div>
                    <div class="akuma-categories">${renderCategories()}</div>
                    <div class="akuma-grid">${renderScripts()}</div>
                </div>
            </div>
        `;

        bindPanel(panel);

    }

    function bindPanel(panel) {

        panel.querySelector('.akuma-toggle').addEventListener('click', function () {

            state.open = !state.open;

            GM_setValue(STORAGE_KEY_OPEN, state.open);

            renderPanel();

        });

        panel.querySelector('.akuma-reload').addEventListener('click', function () {

            loadRegistry();

        });

        panel.querySelector('.akuma-search').addEventListener('input', function (event) {

            state.search = event.target.value;

            renderPanel();

        });

        panel.querySelectorAll('[data-category]').forEach(function (button) {

            button.addEventListener('click', function () {

                state.activeCategory = button.dataset.category;

                renderPanel();

            });

        });

        panel.querySelectorAll('[data-run]').forEach(function (button) {

            button.addEventListener('click', function () {

                const script = state.scripts.find((item) => item.id === button.dataset.run);

                runScript(script);

            });

        });

    }

    function renderCategories() {

        const categories = ['Todos', ...new Set(state.scripts.map((script) => script.category))].sort(function (a, b) {

            if (a === 'Todos') {

                return -1;

            }

            if (b === 'Todos') {

                return 1;

            }

            return a.localeCompare(b);

        });

        return categories.map(function (category) {

            const active = category === state.activeCategory ? ' is-active' : '';

            return `<button class="akuma-chip${active}" type="button" data-category="${escapeAttr(category)}">${escapeHtml(category)}</button>`;

        }).join('');

    }

    function renderScripts() {

        const scripts = getVisibleScripts();

        if (state.loading) {

            return `<div class="akuma-status">Carregando registry e descriptors...</div>`;

        }

        if (scripts.length === 0) {

            return `<div class="akuma-status">Nenhum script encontrado para esse filtro.</div>`;

        }

        return scripts.map(function (script) {

            return `
                <div class="akuma-card">
                    <div>
                        <div class="akuma-category">${escapeHtml(script.category)}</div>
                        <div class="akuma-card-title">${escapeHtml(script.name)}</div>
                    </div>
                    <div class="akuma-card-meta">${escapeHtml(script.description || '')}</div>
                    <div class="akuma-card-meta">Autor: ${escapeHtml(script.author || 'Nao informado')}</div>
                    <div class="akuma-card-footer">
                        <div class="akuma-card-meta">${escapeHtml(script.file)}</div>
                        <button class="akuma-run" type="button" data-run="${escapeAttr(script.id)}">Executar</button>
                    </div>
                </div>
            `;

        }).join('');

    }

    function getVisibleScripts() {

        const query = normalize(state.search);

        return state.scripts.filter(function (script) {

            const matchesCategory = state.activeCategory === 'Todos' || script.category === state.activeCategory;

            const haystack = normalize(`${script.name} ${script.file} ${script.category} ${script.author}`);

            return matchesCategory && haystack.includes(query);

        });

    }

    async function loadRegistry() {

        state.loading = true;

        state.status = 'Carregando registry...';

        state.scripts = [];

        renderPanel();

        try {

            await loadScriptFile(REGISTRY_URL);

            const files = unsafeWindow.AkumaSignatureScriptFiles || window.AkumaSignatureScriptFiles || [];

            state.status = `Carregando ${files.length} descriptors...`;

            renderPanel();

            unsafeWindow.AkumaSignatureScripts = [];

            for (const file of files) {

                await loadScriptFile(`${BASE_URL}/${file}`);

            }

            state.scripts = [...(unsafeWindow.AkumaSignatureScripts || [])].sort(function (a, b) {

                return a.name.localeCompare(b.name);

            });

            state.status = 'Pronto. Escolha um script para executar.';

        } catch (error) {

            console.error('Akuma Signature:', error);

            state.status = `Erro ao carregar painel: ${error.message || error}`;

        } finally {

            state.loading = false;

            renderPanel();

        }

    }

    async function runScript(script) {

        if (!script) {

            return;

        }

        state.status = `Carregando ${script.name}...`;

        renderPanel();

        try {

            const source = await requestText(script.originalUrl);

            const code = `${script.prelude || ''}\n${source}\n//# sourceURL=akuma-signature/${script.file}`;

            executeInPage(code);

            state.status = `${script.name} executado.`;

        } catch (error) {

            console.error(`Akuma Signature ${script.name}:`, error);

            state.status = `Erro ao executar ${script.name}: ${error.message || error}`;

        }

        renderPanel();

    }

    function executeInPage(code) {

        const script = document.createElement('script');

        script.textContent = code;

        (document.head || document.documentElement).appendChild(script);

        script.remove();

    }

    async function loadScriptFile(url) {

        const source = await requestText(url);

        unsafeWindow.eval(`${source}\n//# sourceURL=${url}`);

    }

    function requestText(url) {

        return new Promise(function (resolve, reject) {

            GM_xmlhttpRequest({
                method: 'GET',
                url,
                onload: function (response) {

                    if (response.status >= 200 && response.status < 300) {

                        resolve(response.responseText);

                        return;

                    }

                    reject(new Error(`HTTP ${response.status} em ${url}`));

                },
                onerror: function () {

                    reject(new Error(`Falha de rede em ${url}`));

                }
            });

        });

    }

    function normalize(value) {

        return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    }

    function escapeHtml(value) {

        return String(value || '').replace(/[&<>"']/g, function (char) {

            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[char];

        });

    }

    function escapeAttr(value) {

        return escapeHtml(value).replace(/`/g, '&#096;');

    }

})();
