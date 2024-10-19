const { Button, TextField } = MaterialUI;

class WebAREditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            selectedObject: null,
        };
    }

    componentDidMount() {
        this.initAFrame();
    }

    initAFrame() {
        const sceneEl = document.createElement('a-scene');
        sceneEl.setAttribute('embedded', '');
        sceneEl.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
        
        const cameraEl = document.createElement('a-entity');
        cameraEl.setAttribute('camera', '');
        sceneEl.appendChild(cameraEl);

        document.querySelector('#viewport').appendChild(sceneEl);
    }

    handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            const newObject = {
                id: Date.now(),
                name: file.name,
                url: objectURL,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };
            this.setState(prevState => ({
                objects: [...prevState.objects, newObject],
            }));
            this.addObjectToScene(newObject);
        }
    }

    addObjectToScene(object) {
        const sceneEl = document.querySelector('a-scene');
        const entityEl = document.createElement('a-entity');
        entityEl.setAttribute('gltf-model', object.url);
        entityEl.setAttribute('position', `${object.position.x} ${object.position.y} ${object.position.z}`);
        entityEl.setAttribute('rotation', `${object.rotation.x} ${object.rotation.y} ${object.rotation.z}`);
        entityEl.setAttribute('scale', `${object.scale.x} ${object.scale.y} ${object.scale.z}`);
        sceneEl.appendChild(entityEl);
    }

    handleObjectSelect = (object) => {
        this.setState({ selectedObject: object });
    }

    handlePropertyChange = (property, axis, value) => {
        this.setState(prevState => {
            const updatedObjects = prevState.objects.map(obj => 
                obj.id === prevState.selectedObject.id 
                    ? { ...obj, [property]: { ...obj[property], [axis]: parseFloat(value) } }
                    : obj
            );
            return {
                objects: updatedObjects,
                selectedObject: updatedObjects.find(obj => obj.id === prevState.selectedObject.id),
            };
        });
    }

    render() {
        return (
            <div id="app">
                <div id="viewport" className="viewport"></div>
                <div className="sidebar">
                    <input type="file" accept=".glb,.gltf" onChange={this.handleFileUpload} />
                    <div className="object-list">
                        <h3>オブジェクト一覧</h3>
                        {this.state.objects.map(obj => (
                            <div key={obj.id} className="object-item">
                                <span>{obj.name}</span>
                                <Button onClick={() => this.handleObjectSelect(obj)}>選択</Button>
                            </div>
                        ))}
                    </div>
                    {this.state.selectedObject && (
                        <div className="properties">
                            <h3>プロパティ</h3>
                            {['position', 'rotation', 'scale'].map(prop => (
                                <div key={prop}>
                                    <h4>{prop}</h4>
                                    {['x', 'y', 'z'].map(axis => (
                                        <TextField
                                            key={axis}
                                            label={axis}
                                            type="number"
                                            value={this.state.selectedObject[prop][axis]}
                                            onChange={(e) => this.handlePropertyChange(prop, axis, e.target.value)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WebAREditor />, document.getElementById('app'));
