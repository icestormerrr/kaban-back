# KABAN

Kaban - это инструмент управления проектами, который помогает команде получать информацию о задачах, а менеджеру отслеживать их выполнение.

# Деплой
1. Склонируйте репозиторий:
   - git clone
2. Добавьте в корень проекта .env файл, пример содержания:
   - PORT=4000
   DB_URL=mongodb://mongodb:27017/kaban
   CLIENT_URL=http://localhost:3000
   JWT_ACCESS_SECRET_KEY=some-secret-key-1
   JWT_REFRESH_SECRET_KEY=some-secret-key-2
3. Запустите docker-compose:
   - docker-compose up -d

# Локальная разработка

1. Убедитесь, что на вашем компьютере установлен Node.js и MongoDB.
2. Склонируйте репозиторий:
    - git clone
3. Создайте в корне .env файл, пример содержания:
   - PORT=4000
   DB_URL=mongodb://localhost:27017/kaban
   CLIENT_URL=url-of-frontend-application
   JWT_ACCESS_SECRET_KEY=some-secret-key-1
   JWT_REFRESH_SECRET_KEY=some-secret-key-2
4. Установите зависимости:
   - npm install
5. Запустите проект:
   - npm run dev
