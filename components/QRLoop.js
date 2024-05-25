// src/QRLoopComponent.js
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Alert, Box, Typography } from '@mui/material';

const SEGMENT_SIZE = 100
const QR_WIDTH = 512
const SPEED = 60

const QRLoop = ({ data }) => {
  const [segments, setSegments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    // Split the compressed JWT into segments
    const segmentSize = SEGMENT_SIZE; // Adjust segment size as needed
    const numSegments = Math.ceil(data.length / segmentSize);
    const segmentsArray = [];

    for (let i = 0; i < numSegments; i++) {
      const segment = data.slice(i * segmentSize, (i + 1) * segmentSize);
      segmentsArray.push(segment);
    }

    setSegments(segmentsArray);

    // Start the animation loop
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % numSegments);
    },SPEED); 
    return () => clearInterval(interval);
  }, [data]);

  return  (
    <Box sx = {{display:"block"}}>
    <QRCode value={`${currentIndex+1}/${segments.length}/${segments[currentIndex]}`} size={QR_WIDTH} />
    <br/>
    {currentIndex} / {segments.length}
    </Box>
  )

     

};

export default QRLoop
