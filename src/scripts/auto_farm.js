// ==UserScript==
// @name 2) Farm Oficial BR119
// @author FaelZito
// @include       https://br119*screen=am_farm*
// @include       https://br119*screen=am_farm&Farm_page=0*
// @include       https://br119*screen=am_farm&Farm_page=0&group=0*
// @include       https://br125*screen=am_farm*
// @include       https://br125*screen=am_farm&Farm_page=0*
// @include       https://br125*screen=am_farm&Farm_page=0&group=0*
// ==/UserScript==

var i =0;
var aux = [];
var menu = $('#am_widget_Farm a.farm_icon_b');
var distanciaMaxima = 28;
var time = 600;
var tempo = document.createElement('td');
var distancia = 0;
var onde = 0;
var aldeia = 0;
var j = 0;
var atual = "";
var atacar = 0;

var x = 0;

function aleatorio(superior,inferior) {
    numPosibilidades = superior - inferior;
    aleat = Math.random() * numPosibilidades;
    return Math.round(parseInt(inferior) + aleat);
}

setTimeout(function(){

    var aldeiaAtual = (document.querySelectorAll("b[class^='nowrap']"));
    atual = aldeiaAtual[0].innerText;
    atual = atual.substring(1,8);
    atual = atual.split("|");
    atual[0] = Number(atual[0]);
    atual[1] = Number(atual[1]);

    // Verifica se ainda existe unidades a serem enviados, caso n o exista ele vai para a pr xima aldeia
       var clickCheck = setInterval(function() {
           var elementoP = document.querySelector(".autoHideBox.error p");
           if (elementoP && elementoP.textContent === "N o existem unidades suficientes") {
               //clearInterval(clickCheck);
               altAldeia();
           }
           var cavalariaLeve = document.getElementById("light");
           if (cavalariaLeve && cavalariaLeve.textContent.trim() === "0"){
               altAldeia();
           }
       }, 5000);

    var els = (document.querySelectorAll("td[style^='font-weight:bold; width:100px; text-align:right']"));
    for (i=0; i< els.length; i++){
        aux[i] = els[i].innerText;
        aux[i] = aux[i].split("|");
        aux[i][0] = Number(aux[i][0]);
        aux[i][1] = Number(aux[i][1]);
    }

    for (j = 0; j < 100; j++) {
        menu = $('#am_widget_Farm a.farm_icon_b');
        $(menu).eq(j).each(function() {
            var saqueFull = ($(this).parents('tr:eq(0)').find('td:eq(2)').html());
            if( saqueFull.indexOf('max_loot/1.png') >= 0){
                saqueFull = 1;
            } else{
                if( saqueFull.indexOf('max_loot/0.png') >= 0){
                    saqueFull = 0;
                }
            }
            saqueFull = Number(saqueFull);

            var relatorioAzul = ($(this).parents('tr:eq(0)').find('td:eq(1)').html());
            var flagConfirmaAzul = 0;
            if( relatorioAzul.indexOf('dots/blue.png') >= 0){
                relatorioAzul = 1;
                flagConfirmaAzul = 1;
            } else{
                // if( relatorioAzul.indexOf('dots/green.png') >= 0){
                relatorioAzul = 1;
                // }
            }
            relatorioAzul = Number(relatorioAzul);

            var relatorioAmarelo = ($(this).parents('tr:eq(0)').find('td:eq(1)').html());
            if( relatorioAmarelo.indexOf('dots/yellow.png') >= 0){
                relatorioAmarelo = 1;
            } else{
                relatorioAmarelo = 0;
            }
            relatorioAmarelo = Number(relatorioAmarelo);

            var distanciaCampos  = Number($(this).parents('tr:eq(0)').find('td:eq(7)').html());

            // Verifica se a aldeia foi explorada
            var isCFarmInterrogacao  = $(this).parents('tr:eq(0)').find('td:eq(6)').html();
            var isCFarmInterrogacaoString = isCFarmInterrogacao.toString();

            //Utilizar a fun  o includes, como no exemplo a seguir, para verificar se cont m a frase: isCFarmDisableString.includes("Sem tropas suficientes")
            var isCFarmDisable = $(this).parents('tr:eq(0)').find('td:eq(10)').html();
            var isCFarmDisableString = isCFarmDisable.toString();

            aldeia = ($(this).parents('tr:eq(0)').find('td:eq(3)').html());
            tempo.innerHTML = aldeia;
            var temp = tempo.innerText;
            temp = String(temp);
            temp = temp.substring(2,9);
            temp = temp.split("|");
            temp[0] = Number(temp[0]);
            temp[1] = Number(temp[1]);

            distancia  = Number($(this).parents('tr:eq(0)').find('td:eq(7)').html());
            var distanciaAtual = distancia;
            /*alert("Distancia atual: " + distanciaAtual);
            if(distanciaAtual >= distanciaMaxima){
                altAldeia();
            }*/

            // console.log("Aldeia atual: ", atual[0], atual[1]);
            // console.log("Aldeia a ser atacada: ",temp[0], temp[1]);
            // console.log("Dist ncia at  o alvo:", distancia);

            for(i=0; i<els.length; i++){
                var comp = Number(Math.sqrt(Math.pow((aux[i][0]-temp[0]),2) + Math.pow((aux[i][1]-temp[1]),2)).toFixed(1));
                if ((comp <= distancia)){
                    distancia = comp;
                    onde = i;
                }

            }
            if (distanciaCampos <= distanciaMaxima && relatorioAzul != 0 /*&& flagConfirmaAzul != 1 && relatorioAmarelo != 1*/){
                if (distancia == distanciaAtual){
                    if(isCFarmInterrogacaoString == "?"){
                        menu = $('#am_widget_Farm a.farm_icon_a');
                        $(menu).eq(j).each(function() {
                            if (!($(this).parent().parent().find('img.tooltip').length)) {
                                var tempoAgora = (time * ++x) - aleatorio(200,240);
                                setTimeout(function(minhaVar) {
                                    $(minhaVar).click();
                                }, tempoAgora, this);
                            }
                        });
                    }

                    if(isCFarmDisableString.includes("Sem tropas suficientes")){
                        menu = $('#am_widget_Farm a.farm_icon_b');
                        $(menu).eq(j).each(function() {
                            if (!($(this).parent().parent().find('img.tooltip').length)) {
                                var tempoAgora = (time * ++x) - aleatorio(200,240);
                                setTimeout(function(minhaVar) {
                                    $(minhaVar).click();
                                }, tempoAgora, this);
                            }
                        });
                    }

                    // console.log("Atacar desta aldeia!");
                    if (saqueFull == 0){
                        menu = $('#am_widget_Farm a.farm_icon_c');
                        $(menu).eq(j).each(function() {
                            if (!($(this).parent().parent().find('img.tooltip').length)) {
                                var tempoAgora = (time * ++x) - aleatorio(200,240);
                                setTimeout(function(minhaVar) {
                                    $(minhaVar).click();
                                }, tempoAgora, this);
                            }
                        });
                    }
                    else{
                        menu = $('#am_widget_Farm a.farm_icon_c');
                        $(menu).eq(j).each(function() {
                            if (!($(this).parent().parent().find('img.tooltip').length)) {
                                var tempoAgora = (time * ++x) - aleatorio(200,240);
                                setTimeout(function(minhaVar) {
                                    $(minhaVar).click();
                                }, tempoAgora, this);
                            }
                        });
                    }
                    //verificaTropasAldeia();
                }
                else{
                    setTimeout(function(){
                        altAldeia();
                    }, 15000);
                }
            }
            else{
                /*setTimeout(function(){
                    altAldeia();
                }, 2000);*/
            }
        });
    }
}, 1000);

function altAldeia(){
    $('.arrowRight').click();
    $('.groupRight').click();
    $('div.arrow.arrowRight').click();
    $('div.arrow.groupRight').click();
}

if (!document.getElementsByClassName('rc-anchor-center-item rc-anchor-checkbox-label').length){
    setInterval(function(){
        altAldeia();
    }, 15000);
}

setTimeout(function(){
    window.location.reload();
}, 20000);