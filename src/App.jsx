import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

const App = () => {
  const scannerRef = useRef(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          facingMode: 'environment',
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader'],
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      setResult(data.codeResult.code);
      Quagga.stop();
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <h1>QuaggaJS Scanner</h1>
      <div ref={scannerRef} style={{ width: '100%', height: '400px' }}></div>
      {result && (
        <div>
          <h2>Kết quả quét:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default App;
