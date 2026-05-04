FROM python

WORKDIR /app

RUN  python -m venv venv

ENV PATH="/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python" , "hello.py"]