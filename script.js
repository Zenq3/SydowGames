// Setze das Release-Datum
const releaseDate = new Date("2025-12-31T00:00:00").getTime();

// Aktualisiere den Countdown jede Sekunde
const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = releaseDate - now;

    if (timeLeft > 0) {
        // Berechne Tage, Stunden, Minuten und Sekunden
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update die HTML-Elemente
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    } else {
        // Wenn der Countdown endet
        clearInterval(countdownTimer);
        document.querySelector(".content").innerHTML = "<h1>We're Live!</h1>";
    }
}, 1000);
