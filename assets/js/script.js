/**
 * Выравнивает высоту заголовков карточек.
 *
 * Изменения:
 * - пересчёт объединяется через requestAnimationFrame;
 * - стили сначала сбрасываются у всех заголовков;
 * - размеры считываются одним последовательным проходом;
 * - новые высоты назначаются после завершения измерений.
 */

const headings = document.querySelectorAll('[data-equal-height="heading"]')

let headingFrame = null

const equalizeHeadings = () => {
    // Не запускаем несколько пересчётов в одном кадре.
    if (headingFrame !== null) {
        return
    }

    headingFrame = requestAnimationFrame(() => {
        headingFrame = null

        if (headings.length === 0) {
            return
        }

        // Сначала сбрасываем все заданные ранее высоты.
        headings.forEach((heading) => {
            heading.style.height = ''
        })

        // Затем измеряем элементы.
        // Браузеру может потребоваться один пересчёт layout
        // после сброса высот, но не отдельный для каждого элемента.
        let maxHeight = 0

        headings.forEach((heading) => {
            maxHeight = Math.max(maxHeight, heading.offsetHeight)
        })

        // После измерений применяем общую высоту.
        headings.forEach((heading) => {
            heading.style.height = `${maxHeight}px`
        })
    })
}

// Первоначальное выравнивание.
equalizeHeadings()

// Пересчёт при изменении размеров окна.
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
