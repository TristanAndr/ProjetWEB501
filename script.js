const triggers_open = document.querySelectorAll('.actionner_open'); //declare toute les texte suscpetibles de declencher l'animation

triggers_open.forEach(trigger => {
    trigger.addEventListener('click', () => {              //quand tu click sur un de ces texte :
        const targetId = trigger.dataset.target;           //sélectionne l'id du text
        const slide = document.getElementById(targetId);   //sélectionne l'élément a afficher
        slide.style.zIndex = "5";                          //remet au premier plan
        slide.classList.remove('animate', 'close');        //reset si déjà animé
        void slide.offsetWidth;                            //force reflow (en gros ca evite les bugs)
        slide.classList.add('animate');                    //lance l'animation déclaré dans le css
    });
});

const triggers_close = document.querySelectorAll('.actionner_close');

triggers_close.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.target;
        const slide = document.getElementById(targetId);
        slide.style.zIndex = "2";                           //remet a ce plan pour pouvoir le remettre derriere le tire cliquable
        slide.classList.remove('animate', 'close');
        void slide.offsetWidth;
        slide.classList.add('close');
    });
});

document.querySelectorAll('.develop').forEach(trigger => {  //pareil qu'au dessus sans declarer la variable
    trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;         //prend le div qui suit le titre(le contenu quoi)
        content.classList.toggle('open');                   //toggle fait que en fonction de l'etat soit ca prend soit ca enleve
        trigger.classList.toggle('open');                   //lance ou remove open
    });
});



const triggers_open2 = document.querySelectorAll('.actionner_open2');

triggers_open2.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId2 = trigger.dataset.target;
        const slide2 = document.getElementById(targetId2);
        slide2.style.zIndex = "5";
        slide2.classList.remove('animate2', 'close2');
        void slide2.offsetWidth;
        slide2.classList.add('animate2');
    });
});

const triggers_close2 = document.querySelectorAll('.actionner_close2');

triggers_close2.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId2 = trigger.dataset.target;
        const slide2 = document.getElementById(targetId2);
        slide2.style.zIndex = "2";
        slide2.classList.remove('animate2', 'close2');
        void slide2.offsetWidth;
        slide2.classList.add('close2');
    });
});



const triggers_open3 = document.querySelectorAll('.actionner_open3');

triggers_open3.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId3 = trigger.dataset.target;
        const slide3 = document.getElementById(targetId3);
        slide3.style.zIndex = "5";
        slide3.classList.remove('animate3', 'close3');
        void slide3.offsetWidth;
        slide3.classList.add('animate3');
    });
});

const triggers_close3 = document.querySelectorAll('.actionner_close3');

triggers_close3.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetId3 = trigger.dataset.target;
        const slide3 = document.getElementById(targetId3);
        slide3.style.zIndex = "2";
        slide3.classList.remove('animate3', 'close3');
        void slide3.offsetWidth;
        slide3.classList.add('close3');
    });
});

document.querySelectorAll('.develop3').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const content3 = trigger.nextElementSibling;
        content3.classList.toggle('open3');
    });
});












document.addEventListener('DOMContentLoaded', function () { //carousel sympatoche
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, { indicators: true });

    instances.forEach(carousel => {
        setInterval(() => {
            carousel.next();    //change l'image toute les 3sec
        }, 3000);
    });
});














function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours; //ajoute un 0 devant si inférieur à 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('hour').textContent = `${hours}:${minutes}`;
}
updateClock();//lance la fonction
setInterval(updateClock, 1000); //maj toute les secondes


function updateClock2() {
    const now2 = new Date();
    let hours2 = now2.getHours();
    let minutes2 = now2.getMinutes();
    hours2 = hours2 < 10 ? '0' + hours2 : hours2;
    minutes2 = minutes2 < 10 ? '0' + minutes2 : minutes2;
    document.getElementById('hour2').textContent = `${hours2}:${minutes2}`;
}
updateClock2();
setInterval(updateClock2, 1000);


function updateClock3() {
    const now3 = new Date();
    let hours3 = now3.getHours();
    let minutes3 = now3.getMinutes();
    hours3 = hours3 < 10 ? '0' + hours3 : hours3;
    minutes3 = minutes3 < 10 ? '0' + minutes3 : minutes3;
    document.getElementById('hour3').textContent = `${hours3}:${minutes3}`;
}
updateClock3();
setInterval(updateClock3, 1000);

























const cache = document.querySelector('.cache');

function startAnimation() {
    cache.classList.add('animating');
    cache.style.transform = 'translateY(-100%)'; // ton effet

    cache.addEventListener('transitionend', () => {
        cache.classList.remove('animating');
    }, { once: true });
}



const cache2 = document.querySelector('.cache2');

function startAnimation2() {
    cache2.classList.add('animating2');
    cache2.style.transform = 'translateY(-100%)'; // ton effet

    cache2.addEventListener('transitionend', () => {
        cache2.classList.remove('animating2');
    }, { once: true });
}



const cache3 = document.querySelector('.cache3');

function startAnimation3() {
    cache3.classList.add('animating3');
    cache3.style.transform = 'translateY(-100%)'; // ton effet

    cache3.addEventListener('transitionend', () => {
        cache3.classList.remove('animating3');
    }, { once: true });
}

