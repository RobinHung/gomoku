class Game:
    def __init__(self):
        self.board = [[0 for x in range(19)] for y in range(19)]

    def move(self, color, row, column):
        target = 1 if color == "black" else -1
        self.board[row][column] = target

    def judge(self, color):
        target = 1 if color == "black" else -1
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


class GameRepo:
    def __init__(self):
        self.games_dict = {}

    def check_id(self, m_id):
        return m_id in self.games_dict

    def add_game(self, m_id, game):
        self.games_dict[m_id] = game
