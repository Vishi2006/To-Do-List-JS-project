/* basic logic to build a to do list :- A. add task, B. save task , C. Delete task, D. update task. */
/* uniquness :- dark mode toggle , prioritise tasks , saves in local storage . */

let input = document.querySelector("#task-input"); // access the input filed
let button = document.querySelector("#adding");  // access the button
let Box = document.querySelector("#display-output")  // access the outer div for box
let theme = document.querySelector("#theme");       //access the theme button for toggle

window.onload = () => {
    Box.innerHTML = localStorage.getItem("tasks") || "";
    // get saved tasks from storage and store in innerhtml . if nothing saved then display nothing.
    let removeBtn = document.querySelectorAll("#remove_btn"); //access the newly added remove btn.
    let task_box = document.querySelector("#task_box")          // access when page is refresh.
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {                  // re-attach the event listener because page is refresh, old event is lost
            task_box.remove();
            localStorage.setItem("tasks", Box.innerHTML)
        }
        )
    })
    let checkBoxes = document.querySelectorAll("input[type='checkbox']");
    checkBoxes.forEach((checkbox) => {
        let box_for_list = document.querySelector("#box_for_list")
        // Apply styles based on the checkbox's checked state
        if (checkbox.checked) {
            box_for_list.style.textDecoration = "line-through";
            box_for_list.style.color = "gray";
        } else {
            box_for_list.style.textDecoration = "none";
            box_for_list.style.color = "black";
        }

        // Add event listener for checkbox changes
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                box_for_list.style.textDecoration = "line-through";
                box_for_list.style.color = "gray";
                checkbox.setAttribute("checked", "true");
            } else {
                box_for_list.style.textDecoration = "none";
                box_for_list.style.color = "black";
                checkbox.removeAttribute("checked");
            }
            localStorage.setItem("tasks", Box.innerHTML);
        });
    });


};

button.addEventListener("click", () => {    // adding event listener when button is clicked
    let newList = document.createElement("div");   // creating a new div 
    let removeBtn = document.createElement("button") // creating remove button for each task.
    let checkbox = document.createElement("input")  // creating an input checkbox.
    let task_box = document.createElement("div") // creating a div for every box of task which include checkbox , task and delete btn.
    let box_for_btn = document.createElement("div");    // creating a div for btn because for remove btn.
    let box_for_list = document.createElement("div");    // create div for task and checkbox
    let priority = document.createElement("select")     // create select for adding priority.
    //set attributes and id's.
    box_for_list.id = "box_for_list";
    box_for_list.className = "flex"
    box_for_btn.id = "btnBox";
    removeBtn.id = "remove_btn";
    task_box.id = "task_box";
    checkbox.type = 'checkbox';
    checkbox.id = "checkbox";
    priority.id = "priority";
    //setting options inside the select.
    let optionLow = document.createElement("option");
    let optionMedium = document.createElement("option");
    let optionHigh = document.createElement("option");
    let defaultOption = document.createElement("option");
    defaultOption.text = "Priority";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    optionLow.value = "low";
    optionLow.textContent = "Low";
    optionMedium.value = "medium";
    optionMedium.textContent = "Medium";
    optionHigh.value = "high";
    optionHigh.textContent = "High";
    
    // Add the options into the dropdown
    priority.appendChild(defaultOption);
    priority.appendChild(optionLow);
    priority.appendChild(optionMedium);
    priority.appendChild(optionHigh);


    if (input.value === "") { return; }              // if input task value is null then return.

    checkbox.addEventListener("change", () => {         // add event when task is checked.
        if (checkbox.checked) {
            box_for_list.style.textDecoration = "line-through";
            box_for_list.style.color = "gray"
            checkbox.setAttribute("checked", "true");
        } else {
            box_for_list.style.textDecoration = "none";
            box_for_list.style.color = "black"
            checkbox.removeAttribute("checked");
        }
        localStorage.setItem("tasks", Box.innerHTML);
    });

    // Build the task structure
    newList.textContent = input.value;
    Box.appendChild(task_box);
    task_box.appendChild(box_for_list);
    task_box.appendChild(box_for_btn);
    box_for_list.appendChild(checkbox);
    box_for_list.appendChild(newList);
    box_for_list.appendChild(priority);
    box_for_btn.appendChild(removeBtn);
    removeBtn.textContent = "Remove"
    input.value = "";                   // now set the input value empty for next task
    localStorage.setItem("tasks", Box.innerHTML);  // save the string of tasks using the name 'tasks' in browser in a key : value format.

    
    priority.addEventListener("change", () => {
        if (priority.value === "high") {
            task_box.style.borderLeft = "5px solid red";
        } else if (priority.value === "medium") {
            task_box.style.borderLeft = "5px solid orange";
        } else {
            task_box.style.borderLeft = "5px solid green";
        }
         for (let option of priority.options) {
                option.removeAttribute("selected");
            }
            priority.options[priority.selectedIndex].setAttribute("selected", "true");
           
            localStorage.setItem("tasks", Box.innerHTML);

        });
        
        // delete the task when click on the remove button, when working on current page .
        removeBtn.addEventListener("click", () => {
            task_box.remove()
            localStorage.setItem("tasks", Box.innerHTML);
        })
        
        task_box.classList.add("animate-task");

        let popup = document.createElement("div");
        document.body.classList.add("blur-background");
       popup.className = "popup"
        // Add the iframe animation
        popup.innerHTML = `<iframe src="https://lottie.host/embed/9cf55170-ecb6-473f-8cb0-7fd427c6eeb8/qKImITYMLU.lottie" 
            style="width:150px; height:150px; border:none;"></iframe>`;
        document.body.appendChild(popup);
        // Remove after 2 second
        setTimeout(() => {
          popup.remove();
          document.body.classList.remove("blur-background");
        }, 2000);

});

// add event on the toggle button
// let isdark = false;
// theme.addEventListener("click", () => {
//     if (isdark) {
//         document.body.style.backgroundColor = "rgb(219, 255, 203)"; // Light mode
//     } else {
//         document.body.style.backgroundColor = "rgb(255, 99, 99)"; // Dark mode
//     }
//     isdark = !isdark;
// });
let isDark = false;
theme.onclick = () => {
    isDark = !isDark;
    document.body.classList.toggle("dark-mode");
    theme.textContent = isDark ? "Light" : "Dark";
};


