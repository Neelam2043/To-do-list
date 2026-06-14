const inputBox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

inputBox.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        addTask();
    }
    if(event.key === "Backspace" && inputBox.value === ""){
        let lastTask = listcontainer.lastElementChild;

        if(lastTask){
            lastTask.remove();
            savedata();
            updatesummary();
        }

    }
});

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        updatesummary();
    }
    inputBox.value = "";
    savedata();
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        savedata();
        updatesummary();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        savedata();
        updatesummary();
    }
    },false);

function savedata(){
    localStorage.setItem("data", listcontainer.innerHTML);
}
function showtask(){
    listcontainer.innerHTML = localStorage.getItem("data") || "";
}
showtask();
updatesummary();

function updatesummary(){
    let total = document.querySelectorAll("#list-container li").length;

    let completed = document.querySelectorAll("#list-container li.checked").length;

    let pending = total - completed;

    document.getElementById("total").innerHTML = total;
    document.getElementById("completed").innerHTML = completed;
    document.getElementById("pending").innerHTML = pending;
}

