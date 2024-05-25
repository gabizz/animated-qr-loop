import React, { Fragment, useEffect, useState } from 'react'
import { useAppContext } from '../../lib/appContext'
import { useRouter } from 'next/router'
import { AppBar, Box, Button, Container, Divider, Grid, Hidden, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { FaPowerOff } from 'react-icons/fa'
import Notification from '../Notification'
import Image from 'next/image'
import Link from 'next/link'
import { MdArrowForward, MdHome, MdPhone, MdPhoneAndroid, MdQrCode } from 'react-icons/md'
import QrModal from '../QrModal'




export default function Layout({children}) {

   
    const [ctx, setCtx] = useAppContext()
    const [loaded, setLoaded] = useState(false)
    const [qr, setQr] = useState(false)
    const router = useRouter()

    useEffect(()=>setLoaded(true), [])

    useEffect(()=>{
        if (loaded) {
            if ( !ctx.token ) {
                let lsJwt = localStorage.getItem(process.env.NEXT_PUBLIC_NAMESPACE)
                if (lsJwt) {
                    setCtx({token: lsJwt})
                    if ( router.pathname.indexOf("/authorized")<0){
                        router.push(`/authorized/${lsJwt}`)
                    }
                    
                } 
            } 
        }
    }, [loaded])

    const logoutHandler = () => {
        localStorage.removeItem(process.env.NEXT_PUBLIC_NAMESPACE)
        setCtx({jwt:null})
        router.push("/")
    }


  return (
    <Fragment>
    <Container maxWidth="xl" >
        <AppBar color='primary' sx = {t=>({backgroundColor: t.palette.primary.dark})}>
            <Toolbar variant='dense'>
                <Grid container alignItems="center">
                   
                    <Grid item  onClick = {()=>router.push("/auth/login")} sx = {{cursor:"pointer"}}>
                        
                        <Typography variant="h6" fontWeight={800} component="a" sx = {{color:"white", textDecoration:"none", display:"flex", alignItems:"center"}}>
                            <MdHome size="2rem"/> <Box sx = {{ml:1}}> Efactura <sup>PRO</sup></Box>
                        </Typography>
                        
                    </Grid>
                    <Hidden smDown>
                    <Grid item>
                        <Tooltip title = "TRANSFER TOKEN DE ACCES PE SMARTPHONE">
                        <IconButton 
                            sx = {{ml:3}}
                            color='inherit'
                            onClick = { ()=>setQr(true) }
                        >
                                <MdQrCode/><MdArrowForward/><MdPhoneAndroid/>
                        </IconButton>
                        </Tooltip>
                    </Grid>
                    </Hidden>
                    <Grid item xs = {true}></Grid>
                    <Grid item>
                        <Button color="inherit" onClick={logoutHandler} startIcon ={<FaPowerOff/>} >IEȘIRE</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Box sx = {{mt:9, height:"85vh",overflow:"auto"}}>  
            {children} 
        </Box>

    </Container>
            <Grid container 
                sx = {t=>({
                    position:"fixed", 
                    left:0, bottom:0, 
                    width:"100%", 
                    backgroundColor: t.palette.grey[300],
                    color: "navy",
                    fontSize:"0.9em", fontWeight:400,
                    p:0.4, pr:2
                })}
                justifyContent="space-between" alignItems="center"
            >
                <Grid item>
                    <Link href="https://signportal.ro" target = "_blank">
                        <Image src = "/signportal.svg" width={120} height={20} alt ="signlogo" style = {{marginBottom:"-0.5em", marginLeft: "0em"}}/>
                    </Link>
                </Grid>
                <Grid item>
                &copy; {new Date().getFullYear()} -  <Link href="https://signportal.ro" style = {{textDecoration:"none", fontWeight:800, color:"navy"}} target = "_blank">SIGN Portal SRL Arad</Link>
                </Grid>
            
        </Grid>
        {ctx && ctx.error && <Notification message = {ctx.error} severity="error" onClose = {()=>setCtx({error:false})}/>}
        {ctx && ctx.msg && <Notification 
            message = {ctx.msg} 
            severity="info" 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            
            onClose = {()=>setCtx({msg:false})}
        />}
        {qr && <QrModal data = {`${process.env.NEXT_PUBLIC_BASE_URL}/authorized/${ctx.token}`}  onClose = {()=>setQr(false)} /> }
           
        </Fragment>
  )
}
