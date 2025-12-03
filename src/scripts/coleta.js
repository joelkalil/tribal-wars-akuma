// ==UserScript==
// @name         Busca eficiente automatica V2.2 (FINAL)
// @version      2.2 (FINAL)
// @description  adapted by filipescp96
// @author       filipescp96 - Based on Jeff + edit Frozzen work
// @include https://br139.tribalwars.com.br/game.php?*screen=place*&*mode=scavenge*

// @grant GM_setValue
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// ==/UserScript==

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
    'use strict';
    await sleep(3000);
    console.log("Esperou 3 segundos, para dar load à pagina");

    var numTotalBuscas=4; //Numero total de buscas

    //Vars dos primeiro checks
    //vars dos butoes buscas bloqueadas
    var firstNumBuscasBloqueadas;

    var firstBtnsUnlockedChk;
    var firstDispUnlockChk;

    //vars das buscas em desbloqueio
    var firstNumBuscasEmDesbloqueio;

    var firstBeingUnlockedChk;
    var firstDispBeingUnlockedChk;

    //vars dos butoes de enviar
    var firstBtns2;
    var firstDisp2;



    //vars dos ultimos
    //vars dos butoes buscas bloqueada
    var numBuscasBloqueadas;

    var btnsUnlocked;
    var dispUnlock;

    //vars das buscas em desbloqueio
    var numBuscasEmDesbloqueio;

    var dispBeingUnlockedChk;
    var beingUnlockedChk;

    //vars dos botoes de enviar
    var disp2;
    var btns2;


    //vars para o for
    var auxBtn;
    var auxDisp;


    var premiumBtnEnabled=false;

    function buscarObjeto(sObj){var objeto = document.querySelectorAll(sObj); if (objeto!==undefined && objeto[0]!==undefined){return objeto;} else {return undefined;}}

    function btnsDisponiveis(objeto){
        var objRet = {}; var cont = 0;
        for (var i = 0; i < 4; i++) { if (objeto[i]!==undefined){cont = cont + 1; objRet.btn = objeto[i];} }
        objRet.cont = cont;
        return objRet;
    }

    function altAldeia()
    {

        $('.arrowRight').click();
        $('.groupRight').click();

    }

    //corre o script pela primeira vez so mesmo para meter as settings de escolher tropinhas
    $.getScript('https://shinko-to-kuma.com/scripts/scavengingFinal.js');
    //$.getScript('https://dl.dropboxusercontent.com/s/aet6k1lt6xmkhcp/scavengingFMS.js?dl=0');

    await sleep(10000);


    //pa contar # vezes que corre - até 4
  //  var i=0;

    //ver se ha buscas por desbloquear
    firstBtnsUnlockedChk = buscarObjeto("a.btn.btn-default.unlock-button:not(.btn-disabled)");
    if (firstBtnsUnlockedChk!==undefined) {
        firstDispUnlockChk = btnsDisponiveis(firstBtnsUnlockedChk);
        firstNumBuscasBloqueadas = firstDispUnlockChk.cont;
        console.log("Existem buscas bloqueadas. Valor firstDispUnlockChk.cont = " + firstDispUnlockChk.cont);

    }else{
        console.log("não existem buscas bloqueadas. Forçado firstNumBuscasBloqueadas = 0");
        firstNumBuscasBloqueadas = 0
    }

    //ver se existem buscas a ser desbloqueadas
    firstBeingUnlockedChk = buscarObjeto("span.unlock-countdown-text");
    if (firstBeingUnlockedChk!==undefined) {
        console.log("Existem buscas a serem desbloqueadas!!!");
        firstDispBeingUnlockedChk = btnsDisponiveis(firstBeingUnlockedChk);
        firstNumBuscasEmDesbloqueio = firstDispBeingUnlockedChk.cont;
        console.log("Nro de buscas a ser desbloqueadas =" + firstDispBeingUnlockedChk.cont);

    }else{
        console.log("Não existem buscas a serem desbloqueadas. Forçado firstNumBuscasEmDesbloqueio = 0");
        firstNumBuscasEmDesbloqueio = 0
    }


    firstBtns2 = buscarObjeto("a.btn.btn-default.free_send_button:not(.btn-disabled)");
    if (firstBtns2!==undefined) {
        firstDisp2 = btnsDisponiveis(firstBtns2);
        console.log("Existem butoes para enviar - " + firstDisp2.cont);
        console.log("numTotalBuscas - (firstNumBuscasBloqueadas+firstNumBuscasEmDesbloqueio) = " + (numTotalBuscas - (firstNumBuscasBloqueadas+firstNumBuscasEmDesbloqueio)));
        if (firstDisp2.cont == (numTotalBuscas - (firstNumBuscasBloqueadas+firstNumBuscasEmDesbloqueio)) ) {
            //Codigo
            console.log("Todas as tropas em casa!!! - VAI EXECUTAR CODIGO PRINCIPAL");

            for (let i = 0; i < (numTotalBuscas - (firstNumBuscasBloqueadas+firstNumBuscasEmDesbloqueio)); i++ ){

                auxBtn = buscarObjeto("a.btn.btn-default.free_send_button:not(.btn-disabled)");
                auxDisp = btnsDisponiveis(auxBtn);

                console.log("i = " + i);

                premiumBtnEnabled=false;

                $.getScript('https://shinko-to-kuma.com/scripts/scavengingFinal.js');
                console.log("correu logica do shinko, vai esperar 1sec");
                //$.getScript('https://dl.dropboxusercontent.com/s/aet6k1lt6xmkhcp/scavengingFMS.js?dl=0');

                await sleep(2000);

                console.log("esperou 2sec");

                if (auxDisp.cont > 0 ) {
                    //click
                    auxDisp.btn.click();
                    console.log("Enviou! Sobram : "+ (auxDisp.cont-1) + " butões");
                    await sleep(2000);
                    console.log("esperou 2 segundos, vai tentar recomeçar o FOR");
                }

            }
            console.log("Correu 4x - DONE! :). A começar refresh loop...");
            startRefreshOrSwitchLoop();

        } else {
            console.log("Existem " + firstDisp2.cont + " butões de enviar disponiveis, mas as tropas ainda não chegaram todas. (" + (numTotalBuscas - (firstNumBuscasBloqueadas+firstNumBuscasEmDesbloqueio)) +") A começar refresh loop...");
            startRefreshOrSwitchLoop();
        }

    } else {
        console.log("Não existem butões de enviar disponiveis. A começar refresh loop...");
        startRefreshOrSwitchLoop();
    }

    async function startRefreshOrSwitchLoop() {
        while(true){
        //check if all troops have arrived

            //mudar de aldeia
            console.log("Loop 4x done, OU, não existem butoes send disponiveis. A mudar de aldeia...");
            await sleep(1000);
            altAldeia();

            //ver se existem buscas bloqueadas
            btnsUnlocked = buscarObjeto("a.btn.btn-default.unlock-button:not(.btn-disabled)");
            if (btnsUnlocked!==undefined) {
                dispUnlock = btnsDisponiveis(btnsUnlocked);
                console.log("Existem buscas bloqueadas. Valor = " + dispUnlock.cont);
                numBuscasBloqueadas = dispUnlock.cont;

            }else {
                console.log("Não existem buscas bloqueadas. Valor numBuscasBloqueadas forçado a 0");
                numBuscasBloqueadas=0
            }

            //ver se existem buscas a ser desbloqueadas
            beingUnlockedChk = buscarObjeto("span.unlock-countdown-text");
            if (beingUnlockedChk!==undefined) {
                console.log("Existem buscas a serem desbloqueadas!!!");
                dispBeingUnlockedChk = btnsDisponiveis(beingUnlockedChk);
                numBuscasEmDesbloqueio = dispBeingUnlockedChk.cont;
                console.log("Nro de buscas a ser desbloqueadas =" + dispBeingUnlockedChk.cont);

            }else{
                console.log("não existem buscas a serem desbloqueadas. Forçado numBuscasEmDesbloqueio = 0");
                numBuscasEmDesbloqueio = 0
            }
            btns2 = buscarObjeto("a.btn.btn-default.free_send_button:not(.btn-disabled)");
            if (btns2!==undefined) {
                disp2 = btnsDisponiveis(btns2);
                console.log("Existem butoes de enviar disponiveis! disp2.cont = " + disp2.cont);
                console.log("numTotalBuscas - (numBuscasBloqueadas+numBuscasEmDesbloqueio) = " + (numTotalBuscas - (numBuscasBloqueadas+numBuscasEmDesbloqueio)));
                if (disp2.cont == (numTotalBuscas - (numBuscasBloqueadas+numBuscasEmDesbloqueio)) ) {
                    console.log("Numero de butoes send disponiveis == ao numero de buscas desbloqueadas. TODAS AS TROPAS EM CASA! A executar refresh da pagina...");
                    await sleep(1000);
                    window.location.reload();

                }else{
                    console.log("Numero de butoes send disponiveis =/= ao numero de buscas desbloqueadas. A mudar de aldeia...");
                    await sleep(1000);
                    altAldeia();
                }
            }else{
                console.log("Não existem butoes send disponiveis. A mudar de aldeia...");
                await sleep(1000);
                altAldeia();
            }
            console.log("Não tem tropas em casa e não existem aldeias para mudar. A recomeçar loop...");
            await sleep(1000);
        }
    }

})();



