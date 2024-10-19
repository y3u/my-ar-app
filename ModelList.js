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
            <input type="file" id="modelUpload" accept=".glb,.gltf">
        `;

        this.addEventListeners(container);
    }

    addEventListeners(container) {
        container.querySelector('#modelUpload').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.models.push(file.name);
                this.render(container);
            }
        });
    }
}
