import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const App = () => {
  const scannerRef = useRef(null);
  const [decodedText, setDecodedText] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const qrcodeRegionId = 'qr-reader';

  useEffect(() => {
    // Kiểm tra xem thiết bị có phải iOS không
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent;
      return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    };
    setIsIOS(checkIOS());

    // Khởi tạo trình quét
    scannerRef.current = new Html5QrcodeScanner(
      qrcodeRegionId,
      {
        fps: 10,
        qrbox: { width: checkIOS() ? 250 : 300, height: checkIOS() ? 110 : 130 },
        showTorchButtonIfSupported: true,
        rememberLastUsedCamera: true,
        useBarCodeDetectorIfSupported: true,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_128,
        ],
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
      },
      /* verbose= */ false
    );

    // Render trình quét
    scannerRef.current.render(
      (decodedText, decodedResult) => {
        // Xử lý kết quả quét
        setDecodedText(decodedText);
        // Dừng quét sau khi nhận được kết quả
        scannerRef.current.clear().catch(error => {
          console.error('Failed to clear html5QrcodeScanner.', error);
        });
      },
      (errorMessage) => {
        // Xử lý lỗi quét
        console.error('Quét mã lỗi:', errorMessage);
      }
    );

    // Áp dụng ràng buộc video cho iOS
    if (checkIOS()) {
      setTimeout(() => {
        scannerRef.current.applyVideoConstraints({
          focusMode: "continuous",
          advanced: [{ zoom: 2.0 }],
        }).catch(error => {
          console.error('Failed to apply video constraints.', error);
        });
      }, 2000);
    }

    // Dọn dẹp khi component unmount
    return () => {
      scannerRef.current.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner on unmount.', error);
      });
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id={qrcodeRegionId} style={{ width: '100%' }}></div>
      {decodedText && (
        <div>
          <h2>Kết quả quét:</h2>
          <p>{decodedText}</p>
        </div>
      )}
    </div>
  );
};

export default App;
