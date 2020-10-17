



let display1 = document.querySelector('.calc-display');
let display2 = document.querySelector('.operation-display');
let buttonNum = document.querySelectorAll('.js-btn-num');
let buttonErase = document.querySelector(".js-btn-erase");
let buttonEraseAll = document.querySelector(".js-btn-erase-all");
let buttonOp = document.querySelectorAll(".js-btn-operand");
let buttonOpSpe = document.querySelectorAll('.js-btn-operand-spe')
let logDiv = document.querySelector('.log');

let nombreStr = "";


let nombreNum = 0;
let secondNombreNum = 0;
let nombreSpe = 0;
let operator;
let lastOp;
let result;
let lastResult;
let resultSpe;
let speDisplay;
display1.textContent = 0;

let operation = {
    addition: function (num1, num2) {
        let resultat = num1 + num2;
        return resultat;
    },
    soustraction: function (num1, num2) {
        let resultat = num1 - num2;
        return resultat;
    },
    produit: function (num1, num2) {
        let resultat = num1 * num2;
        return resultat;
    },
    division: function (num1, num2) {
        let resultat = num1 / num2;
        return resultat;
    },
    modulo: function (num1, num2) {
        let resultat = num1 % num2;
        return resultat;
    }

}

let operationSpe = {
    fraction: function (num) {
        let resultat = 1 / num;
        return resultat;
    },
    puissance: function (num) {
        let resultat = num ** 2;
        return resultat;
    },
    racine: function (num) {
        let resultat = Math.sqrt(num);
        return resultat;
    }
}
//Affichage
let resultClick = false;
let logOp = [];
let logResult = []
let displayOp;


function displayNum(what, display) {
    display.textContent += what + " ";

}
function displayResult(result, display) {
    display.textContent = result;
}

function displaySpe(variable) {
    if (resultClick === true) {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            display2.textContent = " sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            display2.textContent = " √(" + variable + ") ";
        } else {
            display2.textContent = " 1/" + variable + " ";
        }
    } else {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            display2.textContent += " sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            display2.textContent += " √(" + variable + ") ";
        } else {
            display2.textContent += " 1/" + variable + " ";
        }
    }

}


//Comportement bouton operation
function addOp(event) {



    //partie operation
    if (resultClick === true && nombreSpe !== 0) {
        nombreNum = nombreSpe;
        displayResult(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op1");
    } else if (resultClick === true && nombreStr !== "") {
        nombreNum = Number(nombreStr);
        displayResult(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op1Bis");
    } else if (resultClick === true) {
        nombreNum = result
        displayResult(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op1Ter");

    } else if (nombreSpe !== 0 && nombreNum === 0) {
        nombreNum = nombreSpe;
        operator = event.currentTarget.getAttribute('data-operation');
        nombreStr = "";
        console.log("Op2");
    } else if (nombreStr !== "" && nombreNum === 0) {
        nombreNum = Number(nombreStr);
        displayNum(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        nombreStr = "";
        console.log("Op3");
    } else if (nombreStr !== "" && secondNombreNum === 0) {
        secondNombreNum = Number(nombreStr);
        displayNum(secondNombreNum, display2);
        result = operation[operator](nombreNum, secondNombreNum);
        nombreNum = result;
        operator = event.currentTarget.getAttribute('data-operation');
        displayResult(nombreNum, display1);
        secondNombreNum = 0;
        console.log("Op4");
    } else if (nombreSpe !== 0 && secondNombreNum === 0) {
        secondNombreNum = nombreSpe;
        result = operation[operator](nombreNum, secondNombreNum);
        nombreNum = result;
        displayResult(nombreNum, display1);
        secondNombreNum = 0;
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op5");
    } else if (event.currentTarget.textContent === "=") {
        result = operation[operator](nombreNum, secondNombreNum);
        displayResult(result, display1);
        secondNombreNum = 0;
        nombreNum = 0;
        nombreSpe = 0;
        console.log("Op7");
    } else if (resultClick === false && secondNombreNum === 0) {
        secondNombreNum = result;
        displayNum(secondNombreNum, display2);
        result = operation[operator](nombreNum, secondNombreNum);
        nombreNum = result;
        displayResult(nombreNum, display1);
        secondNombreNum = 0;
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op6");
    }



    if (event.currentTarget.textContent !== "=") {
        displayNum(event.currentTarget.textContent, display2);
        resultClick = false;
    } else {
        displayNum(event.currentTarget.textContent, display2);
        resultClick = true;
    }
    nombreStr = "";
    console.dir(resultClick)
    console.log("nombreNum : " + nombreNum)
    console.log("secondNombreNum : " + secondNombreNum)
    console.log(result)

}

function ajouterEventOp(element) {
    element.addEventListener("click", addOp);
}
buttonOp.forEach(ajouterEventOp);

//comportement bouton Spe
function addSpe(event) {
    if (nombreStr !== "") {
        console.log("Spe 1")
        nombreSpe = Number(nombreStr)
        displaySpe(nombreSpe);
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        nombreSpe = resultSpe;
        console.log("nombreSpe : " + nombreSpe)
        nombreStr = "";
        displayResult(nombreSpe, display1);
    } else if (resultClick === true) {
        console.log("Spe 2")
        nombreSpe = result;
        displaySpe(nombreSpe);
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        result = resultSpe;
        displayResult(result, display1);
        console.log("nombreSpe : " + nombreSpe)
        console.log("NombreNum : " + nombreNum)

    } else {
        console.log("Spe 3")
        displaySpe(nombreSpe);
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        nombreSpe = resultSpe;
        displayResult(nombreSpe, display1);
        console.log("nombreSpe : " + nombreSpe)
    }
    console.dir(resultClick)
}
function ajouterEventSpe(element) {
    element.addEventListener("click", addSpe);
}
buttonOpSpe.forEach(ajouterEventSpe);

//Comportement des bouttons chiffre au clique
function click(event) {
    if (nombreStr === "") {
        nombreStr = event.currentTarget.textContent;
        display1.textContent = nombreStr;
    } else {
        nombreStr += event.currentTarget.textContent;
        displayNum(event.currentTarget.textContent, display1)
    }

    console.log(nombreStr)
}
function ajouterEvent(element) {
    element.addEventListener("click", click);
}
buttonNum.forEach(ajouterEvent);

//Boutton Erase au click
function erase() {
    if (nombreStr !== "") {
        nombreStr = ""
        display1.textContent = "0";
    } else {
        nombreStr = "";
        nombreNum = 0;
        secondNombreNum = 0;
        nombreSpe = 0;
        lastResult;
        result;
        resultSpe;
        display1.textContent = "0";
        display2.textContent = "";
    }
    console.log("lol");
}
buttonErase.addEventListener('click', erase);

//Boutton ErasAll au clique
function eraseAll() {
    nombreStr = "";
    nombreNum = 0;
    secondNombreNum = 0;
    nombreSpe = 0;
    lastResult;
    result;
    resultSpe;
    console.log("lol2");
    display1.textContent = "0";
    display2.textContent = "";
}
buttonEraseAll.addEventListener('click', eraseAll);



