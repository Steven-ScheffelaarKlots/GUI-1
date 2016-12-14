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

//The number of generated table tabs
var tableNum = 0;

//Options for the validation
var validationOptions = {
    rules: {
        onkeyup: true,
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
            digits: function () {
                tblValidator.highlightError("firstX");
                return "<br>Please enter only digits for the minimum column value.";
            }
        },
        secondX: {
            digits: function () {
                tblValidator.highlightError("secondX");
                return "<br>Please enter only digits for the maximum column value.";
            }
        },
        firstY: {
            digits: function () {
                tblValidator.highlightError("firstY");
                return "<br>Please enter only digits for the Minimum Row Value.";
            }
        },
        secondY: {
            digits: function () {
                tblValidator.highlightError("secondY");
                return "<br>Please enter only digits for the Maximum Row Value.";
            }
        }
    },
    //generates the table when teh form is submitted
    submitHandler: function(form) {
        generateTable()
    },
    success: function() {
        generateTable()
    }
};
//Custom Jquery validator function that checks whether the first element is less than the second element

jQuery.validator.addMethod("math", function(value, element, params) {
    return parseInt(document.getElementById("myForm").elements[params.lower].value) <= parseInt(document.getElementById("myForm").elements[params.upper].value);
}, jQuery.validator.format("Please make sure the lower bound is less than the upper bound"));


$(document).ready(function() {
    $.validator.setDefaults({
        submitHandler: function() {
            alert("submitted!");
        }
    });

    //initiates the tabs
    $("#tabs").tabs();

    //All of the options for the 4 sliders
    var firstXOptions = {
        min: 1,
        max: 50,
        slide: function (e, ui) {
            $("#firstX").val(ui.value)
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    var secondXOptions = {
        min: 1,
        max: 50,
        slide: function (e, ui) {
            $("#secondX").val(ui.value)
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    var firstYOptions= {
        min: 1,
        max: 50,
        slide: function (e, ui) {
            $("#firstY").val(ui.value)
        },
        change: function () {
            $("#myForm").valid();
        }
    };

    var secondYOptions = {
        min: 1,
        max: 50,
        slide: function (e, ui) {
            $("#secondY").val(ui.value)
        },
        change: function () {
            $("#myForm").valid();
        }

    };

    //Changes the values of every slider when teh corresponding input is changed
    $( "#firstX" ).change(function() {
        $("#myForm").valid();
        $( "#firstXSlider" ).slider( "value", $(this).val() );
    });

    $( "#secondX" ).change(function() {
        $( "#secondXSlider" ).slider( "value", $(this).val() );
    });

    $( "#firstY" ).change(function() {
        $("#myForm").valid();
        $( "#firstYSlider" ).slider( "value", $(this).val() );
    });

    $( "#secondY" ).change(function() {
        $("#myForm").valid();
        $( "#secondYSlider" ).slider( "value", $(this).val() );
    });

    //Initiates the sliders
    $("#firstXSlider").slider(firstXOptions);
    $("#secondXSlider").slider(secondXOptions);
    $("#firstYSlider").slider(firstYOptions);
    $("#secondYSlider").slider(secondYOptions);

    //Validation rules for the form
    $("#myForm").validate(validationOptions);
//Rules for jQuery Validation

});
//Saves whatever table is displayed in the slider tab and displays it in a new tab
function saveTable() {
    var tabs = $("#tabs").tabs();
    var firstX = $("#firstX").val();
    var secondX = $("#secondX").val();
    var firstY = $("#firstY").val();
    var secondY = $("#secondY").val();
    var tableData = document.getElementById("table").innerHTML; //Gets the current table HTML
    var ul = tabs.find( "ul" ); //Variable needed for determining where the next tab should go
    var tabNum = returnNewTableNum(); //Tab numbered used for determining the tab ID and tab name
    var tabName = tabNum + ". " + firstX.toString() + " - " + secondX.toString() + ", " + firstY
    + " - " + secondY;

    $( "<li id='tab" + tabNum + "'><a href='#" + tabNum + "'>" + tabName + "</a></li>" ).appendTo( ul );
    $( "<div id='" + tabNum + "'>" + tableData + "</div>" ).appendTo( tabs );
    tabs.tabs( "refresh" );
}

function generateTable() {
    //Variables for holding the user input and the table html being put on the page
    var firstInputLower = parseInt(document.getElementById("myForm").elements[0].value);
    var firstInputUpper = parseInt(document.getElementById("myForm").elements[1].value);
    var secondInputLower = parseInt(document.getElementById("myForm").elements[2].value);
    var secondInputUpper = parseInt(document.getElementById("myForm").elements[3].value);
    document.getElementById("table").innerHTML = "";
    var dynamicTable = document.getElementById("table").innerHTML ;

            //Error checking for no input
    if (isNaN(firstInputLower) || isNaN(firstInputUpper) || isNaN(secondInputLower) || isNaN(secondInputUpper)) {
        document.getElementById("table").innerHTML = "<div class='error'>You did not input a value</div>";
        return
    }

        //Error checking for negative inputs
    if(firstInputLower <= 0) {
        document.getElementById("table").innerHTML = "<div class='error'>You have an input that is negative</div>";
        return
    }
    if(firstInputUpper <= 0) {
        document.getElementById("table").innerHTML = "<div class='error'>You have an input that is negative</div>";
        return
    }
    if(secondInputLower <= 0) {
        document.getElementById("table").innerHTML = "<div class='error'>You have an input that is negative</div>";
        return
    }
    if(secondInputUpper <= 0) {
        document.getElementById("table").innerHTML = "<div class='error'>You have an input that is negative</div>";
        return
    }

    //Error checking to see whether the bounds are correct
    if(firstInputLower > firstInputUpper)
    {
        document.getElementById("table").innerHTML = "<div class='error'> Your lower bound is greater than your " +
            "upper bound for the top row</div>";
        return;
    }

    if(secondInputLower > secondInputUpper)
    {
        document.getElementById("table").innerHTML = "<div class='error'>Your lower bound is greater than your " +
            "upper bound for the side column</div>";
        return;
    }


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
//Returns whatever tab number should be used next
function returnNewTableNum() {
    tableNum = tableNum + 1;
    return tableNum;
}

//Deletes tabs. Either deletes 1 tab if 1 number is given, or deletes multiple in a range if 2 numbers are given
function deleteTabs() {
    var lower = $("#lowerDelete").val();
    var upper = $("#upperDelete").val();
    var i;
    var tabID;
    if (lower != undefined && upper == undefined) {
        tabID = "#tab" + lower;
        $(tabID).hide();
    } else {
        if (upper < lower) {
            for (i = upper; i <= lower; i++) {
                tabID = "#tab" + i;
                $(tabID).hide();
            }
        } else
            for (i = lower; i <= upper; i++) {
                tabID = "#tab" + i;
                $(tabID).hide();
            }
    }
}