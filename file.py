import warc

f=warc.open('/Users/Fan/Downloads/0000tw-00.warc.gz')
i=0
for record in f:
   h = record.header
   print h