const postContainer = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {

    const postContainer = document.getElementById("container");

    const celler = document.querySelectorAll(".celle");
    const status = document.getElementById("status");
    const restart = document.getElementById("restart");

    const mennesker = "X";
    const computer = "O";

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let spillOver = false;

    celler.forEach(celle => {
        celle.addEventListener("click", menneskeligFlytt);
    });

    function menneskeligFlytt() {

        if (spillOver || this.textContent !== "") {
            return;
        }

        this.textContent = mennesker;

        if (checkWinner(mennesker)) {
            status.textContent = "Du vinner!";
            spillOver = true;

            Swal.fire({
                title: "Flott!",
                width: 300,
                text: "Du vinner",
                color: "darkgreen",
                icon: "success"
            });

            return;
        }

        if (isDraw()) {
            status.textContent = "Uavgjort!";
            spillOver = true;

            Swal.fire({
                title: "Greit!",
                width: 300,
                text: "Uavgjort",
                color: "rgb(88, 173, 73)",
                icon: "success"
            });

            return;
        }

        status.textContent = "Datamaskinen tenker...";

        setTimeout(computerMove, 500);
    }


    function findWinningMove(player) {

        for (const combo of winningCombinations) {

            const values = combo.map(
                i => celler[i].textContent
            );

            const playerCount =
                values.filter(v => v === player).length;

            const emptyCount =
                values.filter(v => v === "").length;

            if (playerCount === 2 && emptyCount === 1) {

                return combo[values.indexOf("")];

            }
        }

        return null;
    }


    function computerMove() {

        if (spillOver) {
            return;
        }

        const emptyCells = [...celler].filter(
            celle => celle.textContent === ""
        );

        if (emptyCells.length === 0) {
            return;
        }

        // الكمبيوتر يحاول الفوز
        let move = findWinningMove(computer);

        // إذا لم يستطع الفوز، يمنع اللاعب
        if (move === null) {
            move = findWinningMove(mennesker);
        }

        // إذا لم يوجد أي حركة مهمة، يختار عشوائيًا
        if (move !== null) {

            celler[move].textContent = computer;

        } else {

            const randomCell =
                emptyCells[
                    Math.floor(
                        Math.random() * emptyCells.length
                    )
                ];

            randomCell.textContent = computer;
        }


        if (checkWinner(computer)) {

            status.textContent =
                "Datamaskinen vinner!";

            spillOver = true;

            Swal.fire({
                title: "Dessverre!",
                width: 300,
                text: "Datamaskinen vinner!",
                color: "darkblue",
                icon: "success"
            });

            return;
        }


        if (isDraw()) {

            status.textContent = "Uavgjort!";
            spillOver = true;

            return;
        }


        status.textContent = "Din tur";
    }


    function checkWinner(player) {

        for (const combo of winningCombinations) {

            if (
                combo.every(
                    index =>
                        celler[index].textContent === player
                )
            ) {

                combo.forEach(index => {
                    celler[index].style.backgroundColor =
                        "lightgreen";
                });

                return true;
            }
        }

        return false;
    }


    function isDraw() {

        return [...celler].every(
            celle => celle.textContent !== ""
        );
    }


    restart.addEventListener("click", () => {

        celler.forEach(celle => {

            celle.textContent = "";
            celle.style.backgroundColor = "";

        });

        spillOver = false;

        status.textContent = "Din tur";

        Swal.fire({
            title: "Din tur!",
            width: 300,
            text: "Klikk på en ledig rute",
            color: "rgb(88, 173, 73)",
            icon: "success"
        });

    });

});






