import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const App = () => {
  const [result, setResult] = useState('No result');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h1>React QR Scanner</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>Result: {result}</p>
    </div>
  );
};

export default App;
