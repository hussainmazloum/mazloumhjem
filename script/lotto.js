const postContainer = document.getElementById("container");

const logo = document.createElement("img");
logo.id = "lotto";
logo.src = "ball_images/lotto.png";
logo.alt = "lotto";
logo.classList.add("lotto");

const logoTekst = document.createElement("h3");
logoTekst.id = "tipping";
logoTekst.textContent = "Mazloum Tipping";
logoTekst.classList.add("tipping");

const lottoInfo = document.createElement("p");
lottoInfo.id = "info";
lottoInfo.textContent =
  "Lotto er et lotterispill hvor det trekkes 7 hovedtall og 1 tilleggstall av totalt 34 tall. Får du 7 rette tall på én og samme rekke, vinner du førstepremiepotten i Lotto.";

lottoInfo.classList.add("info");

const postInput = document.createElement("input");

postInput.type = "number";
postInput.id = "input";
postInput.placeholder = "Antall ball";
postInput.value = "7";
postInput.min = "1";
postInput.max = "7";
postInput.classList.add("input");

const btn = document.createElement("button");
btn.type = "button";
btn.textContent = "Trekke ut";
btn.classList.add("button");

const ballResultat = document.createElement("div");
ballResultat.id = "ballResultat";
ballResultat.classList.add("ballResultat");

const ballBilder = document.createElement("div");
ballBilder.id = "ballBilder";
ballBilder.classList.add("ballBilder");

const verdier = [];

postContainer.appendChild(logo);
postContainer.appendChild(logoTekst);
postContainer.appendChild(lottoInfo);
postContainer.appendChild(postInput);
postContainer.appendChild(btn);

postContainer.appendChild(ballBilder);
postContainer.appendChild(ballResultat);

btn.addEventListener("click", async () => {
  const antallBall = Number(postInput.value);

  verdier.length = 0;
  ballBilder.innerHTML = "";
  ballResultat.textContent = "";

  if (antallBall <= 0 || antallBall > 7) {
    Swal.fire({
      title: "Advarsel!",
      width: 300,
      text: "Du kan velge maksimalt 7 tall.",
      icon: "warning",
    });

    return;
  }

  while (verdier.length < antallBall) {
    const value = Math.floor(Math.random() * 34) + 1;

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
});
