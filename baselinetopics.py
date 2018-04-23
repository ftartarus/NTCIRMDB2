import os,shutil

path='/home/lingo/htmlfiles/'
txtfile=open('/home/fanyimeng/ntcir/NTCIRMDB2/docid.txt') ## docid.text path
wrongmsg=open('/home/fanyimeng/ntcir/NTCIRMDB2/wrongmsg.txt','w')
while True:
    line=txtfile.readline()[:30]
    if not line:
        print 'finish'
        break
    mark=line[10:12]
    try:
     shutil.copy(path+'ClueWeb12_'+mark+'/'+line,'/home/fanyimeng/ntcir/NTCIRMDB2/assessment/templates/'+mark+'/'+line)
    except:
     wrongmsg.write(mark+' '+line+"\n")
wrongmsg.close()