import psycopg2 
from dotenv import load_dotenv
import os

load_dotenv()
url = os.getenv("URL")

cnx = psycopg2.connect(url) 

cur = cnx.cursor()

cur.execute('SELECT * FROM "user"')

row = cur.fetchone()
print(row)

cur.close()
cnx.close()