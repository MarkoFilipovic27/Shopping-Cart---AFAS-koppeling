//SELECTORS
const itemContainer = document.getElementsByClassName(".item-container");
const itemList = document.querySelector(".item-list");
const itemRow = document.querySelector(".item-row");
const itemOmschrijving = document.querySelector(".item-omschrijving");
const itemCode = document.querySelector(".item-code");
const itemVoorraad = document.querySelector(".item-voorraad");
const itemPrijs = document.querySelector(".item-prijs");
const itemAfbeelding = document.querySelector(".item-afbeelding");



//EVENT LISTENERS


//FUNCTIONS

//Ophalen en tonen van de data
async function getData(){
    //data ophalen middels een API URL
    const response = await fetch('https://31219.restaccept.afas.online/ProfitRestServices/connectors/Items?skip=0&take=25', {
        method: 'get',
        headers: {
            Authorization: "AfasToken " + window.btoa("<token><version>1</version><data>5BABD7C96D94488E9A2CB1C19B8CBD2DC23A01ED428F63F81FC1A7ABB6DE57F4</data></token>")
        }
    })

    //data terugstoppen in data als een response in json
    const data = await response.json();

    //loggen van de raw json
    console.log(data);


    //loop om alle divs te maken
    for (let i = 0; i < data.rows.length; i++){
        const itemRow = document.createElement("li");
        const divAfbeelding = document.createElement("div");
        const divOmschrijving = document.createElement("div");
        const divItemcode = document.createElement("div");
        const divVoorraad = document.createElement("div");
        const divPrijs = document.createElement("div");
        
        //alles in een array, zodat het uniek is
        var ItemsData = [{
            id: data.rows[i].Itemcode,
            omschrijving: data.rows[i].Omschrijving,
            prijs: data.rows[i].Bedrag,
            image: data.rows[i].Afbeelding
        }];

        //row div
        itemRow.classList.add('item-row');
        itemRow.setAttribute("id", data.rows[i].Itemcode);
        itemList.appendChild(itemRow);

        //afbeelding div
        var image = new Image();
        var imageBase64 = data.rows[i].Afbeelding;
        image.src = 'data:image/png;base64,' + imageBase64;
        divAfbeelding.appendChild(image);
        divAfbeelding.classList.add('item-afbeelding');
        itemRow.appendChild(divAfbeelding);

        //omschrijving div
        divOmschrijving.innerText = data.rows[i].Omschrijving;
        divOmschrijving.classList.add('item-omschrijving');
        itemRow.appendChild(divOmschrijving);

        //item-code div
        divItemcode.innerText = data.rows[i].Itemcode;
        divItemcode.classList.add('item-code');
        itemRow.appendChild(divItemcode);

        //voorraad div
        divVoorraad.innerText = data.rows[i].Op_voorraad;
        divVoorraad.classList.add('item-voorraad');
        itemRow.appendChild(divVoorraad);

        //prijs div
        divPrijs.innerText = data.rows[i].Bedrag;
        divPrijs.classList.add('item-prijs');
        itemRow.appendChild(divPrijs);
        
        //div voor min, plus en aantal
        const divMinplus = document.createElement("div");
        divMinplus.classList.add('min-plus-aantal');
        itemRow.appendChild(divMinplus);

        //min button div
        const minButton = document.createElement('button');
        minButton.innerHTML = '<i onclick="minnenAantal()" class="material-icons" style="font-size:18px">remove</i>';
        minButton.classList.add('min-btn');
        divMinplus.appendChild(minButton);

        //aantal invullen div
        const invulAantal = document.createElement('input');
        invulAantal.classList.add('invul-aantal');
        invulAantal.setAttribute("type", "number");
        invulAantal.setAttribute("placeholder","0");
        invulAantal.setAttribute("value","0");
        divMinplus.appendChild(invulAantal);

        //plus button div
        const plusButton = document.createElement('button');
        plusButton.innerHTML = '<i onclick="plussenAantal()" class="material-icons" style="font-size:18px">add</i>';
        plusButton.classList.add('plus-btn');
        divMinplus.appendChild(plusButton);

        

        console.log(ItemsData);

        
        
    }

    let plussenAantal =  function plussenAantal() {
        let selectedItem = ItemsData.id;
        console.log(ItemsData.id);
    };

    };




async function minnenAantal(id){

};



//functie oproepen tijdens het laden van de pagina
getData();