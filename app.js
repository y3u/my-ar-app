import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AREditor } from './components/AREditor';
import { ScreenEditor } from './components/ScreenEditor';
import { ModelList } from './components/ModelList';
import { QRCodeGenerator } from './components/QRCodeGenerator';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('ar');

  return (
    <div className="app">
      <div className="tabs">
        <button onClick={() => setSelectedTab('ar')}>AR編集</button>
        <button onClick={() => setSelectedTab('screen')}>画面編集</button>
      </div>
      <div className="main-content">
        <div className="left-panel">
          {selectedTab === 'ar' ? (
            <Canvas>
              <AREditor />
            </Canvas>
          ) : (
            <ScreenEditor />
          )}
        </div>
        <div className="right-panel">
          <ModelList />
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
}
