// ==UserScript==
// @name         PraparaSP Auto 100%
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Marca automaticamente quizzes com 100% de acerto
// @match        https://preparasp.jovensgenios.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const originalFetch = window.fetch;
    window.fetch = async function(resource, config) {
        if (typeof resource === 'string' &&
            resource.includes('/graphql') &&
            config?.body?.includes('createUserInteraction')) {

            try {
                let body = JSON.parse(config.body);
                // Ajusta a performance para 100%
                body.variables.performance = 1;
                // Ajusta o tempo para parecer realista
                body.variables.timeSpentInSeconds = Math.floor(Math.random() * 15) + 5;
                config.body = JSON.stringify(body);
                console.log('Bypass aplicado com sucesso para:', body.variables.contentId);
            } catch (e) {
                console.error('Erro ao modificar requisição:', e);
            }
        }
        return originalFetch.apply(this, arguments);
    };
})();
