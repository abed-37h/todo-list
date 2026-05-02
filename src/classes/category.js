import { isDateToday } from '../utils/dateUtils.js';
import Group from './group.js';

export default class Category extends Group {
    static FILTER_FNS = Object.freeze({
        inbox: item => !item.projectId,
        today: item => isDateToday(item.dueDate),
        completed: item => item.completed,
        all: item => true,
    });
    
    #filterFnName;

    constructor({
        id,
        name,
        description = '',
        filterFn = 'all',
    } = {}) {
        super({
            id,
            name,
            description,
            filterFn: Category.FILTER_FNS[filterFn],
        });
        this.#filterFnName = filterFn;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            filterFn: this.#filterFnName,
        };
    }

    static fromJSON({
        id,
        name,
        description,
        filterFn,
    }) {
        return new Category({
            id,
            name,
            description,
            filterFn,
        });
    }
}
