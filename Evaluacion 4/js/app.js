


var calculadora = {

    terminoA: 0,
    terminoB: 0,
    operacion: "",
    resultado: 0,

    operacionMat: function(){
    
        switch(this.operacion) {
            case "mas":
                //console.log('operacion de sumar');
                this.resultado = this.terminoA + this.terminoB;
                break;
            case "menos":
                //console.log('operacion de restar');
                this.resultado = this.terminoA - this.terminoB;
                break;
            case "por":
                //console.log('operacion de multiplicar');
                this.resultado = this.terminoA * this.terminoB
                break;
            case "dividido":
                //console.log('operacion de dividir');
                this.resultado = this.terminoA / this.terminoB;
                break;
            default:
                this.resultado = console.log('ERROR');
        }
        return this.resultado;
    },

    borrarTodo: function(){

        this.terminoA = 0;
        this.terminoB = 0;
        this.operacion = "";
        this.resultado = 0;
    },

    addResultado: function(segundoTermino){

        this.terminoB = parseFloat(segundoTermino);
        this.terminoA = this.operacionMat();
    },

    validarCantCaracteres: function(){

        var resultadoFinal = this.resultado.toString()

        if (this.resultado <= 9999999) {

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

        if (this.resultado > resultadoFinal) {
            alert(this.resultado)
        }
        
        this.resultado = parseFloat(resultadoFinal);
        return this.resultado;
    },
};

function init(){

    var pantalla = document.getElementById('display');
    var panelTeclas = document.getElementsByClassName('teclado')[0];
    panelTeclas.addEventListener('click',lugarClick);
    var repetirOper = false;


    document.getElementsByClassName('teclado')[0].addEventListener("mousedown", mouseDown);
    document.getElementsByClassName('teclado')[0].addEventListener("mouseup", mouseUp);

    function mouseDown(event) {

        var targetTecla = event.target || event.srcElement;
        var idTarget = targetTecla.id;
        if (idTarget=="mas") {
            document.getElementById(idTarget).style.width="88%";
            document.getElementById(idTarget).style.height="98%";
            document.getElementById(idTarget).style.paddingTop="1px";
        }else{
            document.getElementById(idTarget).style.padding="1.5px";
        }
    }

    function mouseUp(event) {

        var targetTecla = event.target || event.srcElement;
        var idTarget = targetTecla.id;
        if (idTarget=="mas") {
            document.getElementById(idTarget).style.width="90%";
            document.getElementById(idTarget).style.height="100%";
            document.getElementById(idTarget).style.paddingTop="0px";
        }else{
            document.getElementById(idTarget).style.padding="0px";
        }
    }


    function lugarClick(event){

        var numPantalla = pantalla.innerText;
        var targetElement = event.target || event.srcElement;
        var idTarget = targetElement.id;
        var altTarget = targetElement.alt;


        if (parseInt(altTarget) <= 9, parseInt(altTarget) >=0 ) {

            //console.log('es un numero');
            repetirOper = false;
            tareaNumero(numPantalla, altTarget); 

        } else if (altTarget == "punto") {

            //console.log('es un punto');
            repetirOper = false;
            addPunto(numPantalla);

        } else if (altTarget == "On") {

            //console.log('es la tecla de ****** BORRAR ******');
            repetirOper = false;
            calculadora.borrarTodo();
            pantalla.innerHTML = 0;

        } else if (altTarget == "signo") {

            //console.log('es la tecla de Signo');
            repetirOper = false;
            addSigno(numPantalla);

        } else if (altTarget == "igual") {

            //console.log('es la tecla de igual');
            if (repetirOper) {

                //aca es donde se oprime es igual repetidas veces
                calculadora.terminoA = calculadora.operacionMat();
                pantalla.innerHTML = calculadora.validarCantCaracteres();
            } else {
                repetirOper = true;
                calculadora.addResultado(numPantalla);
                pantalla.innerHTML = calculadora.validarCantCaracteres();
            }

        } else {    // cualquiera de las otras teclas "+" o "-" o "*" o "/" o "Raiz"

            
            if (numPantalla != "") {   

                calculadora.terminoA = parseFloat(numPantalla);
                calculadora.operacion = altTarget;
                repetirOper = false;
                pantalla.innerHTML = "";
            } else {
                calculadora.operacion = altTarget;
            }
        }
    }

    function tareaNumero(numPantalla, tarClick){  // esto controla que el numero no sea mayor a 8 digitos

        var largoNum = numPantalla.toString().length;
        var largoOK = 0;

        if (numPantalla == "0") {

            //console.log('es CERO');
            pantalla.innerHTML = tarClick;

        } else {

            if (parseFloat(numPantalla) <= 9999999) {              // si se toman solo los primeros 8 num en un numero mayor a 9.999.999 es inutil considerar los factores despues de la coma 

                if(numPantalla.indexOf('.') != -1){
                    if (numPantalla.indexOf('-') != -1) {
                        largoOK = 10;                              // Numero con "." y "-"
                    } else {
                        largoOK = 9;                               // Numero con "." 
                    }
                } else {
                    if (numPantalla.indexOf('-') != -1) {
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

        if (cadena != "0") {

            if (cadena != "") {
                if(cadena.indexOf('-') != -1){
                    //console.log("signo encontrado encontrado");
                    cadena = cadena.substring(1);
                    pantalla.innerHTML = cadena;
                } else {
                    pantalla.innerHTML ="-" + cadena;
                }
            }            
        }
    }
}

init();
