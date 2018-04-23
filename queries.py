from bs4 import BeautifulSoup

soup = BeautifulSoup(open('queries.html'))

queries = soup.find_all("content")
with open('/Users/Fan/Downloads/NTCIRMDB2/assessment/queries.txt','w') as f:
    for string in queries:
      #  print string.string
        s = str(string.string + "\n")
        f.write(s)
f.close()
