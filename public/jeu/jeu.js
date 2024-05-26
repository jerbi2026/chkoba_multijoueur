


joueur_kle=false;
machine_kle=false;

mekla_joueur=[]
mekla_machine=[]
kaf_joeur=[]
kaf_machine=[]
hbout=[]
cards_selectionned=[]
card_joueur={};



const socket = io();




function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



function start_jarya(){
    const socket = io();
    var contenuJoueur="";
    var contenumachine="";
    var contenuHbout="";
    for(let i=0;i<3;i++){
        kaf_joeur.push(chkoba[i]);
        
        contenuJoueur+=`<a href="#" id="${chkoba[i].nom}" onclick="ekel('${chkoba[i].nom}')">
        <div class="card" style=" background: url(${chkoba[i].image}); background-size: contain; background-position: center; background-repeat: no-repeat;">
            <div class="card-content">
            
            </div>
        </div>
        <button class="button" style="display:none" onclick="jetter('${chkoba[i].nom}')">jeter</button>
       
      </a>`
    }
    chkoba.splice(0, 3);
    for(let i=0;i<3;i++){
        kaf_machine.push(chkoba[i]);
        contenumachine+=`<div class="card-back" id="${chkoba[i].nom}"></div>`
    
    }
    chkoba.splice(0, 3);
    for(let i=0;i<4;i++){
        hbout.push(chkoba[i]);
        contenuHbout+=`<a href="#" id="${chkoba[i].nom}" onclick="cardClick('${chkoba[i].nom}')">
        <div class="card"   style=" background: url(${chkoba[i].image}); background-size: contain; background-position: center; background-repeat: no-repeat;">
            <div class="card-content">
            </div>
        </div>
        
      </a>`
    }
    chkoba.splice(0, 4);
    
    var joueur=document.getElementById("joueur");
    var hboutContainer=document.getElementsByClassName("card-container");
    
    
   
    var machine=document.getElementById("machine");
    machine.innerHTML=contenumachine;
    animate_2(kaf_machine);
    console.log(hbout);
    socket.on('updateCommonCards', (hbout) => {
        hboutContainer[0].innerHTML = contenuHbout;
        animate_hbout(hbout);
        console.log(hbout);
        console.log("aaaaaaaaa");
    });

    socket.on('updatePlayerCards', (kaf_joeur) => {
        joueur.innerHTML = contenuJoueur;
        animate(kaf_joeur);
        console.log(kaf_joeur);
    });
    
    socket.on('updateOtherPlayerCards', ({ playerId, playerCards }) => {
        console.log(`Mise à jour des cartes du joueur ${playerId}`, playerCards);
    });
    
   
   

}





function awed_ejri(){
    var contenuJoueur="";
    var contenumachine="";
    for(let i=0;i<3;i++){
        kaf_joeur.push(chkoba[i]);
        
        contenuJoueur+=`<a href="#" id="${chkoba[i].nom}" onclick="ekel('${chkoba[i].nom}')">
        <div class="card" style=" background: url(${chkoba[i].image}); background-size: contain; background-position: center; background-repeat: no-repeat;">
            <div class="card-content">
            
            </div>
        </div>
        <button class="button" style="display:none" onclick="jetter('${chkoba[i].nom}')">jeter</button>
       
      </a>`
    }
    chkoba.splice(0, 3);
    for(let i=0;i<3;i++){
        kaf_machine.push(chkoba[i]);
        contenumachine+=`<div class="card-back" id="${chkoba[i].nom}"></div>`
    
    }
    chkoba.splice(0, 3);
    

    let joueur=document.getElementById("joueur");
    joueur.innerHTML=contenuJoueur;
    animate(kaf_joeur);
    
    let machine=document.getElementById("machine");
    machine.innerHTML=contenumachine;
    animate_2(kaf_machine);
    
    
    
}



function afficher_hbout(){
    let hboutContainer = document.querySelector(".card-container");
    hboutContainer.innerHTML='';
    let contenuHbout='';
    for(let i=0;i<hbout.length;i++){
        
        contenuHbout+=`<a href="#" id="${hbout[i].nom}" onclick="cardClick('${hbout[i].nom}')">
        <div class="card"   style=" background: url(${hbout[i].image}); background-size: contain; background-position: center; background-repeat: no-repeat;">
            <div class="card-content">
            </div>
        </div>
        
      </a>`
    }
    hboutContainer.innerHTML=contenuHbout;
}


function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function calcul_score(){
    var carta = document.getElementById("carta");
   if(mekla_joueur.length>mekla_machine.length){
    carta.textContent="Joueur";
   }
   else if(mekla_joueur.length<mekla_machine.length){
    carta.textContent="machine";
   }
   else{
    carta.textContent="beji";
   }
   var haya =document.getElementById("haya");
   let trouv = mekla_joueur.find(elt => elt.nom === "7_dineri");

   if (trouv !== null) {
       haya.textContent = "Joueur";
   } else {
       haya.textContent = "machine";
   }
   

   var dineri = document.getElementById("dineri");

   let trouv_dineri = mekla_joueur.filter(elt => elt.nom.includes("dineri"));
   if(trouv_dineri.length>5){
    dineri.textContent="Joueur";
   }
   else if(trouv_dineri.length<5){
    dineri.textContent="machine";
   }
   else{
    dineri.textContent="beji";
   }


   var bermila = document.getElementById("bermila");
   let trouv_bermila = mekla_joueur.filter(elt => elt.nom.includes("7"));
   if(trouv_bermila.length>2){
    bermila.textContent="joueur";
   }
   else if (trouv_bermila.length>2){
    bermila.textContent="machine";
   }
   else{
    let trouv_sdous= mekla_joueur.filter(elt => elt.nom.includes("6"));
    if(trouv_sdous.length>2){
        bermila.textContent="joueur";
    }
    else if (trouv_sdous.length>2){
        bermila.textContent="machine";
    }
    else{
        bermila.textContent="beji";
    }
    
   }

   var dialog = document.getElementById("dialog");
   dialog.style.display="block";





}


function close_dialog(){
    var dialog = document.getElementById("dialog");
   dialog.style.display="none";
}













window.onload=function(){
   
    
    shuffle(chkoba);
    start_jarya();
    animate_jarya();
   
    
    
   
    
    
    
}