



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
let lastSecondNombreNum=0;
let nombreSpe = 0;
let operator;
let lastOp;
let result;
let lastResult;
let resultSpe;
let speDisplay;
let speClick;
let displayNumSpe;
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

//display functions
function displayNum(what, display) {
    display.textContent += what + " ";

}
function displayResult(result, display) {
    display.textContent = result;
}

function displaySpe(variable, display) {
    if (resultClick === true || speClick === true) {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            return display.textContent = "sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            return display.textContent = "√(" + variable + ") ";
        } else {
            display.textContent = "1/" + variable + " ";
        }
    } else {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            return display2.textContent += "sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            return display2.textContent += "√(" + variable + ") ";
        } else {
           return display2.textContent += "1/" + variable + " ";
        }
    }

}

function displaySpeAlt(variable) {
    if (resultClick === true || speClick === true) {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            return "sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            return "√(" + variable + ") ";
        } else {
            return "1/" + variable + " ";
        }
    } else {
        if (event.currentTarget.getAttribute('data-operation') === "puissance") {
            return display2.textContent += "sqr(" + variable + ") ";
        } else if (event.currentTarget.getAttribute('data-operation') === "racine") {
            return display2.textContent += "√(" + variable + ") ";
        } else {
           return display2.textContent += "1/" + variable + " ";
        }
    }

}


//Comportement bouton operation
function addOp(event) {



    //partie operation
    if (resultClick === true && event.currentTarget.textContent === "=") {
        nombreNum = result
        operator = lastOp;
        display2.textContent = nombreNum +" "+displayOp+ " "+lastSecondNombreNum+" "
        result = operation[operator](nombreNum, lastSecondNombreNum);
        displayResult(result, display1);
        console.log("Op1");

    }else if (resultClick === true && nombreSpe !== 0) {
        nombreNum = nombreSpe;
        displayResult(result, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op1-2");
    } else if (resultClick === true && nombreStr !== "") {
        nombreNum = Number(nombreStr);
        displayResult(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op1-3");
    } else if (resultClick === true) {
        nombreNum = result
        displayResult(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        lastOp = operator;
        console.log("Op1-4");

    } else if (nombreSpe !== 0 && nombreNum === 0 ||nombreSpe !== 0 && secondNombreNum === 0 && operator === undefined) {
        nombreNum = nombreSpe;
        operator = event.currentTarget.getAttribute('data-operation');
        lastOp = operator;
        displayOp =event.currentTarget.textContent;
        nombreStr = "";
        console.log("Op2");
    } else if (nombreStr !== "" && nombreNum === 0) {
        nombreNum = Number(nombreStr);
        displayNum(nombreNum, display2);
        operator = event.currentTarget.getAttribute('data-operation');
        lastOp = operator;
        displayOp =event.currentTarget.textContent;
        nombreStr = "";
        console.log("Op3");
    } else if (nombreStr !== "" && secondNombreNum === 0) {
        secondNombreNum = Number(nombreStr);
        lastSecondNombreNum = secondNombreNum;
        displayNum(secondNombreNum, display2);
        result = operation[operator](nombreNum, secondNombreNum);
        nombreNum = result;
        operator = event.currentTarget.getAttribute('data-operation');

        displayResult(nombreNum, display1);
        secondNombreNum = 0;
        console.log("Op4");
    } else if (nombreSpe !== 0 && secondNombreNum === 0) {
        secondNombreNum = nombreSpe;
        lastSecondNombreNum = secondNombreNum;
        result = operation[operator](nombreNum, secondNombreNum);
        nombreNum = result;
        displayResult(nombreNum, display1);
        secondNombreNum = 0;
        operator = event.currentTarget.getAttribute('data-operation');
        console.log("Op5");
        console.log(lastOp)
        console.log(displayOp)
    } else if (event.currentTarget.textContent === "=") {
        result = operation[operator](nombreNum, secondNombreNum);
        displayResult(result, display1);
        lastSecondNombreNum = secondNombreNum;
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
        lastOp = operator;
        console.log("Op6");
    }



    if (event.currentTarget.textContent !== "=") {
        displayNum(event.currentTarget.textContent, display2);
        resultClick = false;
        speClick = false;
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
        displayNumSpe = displaySpe(nombreSpe, display2);
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        nombreSpe = resultSpe;
        result = resultSpe;
        console.log("nombreSpe : " + nombreSpe)
        nombreStr = "";
        speClick = true;
        displayResult(nombreSpe, display1);
    }  else if(secondNombreNum === 0 && resultClick === true){
        console.log("Spe 2")
        if(displayNumSpe === undefined){
            displaySpe(nombreNum, display2)
        }else{
        displaySpe(displayNumSpe, display2);
        }
        nombreSpe = nombreNum;
        console.log ("displayNombreSpe = "+displayNumSpe)
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        nombreSpe = resultSpe;
        displayNumSpe = displaySpeAlt(resultSpe);
        nombreNum = resultSpe;
        secondNombreNum = 0;
        operator = undefined;
        speClick = true;
        displayResult(nombreSpe, display1);
        console.log("nombreSpe : " + nombreSpe)
    }else if(nombreStr ==="" && secondNombreNum === 0 && operator !== undefined){
        console.log("Spe 3")
        displaySpe(displayNumSpe, display2);
        console.log ("displayNombreSpe = "+displayNumSpe)
        secondNombreNum = nombreStr;
        result = operation[operator](nombreNum, nombreSpe)
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](result)
        nombreSpe = resultSpe;
        displayNumSpe = displaySpeAlt(resultSpe);
        nombreNum = result;
        secondNombreNum = 0;
        operator = undefined;
        speClick = true;
        displayResult(nombreSpe, display1);
        console.log("nombreSpe : " + nombreSpe)
    }else{
        console.log("Spe 4")
        displaySpe(displayNumSpe, display2);
        console.log ("displayNombreSpe = "+displayNumSpe)
        resultSpe = operationSpe[event.currentTarget.getAttribute('data-operation')](nombreSpe)
        nombreSpe = resultSpe;
        displayNumSpe = displaySpeAlt(resultSpe);
        speClick = true;
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



