import './css/base.css'
var map = require('lodash/map');
import template from './template/lista.hbs';
import  './js/utils.js';

let appContainer=document.getElementById("appcontent");

let mockElementi=[
    {id:1,nome:"Titolo 1",qnt:1,descrizione:"---",immagine:"https://picsum.photos/200?random=1",prezzo:12.11},
    {id:2,nome:"Titolo 2",qnt:1,descrizione:"--",immagine:"https://picsum.photos/200?random=2",prezzo:21.1},
    {id:3,nome:"Titolo 3",qnt:1,descrizione:"--",immagine:"https://picsum.photos/200?random=3",prezzo:21.0},
    {id:4,nome:"Titolo 4",qnt:1,descrizione:"--",immagine:"https://picsum.photos/200?random=4",prezzo:21.21}
];

function instantClass(itemObj,classValue){
    let classess= (itemObj.getAttribute("class")==null)?"":itemObj.getAttribute("class");
    itemObj.setAttribute("class",classess+" "+classValue);
    setTimeout(function(){
        itemObj.setAttribute("class",classess);
    },800);
}

function showPopUp(){
    let message=document.createElement("div");
    message.className="message";
    message.innerHTML="<h2>Messaggio</h2>";
    appContainer.append(message);
    setTimeout(function(){
        message.remove();
    },5000);
}

function subTotale(elementi,idcontenitore){
    let totale=0;
    mockElementi.forEach((element,index) => {
        totale+=parseFloat(element.prezzo)*parseInt(element.qnt);
    }); 
    let subElement=document.getElementById(idcontenitore);
    subElement.textContent="TOTALE: "+totale.toFixed(2);
    instantClass(subElement,"evidenzia");
}


function updateInChiave(lista,chiave,valore){
    lista.forEach((item,index)=>{
        if(item.id==chiave){
                mockElementi[index].qnt=valore;
        }
    });
    return null;
}

function removeChiave(lista,chiave){
    let newList=[];
    lista.forEach((item,index)=>{
        if(item.id!=chiave){
            newList.push(item);
        }
    });
    mockElementi=newList;
}

function loadCart(){

    console.log("%c Il tuo carrello è così composto","color:green;border:1px solid #333;padding: 12px;");
    console.table(mockElementi);

    let carrello=document.getElementById("carrello");
    subTotale(mockElementi,"subtotale");

    carrello.innerHTML = template({mockElementi});

    let inputQnt=carrello.querySelectorAll("input");
    inputQnt.forEach(item=>{
        item.addEventListener('change',event=>{
            let inputObject=event.target;
            let codice=inputObject.dataset.codice;
            
            if(inputObject.value>0){
                updateInChiave(mockElementi,codice,inputObject.value);
                subTotale(mockElementi,"subtotale");
            }else{
                removeChiave(mockElementi,codice);
                loadCart();
            }
            
        });
    });

}



let botApp=((config)=>{


    let elementi=mockElementi;
    if(config !== undefined){
        elementi=config;
    }
    
    
    let confermaButton=document.createElement("button");
    confermaButton.textContent=("Conferma");

    let carrello=document.createElement("div");   
    carrello.setAttribute("id","carrello");
    carrello.setAttribute("class","carrello-elementi");
    let subtotale=document.createElement("div");
    subtotale.setAttribute("id","subtotale");


    confermaButton.addEventListener('click', event => {
        let button=event.target;
        button.textContent = `Conferma : ${event.detail}`;
        if(event.detail==10){
            showPopUp();
        }
    });

    

    appContainer.append(carrello);
    appContainer.append(subtotale);
    appContainer.append(confermaButton);
    loadCart();

    

  
   

})();

