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
let target_box = null;
let open = false;
const btn_more = document.querySelectorAll('.btn_more');
 
btn_more.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (btn.id === e.target.id) {
            const flous = document.querySelectorAll('.box');
            flous.forEach(flou => {
                flou.classList.add('blur');
            })
 
            let coord_btn = btn.getBoundingClientRect();
            let tailleEcranX = window.innerWidth;
            let tailleEcranY = window.innerHeight;
            let midX = tailleEcranX / 2;
            let midY = tailleEcranY / 2;
            let moveX = (midX - coord_btn.x - 50) / 1.8;
            let moveY = (midY - coord_btn.y) / 100;
 
            let target = e.target.parentNode.id;
            let boxx = document.getElementById(target);
 
            boxx.style.transform = `scale(1.8) rotateY(180deg) translate(${-moveX}px,${-moveY}px)`;
            boxx.style.background = "white"
            boxx.style.zIndex = "1";
            boxx.style.overflowY = "scroll"
            boxx.classList.remove('blur');
 
 
 
            let developpe = boxx.querySelectorAll("p");
            developpe.forEach(p => {
                p.classList.remove('resume');
                p.classList.add('entier');
                p.style.fontSize = "12px";
            })
 
            let developpe_titre = boxx.querySelectorAll("h3");
            developpe_titre.forEach(titre => {
                titre.classList.add('entier');
            })
 
            const text_return = document.querySelectorAll('.entier');
            text_return.forEach(text => {
                text.style.transform = 'rotateY(180deg)';
            });
            btn.remove();
 
            target_box = boxx;
            open=true;
        }
    })
});
//--------------------------------------------------------------ANIMATION RETOUR BOX-----------------------------------------------------------------------
 
 
const header = document.querySelector('header')
document.addEventListener("click", (e) => {
    if( (e.target.id != target_box.id && open===true) && (e.target.parentNode.id != target_box.id && open===true) ){
        open = false;
        location.reload();
    }
})
 
 
//----------------------------------------------------------LIMITE CARACTERE RESUME----------------------------------------------------------------
 
const resumes = document.querySelectorAll('.resume');
const stock = Array.from(resumes).map(r => r.textContent);
const maxChars = 300;
 
 
 
function resume() {
    let i = 0;
    resumes.forEach(resume => {
        if (resume.textContent.length > maxChars && resume.classList.value === 'resume') {
            resume.textContent = resume.textContent.slice(0, maxChars) + '…';
            i = i + 1;
        } else {
            resume.textContent = stock[i];
            i = i + 1;
        }
    });
    setTimeout(resume, 100);
}
resume();