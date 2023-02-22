// To let the user add a comment on the Places To Go Page

let post = document.getElementById("post");

post.addEventListener("click", function(){
    let commentBoxValue = document.getElementById("commentBox").value;
 
    let li = document.createElement("li");
    let text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("commentsList").appendChild(li);

    document.getElementById("commentBox").value = "";
 
});
