



function ShowOptions() {
    content = document.getElementById("con");
    option = document.getElementById("op");

    console.log(option.classList);
    console.log(content.classList);
    content.classList.add("blur");
    option.classList.remove("hidden");
    option.style.display = "flex";


}
function HideOptions() {

    content = document.getElementById("con");
    option = document.getElementById("op");

    content.classList.remove("blur");
    option.classList.add("hidden");
    option.style.display = "none";


}

