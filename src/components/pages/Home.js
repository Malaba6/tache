import React, { useState } from "react"
import { SnackbarProvider } from 'notistack'
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

import AppBar from "@components/AppBar"
import Main from "@components/Main"
// import "./App.css"
import useNetwork from "@hooks/useNetwork"
import useContract from "@hooks/useContract"
import Notify from "@components/Notify"


const Home = () => { 
  const theme = useTheme()
  const [msg, setMsg] = useState(['info', ""])

  const [{
    network,
    account,
    web3,
    wallet
  }, connectNetwork, disconnectNetwork] = useNetwork({ setMsg })

  const [{
    createTask, setTasks, toggleTaskChange, deleteTask
  }, tasks] = useContract({ web3, account, setMsg })
  console.log('Theme', theme.palette.primary.light)

  return (
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          left: 0,
          right: 0,
          zIndex: 0,
          height: '100%',
          backgroundColor: 'primary.light',
          // border: '1px solid red',
        }}
        // className={theme.palette.mode === 'light'
        //   ? 'App'
        //   : 'App-dark'
        // }
        >
        <AppBar {...{
          wallet, account, network, connectNetwork,
          disconnectNetwork, setMsg
        }} />
        <Main {...{
          createTask, setTasks, toggleTaskChange,
          deleteTask
          }} tasks={tasks} />
        <SnackbarProvider maxSnack={3}>
          <Notify {...{ msg }} />
        </SnackbarProvider>
      </Box>
  )
}

export default Home
