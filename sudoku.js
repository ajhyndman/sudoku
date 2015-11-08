/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

var sudoku = (function () {

    'use strict';





    // #sudoku: PRIVATE

    /**
     * A representation of a Sudoku puzzle based on a 2-dimensional array.
     */
    var puzzle = function (array) {

        // #puzzle: PRIVATE
        var grid;

        if (array) {
            grid = array;
        } else {
            grid = [
                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0],

                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0],

                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0],
                [0, 0, 0,   0, 0, 0,   0, 0, 0]
            ];
        }


        // #puzzle: PUBLIC

        return {
            grid: grid,

            setGrid: function (array2d) {
                grid = array2d;
            },

            getGrid: function () {
                return grid;
            },

            clone: function () {
                var newGrid = [],
                    newPuzzle = puzzle(),
                    i;

                // copy each row
                for (i = 0; i < grid.length; i++) {
                    newGrid[i] = grid[i].slice(0);
                }

                newPuzzle.grid = newGrid;

                return newPuzzle;
            },

            equals: function (otherPuzzle) {
                var otherGrid = otherPuzzle.grid,
                    i,
                    j;

                for (i = 0; i < grid.length; i++) {
                    for (j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] !== otherGrid[i][j]) {
                            return false;
                        }
                    }
                }

                return true;
            }
        };
    };

    /**
     * A 3D Array used to track progress while solving the puzzle.
     */
    var pencilwork = function () {

        // #pencilwork: PRIVATE

        var state = [
            // ROW 1
            [
            //   The current cell value, followed by a boolean describing the
            //   possible values not yet eliminated for this cell.
            //   cell, 1,    2,    3,    4,    5,    6,    7,    8,    9
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 2
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 3
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 4
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 5
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 6
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 7
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 8
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 9
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ]
        ];

        /**
         * Checks a row of the solution array for an integer value.
         *
         * @param value - the value to check for
         * @param row - the index of the row to check
         * @return
         *      true - if the row contains the value
         *      false - if the row does not contain the value
         */
        var checkRow = function (value, row) {
            var i;

            for (i = 0; i < 9; i++) {
                if (value === state[row][i][0]) {
                    return true;
                }
            }

            return false;
        };

        /**
         * Checks a column of the solution array for an integer value.
         *
         * @param value - the value to check for
         * @param column - the index of the column to check
         * @return
         *      true - if the row contains the value
         *      false - if the row does not contain the value
         */
        var checkColumn = function (value, column) {
            var i;

            for (i = 0; i < 9; i++) {
                if (value === state[i][column][0]) {
                    return true;
                }
            }

            return false;
        };

        /**
         * Checks a box of the solution array for an integer value.
         *
         * @param value - the value to check for
         * @param boxX - the x coordinate of the upper-leftmost cell of the box to be checked.
         * @param boxY - the y coordinate of the upper-leftmost cell of the box to be checked.
         * @return
         *      true - if the row contains the value
         *      false - if the row does not contain the value
         */
        var checkRegion = function (value, regionX, regionY) {
            var i,
                j;

            for (i = regionX; i < regionX + 3; i++) {
                for (j = regionY; j < regionY + 3; j++) {
                    if (value === state[i][j][0]) {
                        return true;
                    }
                }
            }

            return false;
        };

//        var crossHatch = function (value, x, y) {};

        /**
         * Checks if any value (1-9) has been eliminated from every cell of a row
         * of the solution array.
         *
         * @param value - the value to check for
         * @param row - the index of the row to check
         * @return
         *      true - if the value has been eliminated from every cell of the row
         *      false - otherwise
         */
        var rowContradiction = function (value, row) {
            var i;

            for (i = 0; i < 9; i++) {
                if (true === state[row][i][value]) {
                    return false;
                }
            }

            return true;
        };

        /**
         * Checks if any value (1-9) has been eliminated from every cell of a column
         * of the solution array.
         *
         * @param value - the value to check for
         * @param column - the index of the column to check
         * @return
         *      true - if the value has been eliminated from every cell of the column
         *      false - otherwise
         */
        var columnContradiction = function (value, column) {
            var i;

            for (i = 0; i < 9; i++) {
                if (true === state[i][column][value]) {
                    return false;
                }
            }

            return true;
        };

        /**
         * Checks if any value (1-9) has been eliminated from every cell of a region
         * of the solution array.
         *
         * @param value - the value to check for
         * @param regionX - the x coordinate of the upper-leftmost cell of the box to be checked.
         * @param regionY - the y coordinate of the upper-leftmost cell of the box to be checked.
         * @return
         *      true - if the value has been eliminated from every cell of the box
         *      false - otherwise
         */
        var regionContradiction = function (value, regionX, regionY) {
            var i,
                j;

            for (i = regionX; i < regionX + 3; i++) {
                for (j = regionY; j < regionY + 3; j++) {
                    if (true === state[i][j][value]) {
                        return false;
                    }
                }
            }

            return true;

        };


        // #pencilwork: PUBLIC

        return {
            state: state,

            equals: function (otherPencilwork) {
                var otherState = otherPencilwork.getState(),
                    i,
                    j,
                    k;

                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        for (k = 0; k < 10; k++) {
                            if (otherState[i][j][k] !== state[i][j][k]) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            },

            getState: function () {
                return this.state;
            },

            /**
             * Overwrite the state member.
             */
            setState: function (newState) {
                this.state = newState;
            },

            /**
             * Returns a deep clone of the entire pencilwork object.
             */
            clone: function () {
                var clone = pencilwork(),
                    clonedState = [
                        [], [], [], [], [], [], [], [], []
                    ],
                    i,
                    j;

                for (i = 0; i < this.state.length; i++) {
                    for (j = 0; j < this.state[i].length; j++) {
                        clonedState[i][j] = this.state[i][j].slice(0);
                    }
                }

                clone.state = clonedState;

                return clone;
            },

            /**
             * Re-initialize the pencilwork of the current object with a new puzzle.
             */
            newPuzzle: function (newPuzzle) {
                var newPuzzleGrid = newPuzzle.grid,
                    i,
                    j,
                    k;

                for (i = 0; i < newPuzzleGrid.length; i++) {
                    for (j = 0; j < newPuzzleGrid[i].length; j++) {
                        state[i][j][0] = newPuzzleGrid[i][j];

                        // Reset the
                        for (k = 1; k < state[i][j].length; k++) {
                            state[i][j][k] = true;
                        }
                    }
                }
            },

            /**
             * Takes an input cell's coordinates, and returns the lowest value not
             * yet eliminated for that cell.
             */
            firstPossibleValue: function (x, y) {
                var i;

                for (i = 1; i < 10; i++) {
                    if (true === this.state[x][y][i]) {
                        return i;
                    }
                }

                return 0;
            },

            /**
             * Finds the available values for a cell, and sets the final value if
             * only one possibility remains.
             *
             * @param x - x coordinate of the cell to check
             * @param y - y coordinate of the cell to check
             */
            updateCell: function (x, y) {
                var i,
                    numberOfValuesRemaining;

                // Check if the cell has already been solved.
                if (this.state[x][y][0] !== 0) {
                    return this.state[x][y];
                }

                // For the values 1 to 9, check if they are already used in the row,
                // column or square.
                for (i = 1; i < 10; i++) {
                    if (checkRow(i, x) ||
                            checkColumn(i, y) ||
                            checkRegion(i, (Math.floor(x / 3)) * 3,
                                        (Math.floor(y / 3)) * 3)) {
                        this.state[x][y][i] = false;
                    }
                }

                // Count the number of options remaining for the cell.
                numberOfValuesRemaining = 0;
                for (i = 1; i < 10; i++) {
                    if (true === this.state[x][y][i]) {
                        numberOfValuesRemaining++;
                    }
                }

                // If there's only one option left,
                if (1 === numberOfValuesRemaining) {

                    // Fill it in.
                    for (i = 1; i < 10; i++) {
                        if (true === this.state[x][y][i]) {
                            this.state[x][y][0] = i;
                        }
                    }
                }

                return this.state[x][y];
            },

            /**
             * Determines if the current pencilwork is uncompleteable, by checking
             * whether a value has been completely eliminated from any row, column
             * or region.
             *
             * @return - boolean
             */
            isSolveable: function () {
                var i,
                    j,
                    k,
                    hasPossibleValue;

                //Check rows.
                for (i = 0; i < 9; i++) {
                    for (k = 1; k < 10; k++) {
                        if (rowContradiction(k, i)) {
                            return false;
                        }
                    }
                }

                //Check Columns.
                for (j = 0; j < 9; j++) {
                    for (k = 1; k < 10; k++) {
                        if (columnContradiction(k, j)) {
                            return false;
                        }
                    }
                }

                //Check Boxes.
                for (i = 0; i < 3; i++) {
                    for (j = 0; j < 3; j++) {
                        for (k = 1; k < 10; k++) {
                            if (regionContradiction(k, i * 3, j * 3)) {
                                return false;
                            }
                        }
                    }
                }

                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        hasPossibleValue = false;
                        for (k = 0; k < 9; k++) {
                            if (false !== state[i][j][k]) {
                                hasPossibleValue = true;
                            }
                        }
                        if (!hasPossibleValue) {
                            return false;
                        }
                    }
                }

                return true;
            },

            /**
             * Determines if the current pencilwork state is a completed solution.
             *
             * Looks for zeroes in the first layer of the pencilwork state, and
             * returns false if it finds any.
             *
             * @return - boolean
             */
            isSolved: function () {
                var i,
                    j;

                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        if (0 === state[i][j][0]) {
                            return false;
                        }
                    }
                }

                return true;
            }
        };
    };

    /**
     * A guess contains the complete pencilwork before the last guess plus
     * the coordinate of the guess.
     *
     */
//    var guess = (function () {
//        return {
//            pencilwork: Object.create(pencilwork),
//            coordinate: []
//        };
//    }());


    /**
     * A recursive search method for solving Sudoku puzzles.
     *
     */
    var backtrackingSolver = (function () {

        // #backtrackingSolver: PRIVATE MEMBERS

        var
            // Stacks to keep track of the guesswork this algorithm needs to do.
                // The state of the puzzle before the last guess.
            pencilworkStack = [],
                // Stack of coordinates guessed.
            guessCoordinates = [],

            // Current puzzle state.
            puzzleState = pencilwork(),

            i,
            j;





        // #backtrackingSolver: PRIVATE METHODS

        /**
         * Extends a solution candidate deductively as far as simple crosshatch
         * elimination logic will take it without requiring guesswork.
         *
         * @param candidate - pencilwork object: initial candidate to be extended
         * @return - A 3 dimensional annotated array
         */
        var first = function (candidate) {

            var
                // Copy of the puzzle array used to check if the loop has stopped
                // making changes.
                lastState,
                i,
                j;

            // Loop until no changes are made to the array.
            do {
                // Deep clone the array.
                lastState = candidate.clone();

                // Iterate across the first layer of the puzzle array updating each
                // cell's remaining options.  Fill it in if the cell is reduced to
                // a single option.
                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        candidate.updateCell(i, j);
                    }
                }

            } while (!candidate.equals(lastState));

            return candidate;
        };

        /**
         * Guesses at one of the values that have yet to be determined.
         * Guesses are made to search the solution space by probing depth and then breadth.
         *
         * @param candidate - a pencilwork object to work on
         * @param cell - the coordinates of the cell that was last guessed at
         *
         * @return - the original pencilwork object
         */
        var next = function (candidate, cell) {

            // The cell we will be guessing in.
            var activeCell = null,
                currentValue,
                i,
                j;

            // Find the next guess.
            if (null === cell) {
                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        if (0 === candidate.state[i][j][0]) {
                            activeCell = [i, j];
                            candidate.state[i][j][0] =
                                    candidate.firstPossibleValue(i, j);

                            // Record the guess being made, and record the cell being guessed in.
                            pencilworkStack.push(candidate.clone());
                            guessCoordinates.push(activeCell);

                            return candidate;
                        }
                    }
                }
            } else {
                activeCell = cell;
                currentValue = candidate.state[cell[0]][cell[1]][0];
                candidate.state[cell[0]][cell[1]][currentValue] = false;
                candidate.state[cell[0]][cell[1]][0] =
                        candidate.firstPossibleValue(activeCell);


                // Record the guess being made, and indicate the cell being guessed on.
                pencilworkStack.push(candidate.clone());
                guessCoordinates.push(activeCell);

                return candidate;
            }
        };

        /**
         * Recursive function which performs a tree-like (depth-first) search on
         * the solution space, and returns the FIRST complete solution encountered.
         *
         * @param candidate:
         *      A pencilwork state to start searching the Sudoku solution space from.
         * @return:
         *      The first solution encountered.
         */
        var recursiveSearch = function (candidate) {
            var newCandidate;

            // Complete the puzzle as much as possible using naive deductive logic.
            newCandidate = first(candidate);

            // If the puzzle expresses a contradiction, go back to the last guess made,
            // and mark it as eliminated.
            if (!newCandidate.isSolveable()) {
                newCandidate = next(pencilworkStack.pop(), guessCoordinates.pop());
                return newCandidate;
            }

            // If the puzzle is solved completely, return the solution.
            if (newCandidate.isSolved()) {
                return newCandidate;
            }

            // Otherwise, the puzzle has no contradiction, but is not yet complete,
            // so make a deeper guess.
            newCandidate = next(newCandidate, null);
            return recursiveSearch(newCandidate);
        };





        // #backtrackingSolver: PUBLIC INTERFACE

        return {
            solve: function (newPuzzle) {

                // The answer to be returned.
                var solution,
                    solutionArray = [
                        [], [], [], [], [], [], [], [], []
                    ];

                // Initialize Variables.
                pencilworkStack = [];
                guessCoordinates = [];
                puzzleState = pencilwork();


                //Copy the initial puzzle into the first layer of the solution array.
                puzzleState.newPuzzle(newPuzzle);

                pencilworkStack.push(puzzleState);
                guessCoordinates.push(null);

                puzzleState = recursiveSearch(puzzleState);

                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        solutionArray[i][j] = puzzleState.state[i][j][0];
                    }
                }

                solution = puzzle();

                solution.grid = solutionArray;

                return solution;
            }
        };
    }());





    // #sudoku: PUBLIC INTERFACE

    return {

        puzzle: puzzle,

        pencilwork: pencilwork,

        /**
         * Solve a Sudoku puzzle.
         *
         * @param puzzle:
         *      A puzzle object.  This object should represent the initial state of the puzzle.
         *
         * @return:
         *      The first solution discovered to the puzzle.
         *      If the puzzle is unsolvable, I don't know what will happen.
         */
        solve: function (newPuzzle) {
            var solution;

            // Solve the puzzle.
            solution = backtrackingSolver.solve(newPuzzle);

            this.printPuzzle(solution);

            return solution;
        },

        /**
         * Log the puzzle to the console.
         *
         * @param puzzle:
         *      This is the puzzle object that you want to print.
         *
         * @return: The same puzzle that was input, unchanged.
         */
        printPuzzle: function (puzzle) {
            var i,
                j,
                row = '';

            // Construct and print all 9 rows of the puzzle.
            for (i = 0; i < 9; i += 1) {

                // Construct row of puzzle.
                row = '[';

                for (j = 0; j < 9; j += 1) {
                    row += ' ' + puzzle.grid[i][j] + ' ';
                }

                row += ']';

                // Log row
                console.log(row);
            }

            return puzzle;
        }
    };

}());
