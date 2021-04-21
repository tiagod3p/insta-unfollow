import instaloader
import json

file = open('env.json')
account = json.load(file)
file.close()

username = account['user']
password = account['password']

L = instaloader.Instaloader()
L.login(username, password)
profile = instaloader.Profile.from_username(L.context, username)