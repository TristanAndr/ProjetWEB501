//-------------------------------------------------------------AUDIO FIZZ--------------------------------------------------------------------------
 
const ring = () => {
    const audio = new Audio();
    audio.src = "./fizz.ogg";
    audio.play();
};
 
const btn = document.querySelector(".ring");
btn.addEventListener("click", () => {
    ring();
});
 
//--------------------------------------------------------------ANIMATION BOX-----------------------------------------------------------------------
 
const btn_more = document.querySelectorAll('.btn_more');
 
btn_more.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (btn.id === e.target.id) {
            let coord_btn = btn.getBoundingClientRect();
            let tailleEcranX = window.innerWidth;
            let tailleEcranY = window.innerHeight;
            let midX = tailleEcranX / 2;
            let midY = tailleEcranY / 2;
            let moveX = (midX - coord_btn.x - 50) / 2.2;
            let moveY = (midY - coord_btn.y) / 100;
 
            let target = e.target.parentNode.id;
            let boxx = document.getElementById(target);
 
            boxx.style.transform = `scale(2.2) rotateY(180deg) translate(${-moveX}px,${-moveY}px)`;
            //boxx.style.background = "rgba(0,0,0,1)";
            //boxx.style.zIndex = "1";
 
            valid = false;
            console.log(valid);
            let developpe = boxx.querySelector("p");
            developpe.classList.remove('resume');
            developpe.classList.add('entier');
        }
    })
});