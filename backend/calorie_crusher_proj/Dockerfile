FROM python:3.12-slim

WORKDIR /app

RUN pip install --upgrade pip

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "calorie_crusher_proj.wsgi", "--bind", "0.0.0.0:8000"]