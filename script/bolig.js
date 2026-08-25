const postContainer = document.getElementById("container");


const sokBox = document.createElement("div");
sokBox.id ="sokBox";
sokBox.classList.add("sokBox");


const sokInput = document.createElement("input");
sokInput.type = "number";
sokInput.id = "sokInput";
sokInput.placeholder = "Månedsnummer";
sokInput.value = "";
sokInput.classList.add("sokInput");
sokBox.appendChild(sokInput);

const sokBtn = document.createElement("button");
sokBtn.type = "button";
sokBtn.innerHTML = '<i class="fa fa-search" style="font-size:24px"></i>';

sokBtn.classList.add("sokKnappBtn");

sokBox.appendChild(sokBtn);

postContainer.appendChild(sokBox);

//---------------------- Sett inn bilde / logo -------------------------------

const boligBilde = document.createElement("img");

boligBilde.id = "bildet";
boligBilde.src = "image/loan.png";
boligBilde.alt = "Bilde";
boligBilde.classList.add("bildet");

postContainer.appendChild(boligBilde);

//---------------------- Sett inn Title -------------------------------

const boligTitle = document.createElement("h1");
boligTitle.id = "title";
boligTitle.textContent = "Boliglånskalkulator";
boligTitle.classList.add("title");
postContainer.appendChild(boligTitle);

//---------------------- Sett inn setning -------------------------------

const boligsetning = document.createElement("h3");
boligsetning.id = "setning";
boligsetning.textContent = "Beregn hva boliglånet vil koste deg";
boligsetning.classList.add("setning");
postContainer.appendChild(boligsetning);



//---------------------- Sett inn  3 input i div -------------------------------
const beregnInput = document.createElement("div");
beregnInput.id = "beregnInput";
beregnInput.classList.add("beregnInput");

const lonInput = document.createElement("input");
lonInput.type = "number";
lonInput.placeholder = "Lån";
lonInput.classList.add("boligInput");

const renteInput = document.createElement("input");
renteInput.type = "number";
renteInput.placeholder = "Rente";
renteInput.classList.add("boligInput");

const tidInput = document.createElement("input");
tidInput.type = "number";
tidInput.placeholder = "Løpetid";
tidInput.classList.add("boligInput");

beregnInput.append(lonInput, renteInput, tidInput);

postContainer.appendChild(beregnInput);



//---------------------- Sett inn  3 knapper i div ----------------------------

const knapper = document.createElement("div");
knapper.id = "knapper";
knapper.classList.add("knapper");

const beregnBtn = document.createElement("button");
beregnBtn.type = "button";
beregnBtn.textContent = "Beregn";
beregnBtn.classList.add("knappBtn");

const fjernBtn = document.createElement("button");
fjernBtn.type = "button";
fjernBtn.textContent = "Fjerne";
fjernBtn.classList.add("knappBtn");

const lukkeBtn = document.createElement("button");
lukkeBtn.type = "button";
lukkeBtn.textContent = "Lukke";
lukkeBtn.classList.add("knappBtn");

knapper.append(beregnBtn, fjernBtn, lukkeBtn);

postContainer.appendChild(knapper);


//---------------------- Aktiver Beregn ved endring ----------------------

lonInput.addEventListener("input", aktiverBeregn);
renteInput.addEventListener("input", aktiverBeregn);
tidInput.addEventListener("input", aktiverBeregn);

function aktiverBeregn() {
  beregnBtn.disabled = false;
  beregnBtn.textContent = "Beregn";
}

//---------------------- Sett inn  4 resultater i div ----------------------------

const infoBox = document.createElement("div");

infoBox.id = "resultaterBox";
infoBox.classList.add("resultaterBox");

const lanBelop = document.createElement("p");
lanBelop.id = "result1";
lanBelop.classList.add("result");

const rentekostnad = document.createElement("p");
rentekostnad.id = "result2";
rentekostnad.classList.add("result");

const lanMedRente = document.createElement("p");
lanMedRente.id = "result3";
lanMedRente.classList.add("result");

const effek_rente = document.createElement("p");
effek_rente.id = "result4";
effek_rente.classList.add("result");

infoBox.append(
    lanBelop,
    rentekostnad,
    lanMedRente,
    effek_rente
);

postContainer.appendChild(infoBox);

const informasjon = document.createElement("div");

informasjon.id = "informasjon";
informasjon.classList.add("informasjon");

document.body.appendChild(informasjon);



//----------------------------Table -----------------------------------
const tabel = document.createElement("table");
tabel.id = "tabel";

const tableHead = document.createElement("thead");
tableHead.id = "tableHead";

const headRow = document.createElement("tr");

const overskrifter = [
    "Måneder",
    "Lånebeløp",
    "Terminbeløp",
    "Rente",
    "Avdrag",
    "Restgjeld"
];

overskrifter.forEach((tekst) => {
    const th = document.createElement("th");
    th.textContent = tekst;
    headRow.appendChild(th);
});

tableHead.appendChild(headRow);
tabel.appendChild(tableHead);

const tBody = document.createElement("tbody");
tBody.id = "tBody";

tabel.appendChild(tBody);

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");

tableContainer.appendChild(tabel);
postContainer.appendChild(tableContainer);

beregnBtn.addEventListener("click", function () {

    const laan = Number(lonInput.value);
    const arRente = Number(renteInput.value);
    const ar = Number(tidInput.value);

    if (
        isNaN(laan) ||
        laan <= 0 ||
        isNaN(arRente) ||
        arRente < 0 ||
        isNaN(ar) ||
        ar <= 0
    ) {
        Swal.fire({
            title: "Advarsel!",
            width: 300,
            text: "Vennligst skriv inn gyldige positive tall.",
            icon: "warning"
        });

        return;
    }

    const manedRente = arRente / 100 / 12;
    const antallManed = ar * 12;

    const x = Math.pow(1 + manedRente, antallManed);

    const terminbelop =
        (laan * x * manedRente) / (x - 1);

    let gjenværendeSaldo = laan;

    let totalLaan = terminbelop * antallManed;
    let totalRente = totalLaan - laan;

    tBody.innerHTML = "";

    let totaltBetalt = 0;

    for (let i = 1; i <= antallManed; i++) {

        let renteBetaling =
            gjenværendeSaldo * manedRente;

        let hovedstolbetaling =
            terminbelop - renteBetaling;

        gjenværendeSaldo -= hovedstolbetaling;

        totaltBetalt += terminbelop;

        tBody.innerHTML += `
            <tr data-betalt="${totaltBetalt}">
                <td>${i}</td>
                <td>${laan.toLocaleString("nb-NO")}</td>
                <td>${terminbelop.toLocaleString("nb-NO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</td>
                <td>${renteBetaling.toLocaleString("nb-NO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</td>
                <td>${hovedstolbetaling.toLocaleString("nb-NO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</td>
                <td>${gjenværendeSaldo.toLocaleString("nb-NO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</td>
            </tr>
        `;
    }

    const effek_rente =
        ((1 + manedRente) ** 12 - 1) * 100;

    document.getElementById("result1").innerHTML =
        `Lånebeløp: <span class="red">
        ${laan.toLocaleString("nb-NO")} kr
        </span> med rente
        <span class="red">${arRente}%</span>
        over <span class="red">${ar}</span> år
        (<span class="red">${antallManed} måneder</span>).`;

    document.getElementById("result2").innerHTML =
        `Total rentekostnad:
        <span class="red">
        ${totalRente.toLocaleString("nb-NO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} kr
        </span>`;

    document.getElementById("result3").innerHTML =
        `Total lån inkludert rente:
        <span class="red">
        ${totalLaan.toLocaleString("nb-NO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} kr
        </span>`;

    document.getElementById("result4").innerHTML =
        `Effektive rente:
        <span class="red">
        ${effek_rente.toFixed(2)} %
        </span>`;

        this.disabled = true;
        this.innerHTML = "Beregnet";

  

    tableHead.style.display = "table-header-group";
});

//--------------------------------------Fjerne knappen --------------------------------

fjernBtn.addEventListener("click", () => {

  Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Dataene vil bli slettet!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, slett!",
    cancelButtonText: "Avbryt"
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        width: 300,
        title: "Slettet!",
        text: "Dataene er slettet.",
        icon: "success"
      }).then(() => {

        window.location.reload();

      });

    }

  });

});

lukkeBtn.addEventListener("click", () => {

  Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Du vil forlate siden!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, lukk!",
    cancelButtonText: "Avbryt"
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        width: 300,
        title: "Lukket!",
        text: "Du blir sendt til forsiden.",
        icon: "success"
      }).then(() => {

        window.top.location.href = "/index.html";

      });

    }

  });

});


//------------------------------ søke funksjon ----------------------------------

function sokMåned() {

  const sok = sokInput.value.trim();

  if (sok === "") {

    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Skriv inn månedsnummer.",
      icon: "warning"
    });

    return;
  }

  let funnet = false;

  // Fjern tidligere markering
  tBody
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("search-row"));

  for (let i = 0; i < tBody.rows.length; i++) {

    const row = tBody.rows[i];

    if (row.cells.length === 0) continue;

    const nummer = row.cells[0].textContent.trim();

    if (nummer === sok) {

      row.classList.add("search-row");

      if (!funnet) {

  const container = document.querySelector(".table-container");

  container.scrollTo({
    top: row.offsetTop - 50,
    behavior: "smooth"
  });

}

      funnet = true;
    }
  }

  if (!funnet) {

    Swal.fire({
      title: "Feil!",
      width: 300,
      text: "Ingen månedsnummer ble funnet.",
      icon: "error"
    });

  }

  sokInput.value = "";
}


//------------------------------ Søk knapp ----------------------------------

sokBtn.addEventListener("click", () => {
  sokMåned();
});


//------------------------------ Enter ----------------------------------

sokInput.addEventListener("keydown", function (e) {

  if (e.key === "Enter") {
    sokMåned();
  }

});


//------------------------------ Scroll ----------------------------------

function scrollToElement(element) {

  element.style.scrollMarginTop = "45px";

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


//------------------------------------------ Hover informasjon -------------------

tBody.addEventListener("mouseover", (e) => {

  const rad = e.target.closest("tr");

  if (!rad) return;

  const betalt = Number(rad.dataset.betalt);

  // استخراج رقم الشهر
  const manedNr = parseInt(
    rad.cells[0].textContent.replace(/\D/g, "")
  );

  // تحويل إلى år og måneder
  const ar = Math.floor(manedNr / 12);
  const resterendeManeder = manedNr % 12;

  let periode = "";

  if (ar > 0) {
    periode += `${ar} år`;
  }

  if (resterendeManeder > 0) {
    periode += (periode ? " og " : "") +
      `${resterendeManeder} måneder`;
  }

  if (manedNr < 12) {
    periode = `${manedNr} måneder`;
  }

  informasjon.innerHTML = `
    <strong>måneder: ${rad.cells[0].textContent}</strong><br>
    Tid: ${periode}<br><br>

    Betalt til nå:
    ${betalt.toLocaleString("nb-NO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} kr
    <br>

    Gjenstående gjeld:
    ${rad.cells[5].textContent}
  `;

  informasjon.style.display = "block";
});


tBody.addEventListener("mousemove", (e) => {

  informasjon.style.left = `${e.clientX + 15}px`;
  informasjon.style.top = `${e.clientY + 15}px`;

});


tBody.addEventListener("mouseleave", () => {

  informasjon.style.display = "none";

});


