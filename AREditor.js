export class AREditor {
    constructor() {
        this.scene = null;
    }

    render(container) {
        container.innerHTML = `
            <h2>AR Editor</h2>
            <button id="addCube">Add Cube</button>
            <button id="addSphere">Add Sphere</button>
            <div>
                <label for="posX">Position X:</label>
                <input type="number" id="posX" value="0" step="0.1">
                <label for="posY">Position Y:</label>
                <input type="number" id="posY" value="0" step="0.1">
                <label for="posZ">Position Z:</label>
                <input type="number" id="posZ" value="-1" step="0.1">
            </div>
            <div>
                <label for="rotX">Rotation X:</label>
                <input type="number" id="rotX" value="0" step="1">
                <label for="rotY">Rotation Y:</label>
                <input type="number" id="rotY" value="0" step="1">
                <label for="rotZ">Rotation Z:</label>
                <input type="number" id="rotZ" value="0" step="1">
            </div>
            <div>
                <label for="scale">Scale:</label>
                <input type="number" id="scale" value="1" step="0.1">
            </div>
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
        container.querySelector('#addCube').addEventListener('click', () => this.addObject('box'));
        container.querySelector('#addSphere').addEventListener('click', () => this.addObject('sphere'));

        ['posX', 'posY', 'posZ', 'rotX', 'rotY', 'rotZ', 'scale'].forEach(id => {
            container.querySelector(`#${id}`).addEventListener('change', () => this.updateObjectProperties());
        });
    }

    addObject(type) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('geometry', `primitive: ${type}`);
        entity.setAttribute('position', '0 0 -1');
        entity.setAttribute('material', 'color: red');
        this.scene.appendChild(entity);
        this.selectedObject = entity;
    }

    updateObjectProperties() {
        if (this.selectedObject) {
            const posX = document.getElementById('posX').value;
            const posY = document.getElementById('posY').value;
            const posZ = document.getElementById('posZ').value;
            const rotX = document.getElementById('rotX').value;
            const rotY = document.getElementById('rotY').value;
            const rotZ = document.getElementById('rotZ').value;
            const scale = document.getElementById('scale').value;

            this.selectedObject.setAttribute('position', `${posX} ${posY} ${posZ}`);
            this.selectedObject.setAttribute('rotation', `${rotX} ${rotY} ${rotZ}`);
            this.selectedObject.setAttribute('scale', `${scale} ${scale} ${scale}`);
        }
    }
}
