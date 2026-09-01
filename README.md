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
