f = open("/Users/Fan/Downloads/Eruns.pd30.sortpool.catpool")
count1 = 1
count2 = 1
with open('/Users/Fan/Downloads/NTCIRMDB2/document.txt','w') as s:
  for line in f:
    topicid=int(line.split(' ')[0])
    if topicid == count1:
        content = line.strip('\n')+" "+str(count2)+"\n"

    else:
        count1+=1
        count2=1
        content = line.strip('\n') + " " + str(count2) + "\n"

    s.write(content)
    count2 += 1
s.close()
f.close()