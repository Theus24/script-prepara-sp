// ==UserScript==
// @name         PraparaSP Resposta Notificação Funcional
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Mostra a alternativa correta de qualquer quiz via notificação
// @match        https://preparasp.jovensgenios.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Permite notificações
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    const originalFetch = window.fetch;
    window.fetch = async function(resource, config) {
        const response = await originalFetch(resource, config);

        if (typeof resource === 'string' && resource.includes('/graphql')) {
            const clone = response.clone();
            clone.json().then(data => {
                if (data?.data?.questions) {
                    data.data.questions.forEach(question => {
                        const correct = question.answers.find(a => a.fraction === 1);
                        if (!correct) return;

                        const textCorrect = correct.text.replace(/<[^>]+>/g, '').trim();
                        console.log("Alternativa correta:", textCorrect);

                        if (Notification.permission === "granted") {
                            new Notification("PraparaSP ✅", {
                                body: `Resposta correta: ${textCorrect}`,
                                icon: "https://preparasp.jovensgenios.com/favicon.ico"
                            });
                        } else {
                            alert(`Resposta correta: ${textCorrect}`);
                        }
                    });
                }
            }).catch(console.error);
        }

        return response;
    };
})();

