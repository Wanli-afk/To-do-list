const inputBox = document.getElementById('input-box');
const list = document.getElementById("list");

function addTask() {
    if(inputBox.value ===  ""){
        alert ("You must add your task...");
    }else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        
        let img = document.createElement('img');
            img.src = 'edit.png';
            li.appendChild(img);
        
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = "";
        saveData(); 
    }     
}

inputBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter" && inputBox.value.trim() !== ''){
        addTask();
        saveData();
    }
});


list.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked");
    saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.tagName === "IMG") {
        let li = e.target.parentElement;
        let currentText = li.childNodes[0].nodeValue.trim();
        let input = document.createElement('input');
        input.type = 'text';
        input.classList ="input-two";
        input.value = currentText;
        li.childNodes[0].nodeValue = '';
        li.insertBefore(input, e.target );
        input.focus();
        input.select();
        

        input.addEventListener('blur', function(){
            saveEditedText(li,input);
            saveData();
        });
        input.addEventListener('keypress',function(even){
            if(even.key === "Enter") {
                saveEditedText(li, input);
                saveData();
            }
        })
        
    }
    });

 function saveEditedText(li, input) {
    li.childNodes[0].nodeValue = input.value;
    input.remove();
 }
 

 
function saveData(){
    localStorage.setItem("listItem", list.innerHTML);
}
function showTask() {
    list.innerHTML = localStorage.getItem("listItem");
}
showTask();