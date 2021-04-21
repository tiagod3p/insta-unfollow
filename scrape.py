import json

file = open('env.json')
account = json.load(file)
file.close()

username = account['user']
password = account['password']

