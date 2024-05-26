
mekla_joueur=[]
mekla_machine=[]
kaf_joeur=[]
kaf_machine=[]
hbout=[]
cards_selectionned=[]

tour_user=true;
tour_machine=false;

var nb_tour=0;





function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}



function start_jarya(){
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
    
    let joueur=document.getElementById("joueur");
    joueur.innerHTML=contenuJoueur;
   
    let machine=document.getElementById("machine");
    machine.innerHTML=contenumachine;

    let hboutContainer=document.getElementsByClassName("card-container");
    hboutContainer[0].innerHTML=contenuHbout;
    console.log(kaf_machine);
    nb_tour++;

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
   
    let machine=document.getElementById("machine");
    machine.innerHTML=contenumachine;

    
    console.log(kaf_machine);
}



window.onload=function(){
    shuffle(chkoba);
    start_jarya();
    
    
}