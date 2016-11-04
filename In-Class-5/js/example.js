// ADD NEW ITEM TO END OF LIST
var end = document.createElement("li");
var node = document.createTextNode("Sandwiches");
end.appendChild(node);

var element = document.getElementById("page");
element.appendChild(end);


// ADD NEW ITEM START OF LIST
var start = document.createElement("li");
var node2 = document.createTextNode("Apple Sauce");
start.appendChild(node2);

var child = document.getElementsByTagName("ul").item(0);
element.insertBefore(start,child);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var list = document.getElementsByTagName("li");
for(var i = 0; i < list.length; i++){
    list[i].className = "cool";
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header2 = document.getElementsByTagName("h2").item(0);
var node3 = document.createElement("Span");
var elementCounter = document.createTextNode(" " + list.length);
node3.appendChild(elementCounter);
header2.appendChild(node3);