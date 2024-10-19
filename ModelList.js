export class ModelList {
    constructor() {
        this.models = ['Cube', 'Sphere', 'Cylinder'];
    }

    render(container) {
        container.innerHTML = `
            <h2>Model List</h2>
            <ul>
                ${this.models.map(model => `<li>${model}</li>`).join('')}
            </ul>
        `;
    }
}
