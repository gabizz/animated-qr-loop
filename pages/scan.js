import React, { Fragment, useState } from 'react'
import QRCodeScanner from '../components/QRCodeScanner'
import { Alert, Button, Container, Divider, Typography } from '@mui/material';
import { base64ToFile, downloadFile, fileSize } from '../lib/utils';

export default function Scan() {
  const [mergedData, setMergedData] = useState(null);
  const [objFile, setObjFile] = useState(null)

  const handleComplete = (data) => {
    let result = atob(data)
    result = JSON.parse(result)
    setObjFile(result)


  };

  const DownloadHandler = () => {

    const {name, type, size, data} = objFile
    let file = base64ToFile(data, name, type)
    downloadFile(file)
  }

  return (
    <Container maxWidth="xs">
      <h1></h1>
        {!objFile
          ? <QRCodeScanner onComplete={handleComplete} />
          : <Alert
            severity='primary'
            
          >
            <Typography variant='h5' color="red" align="center" fontWeight={800} >
            Fisier preluat!
            </Typography>
            <br/>
            <Divider/>

              <Typography variant='body1'>
                Denumire: <strong>{objFile.name}</strong>
                <br/>
                Mărime: <strong>{fileSize(objFile.size)}</strong> 
                <br/>
                Tip: <strong>{objFile.type}</strong>
                <br/>
                </Typography>
                <br/><br/>
              <Button fullWidth variant = "contained" color = "primary" onClick = {DownloadHandler}> SALVEAZĂ FIȘIERUL</Button>
          </Alert>
        }
      
      {/* {mergedData && <p>Merged Data: {mergedData}</p>} */}
    </Container>
  );
};

