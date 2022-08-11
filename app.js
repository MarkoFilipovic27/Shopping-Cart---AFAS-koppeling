//SELECTORS
const itemContainer = document.getElementsByClassName(".item-container");
const itemList = document.querySelector(".item-list");
const itemRow = document.querySelector(".item-row");
const itemOmschrijving = document.querySelector(".item-omschrijving");
const itemCode = document.querySelector(".item-code");
const itemVoorraad = document.querySelector(".item-voorraad");
const itemPrijs = document.querySelector(".item-prijs");
const itemAfbeelding = document.querySelector(".item-afbeelding");
const id = "";
var ItemsData = {
    id: "",
    omschrijving: "",
    prijs: "",
    image: ""
};



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
        const divExtraOmschrijving = document.createElement("div");
        const divItemcode = document.createElement("div");
        const divVoorraad = document.createElement("div");
        const divPrijs = document.createElement("div");
        const divProductInfo = document.createElement("div");
        const divProductText = document.createElement("div");
        const divPrijsMinAantalPlus = document.createElement("div");
        
        //alles in een array, zodat het uniek is
        ItemsData = {
            id: data.rows[i].Itemcode,
            omschrijving: data.rows[i].Omschrijving,
            prijs: data.rows[i].Bedrag,
            image: data.rows[i].Afbeelding
        };

        //console.log(ItemsData.id);

        //row div
        itemRow.classList.add('item-row');
        itemRow.setAttribute("id", data.rows[i].Itemcode);
        //itemRow.setAttribute("class", "basis-1/4 p-2 m-2 bg-white  hover:shadow border border-b-4");
        itemRow.setAttribute("class", "h-[420px] w-[900px] m14 my-3.5 mx-auto rounded-lg shadow-xl");
        itemList.appendChild(itemRow);

        //afbeelding div
        var image = new Image();
        var imageBase64 = data.rows[i].Afbeelding;
        image.src = 'data:image/png;base64,' + imageBase64;
        image.classList = "h-[420px] object-cover object-left-top rounded-tl-lg rounded-bl-lg"
        divAfbeelding.appendChild(image);
        divAfbeelding.classList.add('item-afbeelding');
        //divAfbeelding.setAttribute("class", "flex justify-center h-32 p-2");
        divAfbeelding.setAttribute("class", "float-left h-[420px] w-[327px] rounded-tl-lg rounded-bl-lg");
        itemRow.appendChild(divAfbeelding);

        //product info
        divProductInfo.setAttribute("class", "product-info float-left h-[420px] w-[573px] bg-white rounded-tr-lg rounded-br-lg");
        itemRow.appendChild(divProductInfo);

        //product text
        divProductText.setAttribute("class", "product-text h-[300px] w-[573px]");
        divProductInfo.appendChild(divProductText);

        //omschrijving div
        divOmschrijving.innerText = data.rows[i].Omschrijving;
        divOmschrijving.classList.add('item-omschrijving');
        //divOmschrijving.setAttribute("class", "text-sm text-red-500 font-semibold subpixel-antialiased h-10");
        divOmschrijving.setAttribute("class", "ml-9 mr-9 pt-12 text-4xl text-zinc-700 font-['Bentham'] font-semibold");
        divProductText.appendChild(divOmschrijving);

        //extra omschrijving div
        divExtraOmschrijving.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam enim lacus, tincidunt in tempor id, ultrices eget augue.";
        divExtraOmschrijving.setAttribute("class", "h-[70px] ml-9 mr-9 font-['Playfair Display'] text-zinc-600 leading-relaxed text-base font-light overflow-hidden");
        divProductText.appendChild(divExtraOmschrijving);

        //item-code div
        divItemcode.innerText = "Itemcode: " + data.rows[i].Itemcode;
        divItemcode.classList.add('item-code');
        //divItemcode.setAttribute("class", "text-black text-sm subpixel-antialiased");
        divItemcode.setAttribute("class", "ml-9 mr-9 font-['Playfair Display'] text-zinc-600 leading-relaxed text-base font-light overflow-hidden");
        divProductText.appendChild(divItemcode);

        //voorraad div
        divVoorraad.innerHTML = "<span>Op voorraad: </span>";
        divVoorraad.innerText = "Op voorraad: " + data.rows[i].Op_voorraad;
        divVoorraad.classList.add('item-voorraad');
        divVoorraad.setAttribute("class", "text-black text-sm subpixel-antialiased");
        divVoorraad.setAttribute("class", "ml-9 mr-9 font-['Playfair Display'] text-zinc-600 leading-relaxed text-base font-light overflow-hidden");
        divProductText.appendChild(divVoorraad);     

        
        
        //div voor min, plus, aantal en prijs 
        divPrijsMinAantalPlus.setAttribute("class", "prijs-aantal relative");
        divProductInfo.appendChild(divPrijsMinAantalPlus);

        //prijs div
        divPrijs.innerText = "€ " + data.rows[i].Bedrag;
        divPrijs.classList.add('item-prijs');
        divPrijs.setAttribute("class", "ml-9 mr-9 text-4xl text-zinc-700 font-['Bentham'] font-semibold inline-block absolute");
        divPrijsMinAantalPlus.appendChild(divPrijs);

        //div voor min, plus, aantal
        const divMinplus = document.createElement("div");
        divMinplus.classList.add('min-plus-aantal');
        divMinplus.setAttribute("class", "w-[573px] float-right inline-block mr-10 ml-4 box-border absolute");
        divPrijsMinAantalPlus.appendChild(divMinplus);
       

        //min button div
        const minButton = document.createElement('button');
        minButton.setAttribute("id", ItemsData.id);
        minButton.setAttribute("onclick", `minnenAantal(${ItemsData.id})`);
        minButton.setAttribute("class", "align-middle hover:shadow-md");
        minButton.innerHTML = `<i class="material-icons inline-block float-right shadow focus:shadow-outline focus:outline-none bg-red-500 text-white h-10 w-10 font-bold rounded border-red-600 border-b-4">remove</i>`;
        minButton.innerText.replace("'", "");
        minButton.classList.add('min-btn');
        divMinplus.appendChild(minButton);

        //aantal invullen div
        const invulAantal = document.createElement('input');
        invulAantal.classList.add('invul-aantal');
        invulAantal.setAttribute("type", "number");
        invulAantal.setAttribute("value",0);
        invulAantal.setAttribute("id", ItemsData.id+"aantal");
        invulAantal.setAttribute("min", 0);
        invulAantal.setAttribute("class", "h-10 w-20 text-center shadow appearance-none border rounded m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:shadow-md");
        invulAantal.setAttribute("oninput", "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null");
        divMinplus.appendChild(invulAantal);

        //plus button div
        const plusButton = document.createElement('button');
        plusButton.setAttribute("id", ItemsData.id);
        plusButton.setAttribute("onclick", `plussenAantal(${ItemsData.id})`);
        plusButton.setAttribute("class", " hover:shadow-md");
        plusButton.innerHTML = `<i id="${ItemsData.id}plus" class="material-icons shadow focus:shadow-outline focus:outline-none bg-lime-500 text-white h-10 w-10 font-bold rounded border-lime-600 border-b-4">add</i>`;
        plusButton.classList.add('plus-btn');
        divMinplus.appendChild(plusButton);
    }

};





//functie oproepen tijdens het laden van de pagina
getData();

function plussenAantal(clicked_id){
    //const aantal = document.getElementsByClassName("invul-aantal")[i].value;
    //console.log(aantal);
    
    var clicked_id;
    var oudAantal = parseInt(document.getElementById(clicked_id+"aantal").value);
    oudAantal++
    document.getElementById(clicked_id+"aantal").value = oudAantal;
    document.getElementById(clicked_id+"aantal").setAttribute("value", oudAantal);
};

function minnenAantal(clicked_id){
    //const aantal = document.getElementsByClassName("invul-aantal")[i].value;
    //console.log(aantal);
    
    var clicked_id;
    var oudAantal = parseInt(document.getElementById(clicked_id+"aantal").value);
    oudAantal--
    document.getElementById(clicked_id+"aantal").value = oudAantal;
    document.getElementById(clicked_id+"aantal").setAttribute("value", oudAantal);
};