import Group from './group.js';

export default class Project extends Group {
    constructor({
        id,
        name,
        description = '',
    }) {
        super({
            id,
            name,
            description,
            filterFn: item => item.projectId === this.id,
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
        };
    }

    static fromJSON({
        id,
        name,
        description,
    }) {
        return new Project(
            id,
            name,
            description,
        );
    }
}
