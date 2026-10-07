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

// Находим все заголовки, высоту которых нужно выровнять.
// data-атрибут используется специально для JS и не зависит от классов Bootstrap.
const headings = document.querySelectorAll('[data-equal-height="heading"]')

const equalizeHeadings = () => {
    // Сначала сбрасываем установленную JS высоту.
    // Это важно при изменении ширины окна: текст может начать занимать
    // меньше или больше строк, поэтому высоту нужно пересчитать заново.
    headings.forEach((heading) => {
        heading.style.height = ''
    })

    // Находим высоту самого высокого заголовка.
    // offsetHeight возвращает фактическую высоту элемента в пикселях.
    const height = Math.max(...Array.from(headings, (heading) => heading.offsetHeight))

    // Устанавливаем одинаковую высоту всем заголовкам.
    // Благодаря этому текст и контент под заголовками начинаются на одном уровне.
    headings.forEach((heading) => {
        heading.style.height = `${height}px`
    })
}

// Выравниваем заголовки сразу после загрузки страницы.
equalizeHeadings()

// При изменении ширины окна Bootstrap меняет количество колонок,
// а текст может переноситься на другое количество строк.
// Поэтому высоту заголовков пересчитываем заново.
window.addEventListener('resize', equalizeHeadings)

//
// Начало слайдера
//
const carousel = document.querySelector('[data-administration-carousel]')
const prev = document.querySelector('[data-administration-prev]')
const next = document.querySelector('[data-administration-next]')

if (carousel && prev && next) {
    const total = carousel.children.length

    const breakpoints = [
        { minWidth: 1200, visible: 4 },
        { minWidth: 992, visible: 3 },
        { minWidth: 576, visible: 2 },
        { minWidth: 0, visible: 1 },
    ]

    let index = 0
    let startX = 0
    let isDragging = false

    const getVisible = () => {
        return breakpoints.find(({ minWidth }) => window.innerWidth >= minWidth).visible
    }

    const update = () => {
        const visible = getVisible()
        const maxIndex = Math.max(total - visible, 0)

        index = Math.min(index, maxIndex)

        carousel.style.setProperty('--administration-visible', visible)

        carousel.style.setProperty('--administration-index', index)
    }

    const nextSlide = () => {
        const visible = getVisible()
        const maxIndex = Math.max(total - visible, 0)

        if (index >= maxIndex) {
            return
        }

        index++

        update()
    }

    const prevSlide = () => {
        if (index <= 0) {
            return
        }

        index--

        update()
    }

    next.addEventListener('click', nextSlide)
    prev.addEventListener('click', prevSlide)

    /*
     * Начало свайпа.
     */
    carousel.addEventListener('pointerdown', (event) => {
        startX = event.clientX
        isDragging = true
    })

    /*
     * Завершение свайпа.
     */
    carousel.addEventListener('pointerup', (event) => {
        if (!isDragging) {
            return
        }

        const distance = event.clientX - startX

        isDragging = false

        // Слишком короткое движение не считаем свайпом.
        if (Math.abs(distance) < 50) {
            return
        }

        if (distance < 0) {
            nextSlide()
        } else {
            prevSlide()
        }
    })

    carousel.addEventListener('pointercancel', () => {
        isDragging = false
    })

    window.addEventListener('resize', update)

    update()
}
