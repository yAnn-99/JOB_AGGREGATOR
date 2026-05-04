import psycopg2 
from dotenv import load_dotenv
import os

load_dotenv()
secret = os.getenv("SECRET")
url = os.getenv("URL")

print(url)

cnx = psycopg2.connect(url) 

cur = cnx.cursor()

cur.execute("SELECT CURRENT_DATE")

row = cur.fetchone()
print("Current date is: {0}".format(row[0]))

cur.close()
cnx.close()