import React, { useState } from 'react';
import QRCode from 'qrcode.react';

export function QRCodeGenerator() {
  const [url, setUrl] = useState('');

  const generateQRCode = () => {
    // ここでWebAR体験用のURLを生成
    const experienceUrl = `https://your-domain.com/ar-experience/${Date.now()}`;
    setUrl(experienceUrl);
  };

  return (
    <div className="qr-generator">
      <button onClick={generateQRCode}>QRコード生成</button>
      {url && <QRCode value={url} />}
    </div>
  );
}
