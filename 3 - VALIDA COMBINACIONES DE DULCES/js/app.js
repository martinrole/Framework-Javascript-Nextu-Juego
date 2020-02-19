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
            llenaTablero();
            $(this).text("Reiniciar");
        }
    })
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

// ------------------------------------ Paso 2: Llena el tablero con dulces aleatoriamente
function llenaTablero ()
{
    var dulces = ['<img class="elemento" src="image/amarillo.png"></img>','<img class="elemento" src="image/rojo.png"></img>','<img class="elemento" src="image/espiral.png"></img>','<img class="elemento" src="image/chocolate.png"></img>'];
    var largoDulces = dulces.length++;                                  // Se agrega mas uno del largo para el número aleatorio

    for (j=1; j<8; j++)                                                 // Ciclo para rellenar cada columna "col-"
    {
        for(i=0; i<7; i++)                                              // Ciclo para rellenar cada columna con dulces
        {
            var aleatorio = Math.floor(Math.random() * largoDulces);    // Esto es un linea para que se cree un número aleatorio entre el cero y el 3. La variable posicion vale 4, el random floor busca un número por debajo del especificado.
            //console.log(aleatorio);
            $(".col-" + j).append(dulces[aleatorio]);
        }
    }
    agregaDulceEventos();
}

// ------------------------- --------  Paso3: Agrega a los dulces los eventos drag and drop a medida que se van creando
function agregaDulceEventos()
{
    $(".elemento").draggable                        //Permite mover el elemento seleccionado
    ({
        containment: ".panel-tablero",              // No permite que salga del tablero el elemento
        //droppable: ".elemento",                   // Le
        revert: true,                               //Permite devolve un objeto a su posición inicial .Lo que realmente hace acá, es devolver el elemento seleccionado pero cambiando el src por la imagen del objeto que se puso encima.
        zIndex: 100,                                //Cuando se tiene seleccionado un elemento se pone al frente para verlo seleccionado          
        grid: [120,100],                            // Es la distancia de una cuadricula que se puede mover el elemento, para que respete la cuadricula del juego
    });
    $(".elemento").droppable                        // Vuelve a todos los elementos contenedores
    ({
        drop: intercambiaDulce                      // Llama la función intercambiaDulce
    });
}

function intercambiaDulce (event,dulceDrag)
{
    //Captura de datos del dulce SELECCIONADO O ARRASTRADO
    var dulceDrag = $(dulceDrag.draggable);
    var dulceDragSrc = dulceDrag.attr("src");

    // Captura de datos del dulce encima o CONTENEDOR
    var dulceDrop = $(this);
    var dulceDropSrc = dulceDrop.attr("src");

    //Intercambio de dulces
    dulceDrag.attr("src", dulceDropSrc);
    dulceDrop.attr("src", dulceDragSrc);
}

// ---------------------------------- Paso 4: Marca dulces a borrar


$("#validaVer").on("click",validaColumna);

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
                    eliminaDulce(marcaDulce, dulcePosicion);
                    contador++;
     
                    if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                    {
                        marcaDulce.push(contador);
                        eliminaDulce(marcaDulce, dulcePosicion);
                        contador++;
    
                        if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                        {
                            marcaDulce.push(contador);
                            eliminaDulce(marcaDulce, dulcePosicion);
                            contador++;
    
                            if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                            {
                                marcaDulce.push(contador);
                                eliminaDulce(marcaDulce, dulcePosicion);
                                contador++;
    
                                if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                                {
                                    marcaDulce.push(contador);
                                    eliminaDulce(marcaDulce, dulcePosicion);
                                }
                                else{marcaDulce.length = 0; }   ////Esto limpia o vacia el arreglo para volver al ciclo
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

$("#validaHor").on("click",validaFila);

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
                console.log($(".col-" + a).children().eq(b).attr("src"));
                console.log($(".col-" + contador).children().eq(b).attr("src"));
                
                if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                {
                    console.log("condicional1");
                    console.log(a);
                    console.log(contador);
                    marcaDulce.push(a,contador);
                    contador++;
                    console.log($(".col-" + a).children().eq(b).attr("src"));
                    console.log($(".col-" + contador).children().eq(b).attr("src"));


                    if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                    {
                        console.log("condicional2");
                        console.log(a);
                        console.log(contador);
                        marcaDulce.push(contador);
                        eliminaDulceHorizontal(marcaDulce,b);
                        contador++;
                        console.log($(".col-" + a).children().eq(b).attr("src"));
                        console.log($(".col-" + contador).children().eq(b).attr("src"));


                        if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                        {
                            console.log("condicional3");
                            console.log(a);
                            console.log(contador);
                            marcaDulce.push(contador);
                            eliminaDulceHorizontal(marcaDulce,b);
                            contador++;
                            console.log($(".col-" + a).children().eq(b).attr("src"));
                            console.log($(".col-" + contador).children().eq(b).attr("src"));


                            if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                            {
                                console.log("condicional4");
                                console.log(a);
                                console.log(contador);
                                marcaDulce.push(contador);
                                eliminaDulceHorizontal(marcaDulce,b);
                                contador++;
                                console.log($(".col-" + a).children().eq(b).attr("src"));
                                console.log($(".col-" + contador).children().eq(b).attr("src"));


                                if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                                {
                                    console.log("condicional5");
                                    console.log(a);
                                    console.log(contador);
                                    marcaDulce.push(contador);
                                    eliminaDulceHorizontal(marcaDulce,b);
                                    contador++;
                                    console.log($(".col-" + a).children().eq(b).attr("src"));
                                    console.log($(".col-" + contador).children().eq(b).attr("src"));


                                    if  ($(".col-" + a).children().eq(b).attr("src") === $(".col-" + contador).children().eq(b).attr("src"))
                                    {
                                        console.log("condicional6");
                                        console.log(a);
                                        console.log(contador);
                                        marcaDulce.push(contador);
                                        eliminaDulceHorizontal(marcaDulce,b);
                                        console.log($(".col-" + a).children().eq(b).attr("src"));
                                        console.log($(".col-" + contador).children().eq(b).attr("src"));
                                    }
                                    else
                                    {
                                        console.log("no son iguales");
                                        marcaDulce.length = 0;
                                    }
                                }
                                else
                                {
                                    console.log("no son iguales");
                                    marcaDulce.length = 0;
                                }
                            }
                            else
                            {
                                console.log("no son iguales");
                                marcaDulce.length = 0;
                            }
                        }
                        else
                        {
                            console.log("no son iguales");
                            marcaDulce.length = 0;
                        }
                    }
                    else
                    {
                        console.log("no son iguales");
                        marcaDulce.length = 0;
                    }
                }
                else
                {
                    console.log("no son iguales");
                    marcaDulce.length = 0;
                }
            }
            console.log("--------  CAMBIO DE FILA -----" + b+1);
        }

}

function eliminaDulce (marcaDulce,dulcePosicion)
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



