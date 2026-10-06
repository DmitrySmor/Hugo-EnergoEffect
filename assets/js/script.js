// Выравнивает высоту заголовков в пределах одного визуального ряда.
//
// Скрипт нужен для того, чтобы заголовки карточек имели одинаковую
// высоту независимо от количества строк текста.
//
// При изменении ширины экрана Bootstrap меняет количество колонок,
// поэтому расположение заголовков и их переносы могут измениться.
// В этом случае высота заголовков пересчитывается заново.
//
// Привязка выполняется через data-атрибут, а не через классы Bootstrap,
// поэтому изменение внешнего вида или классов не влияет на работу скрипта.

document.querySelectorAll('[data-equal-height="heading"]').forEach((heading) => {
    // Находим родительский контейнер, внутри которого находятся
    // остальные заголовки этого ряда.
    const container = heading.closest('.row')

    if (!container) {
        return
    }

    // Чтобы не инициализировать один и тот же ряд несколько раз,
    // обработку выполняем только для первого найденного заголовка.
    if (container.dataset.equalHeightInitialized) {
        return
    }

    container.dataset.equalHeightInitialized = 'true'

    const headings = container.querySelectorAll('[data-equal-height="heading"]')

    const equalize = () => {
        // Сначала сбрасываем заданную JS высоту.
        // Это необходимо, чтобы корректно пересчитать высоту
        // после изменения ширины окна.
        headings.forEach((heading) => {
            heading.style.height = ''
        })

        // Группируем заголовки по их вертикальной позиции.
        // Заголовки с одинаковым top находятся в одном визуальном ряду.
        const rows = new Map()

        headings.forEach((heading) => {
            const top = Math.round(heading.getBoundingClientRect().top)

            if (!rows.has(top)) {
                rows.set(top, [])
            }

            rows.get(top).push(heading)
        })

        // Для каждого визуального ряда находим самый высокий заголовок
        // и устанавливаем эту высоту всем заголовкам данного ряда.
        rows.forEach((items) => {
            const height = Math.max(...items.map((heading) => heading.getBoundingClientRect().height))

            items.forEach((heading) => {
                heading.style.height = `${height}px`
            })
        })
    }

    // Первоначальное выравнивание.
    equalize()

    // Пересчитываем высоту при изменении размера окна.
    window.addEventListener('resize', equalize)
})

$('.main-carousel').owlCarousel({
    loop: true,
    margin: 15,
    autoplay: true,
    nav: true,
    navText: ["<img src='./images/slide-prev.png' alt='' width='61' height='61' />", "<img src='./images/slide-next.png' alt='' width='61' height='61' />"],
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
