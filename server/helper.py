class Game:
    def __init__(self):
        self.board = [[0 for x in range(19)] for y in range(19)]
        self.black_turn=True

    def move(self, color, row, column):
        if color!=self.black_turn:
            return False
        if self.board[row][column]!=0:
            return False
        target=1 if color else -1
        self.board[row][column] = target
        self.black_turn=not self.black_turn
        return True


    def judge(self, color):
        target = 1 if color else -1
        for i in range(19):
            counter = 0
            for j in range(19):
                if self.board[i][j] == target:
                    counter += 1
                else:
                    counter = 0
                if counter == 5:
                    return True
        for j in range(19):
            counter = 0
            for i in range(19):
                if self.board[i][j] == target:
                    counter += 1
                else:
                    counter = 0
                if counter == 5:
                    return True
        for i in range(-14, 14):
            counter = 0
            for j in range(max(-i, 0), min(19 - i, 19)):
                if self.board[i + j][j] == target:
                    counter += 1
                else:
                    counter = 0
                if counter == 5:
                    return True
        for i in range(4, 32):
            counter = 0
            for j in range(max(0, i - 18), min(i + 1, 19)):
                if self.board[i - j][j] == target:
                    counter += 1
                else:
                    counter = 0
                if counter == 5:
                    return True
        return False


class GameRepo:
    def __init__(self):
        self.games_dict = {}

    def get_game(self,game_id):
        return self.games_dict[game_id]

    def check_id(self, m_id):
        return m_id in self.games_dict

    def add_game(self, m_id, game):
        self.games_dict[m_id] = game
