function validaColumna()
{
    var contador = 0;
    var dulcePosicion = $(".col-1").children();
    var marcaDulce = new Array;

    for (i=0; i<7; i++)
    {
        
        contador = i+1;
        console.log("inicia en:" + i);
        console.log(i);
        console.log(contador);
        console.log(dulcePosicion.eq(i).attr("src"));
        console.log(dulcePosicion.eq(contador).attr("src"));

        if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
        {
            marcaDulce.push(i,contador);
            contador++;       
            console.log("condicional1");
            console.log(i);
            console.log(contador);
            console.log(dulcePosicion.eq(i).attr("src"));
            console.log(dulcePosicion.eq(contador).attr("src"));

            if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
            {
                marcaDulce.push(contador);
                eliminaDulce(marcaDulce, dulcePosicion);
                contador++;
                console.log("condicional2");
                console.log(i);
                console.log(contador);
                console.log(dulcePosicion.eq(i).attr("src"));
                console.log(dulcePosicion.eq(contador).attr("src"));

 
                if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                {
                    marcaDulce.push(contador);
                    eliminaDulce(marcaDulce, dulcePosicion);
                    contador++;
                    console.log("condicional3");
                    console.log(i);
                    console.log(contador);
                    console.log(dulcePosicion.eq(i).attr("src"));
                    console.log(dulcePosicion.eq(contador).attr("src"));

                    if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                    {
                        marcaDulce.push(contador);
                        eliminaDulce(marcaDulce, dulcePosicion);
                        contador++;
                        console.log("condicional4");
                        console.log(i);
                        console.log(contador);
                        console.log(dulcePosicion.eq(i).attr("src"));
                        console.log(dulcePosicion.eq(contador).attr("src"));

                        if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                        {
                            marcaDulce.push(contador);
                            eliminaDulce(marcaDulce, dulcePosicion);
                            contador++;
                            console.log("condicional5");
                            console.log(i);
                            console.log(contador);
                            console.log(dulcePosicion.eq(i).attr("src"));
                            console.log(dulcePosicion.eq(contador).attr("src"));

                            if (dulcePosicion.eq(i).attr("src") === dulcePosicion.eq(contador).attr("src"))
                            {
                                marcaDulce.push(contador);
                                eliminaDulce(marcaDulce, dulcePosicion);
                                console.log("condicional6");
                                console.log(i);
                                console.log(contador);
                                console.log(dulcePosicion.eq(i).attr("src"));
                                console.log(dulcePosicion.eq(contador).attr("src"));
                            }
                            else{
                                console.log("no es igual6" + " i vale: " + i + " ,contador vale: " + contador);
                                } // Vacia el arreglo
                        }
                        else{
                            console.log("no es igual5" + " i vale: " + i + " ,contador vale: " + contador);
                           } // Vacia el arreglo
                    }
                    else{
                        console.log("no es igual4" + " i vale: " + i + " ,contador vale: " + contador);
                    } // Vacia el arreglo
                }
                else{
                    console.log("no es igual3" + " i vale: " + i + " ,contador vale: " + contador);
                } // Vacia el arreglo
            }
            else{
                console.log("no es igual2" + " i vale: " + i + " ,contador vale: " + contador);
            } // Vacia el arreglo  
        }
        else
        {
            console.log("no es igual1....." + " i vale: " + i + " ,contador vale: " + contador);
        } // Vacia el arreglo  
    }
    
}