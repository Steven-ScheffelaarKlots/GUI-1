// Steven Scheffelaar Klots
// Steven_ScheffelaarKlots@student.uml.edu
// Student in 91.601 GUI Programming 1
// 11/3/16
// Javascript that generates a multiplication table based upon myForm

function generateTable() {
    //Variables for holding the user input and the table html being put on the page
    var firstInputLower = document.getElementById("myForm").elements[0].value;
    var firstInputUpper = document.getElementById("myForm").elements[1].value;
    var secondInputLower = document.getElementById("myForm").elements[2].value;
    var secondInputUpper = document.getElementById("myForm").elements[3].value;
    var dynamicTable = "";


        //Error checking for no input
    if (firstInputLower === "" || firstInputUpper === "" || secondInputLower === "" || secondInputUpper === "") {
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