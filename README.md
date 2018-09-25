# Five-In-A-Row game

Lab-01 for Web Security Fall 2018 @ JHU (EN.601.640)

In this repo, there will be three stages of the game

1. Local Javascript client
2. A Web Server coordinating two Javascript clients
3. Play with an AI :)

## How to run the app

### Local javascritp client:

In `Local` folder, open `index.html` in any browser, then you can play the game!

### Server-Client Game:

- Required python package: `flask`, `flask_socketio`, `eventlet`

```bash
# Create new virtual environment
$ virtualenv --python python3 venv

# Launch virtual environment
$ source venv/bin/activate

# go to our folder named **server**
$ cd five-in-a-row/server

# Install required packages using pip
$ pip install --upgrade -r requirements.txt

# Launch the app!
$ python -m flask run
```

Now, open up and browser and enter `localhost:5000`

**Things to noticed regarding the game**:

- The first player only need to type in `localhost:5000`, and our server will assign an random _RoomID_ for you.
- When second player is going to join the game, he/she needs to know the _RoomID_ in order to join the same game. So just copy and paste the url from the first player.

The url should looks like this:
`localhost:5000/#YOUR_GAME_ID`

For example, `http://localhost:5000/#aaca3068-87eb-4dc2-bd97-f80e22da2f02`

- When starting to play the game, the first-joined player will be the BLACK chess, and he/she is responsible for moving the chess FIRST!

BTW, cheating is not allowed in our game! Enjoy the game :)
