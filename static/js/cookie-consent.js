;(function () {
	const METRIKA_ID = 112375368
	const CONSENT_KEY = 'cookieConsent'

	// Если пользователь уже сделал выбор — баннер повторно не показываем.
	if (localStorage.getItem(CONSENT_KEY)) {
		if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
			loadMetrika()
		}
		return
	}

	// Стили компактного баннера.
	const style = document.createElement('style')
	style.textContent = `
		.cookie-consent {
			position: fixed;
			z-index: 9999;
			left: 20px;
			bottom: 20px;
			width: 320px;
			max-width: calc(100% - 40px);
			padding: 16px;
			background: #fff;
			border-radius: 10px;
			box-shadow: 0 4px 20px rgba(0, 0, 0, .15);
			font-size: 13px;
			line-height: 1.5;
			color: #212529;
		}

		.cookie-consent__title {
			margin: 0 0 8px;
			font-size: 15px;
			font-weight: 600;
			color: #001c2b;
		}

		.cookie-consent__text {
			margin-bottom: 12px;
		}

		.cookie-consent__text a {
			color: #015d91;
			text-decoration: underline;
		}

		.cookie-consent__text a:hover {
			color: #001c2b;
		}

		.cookie-consent__button {
			width: 100%;
			padding: 9px 16px;
			border: unset;
			border-radius: 100px;
			background: linear-gradient(90deg, #015d91, #001c2b);
			color: #fff;
			font-weight: 400;
			line-height: 1.5;
			cursor: pointer;
			transition: opacity .2s ease;
		}

		.cookie-consent__button:hover {
			opacity: .9;
		}

		@media (max-width: 576px) {
			.cookie-consent {
				left: 10px;
				bottom: 10px;
				max-width: calc(100% - 20px);
			}
		}
	`

	document.head.appendChild(style)

	// Создаём баннер.
	const banner = document.createElement('div')
	banner.className = 'cookie-consent'

	banner.innerHTML = `
		<div class="cookie-consent__title">
			Этот сайт использует cookie
		</div>

		<div class="cookie-consent__text">
			С вашего согласия используем аналитические cookie
			для работы сайта и статистики посещений.
			<a href="/privacy-policy/">Политика</a>.
			<a href="/consent/">Согласие</a>.
		</div>

		<button type="button" class="cookie-consent__button">
		Только необходимые
		</button>
	`

	document.body.appendChild(banner)

	// Пользователь дал согласие.
	banner.querySelector('.cookie-consent__button').addEventListener('click', function () {
		localStorage.setItem(CONSENT_KEY, 'accepted')
		banner.remove()
		loadMetrika()
	})

	// Загружает Яндекс Метрику только после согласия.
	function loadMetrika() {
		if (window.ym) {
			return
		}

		;(function (m, e, t, r, i, k, a) {
			m[i] =
				m[i] ||
				function () {
					;(m[i].a = m[i].a || []).push(arguments)
				}

			m[i].l = 1 * new Date()

			for (var j = 0; j < document.scripts.length; j++) {
				if (document.scripts[j].src === r) {
					return
				}
			}

			k = e.createElement(t)
			a = e.getElementsByTagName(t)[0]
			k.async = 1
			k.src = r
			a.parentNode.insertBefore(k, a)
		})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym')

		ym(METRIKA_ID, 'init', {
			ssr: true,
			clickmap: true,
			ecommerce: 'dataLayer',
			referrer: document.referrer,
			url: location.href,
			accurateTrackBounce: true,
			trackLinks: true,
		})
	}
})()
