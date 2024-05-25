import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React from 'react';
import { MdClose } from 'react-icons/md'
import QRLoop from './QRLoop';



export default function QrModal({data, onClose}) {
  return (
    <Dialog
        open = {Boolean(data)}
        onClose = {()=>onClose(true)}
        PaperProps={{sx: {
            // minHeight: "100%"
        }}}
    >
        <DialogTitle>
            <Grid container alignItems="center">
                <Grid item sm = {true}>
                    <Typography variant="body1" color="darkRed" fontWeight={700}>
                        TRANSFER TOKEN DE ACCES PE TELEFON</Typography>
                </Grid>
                 <Grid item>
                    <IconButton onClick = {()=>onClose(true)}>
                        <MdClose size="1.2em"/>
                    </IconButton>
                 </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            <Box  sx = {{display:"flex", alignItems:"flex-end", justifyContent:"center", mt:2}}>
            {data  &&  <QRLoop jwt={data}/> }
            </Box> 
        </DialogContent>

    </Dialog>
  )
}

