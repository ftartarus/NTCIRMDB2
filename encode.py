import  chardet


htmlfile = open('/Users/Fan/Downloads/clueweb12-0404wb-24-04919.html', 'r')
htmlpage = htmlfile.read()
if chardet.detect(htmlpage)['encoding'] != 'utf-8':
  file = open('/Users/Fan/Downloads/test.html', 'wb')
  print chardet.detect(htmlpage)['encoding']
  html_string=htmlpage.decode('latin1').encode('utf-8')
  file.write(html_string)
  file.close()