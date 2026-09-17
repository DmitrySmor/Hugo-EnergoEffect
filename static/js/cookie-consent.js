;(function () {
	const METRIKA_ID = 112375368
	const CONSENT_KEY = 'cookieConsent'

	// Статусы: 'accepted' | 'rejected'
	const stored = localStorage.getItem(CONSENT_KEY)

	// Если выбор уже сделан — баннер не показываем.
	// 'accepted' → грузим счётчики; 'rejected' → ничего не грузим.
	if (stored) {
		if (stored === 'accepted') {
			loadAnalytics()
		}
		return
	}

	// Стили баннера.
	const style = document.createElement('style')
	style.textContent = `
		.cookie-consent {
			position: fixed;
			z-index: 9999;
			left: 20px;
			bottom: 20px;
			width: 360px;
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

		/* Две кнопки одинакового размера и заметности. */
		.cookie-consent__actions {
			display: flex;
			gap: 8px;
		}

		.cookie-consent__btn {
			flex: 1 1 50%;
			padding: 9px 16px;
			border: unset;
			border-radius: 100px;
			font-weight: 400;
			line-height: 1.5;
			cursor: pointer;
			transition: opacity .2s ease;
			color: #fff;
			background: linear-gradient(90deg, #015d91, #001c2b);
		}

		.cookie-consent__btn:hover {
			opacity: .9;
		}

		/* Кнопка отказа — такая же заметная, без «тёмного паттерна». */
		.cookie-consent__btn--reject {
			background: linear-gradient(90deg, #6c757d, #343a40);
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
			<a href="/privacy_policy/">Политика</a>.
			<a href="/terms_of_service/">Согласие</a>.
		</div>

		<div class="cookie-consent__actions">
			<button type="button" class="cookie-consent__btn cookie-consent__btn--accept">
				Принять
			</button>
			<button type="button" class="cookie-consent__btn cookie-consent__btn--reject">
				Отказаться
			</button>
		</div>
	`

	document.body.appendChild(banner)

	// «Принять» — активное действие, запоминаем и грузим счётчики.
	banner.querySelector('.cookie-consent__btn--accept').addEventListener('click', function () {
		localStorage.setItem(CONSENT_KEY, 'accepted')
		banner.remove()
		loadAnalytics()
	})

	// «Отказаться» — тоже активное действие, ничего не грузим.
	banner.querySelector('.cookie-consent__btn--reject').addEventListener('click', function () {
		localStorage.setItem(CONSENT_KEY, 'rejected')
		banner.remove()
	})

	// Загружает все счётчики только после согласия.
	function loadAnalytics() {
		loadMetrika()
		loadForeignCounters()
	}

	// Яндекс Метрика (можно отнести к «необходимым для работы сайта»,
	// но по требованию грузим только после согласия).
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

	// Иностранные счётчики (Google Analytics, Hotjar, Meta Pixel).
	// Загружаются ТОЛЬКО после явного согласия. При отказе — не грузятся.
	function loadForeignCounters() {
		// Пример: Google Analytics 4.
		// Раскомментируйте и подставьте свой ID.
		//
		// const GA_ID = 'G-XXXXXXXXXX'
		// const ga = document.createElement('script')
		// ga.async = true
		// ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
		// document.head.appendChild(ga)
		//
		// window.dataLayer = window.dataLayer || []
		// function gtag() { dataLayer.push(arguments) }
		// window.gtag = gtag
		// gtag('js', new Date())
		// gtag('config', GA_ID)
		// Пример: Meta Pixel.
		// !(function (f, b, e, v, n, t, s) {
		// 	if (f.fbq) return
		// 	n = f.fbq = function () {
		// 		n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
		// 	}
		// 	if (!f._fbq) f._fbq = n
		// 	n.push = n
		// 	n.loaded = !0
		// 	n.version = '2.0'
		// 	n.queue = []
		// 	t = b.createElement(e)
		// 	t.async = !0
		// 	t.src = v
		// 	s = b.getElementsByTagName(e)[0]
		// 	s.parentNode.insertBefore(t, s)
		// })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
		// fbq('init', 'YOUR_PIXEL_ID')
		// fbq('track', 'PageView')
		// Пример: Hotjar.
		// (function (h, o, t, j, a, r) {
		// 	h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) }
		// 	h._hjSettings = { hjid: YOUR_HOTJAR_ID, hjsv: 6 }
		// 	a = o.getElementsByTagName('head')[0]
		// 	r = o.createElement('script')
		// 	r.async = 1
		// 	r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
		// 	a.appendChild(r)
		// })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
	}

	// Публичный API для управления согласием в любой момент.
	// Пример: window.cookieConsent.revoke()  — отозвать согласие
	//          window.cookieConsent.reset()   — показать баннер заново
	//          window.cookieConsent.status()  — узнать текущий статус
	window.cookieConsent = {
		status: function () {
			return localStorage.getItem(CONSENT_KEY)
		},
		revoke: function () {
			localStorage.setItem(CONSENT_KEY, 'rejected')
			// Перезагрузка нужна, чтобы уже загруженные счётчики
			// перестали слать хиты (проще всего — reload).
			location.reload()
		},
		reset: function () {
			localStorage.removeItem(CONSENT_KEY)
			location.reload()
		},
	}
})()
