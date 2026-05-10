javascript:(function () {

    const COORDS = 'xxx|yyy xxx|yyy ...';

    const COOKIE_NAME = 'farm';

    const COOKIE_EXPIRES = new Date(2027, 3, 27);

    const RAM_AMOUNT = 1;

    const SPY_AMOUNT = 50;

    let doc = document;

    if (window.frames.length > 0 && window.main !== null) {

        doc = window.main.document;

    }

    if (doc.URL.indexOf('screen=place') === -1) {

        alert('Use o script na praça de reunião.');

        return;

    }

    const coordsList = COORDS.split(' ');

    const farmCookie = document.cookie.match('(^|;) ?farm=([^;]*)(;|$)');

    let index = farmCookie !== null ? parseInt(farmCookie[2], 10) : 0;

    if (index >= coordsList.length) {

        alert('Todas as aldeias foram usadas. O script vai recomeçar pela primeira.');

        index = 0;

    }

    const coords = coordsList[index].split('|');

    index += 1;

    document.cookie = `${COOKIE_NAME}=${index};expires=${COOKIE_EXPIRES.toGMTString()}`;

    doc.forms[0].x.value = coords[0];

    doc.forms[0].y.value = coords[1];

    $('#place_target').find('input').val(`${coords[0]}|${coords[1]}`);

    doc.forms[0].ram.value = RAM_AMOUNT;

    doc.forms[0].spy.value = SPY_AMOUNT;

})();
