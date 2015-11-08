/*jslint
    maxerr: 10, node: true
*/

'use strict';

beforeEach(function () {
    this.easyPuzzle = sudoku.puzzle([
        [0, 0, 0,   0, 0, 6,   0, 1, 2],
        [0, 0, 0,   0, 5, 0,   0, 6, 3],
        [0, 7, 3,   0, 2, 1,   4, 0, 0],

        [0, 0, 1,   0, 0, 2,   6, 0, 8],
        [3, 2, 0,   0, 0, 0,   0, 5, 9],
        [7, 0, 5,   9, 0, 0,   3, 0, 0],

        [0, 0, 6,   2, 8, 0,   9, 4, 0],
        [8, 4, 0,   0, 7, 0,   0, 0, 0],
        [9, 5, 0,   4, 0, 0,   0, 0, 0]
    ]);

    this.mediumPuzzle = sudoku.puzzle([
        [7, 0, 0,   0, 8, 0,   0, 0, 0],
        [0, 0, 0,   3, 0, 1,   0, 4, 0],
        [8, 0, 1,   4, 0, 0,   0, 9, 5],

        [0, 5, 0,   0, 0, 6,   2, 7, 9],
        [0, 6, 0,   0, 4, 0,   0, 8, 0],
        [3, 7, 2,   5, 0, 0,   0, 1, 0],

        [6, 9, 0,   0, 0, 3,   8, 0, 4],
        [0, 8, 0,   9, 0, 4,   0, 0, 0],
        [0, 0, 0,   0, 6, 0,   0, 0, 7]
    ]);

    this.hardPuzzle = sudoku.puzzle([
        [0, 0, 0,   0, 0, 0,   0, 1, 2],
        [0, 0, 0,   0, 3, 5,   0, 0, 0],
        [0, 0, 0,   6, 0, 0,   0, 7, 0],

        [7, 0, 0,   0, 0, 0,   3, 0, 0],
        [0, 0, 0,   4, 0, 0,   8, 0, 0],
        [1, 0, 0,   0, 0, 0,   0, 0, 0],

        [0, 0, 0,   1, 2, 0,   0, 0, 0],
        [0, 8, 0,   0, 0, 0,   0, 4, 0],
        [0, 5, 0,   0, 0, 0,   6, 0, 0]
    ]);

    // Derived from mediumPuzzle just before the first guess is required.
    this.partialPencilwork = sudoku.pencilwork();
    this.partialPencilwork.state = [
        [
            // Row 1
            [7, true, true, true, true, true, true, true, true, true],
            [4, false, false, false, true, false, false, false, false, false],
            [5, false, false, false, false, true, true, false, false, false],
            [0, false, true, false, false, false, true, false, false, false],
            [8, true, true, true, true, true, true, true, true, true],
            [0, false, true, false, false, true, false, false, false, true],
            [0, true, false, true, false, false, true, false, false, false],
            [0, false, true, true, false, false, true, false, false, false],
            [0, true, true, false, false, false, false, false, false, false]
        ],
        [
            // Row 2
            [0, false, false, false, false, true, false, false, false, true],
            [2, false, true, false, false, false, false, false, false, false],
            [0, false, false, false, false, true, true, false, false, false],
            [3, true, true, true, true, true, true, true, true, true],
            [0, false, false, false, false, true, false, true, false, false],
            [1, true, true, true, true, true, true, true, true, true],
            [0, false, false, false, false, false, true, true, false, false],
            [4, true, true, true, true, true, true, true, true, true],
            [8, false, false, false, false, false, false, false, true, false]
        ],
        [
            // Row 3
            [8, true, true, true, true, true, true, true, true, true],
            [0, true, true, true, true, true, true, true, true, true],
            [1, true, true, true, true, true, true, true, true, true],
            [4, true, true, true, true, true, true, true, true, true],
            [0, false, true, false, false, false, false, true, false, false],
            [0, false, true, false, false, false, false, true, false, false],
            [0, false, false, false, false, false, true, true, false, false],
            [9, true, true, true, true, true, true, true, true, true],
            [5, true, true, true, true, true, true, true, true, true]
        ],
        [
            // Row 4
            [4, false, false, false, true, false, false, false, false, false],
            [5, true, true, true, true, true, true, true, true, true],
            [8, false, false, false, false, false, false, false, true, false],
            [1, true, false, false, false, false, false, false, false, false],
            [3, false, false, true, false, false, false, false, false, false],
            [6, true, true, true, true, true, true, true, true, true],
            [2, true, true, true, true, true, true, true, true, true],
            [7, true, true, true, true, true, true, true, true, true],
            [9, true, true, true, true, true, true, true, true, true]
        ],
        [
            // Row 5
            [1, true, false, false, false, false, false, false, false, false],
            [6, true, true, true, true, true, true, true, true, true],
            [9, false, false, false, false, false, false, false, false, true],
            [0, false, true, false, false, false, false, true, false, false],
            [4, true, true, true, true, true, true, true, true, true],
            [0, false, true, false, false, false, false, true, false, false],
            [5, false, false, false, false, true, false, false, false, false],
            [8, true, true, true, true, true, true, true, true, true],
            [3, false, false, true, false, false, false, false, false, false]
        ],
        [
            // Row 6
            [3, true, true, true, true, true, true, true, true, true],
            [7, true, true, true, true, true, true, true, true, true],
            [2, true, true, true, true, true, true, true, true, true],
            [5, true, true, true, true, true, true, true, true, true],
            [9, false, false, false, false, false, false, false, false, true],
            [8, false, false, false, false, false, false, false, true, false],
            [4, false, false, false, true, false, false, false, false, false],
            [1, true, true, true, true, true, true, true, true, true],
            [6, false, false, false, false, false, true, false, false, false]
        ],
        [
            // Row 7
            [6, true, true, true, true, true, true, true, true, true],
            [9, true, true, true, true, true, true, true, true, true],
            [0, false, false, false, false, true, false, true, false, false],
            [0, false, true, false, false, false, false, true, false, false],
            [0, true, true, false, false, true, false, true, false, false],
            [3, true, true, true, true, true, true, true, true, true],
            [8, true, true, true, true, true, true, true, true, true],
            [0, false, true, false, false, true, false, false, false, false],
            [4, true, true, true, true, true, true, true, true, true],
        ],
        [
            // Row 8
            [0, false, true, false, false, true, false, false, false, false],
            [8, true, true, true, true, true, true, true, true, true],
            [0, false, false, true, false, true, false, true, false, false],
            [9, true, true, true, true, true, true, true, true, true],
            [0, true, true, false, false, true, false, true, false, false],
            [4, true, true, true, true, true, true, true, true, true],
            [0, true, false, true, false, false, true, false, false, false],
            [0, false, true, true, false, true, true, false, false, false],
            [0, true, true, false, false, false, false, false, false, false],
        ],
        [
            // Row 9
            [0, false, true, false, false, true, false, false, false, false],
            [1, true, false, false, false, false, false, false, false, false],
            [0, false, false, true, true, true, false, false, false, false],
            [0, false, true, false, false, false, false, false, true, false],
            [6, true, true, true, true, true, true, true, true, true],
            [0, false, true, false, false, true, false, false, false, false],
            [0, false, false, true, false, false, false, false, false, true],
            [0, false, true, true, false, true, false, false, false, false],
            [7, true, true, true, true, true, true, true, true, true]
        ]
    ];
});





describe("A puzzle", function () {
    it("should have a default grid full of zeroes", function () {
        expect(sudoku.puzzle().grid).toEqual([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]);
    });


    it("should set the grid to any array passed in", function () {
        expect(sudoku.puzzle([
            [7, 0, 0,   0, 8, 0,   0, 0, 0],
            [0, 0, 0,   3, 0, 1,   0, 4, 0],
            [8, 0, 1,   4, 0, 0,   0, 9, 5],

            [0, 5, 0,   0, 0, 6,   2, 7, 9],
            [0, 6, 0,   0, 4, 0,   0, 8, 0],
            [3, 7, 2,   5, 0, 0,   0, 1, 0],

            [6, 9, 0,   0, 0, 3,   8, 0, 4],
            [0, 8, 0,   9, 0, 4,   0, 0, 0],
            [0, 0, 0,   0, 6, 0,   0, 0, 7]
        ]).grid).toEqual([
            [7, 0, 0,   0, 8, 0,   0, 0, 0],
            [0, 0, 0,   3, 0, 1,   0, 4, 0],
            [8, 0, 1,   4, 0, 0,   0, 9, 5],

            [0, 5, 0,   0, 0, 6,   2, 7, 9],
            [0, 6, 0,   0, 4, 0,   0, 8, 0],
            [3, 7, 2,   5, 0, 0,   0, 1, 0],

            [6, 9, 0,   0, 0, 3,   8, 0, 4],
            [0, 8, 0,   9, 0, 4,   0, 0, 0],
            [0, 0, 0,   0, 6, 0,   0, 0, 7]
        ]);
    });


    it("should have a clone method which produces an equal but separate object.", function () {
        this.clone = this.easyPuzzle.clone();
        expect(this.clone.grid).toEqual(this.easyPuzzle.grid);
        expect(this.clone.grid).not.toBe(this.easyPuzzle.grid);
    });


    it("should equal another puzzle if and only if it has equal values in its grid.", function () {

    });
});





describe("A pencilwork object", function () {
    it("should initialize an array representing a blank sudoku puzzle.", function () {
        expect(sudoku.pencilwork().state).toEqual([
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
        ]);
    });


    it("should equal another pencilwork object if and only if they have the same state.", function () {
        this.emptyPencilwork = sudoku.pencilwork();

        expect(this.emptyPencilwork.equals(this.emptyPencilwork));

        expect(sudoku.pencilwork().equals(sudoku.pencilwork()));

//        expect(sudoku.pencilwork().state).toEqual([
//            // ROW 1
//            [
//            //   The current cell value, followed by a boolean describing the
//            //   possible values not yet eliminated for this cell.
//            //   cell, 1,    2,    3,    4,    5,    6,    7,    8,    9
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 2
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 3
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 4
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 5
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 6
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 7
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 8
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ],
//            // ROW 9
//            [
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true],
//                [0,    true, true, true, true, true, true, true, true, true]
//            ]
//        ]);

        this.complexPencilwork = sudoku.pencilwork();
        this.complexPencilwork.state = [
            // ROW 1
            [
            //   The current cell value, followed by a boolean describing the
            //   possible values not yet eliminated for this cell.
            //   cell, 1,    2,    3,    4,    5,    6,    7,    8,    9
                [1,    true, false, false, false, false, false, false, false, false],
                [2,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [7,    true, true, true, true, true, true, true, true, true],
                [8,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true]
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

        expect(this.complexPencilwork.equals(this.emptyPencilwork)).not;
    });


    it("should be equal to its clone, but not share the same members.", function () {
        this.emptyPencilwork = sudoku.pencilwork();
        this.emptyPencilworkClone = this.emptyPencilwork.clone();
        this.partialPencilworkClone = this.partialPencilwork.clone();

        // Empty Pencilwork .equals
        expect(this.emptyPencilwork.equals(this.emptyPencilworkClone));
        expect(this.emptyPencilwork).not.toBe(this.emptyPencilworkClone);

        // Empty Pencilwork Jasmine comparison
        expect(this.emptyPencilwork.state).toEqual(this.emptyPencilworkClone.state);
        expect(this.emptyPencilwork.state).not.toBe(this.emptyPencilworkClone.state);
        expect(this.emptyPencilwork.state[0]).not.toBe(this.emptyPencilworkClone.state[0]);

        // Partial Pencilwork .equals
        expect(this.partialPencilwork.equals(this.partialPencilworkClone));
        expect(this.partialPencilwork).not.toBe(this.partialPencilworkClone);
        // Partial Pencilwork Jasmine comparison.
        expect(this.partialPencilwork.state).toEqual(this.partialPencilworkClone.state);
        expect(this.partialPencilwork.state).not.toBe(this.partialPencilworkClone.state);
        expect(this.partialPencilwork.state[0]).not.toBe(this.partialPencilworkClone.state[0]);
    });


    it("should transpose an input puzzle into the first layer of its state.", function () {
        this.initializedPencilwork = sudoku.pencilwork();
        this.initializedPencilwork.newPuzzle(this.easyPuzzle);

        expect(this.initializedPencilwork.state).toEqual([
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
                [6,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 2
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 3
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [7,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 4
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [8,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 5
            [
                [3,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 6
            [
                [7,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 7
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [8,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 8
            [
                [8,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [7,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 9
            [
                [9,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ]
        ]);

        expect(this.initializedPencilwork.state).not.toEqual([
            // ROW 1
            [
            //   The current cell value, followed by a boolean describing the
            //   possible values not yet eliminated for this cell.
            //   cell, 1,    2,    3,    4,    5,    6,    7,    8,    9
                [9,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 2
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 3
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [7,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 4
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [1,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [8,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 5
            [
                [3,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 6
            [
                [7,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [3,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 7
            [
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [6,    true, true, true, true, true, true, true, true, true],
                [2,    true, true, true, true, true, true, true, true, true],
                [8,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [9,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 8
            [
                [8,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [7,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ],
            // ROW 9
            [
                [9,    true, true, true, true, true, true, true, true, true],
                [5,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [4,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true],
                [0,    true, true, true, true, true, true, true, true, true]
            ]
        ]);
    });


    it("should be able to retrieve the lowest value not yet eliminated from a cell.", function () {
        expect(this.partialPencilwork.firstPossibleValue(0, 1)).toEqual(4);
        expect(this.partialPencilwork.firstPossibleValue(0, 3)).toEqual(2);
        expect(this.partialPencilwork.firstPossibleValue(0, 4)).toEqual(1);
//        expect(this.partialPencilwork.firstPossibleValue([0, 5])).toEqual(1);
//        expect(this.partialPencilwork.firstPossibleValue([0, 6])).toEqual(1);
//        expect(this.partialPencilwork.firstPossibleValue([0, 7])).toEqual(1);
//        expect(this.partialPencilwork.firstPossibleValue([0, 8])).toEqual(1);
    });


    it("should be able to locate a naked single deductively.", function () {
        this.currentPencilwork = this.partialPencilwork.clone();

        this.currentPencilwork.updateCell(2, 1);

        expect(this.currentPencilwork.state[2][1]).toEqual(3);
    });
});





describe("sudoku.solve", function () {
    it("should solve an easy sudoku puzzle (requiring no recursion)", function () {
        expect(sudoku.solve(this.easyPuzzle).grid).toEqual([
            [ 5, 8, 4, 3, 9, 6, 7, 1, 2 ],
            [ 2, 1, 9, 7, 5, 4, 8, 6, 3 ],
            [ 6, 7, 3, 8, 2, 1, 4, 9, 5 ],
            [ 4, 9, 1, 5, 3, 2, 6, 7, 8 ],
            [ 3, 2, 8, 6, 4, 7, 1, 5, 9 ],
            [ 7, 6, 5, 9, 1, 8, 3, 2, 4 ],
            [ 1, 3, 6, 2, 8, 5, 9, 4, 7 ],
            [ 8, 4, 2, 1, 7, 9, 5, 3, 6 ],
            [ 9, 5, 7, 4, 6, 3, 2, 8, 1 ]
        ]);
    });


    it("should solve a moderate sudoku puzzle (requiring recursion)", function () {
        expect(sudoku.solve(this.mediumPuzzle).grid).toEqual([
            [ 7, 4, 5, 6, 8, 9, 3, 2, 1 ],
            [ 9, 2, 6, 3, 5, 1, 7, 4, 8 ],
            [ 8, 3, 1, 4, 2, 7, 6, 9, 5 ],
            [ 4, 5, 8, 1, 3, 6, 2, 7, 9 ],
            [ 1, 6, 9, 7, 4, 2, 5, 8, 3 ],
            [ 3, 7, 2, 5, 9, 8, 4, 1, 6 ],
            [ 6, 9, 7, 2, 1, 3, 8, 5, 4 ],
            [ 5, 8, 3, 9, 7, 4, 1, 6, 2 ],
            [ 2, 1, 4, 8, 6, 5, 9, 3, 7 ]
        ]);
    });


    it("should solve a difficult sudoku puzzle (requiring hidden single logic)", function () {
        expect(sudoku.solve(this.hardPuzzle).grid).toEqual([
            [ 6, 7, 3, 8, 9, 4, 5, 1, 2 ],
            [ 9, 1, 2, 7, 3, 5, 4, 8, 6 ],
            [ 8, 4, 5, 6, 1, 2, 9, 7, 3 ],
            [ 7, 9, 8, 2, 6, 1, 3, 5, 4 ],
            [ 5, 2, 6, 4, 7, 3, 8, 9, 1 ],
            [ 1, 3, 4, 5, 8, 9, 2, 6, 7 ],
            [ 4, 6, 9, 1, 2, 8, 7, 3, 5 ],
            [ 2, 8, 7, 3, 5, 6, 1, 4, 9 ],
            [ 3, 5, 1, 9, 4, 7, 6, 2, 8 ]
        ]);
    });
});
