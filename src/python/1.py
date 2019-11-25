import json
import sys

def myfunc(x):
    return [i for i in range(0,x)]

with open('response.json','w') as files: 
    json.dump(myfunc(int(sys.argv[1])),files)