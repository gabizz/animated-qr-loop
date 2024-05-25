import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Container } from '@mui/material';

const SPEED = 60

const QRCodeScanner = ({ onComplete }) => {
  const [capturedData, setCapturedData] = useState([]);
  const [totalSegments, setTotalSegments] = useState(null);
  const [scanningComplete, setScanningComplete] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const processQRCodeData = (data) => {
      const segments = data.split('/');
      const frameNumber = parseInt(segments[0]);
      const total = parseInt(segments[1]);
      const segmentData = segments.slice(2).join('/');

      setTotalSegments(total);

      setCapturedData((prevData) => {
        const newData = [...prevData];
        newData[frameNumber - 1] = segmentData;
        return newData;
      });

      if (capturedData.filter(Boolean).length === total) {
        setScanningComplete(true);
      }
    };

    const captureFrame = () => {
      if (!webcamRef.current || !canvasRef.current) return;

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        if (qrCode) {
          processQRCodeData(qrCode.data);
        }
      }
    };

    const interval = setInterval(captureFrame, SPEED);
    return () => clearInterval(interval);
  }, [capturedData]);

  useEffect(() => {
    if (scanningComplete) {
      const mergedData = capturedData.join('');
      onComplete(mergedData);
    }
  }, [scanningComplete, capturedData, onComplete]);

  const videoConstraints = {
    facingMode: { exact: "environment" }
  };

  return (
    <Container maxWidth="sm">
      <Webcam ref={webcamRef} videoConstraints={videoConstraints} style = {{width:"100%", height:"auto"}}/>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        {totalSegments !== null && (
          <p>Progress: {capturedData.filter(Boolean).length} / {totalSegments} segments captured</p>
        )}
      </div>
    </Container>
  );
};

export default QRCodeScanner;
