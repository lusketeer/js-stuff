(function(){
  var Snakes = window.Snakes = window.Snakes || {};

  var Coord = Snakes.Coord = function(pos) {
    this.row = pos[0];
    this.col = pos[1];
  };

  Coord.prototype = {
    plus : function(coord) {
      this.row += coord.row;
      this.col += coord.col;
    },

    checkCollide : function(array) {
      var currentCoord = this;
      var result = false;
      array.map(function(coord) {
        result = result || currentCoord.equal(coord);
      });
      return result;
    },

    equal : function(coord) {
      return this.row === coord.row && this.col === coord.col;
    }
  };

  var Snake = Snakes.Snake = function() {
    this.dir = "N";
    this.segments = [new Coord([5, 5]), new Coord([5, 6]), new Coord([5, 7])];

  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype = {
    move : function() {
      var currentDir = this.dir
      this.segments.pop();
      var firstSeg = this.segments[0]
      var segment = new Coord([firstSeg.row, firstSeg.col]);
      // this.segments.map(function(segment) {
      switch (currentDir) {
        case "N":
          segment.plus({row: -1, col: 0});
          break;
        case "S":
          segment.plus({row: 1, col: 0});
          break;
        case "W":
          segment.plus({row: 0, col: -1});
          break;
        case "E":
          segment.plus({row: 0, col: 1});
          break;
        default:
          console.log("Snake is moving!");
      }

      this.segments = [segment].concat(this.segments);
      // });
    },

    turn : function(newDir) {
      this.dir = newDir;
    }
  };


  var Board = Snakes.Board = function(snake) {
    this.snake = snake;
    this.grid = [];
    this.apple = this.randomApple();
    setInterval(this.step, 100);
  };

  Board.SIZE = {rows: 25, cols: 40};

  Board.prototype = {
    setGrid : function() {
        var grid = this.grid;
        var snake = this.snake;
        for (var row = 0; row < Board.SIZE.rows; row++) {
          var currentRow = [];
          for (var col = 0; col < Board.SIZE.cols; col++) {
            var currentCell = "";
            // snake.segments.map(function(segment){
            //   if (segment.row === row && segment.col === col) {
            //     currentRow.push("S");
            //     currentCell = "S";
            //   }
            // });
            if (currentCell !== "S") {
              currentRow.push(".");
            }
          }
          grid.push(currentRow);
        }
    },

    randomApple : function() {
      var row = Math.round(Math.random() * (Board.SIZE.rows - 1));
      var col = Math.round(Math.random() * (Board.SIZE.cols - 1 ));
      return new Coord([row, col]);
    },

    step : function() {
      // console.log("running");
      var board = this.board;
      var snake = board.snake;
      var snakeHead = snake.segments[0];
      var snakeBody = snake.segments.slice(1);
      snake.move();
      if (board.apple.equal(snakeHead)) {
        snake.segments = [board.apple].concat(snake.segments);
        board.apple = board.randomApple();
      }
      // checking if colliding with body and edge
      if (snakeHead.checkCollide(snakeBody) || board.outOfBound(snakeHead)) {
        console.log("Dead");
        // location.reload();
      }

    },

    outOfBound : function(coord) {
      var top = (coord.row < 0);
      var bottom = (coord.row > Board.SIZE.rows - 1);
      var left = (coord.col < 0);
      var right = (coord.col > Board.SIZE.cols - 1);
      return top || bottom || left || right;
    },

    render : function() {

    }
  };

})();
