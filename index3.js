let cntCartePersona;
let cntCarteBanco;
let soldiNelPortafoglio;
let puntata;
const DIM = 18;
//let cntMano;
let num_seconda_carta;
let num_prima_carta;
let assicurazione = 0;
let boolassicurazione;
//se clicco l'immagine di sfondo del body smettendo di giocare non mi refrescia la pagina quindi ritornare a giocare. perchè?
window.addEventListener("load", function () {
    // Chiamata alla funzione per richiedere i soldi
    soldiNelPortafoglio = richiediSoldi("Quanti soldi hai nel portafoglio?");
    console.log("portafoglio " + soldiNelPortafoglio);
    richiediPuntata();//fai la domanda di quanto vuoi puntare
    //cntMano = 0;
    // Qui si può proseguire con il gioco o altre logiche
    console.log(`Hai puntato: ${puntata}`);
    let aus_puntata = puntata;
    console.log(aus_puntata);
    gettoni(aus_puntata);
    console.log(aus_puntata);
    console.log(puntata);

    let div_pers = document.getElementById("persona");
    let p_Punti = document.createElement("p");
    let testa = document.getElementById("header");
    let img = document.createElement("img");
    img.id = "primaCartaBanco"
    let img1pers = document.createElement("img");
    img1pers.id = "primaCartaPersona";
    let divPunti = document.createElement("div");
    divPunti.id = "divPunti";
    let p_Punti_banco = document.createElement("p");
    p_Punti.id = "giocatorePunti";
    p_Punti_banco.id = "bancoPunti";
    inizializzaBancoEPrimacarta(div_pers, img, img1pers);
    InizializzaSecondaCarta(div_pers, p_Punti);//aspetta 
    inizializzaPunti(p_Punti, testa, divPunti, p_Punti_banco);
    divPunti.appendChild(p_Punti);
    divPunti.appendChild(p_Punti_banco);
    testa.appendChild(divPunti);
    let portafoglio = document.createElement("p");
    portafoglio.id = "portafoglio";
    portafoglio.innerText = `il tuo portafoglio ha: ${soldiNelPortafoglio}€`;
    testa.appendChild(portafoglio);
    //cntMano++;
});

function inizializzaPunti(p_Punti, testa, divPunti, p_Punti_banco) {
    console.log("p_Punti:", p_Punti);
    console.log("testa:", testa);
    console.log("divPunti:", divPunti);

    if (!p_Punti || !testa || !divPunti) {
        console.error("Uno o più parametri sono undefined");
        return; // Esci dalla funzione se uno dei parametri è undefined
    }

    p_Punti.innerText = "il Giocatore: " + cntCartePersona;
    p_Punti_banco.innerText = "il Banco: " + cntCarteBanco;
}

/*INIZIALIZZAZIONI*/
function InizializzaSecondaCarta(div_pers, p_Punti) {
    console.log("Inizio attesa");
    num_carta = generaNum_Carta();
    num_seconda_carta = num_carta;
    console.log("seconda carta: " + num_seconda_carta);
    simbolo_carta = generaSimbolo_carta();
    aus = generaStringSimbolo(simbolo_carta);
    setTimeout(() => {//scrivo dentro quello che voglio fare dopo 2 secondi
        console.log("2 secondi sono passati");
        let img2pers = document.createElement("img");
        img2pers.src = `img/${num_carta} ${aus}.jpg`;
        img2pers.className = "carta_persona";
        img2pers.id = "secondaCarta";
        div_pers.appendChild(img2pers);
        punteggio(num_carta);
        p_Punti.innerText = "il Giocatore: " + cntCartePersona;
        btnSceltaFermati();
    }, 2000);
}

function inizializzaBancoEPrimacarta(div_pers, img, img1pers) {
    let div_maziere = document.getElementById("maziere");

    if (!div_maziere) {
        console.error("Elemento 'maziere' non trovato nel DOM.");
        return;
    }

    let num_carta = 1;
    let simbolo_carta = generaSimbolo_carta();
    let aus = generaStringSimbolo(simbolo_carta);

    // Controlla se img è null
    if (!img) {
        console.error("Immagine 'primaCartaBanco' non trovata.");
        return;
    }

    img.src = `img/${num_carta} ${aus}.jpg`;
    img.className = "carta_banco";

    //"img/1 cuori.jpg"
    if (num_carta >= 10) {
        cntCarteBanco = 10;
    }
    else if (num_carta === 1) {
        cntCarteBanco = 11;
        richiediAssicurazione();
    }
    else
        cntCarteBanco = num_carta;
    div_maziere.appendChild(img);
    num_carta = generaNum_Carta();
    simbolo_carta = generaSimbolo_carta();
    aus = generaStringSimbolo(simbolo_carta);
    img1pers.src = `img/${num_carta} ${aus}.jpg`;
    img1pers.className = "carta_persona";
    div_pers.appendChild(img1pers);
    if (num_carta >= 10)
        cntCartePersona = 10;
    else if (num_carta === 1) {
        cntCartePersona = richiediValAssi("Il tuo asso vuoi che valga 1 o 11?");
        num_prima_carta = cntCartePersona;
    }
    else
        cntCartePersona = num_carta;
    console.log("prima carta: " + num_prima_carta);
}

/*RICHIESTE */

function richiediSoldi(str) {
    let soldi = prompt(str);

    // Verifica se l'input è un numero
    if (soldi === "" || isNaN(soldi) || Number(soldi) < 0) {
        alert("Devi inserire un numero!");
        return richiediSoldi(); // Richiama la funzione per riprovare
    }

    return Number(soldi); // Restituisce il valore inserito fai attenzione a convertirlo in numero se no non funziona
}

function richiediPuntata() {
    do {
        puntata = richiediSoldi("Quanto vuoi puntare?");
        // Verifica se la puntata è valida
        if (puntata < 1 || puntata > 100) {
            console.log("La puntata deve essere compresa tra 1 e 100.");
        } else if (puntata > soldiNelPortafoglio) {
            console.log("Non hai abbastanza soldi nel portafoglio.");
        }
    } while (puntata < 1 || puntata > 100 || puntata > soldiNelPortafoglio);
}

function richiediValAssi(str) {
    let asso;
    do {
        asso = prompt(str);
    } while (asso != 1 && asso != 11);

    return Number(asso); // Restituisci il valore scelto dall'utente
}

function richiediAssicurazione() {
    const risposta = confirm("Abbiamo pescato un asso come carta del banco, Vuoi fare l'assicurazione?");
    if (risposta) {
        alert("Hai scelto di fare l'assicurazione.");
        // Qui puoi aggiungere il codice per gestire la scelta dell'assicurazione
        assicurazione = puntata / 2;
        console.log("ecco la tua assicurazione: " + assicurazione);
        boolassicurazione = true;

    } else {
        alert("Hai scelto di non fare l'assicurazione.");
        // Qui puoi gestire il caso in cui l'utente non voglia l'assicurazione
    }
}

/*GETTONI */
function gettoni(puntata) {
    let gettoni = document.getElementById("gettoni");
    if (puntata - 100 === 0) {
        let img100 = document.createElement("img");
        img100.id = "img100";
        img100.className = "gettone";
        img100.src = "img/100 gettone.jpg";
        gettoni.appendChild(img100);
        puntata = puntata - 100;
        console.log(puntata);
    }

    if (puntata - 50 >= 0) {
        let img50 = document.createElement("img");
        img50.id = "img50";
        img50.src = "img/50 gettone.jpg";
        img50.className = "gettone";
        gettoni.appendChild(img50);
        while (puntata >= 50)
            puntata = puntata - 50;
        console.log(puntata);
    }

    if (puntata - 20 >= 0) {
        let img20 = document.createElement("img");
        img20.id = "img20";
        img20.src = "img/20 gettone .jpg";
        img20.className = "gettone";
        gettoni.appendChild(img20);
        while (puntata >= 20)
            puntata = puntata - 20;
        console.log(puntata);
    }
    if (puntata - 10 >= 0) {
        let img10 = document.createElement("img");
        img10.id = "img10";
        img10.src = "img/10 gettone.jpg";
        img10.className = "gettone";
        gettoni.appendChild(img10);
        while (puntata >= 10)
            puntata = puntata - 10;
        console.log(puntata);
    }
    if (puntata - 5 >= 0) {
        let img5 = document.createElement("img");
        img5.id = "img5";
        img5.src = "img/5 gettone.jpg";
        img5.className = "gettone";
        gettoni.appendChild(img5);
        while (puntata >= 5)
            puntata = puntata - 5;
        console.log(puntata);
    }
    if (puntata - 1 >= 0) {
        let img1 = document.createElement("img");
        img1.id = "img1";
        img1.src = "img/1 gettone.jpg";
        img1.className = "gettone";
        gettoni.appendChild(img1);
        puntata = puntata - 1;
        console.log(puntata);
    }
}

/*PUNTEGGIO E PORTAFOGLIO*/

function punteggio(num_carta) {//persona
    let btnAvanti = document.getElementById("avanti");
    let btnStop = document.getElementById("stop");
    let divFermoONo = document.getElementById("cosaFaccio");
    let vinto;//bool
    let bj;//bool
    // Supponiamo che num_carta sia il valore della carta attuale
    // Uniamo la logica di cntCartePersona qui
    if (num_carta >= 10) {
        cntCartePersona += 10;
    } else if (num_carta === 1) {
        cntCartePersona += richiediValAssi("Il tuo asso vuoi che valga 1 o 11?");
    } else {
        cntCartePersona += num_carta;
    }
    if (cntCartePersona > 21) {
        if (divFermoONo.contains(btnAvanti) || divFermoONo.contains(btnStop)) {
            if (btnAvanti != null) btnAvanti.remove();
            else return;
            if (btnStop != null) btnStop.remove();
            else return;
            console.log("hai perso");
            aggiornaPortafoglio(vinto = false, bj = false);
        }
    }
    else {
        if (cntCartePersona === 21) {
            if (num_prima_carta === 11 || (num_carta === 10 || num_carta === 11 || num_carta === 12 || num_carta === 13)) {
                console.log("blackjack!");
                aggiornaPortafoglio(vinto = true, bj = true);
                if (btnAvanti != null) btnAvanti.remove();
                else return;
                if (btnStop != null) btnStop.remove();
                else return;
            } else if (num_seconda_carta === 1 || (num_carta === 10 || num_carta === 11 || num_carta === 12 || num_carta === 13)) {
                console.log("blackjack!");
                aggiornaPortafoglio(vinto = true, bj = true);
                if (btnAvanti != null) btnAvanti.remove();
                else return;
                if (btnStop != null) btnStop.remove();
                else return;
            }
            else {
                console.log("hai vinto");
                aggiornaPortafoglio(vinto = true, bj = false);
                if (btnAvanti != null) btnAvanti.remove();
                else return;
                if (btnStop != null) btnStop.remove();
                else return;
            }
        }

    }
}


function punteggioBanco(num_carta) {
    // Supponiamo che num_carta sia il valore della carta attuale
    if (num_carta >= 10) {
        cntCarteBanco += 10;
    } else {
        cntCarteBanco += num_carta;
    }
    let vittoria;//bool
    let p_Punti_banco = document.getElementById("bancoPunti");
    p_Punti_banco.innerText = "il Banco: " + cntCarteBanco;

    if (cntCarteBanco > 21) {
        console.log("ha perso");
        aggiornaPortafoglio(vittoria = true)
    } else if (cntCarteBanco === 21) {
        console.log("ha vinto");
        aggiornaPortafoglio(vinto = false);
    } else {
        console.log("prosegui banco");
        // Logica per decidere se il banco deve pescare un'altra carta
        if (cntCarteBanco < 16) {
            console.log("Il banco pesca un'altra carta.");
            generaCartabanco();
        } else {
            console.log("Il banco non può pescare altre carte.");
            if (cntCarteBanco > cntCartePersona) {
                aggiornaPortafoglio(vittoria = false);
            }
            else if (cntCarteBanco < cntCartePersona) {
                aggiornaPortafoglio(vittoria = true);
            } else if (cntCarteBanco === cntCartePersona) {
                aggiornaPortafoglio(vittoria = false);
            }
        }
    }
}

function aggiornaPortafoglio(vinto, bj) {
    console.log(puntata);
    console.log(vinto);
    console.log(soldiNelPortafoglio);
    if (!vinto) {
        soldiNelPortafoglio -= puntata;
    } else {
        soldiNelPortafoglio += puntata;
        //console.log("PROVA2 "+soldiNelPortafoglio);
    }

    let gettoni = document.querySelectorAll(".gettone"); // Assumendo che le immagini dei gettoni abbiano la classe "gettone"
    gettoni.forEach(gettone => {
        gettone.remove(); // Rimuove l'elemento dal DOM
    });
    let puntatamezza = puntata / 2;
    let puntataBJ = puntata + puntatamezza;
    if (bj) {
        soldiNelPortafoglio += puntataBJ;
        soldiNelPortafoglio -= puntata;
    }
    let portafoglio = document.getElementById("portafoglio");
    let testa = document.getElementById("header");
    portafoglio.innerText = `il tuo portafoglio ha: ${soldiNelPortafoglio}€`
    testa.appendChild(portafoglio);
    if (soldiNelPortafoglio > 0) {
        setTimeout(() => {
            let cosaFaccio = document.getElementById("cosaFaccio");

            // Crea e aggiungi il bottone "Gioca un'altra mano"
            let btnMano = document.createElement("button");
            btnMano.innerHTML = "Gioca un'altra mano";
            btnMano.id = "mano";
            btnMano.className="bottone";
            cosaFaccio.appendChild(btnMano);
            btnMano.addEventListener("click", nuovaPartita); // Aggiungi l'evento qui

            // Crea e aggiungi il bottone "Smetti di giocare"
            let btnSmettiDiGiocare = document.createElement("button");
            btnSmettiDiGiocare.innerHTML = "Smetti di giocare";
            btnSmettiDiGiocare.id = "smetti_di_giocare";
            btnSmettiDiGiocare.className="bottone";
            cosaFaccio.appendChild(btnSmettiDiGiocare);
            btnSmettiDiGiocare.addEventListener("click", smettiDiGiocare); // Aggiungi l'evento qui
        }, 1000);
    } else {
        alert("mi dispiace, non hai più soldi da puntare nel tuo portafoglio");
    }
}

/*SMETTI DI GIOCARE O CONTINUA A GIOCARE */
function smettiDiGiocare() {
    let divPunti = document.getElementById("divPunti");
    let pPortafoglio = document.getElementById("portafoglio");
    let divBancone = document.getElementById("bancone");
    let divGettoni = document.getElementById("gettoni");
    let divBtnScelte = document.getElementById("cosaFaccio");
    divPunti.remove();
    pPortafoglio.remove();
    divBancone.remove();
    divGettoni.remove();
    divBtnScelte.remove();
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundImage = "url('img/bodyImg.jfif')";
    body.style.backgroundSize = "cover"; // Opzionale: adatta l'immagine per coprire l'intero body
    body.style.backgroundPosition = "center"; // Opzionale: centra l'immagine
    // Crea un elemento <a>
    let a = document.createElement("a");
    a.href = "#"; // Imposta il link che desideri
    a.style.position = "absolute"; // Posiziona l'elemento in modo assoluto
    a.style.top = "0"; // Inizia dall'alto
    a.style.left = "0"; // Inizia da sinistra
    a.style.width = "100%"; // Larghezza al 100%
    a.style.height = "100%"; // Altezza al 100%
    a.style.display = "block"; // Rende l'elemento un blocco per occupare tutto lo spazio
    a.style.zIndex = "1000"; // Assicurati che il link sia sopra agli altri elementi

    // Aggiungi l'elemento <a> al body
    body.appendChild(a);
}
    function nuovaPartita() {
        console.log("hai cliccato il bottone nuova mano");
        let btnMano = document.getElementById("mano");
        let stop = document.getElementById("smetti_di_giocare")
        // Rimuovere il pulsante cliccato
        if (btnMano != null) btnMano.remove();
        else return;
        if (stop != null) stop.remove();
        else return;
        // btnMano.remove();
        // Richiedere la puntata
        richiediPuntata();

        // Rimuovere le immagini con classe "carta_banco" e "carta_persona"
        let carteBanco = document.querySelectorAll('.carta_banco');
        let cartePersona = document.querySelectorAll('.carta_persona');

        carteBanco.forEach(carta => carta.remove());
        cartePersona.forEach(carta => carta.remove());

        let div_pers = document.getElementById("persona");
        let p_Punti_banco = document.getElementById("bancoPunti");
        let p_Punti = document.getElementById("giocatorePunti");
        let testa = document.getElementById("header");
        let img = document.createElement("img");
        img.id = "primaCartaBanco"
        let img1pers = document.createElement("img");
        img1pers.id = "primaCartaPersona"
        inizializzaBancoEPrimacarta(div_pers, img, img1pers);
        InizializzaSecondaCarta(div_pers, p_Punti);//aspetta 
        let divPunti = document.getElementById("divPunti");
        inizializzaPunti(p_Punti, testa, divPunti, p_Punti_banco);
        // Creare l'immagine retro_carta e aggiungerla al div "banco" se non esiste già
        let divBanco = document.getElementById("banco");
        let retroCarta = document.getElementById("retro_carta");

        // Controlla se retroCarta esiste già
        if (!retroCarta) {
            retroCarta = document.createElement("img");
            retroCarta.id = "retro_carta";
            retroCarta.src = "img/retro.jpg";
            retroCarta.alt = "";
            // Aggiungere retroCarta dentro il div "banco"
            divBanco.appendChild(retroCarta);
        }
        let aus_puntata = puntata;
        console.log(aus_puntata);
        gettoni(aus_puntata);
    }

    function btnSceltaFermati() {
        let divFermoONo = document.getElementById("cosaFaccio");

        // Crea il bottone "fermati"
        let btnStop = document.createElement("button");
        btnStop.textContent = "fermati";
        btnStop.id = "stop";
        btnStop.className="bottone";
        divFermoONo.appendChild(btnStop);

        // Crea il bottone "Richiedi un'altra carta"
        let btnAvanti = document.createElement("button");
        btnAvanti.textContent = "Richiedi un'altra carta";
        btnAvanti.id = "avanti";
        btnAvanti.className="bottone";
        divFermoONo.appendChild(btnAvanti);

        // Event listener per il bottone "fermti"
        btnStop.addEventListener("click", function () {
            // Rimuovi entrambi i bottoni
            divFermoONo.removeChild(btnStop);
            divFermoONo.removeChild(btnAvanti);
            setTimeout(() => {
                // Inizia il gioco
                iniziaGioco();
            }, 1000);

        });

        // Event listener per il bottone "Richiedi un'altra carta"
        btnAvanti.addEventListener("click", function () {
            // Logica per prendere un'altra carta
            prendiAltraCarta();
        });
    }

    function iniziaGioco() {
        let num_carta = generaNum_Carta();
        let simbolo_carta = generaSimbolo_carta();
        let aus = generaStringSimbolo(simbolo_carta);
        console.log("Il gioco è iniziato!");
        let vittoria;
        let newcarta = document.getElementById("retro_carta");
        newcarta.src = `img/${num_carta} ${aus}.jpg`;
        newcarta.className = "carta_banco";
        if ((num_carta == 10 || num_carta == 11 || num_carta == 12 || num_carta == 13) || boolassicurazione) {//se fa black jack allora paga solo l'assicurazione
            soldiNelPortafoglio += assicurazione;
        }
        else {//altrimenti l'assicurazione viene persa e paga normalmente
            assicurazione = 0;
            //console.log("PROVA "+assicurazione)
            aggiornaPortafoglio(vittoria = true);
        }
        // Use the existing ID
        let newIdDiv = document.getElementById("banco"); // Keep using this ID

        // Update the points
        punteggioBanco(num_carta, newIdDiv);
        let p_Punti_banco = document.getElementById("bancoPunti");
        p_Punti_banco.innerText = "il Banco: " + cntCarteBanco;
    }

    /*PESCA ANCORA*/
    function prendiAltraCarta() {
        let div_pers = document.getElementById("persona");
        // Logica per prendere un'altra carta
        num_carta = generaNum_Carta();
        simbolo_carta = generaSimbolo_carta();
        aus = generaStringSimbolo(simbolo_carta);
        let imgipers = document.createElement("img");
        imgipers.src = `img/${num_carta} ${aus}.jpg`;
        imgipers.className = "carta_persona";
        div_pers.appendChild(imgipers);
        punteggio(num_carta);
        let p_Punti = document.getElementById("giocatorePunti");
        p_Punti.innerText = "il Giocatore: " + cntCartePersona;
    }

    /*GENERATORE */

    function generaCartabanco() {
        let num_carta = generaNum_Carta();
        let simbolo_carta = generaSimbolo_carta();
        let aus = generaStringSimbolo(simbolo_carta);

        let img = document.createElement("img");
        img.src = `img/${num_carta} ${aus}.jpg`;
        img.className = "carta_banco";

        let newIdDiv = document.getElementById("banco");
        newIdDiv.appendChild(img);

        // Passa il valore della carta al punteggio
        punteggioBanco(num_carta);
    }

    function generaStringSimbolo(simbolo_carta) {
        let aus;
        switch (simbolo_carta) {
            case 1:
                aus = "cuori";
                break;
            case 2:
                aus = "picche";
                break;
            case 3:
                aus = "quadri";
                break;
            case 4:
                aus = "fiori";
                break;
            default:
                aus = "simbolo non valido"; // Aggiunta di un caso di default per gestione errori
                break;
        }

        return aus;
    }

    function generaSimbolo_carta() {
        let simbolo_carta = random(1, 5);
        console.log(simbolo_carta);
        return simbolo_carta;
    }

    function generaNum_Carta() {
        let numCarta = Math.floor(Math.random() * (14 - 1)) + 1;
        console.log(numCarta);
        return numCarta
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
