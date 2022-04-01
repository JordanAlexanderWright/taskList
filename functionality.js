// Setting up a few things I will be using 

const taskButton = document.querySelector('#submit');
const formInput = document.querySelector('#task');
formInput.value = '';
const listCollection = document.querySelector('ul.collection');

// Selecting and adding functionality to the clear buttons on each task item


// Adding functionality to my buttons and forms that are on the page. 

const clearTasks = document.querySelector('#clear');
clearTasks.addEventListener('click', runClear);

const form = document.querySelector('form');
form.addEventListener('submit', addTask);


// Defining my functions for the event listeners
// This one selectis ALL li elements and deletes them

function runClear() {
    
    const lis = document.querySelectorAll('li');

    lis.forEach(function(item){
        item.remove();

    savedTasks.tasks = []
    savingTasks()
    })
};

// This function prevents the default behavior of the submit form (that resets everything), then runs the function to add tasks
// E IS PASSED AUTOMATICALLY BY ADD EVENT LISTENER. It allows me to change manipulate it. 

function addTask(e){

    e.preventDefault();
    addListItem(formInput.value, 0);
    formInput.value = '';
    
};

// Functionality for the remove buttons (x)     

function removeMe(){                                                                              
    console.log('BLAH');                    
    console.log(this.parentElement.textContent);                                              
    const index = savedTasks.tasks.indexOf(this.parentElement.textContent);
    savedTasks.tasks.splice(index);
    this.parentElement.remove();
    savingTasks();
};

// This function wil get the User input in the task form, create a list element (and link) and add it to the tasks list
// Takes two parameters, the text to make an taks out of, and a flag to use for my automation set up, or user input. Affects save outcome.

function addListItem(text, flag){

    if(text === ""){
        console.log('Invalid Input')

    } else {
        newListItem = document.createElement('li');
        newListItem.textContent = text;
        newListItem.className = ('collection-item');
    
        link = document.createElement('a');
        newListItem.append(link);
        link.innerHTML = link.innerHTML = '<i class="fa fa-remove"></i>';
        link.href = '#';
        link.className = 'delete-item secondary-content';
        link.addEventListener('click', removeMe);

        if (flag === 0){
            savedTasks.tasks.push(text);
            console.log('adding');
        }

        savingTasks();
        listCollection.appendChild(newListItem);
    }
};

// Adding a function to run to set the variable to handle storage

function checkLocalStorage() {

    if(localStorage.getItem('tasks')){

        console.log('tasks exists');
        savedList = localStorage.getItem('tasks').split(',');
        localStorage.setItem('tasks', [])
        const savedTasks = {tasks: savedList};
        return savedTasks;

    } else {

        const savedTasks = {tasks: []};
        console.log('made tasks');
        return savedTasks;
    };
};

// Adding a function that will that the information store din my savedTasks object, then save it to local storage (parsing)

function savingTasks(){

    parsedTasks = savedTasks.tasks;
    parsedTasks.toString();
    localStorage.setItem('tasks', parsedTasks)
};

// All of this code allows me write into the new task submission form, then get the information from it. I'm going to use code from
// The previous excercse to then allow me to create a list item addition. 

// Creating a function to do at runtime that will auto populate my task list with my tasks saved in localStorage.

function storedTasks(){

    savedTasks.tasks.forEach(function(task){
        addListItem(task, 1)
    })
};


// Runtime logic

savedTasks = checkLocalStorage();

storedTasks();


