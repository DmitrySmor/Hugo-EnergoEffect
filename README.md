# Сайт компании ООО «Энерго Эффект»

Описание компании

## Добавление странцы на сайт

### Новости

Скопировать директорию:

```
./archetypes/0_to_copy_news -> ./content/news/
```

команда:

```bash
cp -a ./archetypes/0_to_copy_news ./content/news/new_post
```

### Партнеров

Скопировать директорию:

```
./archetypes/0_to_copy_news -> ./content/partner/
```

команда:

```bash
cp -a ./archetypes/0_to_copy_news ./content/partner/new_partner
```

### Описание структуры страницы:

```
1_to_copy_news          <- Директория страницы с ее содержимым и файлами
├── images              <- Фото для слайдов (сорировка сладов в алфовитном порядке по названию)
├── index.md            <- Контент страницы
└── preview.webp        <- Превью страницы
```

В корень директории при необходимости добавляються все файлы которые используются на странице

### Убрать страницу из поиска через robots.txt

В front matter нужных страниц добавьте параметр `disallow: true`:

```
disallow = true # Страница, которую нужно скрыть
```

### Настройка IndexNow для GitHub Pages

Для работы с IndexNow необходимо просто заменить значение переменной `INDEXNOW_KEY` в секретах GitHub Actions.
Больше ничего делать ну не надо.

'GitHub → Repository → Settings → Secrets and variables → Actions → Secrets'

```
Secrets
└── INDEXNOW_KEY
    └── 42e02184e285e8a4d0a

Variables
└── SITE_URL
    └── energo-effect.pro
```

## SEO

### Инструменты аудита и проверки

| Инструмент                | Назначение                                                                   | Ссылка                                  |
| ------------------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| Google PageSpeed Insights | Скорость загрузки, Core Web Vitals (LCP, INP), мобильная и десктопная версии | https://pagespeed.web.dev/              |
| whois7.ru                 | История домена, дата регистрации                                             | https://whois7.ru/                      |
| Web Archive               | Первый снимок сайта, история изменений                                       | https://web.archive.org/                |
| SSL Labs                  | Безопасность HTTPS-соединения (оценка A)                                     | https://www.ssllabs.com/ssltest/        |
| page-speed.ru             | Проверка работы HTTP/2                                                       | https://page-speed.ru/tools/http2/      |
| Geekflare HTTP/3 Test     | Проверка работы HTTP/3                                                       | https://geekflare.com/tools/http3-test/ |
| Coolakov.ru               | Проверка зеркал сайта и редиректов                                           | https://coolakov.ru/tools/ping/         |
| Яндекс.Вебмастер          | Проверка мобильной версии, аудит страниц                                     | https://webmaster.yandex.ru/            |

## Замена фоновой картинки баннера

При смене фонового изображения баннера нужно обновить **три места**, иначе preload и CSS разойдутся, и картинка загрузится дважды.

### 1. CSS — путь к файлу

```css
@media (max-width: 540px) {
    .section-bg-1 .container {
        background-image: linear-gradient(#00000000, #0000009e),
                          url('../images/НОВЫЙ-ФАЙЛ-540.webp');
    }
}

.section-bg-1 .container {
    background-image: linear-gradient(#00000000, #0000009e),
                      url('../images/НОВЫЙ-ФАЙЛ.webp');
}
```

### 2. `<link rel="preload">` — атрибут `href`

```html
href="{{ `images/НОВЫЙ-ФАЙЛ.webp` | absURL }}"
```

### 3. `<link rel="preload">` — атрибут `imagesrcset`

Указать **новые URL и реальные ширины** файлов в пикселях:

```html
imagesrcset="{{ `images/НОВЫЙ-ФАЙЛ.webp` | absURL }} ШИРИНА_w,
             {{ `images/НОВЫЙ-ФАЙЛ-540.webp` | absURL }} ШИРИНА_w"
```

### ⚠️ Что менять НЕ нужно

- **`imagesizes`** — если брейкпоинты (`540px`, `720px` и т.д.) остались прежними.
- **Структуру `<link>`** — тег остаётся один, с `imagesrcset` и `imagesizes`.

### 📋 Чек-лист

- [ ] CSS `background-image` → новый URL (для всех брейкпоинтов)
- [ ] `<link>` `href` → новый URL основного файла
- [ ] `<link>` `imagesrcset` → новые URL + реальные ширины
- [ ] Проверить, что брейкпоинты в CSS и `imagesizes` совпадают
- [ ] Проверить в DevTools → Network, что грузится **один** файл, а не два

### 💡 Совет

Чтобы не править три места каждый раз, можно вынести путь и ширины в переменные Hugo (например, в `params.toml` или front matter страницы). Тогда замена картинки = правка одного места в шаблоне.
