import Project from '../classes/project.js';
import { setDialogFooterButtons, setDialogHeaderTitle, updateDialogContent } from './dialog.js';
import { createButton, createForm, createInputContainer, createInputSection, createInputTextbox } from './form.js';
import './projectDialog.css';

export const createProjectForm = (project = null) => {
    let name = null;
    let description = null;
    let event = 'add';
    let projectId = `proj:${crypto.randomUUID()}`;

    if (project) {
        name = project.name;
        description = project.description;
        event = 'update';
        projectId = project.id;
    }

    const formInputSection = createInputSection([
        createInputContainer({
            input: createInputTextbox({
                type: 'text',
                name: 'name',
                placeholder: 'Study',
                required: true,
                value: name,
            }),
            label: 'Name',
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
    ]);

    const projectForm = createForm({
        id: 'project-form',
        method: 'post',
        elements: [ formInputSection ],
        onSubmit: e => {
            e.preventDefault();

            const data = new FormData(e.target);

            const name = data.get('name');
            const description = data.get('description');

            const project = new Project({
                id: projectId,
                name,
                description,
            });
            
            const submitFormEvent = new CustomEvent(`project:${event}`, {
                detail: { project },
            });
            document.dispatchEvent(submitFormEvent);
        },
    });
    projectForm.classList.add('project-form');

    return projectForm;
};

export const updateProjectDialog = (dialog, project = null) => {
    const headerTitle = `${project ? 'Edit' : 'Add'} a project`;
    const content = createProjectForm(project);
    const footerButtons = [
        createButton({
            className: 'form-cancel dialog-close',
            textContent: 'Cancel',
            attributes: { name: 'cancel', type: 'reset'},
        }),
        createButton({
            className: 'form-cta',
            textContent: 'Confirm',
            attributes: { name: 'confirm' },
            form: content.id,
        }),
    ];

    setDialogHeaderTitle(dialog, headerTitle);
    updateDialogContent(dialog, content);
    setDialogFooterButtons(dialog, footerButtons);
};
