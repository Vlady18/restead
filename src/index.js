import './styles/normalize.css'
import './styles/style.scss'
import Swiper from 'swiper';
import 'swiper/css';

$(function() {
    console.log('test')
    var currentMousePos = { x: -1, y: -1 };
    var r = document.querySelector(':root');
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        r.style.setProperty('--mouse-x',  `${currentMousePos.x}px`);
        r.style.setProperty('--mouse-y',  `${currentMousePos.y}px`);
    });

    var swiper = new Swiper(".mySwiper", {
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        centeredSlidesBounds: true,
        // slidesPerView: "auto",

        // navigation: {
        //     nextEl: ".swiper-button-next",
        //     prevEl: ".swiper-button-prev",
        // },
    });
});
