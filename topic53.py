import pymongo
from assessment.models import *


con = pymongo.Connection('localhost', 27017)

ntcir = con.ntcir
topic = ntcir.ntcir
topiclist = ntcir.table

# f = open('queries.txt')
# lst=[]
# for line in f:
#     line = line.strip('\n')
#     lst.append(str(line))
# f.close()

f = open("topic53_2.txt")
for line in f:
    topic_id = line.split(" ")[0]
    # topname = lst[int(topic_id)-1]
    topname="absolute neutrophils"
    title = line.split(" ")[1]
    title_id = line.split(" ")[2].strip('\n')
   # print str(int(topic_id)),topic,title,title_id
    topic.insert({'topic_id': str(int(topic_id)), 'topic': str(topname), 'title_id': str(title_id), 'title': str(title),'url': str(title) + '.html'})
f.close()