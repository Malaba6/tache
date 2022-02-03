import Head from 'next/head'
import Image from 'next/image'
import { Button } from '@mui/material'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container} >
      <Head>
        <title>Tache</title>
      </Head>
      <Button sx={{
        color: 'secondary.main',
      }}>
        Click me
      </Button>
    </div>
  )
}
