
function ekel(name) {
    cards_selectionned.splice(0,cards_selectionned.length);
    let buttons = document.getElementsByClassName("button");
    for(let i=0;i<buttons.length;i++){
        buttons[i].style.display="none";

    }
   
    let card=document.getElementById(name);
    card.children[1].style.display="block"
    card_joueur=kaf_joeur.find(elt => elt.nom === name);
    
    
    
    
}




function somme_cards(){
    let somme=0;
    for(let i=0;i<cards_selectionned.length;i++){
        somme+=cards_selectionned[i].valeur;
    }
    console.log("somme : "+somme);
    return somme;

}



async function cardClick(name) {
   
    cards_selectionned.push(hbout.find(elt => elt.nom === name));
    
    if (card_joueur.valeur === somme_cards()) {
        joueur_kle=true;
        
       

       
        for (let i = 0; i < cards_selectionned.length; i++) {
            animate_3_j_card(cards_selectionned[i].nom);
           
        }
        animate_3_j_card(card_joueur.nom);
      

        await pause(800);
    
        mekla_joueur.push(card_joueur);
    
        let index = kaf_joeur.indexOf(card_joueur);
        if (index !== -1) {
            kaf_joeur.splice(index, 1);
        }
    
        mekla_joueur = mekla_joueur.concat(cards_selectionned);
    
        for (let i = 0; i < cards_selectionned.length; i++) {
            let index = hbout.indexOf(cards_selectionned[i]);
            if (index !== -1) {
                hbout.splice(index, 1);
            }
        }
    
        cards_selectionned.splice(0, cards_selectionned.length);
    
        for (let i = 0; i < kaf_joeur.length; i++) {
            let card = document.getElementById(kaf_joeur[i].nom);
            if (card) {
                card.style.pointerEvents = "none";
                card.style.opacity = "0.5";
            }
        }
    
        for (let j = 0; j < hbout.length; j++) {
            let card = document.getElementById(hbout[j].nom);
            if (card) {
                card.style.pointerEvents = "none";
            }
        }

        afficher_hbout();
        jouer_machine();
    }
    
}


function jetter(id) {
    joueur_kle=false;
    let card = document.getElementById(id);

    if (card) {
        //card.style.display = "none";

        animate_4_m_card(id);


        
        let warka = kaf_joeur.find(elt => elt.nom === id);

        if (warka) {
            

            hbout.push(warka);

            let index = kaf_joeur.indexOf(warka);
            kaf_joeur.splice(index, 1);
            for (let i = 0; i < kaf_joeur.length; i++) {
                let card = document.getElementById(kaf_joeur[i].nom);
                if (card) {
                    card.style.pointerEvents = "none";
                    card.style.opacity = "0.5";
                }
            }
            for(let j=0;j<hbout.length;j++){
                let card = document.getElementById(hbout[j].nom);
                if (card) {
                    card.style.pointerEvents = "none";
                }
            }
            afficher_hbout();
            jouer_machine();
            
            

            

        } else {
            console.error("Card with specified id not found in kaf_joeur array.");
            
        }
    } else {
        console.error("Card element with specified id not found.");
    }
}




