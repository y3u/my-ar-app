export class ScreenEditor {
    render(container) {
        container.innerHTML = `
            <h2>Screen Editor</h2>
            <input type="file" id="imageUpload" accept="image/*">
            <div id="imagePreview"></div>
            <div id="imageProperties" style="display: none;">
                <label for="imageX">X Position:</label>
                <input type="number" id="imageX" value="0" step="1">
                <label for="imageY">Y Position:</label>
                <input type="number" id="imageY" value="0" step="1">
                <label for="imageScale">Scale:</label>
                <input type="number" id="imageScale" value="1" step="0.1">
            </div>
        `;

        this.addEventListeners(container);
    }

    addEventListeners(container) {
        container.querySelector('#imageUpload').addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '100%';
                    container.querySelector('#imagePreview').innerHTML = '';
                    container.querySelector('#imagePreview').appendChild(img);
                    container.querySelector('#imageProperties').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        ['imageX', 'imageY', 'imageScale'].forEach(id => {
            container.querySelector(`#${id}`).addEventListener('change', () => this.updateImageProperties(container));
        });
    }

    updateImageProperties(container) {
        const img = container.querySelector('#imagePreview img');
        if (img) {
            const x = document.getElementById('imageX').value;
            const y = document.getElementById('imageY').value;
            const scale = document.getElementById('imageScale').value;

            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
    }
}
