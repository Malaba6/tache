import React, { useState } from "react"
import { SnackbarProvider } from 'notistack'
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

import AppBar from "components/AppBar"
import Main from "components/Main"
// import "./App.css"
import useNetwork from "hooks/useNetwork"
import useContract from "hooks/useContract"
import Notify from "components/Notify"


const Home = ({ locale }) => { 
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
        }}>
        <AppBar {...{
          wallet, account, network, connectNetwork,
          disconnectNetwork, setMsg, locale
        }} />
        <Main {...{
          createTask, setTasks, toggleTaskChange,
          deleteTask, locale
          }} tasks={tasks} />
        <SnackbarProvider maxSnack={3}>
          <Notify {...{ msg }} />
        </SnackbarProvider>
      </Box>
  )
}

export default Home
