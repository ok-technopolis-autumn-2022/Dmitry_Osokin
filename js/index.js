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



form.addEventListener('submit', addTask);
selectAllButton.addEventListener('click', selectAll);
clearButton.addEventListener('click', clearCompleted);
allButton.addEventListener('click', applyFilter);
activeButton.addEventListener('click', applyFilter);
completedButton.addEventListener('click', applyFilter);


import { AppController } from "js/controller/AppController";

const appController = new AppController();