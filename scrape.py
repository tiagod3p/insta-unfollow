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

following = list(
    map(lambda x: x.username, list(profile.get_followees())))

followers = list(
    map(lambda x: x.username, list(profile.get_followers())))

## used reversed to list from olders to newers
dont_follow_back = list(reversed(list(filter(lambda username: username not in followers, following))))