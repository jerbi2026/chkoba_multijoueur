
function testez_mekla_machine() {
    kaf_machine = kaf_machine.sort((a, b) => b.prior - a.prior);

    let trouv = null;
    for (let i = 0; i < kaf_machine.length; i++) {
        trouv = hbout.find(elt => elt.valeur === kaf_machine[i].valeur);
        if (trouv) {
            return [ kaf_machine[i],trouv];
        }
    }

    return null;
}




function findAllSums(cards, targetSum, currentSum = 0, currentIndex = 0, currentCombination = []) {
    const allCombinations = []; 
    function exploreCombinations(cards, targetSum, currentSum, currentIndex, currentCombination) {
        if (currentSum > targetSum) {
            return;
        }

        if (currentSum === targetSum) {
            allCombinations.push([...currentCombination]); 
            return;
        }

        for (let i = currentIndex; i < cards.length; i++) {
            const card = cards[i];

            
            if (card.prior > 0 && currentSum + card.valeur > targetSum) {
                continue;
            }

            
            if (currentCombination.includes(card)) {
                continue;
            }

          
            currentCombination.push(card);

          
            exploreCombinations(cards, targetSum, currentSum + card.valeur, i, currentCombination);

            
            currentCombination.pop();
        }
    }

    exploreCombinations(cards, targetSum, currentSum, currentIndex, currentCombination);
    return allCombinations;
}



async function jouer_machine() {
    var card_mekla = testez_mekla_machine();
        if (card_mekla && card_mekla.length > 0) {
            machine_kle=true;
            let card_kaf_machine = document.getElementById(card_mekla[1].nom);
            mekla_machine.push(card_mekla[1]);
            let index = hbout.indexOf(card_mekla[1]);
            hbout.splice(index, 1);
            if (card_kaf_machine) {
               animate_4_m_card(card_mekla[1].nom);
                
            }
           

            let card_kaf_machine2 = document.getElementById(card_mekla[0].nom);
            let index2 = kaf_machine.indexOf(card_mekla[0]);
            mekla_machine.push(card_mekla[0]);
            kaf_machine.splice(index2, 1);
            if (card_kaf_machine2) {
                animate_4_m_card(card_mekla[0].nom);
                
            }
            await pause(800);

           

            

            for (let i = 0; i < kaf_joeur.length; i++) {
                let card = document.getElementById(kaf_joeur[i].nom);
                if (card) {
                    card.style.pointerEvents = "auto";
                    card.style.opacity = "1";
                }
            }

            for (let j = 0; j < hbout.length; j++) {
                let card = document.getElementById(hbout[j].nom);
                if (card) {
                    card.style.pointerEvents = "auto";
                }
            }

          

            
        }
        else{
            machine_kle=false;
            let jetter_card = document.getElementById(kaf_machine[kaf_machine.length - 1].nom);

            if (jetter_card) {
                animate_3_j_card(kaf_machine[kaf_machine.length - 1].nom);
                await pause(800)
            
              
                hbout.push(kaf_machine[kaf_machine.length - 1]);
                kaf_machine.pop();
                afficher_hbout();
             
            
                for (let i = 0; i < kaf_joeur.length; i++) {
                    let cardy = document.getElementById(kaf_joeur[i].nom);
                    if (cardy) {
                        cardy.style.pointerEvents = "auto";
                        cardy.style.opacity = "1";
                    }
                }
            
                for (let j = 0; j < hbout.length; j++) {
                    let cardy = document.getElementById(hbout[j].nom);
                    if (cardy) {
                        cardy.style.pointerEvents = "auto";
                    }
                }
            }
            
    
              
            /*hbout = hbout.sort((a, b) => a.prior - b.prior);
            kaf_machine = kaf_machine.sort((a, b) => a.prior - b.prior);

            var mekla = [];
            var  i;
            for ( i = 0; i < kaf_machine.length; i++) {
                mekla = findAllSums(hbout, kaf_machine[i].valeur);

                if (mekla != null && mekla.length>0) {
                    mekla = mekla.sort((a, b) => a.length - b.length);
                    console.log(mekla);

                    let mekla_louta = document.getElementById(kaf_machine[i].nom);
                    mekla_louta.style.transition = "opacity 1s";
                    mekla_louta.style.opacity = "0.5";

                    setTimeout(() => {
                        mekla_louta.style.display = "none";
                        mekla_louta.style.transition = "";
                        mekla_louta.style.opacity = "1";
                    }, 500);

                    kaf_machine.splice(i, 1);

                    for (let j = 0; j < mekla[0].length; j++) {
                        let card = document.getElementById(mekla[0][j].nom);

                        card.style.transition = "opacity 1s";
                        card.style.opacity = "0.5";

                        let index = hbout.indexOf(mekla[0][j]);
                        hbout.splice(index, 1);

                        setTimeout(() => {
                            card.style.display = "none";
                            card.style.transition = "";
                            card.style.opacity = "1";
                        }, 500);
                    }

                    tour_user = true;
    
                     
    
                    for (let i = 0; i < kaf_joeur.length; i++) {
                        let cardy = document.getElementById(kaf_joeur[i].nom);
                        if (cardy) {
                            cardy.style.pointerEvents = "auto";
                            cardy.style.opacity = "1";
                        }
                    }
    
                    for (let j = 0; j < hbout.length; j++) {
                        let cardy = document.getElementById(hbout[j].nom);
                        if (cardy) {
                            cardy.style.pointerEvents = "auto";
                        }
                    }
    
                   
                    break;
                }
                
                
            }
            if(i==kaf_machine.length){
                let jetter_card = document.getElementById(kaf_machine[kaf_machine.length-1].nom);
                jetter_card.style.transition = "opacity 1s";
                jetter_card.style.opacity = "0.5";

                setTimeout(() => {
                    jetter_card.style.display = "none";
                    jetter_card.style.transition = "";
                    jetter_card.style.opacity = "1";
                }, 500);
                let hboutContainer = document.querySelector(".card-container");
                hboutContainer.innerHTML += `
                <a href="#" id="${kaf_machine[kaf_machine.length-1].nom}" onclick="cardClick('${kaf_machine[kaf_machine.length-1].nom}')">
                    <div class="card" style="background: url(${kaf_machine[kaf_machine.length-1].image}); background-size: contain; background-position: center; background-repeat: no-repeat;">
                        <div class="card-content"></div>
                    </div>
                </a>`;
                
                hbout.push(kaf_machine[kaf_machine.length-1]);
                kaf_machine.splice(kaf_machine.length-1, 1);
                tour_user = true;
    
                     
    
                for (let i = 0; i < kaf_joeur.length; i++) {
                    let cardy = document.getElementById(kaf_joeur[i].nom);
                    if (cardy) {
                        cardy.style.pointerEvents = "auto";
                        cardy.style.opacity = "1";
                    }
                }
    
                for (let j = 0; j < hbout.length; j++) {
                    let cardy = document.getElementById(hbout[j].nom);
                    if (cardy) {
                        cardy.style.pointerEvents = "auto";
                    }
                }
    
              

                

            }*/
        }
        if(kaf_machine.length==0 && chkoba.length>0){
            awed_ejri();
            
        }
        if(kaf_machine.length==0 && chkoba.length==0){
            if(hbout.length>0){
                if(machine_kle==true){
                    for(let j=0;j<hbout.length;j++){
                        mekla_machine.push(hbout[j]);

                    }
                    animate_4_m(hbout);
                    await pause(1500);
                    
                   
                }
                else {
                    for(let j=0;j<hbout.length;j++){
                        mekla_joueur.push(hbout[j]);

                    }
                    animate_3_j(hbout);
                    await pause(1500);
                    
                    
                }
                hbout=[];
                afficher_hbout();
            }

           
            finir_jarya();
            await pause(800);
            console.log(mekla_joueur);
            console.log(mekla_machine);
            calcul_score();
        }

}
