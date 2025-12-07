FROM python

WORKDIR /project

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

CMD ["find", "/project", "-type", "f", "-name", "*.py"]