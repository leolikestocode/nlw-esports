import { StatusBar } from "react-native"
import { Background } from "./src/components/Background"
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter"
import { Loading } from "./src/components/Loading"
import { Home } from "./src/screens/Home"
// import { Routes } from './src/routes';
// import * as Notifications from 'expo-notifications'
// import './src/services/notificationConfigs';
// import { getPushNotificationToken } from './src/services/getPushNotification';
// import { useEffect, useRef } from "react"
// import { Subscription } from "expo-modules-core"

export default function App() {
  // const getNotificationListener = useRef<Subscription>();
  // const responseNotificationListener = useRef<Subscription>();

  // useEffect(() => {
  //   getPushNotificationToken();
  // },[])

  // useEffect(() => {
  //   getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log(notification)
  //   })

  //   responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(res => {
  //     console.log(res)
  //   })

  //   return () => {
  //     if(getNotificationListener.current && responseNotificationListener.current) {
  //       Notifications.removeNotificationSubscription(getNotificationListener.current)
  //       Notifications.removeNotificationSubscription(responseNotificationListener.current)
  //     }
  //   }
  // }, [])

  const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoad ? <Home /> : <Loading />}
    </Background>
  )
}