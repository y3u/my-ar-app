import React, { useState } from 'react';

export function ScreenEditor() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages([...images, { src: e.target.result, name: file.name }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="screen-editor">
      <input type="file" accept="image/png" onChange={handleImageUpload} />
      <div className="image-list">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.name}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="image-editor">
          <img src={selectedImage.src} alt={selectedImage.name} />
          {/* ここに画像編集ツールを追加 */}
        </div>
      )}
    </div>
  );
}
