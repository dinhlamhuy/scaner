import React, { useState } from 'react';
import QrBarcodeScanner from 'react-qr-barcode-scanner';

const App = () => {
  const [data, setData] = useState('No result');

  return (
    <div>
      <h1>QR & Barcode Scanner</h1>
      <QrBarcodeScanner
        onUpdate={(err, result) => {
          if (result) {
            setData(result.text);
          }
          if (err) {
            console.error(err);
          }
        }}
      />
      <p>Result: {data}</p>
    </div>
  );
};

export default App;
