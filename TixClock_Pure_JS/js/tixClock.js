const log = document.getElementById('log');
const clock = document.getElementById('clock');

const hour_dX = document.getElementById('hour_dX');
const hour_uX = document.getElementById('hour_uX');

const minute_dX = document.getElementById('minute_dX');
const minute_uX = document.getElementById('minute_uX');

const second_dX  = document.getElementById('second_dX');
const second_uX  = document.getElementById('second_uX');
const second_biX  = document.getElementById('second_biX');



const main = function () {

    showBinarySecondsClock(CONFIG.ShowBinarySecondsClock);
    showClockInPage(CONFIG.ShowClocks);
    showInformationLog(CONFIG.ShowInformationLog);

    setInterval(time, CONFIG.SetIntervalMilliseconds);
}

const time = function() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours('');

    clock.textContent = h + ":" + m + ":" + s;

    let hours_decimal = hour_dX.textContent = Math.floor(h/10);
    let hours_unit = hour_uX.textContent = h%10;

    let minute_decimal = minute_dX.textContent = Math.floor(m/10);
    let minute_unit = minute_uX.textContent = m%10;

    second_biX.textContent = s;
    let second_decimal = second_dX.textContent = Math.floor(s/10);
    let second_unit = second_uX.textContent = s%10;


    setOn(hours_decimal, 3, 'hour_d');
    setOn(hours_unit, 9, 'hour_u');
    setOn(minute_decimal, 6, 'minute_d');
    setOn(minute_unit, 9, 'minute_u');


    if(CONFIG.ShowBinarySecondsClock)
    {
        setSecondsBinary(s);
    }
    else
    {
        setOn(second_decimal, 6, 'second_d');
        setOn(second_unit, 9, 'second_u');
    }
}

var setOn = function(pValue, cantLights, prefix)
{
    let randomList = getRandomList(pValue, cantLights);

    for (let index = 1; index <= cantLights; index++) {
        const celda = document.getElementById(prefix + index);
        celda.classList.remove("on");
    }

    for (let index = 0; index < randomList.length; index++) {
        const element = randomList[index];

        const celda = document.getElementById(prefix + element);
        celda.classList.add("on");
    }
}

var setSecondsBinary = function(s)
{
    const cantCeldas = 6;
    const prefix = 'second_bi';
    let binaryDecimalSeconds = Number(s).toString(2).padStart(cantCeldas,0);

    second_biX.textContent += "''\n Binary: " + binaryDecimalSeconds;

    for (let index = 1; index <= cantCeldas; index++) {
        let celda = document.getElementById(prefix + index);

        if(celda)
        celda.classList.remove("on");
    }

    for (let index = binaryDecimalSeconds.length; index >= 0 ; index--) {

        if(binaryDecimalSeconds[index-1] == "1"){
            const celda = document.getElementById(prefix + index);
            celda.classList.add("on");
        }
    }

}

var getRandomList = function(numbers, maxOptions) {

    var retorno = [];

    for (let index = 0; index < numbers; index++)
    {
        let auxRandom = Math.ceil(Math.random() * maxOptions);

        while(retorno.find(element => element === auxRandom))
        {
            auxRandom = Math.ceil(Math.random() * maxOptions);
        }

        retorno.push(auxRandom);
    }

    return retorno;
}

var showBinarySecondsClock = function(flag){
    let binaryClass = 'Binary';

    if(flag)
    binaryClass = 'noBinary';

    let items = document.getElementsByClassName(binaryClass)

    for (let index = 0; index < items.length; index++) {
        const element = items[index];

        element.classList.add("d-none");

    }
}

const showClockInPage = function(flag){
    if(!flag){
        const item = document.getElementById('clock');
        item.classList.add("d-none");
    }
}

const showInformationLog = function(flag){
    if(!flag){
        const items = document.getElementsByClassName('log');

        for (let index = 0; index < items.length; index++) {
            const element = items[index];

            element.classList.add("d-none");

        }
    }
}

/************************************************ Config ************************************************/

CONFIG = {
    ShowClocks: false,
    ShowInformationLog : true,
    ShowBinarySecondsClock : false,
    SetIntervalMilliseconds : 1000
}

/************************************************ Start ************************************************/

main();