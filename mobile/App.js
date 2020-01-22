import React from 'react'
import { StatusBar } from 'react-native'
import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7040e7" />
      <Routes />
    </>
  )
}

// - As tags do React Native não são semânticas, não tem estilização.
// - Não tem classes nem id => usar style={styles.container}
// - React Native não passa herança de estilização.
