
#Get real time packing meter's occupancy state and store it to Oracle database


import requests
import json
import pandas as pd
from datetime import datetime
import cx_Oracle as o
import os

occupid_api = 'https://data.lacity.org/resource/e7h6-4a3e.json'
occupid_data = requests.get(occupid_api).json()
df_occ = pd.DataFrame(occupid_data)

def d(input_format):
  temp = input_format.replace('T',' ')
  temp = temp[:-4]
  t_object=datetime.strptime(temp,'%Y-%m-%d %H:%M:%S')
  return t_object

df_occ['eventtime'] = df_occ['eventtime'].apply(d)

# dsn = o.makedsn("localhost","1521")
# con = o.connect(user="system", password="",dsn=dsn)

path =os.getcwd()
print(path)
os.environ['TNS_ADMIN'] = "/test/Wallet_LAPARKING"
con = o.connect("ADMIN","",'laparking_medium')

c = con.cursor()

recordTypeObj = con.gettype("LAPARKING.R_STATUS")
tableTypeObj = con.gettype("LAPARKING.INPUTSTATUS")
tab = tableTypeObj.newobject()

rec_test = recordTypeObj.newobject()
for index, row in df_occ.iterrows():



   rec = recordTypeObj.newobject()
   rec.EVENTTIME = row['eventtime']
   rec.OCCUPANCYSTATE = row['occupancystate']
   rec.SPACEID = row['spaceid']
   tab.append(rec)


c.callproc('laparking.insertStatus_table',[tab])

c.close()
