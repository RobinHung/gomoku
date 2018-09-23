from flask import Flask, render_template, request
from flask_socketio import SocketIO,join_room, leave_room,send,emit
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


@app.route('/game',methods=['POST'])
def start_game():
    game_id = request.args.get('id', '')
    print('detected id: '+game_id)
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

@socketio.on('play')
def on_play(move):
    id=move['id']
    color=move['color']
    row=move['row']
    column=move['column']
    cur_game=game_repo.get_game(id)
    if(cur_game.move(color,row,column)):
        response_dict={}
        response_dict['color']=color
        response_dict['row']=row
        response_dict['column']=column
        emit('draw',json.dumps(response_dict),json=True,room=id)
        if cur_game.judge(color):
            emit('finish',str('black' if color else 'white'),room=id)

if __name__ == '__main__':
    socketio.run(app)
