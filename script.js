const ring = () => {
    const audio = new Audio();
    audio.src = "./fizz.ogg";
    audio.play();
};

const btn = document.querySelector(".ring");
btn.addEventListener("click", () => {
    ring();
});