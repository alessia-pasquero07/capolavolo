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
let boolAssoAlBanco;
let bj = false;
let _carteBanco = 0;

window.addEventListener("load", function () {
    // Chiamata alla funzione per richiedere i soldi
    soldiNelPortafoglio = richiediSoldi("Quanti soldi hai nel portafoglio?");
    console.log("portafoglio " + soldiNelPortafoglio);
    richiediPuntata();//fai la domanda di quanto vuoi puntare
    //cntMano = 0;
    // Qui si può proseguire con il gioco o altre logiche
    console.log(`Hai puntato: ${puntata}`);
    let aus_puntata = puntata;
    gettoni(puntata);
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
    document.getElementById("esito").innerText = "";
});


function InizializzaSecondaCarta(div_pers, p_Punti) {
    num_carta = generaNum_Carta();
    num_seconda_carta = num_carta;
    simbolo_carta = generaSimbolo_carta();
    aus = generaStringSimbolo(simbolo_carta);
    if (num_carta >= 2 && num_carta <= 9) {
        boolassicurazione = true;
        bj = false;
    }
    setTimeout(() => {
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

    let num_carta = generaNum_Carta();
    let simbolo_carta = generaSimbolo_carta();
    let aus = generaStringSimbolo(simbolo_carta);

    // Controlla se img è null
    if (!img) {
        console.error("Immagine 'primaCartaBanco' non trovata.");
        return;
    }
    _carteBanco++;

    img.src = `img/${num_carta} ${aus}.jpg`;
    img.className = "carta_banco";

    //"img/1 cuori.jpg"
    if (num_carta >= 10) {
        cntCarteBanco = 10;
    }
    else if (num_carta === 1) {
        cntCarteBanco = 11;
        boolAssoAlBanco = true;
        boolassicurazione = true;
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
    num_prima_carta = num_carta;
    if (num_carta >= 10) {
        cntCartePersona = 10;
        boolassicurazione = false;
    }

    else if (num_carta === 1) {
        cntCartePersona = richiediValAssi("Il tuo asso vuoi che valga 1 o 11?");
        console.log(cntCartePersona)
        boolassicurazione = false;
    }
    else
        cntCartePersona = num_carta;
}

function inizializzaPunti(p_Punti, testa, divPunti, p_Punti_banco) {
    if (!p_Punti || !testa || !divPunti) {
        console.error("Uno o più parametri sono undefined");
        return; // Esci dalla funzione se uno dei parametri è undefined
    }

    p_Punti.innerText = "il Giocatore: " + cntCartePersona;
    p_Punti_banco.innerText = "il Banco: " + cntCarteBanco;
}

function gettoni(puntata) {
    let gettoni = document.getElementById("gettoni");
    if (puntata - 100 === 0) {
        let img100 = document.createElement("img");
        img100.id = "img100";
        img100.className = "gettone";
        img100.src = "img/100 gettone.jpg";
        gettoni.appendChild(img100);
        puntata = puntata - 100;
    }

    if (puntata - 50 >= 0) {
        let img50 = document.createElement("img");
        img50.id = "img50";
        img50.src = "img/50 gettone.jpg";
        img50.className = "gettone";
        gettoni.appendChild(img50);
        while (puntata >= 50)
            puntata = puntata - 50;
    }

    if (puntata - 20 >= 0) {
        let img20 = document.createElement("img");
        img20.id = "img20";
        img20.src = "img/20 gettone .jpg";
        img20.className = "gettone";
        gettoni.appendChild(img20);
        while (puntata >= 20)
            puntata = puntata - 20;
    }
    if (puntata - 10 >= 0) {
        let img10 = document.createElement("img");
        img10.id = "img10";
        img10.src = "img/10 gettone.jpg";
        img10.className = "gettone";
        gettoni.appendChild(img10);
        while (puntata >= 10)
            puntata = puntata - 10;
    }
    if (puntata - 5 >= 0) {
        let img5 = document.createElement("img");
        img5.id = "img5";
        img5.src = "img/5 gettone.jpg";
        img5.className = "gettone";
        gettoni.appendChild(img5);
        while (puntata >= 5)
            puntata = puntata - 5;
    }
    if (puntata - 1 >= 0) {
        let img1 = document.createElement("img");
        img1.id = "img1";
        img1.src = "img/1 gettone.jpg";
        img1.className = "gettone";
        gettoni.appendChild(img1);
        puntata = puntata - 1;
    }
}

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
    return simbolo_carta;
}

function generaNum_Carta() {
    let numCarta = Math.floor(Math.random() * (14 - 1)) + 1;
    return numCarta
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}