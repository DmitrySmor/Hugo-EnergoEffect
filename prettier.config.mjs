export default {
    // Плагин для Hugo / Go Templates
    plugins: ['@htnabe/prettier-plugin-go-template'],

    // 4 пробела на один уровень вложенности
    tabWidth: 4,

    // Использовать пробелы вместо Tab
    useTabs: false,

    // Одинарные кавычки в JS/TS
    singleQuote: true,

    // Не добавлять ; в конце JS/TS выражений
    semi: false,

    // Максимальная длина строки перед переносом
    printWidth: 200,

    // Сохранять пробелы внутри Go Template:
    // {{ .Title }}
    // {{ partial "header.html" . }}
    goTemplateBracketSpacing: true,

    // Hugo HTML templates
    overrides: [
        {
            files: ['*.html'],
            options: {
                parser: 'go-template',
            },
        },
    ],
}
