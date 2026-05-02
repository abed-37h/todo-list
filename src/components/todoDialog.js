import './todoDialog.css';
import Todo from '../classes/todo.js';
import { createButton, createForm, createInputContainer, createInputSection, createInputTextbox, createSelectInput } from './form.js';
import { setDialogFooterButtons, setDialogHeaderTitle, updateDialogContent } from './dialog.js';
import { createDetailedView, createField } from './detailedView.js';
import { formatFullDate } from '../utils/dateUtils.js';
import StorageInterface from '../storage/storage.js';
import Project from '../classes/project.js';

export const createTodoForm = (todo) => {
    const availableProjects = new StorageInterface('projects', Project).fetch();
    const activeProjectId = location.hash.startsWith('#proj') ? location.hash.substring(1) : null;

    let title = null;
    let description = null;
    let dueDate = null;
    let priority = 'low';
    let projectId = null;
    let event = 'add';
    let todoId = `todo:${crypto.randomUUID()}`;

    if (todo) {
        title = todo.title;
        description = todo.description;
        dueDate = todo.dueDate;
        priority = todo.priority;
        projectId = availableProjects.find(project => project.id == todo.projectId)?.id;
        event = 'update';
        todoId = todo.id;
    }
    
    const formInputSection = createInputSection([
        createInputContainer({
            input: createInputTextbox({
                type: 'text',
                name: 'title',
                placeholder: 'Finish my assignments',
                required: true,
                value: title,
            }),
            label: 'Title',
        }),
        createInputContainer({
            input: createInputTextbox({
                type: 'textarea',
                name: 'description',
                placeholder: 'Add description...',
                value: description,
            }),
            label: 'Description',
        }),
        createInputContainer({
            input: createInputTextbox({
                type: 'datetime-local',
                name: 'dueDate',
                value: formatFullDate(dueDate, { dateFormat: "yyyy-MM-dd'T'HH:mm" }),
            }),
            label: 'Due Date',
        }),
        createInputContainer({
            input: createSelectInput({
                name: 'priority',
                options: Object.values(Todo.PRIORITIES),
                value: priority,
            }),
            label: 'Priority',
        }),
        createInputContainer({
            input: createSelectInput({
                name: 'projectId',
                options: [
                    {
                        value: '',
                        text: 'None',
                    },
                    ...availableProjects.map(project => {
                        return {
                            value: project.id,
                            text: project.name,
                        };
                    }),
                ],
                value: projectId || activeProjectId || '',
            }),
            label: 'Project',
        }),
    ]);
    
    const todoForm = createForm({
        id: 'todo-form',
        method: 'post',
        elements: [ formInputSection ],
        onSubmit: e => {
            e.preventDefault();

            const data = new FormData(e.target);

            const title = data.get('title');
            const description = data.get('description');
            const dueDate = data.get('dueDate') || null;
            const priority = data.get('priority');
            const projectId = data.get('projectId') || null;

            const todo = new Todo({
                id: todoId,
                title,
                description,
                dueDate,
                priority,
                projectId,
            });
            
            const submitFormEvent = new CustomEvent(`todo:${event}`, {
                detail: { todo },
            });
            document.dispatchEvent(submitFormEvent);
        },
    });
    todoForm.classList.add('todo-form');

    return todoForm;
};

export const createTodoView = (todo) => {
    const todoView = createDetailedView([
        createField({
            label: 'Title',
            value: todo.title,
            className: 'title',
        }),
        createField({
            label: 'Description',
            value: todo.description,
            className: 'description long-text',
        }),
        createField({
            label: 'Due Date',
            value: formatFullDate(todo.dueDate, { relative: true }),
            className: 'due-date',
        }),
        createField({
            label: 'Priority',
            value: todo.priority,
            className: 'priority',
        }),
        createField({
            label: 'Project',
            value: new StorageInterface('projects', Project).find(todo.projectId)?.name || 'Not in a project',
            className: 'todo-project',
        }),
        createField({
            label: 'Status',
            value: todo.completed ? 'Completed' : 'Not completed yet',
            className: 'status',
        }),
    ]);
    todoView.classList.add('todo-detailed-view', 'todo-container');

    return todoView;
};

export const updateTodoDialog = (dialog, mode, todo = null) => {
    let headerTitle = '';
    let content = document.createElement('div');
    let footerButtons = [];

    if (mode === 'form') {
        headerTitle = `${todo ? 'Edit' : 'Add'} a todo`;
        content = createTodoForm(todo);
        footerButtons = [
            createButton({
                className: 'form-cancel dialog-close',
                textContent: 'Cancel',
                attributes: { name: 'cancel', type: 'reset' },
            }),
            createButton({
                className: 'form-cta',
                textContent: 'Confirm',
                attributes: { name: 'confirm' },
                form: content.id,
            }),
        ];
    }
    else {
        headerTitle = todo.title;
        content = createTodoView(todo);
        footerButtons = [
            createButton({
                className: 'delete danger',
                textContent: 'Delete',
                attributes: { name: 'delete' },
                onClick: () => {
                    const deleteTodoEvent = new CustomEvent('todo:delete', {
                        detail: { todo },
                    });
                    document.dispatchEvent(deleteTodoEvent);
                }
            })
        ];
    }

    setDialogHeaderTitle(dialog, headerTitle);
    updateDialogContent(dialog, content);
    setDialogFooterButtons(dialog, footerButtons);
};
