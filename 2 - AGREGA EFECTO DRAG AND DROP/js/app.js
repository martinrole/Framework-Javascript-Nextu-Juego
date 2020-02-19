//  ---------------------------------    Inicia el juego al presionar el boton iniciar
$(function()
{
    iniciaJuego();
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
    $(".elemento").draggable                            //Permite mover el elemento seleccionado
    ({
        containment: ".panel-tablero",                  // No permite que salga del tablero el elemento
        //droppable: ".elemento",                       // Le
        revert: true,                                   //Permite devolve un objeto a su posición inicial .Lo que realmente hace acá, es devolver el elemento seleccionado pero cambiando el src por la imagen del objeto que se puso encima.
        zIndex: 100,                                    //Cuando se tiene seleccionado un elemento se pone al frente para verlo seleccionado          
        grid: [120,100],                                // Es la distancia de una cuadricula que se puede mover el elemento, para que respete la cuadricula del juego
    });
    $(".elemento").droppable                            // Vuelve a todos los elementos contenedores
    ({
        drop: intercambiaDulce                          // Llama la función intercambiaDulce. Tambien se le esta diciendo que todos los elementos con clase elemento sean contenedores o droppables
    });
}

function intercambiaDulce (event,dulceDrag)
{
    //Captura de datos del dulce SELECCIONADO O ARRASTRADO
    var dulceDrag = $(dulceDrag.draggable);             // Detecta el dulce que se va a mover
    var dulceDragSrc = dulceDrag.attr("src");           // Captura el atributo source del dulce que se movio

    // Captura de datos del dulce encima o CONTENEDOR
    var dulceDrop = $(this);                            // Detecta el dulce sobre el cual se coloco el dulce arrastrable
    var dulceDropSrc = dulceDrop.attr("src");           //Captura el atributo source del dulce contenedor

    //Intercambio de dulces
    dulceDrag.attr("src", dulceDropSrc);                //Le dice que el dulce arrastrable tendrá el valor del source el dulce contenedor y que reversa a su posición original gracias a la propiedad revert del draggable del la linea 49
    dulceDrop.attr("src", dulceDragSrc);                // Le dice que el dulce contenedor ahora tendrá el valor o source del dulce que se movio
}