#### Создате venv в корневом директории и активируйте его

- python3 -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt

#### Запуск Бэкенда:
Сперава миграция!
В директории /backend/ вводите 

- python manage.py makemigrations
- python manage.py migrate

#### Создание суперюсера
- python manage.py createsuperuser
- python manage.py runserver
