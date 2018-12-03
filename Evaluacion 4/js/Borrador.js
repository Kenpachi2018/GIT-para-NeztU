

var pantalla = document.getElementById('display');
var panelTeclas = document.getElementsByClassName('teclado')[0];
/*var terminoA = "";
var terminoB = 0;
var operacion = "";
var resultado = 0;
var repetirOper = false;*/

panelTeclas.addEventListener('click',lugarClick);

function lugarClick(event){

    var numAnterior = pantalla.innerText;

    var targetElement = event.target || event.srcElement;
    //var idTarget = targetElement.id;
    var altTarget = targetElement.alt;

    if (parseInt(altTarget) <= 9, parseInt(altTarget) >=0 ) {

        //console.log('es un numero');
        repetirOper = false;
        if (resultado != 0) {
            pantalla.innerHTML = 0;
            numAnterior = pantalla.innerText;
            resultado = 0;
        }
        tareaNumero(numAnterior, altTarget); 

    } else if (altTarget == "punto") {

        //console.log('es un punto');
        repetirOper = false;
        addPunto(numAnterior);

    } else if (altTarget == "On") {

        //console.log('es la tecla de ****** BORRAR ******');
        repetirOper = false;
        borrarTodo()

    } else if (altTarget == "signo") {

        //console.log('es la tecla de Signo');
        repetirOper = false;
        addSigno(numAnterior);

    } else if (altTarget == "igual") {

        //console.log('es la tecla de igual');
        if (repetirOper) {
            //aca es donde se oprime es igual repetidas veces
            operacionMat(operacion);
            terminoA = resultado;
            validarCantCaracteres();
            pantalla.innerHTML = resultado;
        } else {
            repetirOper = true;
            addResultado(numAnterior);
            validarCantCaracteres();
            pantalla.innerHTML = resultado;
        }

    } else {    // cualquiera de las otras teclas "+" o "-" o "*" o "/" o "Raiz"

        
        if (operacion == "") {    // esta es la primera vez que oprimis una de las 4 teclas de operacion

            terminoA = parseFloat(numAnterior);
            operacion = altTarget;
            pantalla.innerHTML = "";

        }
    }
}

function tareaNumero(numAnterior, tarClick){  // esto controla que el numero no sea mayor a 8 digitos

    var largoNum = numAnterior.toString().length;
    var largoOK = 0;

    if (numAnterior == "0") {

        //console.log('es CERO');
        pantalla.innerHTML = tarClick;

    } else {

        if (parseFloat(numAnterior) <= 9999999) {              // si se toman solo los primeros 8 num en un numero mayor a 9.999.999 es inutil considerar los factores despues de la coma 

            if(numAnterior.indexOf('.') != -1){
                if (numAnterior.indexOf('-') != -1) {
                    largoOK = 10;                              // Numero con "." y "-"
                } else {
                    largoOK = 9;                               // Numero con "." 
                }
            } else {
                if (numAnterior.indexOf('-') != -1) {
                    largoOK = 9;                               // Numero con "-"
                } else {
                    largoOK = 8;                               // Numero sin "." y "-"
                }
            }

        } else {
            largoOK = 8; 
        }

        if (largoNum == largoOK) {

            console.log('el Numero es muy grande'); 

        } else {

            //console.log('no es CERO');
            pantalla.innerHTML = pantalla.innerHTML + tarClick;

        }
    }
}

function addPunto(cadenaNum){
    if(cadenaNum.indexOf('.') != -1){
        console.log("punto encontrado ya existe");
    } else {
        pantalla.innerHTML = cadenaNum + ".";
    }
}

function addSigno(cadena){

    if(cadena.indexOf('-') != -1){
            //console.log("signo encontrado encontrado");
            cadena = cadena.substring(1);
            pantalla.innerHTML = cadena;
        } else {
            pantalla.innerHTML ="-" + cadena;
        }
}

function operacionMat(operClick){
    
    switch(operClick) {
        case "mas":
            //console.log('operacion de sumar');
            resultado = terminoA + terminoB;
            break;
        case "menos":
            //console.log('operacion de restar');
            resultado = terminoA - terminoB;
            break;
        case "por":
            //console.log('operacion de multiplicar');
            resultado = terminoA * terminoB
            break;
        case "dividido":
            //console.log('operacion de dividir');
            resultado = terminoA / terminoB;
            break;
        default:
            //console.log('ERROR');
    }
}

function addResultado(segundoTermino){

    terminoB = parseFloat(segundoTermino);
    operacionMat(operacion);
    terminoA = resultado;
    operacion = "";
}

function borrarTodo(){

    pantalla.innerHTML = 0;
    terminoA = "";
    terminoB = 0;
    operacion = "";
    resultado = 0;
}

function validarCantCaracteres(){

    var resultadoFinal = resultado.toString()

    if (resultado <= 9999999) {

        if(resultadoFinal.indexOf('.') != -1){
            if (resultadoFinal.indexOf('-') != -1) {
                resultadoFinal = resultadoFinal.slice(0,10);            // Numero con "." y "-"
            } else {
                resultadoFinal = resultadoFinal.slice(0,9);             // Numero con "." 
            }
        } else {
            if (resultadoFinal.indexOf('-') != -1) {
                resultadoFinal = resultadoFinal.slice(0,9);             // Numero con "-"
            } else {
                resultadoFinal = resultadoFinal.slice(0,8);             // Numero sin "." y "-"
            }
        }

    } else {
        resultadoFinal = resultadoFinal.slice(0,8);
    }

    if (resultado > resultadoFinal) {
        alert(resultado)
    }
    
    resultado = parseFloat(resultadoFinal);
}

function mostrarConsola(targetElement){

    console.log('Termino A ==>'+terminoA);
    console.log('Termino B ==>'+terminoB);
    console.log('Operacion ==>'+operacion);
    console.log('Resultado de la operacion ==>'+resultado);
    console.log('Lo que hay en pantalla ==>'+pantalla.innerText);
    console.log('Identificador ALT de Boton al que se le dio Click ==>'+targetElement.alt);
}
