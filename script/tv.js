const postContainer = document.getElementById("container");

// ==================================================
// LOAD bilder.json
// ==================================================

fetch("bilder.json")

    .then(response => {

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        return response.json();
    })

    .then(jsonData => {

        // ==================================================
        // ANTALL KANALER
        // ==================================================

        const antallKanaler = document.createElement("p");

        antallKanaler.classList.add("antallKanaler");

        antallKanaler.innerHTML =
            `Antall kanaler: <span class="kanal">${jsonData.length}</span>`;


        // ==================================================
        // SØKEINPUT
        // ==================================================

        const searchInput = document.createElement("input");

        searchInput.type = "text";
        searchInput.id = "finne";
        searchInput.autocomplete = "off";
        searchInput.placeholder = "Søk kanal...";


        // ==================================================
        // ANTALL + SØK
        // ==================================================

        const oneLine = document.createElement("div");

        oneLine.classList.add("oneLine");

        oneLine.append(
            antallKanaler,
            searchInput
        );

        postContainer.appendChild(oneLine);


        // ==================================================
        // SØK ETTER KANAL
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
        // ELEMENTS
        // ==================================================

        const channelList =
            document.getElementById("channels");

        const video =
            document.getElementById("video");

        const channelName =
            document.getElementById("channelName");

        const ytPlayer =
            document.getElementById("ytPlayer");


        // ==================================================
        // PLAYERS
        // ==================================================

        let hls = null;
        let dashPlayer = null;


        // ==================================================
        // STOP HLS
        // ==================================================

        function stopHLS() {

            if (hls) {

                console.log("Stopping HLS");

                hls.destroy();

                hls = null;
            }
        }


        // ==================================================
        // STOP DASH
        // ==================================================

        function stopDASH() {

            if (dashPlayer) {

                console.log("Stopping DASH");

                dashPlayer.reset();

                dashPlayer = null;
            }
        }


        // ==================================================
        // STOP VIDEO
        // ==================================================

        function stopVideo() {

            video.pause();

            video.removeAttribute("src");

            video.load();
        }


        // ==================================================
        // STOP EVERYTHING
        // ==================================================

        function stopEverything() {

            // YouTube
            ytPlayer.src = "";

            // Video
            stopVideo();

            // HLS
            stopHLS();

            // DASH
            stopDASH();
        }


        // ==================================================
        // PLAY STREAM
        // ==================================================

        function playStream(url, name, type, icon) {

            console.log("================================");
            console.log("Playing:", name);
            console.log("Type:", type);
            console.log("URL:", url);
            console.log("================================");


            // ==================================================
            // CHANNEL NAME
            // ==================================================

            channelName.innerHTML =
                `<img src="${icon}" class="player-icon">${name}`;


            // ==================================================
            // HIDE PLAYERS
            // ==================================================

            video.style.display = "none";
            ytPlayer.style.display = "none";


            // ==================================================
            // YOUTUBE
            // ==================================================

            if (type === "youtube") {

                console.log(
                    "Using YouTube:",
                    name
                );

                // Stop IPTV
                stopVideo();
                stopHLS();
                stopDASH();

                // Show YouTube
                ytPlayer.style.display = "block";

                // YouTube
                ytPlayer.src =
                    `https://www.youtube.com/embed/${url}?autoplay=1`;

                return;
            }


            // ==================================================
            // IPTV
            // ==================================================

            console.log(
                "IPTV channel:",
                name
            );


            // Stop YouTube
            ytPlayer.src = "";


            // Stop old video
            stopVideo();


            // Stop HLS
            stopHLS();


            // Stop DASH
            stopDASH();


            // Show video
            video.style.display = "block";


            // ==================================================
            // CHECK URL
            // ==================================================

            if (!url) {

                console.error(
                    "Channel URL is empty:",
                    name
                );

                return;
            }


            // ==================================================
            // DETECT MPD
            // ==================================================

            const isMPD =
                url.toLowerCase().includes(".mpd");


            // ==================================================
            // DASH / MPD
            // ==================================================

            // ==================================================
// DASH / MPD
// ==================================================

if (isMPD) {

    console.log("================================");
    console.log("DASH DETECTED");
    console.log("Channel:", name);
    console.log("URL:", url);
    console.log("================================");

    if (typeof dashjs === "undefined") {

        console.error("dash.js is NOT loaded!");

        return;
    }

    dashPlayer = dashjs.MediaPlayer().create();

    // مهم: لا نبدأ التشغيل تلقائياً هنا
    dashPlayer.initialize(
        video,
        url,
        false
    );

    dashPlayer.on(
        dashjs.MediaPlayer.events.STREAM_INITIALIZED,
        function () {

            console.log(
                "DASH STREAM INITIALIZED:",
                name
            );

            video.play().then(() => {

                console.log(
                    "DASH VIDEO PLAYING:",
                    name
                );

            }).catch(error => {

                console.error(
                    "DASH PLAY ERROR:",
                    error
                );

            });

        }
    );

    dashPlayer.on(
        dashjs.MediaPlayer.events.ERROR,
        function (event) {

            console.error(
                "================================"
            );

            console.error(
                "DASH ERROR:",
                event
            );

            console.error(
                "================================"
            );

        }
    );

    return;
}


            // ==================================================
            // NATIVE HLS
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

                console.log(
                    "HLS URL:",
                    url
                );


                video.src = url;


                video.addEventListener(
                    "loadedmetadata",
                    function () {

                        console.log(
                            "HLS metadata loaded:",
                            name
                        );

                        video.play().catch(error => {

                            console.error(
                                "Play error:",
                                error
                            );

                        });

                    },
                    {
                        once: true
                    }
                );


                return;
            }


            // ==================================================
            // HLS.JS
            // Chrome / Edge / Firefox
            // ==================================================

            if (
                typeof Hls !== "undefined" &&
                Hls.isSupported()
            ) {

                console.log(
                    "Using HLS.js:",
                    name
                );

                console.log(
                    "HLS URL:",
                    url
                );


                // Create HLS
                hls = new Hls({

                    enableWorker: true,

                    lowLatencyMode: true

                });


                // Attach video
                hls.attachMedia(video);


                // Load stream
                hls.loadSource(url);


                // Manifest loaded
                hls.on(
                    Hls.Events.MANIFEST_PARSED,
                    function () {

                        console.log(
                            "MANIFEST_PARSED:",
                            name
                        );


                        video.play().catch(error => {

                            console.error(
                                "Play error:",
                                error
                            );

                        });

                    }
                );


                // HLS errors
                hls.on(
                    Hls.Events.ERROR,
                    function (event, data) {

                        console.error(
                            "HLS ERROR:",
                            data
                        );


                        if (data.fatal) {

                            switch (data.type) {

                                case Hls.ErrorTypes.NETWORK_ERROR:

                                    console.error(
                                        "Fatal network error"
                                    );

                                    hls.startLoad();

                                    break;


                                case Hls.ErrorTypes.MEDIA_ERROR:

                                    console.error(
                                        "Fatal media error"
                                    );

                                    hls.recoverMediaError();

                                    break;


                                default:

                                    console.error(
                                        "Fatal HLS error"
                                    );

                                    stopHLS();

                                    break;
                            }
                        }

                    }
                );


                return;
            }


            // ==================================================
            // NOT SUPPORTED
            // ==================================================

            console.error(
                "Browser does not support HLS/DASH."
            );

        }


        // ==================================================
        // CREATE CHANNELS
        // ==================================================

        jsonData.forEach(channel => {

            const div =
                document.createElement("div");


            div.className = "channel";


            div.innerHTML =
                `<img src="${channel.icon}" class="channel-icon">
                 ${channel.name}`;


            // ==================================================
            // CLICK CHANNEL
            // ==================================================

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
        // CLOCK
        // ==================================================

        function updateClock() {

            const now = new Date();

            const display =
                now.toLocaleTimeString("no-NO");

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
    // JSON ERROR
    // ==================================================

    .catch(error => {

        console.error(
            "Feil ved lasting av bilder.json:",
            error
        );

    });