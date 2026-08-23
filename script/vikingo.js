const postContainer = document.getElementById("container");

const logo = document.createElement("img");
logo.src = "ball_images/tipMazloumblues.png";
logo.alt = "lotto";
logo.classList.add("lotto");


const logoTekst = document.createElement("h3");
logoTekst.textContent = "Mazloum X-Tipping";
logoTekst.classList.add("tipping");

const lottoInfo = document.createElement("p");
lottoInfo.textContent =
  "Vikingolotto trekkes det totalt 7 baller i hver ordinær trekning: 6 hovedtall fra en gruppe på 48 tall, og 1 vikingotall fra en gruppe på 5 tall";
lottoInfo.classList.add("info");

const postInput = document.createElement("input");
postInput.type = "number";
postInput.placeholder = "Antall ball";
postInput.value = "6";
postInput.min = "1";
postInput.max = "6";
postInput.classList.add("input");

const btnBox = document.createElement("div");
btnBox.id ="tippingBtn";

const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Trekke ut  (6 av 48)";
btn.classList.add("button");

const btnn = document.createElement("button");
btnn.textContent = "Trekke ut  (1 av 5)";
btnn.classList.add("button");

btnBox.append(btn, btnn);

const ballResultat = document.createElement("div");
ballResultat.classList.add("ballResultat");

const ballBilder = document.createElement("div");
ballBilder.classList.add("ballBilder");

const element = document.createElement("vikingoball");
element.classList.add("vikingo")
const vikingTall = document.createElement("vikingoball");


const verdier = [];

postContainer.appendChild(logo);
postContainer.appendChild(logoTekst);
postContainer.appendChild(lottoInfo);
postContainer.appendChild(postInput);
postContainer.appendChild(btnBox);

postContainer.appendChild(ballBilder);
postContainer.appendChild(ballResultat);
postContainer.appendChild(element);

btn.addEventListener("click", async () => {
  const antallBall = Number(postInput.value);

  verdier.length = 0;
  ballBilder.innerHTML = "";
  ballResultat.textContent = "";
  element.innerHTML = "";

  if (antallBall <= 0 || antallBall > 6) {
    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Du kan velge maksimalt 6 hovedtall og 1 Vikingtall.",
      icon: "warning",
    });

    return;
  }

  while (verdier.length < antallBall) {
    const value = Math.floor(Math.random() * 48) + 1;

    if (!verdier.includes(value)) {
      verdier.push(value);

      ballBilder.innerHTML += `
        <img
          src="ball_images/${value}.png"
          alt="Ball ${value}"
          class="ball"
        >
      `;
      await new Promise(resolve =>
        setTimeout(resolve, 650)
      );
    }
  }

  verdier.sort((a, b) => a - b);

  ballResultat.textContent = `Tall : ${verdier.join(" - ")}`;
}

);

btnn.addEventListener("click", ()=>{
const vikingTall = Math.floor(Math.random() * 5) + 1;

  element.innerHTML = ` Vikingotall er :
    <img src="ball_images/${vikingTall}.png"
         alt="Vikingtall ${vikingTall}"
         class="ball">
  `;
});
