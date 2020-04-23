import cx_Oracle as o
from datetime import datetime
dsn = o.makedsn("localhost","1521")
con = o.connect(user="system", password="H9G26XZt",dsn=dsn)

c = con.cursor()
c.execute("select * from employee")

for row in c:
    print(row[0])
t='2019/09/01 8:30:25'
s='VACANT'
i='python'
from datetime import datetime

t_object=datetime.strptime(t,'%Y/%m/%d %H:%M:%S')
print(t_object)

message =''
c.callproc('insertStatus',[t_object,s,i,message])
print(message)
c.close()
