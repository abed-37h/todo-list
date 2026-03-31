import Group from './group.js';

export default class Category extends Group {
    constructor({
        id,
        name,
        description = '',
        filterFn = item => true,
    } = {}) {
        super({
            id,
            name,
            description,
            filterFn,
        });
    }
}
