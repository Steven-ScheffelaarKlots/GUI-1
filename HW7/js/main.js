// Steven Scheffelaar Klots
// Steven_ScheffelaarKlots@student.uml.edu
// Student in 91.601 GUI Programming 1
// 11/3/16
// Javascript that generates a multiplication table based upon myForm
//Taken from example site
var tblValidator = {   // added in Version 4

    highlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": "2px solid red"});
        $('#' + strVarToTest).focus();
    },

    unhighlightError: function (strVarToTest) {
        $('#' + strVarToTest).css({"border": ""});
    }
};

//Custom Jquery validator function that checks whether the first element is less than the second element

jQuery.validator.addMethod("math", function(value, element, params) {
    return document.getElementById("myForm").elements[params.lower].value <= document.getElementById("myForm").elements[params.upper].value;
}, jQuery.validator.format("Please make sure the lower bound is less than the upper bound"));


$(document).ready(function() {
    $.validator.setDefaults({
        submitHandler: function() {
            alert("submitted!");
        }
    });
//Rules for jQuery Validation
    $("#myForm").validate({
        rules: {
            onkeyup: false,
            onclick: false,
            onfocusout: false,
            firstX: {
                required: true,
                digits: true,
                math: {lower: 0, upper: 1}
            },
            secondX: {
                required: true,
                digits: true
            },
            firstY: {
                required: true,
                digits: true,
                math: {lower: 2, upper: 3}
            },
            secondY: {
                required: true,
                digits: true
            }
        },
        //Messages that the user is sent when validation fails, taken from the examples site
        messages : {
            firstX: {
                required: function () {
                    tblValidator.highlightError("firstX");
                    return "<br>The Minimum Column Value is required.";
                },
                digits: function () {
                    tblValidator.highlightError("firstX");
                    return "<br>Please enter only digits for the minimum column value.";
                }
            },
            secondX: {
                required: function () {
                    tblValidator.highlightError("secondX");
                    return "<br>The Maximum Column Value is required.";
                },
                digits: function () {
                    tblValidator.highlightError("secondX");
                    return "<br>Please enter only digits for the maximum column value.";
                }
            },
            firstY: {
                required: function () {
                    tblValidator.highlightError("firstY");
                    return "<br>The Minimum Row Value is required.";
                },
                digits: function () {
                    tblValidator.highlightError("firstY");
                    return "<br>Please enter only digits for the Minimum Row Value.";
                }
            },
            secondY: {
                required: function () {
                    tblValidator.highlightError("secondY");
                    return "<br>The Maximum Row Value is required.";
                },
                digits: function () {
                    tblValidator.highlightError("secondY");
                    return "<br>Please enter only digits for the Maximum Row Value.";
                }
            }
        },
        //generates the table when teh form is submitted
        submitHandler: function(form) {
            generateTable()
        }
    })
});

function generateTable() {
    //Variables for holding the user input and the table html being put on the page
    var firstInputLower = document.getElementById("myForm").elements[0].value;
    var firstInputUpper = document.getElementById("myForm").elements[1].value;
    var secondInputLower = document.getElementById("myForm").elements[2].value;
    var secondInputUpper = document.getElementById("myForm").elements[3].value;
    console.log(firstInputLower);
    console.log(firstInputUpper);
    console.log(secondInputLower);
    console.log(secondInputUpper);
    var dynamicTable = "";

    //Initial html for setting up the table
    dynamicTable += "<table border='1px'>";
    dynamicTable += "<tr style='height:30px;'>";
    dynamicTable += "<td style='width:30px;background-color:#ccc'></td>";

    //Creates the first row of numbers that are not multiplied and have a gray background
    for (var i = firstInputLower; i <= firstInputUpper; i++)
    {
        dynamicTable += "<td style='width:30px;background-color:#ccc'>" + i + "</td>";
    }

    //Nested loop that creates the rest of thw rows with the numbers being multiplied
    for (var k = secondInputLower; k <= secondInputUpper; k++)
    {
        //Crates the first element that is the number being multiplied and gives it a gray background
        dynamicTable += "<tr style='height:30px;'>";
        dynamicTable += "<td style='width:30px;background-color:#ccc'>" + k + "</td>";

        //Loops through the first user input to fill up the row
        for (i = firstInputLower; i <= firstInputUpper; i++)
        {
            dynamicTable += "<td style='width:30px;background-color:#fff'>" + i * k + "</td>";
        }
        dynamicTable += "</tr>";
    }
    dynamicTable += "</table>";
    document.getElementById("table").innerHTML = dynamicTable;
}