const postContainer = document.getElementById("container");

const logoBilde = document.createElement("img");
const tekst = document.createElement("p");
tekst.textContent="Dette er et personlig, eksperimentelt og ikke-kommersielt prosjekt som er utviklet for å være fritt tilgjengelig for alle som ønsker å ha nytte av det og glede av å bruke det. Nettstedet tilbyr et utvalg av underholdningsprogrammer, TV-kanaler, beregningsprogrammer og praktiske verktøy som gjør det enklere å utføre blant annet skatteberegninger og daglige låneberegninger. For å gjøre opplevelsen mer attraktiv har jeg lagt til enkle kreative og kunstneriske detaljer i designet. Prosjektet er under kontinuerlig utvikling, og nye funksjoner, forbedringer og oppdateringer vil bli lagt til i fremtiden.";
tekst.classList.add("p");

logoBilde.src = "image/logomazloum.png";
logoBilde.alt = "Logo";
logoBilde.classList.add("bilde");

postContainer.appendChild(logoBilde);
postContainer.appendChild(tekst);

