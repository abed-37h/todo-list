import { isFutureDate, isValidDate, parseDate } from '../utils/dateUtils.js';
import Group from './group.js';

export default class Project extends Group {
    #dateCreated;

    constructor({
        id,
        name,
        description = '',
        dateCreated = new Date(),
    } = {}) {
        super({
            id,
            name,
            description,
            filterFn: item => item.projectId === this.id,
        });
        this.#setDateCreated(dateCreated);
    }

    get dateCreated() {
        return this.#dateCreated;
    }

    #setDateCreated(value) {
        if (value === null) {
            this.#dateCreated = null;
            return;
        }

        const temp = isValidDate(value) ? value : new Date(value);

        if (!isValidDate(temp)) {
            throw 'Invalid dateCreated: provided date must be convertible to `Date` datatype or null!';
        }
        
        if (isFutureDate(temp)) {
            throw 'Invalid dateCreated: provided date must not be in future!';
        }

        this.#dateCreated = temp;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            dateCreated: this.dateCreated,
        };
    }

    static fromJSON({
        id,
        name,
        description,
        dateCreated,
    }) {
        return new Project({
            id,
            name,
            description,
            dateCreated: parseDate(dateCreated),
        });
    }
}
