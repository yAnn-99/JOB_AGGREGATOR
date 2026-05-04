import psycopg2 
from dotenv import load_dotenv
import os


def fetch():
    load_dotenv()
    url = os.getenv("URL")

    cnx = psycopg2.connect(url)

    cur = cnx.cursor()

    cur.execute('SELECT * FROM "user"')

    row = cur.fetchone()

    cur.close()
    cnx.close()
    return row


