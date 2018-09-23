from flask import Flask, render_template, request
from flask_socketio import SocketIO,join_room, leave_room,send
import uuid
import json
from server import helper

app = Flask(__name__)
socketio = SocketIO(app)
game_repo = helper.GameRepo()


@app.route('/')
def index():
    return render_template('index.html')


def new_game():
    game_id = str(uuid.uuid4())
    game = helper.Game()
    game_repo.add_game(game_id, game)
    return game_id


@app.route('/game')
def start_game():
    game_id = request.args.get('id', '')
    # first person to join
    if (game_id == ''):
        game_id = new_game()
    else:
        if not game_repo.check_id(game_id):
            game_id = 'error'
    return game_id


@socketio.on('join')
def on_join(message):
    room=message
    join_room(room)
    print(message + ' has entered the room.')
    send(message + ' has entered the room.', room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True)
