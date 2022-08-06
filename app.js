//SELECTORS
const itemContainer = document.getElementsByClassName(".item-container");
const itemList = document.querySelector(".item-list");
const itemRow = document.querySelector(".item-row");
const itemOmschrijving = document.querySelector(".item-omschrijving");
const itemCode = document.querySelector(".item-code");
const itemVoorraad = document.querySelector(".item-voorraad");
const itemPrijs = document.querySelector(".item-prijs");

//EVENT LISTENERS


//FUNCTIONS
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

    //definieren van het aantal regels
    console.log(data.rows.length);

    //alle omschrijvingen ophalen
    for (let i = 0; i < data.rows.length; i++){
        const itemRow = document.createElement("li");
        const divOmschrijving = document.createElement("div");
        const divItemcode = document.createElement("div");
        const divVoorraad = document.createElement("div");
        const divPrijs = document.createElement("div");
        
        //row
        itemRow.classList.add('item-row');
        itemList.appendChild(itemRow);

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
        
    }

    };
    
    //functie oproepen tijdens het laden van de pagina
    getData();

/*
function createItemdiv(){
    const newDiv = document.createElement("div");
    itemDiv.classList.add('itemDiv');
    itemContainer.appendChild(newDiv);
};*/