


$(document).ready(function(){
	var changeTitle = setInterval(cambiarTitulo, 1500);
	$(".btn-reinicio").click(function(){
			btnInicio();
/*-------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------*/
	});
});

var firstTime = true;

// contol de los eventos relacionados al boton de Inicio/Reinicio
function btnInicio(){
	var boton = $(".btn-reinicio").text();
	var m = 2;
	var s = 0;
	if ( boton == "Iniciar") {
		empezar() //ir  la función empezar
	} else {
		reiniciar()  //ir a la función reiniciar
		reGame();
		$(".btn-reinicio").text("Iniciar"); //Cambiar estado del botón
	}

  // Arranca la funcionalidad de juego
	function empezar(){
    elcrono = setInterval(tiempo,1000); //función del temporizador.
    $(".btn-reinicio").text("Reiniciar"); //Cambiar estado del botón
		caramelos();
		verificacionInicial();
	};

	//Volver al estado inicial
	function reiniciar(){
	firstTime = true;
	clearInterval(elcrono); //parar el crono
	$("#timer").text("0"+m+":0"+s);
	$(".panel-tablero img").remove();
	$("#score-text").text("0");
	};

	//función del temporizador
	function tiempo(){
		if (m == 0 && s == 0) {
			endGame();
			//alert("FIN del JUEGO");
		} else {
			if (s == 0) {
				s = 59;
				m--;
				$("#timer").text("0"+m+":"+s);
			} else if (s < 11) {
				s--;
				$("#timer").text("0"+m+":0"+s);
			} else {
				s--;
				$("#timer").text("0"+m+":"+s);
			}
		}
	};
};

// fin del juego por tiempo
function endGame() {
	$( ".panel-tablero" ).hide(750);
	$( ".panel-score" ).animate({width: "100%"},748);
}

function reGame() {
	$( ".panel-score" ).animate({width: "25%"},748);
	$( ".panel-tablero" ).show(750)
};

// Hace que el titulo cambie de COLOR
function cambiarTitulo(){
	var colorTitulo = $(".main-titulo").css("color");
	if (colorTitulo == "rgb(220, 255, 14)"){
		$(".main-titulo").css("color","#FF0000");
	}
	else {
		$(".main-titulo").css("color","#DCFF0E");
	}
};

// Agrega caramelos de forma aleatoria
function caramelos(){
	for (var i = 1; i < 8; i++) {
		for (var j = 1; j < 8; j++) {
			if ((i==1) && (j==1)) {
				var imagen = x();
				$(".col-"+i).html('<img class="taCaramelo" src="image/'+imagen+'.png">');
			} else {
				var imagen = x();
				$(".col-"+i).append('<img class="taCaramelo" src="image/'+imagen+'.png">');
			}
		};
	};
};

// Retorna un numero entre 1 y 4 de forma aleatorea
function x(){
	var y = Math.floor((Math.random() * 4) + 1);
	return y;
};

// Hace la primera verificacion de caramelos en linea
function verificacionInicial(){
	if (firstTime) {
		firsDelet();
		setTimeout(function(){
			verificacionInicial();
			dragdrop();
		},2500)
	}
}

// Hace el resto de las verificaciones de caramelos en linea
function verificacionSecundaria(){
		var n = recorreTablero();
		if (n>0) {
			score();
			deletCandy();
			setTimeout(function() {
				verificacionSecundaria();
			},1500);
		} else {
			dragdrop();
		}
}

// Construye un array con el tablero
function tableroArr(){
	var colArr = [];
	for (var i = 1; i < 8; i++) {
		var col=[];
		$(".col-"+i+" img").each(function(){
			col.push(this);
		});
		colArr.push(col);
	}
		return colArr;
};

// Busca caramelos en grupos y elimina
function firsDelet(){
	var n = recorreTablero();
	if (n > 0) {
		score();
		deletCandy();
		firstTime = true;
	} else {
		firstTime = false;
	}
};

// Recorre el tablero y cuenta cuantas coincidencias hay
function recorreTablero(){
	var tablero = tableroArr();
	var n = 0;
	for (var i = 0; i < 7; i++) {
			var a = $(tablero[i][0]).attr("src");
			var b = $(tablero[i][1]).attr("src");
			var c = $(tablero[i][2]).attr("src");
			var d = $(tablero[i][3]).attr("src");
			var e = $(tablero[i][4]).attr("src");
			var f = $(tablero[i][5]).attr("src");
			var g = $(tablero[i][6]).attr("src");
			if ((a == b) && (a == c)) {
				$(tablero[i][0]).addClass("borrarCDY");
				$(tablero[i][1]).addClass("borrarCDY");
				$(tablero[i][2]).addClass("borrarCDY");
				n++;
			}
			if ((b == c) && (b == d)) {
				$(tablero[i][1]).addClass("borrarCDY");
				$(tablero[i][2]).addClass("borrarCDY");
				$(tablero[i][3]).addClass("borrarCDY");
				n++;
			}
			if ((c == d) && (c == e)) {
				$(tablero[i][2]).addClass("borrarCDY");
				$(tablero[i][3]).addClass("borrarCDY");
				$(tablero[i][4]).addClass("borrarCDY");
				n++;
			}
			if ((d == e) && (d == f)) {
				$(tablero[i][3]).addClass("borrarCDY");
				$(tablero[i][4]).addClass("borrarCDY");
				$(tablero[i][5]).addClass("borrarCDY");
				n++;
			}
			if ((e == f) && (e == g)) {
				$(tablero[i][4]).addClass("borrarCDY");
				$(tablero[i][5]).addClass("borrarCDY");
				$(tablero[i][6]).addClass("borrarCDY");
				n++;
			}
		}
	for (var i = 0; i < 7; i++) {
			var a = $(tablero[0][i]).attr("src");
			var b = $(tablero[1][i]).attr("src");
			var c = $(tablero[2][i]).attr("src");
			var d = $(tablero[3][i]).attr("src");
			var e = $(tablero[4][i]).attr("src");
			var f = $(tablero[5][i]).attr("src");
			var g = $(tablero[6][i]).attr("src");
			if ((a == b) && (a == c)) {
				$(tablero[0][i]).addClass("borrarCDY");// agregar la clase borrar
				$(tablero[1][i]).addClass("borrarCDY");
				$(tablero[2][i]).addClass("borrarCDY");
				n++;
			}
			if ((b == c) && (b == d)) {
				$(tablero[1][i]).addClass("borrarCDY");
				$(tablero[2][i]).addClass("borrarCDY");
				$(tablero[3][i]).addClass("borrarCDY");
				n++;
			}
			if ((c == d) && (c == e)) {
				$(tablero[2][i]).addClass("borrarCDY");
				$(tablero[3][i]).addClass("borrarCDY");
				$(tablero[4][i]).addClass("borrarCDY");
				n++;
			}
			if ((d == e) && (d == f)) {
				$(tablero[3][i]).addClass("borrarCDY");
				$(tablero[4][i]).addClass("borrarCDY");
				$(tablero[5][i]).addClass("borrarCDY");
				n++;
			}
			if ((e == f) && (e == g)) {
				$(tablero[4][i]).addClass("borrarCDY");
				$(tablero[5][i]).addClass("borrarCDY");
				$(tablero[6][i]).addClass("borrarCDY");
				n++;
			}
		}
		return n;
};

// elimina Caramelos en el Array
function deletCandy(){
		$(".borrarCDY").hide("fade", 1000, function(){
			$(".borrarCDY").remove();
		});
		setTimeout(candyReload, 1200);
};

// permite le movimiento drag an drop
function dragdrop(){

	$(".taCaramelo").draggable({revert: true}); // bloque drag & drop
	$(".taCaramelo").draggable('enable');

	$(".taCaramelo").mousedown(function () {
		//console.log("HOLAAAAAA");
		var candyDrag = $(this);
		var dragSrc = candyDrag.attr("src");
		var colum = $(this).parent().attr("class");
		var columIZQ = $(this).parent().prev().attr("class");
		var columDER = $(this).parent().next().attr("class");
		var indice = $(this).index();

		if (indice == 0) {
			if (colum == "col-1") {
				var aba = $("."+colum+" img:eq("+(indice+1)+")");
				var der = $("."+columDER+" img:eq("+(indice)+")");
				eventDrag(aba);
				eventDrag(der);
			} else if (colum == "col-7") {
				var aba = $("."+colum+" img:eq("+(indice+1)+")");
				var izq = $("."+columIZQ+" img:eq("+(indice)+")");
				eventDrag(aba);
				eventDrag(izq);
			} else {
				var aba = $("."+colum+" img:eq("+(indice+1)+")");
				var izq = $("."+columIZQ+" img:eq("+(indice)+")");
				var der = $("."+columDER+" img:eq("+(indice)+")");
				eventDrag(der);
				eventDrag(aba);
				eventDrag(izq);
			}
		} else if (indice == 6) {
			if (colum == "col-1") {
				var arr = $("."+colum+" img:eq("+(indice-1)+")");
				var der = $("."+columDER+" img:eq("+(indice)+")");
				eventDrag(arr);
				eventDrag(der);
			} else if (colum == "col-7") {
				var arr = $("."+colum+" img:eq("+(indice-1)+")");
				var izq = $("."+columIZQ+" img:eq("+(indice)+")");
				eventDrag(arr);
				eventDrag(izq);
			} else {
				var arr = $("."+colum+" img:eq("+(indice-1)+")");
				var izq = $("."+columIZQ+" img:eq("+(indice)+")");
				var der = $("."+columDER+" img:eq("+(indice)+")");
				eventDrag(der);
				eventDrag(arr);
				eventDrag(izq);
			}
		} else if ((indice < 6) && (indice > 0) && (colum == "col-1")) {
			var arr = $("."+colum+" img:eq("+(indice-1)+")");
			var aba = $("."+colum+" img:eq("+(indice+1)+")");
			var der = $("."+columDER+" img:eq("+(indice)+")");
			eventDrag(der);
			eventDrag(arr);
			eventDrag(aba);
		} else if ((indice < 6) && (indice > 0) && (colum == "col-7")) {
			var arr = $("."+colum+" img:eq("+(indice-1)+")");
			var aba = $("."+colum+" img:eq("+(indice+1)+")");
			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
			eventDrag(izq);
			eventDrag(arr);
			eventDrag(aba);
		} else {
			var arr = $("."+colum+" img:eq("+(indice-1)+")");
			var aba = $("."+colum+" img:eq("+(indice+1)+")");
			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
			var der = $("."+columDER+" img:eq("+(indice)+")");
			eventDrag(der);
			eventDrag(izq);
			eventDrag(arr);
			eventDrag(aba);
		}

		function eventDrag(permitido){
				permitido.droppable({
					accept: candyDrag,// Que acepte un elemento especifico
					drop:eventDrop // funcion que se ejecuta una ves soltado
				});
			};

		function eventDrop(){
				var candyDrop = $(this) // this hace referencia al elemento donde se suelta no al que es soltado
				var dropSrc = candyDrop.attr("src");
				candyDrag.attr({"src": dropSrc});
				candyDrop.attr({"src": dragSrc});
				moveCount();
				verificacionSecundaria();
			};
		$(".taCaramelo").draggable('disable');
	});

};

// suma los puntos en el tablero
function score() {
	var cantCandy = document.querySelectorAll(".borrarCDY");
	var totalscoreCandy = cantCandy.length;
	var puntos = parseInt($("#score-text").text());
	puntos = puntos + (totalscoreCandy*10);
	$("#score-text").text(puntos);
};

// cuenta los movimientos y muestra en la pantalla
function moveCount(){
	var mCount = parseInt($("#movimientos-text").text());
	mCount = mCount + 1;
	$("#movimientos-text").text(mCount);
};

//carga mas caramelos
function candyReload(){
	for (var i = 1; i < 8; i++) { // recorre cada columna colocando la cantidad de caramelos que faltan
		var colArr2 = $(".col-"+i).children().length;
		switch (colArr2) {
			case 0:
				var imagen = x();
				$(".col-"+i).html('<img class="taCaramelo" src="image/'+imagen+'.png">');
				addCandy(i, 1);
				break;
			case 1:
				addCandy(i, 1);
				break;
			case 2:
				addCandy(i, 2);
				break;
			case 3:
				addCandy(i, 3);
				break;
			case 4:
				addCandy(i, 4);
				break;
			case 5:
				addCandy(i, 5);
				break;
			case 6:
				addCandy(i, 6);
				break;
			default:
				break;
		}
	}
};
function addCandy(col, turns){
  var imagen = x();
  var margen = (540-(turns*90));
  $(".col-"+col+" img:eq(0)").before('<img class="taCaramelo" src="image/'+imagen+'.png">');
  $(".col-"+col+" img:eq(0)").css("margin-bottom", margen+'%').animate({marginBottom:"0%"}, 300);
	if(turns != 6){
		setTimeout(function(){
	      turns = turns + 1;
	      addCandy(col,turns);
	  }, 300);
  };
};

// Eliminar duplicados de un Array
function deleteDuplicates(arr){
	 var i,
	     len=arr.length,
	     out=[],
	     obj={};

	 for (i=0;i<len;i++) {
	    obj[arr[i]]=0;
	 }
	 for (i in obj) {
	    out.push(i);
	 }
	 return out;
};


//function hola(){alert("HOLAAAAAA");};
//function saludar(){ console.log("HOLA");};
