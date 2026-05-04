import daemon
import time
import requests
from hello import fetch

def run_daemon_logic():
    while True:
        try : 

            data = fetch()
            payload = {
                "id" : data[1],
                "email" : data[2],
                "password" : data[3],
                "lastname" : data[4],
                "firstname" : data[5]
            }
            response = requests.post("https://localhost:3000/test/py" , json=payload)

            print(response.status.code)
        except Exception as error :
            print(error)
        time.sleep(30)

with daemon.DaemonContext():
    run_daemon_logic()



