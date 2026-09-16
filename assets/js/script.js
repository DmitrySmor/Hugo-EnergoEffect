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
	navText: ["<img src='./images/slide-prev.png' alt='' />", "<img src='./images/slide-next.png' alt='' />"],
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
// Owl Carousel автоматически создаёт кнопки .owl-prev и .owl-next без понятных для скринридеров названий.
// Добавляем aria-label, чтобы скринридер озвучивал назначение кнопок: «Предыдущий слайд» и «Следующий слайд».
// Это также устраняет ошибку Lighthouse/axe о кнопках без доступного имени.
$('.main-carousel .owl-prev').attr('aria-label', 'Предыдущий слайд')
$('.main-carousel .owl-next').attr('aria-label', 'Следующий слайд')
// Owl Carousel автоматически создаёт кнопки .owl-dot без доступного имени.
// Добавляем aria-label, чтобы скринридер понимал, какой слайд выбирает каждая точка навигации.
$('.main-carousel .owl-dot').each(function (index) {
	$(this).attr('aria-label', 'Перейти к слайду ' + (index + 1))
})
