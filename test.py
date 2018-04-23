import warc

f=warc.open('/home/tamaki/corpus/DiskB/ClueWeb12_08/0817wb/0817wb-49.warc.gz')
i=0
for record in f:
   h = record.header
   test = record.payload.read()
   WARC_Trec_ID = h.get("WARC-Trec-ID")
   i += 1
   if i > 1:
    filepath='/home/fanyimeng/test/'+ str(WARC_Trec_ID)+'.html'
    with open(filepath,'w') as d:
        d.write(test)
        d.close()