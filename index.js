const form = document.querySelector('.todo-app_search_bar');
const ul = document.querySelector('.todo-app_task-list');
const selectAllButton = document.querySelector('.todo-app_search_bar__hide_button');
const itemsCounter = document.querySelector('.todo-app_footer__items_left');
const clearButton = document.querySelector('.todo-app_footer__clear_button');
document.querySelector('.task-item_checkbox');
const allButton = document.getElementById('all');
const activeButton = document.getElementById('active');
const completedButton = document.getElementById('completed');

let selected = false;
let tasksLi = [];

function addTask(e) {
    e.preventDefault();

    if (this.description.value) {
        const task = createTask(this.description.value);
        const li = createLi(task);
        ul.appendChild(createLi(task))
        tasksLi.push(li);
    }

    updateCounter();
    this.reset();
}

function applyFilter() {

    ul.innerHTML = '';

    for (let i = 0; i < tasksLi.length; i++) {
        if (allButton.checked) {
            ul.appendChild(tasksLi[i]);
        } else if (activeButton.checked && !tasksLi[i].childNodes[0].checked) {
            ul.appendChild(tasksLi[i]);
        } else if (completedButton.checked && tasksLi[i].childNodes[0].checked) {
            ul.appendChild(tasksLi[i])
        }
    }

    updateCounter();
}

function selectAll() {
    const taskList = document.getElementsByTagName('li');
    if (selected) {
        for (let i = 0; i < taskList.length; i++) {
            alert(taskList[i]);
            taskList[i].childNodes[0].checked = false;
            taskList[i].childNodes[2].classList.toggle('wip');
        }
    } else {
        for (let i = 0; i < taskList.length; i++) {
            taskList[i].childNodes[0].checked = true;
            taskList[i].childNodes[2].classList.toggle('done');

        }
    }
    selected = !selected;
    updateCounter();
}

function taskAction(event) {
    target = event.target;
    const li = target.parentNode;

    switch (target.className) {
        case 'task-item_delete':
            deleteTask(target, li);
            break;
        case 'task-item_checkbox':
            checkTask(target, li);
            break;
    }

}

/**
 *
 * @param button: HTMLElement
 * @param li: HTMLLiElement
 */
function deleteTask(button, li) {
    button.removeEventListener('click', deleteTask);
    tasksLi.splice(tasksLi.indexOf(li), 1);
    li.remove();
    updateCounter();
}

function checkTask(checkbox, li) {
    if (checkbox.checked === false) {
        li.childNodes[0].checked = true;
        li.childNodes[2].classList.toggle('done');
    } else {
        li.childNodes[0].checked = false;
        li.childNodes[2].classList.toggle('wip');
    }

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
ul.addEventListener('click', taskAction);