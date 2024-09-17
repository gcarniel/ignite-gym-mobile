/* eslint-disable camelcase */
import { StatusBar } from 'react-native'

import {
  Roboto_700Bold,
  Roboto_400Regular,
  useFonts,
} from '@expo-google-fonts/roboto'
import { GluestackUIProvider } from '@gluestack-ui/themed'

import { config } from './config/gluestack-ui.config'
import { Loading } from '@components/loading'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/auth-context'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })
  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  )
}
