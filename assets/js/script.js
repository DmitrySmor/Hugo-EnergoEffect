function MobMenu() {
    document.getElementById('mobmenu').classList.toggle('open')
}
let scrollbutton = document.getElementById('scroll-top')
window.onscroll = function () {
    scrollFunction()
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollbutton.style.display = 'block'
    } else {
        scrollbutton.style.display = 'none'
    }
}

scrollbutton.addEventListener('click', backToTop)

function backToTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}
$('.main-carousel').owlCarousel({
    loop: true,
    margin: 15,
    autoplay: true,
    nav: true,
    navText: ["<img src='./images/slide-prev.png'>", "<img src='./images/slide-next.png'>"],
    responsive: {
        0: {
            items: 1,
        },
        720: {
            items: 2,
        },
        960: {
            items: 3,
        },
        1320: {
            items: 4,
        },
    },
})
