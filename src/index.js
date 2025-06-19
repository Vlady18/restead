import('./styles/normalize.css');
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import('./styles/style.scss');
import $ from "./jquery-3.7.1.min";
import IMask from 'imask';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

$(function() {
    var currentMousePos = { x: -1, y: -1 };
    var r = document.querySelector(':root');
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        r.style.setProperty('--mouse-x',  `${currentMousePos.x}px`);
        r.style.setProperty('--mouse-y',  `${currentMousePos.y}px`);
    });

    const videos = $("video");
    // Add event listener for the 'play' event
    videos.on("play", function () {
        // Pause all videos except the one being played
        videos.each(function () {
            if (this !== event.target) {
                this.pause();
            }
        });
    });

    $('.select-type').on('change', function(event) {
        event.preventDefault();
        const type = event.target.value;

        $('.projects-content').removeClass('active');
        $('.projects-content[data-type="' + type + '"]').addClass('active');
    })

    $('.swiper img').click(function() {
        const src = $(this).attr('src');
        $('.gallery-container').addClass('active');
        $('.gallery-inner img.gallery-photo').attr("src", src);
        // $('.gallery-inner').css("background-image", `url(${src})`);
    });

    $('.tabs li.tab').click(function() {
        $('.tabs li.tab').removeClass('active');
        $(this).addClass('active');

        $('.projects-content').removeClass('active');
        const type = $(this).data('type');

        $('.projects-content[data-type="' + type + '"]').addClass('active');
    });

    $('.burger').click(function() {
        $('.mobile-menu').addClass('shown');
    });

    $('.close-menu').click(function() {
        $('.mobile-menu').removeClass('shown');
    });

    $('.handling-item .title').click(function() {
        $('.handling-item .list').removeClass('shown');
        $(this).siblings('.list').addClass('shown');
    });

    var swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 50,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next0",
            prevEl: ".swiper-button-prev0",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            1260: {
                spaceBetween: 0
            }
        },
        modules: [Navigation, Pagination]
    });

    var swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        spaceBetween: 50,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next2",
            prevEl: ".swiper-button-prev2",
        },
        pagination: {
            el: ".swiper-pagination2",
        },
        breakpoints: {
            1260: {
                spaceBetween: 0
            }
        },
        modules: [Navigation, Pagination]
    });

    var swiper3 = new Swiper(".mySwiper3", {
        loop: true,
        spaceBetween: 50,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next3",
            prevEl: ".swiper-button-prev3",
        },
        pagination: {
            el: ".swiper-pagination3",
        },
        breakpoints: {
            1260: {
                spaceBetween: 0
            }
        },
        modules: [Navigation, Pagination]
    });

    var swiper4 = new Swiper(".mySwiper4", {
        loop: true,
        spaceBetween: 50,
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next4",
            prevEl: ".swiper-button-prev4",
        },
        pagination: {
            el: ".swiper-pagination4",
        },
        breakpoints: {
            1260: {
                spaceBetween: 0
            }
        },
        modules: [Navigation, Pagination]
    });

    document.querySelectorAll('.user_phone').forEach((el, i) => {
        var maskOptions = {
            mask: '+380000000000',
            lazy: false
        };
        IMask(el, maskOptions);
    });

    $('.user_phone').on('input', function(e) {
        this.value.indexOf(this.defaultValue) && (this.value = this.defaultValue);
        const isValidPhone = e.target.value.match(/(?=.*\+38\s?0(39|67|68|96|97|98|50|66|95|99|63|73|93|91|92|89|94)\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$)/gm) !== null;

        if (isValidPhone) {
            $('.btnSubmit').attr('disabled', false);
            $(this).removeClass('error-field');
        } else {
            $('.btnSubmit').attr('disabled', true);
            $(this).addClass('error-field');
        }
    });

    $('.user_name').on('input', function(e) {
        const nameIsRequired = $('.user_name').val()?.trim() !== '';

        if (nameIsRequired) {
            $(this).removeClass('error-field');
        } else {
            $(this).addClass('error-field');
        }
    });

    $("a.start").on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $('html, body').animate({
            scrollTop:$(href).offset().top
        },'slow');
    });

    $('form').on('submit', function(event) {
        event.preventDefault();
    })

    $('[data-submit]').on('click', function(e){
        e.preventDefault();

        const phoneIsValid = $('.user_phone').val()?.match(/(?=.*\+38\s?0(39|67|68|96|97|98|50|66|95|99|63|73|93|91|92|89|94)\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$)/gm) !== null;
        const nameIsRequired = $('.user_name').val()?.trim() !== '';

        if (!phoneIsValid) {
            $('.user_phone').addClass('error-field');
            $('.btnSubmit').attr('disabled', true);
        } else {
            $('.user_phone').removeClass('error-field');
        }

        if (!nameIsRequired) {
            $('.user_name').addClass('error-field');
            $('.btnSubmit').attr('disabled', true);
        } else {
            $('.user_name').removeClass('error-field');
        }

        if(phoneIsValid && nameIsRequired) {
            $('.btnSubmit').attr('disabled', false);
            $(this).closest('form').submit();
            let $form = $(this).closest('form');

            $.ajax({
                type: 'POST',
                url: '/success.php',
                data: $(this).closest('form').serialize()
            })
            .always(function (response) {
                $form.trigger('reset');
                $('.thank-popup').addClass('active');
            });
        }
    })

    $('.thank-popup .close').on('click', function(event) {
        $('.thank-popup').removeClass('active');
    })

    $('.gallery .close').on('click', function(event) {
        $('.gallery-container').removeClass('active');
    })

    $('.gallery-container').on('click', function (e){
        if (e.target.className !== 'gallery-photo_wrapper' && e.target.className !== 'gallery-arrow_icon' && e.target.className !== 'gallery-arrow' && e.target.className !== 'gallery-photo') {
            $('.gallery-container').removeClass('active');
        }
    });

    let photos = [];

    $('.gallery-arrow').on('click', function(event) {
        const isNext = $(this).hasClass('next_arrow');
        const currentSrc = $('.gallery-photo').attr('src');

        if(photos.length === 0) {
            $('.slide-images').each((id, el) => {
                el.querySelectorAll('img').forEach((item, ids) => {
                    photos.push($(item).attr('src'));
                })
            })
        }

        const newPhotosArray = Array.from(new Set(photos));
        let currentIndex = newPhotosArray.indexOf(currentSrc);
        let nextIndex = isNext ? currentIndex + 1 : currentIndex - 1;
        const nextPhoto = newPhotosArray[nextIndex] ? newPhotosArray[nextIndex] : newPhotosArray[20];

        $('.gallery-inner img.gallery-photo').attr("src", nextPhoto);
    });
});
