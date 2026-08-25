const postContainer = document.getElementById("container");



const kundesSokBox = document.createElement("div");
kundesSokBox.id ="sokBox";


const kundeSokInput = document.createElement("input");
kundeSokInput.type = "text";
kundeSokInput.id = "sokInput";
kundeSokInput.placeholder = "Etternavn";
kundeSokInput.value = "";
kundeSokInput.classList.add("sokInput");

//----------------------------select option --------------------

const sokeSelect = document.createElement("select");

sokeSelect.id = "sokeType";
sokeSelect.classList.add("sokInput");

sokeSelect.innerHTML = `
  <option value="etternavn">Etternavn</option>
  <option value="telefon">Telefon</option>
  <option value="fornavn">Fornavn</option>
  <option value="alle">Hele navnet</option>
`;


//---------------------------- Knapper -------------------------

const kundeSokBtn = document.createElement("button");
kundeSokBtn.type = "button";
kundeSokBtn.textContent ="Søk";
kundeSokBtn.classList.add("skattKnappBtn");

kundesSokBox.append(kundeSokInput,sokeSelect,  kundeSokBtn);

postContainer.appendChild(kundesSokBox);

//---------------------- Sett inn bilde / logo -------------------------------

const skattBilde = document.createElement("img");

skattBilde.src = "image/skatt_logo.png";
skattBilde.alt = "Bilde";
skattBilde.classList.add("bildet");

postContainer.appendChild(skattBilde);

//---------------------- Sett inn Title -------------------------------

const skattTitle = document.createElement("h1");
skattTitle.id = "title";
skattTitle.textContent = "Skattekalkulator";
postContainer.appendChild(skattTitle);

//---------------------- Sett inn setning -------------------------------

const skattSetning = document.createElement("h3");
skattSetning.id = "setning";
skattSetning.textContent = "Oversikt over din skatt";
postContainer.appendChild(skattSetning);



//---------------------- Sett inn  4 input i div -------------------------------
const skattBeregnInput = document.createElement("div");
skattBeregnInput.id = "skattBeregnInput";

const navnInput = document.createElement("input");
navnInput.type = "text";
navnInput.placeholder = "Navn";
navnInput.classList.add("skattInput");


const skattLonInput = document.createElement("input");
skattLonInput.type = "number";
skattLonInput.placeholder = "Lønn";
skattLonInput.classList.add("skattInput");


const skattProsentInput = document.createElement("input");
skattProsentInput.type = "number";
skattProsentInput.min = "0";
skattProsentInput.max = "100";
skattProsentInput.placeholder = "Skatt %";
skattProsentInput.classList.add("skattInput");


const teleInput = document.createElement("input");
teleInput.type = "number";
teleInput.placeholder = "Telefon";
teleInput.classList.add("skattInput");

let radSomRedigeres = null;

skattBeregnInput.append(navnInput, skattLonInput, skattProsentInput, teleInput);

postContainer.appendChild(skattBeregnInput);

//---------------------- Sett inn  3 knapper i div ----------------------------

const skattKnapper = document.createElement("div");
skattKnapper.classList.add("knapper");

const skattBeregnBtn = document.createElement("button");
skattBeregnBtn.type = "button";
skattBeregnBtn.textContent = "Regne ut";
skattBeregnBtn.classList.add("skattKnappBtn");

const lagreEndringBtn = document.createElement("button");
lagreEndringBtn.type = "button";
lagreEndringBtn.textContent ="Endre";
lagreEndringBtn.classList.add("skattKnappBtn");

const lukkeBtnSkatt = document.createElement("button");
lukkeBtnSkatt.type = "button";
lukkeBtnSkatt.textContent = "Lukke";
lukkeBtnSkatt.classList.add("skattKnappBtn");

skattKnapper.append(skattBeregnBtn, lagreEndringBtn, lukkeBtnSkatt);
postContainer.appendChild(skattKnapper);




//----------------------------------------------------------------------------

const tabel = document.createElement("table");
tabel.id = "tabel";

const tableHead = document.createElement("thead");
tableHead.id = "tableHead";

const headRow = document.createElement("tr");

const overskrifter = [
    "Navn",
    "Bruttolønn",
    "Skatt",
    "Skattetrekk",
    "Nettolønn",
    "Telefon",
    "Oppdater"
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

const tablekroppen = document.createElement("tbody");

tablekroppen.id = "tablekroppen";

tabel.appendChild(tBody);

const tableContainer = document.createElement("div");
tableContainer.classList.add("table-container");

tableContainer.appendChild(tabel);
postContainer.appendChild(tableContainer);

skattBeregnBtn.addEventListener("click", function () {

    const nom = navnInput.value
  .trim()
  .split(/\s+/)
  .map(word =>
    word.charAt(0).toUpperCase() +
    word.slice(1).toLowerCase()
  )
  .join(" ");

const lonnVerdi = Number(skattLonInput.value);
const skattProsent = Number(skattProsentInput.value);
const tlf = teleInput.value.trim();

  //--------------------------------------------------------------
 function skatteIntekt(lonn, prosent) {
  return (lonn * prosent) / 100;
}

if (
  nom === "" ||
  tlf === "" ||
  isNaN(lonnVerdi) ||
  isNaN(skattProsent) ||
  lonnVerdi <= 0 ||
  skattProsent <= 0
) {
  Swal.fire({
    title: "Advarsel!",
    width: 300,
    text: "Fyll inn gyldige tall.",
    icon: "warning"
  });
  return;
}

if (skattProsent > 100) {

  Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Skatt må være mindre enn 100 %",
      icon: "warning"
      });

  /* alert("Skatt må være mindre enn 100 %"); */
  return;
}


const skatten = Math.round(skatteIntekt(lonnVerdi, skattProsent));

// Lønn etter skatt i en vanlig måned
const lonnEtterSkatte = Math.round(lonnVerdi - skatten);

// Årlig skatt: 11 hele måneder + 1 måned halv skatt
const arligSkatt = Math.round((skatten * 11) + (skatten / 2));

// Årsinntekt etter skatt
const arligNetto = Math.round((lonnVerdi * 12) - arligSkatt);

//Årsinntekt før skatt
const arligBrutto = Math.round(lonnVerdi * 12);

  //-------------------------------------------------------------- Å formatere / skrive lønn eller resultat nummer i norsk måte ------

  const formatertArligBrutto = arligBrutto.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertArligNetto = arligNetto.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertSkatt = (-skatten).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertLonn = lonnEtterSkatte.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertArligSkatt = (-arligSkatt).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatertPris = lonnVerdi.toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  //------------------------------------------------------- Tabel ---------------------------------------------------------------------------

  tBody.innerHTML += `
<tr>
    <td><span>${nom}</span></td>
    <td><span >${formatertPris} kr</span></td>
    <td><span >${skattProsent} %</span></td>
    <td><span >${formatertSkatt} kr</span></td>
    <td><span >${formatertLonn} kr</span></td>

    <td><span >${tlf}</span></td>
    <td>
    <button class="edit-btn" onclick="redigerRad(this)">
        Rediger
    </button>
        <button class="remove-btn" onclick="slettRad(this)">
            Slette
        </button>
    </td>
</tr>`;
//------------------- Lagre data direkt til local storage
localStorage.setItem("skattTabell", tBody.innerHTML);
  
navnInput.value = "";
  skattLonInput.value = "";
  skattProsentInput.value = "";
  teleInput.value = "";

  navnInput.focus();// Markøren går tilbake til navnefeltet

});

lagreEndringBtn.addEventListener("click", lagreEndring);
function lagreData() {
  
  if (tBody.rows.length === 0) {

    Swal.fire({
      title: "Advarsel!",
      width:300,
      text: "Det finnes ingen informasjon å lagre!",
      icon: "warning"
      });

    return;
  }

  localStorage.setItem("skattTabell", tBody.innerHTML);


Swal.fire({
  title: "Lagret!",
  width: 300,
  text: "Data er lagret.",
  icon: "success",
  timer: 1500,
  showConfirmButton: false
});
  
}

window.addEventListener("load", () => {
  tBody.innerHTML = localStorage.getItem("skattTabell") || "";
});

function slettRad(slettbtn) {

  const row = slettbtn.closest("tr");

  const index = Array.from(tBody.rows).indexOf(row);

  Swal.fire({
    width: 300,
    title: "Er du sikker?",
    text: "Du vil slette denne raden.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f4a261",
    cancelButtonColor: "rgb(59, 81, 104)",
    confirmButtonText: "Ja, slett!",
    cancelButtonText: "Avbryt"
  }).then((result) => {

    if (result.isConfirmed) {

      if (index !== -1) {

        tBody.deleteRow(index);

        localStorage.setItem("skattTabell", tBody.innerHTML);
        

        Swal.fire({
          width: 300,
          title: "Slettet!",
          text: "Raden er fjernet.",
          icon: "success"
        });

      }
    }

  });


  
}

function redigerRad(knapp) {

  const rad = knapp.closest("tr");

  navnInput.value =
    rad.cells[0].textContent.trim();

  skattLonInput.value =
    parseInt(rad.cells[1].textContent.replace(/[^\d]/g, ""));

  skattProsentInput.value =
    parseInt(rad.cells[2].textContent);

  teleInput.value =
    rad.cells[5].textContent.trim();

  radSomRedigeres = rad;
}


function lagreEndring() {

  if (radSomRedigeres === null) {

    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Ingen rad er valgt for redigering.",
      icon: "warning"
    });

    return;
  }

  const rad = radSomRedigeres;

  const tlf = teleInput.value.trim();
  const lonn = Number(skattLonInput.value);
  const skattesats = Number(skattProsentInput.value);

  if (
    isNaN(lonn) ||
    isNaN(skattesats) ||
    lonn <= 0 ||
    skattesats <= 0
  ) {

    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Fyll inn gyldige tall.",
      icon: "warning"
    });

    return;
  }

  if (skattesats > 100) {

    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Skatt må være mindre enn 100 %",
      icon: "warning"
    });

    return;
  }

  const skatt = Math.round((lonn * skattesats) / 100);

  const netto = Math.round(lonn - skatt);

  // 11 måneder full skatt + 1 måned halv skatt
  const arligSkatt = Math.round(skatt * 11.5);

  const arligNetto =
    Math.round((lonn * 12) - arligSkatt);

  const navn = navnInput.value
    .trim()
    .split(/\s+/)
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1).toLowerCase()
    )
    .join(" ");

  const formatLonn =
    lonn.toLocaleString("nb-NO");

  const formatSkatt =
    (-skatt).toLocaleString("nb-NO");

  const formatNetto =
    netto.toLocaleString("nb-NO");

  const formatArligSkatt =
    (-arligSkatt).toLocaleString("nb-NO");

  const formatArligNetto =
    arligNetto.toLocaleString("nb-NO");

  const formatArligBrutto =
    (lonn * 12).toLocaleString("nb-NO");


  // ---------------------------
  // Første tabell
  // ---------------------------

  rad.cells[0].innerHTML =
    `<span>${navn}</span>`;

  rad.cells[1].innerHTML =
    `<span>${formatLonn} kr</span>`;

  rad.cells[2].innerHTML =
    `<span>${skattesats} %</span>`;

  rad.cells[3].innerHTML =
    `<span>${formatSkatt} kr</span>`;

  rad.cells[4].innerHTML =
    `<span>${formatNetto} kr</span>`;

  rad.cells[5].innerHTML =
    `<span>${tlf}</span>`;


  


  // ---------------------------
  // Lagre i localStorage
  // ---------------------------

  localStorage.setItem(
    "skattTabell",
    tBody.innerHTML
  );

  


  // ---------------------------
  // Avslutt redigering
  // ---------------------------

  radSomRedigeres = null;
  

  navnInput.value = "";
  skattLonInput.value = "";
  skattProsentInput.value = "";
  teleInput.value = "";


  Swal.fire({
    title: "Flott!",
    width: 300,
    text: "Data er oppdatert!",
    icon: "success"
  });
}

//----------------------------------------- Lukke knappen -------------------------------------

lukkeBtnSkatt.addEventListener("click", () => {

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

        window.top.location.href = "/mazloumhjem/index.html";

      });

    }

  });

});


// ------------------------------------------------- søke etter bruttolønn ------------------------------

kundeSokBtn.addEventListener("click", sokNavn);

function sokNavn() {

    const input = kundeSokInput;
    const sok = input.value.trim().toLowerCase();
    const sokeType = sokeSelect.value;

    if (sok === "") {
        Swal.fire({
            title: "Advarsel!",
            width: 300,
            text: "Skriv inn et navn eller telefon.",
            icon: "warning"
        });
        return;
    }

    // إزالة العلامات القديمة
    tBody.querySelectorAll("tr").forEach(row => {
        row.classList.remove("search-row");
    });

    const alleRader = Array.from(tBody.rows);

    const funnetRader = [];

    alleRader.forEach(row => {

        const fulltNavn =
            row.cells[0].textContent.trim();

        const deler = fulltNavn.split(/\s+/);

        const fornavn =
            deler[0]?.toLowerCase() || "";

        const etternavn =
            deler[deler.length - 1]?.toLowerCase() || "";

        const telefon =
            row.cells[5].textContent.trim();

        let treff = false;

        if (sokeType === "fornavn") {

            treff = fornavn.startsWith(sok);

        } else if (sokeType === "etternavn") {

            treff = etternavn.startsWith(sok);

        } else if (sokeType === "telefon") {

            treff = telefon.startsWith(sok);

        } else {

            treff =
                fulltNavn.toLowerCase().startsWith(sok) ||
                telefon.startsWith(sok);
        }

        if (treff) {

            row.classList.add("search-row");

            funnetRader.push(row);
        }
    });


    // إذا لم نجد شيئًا
    if (funnetRader.length === 0) {

        Swal.fire({
            title: "Feil!",
            width: 300,
            text: `Ingen navn eller telefon med "${sok}" ble funnet.`,
            icon: "error"
        });

        input.value = "";
        return;
    }


    // -----------------------------------------
    // نقل النتائج إلى بداية الجدول
    // -----------------------------------------

    funnetRader.reverse().forEach(row => {
        tBody.prepend(row);
    });


    // -----------------------------------------
    // الذهاب إلى أول الصف
    // -----------------------------------------

    const container =
        document.querySelector(".table-container");

    container.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    Swal.fire({
        title: "Flott!",
        width: 300,
        text: `Fant ${funnetRader.length} navn med "${sok}".`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false
    });

    input.value = "";
}




//--------------------------------------------------------------------- sortere ----------------------------------------------------------------------------------

function sortere() {

  const rows1 = Array.from(tBody.rows);
  const rowsArlig = Array.from(tablekroppen.rows);

  // ربط اسم الشخص بالصف السنوي
  const arligMap = new Map();

  rowsArlig.forEach((row) => {

    const navn = row.cells[0].textContent
      .trim()
      .toLowerCase();

    arligMap.set(navn, row);
  });

  // ترتيب الجدول الأول حسب etternavn
  rows1.sort((a, b) => {

    const navnA = a.cells[0].textContent.trim();
    const navnB = b.cells[0].textContent.trim();

    const etternavnA =
      navnA.split(/\s+/).pop().toLowerCase();

    const etternavnB =
      navnB.split(/\s+/).pop().toLowerCase();

    return etternavnA.localeCompare(
      etternavnB,
      "nb-NO"
    );
  });

  // إعادة ترتيب الجدول الأول
  rows1.forEach((row) => {
    tBody.appendChild(row);
  });

  // إعادة ترتيب الجدول السنوي بنفس الترتيب
  rows1.forEach((row) => {

    const navn = row.cells[0].textContent
      .trim()
      .toLowerCase();

    const arligRad = arligMap.get(navn);

    if (arligRad) {
      tablekroppen.appendChild(arligRad);
    }
  });

  // حفظ الجدولين
  localStorage.setItem(
    "skattTabell",
    tBody.innerHTML
  );

  localStorage.setItem(
    "arligTabell",
    tablekroppen.innerHTML
  );
}

const infoBox = document.createElement("div");

infoBox.id = "infoBox";

postContainer.appendChild(infoBox);

//---------------------------------------------------- Hover infoBoks ----------------------------------------

// -------------------------------------------------
// Hover - Årlig skatt
// -------------------------------------------------

tBody.addEventListener("mouseover", (e) => {

    const celle = e.target.closest("td");

    // فقط عند المرور على اسم الشخص
    if (!celle || celle.cellIndex !== 0) return;

    const rad = celle.parentElement;

    // اسم الشخص
    const navn = rad.cells[0].textContent.trim();

    // الراتب الشهري
    const lonn = Number(
        rad.cells[1].textContent.replace(/[^\d]/g, "")
    );

    // نسبة الضريبة
    const skattesats = Number(
        rad.cells[2].textContent.replace(/[^\d]/g, "")
    );

    if (!lonn || !skattesats) return;

    // الضريبة الشهرية
    const manedSkatt = Math.round(
        (lonn * skattesats) / 100
    );

    // 11 شهر ضريبة كاملة + شهر نصف ضريبة
    const arligSkatt = Math.round(
        manedSkatt * 11.5
    );

    // صافي الدخل السنوي
    const arligBrutto = lonn * 12;

    const arligNetto = Math.round(
        arligBrutto - arligSkatt
    );

    // Pensjon: 10 måneder skattefritt + 1 måned skattefritt + 1 måned halv skatt
  
  const pensjonSkatt = Math.round(manedSkatt * 10.5);
  const arlignettoPensjonSkatt = arligBrutto - pensjonSkatt

    // InfoBox
    infoBox.innerHTML = `
        <strong>${navn}</strong><br>
        Årlig brutto: ${arligBrutto.toLocaleString("nb-NO")} kr<br>
        Årlig skatt:
        ${(-arligSkatt).toLocaleString("nb-NO")} kr<br>
        Årlig netto:
        ${arligNetto.toLocaleString("nb-NO")} kr<br><br>

        <strong>Hvis du er uføretrygdet:</strong><br>
        
        Årlig skatt på pensjon: ${(-pensjonSkatt).toLocaleString("nb-NO")} kr<br>
        Årlig pensjon etter skatt: ${arlignettoPensjonSkatt.toLocaleString("nb-NO")} kr<br>
        `;

    infoBox.style.display = "block";
});


tBody.addEventListener("mousemove", (e) => {

    infoBox.style.left = `${e.clientX + 15}px`;
    infoBox.style.top = `${e.clientY + 15}px`;

});


tBody.addEventListener("mouseleave", () => {

    infoBox.style.display = "none";

});

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" &&
        document.activeElement === kundeSokInput) {

        e.preventDefault();
        sokNavn();
    }
});
