
const postContainer = document.getElementById("container");


fetch("bilder.json")

    .then(response => {

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);

        }

        return response.json();

    })


    .then(jsonData => {


        // ==================================================
        // Antall kanaler
        // ==================================================

        const antallKanaler = document.createElement("p");

        antallKanaler.classList.add("antallKanaler");

        antallKanaler.innerHTML =
            `Antall kanaler: <span class="kanal">${jsonData.length}</span>`;


        // ==================================================
        // Søkeinput
        // ==================================================

        const searchInput = document.createElement("input");

        searchInput.type = "text";

        searchInput.id = "finne";

        searchInput.autocomplete="off"

        searchInput.placeholder = "Søk kanal...";


        // ==================================================
        // Antall + søk
        // ==================================================

        const oneLine = document.createElement("div");

        oneLine.classList.add("oneLine");

        oneLine.append(
            antallKanaler,
            searchInput
        );

        postContainer.appendChild(oneLine);


        // ==================================================
        // Søk etter kanal
        // ==================================================

        searchInput.addEventListener("input", function () {

            const searchText =
                this.value.toLowerCase().trim();

            const channels =
                document.querySelectorAll(
                    "#channels .channel"
                );


            channels.forEach(channel => {

                const channelName =
                    channel.textContent
                        .toLowerCase()
                        .trim();


                if (channelName.includes(searchText)) {

                    channel.style.display = "";

                } else {

                    channel.style.display = "none";

                }

            });

        });


        // ==================================================
        // Operatorelementer
        // ==================================================

        const channelList =
            document.getElementById("channels");

        const video =
            document.getElementById("video");

        const channelName =
            document.getElementById("channelName");

        const ytPlayer =
            document.getElementById("ytPlayer");


        // HLS
        let hls = null;


        // ==================================================
        // Operator kanaler
        // ==================================================

        function playStream(url, name, type, icon) {


            console.log("Playing:", name);

            console.log("Type:", type);

            console.log("URL:", url);


            // --------------------------------------------------
            // Kanalnavn
            // --------------------------------------------------

            channelName.innerHTML =
                `<img src="${icon}" class="player-icon">${name}`;


            // --------------------------------------------------
            // Skjul operatorer
            // --------------------------------------------------

            video.style.display = "none";

            ytPlayer.style.display = "none";


            // ==================================================
            // YOUTUBE
            // ==================================================

            if (type === "youtube") {


                // stopp IPTV
                video.pause();

                video.removeAttribute("src");

                video.load();


                // ødelegge HLS
                if (hls) {

                    hls.destroy();

                    hls = null;

                }


                // Vise YouTube
                ytPlayer.style.display = "block";


                // Fjerne den gamle video
                ytPlayer.src = "";


                // Spill YouTube
                ytPlayer.src =
                    `https://www.youtube.com/embed/${url}?autoplay=1`;


                return;
            }


            // ==================================================
            // IPTV
            // ==================================================


            // Stopp YouTube
            ytPlayer.src = "";


            // Stoppe den gamle video
            video.pause();

            video.removeAttribute("src");

            video.load();


            // Ødelegge den gamle HLS 
            if (hls) {

                hls.destroy();

                hls = null;

            }


            // Vise video
            video.style.display = "block";


            // ==================================================
            // Native HLS
            // Safari / iPhone / iPad
            // ==================================================

            if (
                video.canPlayType(
                    "application/vnd.apple.mpegurl"
                )
            ) {


                console.log(
                    "Using Native HLS:",
                    name
                );


                video.src = url;


                video.addEventListener(
                    "loadedmetadata",
                    function () {

                        video.play().catch(error => {

                            console.log(
                                "Play error:",
                                error
                            );

                        });

                    },
                    { once: true }
                );


            }


            // ==================================================
            // HLS.js
            // Chrome / Edge / Firefox
            // ==================================================

            else if (Hls.isSupported()) {

    console.log("Using HLS.js:", name);
    console.log("URL:", url);

    hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
    });

    hls.attachMedia(video);

    hls.loadSource(url);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {

        console.log("MANIFEST_PARSED:", name);

        video.play().catch(error => {
            console.log("Play error:", error);
        });

    });

    hls.on(Hls.Events.ERROR, function (event, data) {

        console.log("HLS ERROR:", data);

    });
}


            // ==================================================
            // Hvis browser does not support HLS
            // ==================================================

            else {

                console.log(
                    "HLS is not supported by this browser."
                );

            }

        }


        // ==================================================
        // Opprette kanaler
        // ==================================================

        jsonData.forEach(channel => {


            const div =
                document.createElement("div");


            div.className = "channel";


            div.innerHTML =
                `<img src="${channel.icon}" class="channel-icon">
                 ${channel.name}`;


            // عند الضغط
            div.onclick = () => {

                playStream(
                    channel.url,
                    channel.name,
                    channel.type,
                    channel.icon
                );

            };


            channelList.appendChild(div);

        });


        // ==================================================
        // klokka
        // ==================================================

        function updateClock() {

            const now = new Date();

            const display =
                now.toLocaleTimeString();

            document.getElementById("clock").textContent =
                display;

        }


        setInterval(
            updateClock,
            1000
        );


        updateClock();

    })


    // ==================================================
    // JSON-innlastingsfeil
    // ==================================================

    .catch(error => {

        console.error(
            "Feil ved lasting av bilder.json:",
            error
        );

    });