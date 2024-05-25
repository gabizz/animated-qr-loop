
import React, {Fragment, useEffect, useState} from 'react'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { FaSmileWink } from 'react-icons/fa'

const Notification = React.forwardRef(({message="", onClose, severity="success", timeout=100000,  ...rest}, ref) =>{
    // console.log("m: ", message)
    const [open, setOpen] = useState(null)

    useEffect(() => {
    //    console.log("eff:", message)
        setOpen(Boolean(message))
        setTimeout(() => {
            setOpen(null)
            onClose(true)
        }, timeout)
    }, [message])

    const closeHandler = () => onClose(true)
    

    return (<Snackbar
            ref = {ref}
            style = {{zIndex: 99999999}}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={Boolean(message)}
            autoHideDuration={3000}
            onClose={closeHandler}
            {...rest}
        >
            <Alert severity={severity} {...rest} icon = {<FaSmileWink size="2em" />}>
                { typeof message  === "string" && <pre style = {{width: "70vw", maxHeight: "80vh",  whiteSpace: "pre-wrap", fontWeight:700,
                overflow: "auto" }}>{message}</pre>}
               
                
            </Alert>
        </Snackbar>
    )
})



export default Notification
