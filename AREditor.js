export class AREditor {
    constructor() {
        this.scene = null;
    }

    render(container) {
        container.innerHTML = `
            <h2>AR Editor</h2>
            <button id="addCube">Add Cube</button>
            <button id="addSphere">Add Sphere</button>
        `;

        this.initScene();
        this.addEventListeners(container);
    }

    initScene() {
        const preview = document.getElementById('preview');
        preview.innerHTML = `
            <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
                <a-entity camera></a-entity>
            </a-scene>
        `;
        this.scene = preview.querySelector('a-scene');
    }

    addEventListeners(container) {
        container.querySelector('#addCube').addEventListener('click', () => this.addObject('cube'));
        container.querySelector('#addSphere').addEventListener('click', () => this.addObject('sphere'));
    }

    addObject(type) {
        const entity = document.createElement('a-entity');
        entity.setAttribute(type, '');
        entity.setAttribute('position', '0 0 -1');
        entity.setAttribute('material', 'color: red');
        this.scene.appendChild(entity);
    }
}
