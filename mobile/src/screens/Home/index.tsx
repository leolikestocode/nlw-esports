import React, { useEffect, useState } from "react"
import { FlatList, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Background } from "../../components/Background"
import { useNavigation } from "@react-navigation/native"

import logoImg from "../../assets/logo-nlw-esports.png"
import { GameCard, IGameCardProps } from "../../components/GameCard"
import { Header } from "../../components/Header"

import { styles } from "./styles"

export function Home() {
  const [games, setGames] = useState<IGameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: IGameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl })
  }
  useEffect(() => {
    fetch("http://192.168.15.96:3333/games")
      .then((r) => r.json())
      .then((res) => setGames(res))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Header
          title="Encontre seu duo!"
          subtitle="Selecione o game que quer jogar..."
        />
        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  )
}
