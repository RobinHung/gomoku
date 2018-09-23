from flask import Flask,render_template,request
from flask_socketio import SocketIO
import uuid

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

def new_game():
    id=uuid.uuid4()
    print(id.int)
    return id.int

@app.route('/game')
def start_game():
    id=request.args.get('id','')
    if(id==''):
        id=new_game()
        print(id)
    return str(id)

@socketio.on('test')
def handle_my_custom_event():
    print('received msg: ')

if __name__ == '__main__':
    socketio.run(app)