// To add save button items to the saveForLater Page

// Create a function to set up the session storage
function create() {
    if(sessionStorage.getItem("savedPages") == null) {
        //Instead of an array at the top add the blank array here
        sessionStorage.setItem("savedPages", JSON.stringify([]));
    } 
}

create()

// Create a function to add a new element on to the Saved Items page
function loadItems() {
    // If there are no items saved change the heading
    if(sessionStorage.getItem("savedPages") == null || JSON.parse(sessionStorage.getItem("savedPages")).length == 0) {
        document.getElementById("newHeading").innerHTML = "Please save some items here first.";
    } else {
        let myList = document.getElementById("pagesList");
        // Must be an array to use a for loop
        let pagesArr = JSON.parse(sessionStorage.getItem("savedPages"));

        // To add each item to the array
        for(let i = 0; i < pagesArr.length; i++) {
            let item = document.createElement("li");
            item.innerHTML = pagesArr[i];
            item.style.border = "2px solid black";
            myList.appendChild(item);
        }
    }
}

// Get the information from each page when the save button is clicked and push it on to the new page
function addPage(event) {
    let pageData;
    let path = window.location.pathname.split("/").pop();

    // If button is clicked on the Home Page
    if (path == "index.html") {
        console.log("Home Page");
        pageData = event.target.parentElement.cloneNode(deep=true);
        pageData.removeChild(pageData.lastElementChild);
        pageData = pageData.innerHTML;
    // If button is clicked on the Recommendations Page
    } else if (path == "recommendations.html") {
        console.log("Recommendations Page");
        pageData = event.target.parentElement.parentElement.cloneNode(deep=true);
        pageData.removeChild(pageData.lastElementChild);
        pageData = pageData.innerHTML;
        pageData = "<table>\n<tr>\n" + pageData + "\n</tr>\n</table>";
    // If button is clicked on the Places To Go page 
    } else if (path == "placesToGo.html") {
        console.log("Places To Go Page");
        pageData = event.target.previousElementSibling.parentElement.cloneNode(deep=true);
        let button = pageData.getElementsByClassName("saveButton")[0];
        console.log(button);
        button.remove();
        pageData = pageData.innerHTML;
    }

    // Change to an array to be able to push the items
    let pagesArr = JSON.parse(sessionStorage.getItem("savedPages"));
    pagesArr.push(pageData);

    // Show the user how many items they have saved on the Saved Items page
    alert(`You have saved ${pagesArr.length} items onto your Saved Items Page.`);

    // Change back to a string to save it to session storage
    sessionStorage.setItem("savedPages", JSON.stringify(pagesArr));
}

// Make a function to hold the event listener which allows us to find which save button is clicked
function addEventListenerToSaveButtons() {
    let buttons = document.getElementsByClassName("saveButton");

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (event) => {addPage(event)});
    }
}

addEventListenerToSaveButtons();