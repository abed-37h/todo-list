
export default class Todo {
    static PRIORITIES = Object.freeze({
        LOW: 'low',
        MEDIUM: 'medium',
        HIGH: 'high',
    });

    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #projectId;
    #completed;
    #dateCreated;

    constructor({
        id,
        title,
        description = '',
        dueDate = null,
        priority = 'low',
        projectId = null,
        completed = false,
        dateCreated = new Date(),
    } = {}) {
        this.#setId(id);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId;
        this.#setCompleted(completed);
        this.#setDateCreated(dateCreated);
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        if (!value || typeof value !== 'string') {
            throw 'Invalid title: title must be non empty string!';
        }
        
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (typeof value !== 'string') {
            throw 'Invalid description: description must be a string!';
        }
        
        this.#description = value || '';
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(value) {
        if (value !== null && !(value instanceof Date)) {
            try {
                this.#dueDate = Date(value);
            } catch (error) {
                throw 'Invalid dueDate: provided date must be convertible to `Date` datatype or null!';
            }
        }

        this.#dueDate = value;
    }

    get priority() {
        return this.#priority;
    }

    set priority(value) {
        if (
            typeof value !== 'string'
            || !Object.values(Todo.PRIORITIES).includes(value)
        ) {
            throw `Invalid priority: priority must be a string and be one of the the following: ${Object.values(Todo.PRIORITIES).join(', ')}!`;
        }

        this.#priority = value;
    }

    get projectId() {
        return this.#projectId;
    }

    set projectId(value) {
        if (value !== null && typeof value !== 'string') {
            throw 'Invalid projectId: id must be a string!';
        }

        this.#projectId = value;
    }

    get completed() {
        return this.#completed;
    }

    get dateCreated() {
        return this.#dateCreated;
    }

    #setId(value) {
        if (typeof value !== 'string') {
            throw 'Invalid id: id must be a string!';
        }

        this.#id = value;
    }

    #setCompleted(value) {
        if (typeof value !== 'boolean') {
            throw 'Invalid completed status: completed status must be a boolean!';
        }
    }

    #setDateCreated(value) {
        if (value !== null && !(value instanceof Date)) {
            try {
                this.#dueDate = Date(value);
            } catch (error) {
                throw 'Invalid dateCreated: provided date must be convertible to `Date` datatype or null!';
            }
        }

        this.#dateCreated = value;
    }

    isComplete() {
        return this.#completed;
    }

    toggleComplete() {
        this.#completed = !this.#completed;
    }

    complete() {
        this.#completed = true;
    }

    undoComplete() {
        this.#completed = false;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.title,
            projectId: this.projectId,
            completed: this.completed,
            dateCreated: this.dateCreated,
        };
    }
    
    static fromJSON({
        id,
        title,
        description,
        dueDate,
        priority,
        projectId,
        completed,
        dateCreated,
    }) {
        return new Todo({
            id,
            title,
            description,
            dueDate: dueDate && new Date(dueDate),
            priority,
            projectId,
            completed,
            dateCreated: dateCreated && new Date(dateCreated),
        });
    }
}
