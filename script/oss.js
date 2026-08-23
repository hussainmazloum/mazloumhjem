const postContainer = document.getElementById("container");

const soura = document.createElement("img")
soura.src = "../image/logomazloum.png";
const tekst = document.createElement("p");
const linje = document.createElement("hr");
const arab = document.createElement("h4");

tekst.innerHTML = `Dette er et personlig, eksperimentelt og ikke-kommersielt prosjekt som er utviklet for å være fritt tilgjengelig for alle som ønsker å ha nytte av det og glede av å bruke det. Nettstedet tilbyr et utvalg av underholdningsprogrammer, TV-kanaler, beregningsprogrammer og praktiske verktøy som gjør det enklere å utføre blant annet skatteberegninger og daglige låneberegninger. For å gjøre opplevelsen mer attraktiv har jeg lagt til enkle kreative og kunstneriske detaljer i designet. Prosjektet er under kontinuerlig utvikling, og nye funksjoner, forbedringer og oppdateringer vil bli lagt til i fremtiden.

<hr>

This is a personal, experimental, non-profit project created to be freely available for everyone to benefit from and enjoy. The website offers a variety of entertainment programs, TV channels, calculation tools, and practical utilities that help users perform tax calculations and everyday loan calculations with ease. To make the experience more engaging and appealing, I have added simple creative and artistic touches to the website’s design. The project is continuously evolving, and new features, enhancements, and improvements will be introduced in the future.
`;

arab.textContent="هذا مشروع شخصي وتجريبي غير ربحي، أُنشئ ليكون متاحًا للجميع للاستفادة منه والاستمتاع باستخدامه. يوفّر الموقع مجموعة من البرامج الترفيهية والقنوات التلفزيونية بالإضافة الى البرامج الحسابية والأدوات العملية التي تساعد في إنجاز بعض الحسابات الضريبية وحساب القروض اليومية بسهولة. ولإضفاء طابع أكثر جاذبية، أضفت لمسات إبداعية وفنية بسيطة إلى تصميم الموقع، مع الحرص على تطويره باستمرار وإضافة مزايا وتحسينات جديدة في المستقبل."

soura.classList.add("soura");
tekst.classList.add("p");
arab.classList.add("h4");

postContainer.appendChild(soura);
postContainer.appendChild(tekst);
postContainer.appendChild(linje);
postContainer.appendChild(arab);


