FROM python:3.11-bullseye

RUN apt update && apt install -yq openssl

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV ELKI-DBURL="sqlite+aiosqlite:///db\\app.db"
ENV ELKI-FILEDIR="/files"
RUN echo "ACCESS_TOKEN_EXPIRE_MINUTES = 10080" >> secret.py
RUN echo "ALGORITHM = 'HS256'" >> secret.py
RUN echo "SECRET_KEY = '$(openssl rand -hex 32)'" >> secret.py

VOLUME db

EXPOSE 8000

CMD ["python", "./main.py"]