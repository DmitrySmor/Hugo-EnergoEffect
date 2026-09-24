// ============================================================
// PostCSS: PurgeCSS (удаление неиспользуемых стилей) + Autoprefixer
// ============================================================
// Формат файла — ESM (.mjs), потому что PurgeCSS v8
// экспортирует плагин как ES-модуль. CommonJS (require)
// с ним не работает.
// ============================================================

// Autoprefixer — автоматически добавляет вендорные префиксы
// (-webkit-, -moz-, -ms-) для поддержки старых браузеров.
// Список браузеров берётся из файла .browserslistrc.
import autoprefixer from 'autoprefixer';

// PurgeCSS — удаляет из CSS все правила, которые не встречаются
// в HTML. Источник данных — hugo_stats.json, который Hugo
// генерирует при сборке (см. [build.buildStats] в hugo.toml).
//
// В v8.0.0 используется default export — поэтому просто
// import purgeCSSPlugin from '...'.
import purgeCSSPlugin from '@fullhuman/postcss-purgecss';

// Инициализация PurgeCSS с настройками.
const purgecss = purgeCSSPlugin({
  // Источник: файл со списком всех тегов, классов и ID,
  // которые реально встречаются в HTML-шаблонах.
  // Hugo создаёт его при сборке, если включён buildStats.
  content: ['./hugo_stats.json'],

  // Извлекаем из JSON теги, классы и ID в один плоский массив.
  // PurgeCSS сверяет с ним правила в CSS и удаляет лишние.
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [
      ...(els.tags || []),
      ...(els.classes || []),
      ...(els.ids || [])
    ];
  },

  // safelist — классы, которые НЕЛЬЗЯ удалять, даже если их нет
  // в HTML. Нужны для классов, которые добавляет JavaScript
  // динамически (Bootstrap JS, Owl Carousel, ваш script.js).
  //
  // Пока пустой — заполняйте по мере необходимости, если
  // после сборки что-то пропадёт.
  safelist: {
    standard: [],
    deep: [],
    greedy: [
        /owl-/,
        /^active$/
      ],
    keyframes: [],
    variables: []
  }
});

// Экспорт конфигурации для PostCSS.
export default {
  plugins: [
    // PurgeCSS запускается ТОЛЬКО в production-сборке.
    // В dev-режиме (hugo server) пропускается — иначе Hugo
    // не успеет сгенерировать hugo_stats.json, и PurgeCSS
    // удалит всё подряд.
    //
    // process.env.HUGO_ENVIRONMENT === 'development' → пропускаем.
    // Иначе (production, CI) → включаем.
    process.env.HUGO_ENVIRONMENT !== 'development' ? purgecss : null,

    // Autoprefixer запускается всегда — он безопасен.
    autoprefixer,
  ].filter(Boolean) // убираем null из массива, если PurgeCSS отключён
};
