# Requires Python 3.6 or higher, also requires the requests module.

import requests
import json
import sys

url = str(sys.argv[1])
url1 = "http://"+url+"/php/getAllTeams.php"
url2 = "http://"+url+"/php/setTeamInfo.php?q="
print("Waiting for team data")
text = requests.get(url1).text
print("Got team data!")

while text.find(",,") != -1 or text.find("[,") != -1 or text.find(",]") != -1:
    text = text.replace(",,", ",").replace("[,", "[").replace(",]", "]")

data = json.loads(text)

for i in data:
    teamNumber = str(i["Number"])
    i["Number"] = int(i["Number"])

    inc = 0
    indexesToRemove = []
    for j in i["Matches__match"]:
        if j is not None:
            matchNumber = j["Match_Number__num"]
        else:
            matchNumber = inc + 1

        if j is None:
            indexesToRemove.insert(0, inc)

        inc += 1

    for inx in indexesToRemove:
        del i["Matches__match"][inx]

    inc = 0
    for j in i["Matches__match"]:
        matchNumber = inc + 1
        i["Matches__match"][inc]["Match_Number__num"] = matchNumber
        inc += 1

    sendData = json.dumps(i).replace("null", "0")
    print(i["Number"])

    requests.post(url2+teamNumber, data={'data': sendData})
