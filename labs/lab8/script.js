function toggleTheme() {
    var peaBody = document.querySelector("body");
    peaBody.classList.toggle("dark-mode");
}

let toggleButton = document.getElementById("toggleButton")
toggleButton.onclick = toggleTheme;