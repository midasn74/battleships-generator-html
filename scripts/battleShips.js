function numberToLetter(number) {
    if (number == 0) {
        return "A";
    } else if (number == 1) {
        return "B";
    } else if (number == 2) {
        return "C";
    } else if (number == 3) {
        return "D";
    } else if (number == 4) {    
        return "E";
    } else if (number == 5) {
        return "F";
    } else if (number == 6) {
        return "G";
    } else if (number == 7) {
        return "H";
    } else if (number == 8) {
        return "I";
    } else if (number == 9) {
        return "J";
    } else {
        return "X";
    }
}

function letterToNumber(number) {
    if (number == "A") {
        return 0;
    } else if (number == "B") {
        return 1;
    } else if (number == "C") {
        return 2;
    } else if (number == "D") {
        return 3;
    } else if (number == "E") {    
        return 4;
    } else if (number == "F") {
        return 5;
    } else if (number == "G") {
        return 6;
    } else if (number == "H") {
        return 7;
    } else if (number == "I") {
        return 8;
    } else if (number == "J") {
        return 9;
    } else {
        return -1;
    }
}

class Player {
    constructor(name, boats, board) {
        this.name = name;
        this.boats = boats;
        this.board = board;
    }

    generateBoard() {
        // iterate over all boats of player
        this.boats.forEach(boat => {
            while (boat.placed === false) {
                // chose random coordinates for each boat
                const x = Math.floor(Math.random() * this.board.width);
                const y = Math.floor(Math.random() * this.board.height);

                // chose random rotation for each boat
                const rotation = Math.floor(Math.random() * 4) + 1;
                if (rotation === 1) {
                    boat.rotation = 'UP';
                }
                if (rotation === 2) {
                    boat.rotation = 'DOWN';
                }
                if (rotation === 3) {
                    boat.rotation = 'LEFT';
                }
                if (rotation === 4) {
                    boat.rotation = 'RIGHT';
                }

                boat.x = x;
                boat.y = y;

                // check if the boat can be placed in the chosen rotation and coordinates
                if (this.board.isBoatPossible(boat)) {
                    this.board.placeBoat(boat);
                    boat.placed = true;
                }
            }
        });
    }
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.isHit = false;
        this.alreadyChecked = false;

        this.boat = null;
    }
}

class Board {
    constructor(width, height) {
        for (let i = 0; i < height; i++) {
            this[i] = [];
            for (let j = 0; j < width; j++) {
                this[i][j] = new Cell(i, j);
            }
        }
        this.width = width;
        this.height = height;
        this.texture = null;
    }

    isBoatPossible(boat) {
        let possible = true;
        for (let i = 0; i < boat.length; i++) {
            if (boat.rotation === "UP") {
                if (this[boat.y - i] === undefined) {   
                    possible = false;
                } else if (this[boat.y - i][boat.x].boat !== null) {
                    possible = false;
                }
            } else if (boat.rotation === "DOWN") {
                if (this[boat.y + i] === undefined) {   
                    possible = false;
                } else if (this[boat.y + i][boat.x].boat !== null) {
                    possible = false;
                }
            } else if (boat.rotation === "LEFT") {
                if (this[boat.y][boat.x - i] === undefined) {   
                    possible = false;
                } else if (this[boat.y][boat.x - i].boat !== null) {
                    possible = false;
                }
            } else if (boat.rotation === "RIGHT") {
                if (this[boat.y][boat.x + i] === undefined) {   
                    possible = false;
                } else if (this[boat.y][boat.x + i].boat !== null) {
                    possible = false;
                }
            }
        }
        return possible;
    }

    placeBoat(boat) {
        for (let i = 0; i < boat.length; i++) {
            var boatName = "id='" + boat.name + i +"'";

            if (boat.rotation === "UP") {
                if (i == 0) { this[boat.y - i][boat.x].texture                      = BoatBottomVertical.slice(0, 5) + boatName + BoatBottomVertical.slice(5);  }
                else if (i == boat.length - 1) { this[boat.y - i][boat.x].texture   = BoatTopVertical.slice(0, 5) + boatName + BoatTopVertical.slice(5);  }
                else { this[boat.y - i][boat.x].texture                             = BoatMiddleVertical.slice(0, 5) + boatName + BoatMiddleVertical.slice(5);  }      
            } else if (boat.rotation === "DOWN") {
                if (i == 0) { this[boat.y + i][boat.x].texture                      = BoatTopVertical.slice(0, 5) + boatName + BoatTopVertical.slice(5);  } 
                else if (i == boat.length - 1) { this[boat.y + i][boat.x].texture   = BoatBottomVertical.slice(0, 5) + boatName + BoatBottomVertical.slice(5);  }
                else { this[boat.y + i][boat.x].texture                             = BoatMiddleVertical.slice(0, 5) + boatName + BoatMiddleVertical.slice(5);  }  
            } else if (boat.rotation === "LEFT") {
                if (i == 0) { this[boat.y][boat.x - i].texture                      = BoatRightHorizontal.slice(0, 5) + boatName + BoatRightHorizontal.slice(5);  } 
                else if (i == boat.length - 1) { this[boat.y][boat.x - i].texture   = BoatLeftHorizontal.slice(0, 5) + boatName + BoatLeftHorizontal.slice(5);  }
                else { this[boat.y][boat.x - i].texture                             = BoatMiddleHorizontal.slice(0, 5) + boatName + BoatMiddleHorizontal.slice(5);  }   
            } else if (boat.rotation === "RIGHT") {
                if (i == 0) { this[boat.y][boat.x + i].texture                      = BoatLeftHorizontal.slice(0, 5) + boatName + BoatLeftHorizontal.slice(5);  } 
                else if (i == boat.length - 1) { this[boat.y][boat.x + i].texture   = BoatRightHorizontal.slice(0, 5) + boatName + BoatRightHorizontal.slice(5);  }
                else { this[boat.y][boat.x + i].texture                             = BoatMiddleHorizontal.slice(0, 5) + boatName + BoatMiddleHorizontal.slice(5);  }  
            }

            if (boat.rotation === "UP") {
                this[boat.y - i][boat.x].boat = boat;
            } else if (boat.rotation === "DOWN") {
                this[boat.y + i][boat.x].boat = boat;
            } else if (boat.rotation === "LEFT") {
                this[boat.y][boat.x - i].boat = boat;
            } else if (boat.rotation === "RIGHT") {
                this[boat.y][boat.x + i].boat = boat;
            }
        }
    }

    getCell(y, x) {
        return this[y][x];
    }

    getCellByBoat(boat) {
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (this[i][j].boat === boat) {
                    return this[i][j];
                }
            }
        }
    }

    printDebugBoard() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this[i][j].boat === null) {
                    process.stdout.write('[ ] ');
                } else {
                    process.stdout.write(`[${this[i][j].boat.name[0]}] `);
                }
            }
            console.log(' ');
        }
    }

    placeBoardHTML(boats) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this[i][j].boat !== null) {
                    document.getElementById((i+1).toString() + numberToLetter(j)).innerHTML = this[i][j].texture;
                }
            }
        }
        boats.forEach(boat => {
            for (let i = 0; i < boat.length; i++) {
                var id = boat.name + i
                this[boat.y][boat.x].boat.element.push(document.getElementById(id));
            }
        });
    }
}

class Boat {
    constructor(length, name) {
        this.length = length;
        this.name = name;

        this.rotation = null;
        this.placed = false;
        this.x = null;
        this.y = null;
        this.element = [];
    }
}
