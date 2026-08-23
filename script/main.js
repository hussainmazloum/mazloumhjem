function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}


// زر القائمة
const menuBtn = document.createElement("div");

menuBtn.id = "menuBtn";
menuBtn.textContent = "☰";

menuBtn.addEventListener("click", toggleMenu);


// القائمة
const titleKnapper = document.createElement("ul");

titleKnapper.id = "menu";
titleKnapper.classList.add("title-buttons");


//--------------------------------------------------------------------------------------

const header = document.createElement("div");

header.id = "header";


// Bilde
const postBilde = document.createElement("img");

postBilde.id = "bilde";
postBilde.src = "image/mazlogo.png";
postBilde.alt = "Logo";


// tekst
const headerText = document.createElement("h1");

headerText.id = "header-text";
headerText.textContent = "HJEMMESIDE";


// Første linje bildet + tekst
const headerTop = document.createElement("div");

headerTop.id = "header-top";

headerTop.appendChild(postBilde);
headerTop.appendChild(headerText);


//--------------------------------------------------------------------------------------
// الصفحات

const pages = [
    { text: "HJEM", url: "index.html" },
    { text: "MAZLOUM TIPPING", url: "lotto.html" },
    { text: "SPILL", url: "spill.html" },
    { text: "TV", url: "tv.html" },
    { text: "KALKULATOR", url: "prosent.html" },
    { text: "OM OSS", url: "oss.html" }
];


pages.forEach(page => {

    const li = document.createElement("li");


    // NORSKE TIPPING
    if (page.text === "MAZLOUM TIPPING") {

    li.classList.add("tipping-menu");

    const text = document.createElement("span");
    text.textContent = page.text;

    const subMenu = document.createElement("ul");
    subMenu.classList.add("sub-menu");


    const lotto = document.createElement("li");
    lotto.textContent = "Lotto";

    lotto.addEventListener("click", () => {
        window.location.href = "lotto.html";
    });


    const viking = document.createElement("li");
    viking.textContent = "Vikingolotto";

    viking.addEventListener("click", () => {
        window.location.href = "viking.html";
    });


    subMenu.appendChild(lotto);
    subMenu.appendChild(viking);

    li.appendChild(text);
    li.appendChild(subMenu);


    text.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    subMenu.classList.toggle("show");
});
}


    // KALKULATOR
    else if (page.text === "KALKULATOR") {

    li.classList.add("calculator-menu");

    const text = document.createElement("span");
    text.textContent = page.text;

    const subMenu = document.createElement("ul");
    subMenu.classList.add("sub-menu");


    const prosent = document.createElement("li");
    prosent.textContent = "Prosent";

    prosent.addEventListener("click", () => {
        window.location.href = "prosent.html";
    });


    const boliglaan = document.createElement("li");
    boliglaan.textContent = "Boliglån";

    boliglaan.addEventListener("click", () => {
        window.location.href = "boliglån.html";
    });


    const skatt = document.createElement("li");
    skatt.textContent = "Skatt";

    skatt.addEventListener("click", () => {
        window.location.href = "skatt.html";
    });


    subMenu.appendChild(prosent);
    subMenu.appendChild(boliglaan);
    subMenu.appendChild(skatt);

    li.appendChild(text);
    li.appendChild(subMenu);


    text.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    subMenu.classList.toggle("show");
});
}


    // Gjenværende elementer
    else {

        li.textContent = page.text;

        li.addEventListener("click", () => {
            window.location.href = page.url;
        });
    }


    titleKnapper.appendChild(li);
});


//--------------------------------------------------------------------------------------
// إضافة العناصر إلى header

header.appendChild(headerTop);

header.appendChild(menuBtn);

header.appendChild(titleKnapper);


// إضافة header إلى الصفحة

document.body.prepend(header);





//--------------------------------------------------------------------------------------
// Footer

const foot = document.createElement("p");

foot.textContent = "\u00A9  Mazloum 2026";

foot.id = "copy";
foot.classList.add("copy");

postContainer.appendChild(foot);