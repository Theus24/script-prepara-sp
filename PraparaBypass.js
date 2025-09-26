javascript:(function(){
    const hookFetch = () => {
        const originalFetch = window.fetch;
        window.fetch = async function(resource, config){
            if(typeof resource==='string' && resource.includes('/graphql') && config?.body?.includes('createUserInteraction')){
                try{
                    let body = JSON.parse(config.body);
                    body.variables.performance = 1;
                    body.variables.timeSpentInSeconds = Math.floor(Math.random()*15)+5;
                    config.body = JSON.stringify(body);
                    console.log('[PraparaBypass] 100% aplicado para:', body.variables.contentId);
                }catch(e){
                    console.error('[PraparaBypass] erro:', e);
                }
            }
            return originalFetch.apply(this, arguments);
        };
        console.log('[PraparaBypass] Hook fetch ativo!');
    };
    hookFetch();
    setInterval(hookFetch, 2000);
})();
