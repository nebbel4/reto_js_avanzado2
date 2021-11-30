urlPokemon = "https://pokeapi.co/api/v2/pokemon?limit=151";

let data_global = [];

function getDatos(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {

            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response))
            }
            else {
                reject();
            }
            //console.log(xhr.response);
            // setData(data);
        };
        xhr.send();
    });
}


function setData(datos, tipo) {
    //alert(tipo);
    console.log(datos);
    if (tipo === "pokemon") {
        getPokemonUrl(datos.results);
    } else if (tipo === "detallePokemon") {
        tarjetasPokemon(datos);
    } /*else if (tipo === "notas") {
        datosNotas = datos[0].notas;
    }*/
}


function getPokemonUrl(pokemon) {

    for (let index = 0; index < pokemon.length; index++) {
        const element = pokemon[index];
        urlPorPokemon = element.url;

        getDatos(urlPorPokemon).then(data => {
            setData(data, "detallePokemon");
            data_global.push(data);
        }).catch(error => {
            console.log("Error en la solicitud al servidor!");
        })

        
    }
}





function tarjetasPokemon(detalles) {
    
        //let bodyElement = document.body;
        let containerElement = document.getElementById("containerCards");
        //The document.createElement() method create html elements specified by tagName
        let cardElement = document.createElement('div');
        let imageContainer = document.createElement('div');
        let infoContainer = document.createElement('div');
        let imageElement = document.createElement('img');
        let headingElement = document.createElement('h5');
        let paragraphElement = document.createElement('p');
        let btnElement = document.createElement('a');
        
        //The ClassName property gets and sets the value of the class attribute of the spefified element
        cardElement.className = "card";
        imageContainer.className = "image-container";
        infoContainer.className = "info-container";
        imageElement.className = "image";
        headingElement.className = "heading";
        paragraphElement.className = "paragraph";
        btnElement.className = "btn";
        
        //Works the same way as the className property except it sets the source of the imageElement
        imageElement.src = detalles.sprites.other.dream_world.front_default;

        // This sets the value of an attribute specified element. If exists then will be updated, otherwise the new attribute is added with the specified name and value
        //btnElement.setAttribute("href", "#");
        btnElement.setAttribute("id", "registro_"+detalles.id);
        imageElement.setAttribute("alt", "Image from Unsplash");

        headingElement.innerText = detalles.forms[0].name;

        for (let index = 0; index < detalles.types.length; index++) {
            let element = detalles.types[index];
            paragraphElement.innerText = "Tipo: " + element.type.name;
        }
        btnElement.innerText = "Conoce más";
        containerElement.appendChild(cardElement);
        cardElement.append(imageContainer, infoContainer);

        imageContainer.appendChild(imageElement);
        infoContainer.append(headingElement, paragraphElement, btnElement);
        
        let evento = document.getElementById("registro_"+detalles.id);
        evento.addEventListener('click', function(){perfilPokemon(detalles)}, false);

        function perfilPokemon(detalles){
            //alert("Soy el pokemon " +detalles.id)
            

            // Get the modal
            var modal = document.getElementById("myModal");
            
            var modalFooter = document.getElementById("modalFooter");
            
            // When the user clicks on the button, open the modal
            modal.style.display = "block";

            //Agrega titulo nombre pokemon
            document.getElementById("h1").innerHTML = detalles.forms[0].name;

            // Agrega descripcion del pokemon seleccionado
            document.getElementById("modalBody").innerHTML = "";
            for (let index = 0; index < detalles.moves.length; index++) {
                let element2 = detalles.moves[index];
                let paragraphs_moves = document.createElement("p");
                let moves_text = document.createTextNode(element2.move.name);
                paragraphs_moves.appendChild(moves_text)
                let modalBody = document.getElementById("modalBody");
                modalBody.appendChild(paragraphs_moves);
            }
            

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];


            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none"; 
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        }
}



getDatos(urlPokemon).then(data => {
    setData(data, "pokemon");
    data_global.push(data);
}).catch(error => {
    console.log("Error en la solicitud al servidor!");
})


var input = document.getElementById("myInput");
input.addEventListener("input", myFunction);

function myFunction(e) {
  var filter = e.target.value.toUpperCase();

  var list = document.getElementById("containerCards");
  var divs = list.getElementsByTagName("div");
  for (var i = 0; i < divs.length; i++) {
  	var a = divs[i].getElementsByTagName("h5")[0];
    
    if (a) {
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        divs[i].style.display = "";
      } else {
        divs[i].style.display = "none";
      }
    }       
  }

}