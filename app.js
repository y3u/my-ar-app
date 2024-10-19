document.addEventListener('DOMContentLoaded', () => {
    const modelUpload = document.getElementById('modelUpload');
    const modelList = document.getElementById('modelList');
    const propertyEditor = document.getElementById('propertyEditor');
    const scene = document.querySelector('a-scene');

    let models = [];

    modelUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const model = {
                name: file.name,
                url: URL.createObjectURL(file)
            };
            models.push(model);
            updateModelList();
        }
    });

    function updateModelList() {
        modelList.innerHTML = '';
        models.forEach((model, index) => {
            const modelItem = document.createElement('div');
            modelItem.textContent = model.name;
            modelItem.addEventListener('click', () => addModelToScene(model, index));
            modelList.appendChild(modelItem);
        });
    }

    function addModelToScene(model, index) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('gltf-model', model.url);
        entity.setAttribute('position', '0 0 -1');
        entity.setAttribute('scale', '0.1 0.1 0.1');
        scene.appendChild(entity);

        updatePropertyEditor(entity, index);
    }

    function updatePropertyEditor(entity, modelIndex) {
        propertyEditor.innerHTML = `
            <h3>Properties</h3>
            <label>Position X: <input type="number" id="posX" step="0.1" value="0"></label>
            <label>Position Y: <input type="number" id="posY" step="0.1" value="0"></label>
            <label>Position Z: <input type="number" id="posZ" step="0.1" value="-1"></label>
            <label>Scale: <input type="number" id="scale" step="0.1" value="0.1"></label>
        `;

        const posX = document.getElementById('posX');
        const posY = document.getElementById('posY');
        const posZ = document.getElementById('posZ');
        const scale = document.getElementById('scale');

        posX.addEventListener('change', () => entity.setAttribute('position', `${posX.value} ${posY.value} ${posZ.value}`));
        posY.addEventListener('change', () => entity.setAttribute('position', `${posX.value} ${posY.value} ${posZ.value}`));
        posZ.addEventListener('change', () => entity.setAttribute('position', `${posX.value} ${posY.value} ${posZ.value}`));
        scale.addEventListener('change', () => entity.setAttribute('scale', `${scale.value} ${scale.value} ${scale.value}`));
    }
});
