import warc
from assessment.models import *
import mongoengine
import pymongo

#mongoengine.connect(db=ntcir)
con = pymongo.Connection('localhost', 27017)

ntcir = con.ntcir
topic=ntcir.ntcir
table=ntcir.table

table.insert({'table_id':'1','table':'dog'})
table.insert({'table_id':'2','table':'cat'})
table.insert({'table_id':'3','table':'mouse'})

f=warc.open('/Users/Fan/Downloads/0000tw-00.warc.gz')
i=0
for record in f:
   h = record.header
   test = record.payload.read()
   WARC_Trec_ID = h.get("WARC-Trec-ID")
   i += 1
   if i > 1:
    filepath='/Users/Fan/Downloads/NTCIRMDB2/assessment/templates/'+ str(WARC_Trec_ID)+'.html'
    with open(filepath,'w') as d:
        d.write(test)
        d.close()
    topic.insert({'topic_id':'1','topic':'dog','title_id':str(i-1),'title':str(WARC_Trec_ID),'url':str(WARC_Trec_ID)+'.html'})



f=warc.open('/Users/Fan/Downloads/0000wb-00.warc.gz')
i=0
for record in f:
   h = record.header
   test = record.payload.read()
   WARC_Trec_ID = h.get("WARC-Trec-ID")
   i += 1
   if i > 1:
    filepath='/Users/Fan/Downloads/NTCIRMDB2/assessment/templates/'+ str(WARC_Trec_ID)+'.html'
    with open(filepath,'w') as d:
        d.write(test)
        d.close()
    topic.insert({'topic_id':'2','topic':'cat','title_id':str(i-1),'title':str(WARC_Trec_ID),'url':str(WARC_Trec_ID)+'.html'})

f=warc.open('/Users/Fan/Downloads/0000wt-00.warc.gz')
i=0
for record in f:
   h = record.header
   test = record.payload.read()
   WARC_Trec_ID = h.get("WARC-Trec-ID")
   i += 1
   if i > 1:
    filepath='/Users/Fan/Downloads/NTCIRMDB2/assessment/templates/'+ str(WARC_Trec_ID)+'.html'
    with open(filepath,'w') as d:
        d.write(test)
        d.close()
    topic.insert({'topic_id':'3','topic':'mouse','title_id':str(i-1),'title':str(WARC_Trec_ID), 'url':str(WARC_Trec_ID)+'.html'})
