//  ---------------------------------    Inicia el juego al presionar el boton iniciar
$(function()
{
    iniciaJuego();
    letreroBlanco($(".main-titulo"));
})

function iniciaJuego()
{
    $(".btn-reinicio").click(function()
    {
        if ($(this).text() === "Reiniciar")
        {
            location.reload(true);                                      //código génerico que sirve para cargar nuevamente toda la página
        }
        else
        {   
            window.alert("Cada dulce combinado por ti vale 25 puntos y 10 puntos por cada dulce combinado automatico!");
            window.alert("Las combinaciones automáticas se demoran en borrar para validar que está correctas en el código!")
            iniciaTablero();
            $(this).text("Reiniciar");
            $("#timer").text("");                                       //Borra el valor del id Timer 02:00 para empezar el temporizado
            $("#timer").startTimer(                                     //Llama el temporizador, se coloco un código en el HTML para que funcione correctamente
            {      
                onComplete: terminaJuego                                //LLama la función terminaJuego para que cierre el tablero y muestre los resultados
            });
        }
    })
}

// ------------------------------------  Llama a todas las funciones que se van necesitando en el juego         ----------------------------------------
function iniciaTablero ()
{
    tanqueaTablero();               //Llena el tablero
    validaColumna();                //Valida combinaciones por columna
    validaFila();                   //Valida combinaciones por fila
    dulceAnimacion();               //LLama la funcion que elimina los dulces y les pone el efecto parpadeante

}

// ----------------------------------      Paso 1: Animaciones recursivas o repetitivas. Sobre del letrero
function letreroBlanco(letrero)
{
    $(letrero).animate
    ({
        color: "white",
    },150,function()
    {
        letreroAmarillo(letrero);
    });
}

function letreroAmarillo(letrero)
{
    $(letrero).animate
    ({
        color: "yellow",
    },150, function()
    {
        letreroBlanco(letrero);
    });
}

// ---------------------------------    Paso 2: tanquea el tablero cada vez que inicia el juego o se eliminan dulces    -------------------------------------

function tanqueaTablero()
{
    var dulces = ['<img class="elemento" src="image/amarillo.png"></img>','<img class="elemento" src="image/rojo.png"></img>','<img class="elemento" src="image/espiral.png"></img>','<img class="elemento" src="image/chocolate.png"></img>'];
    var largoDulces = dulces.length++;                                                              // Se agrega mas uno del largo para el número aleatorio

    for (j=1; j<8; j++)                                                                             // Ciclo para rellenar cada columna "col-"
    {
        dulcesFaltantes = 7 - parseFloat($(".col-" + j).children().length);                         // Valida cuantos dulces hay en el momento por columna, si es cero la llena todo.

        for(i=0; i<dulcesFaltantes; i++)                                                            // Ciclo para rellenar cada columna con dulces dependiendo cuantos dulces falten en la columna
        {
            var aleatorio = Math.floor(Math.random() * largoDulces);                                // Esto es un linea para que se cree un número aleatorio entre el cero y el 3. La variable posicion vale 4, el random floor busca un número por debajo del especificado.
            //console.log(aleatorio);
            $(".col-" + j).prepend(dulces[aleatorio]);
        }
    }
    agregaDulceEventos();                                                                            //Llama esta función para agregarle todas las propiedades Drag and Drop a los dulces nuevos creados
}

// ------------------------- --------  Paso3: Agrega a los dulces el efecto drag and drop a medida que se van creando
function agregaDulceEventos()
{
    $(".elemento").draggable                        //Permite mover el elemento seleccionado con la propiedad draggable
    ({
        containment: ".panel-tablero",              // No permite que salga del tablero el elemento
        revert: true,                               //Permite devolve un objeto a su posición inicial .Lo que realmente hace acá, es devolver el elemento seleccionado pero cambiando el src por la imagen del objeto que se puso encima.
        revertDuration: 100,                        //Aumenta la velocidad en que se devuelve el dulce
        zIndex: 200,                                //Cuando se tiene seleccionado un elemento se pone al frente para verlo seleccionado          
        grid: [110,95],                            // Es la distancia de una cuadricula que se puede mover el elemento, para que respete la cuadricula del juego
    });

    $(".elemento").droppable                        // Vuelve a todos los elementos contenedores
    ({
        drop: intercambiaDulce                      // Llama la función intercambiaDulce. Tambien se le esta diciendo que todos los elementos con clase elemento sean contenedores o droppables
    });
}

// Permite el cambio de dulce y verifica si está correcto el cambio
function intercambiaDulce (event,dulceDrag)
{
    //Captura de datos del dulce SELECCIONADO O ARRASTRADO
    var dulceDrag = $(dulceDrag.draggable);
    var dulceDragSrc = dulceDrag.attr("src");

    // Captura de datos del dulce encima o CONTENEDOR
    var dulceDrop = $(this);
    var dulceDropSrc = dulceDrop.attr("src");

    //Intercambia los dulces
    dulceDrag.attr("src", dulceDropSrc);
    dulceDrop.attr("src", dulceDragSrc);

    validaColumna();
    validaFila();

    setTimeout(function()                                                                                                       // el metodoc setTimeout retrasa en 300 milisegundos que se ejecute el condicional porque Javascript es asincrono y no respeta el orden del còdigo para ejecutarse, esto me evita que se borre el dulce antes de que llegue el dulce a su nueva posicion
    {
        //Valida si el intercambio de dulce se puede hacer verificando que tenga la clase borrar el dulce movido
        if (dulceDrop.hasClass("borrar") || dulceDrag.hasClass("borrar"))                                                     // Este condicional "ó" dice que si el dulce arrastrado o el contenedor tiene clase borrar si permita el cambio. El metodo hasClass arroja true o false no mas.
        {     
            //window.alert("el dulce: " + dulceDrag.attr("src") + " si tiene la clase borrar, hay que dejarlo");
            dulceAnimacion();   
                                                                                                           //Llama esta función para que borre los dulces nuevos que ahora tienen la clase borrar
            //Suma movimiento
            var Movimiento= parseInt($("#movimientos-text").text());
            $("#movimientos-text").text(Movimiento+1);

            //Suma puntuación
            combinaciones = $(".panel-tablero").find(".borrar");
            var puntos = parseInt($("#score-text").text());
            $("#score-text").text(puntos+(combinaciones.length*25));
        }
        else
        {
            //window.alert("el dulce: " + dulceDrag.attr("src") + " no tiene la clase borrar, hay que devolverlo");
            window.alert("el dulce arrastrado no se puede mover a esta ubicación porque no hace match con otros dulces")
            dulceDrop.attr("src",dulceDropSrc);                                                                             //Si es false la condición, se esta diciendo con esta linea y la de abajo, que cada uno vuelva a tener el mismo source "src" que tenia al inicio y no haga nada
            dulceDrag.attr("src", dulceDragSrc);
        }
    },100)

}

// ---------------------------------- Paso 4: Marca dulces a borrar

function validaColumna()
{
    //Este ciclo recorre cada columna de izquierda a derecha
    for (x=1; x<=7; x++)
    {
        var contador = 0;
        var dulcePosicion = $(".col-" + x).children();
        var marcaDulce = new Array;
    
        //Este ciclo recorre cada dulce de una columna de arriba hacia abajo
        for (i=0; i<7; i++)
        {      
            contador = i+1;
    
            if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
            {
                marcaDulce.push(i,contador);
                contador++;       
    
                if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                {
                    marcaDulce.push(contador);
                    eliminaDulceVertical(marcaDulce, dulcePosicion);
                    contador++;
     
                    if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                    {
                        marcaDulce.push(contador);
                        eliminaDulceVertical(marcaDulce, dulcePosicion);
                        contador++;
    
                        if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                        {
                            marcaDulce.push(contador);
                            eliminaDulceVertical(marcaDulce, dulcePosicion);
                            contador++;
    
                            if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                            {
                                marcaDulce.push(contador);
                                eliminaDulceVertical(marcaDulce, dulcePosicion);
                                contador++;
    
                                if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                                {
                                    marcaDulce.push(contador);
                                    eliminaDulceVertical(marcaDulce, dulcePosicion);
                                }
                                else{marcaDulce.length = 0; }           //Esto limpia o vacia el arreglo cuando ya capturo datos y no se tenia que borrar finalmente y vuelve al ciclo limpio el arreglo. Asi con cada condicional.
                            }
                            else{marcaDulce.length = 0; }
                        }
                        else{marcaDulce.length = 0; }
                    }
                    else{marcaDulce.length = 0; }
                }
                else{marcaDulce.length = 0; }
            }
            else{marcaDulce.length = 0; }
        }                     
        
    }
}

function validaFila ()
{
        //Este ciclo recorre cada fila de arriba hacia abajo
        for (b=0; b<=6; b++)
        {
            var marcaDulce = new Array;

            // Este ciclo recorre cada columna de izquierda a derecha
            for (a=1; a<=7; a++) 
            {
                contador = a+1;
                
                if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                {
                    marcaDulce.push(a,contador);
                    contador++;

                    if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                    {
                        marcaDulce.push(contador);
                        eliminaDulceHorizontal(marcaDulce,b);
                        contador++;

                        if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                        {
                            marcaDulce.push(contador);
                            eliminaDulceHorizontal(marcaDulce,b);
                            contador++;

                            if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                            {
                                marcaDulce.push(contador);
                                eliminaDulceHorizontal(marcaDulce,b);
                                contador++;

                                if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                                {
                                    marcaDulce.push(contador);
                                    eliminaDulceHorizontal(marcaDulce,b);
                                    contador++;

                                    if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                                    {
                                        marcaDulce.push(contador);
                                        eliminaDulceHorizontal(marcaDulce,b);
                                    }
                                    else{marcaDulce.length = 0;}                    //Esto limpia o vacia el arreglo cuando ya capturo datos y no se tenia que borrar finalmente y vuelve al ciclo limpio el arreglo. Asi con cada condicional.
                                }
                                else{marcaDulce.length = 0;}
                            }
                            else{marcaDulce.length = 0;}
                        }
                        else{marcaDulce.length = 0;}
                    }
                    else{marcaDulce.length = 0;}
                }
                else{marcaDulce.length = 0;}
            }
            //console.log("CAMBIO DE FILA");
        }
}

// Estas dos funciones realmente solo agregan la clase borrar a los elementos que cumplieron la condición de 3 o más dulces iguales
function eliminaDulceVertical (marcaDulce,dulcePosicion)                        
{
    for (z=0; z<marcaDulce.length; z++)
    {
        dulcePosicion.eq(marcaDulce[z]).addClass("borrar");
    }
}

function eliminaDulceHorizontal (marcaDulce,b)
{
    for (z=0; z<marcaDulce.length; z++)
    {
        $(".col-" + marcaDulce[z]).children().eq(b).addClass("borrar");
    }
}

// ---------------------------- PASO5: Elimina los dulces agregango el efecto pulso     -------------------------------------

function dulceAnimacion()
{
    $(".borrar").effect(
    {
        effect: "pulsate", 
        duration: 650,
        complete: function()                                                    // LLama la función después de aplica el efecto pulsate. Esta es la sintaxis colocando complete para llamar la función utilizando el método .effect
        {
            $(this).animate(                                                     // This es los elementos .borrar
            {
                opacity: "0"                                                     //Una vez ya haya parpadeado el efecto de arriba, empieza esta animacion a opacar el elemento rapidamente para despues hacer un efecto caiga en los elementos que si quedaron
            },
            250,
            function()
            {
                $(this).remove();                                               //Después que terminó de opacarlo llama la función de eliminar elemento que lo hace de inmediato
                tanqueaTablero();                                               //Llama la funciòn tanquea Tablero para rellenar los espacios que quedaron despues de eliminar los dulces que hicieron match
                setTimeout(combinacionesPosteriores,300);                       //Despues de eliminar los dulces y rellenar nuevamente el tablero valida si hay nuevas combinaciones de dulces a traves de la función que llama. Esta presentando una inconsistencia que se demora mucho borrando los dulces. pero funciona. No pude solucionarla y pregunte a un tutor de Nextu y no supo tampoco
            }
            );
        }
    });
}


// // ----------------------------------  Valida las veces que sea necesario borrar combinaciones de dulces que hayan en el tablero  -------------------------------

function combinacionesPosteriores()
{
    validaColumna();
    validaFila();

    pepe = $(".panel-tablero").find(".borrar");
    if (pepe.length > 0)
    {
        dulceAnimacion();

        //Suma puntuación por combinaciones automaticas
        var puntos = parseInt($("#score-text").text());
        $("#score-text").text(puntos+(pepe.length*10));
    }
}

// --------------------------------------       Finaliza el juego mostrando los resultados al final. Esta función se llama cuando finaliza el timer en la fila 23       ---------------------------------

function terminaJuego() 
{
	$(".panel-tablero, .time").effect("fold");
	$(".main-titulo").text("Gracias por jugar!");
	$(".score, .moves, .panel-score").width("100%");
}