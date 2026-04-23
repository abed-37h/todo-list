
export default class StorageInterface {
    #name;
    #T;

    constructor(name, T) {
        this.#name = name;
        this.#T = T;
    }
    
    insert(...items) {
        localStorage.setItem(
            this.#name,
            JSON.stringify([
                ...(this.fetch() || []),
                ...items,
            ]),
        );
    }

    fetch(filterFn = item => true) {
        const itemsJSON = localStorage.getItem(this.#name);
        if (!itemsJSON) {
            return null;
        }
        return JSON.parse(itemsJSON).map(item => this.#T.fromJSON(item)).filter(filterFn);
    }

    find(id) {
        return this.fetch(item => item.id === id)[0];
    }

    update(updatedItem) {
        localStorage.setItem(
            this.#name,
            this.fetch().map(item => item.id === updatedItem.id ? JSON.stringify(updatedItem) : item),
        );
    }

    delete(id) {
        localStorage.setItem(
            this.#name,
            this.fetch().filter(item => item.id !== id),
        );
    }

    destroy() {
        localStorage.removeItem(this.#name);
    }
}
