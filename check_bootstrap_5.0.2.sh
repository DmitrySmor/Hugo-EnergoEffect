#!/usr/bin/env bash
# Точная проверка использования компонентов Bootstrap 5.0.2
# Ищет CSS-классы в HTML-шаблонах и markdown-контенте

echo "================================================"
echo " Проверка компонентов Bootstrap в проекте"
echo "================================================"
echo

# Список компонентов и их ключевых классов/атрибутов
# Формат: имя | regex для поиска
declare -a components=(
    "accordion|class=\"[^\"]*\\baccordion\\b"
    "alert|class=\"[^\"]*\\balert\\b"
    "badge|class=\"[^\"]*\\bbadge\\b"
    "breadcrumb|class=\"[^\"]*\\bbreadcrumb\\b"
    "card|class=\"[^\"]*\\bcard\\b"
    "carousel|class=\"[^\"]*\\bcarousel\\b"
    "collapse|class=\"[^\"]*\\bcollapse\\b|data-bs-toggle=\"collapse\""
    "dropdown|class=\"[^\"]*\\bdropdown\\b|data-bs-toggle=\"dropdown\""
    "forms|class=\"[^\"]*\\bform-(control|select|check|label|floating)\\b"
    "list-group|class=\"[^\"]*\\blist-group\\b"
    "modal|class=\"[^\"]*\\bmodal\\b|data-bs-toggle=\"modal\""
    "nav|class=\"[^\"]*\\bnav\\b"
    "navbar|class=\"[^\"]*\\bnavbar\\b"
    "offcanvas|class=\"[^\"]*\\boffcanvas\\b|data-bs-toggle=\"offcanvas\""
    "pagination|class=\"[^\"]*\\bpagination\\b"
    "placeholder|class=\"[^\"]*\\bplaceholder\\b"
    "popover|data-bs-toggle=\"popover\""
    "progress|class=\"[^\"]*\\bprogress\\b"
    "spinner|class=\"[^\"]*\\bspinner-"
    "table|class=\"[^\"]*\\btable\\b"
    "toast|class=\"[^\"]*\\btoast\\b"
    "tooltip|data-bs-toggle=\"tooltip\""
    "close-button|class=\"[^\"]*\\bbtn-close\\b"
)

for item in "${components[@]}"; do
    name="${item%%|*}"
    pattern="${item#*|}"

    count=$(grep -rEio "${pattern}" layouts/ content/ 2>/dev/null | wc -l)

    if [ "$count" -gt 0 ]; then
        printf "✅ %-16s используется (%d вхождений)\n" "$name" "$count"
    else
        printf "❌ %-16s НЕ используется\n" "$name"
    fi
done

echo
echo "================================================"
echo " Примечания:"
echo "  - 'carousel' может быть и Owl Carousel, и Bootstrap"
echo "  - 'collapse' ищет и class, и data-bs-toggle"
echo "  - 'forms' ищет form-control/select/check/label/floating"
echo "================================================"
