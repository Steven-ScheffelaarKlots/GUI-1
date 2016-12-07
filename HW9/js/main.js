// Steven Scheffelaar Klots
// Steven_ScheffelaarKlots@student.uml.edu
// Student in 91.601 GUI Programming 1
// 12/6/16
// Page that emulates a single row of Scrabble

$(document).ready(
    function () {
        Deal();
        DragAndDrop();
    });

var letters = "";  //The letters available to the player in their tray
var globalScore = 0;  //Total score for the player
var currentScore = 0; //Score of the current round
var tripleWordScore = false; //Whether or not there is a tile on the triple word score tile

//alphabet array and the corresponding array of values in alphabetical order
var piecesArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var valuesArray = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];


//drag and drop stuff
function DragAndDrop() {
    $(".draggable").draggable({
        //Returns the tile to its original position when you remove it from the board
        revert: function(event, ui) {
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
        },
        snap: ".droppable",
        snapMode: "inner"
    });
    $(".droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            ui.draggable.position({
                my: "center",
                at: "center",
                of: $(this),
                using: function (pos) {
                    $(this).animate(pos, 200, "linear");
                }});

            //give scoring the current letter we dropped
            Scoring($(ui.draggable).children("img").attr("alt"), $(this).children("img").attr("alt"));

            $(this).droppable('option', 'accept', ui.draggable);
        },
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.draggable');
            UnScoring($(ui.draggable).children("img").attr("alt"));
        }
    });
};


function Deal() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //Possible letters to give to the user
    var randomTile = 0; //Variable for determining what kind of tile to generate on the baord
    var tripleTileUsed = false; //Determines whether a triple word score tile has been generated
    //Clears the board and the rack
    $("#rack").html("");
    $("#board").html("");

    // generates new random letters until there is enough to fill up the tray, while keeping the previous tiles
    for (var i = letters.length; i < 7; i++)
        letters += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    //Creates tiles for the rack based on the letters string as well as generates random tiles for the board
    for (var j = 0; j < 7; j++) {
        $("#rack").append("<div class='draggable'>"
            + "<img src='img/Scrabble_Tile_"
            + letters.charAt(j)
            + ".jpg' width=50 height=50 alt='"
            + letters.charAt(j)
            + "'>"
            + "</div>");

        //Generates random board tiles
        randomTile = Math.floor(Math.random() * 4);
        switch (randomTile) {
            case 0:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/plain_square.png' alt='plain'>" +
                    "</div>");
                break;

            case 1:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/double_letter_square.png' alt='doubleLetter'>" +
                    "</div>");
                break;

            case 2:
                if (!tripleTileUsed) {
                    tripleTileUsed = true;
                    $("#board").append("<div class='droppable'>" +
                        "<img src='img/triple_word_square.png' alt='tripleWord'>" +
                        "</div>");
                } else {
                    $("#board").append("<div class='droppable'>" +
                        "<img src='img/plain_square.png' alt='plain'>" +
                        "</div>");
                }
                break;
            case 3:
                $("#board").append("<div class='droppable'>" +
                    "<img src='img/plain_square.png' alt='plain'>" +
                    "</div>");
        }


    }

    //Reinitialize the Drag and drop functionality whenever we create a new board
    DragAndDrop();

    //If the player played a word on the triple word score tile, then triple the score of the entire word and reset the
    //tripleWordScore variable
    if (tripleWordScore) {
        currentScore = currentScore * 3;
        tripleWordScore = false;
    }

    //Add the current score of the word to the global score and reset the current score
    globalScore = globalScore + currentScore;
    currentScore = 0;

    //Write the current score of 0 and the users total score to the screen
    $("#totalScore").html("<p>Total Score: " + globalScore + "<p>");
    $("#score").html("<p>Current Score: " + currentScore + "<p>");
};

//Function that calculates the total score of the word every time the user moves a tile onto the board
function Scoring(tile, square) {

    var letterscore = 0;

    //Loop through the possible values of the tile and finds the corresponding point value
    for (var i = 0; i < 26; i++) {
        if (tile === piecesArray[i]) {
            letterscore = valuesArray[i];
        }
    }
    //Removes the letter tile from the letter string
    letters = letters.replace(tile, '');

    //If the tile was on a double ltter score tile, double the score
    if (square === "doubleLetter")
        letterscore = letterscore * 2;

    currentScore += letterscore;

    if (square === "tripleWord")
        tripleWordScore = true;

    //write the score on the page
    $("#score").html("<p>Score: " + currentScore + "<p>");
};

function UnScoring(tile){

    var letterscore = 0; //score of our current tile

    //Find the corresponding point value of the tile, subtracts it from the current score, and then adds the tile
    //back to the letters string
    for (var i = 0; i < 26; i++) {
        if (tile === piecesArray[i]) {
            letterscore = valuesArray[i];
            letters += tile;
        }
    }

    currentScore = currentScore - letterscore ;

    $("#score").html("<p>Score: " + currentScore + "<p>");

};