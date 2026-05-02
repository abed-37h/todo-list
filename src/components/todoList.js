import './todoList.css';
import { createCheckbox } from './checkbox.js';
import { createList, createListContainer, createListHeader } from './list.js';
import { formatFullDate } from '../utils/dateUtils.js';
import { createActionList, DEFAULT_ACTIONS } from './actionList.js';
import { createIconButton } from './icon.js';

export const createTodoItem = (todo) => {
    const todoItem = document.createElement('li');
    todoItem.className = 'list-item todo-item';
    todoItem.dataset.id = todo.id;

    const toggleCompletionCheckbox = createCheckbox();
    toggleCompletionCheckbox.className = 'toggle-completion-checkbox';

    toggleCompletionCheckbox.addEventListener('change', () => todoItem.classList.toggle('completed'));

    const todoTitle = document.createElement('a');
    todoTitle.className = 'item-name todo-title';
    todoTitle.href = `#${todo.id}`;
    todoTitle.textContent = todo.title;
    todoTitle.addEventListener('click', () => {
        const showTodoEvent = new CustomEvent('todo:view', {
            detail: { todo }
        });
        document.dispatchEvent(showTodoEvent);
    })

    const todoDueDate = document.createElement('p');
    todoDueDate.className = 'item-date todo-due-date';
    todoDueDate.textContent = formatFullDate(todo.dueDate);

    const todoPriority = document.createElement('span');
    todoPriority.className = `todo-priority p-${todo.priority}`;
    todoPriority.textContent = todo.priority;

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions-container';

    const actionList = createActionList(
        Object.values(DEFAULT_ACTIONS).map(action => createIconButton(action)),
    );
    actionList.addEventListener('action:edit', () => {
        const editTodoEvent = new CustomEvent('todo:edit', {
            detail: { todo },
        });
        document.dispatchEvent(editTodoEvent);
    });
    actionList.addEventListener('action:delete', () => {
        const deleteTodoEvent = new CustomEvent('todo:delete', {
            detail: { todo },
        });
        document.dispatchEvent(deleteTodoEvent);
    });

    todoItem.append(
        toggleCompletionCheckbox,
        todoTitle,
        todoDueDate,
        todoPriority,
        actionList,
    );

    return todoItem;
};

export const createTodoList = (todos) => {
    const todoList = createList("You're all caught up! 🎉", todos.length === 0);
    todoList.classList.add('todo-list');

    todoList.append(...todos.map(todo => createTodoItem(todo)));

    return todoList;
};

export const createTodoContainer = (todos, title = 'Todos') => {
    const todoHeader = createListHeader(title);
    todoHeader.classList.add('todo-header');
    todoHeader.addEventListener('click-add', () => {
        const addTodoEvent = new CustomEvent('todo:input');
        document.dispatchEvent(addTodoEvent);
    });

    const todoContainer = createListContainer(
        todoHeader,
        createTodoList(todos),
    );
    todoContainer.classList.add('todo-container');

    return todoContainer;
};

export const updateTodoList = (todoList, todos) => {
    todoList.replaceWith(createTodoList(todos));
};

export const updateTodoContainer = (todoContainer, {
    headerTitle = null,
    todos = null,
}) => {
    if (headerTitle) {
        todoContainer.querySelector('.header-title').textContent = headerTitle;
    }

    if (todos) {
        updateTodoList(
            todoContainer.querySelector('.todo-list'),
            todos,
        );
    }
};
