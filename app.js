import { AREditor } from './AREditor.js';
import { ScreenEditor } from './ScreenEditor.js';
import { ModelList } from './ModelList.js';
import { QRCodeGenerator } from './QRCodeGenerator.js';

class App {
    constructor() {
        this.arEditor = new AREditor();
        this.screenEditor = new ScreenEditor();
        this.modelList = new ModelList();
        this.qrCodeGenerator = new QRCodeGenerator();

        this.render();
    }

    render() {
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = `
            <div class="editor">
                <h1>WebAR Editor</h1>
                <div id="arEditor"></div>
                <div id="screenEditor"></div>
                <div id="modelList"></div>
                <div id="qrCodeGenerator"></div>
            </div>
            <div class="preview" id="preview"></div>
        `;

        this.arEditor.render(document.getElementById('arEditor'));
        this.screenEditor.render(document.getElementById('screenEditor'));
        this.modelList.render(document.getElementById('modelList'));
        this.qrCodeGenerator.render(document.getElementById('qrCodeGenerator'));
    }
}

new App();
