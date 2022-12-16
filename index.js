const form = document.querySelector('.todo-app_search_bar');
const ul = document.querySelector('.todo-app_task-list');
const selectAllButton = document.querySelector('.todo-app_search_bar__hide_button');
const itemsCounter = document.querySelector('.todo-app_footer__items_left');
const clearButton = document.querySelector('.todo-app_footer__clear_button');
const allButton = document.getElementById('all');
const activeButton = document.getElementById('active');
const completedButton = document.getElementById('completed');

let selected = false;
let tasks = [];

function addTask(e) {
    e.preventDefault();

    if (this.description.value) {
        const task = createTask(this.description.value);
        ul.appendChild(createLi(task))
        tasks.push(task);
    }

    updateCounter();
    this.reset();
}

function applyFilter() {

    ul.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        if (allButton.checked) {
            ul.appendChild(createLi(tasks[i]));
        } else if (activeButton.checked && !tasks[i].isCompleted) {
            ul.appendChild(createLi(tasks[i]));
        } else if (completedButton.checked && tasks[i].isCompleted) {
            ul.appendChild((createLi(tasks[i])))
        }
    }

    updateCounter();
}

function selectAll() {
    const taskList = document.getElementsByTagName('li');
    if (selected) {
        for (let i = 0; i < taskList.length; i++) {
            taskList[i].childNodes[0].checked = false;
            tasks[i].isCompleted = false;
        }
    } else {
        for (let i = 0; i < taskList.length; i++) {
            taskList[i].childNodes[0].checked = true;
            tasks[i].isCompleted = true;
        }
    }
    selected = !selected;
    updateCounter();
}

function clearCompleted() {
    const taskList = document.getElementsByTagName('li');
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].firstChild.checked) {
            taskList[i].remove();
            i--;
        }
    }
    updateCounter();
}

function updateCounter() {
    let n = 0;
    for (let i = 0; i < ul.childNodes.length; i++) {
        // first check to avoid null elements
        if (ul.childNodes[i].firstChild
            && !ul.childNodes[i].firstChild.checked) {
            n++
        }
    }
    itemsCounter.textContent = `${n} items left`;
}

/**
 *
 * @param task {{id: string | number, desc: string, isCompleted: boolean}}
 * @returns {string}
 */
function createLi(task) {
    const li = document.createElement('li');
    li.id = task.id;
    li.className = 'todo-app_task-item';

    const itemView = document.createElement('div');
    itemView.className = 'task-item_view';

    const input = document.createElement('input');
    input.id = task.id;
    input.type = 'checkbox';
    input.checked = task.isCompleted;
    input.className = 'task-item_checkbox';
    input.ariaLabel = 'Completed task: ${task.desc}';

    const span = document.createElement('span');
    span.textContent = task.desc;
    span.className = 'task-item_text';

    const label = document.createElement('label');
    label.htmlFor = task.id;
    label.className = 'task-item_label';

    const button = document.createElement('button');
    button.textContent = 'delete';
    button.className = 'task-item_delete';

    const deleteTask = () => {
        button.removeEventListener('click', deleteTask);
        li.remove();
        updateCounter();
    }
    button.addEventListener('click', deleteTask);

    li.append(input, label, span, button);
    li.appendChild(itemView);

    return li;
}

function createTask(desc) {
    return {
        id: Date.now(),
        desc: desc,
        isCompleted: false
    }
}

form.addEventListener('submit', addTask);
selectAllButton.addEventListener('click', selectAll);
clearButton.addEventListener('click', clearCompleted);
allButton.addEventListener('click', applyFilter);
activeButton.addEventListener('click', applyFilter);
completedButton.addEventListener('click', applyFilter);

