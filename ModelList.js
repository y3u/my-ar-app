import React, { useState, useEffect } from 'react';

export function ModelList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    // ここでバックエンドからモデルリストを取得
    fetchModels();
  }, []);

  const fetchModels = async () => {
    // APIからモデルリストを取得する処理
    // const response = await fetch('/api/models');
    // const data = await response.json();
    // setModels(data);
  };

  return (
    <div className="model-list">
      <h3>3Dモデル一覧</h3>
      <ul>
        {models.map((model, index) => (
          <li key={index}>
            {model.name}
            <button onClick={() => handleModelSelect(model)}>選択</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
