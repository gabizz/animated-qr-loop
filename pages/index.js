import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { arrayBufferToBase64, bufferToBase64, fileSize, fileToBase64, lzCompressBase64 } from '../lib/utils'
import QRLoop from '../components/QRLoop'
import QRCode from 'qrcode.react';


export default function Landing() {

    const router = useRouter()
    const [file, setFile] = useState(null)
    const [showAppQr, setShowAppQr] = useState(null)
    const [encodedFile, setEncodedFile] = useState(null)





    const onDrop = useCallback(async (acceptedFiles) => {
        setShowAppQr(process.env["NEXT_PUBLIC_BASE_URL"]+"/scan")

        const f = acceptedFiles[0]
        console.log("fff", f)
        const {name, type, size, lastModified, lastModifiedDate} = f
        let b64 = await fileToBase64(f)
        
        setFile(f)
        let fileObject = {
            name, type, size, lastModified, lastModifiedDate,
            data:b64
        } 
        setEncodedFile(btoa(JSON.stringify(fileObject)))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })



    return (
        <Container  maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* <AppBar color='primary'>
                    <Toolbar variant="dense"></Toolbar>
                </AppBar> */}

            {showAppQr && (
                <Box sx = {{border: "0.5em dashed lightgrey", borderRadius:"1em", m:2, p:2}}>
                    <Typography variant="body2" align='center' color="secondary" fontWeight={800}>
                    Scanati  cu telefonul mobil codul de mai jos <br/>pentru a deschide aplicatia de transfer
                    </Typography>
                    <br/>
                    
                    <QRCode value ={showAppQr} size={512} />
                    <br/>
                    <div align="center">
                    <Typography variant="caption" color="darkRed"  componnet="a">{showAppQr}</Typography>
                    </div>
                    <br/>
                    <Button 
                        onClick = {()=>setShowAppQr(false)}
                        variant="contained" color="secondary"
                        
                        >
                        <Box sx = {{fontWeight:800}}>
                            AM DESCHIS APLICAȚIA PE TELEFON, ÎNCEPE TRANSMISIA DATELOR
                        </Box>
                    </Button>
                </Box>
            )}
            {!file
            
            && (
            <Box  {...getRootProps()} sx={{
                border: { sm: "1em dashed lightgrey", xs: "5px dashed lightgrey" },
                background: "whitesmoke", borderRadius: { xs: "0.1em", sm: "2em" }, boxShadow: "none",
                display: "flex", alignItems: "center", justifyContent: "center", height: "80%", width: "100%",
                cursor:"pointer"



            }}>
                <input {...getInputProps()} />
                <Typography align="center" style={{ fontSize: "2rem", fontWeight: 900, color: "grey" }}>
                    Trageți aici fișierul pe care doriți să îl transmiteți pe telefon
                </Typography>
            </Box>
            )}
            
            { file && !showAppQr 
            && <Box sx = {{border: "0.5em dashed lightgrey", borderRadius:"1em", m:2, p:2}}>
                Denumire: <strong>{file.name}</strong>
                <br/>
                Mărime: <strong>{fileSize(file.size)}</strong> 
                <br/>
                Tip: <strong>{file.type}</strong>
                {encodedFile && <QRLoop data={encodedFile} />}
                <Button color="secondary" variant='contained' fullWidth onClick = {()=>setFile(null)}>RENUNȚĂ</Button>
            </Box>
            }



        </Container>
    )
}
