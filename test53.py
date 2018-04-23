f = open("topic53.txt")
for line in f:
    topic_id = line.split(" ")[0]
    # topname = lst[int(topic_id)-1]
    topname="absolute neutrophils"
    title = line.split(" ")[1]
    title_id = line.split(" ")[2].strip('\n')
    print(title_id)