
export default class Group {
    #id;
    #name;
    #description;
    #filterFn;

    constructor({
        id,
        name,
        description,
        filterFn,
    } = {}) {
        this.#setId(id);
        this.name = name;
        this.description = description;
        this.filterFn = filterFn;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }
    
    set name(value) {
        if (!value) {
            throw 'Invalid name: name must be non empty string!';
        }
        
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (typeof value !== 'string') {
            throw 'Invalid description: description must be a string!';
        }

        this.#description = value;
    }

    get filterFn() {
        return this.#filterFn;
    }

    set filterFn(value) {
        this.#filterFn = value;
    }

    #setId(value) {
        if (typeof value !== 'string') {
            throw 'Invalid id: id must be a string!';
        }

        this.#id = value;
    }
}
