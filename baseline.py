import pymongo
from assessment.models import *


con = pymongo.Connection('localhost', 27017)

ntcir = con.ntcir
topic = ntcir.ntcir
topiclist = ntcir.table

f = open('queries.txt')
i=1
for line in f:
    line = line.strip('\n')
   # print line
    topiclist.insert({"table_id":str(i),"table":line})
    i+=1
f.close()