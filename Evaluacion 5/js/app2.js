


$(document).ready(function(){
	var changeTitle = setInterval(cambiarTitulo, 1500);
	$(".btn-reinicio").click(function(){
		btnInicio();
	});
	//
	//$(".panel-tablero img").draggable({revert: true}); // bloque drag & drop
	// $(".panel-tablero img").mousedown(function(){
	// 	var candyDrag = $(this);
	// 	var dragSrc = candyDrag.attr("src");
	// 	var colum = $(this).parent().attr("class");
	// 	var columIZQ = $(this).parent().prev().attr("class");
	// 	var columDER = $(this).parent().next().attr("class");
	// 	var indice = $(this).index();
	//
	// 	if (indice == 0) {
	// 		if (colum == "col-1") {
	// 			var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 			var der = $("."+columDER+" img:eq("+(indice)+")");
	// 			eventDrag(aba);
	// 			eventDrag(der);
	// 		} else if (colum == "col-7") {
	// 			var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 			eventDrag(aba);
	// 			eventDrag(izq);
	// 		} else {
	// 			var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 			var der = $("."+columDER+" img:eq("+(indice)+")");
	// 			eventDrag(der);
	// 			eventDrag(aba);
	// 			eventDrag(izq);
	// 		}
	// 	} else if (indice == 6) {
	// 		if (colum == "col-1") {
	// 			var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 			var der = $("."+columDER+" img:eq("+(indice)+")");
	// 			eventDrag(arr);
	// 			eventDrag(der);
	// 		} else if (colum == "col-7") {
	// 			var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 			eventDrag(arr);
	// 			eventDrag(izq);
	// 		} else {
	// 			var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 			var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 			var der = $("."+columDER+" img:eq("+(indice)+")");
	// 			eventDrag(der);
	// 			eventDrag(arr);
	// 			eventDrag(izq);
	// 		}
	// 	} else if ((indice < 6) && (indice > 0) && (colum == "col-1")) {
	// 		var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 		var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 		var der = $("."+columDER+" img:eq("+(indice)+")");
	// 		eventDrag(der);
	// 		eventDrag(arr);
	// 		eventDrag(aba);
	// 	}else if ((indice < 6) && (indice > 0) && (colum == "col-7")) {
	// 		var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 		var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 		var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 		eventDrag(izq);
	// 		eventDrag(arr);
	// 		eventDrag(aba);
	// 	} else {
	// 		var arr = $("."+colum+" img:eq("+(indice-1)+")");
	// 		var aba = $("."+colum+" img:eq("+(indice+1)+")");
	// 		var izq = $("."+columIZQ+" img:eq("+(indice)+")");
	// 		var der = $("."+columDER+" img:eq("+(indice)+")");
	// 		eventDrag(der);
	// 		eventDrag(izq);
	// 		eventDrag(arr);
	// 		eventDrag(aba);
	// 	}
	//
	// 	function eventDrag(permitido){
	// 		permitido.droppable({
	// 			accept: candyDrag,// Que acepte un elemento especifico
	// 			drop:eventDrop // funcion que se ejecuta una ves soltado
	// 		});
	// 	};
	//
	// 	function eventDrop(){
	// 		var candyDrop = $(this) // this hace referencia al elemento donde se suelta no al que es soltado
	// 		var dropSrc = candyDrop.attr("src");
	// 		candyDrag.attr({"src": dropSrc});
	// 		candyDrop.attr({"src": dragSrc});
	//		moveCount();
	// 	};
	// });
});


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
		//console.log($(colArr[1][2]).attr("title"));
		return colArr;
};

// busca caramelos en grupos de 3
function tresCandy(){
	var v = false;
	var h = false;
	verticales();
	horizontales();
	setTimeout(candyReload, 1100);
	//setTimeout(candyReload, 1100);
};

//busca caramelos en grupos de 3 en vertical
function verticales(){
	var tablero = tableroArr();
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 7; j++) {
      if ( j>2 ){
        var candy01 = tablero[i][j];
  			var candy02 = tablero[i][(j-1)];
  			var candy03 = tablero[i][(j-2)];
  			var a = $(candy01).attr("src");
  			var b = $(candy02).attr("src");
  			var c = $(candy03).attr("src");
  			if ((a == b) && (a == c)) {
  				var clr = [candy01, candy02, candy03];
					v = true;
					puntaje();
  				candyFade(clr);
  			}
      }
		}
	}
};

//busca caramelos en grupos de 3 en Horizontal
function horizontales(){
	var tablero = tableroArr();
  for (var i = 0; i < 7; i++) {
		for (var j = 0; j < 7; j++) {
      if (i > 2){
        var candy01 = tablero[i][j];
  			var candy02 = tablero[i-1][(j)];
  			var candy03 = tablero[i-2][(j)];
  			var a = $(candy01).attr("src");
  			var b = $(candy02).attr("src");
  			var c = $(candy03).attr("src");
  			if ((a == b) && (a == c)) {
  				var clr = [candy01, candy02, candy03];
					h = true;
					puntaje();
  				candyFade(clr);
  			}
      }
		}
	}
};

// borra los caramelos en linea con el efecto deseado
function candyFade(candyFade){
	$(candyFade[0]).hide("fade", 1000, function(){
		$(candyFade[0]).remove();
	});
	$(candyFade[1]).hide("fade", 1000, function(){
		$(candyFade[1]).remove();
	});
	$(candyFade[2]).hide("fade", 1000, function(){
		$(candyFade[2]).remove();
	});
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

// contol de los eventos relacionados al tiempo de juego
function temporizador(){
	var m = 2
	var s = 0;
	var idInterval = setInterval(function(){
		if (m == 0 && s == 0) {
			//alert("FIN del JUEGO");
			clearInterval(idInterval);
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
	}, 1000);
};

// suma el puntaje y muestra en la pantalla
function puntaje(){
	var puntos = parseInt($("#score-text").text());
	puntos = puntos + 5;
	$("#score-text").text(puntos);
};

// cuenta los movimientos y muestra en la pantalla
function moveCount(){
	var mCount = parseInt($("#movimientos-text").text());
	mCount = mCount + 5;
	$("#movimientos-text").text(mCount);
};

// contol de los eventos relacionados al boton de Inicio/Reinicio
function btnInicio(){

	var boton = $(".btn-reinicio").text();
	var m = 2;
	var s = 0;
	var h = false;
	var v = false;

	if ( boton == "Iniciar") {
		empezar() //ir  la función empezar
		caramelos();
		tresCandy();
	} else {
		reiniciar()  //ir a la función reiniciar
	}

	function empezar(){
    elcrono = setInterval(tiempo,1000); //función del temporizador.
    $(".btn-reinicio").text("Reiniciar"); //Cambiar estado del botón
	};

	//función del temporizador
	function tiempo(){
		if (m == 0 && s == 0) {
			reiniciar()  //ir a la función reiniciar
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

	//Volver al estado inicial
	function reiniciar(){
	clearInterval(elcrono); //parar el crono
	$(".btn-reinicio").text("Iniciar"); //Cambiar estado del botón
	$("#timer").text("0"+m+":0"+s);
	$(".panel-tablero img").remove();
	$("#score-text").text("0");
	};

};


//function saludar(){ console.log("HOLA");};
