
const postContainer = document.getElementById("container");

//---------------------- Sett inn bilde / logo -------------------------------

const postBilde1 = document.createElement("img");

postBilde1.id = "bilde1";
postBilde1.src = "image/prosent.png";
postBilde1.alt = "Bilde";

postContainer.appendChild(postBilde1);

//---------------------- Sett inn Title -------------------------------

const postTitle = document.createElement("h1");
postTitle.id = "title";
postTitle.textContent = "Beregning av prosent";
postTitle.classList.add("title");
postContainer.appendChild(postTitle);

//---------------------- Sett inn setning -------------------------------

const postsetning = document.createElement("h3");
postsetning.id = "setning";
postsetning.textContent = "Beregn hva varen vil koste etter rabatt";
postsetning.classList.add("setning");
postContainer.appendChild(postsetning);

//---------------------- Sett inn input -------------------------------

function creatProsent(pris, prosent) {

  const postPris = document.createElement("input");
  postPris.type = "number";
  postPris.id = "pris";
  postPris.placeholder = "Pris";
  postPris.value = pris;
  postPris.classList.add("pris");

  const postProsent = document.createElement("input");
  postProsent.type = "number";
  postProsent.id = "prosent";
  postProsent.placeholder = "Prosent";
  postProsent.value = prosent;
  postProsent.classList.add("prosent");

  postContainer.appendChild(postPris);
  postContainer.appendChild(postProsent);

//---------------------- Sett inn div / button -------------------------------

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("buttonContainer");

const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Beregn";
btn.classList.add("button");

const clearBtn = document.createElement("button");
clearBtn.type = "button";
clearBtn.textContent = "Fjern resultat";
clearBtn.classList.add("clearButton");

buttonContainer.appendChild(btn);
buttonContainer.appendChild(clearBtn);

postContainer.appendChild(buttonContainer);

//---------------------- Sett inn resultat -------------------------------

  const resultat = document.createElement("p");
  resultat.id = "resultatText";
  resultat.classList.add("resultatText");
  postContainer.appendChild(resultat);

//---------------------- Sett inn klikk funkjon som regne ut -------------------------------

  btn.addEventListener("click", function () {
    const pris = Number(postPris.value);
    const prosent = Number(postProsent.value);

    if (isNaN(pris) || pris <= 0 || isNaN(prosent) || prosent <= 0 ) {
      Swal.fire({
        title: "Advarsel!",
        width:300,
        text: "Du glemte å skrive inn pris eller prosent!",
        icon: "warning"
      });
    
      return;
    }

    const rabat = (pris * prosent) / 100;
    const result = pris - rabat;

    resultat.innerHTML = `
    Prisen er: <span>${pris.toFixed(2)} kr</span><br>
    Rabatten er: <span>${prosent} %</span><br><br>
    Prisen etter rabatt er: <span>${result.toFixed(2)} kr</span><br>
    Du sparer: <span>${rabat.toFixed(2)} kr</span>
`;

    postPris.value = "";
    postProsent.value = "";
    btn.disabled = true;
  });

//---------------------- Sett inn klikk / fjern -------------------------------

  clearBtn.addEventListener("click", function () {
    resultat.innerHTML = "";
    btn.disabled = false;
  });
}

creatProsent();
