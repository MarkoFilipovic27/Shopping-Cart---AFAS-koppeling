//SELECTORS
const itemList = document.querySelector('.item-list');


//Event listners


//Functions
function getData(){
fetch('https://31219.restaccept.afas.online/ProfitRestServices/connectors/Items?skip=0&take=100', {
    method: 'get',
    headers: {
        Authorization: "AfasToken " + window.btoa("<token><version>1</version><data>5BABD7C96D94488E9A2CB1C19B8CBD2DC23A01ED428F63F81FC1A7ABB6DE57F4</data></token>")
    }

})
.then(response => response.json())
.then(json => console.log(json))};

function createItemdiv(){
    //Create item div
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    //Create li
    const newItem = document.createElement('li');
    newItem.innerText = "Omschrijving";
    newItem.classList.add('item-li');
    itemDiv.appendChild(newItem);


};