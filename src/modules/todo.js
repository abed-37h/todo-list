import { isFutureDate, parseDate } from "../utils/dateUtils";
import { validate } from "../validation/validations";
import { PRIORITY, STATUS } from "./constants";

export default class Todo {
    /** @type {String} */
    #id
    /** @type {String} */
    #title;
    /** @type {String} */
    #description;
    /** @type {Date} */
    #dueDate;
    /** @type {import("./constants").PriorityType} */
    #priority;
    /** @type {import("./constants").StatusType} */
    #status;
    /** @type {String | null} */
    #projectId;

    /**
     * Class constructor
     * @param {String} id
     * @param {String} title 
     * @param {{description?: String, dueDate?: Date, priority?: import("./constants").PriorityType, status?: import("./constants").StatusType, projectId?: String}} options 
     */
    constructor(id, title, { description = null, dueDate = null, priority = PRIORITY.LOW, status = STATUS.PENDING, projectId = null } = {}) {
        this.#id = this.#setId(id);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#setStatus(status);
        this.projectId = projectId;
    }

    /**
     * @returns {String} id
     */
    get id() {
        return this.#id;
    }

    /**
     * Sets id
     * @param {String | null} id 
     * @returns {String}
     */
    #setId(id) {
        if (!id) return crypto.randomUUID();
        validate(id, 'id');
        return id;
    }

    /**
     * @returns {String} title
     */
    get title() {
        return this.#title;
    }

    /**
     * @param {String} value 
     */
    set title(value) {
        validate(value, 'title');
        this.#title = value.trim();
    }

    /**
     * @returns {String | null} description
     */
    get description() {
        return this.#description;
    }

    /**
     * @param {String | null} value 
     */
    set description(value) {
        if (value) validate(value, 'description');
        this.#description = value?.trim() || null;
    }

    /**
     * @returns {Date | null} dueDate
     */
    get dueDate() {
        return this.#dueDate;
    }

    /**
     * @param {Date | null} value 
     */
    set dueDate(value) {
        if (value) validate(value, 'dueDate');
        this.#dueDate = value;
    }

    /**
     * @returns {import("./constants").PriorityType} priority
     */
    get priority() {
        return this.#priority;
    }

    /**
     * @param {import("./constants").PriorityType} value 
     */
    set priority(value) {
        validate(value, 'priority');
        this.#priority = value;
    }

    /**
     * @returns {import("./constants").StatusType} status
     */
    get status() {
        return this.#status;
    }

    #setStatus(status) {
        validate(status, 'status');
        this.#status = status;
    }

    /**
     * @returns {String | null} projectId
     */
    get projectId() {
        return this.#projectId;
    }

    /**
     * @param {String | null} value 
     */
    set projectId(value) {
        if (value) validate(value, 'id');
        this.#projectId = value;
    }

    /**
     * Set status pending
     */
    reopen() {
        this.#status = STATUS.PENDING;
    }

    /**
     * Set status in progress
     */
    start() {
        this.#status = STATUS.IN_PROGRESS;
    }

    /**
     * Sets status completed
     */
    complete() {
        this.#status = STATUS.COMPLETED;
    }

    /**
     * Checks if date is overdue
     * @returns {Boolean}
     */
    isOverdue() {
        return isFutureDate(this.dueDate);
    }

    /**
     * Serializes Todo into a plain object
     * @returns {{id: String, title: String, description: String | null, dueDate: Date | null, priority: String, status: String, projectId: String | null}}
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            status: this.status,
            projectId: this.projectId,
        };
    }

    /**
     * Creates a Todo instance from JSON data
     * @param {{id: string, title: String, description?: String, dueDate?: Date, priority?: String, status?: String, projectId?: String}} json 
     * @returns {Todo}
     */
    static fromJSON({ id, title, description, dueDate, priority, status, projectId }) {
        return new Todo(id, title, { description, dueDate: parseDate(dueDate), priority, status, projectId });
    }
}
