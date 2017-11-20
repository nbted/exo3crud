window.onload = init;

let nextButton, previousButton;
let page=0;
  let pagesize=10;
    let pagesizemax;

function init() {
    //aller chercher ce button html comme findviewById android
    nextButton = document.querySelector("#buttonNext");
    previousButton = document.querySelector("#buttonPrevious");
    previousButton.disabled = true;

    // On affiche des que la page est chargée
    countRestaurant();
    getRequest();
   
}



function getRequest() {
    let url;
    if (page===0) {
      
      url = "/api/restaurants"

    }
    else if (page > 0) {
        url = "/api/restaurants?page=" + page ;
    }

    else{
        console.log("fininnnnnn") ;

    }

     
    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
function countRestaurant(){
       let url ="api/restaurantNombre";
       fetch(url)
       .then(response => {
        return response.json();
       })
       .then(compte => {

         pagesizemax = compte.data;
         console.log("pagesizemax =" +pagesizemax);
       })

    }

function pageadd(){
       page++;
              previousButton.disabled = false;
              pagesizemax-=pagesize;
              console.log("pagesizemax =" +pagesizemax);
              if (pagesizemax===pagesize) 
                  nextButton.disabled = true;
            
             getRequest();
   
}

function pagerem(){
   if(page > 0) 
           {
              page-- ;
              nextButton.disabled = false;
             if(page ===0) previousButton.disabled = true;
            }
          getRequest();
}


function getRequestNom(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    //  Récupération du formulaire. Pas besoin de document.querySelector
    //  ou document.getElementById puisque c'est le formulaire qui a généré
    //  l'événement

    let userNom  = document.getElementById("#nom").value;

    
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    
    let url = "/api/restaurants?nom="+userNom;

    fetch(url)
        .then(function(responseJSON) {
            responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseGET(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
    
}



function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;
     
    // Dans reponse.data j'ai les restaurants
    afficheRestaurantsEnTable(reponse.data);
}


function afficheRestaurantsEnTable(restaurants) {
    console.log("creer tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < restaurants.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "restaurant" + i;

        let restaurant = restaurants[i];
        let nom = restaurant.name;
        let cuisine = restaurant.cuisine;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "restaurant" + i + "Nom" ;

        let celluleCuisine = ligne.insertCell();
        celluleCuisine.innerHTML = cuisine;
        celluleCuisine.id = "restaurant" + i + "Cuisine" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + restaurant._id + ' onclick="supprimerRestaurant(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + restaurant._id + ' onclick="modifierRestaurant(' + i + ');">Modifier</button>';

        /*
        ligne.innerHTML = "<td>" + nom + "</td><td>"    
                            + cuisine + "</td>"; 
                            */
    }

    let divTable = document.querySelector("#reponseGETenTableau");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}
