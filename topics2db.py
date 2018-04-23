import pymongo



con = pymongo.Connection('localhost', 27017)

ntcir = con.ntcir
topic = ntcir.ntcir
topiclist = ntcir.table
usr=ntcir.usr

matrix = [[0 for i in range(201)] for i in range(400)]
d1=open('/Users/Fan/Desktop/codes/NTCIRMDB2/document.txt')
for line in d1:
    a=line.strip('\n').split(' ')
    matrix[int(a[2])][int(a[0])]=a[1]
d1.close()

f=open('/Users/Fan/Desktop/assessment_result.csv','w')
for line in usr.find():
    usrid=line['usrid']
    docid=line['docid']
    topicid=line['topicid']
    val=line['val']
    docname =matrix[int(docid)][int(topicid)]
    s=usrid+','+topicid+','+docname+','+val+'\n'
    f.write(s)

f.close()

# f = open('queries.txt')
# lst=[]
# for line in f:
#     line = line.strip('\n')
#     lst.append(str(line))
# f.close()
#
# f = open("exdocument.txt")
# for line in f:
#     topic_id = line.split(" ")[0]
#     topname = lst[int(topic_id)-101]
#     title = line.split(" ")[1]
#     title_id = line.split(" ")[2].strip('\n')
#    # print str(int(topic_id)),topic,title,title_id
#     topic.insert({'topic_id': str(int(topic_id)), 'topic': str(topname)+'#', 'title_id': str(title_id), 'title': str(title),'url': str(title) + '.html'})
# f.close()
# for i in range(1,201):
#     if i<=100:
#         topiclist.insert({'table':str(lst[i-1]),'table_id':str(i)})
#     elif i%2==0:
#         topiclist.insert({'table': str(lst[i - 101])+'#', 'table_id': str(i)})
