# comp231-402-Team2-W24
Noteflow Application


# Steps to run

Setup env variables before running locally

create a file with name `.env` inside `server` directory
add below variables and their values inside `.env` file
```
MONGO_URL = "mongodb://localhost:27017/<database>"
PORT = 4000
TOKEN_KEY = "neel_secret_key"
```


Open terminal 
```
cd server
npm install
npm start
```

Open another terminal 
```
cd client
npm install
npm start
```
Open below URL to see application running locally - 
http://localhost:3000/
