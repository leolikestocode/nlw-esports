import React from "react"
import { View, Image, FlatList } from "react-native"

import logoImg from "../../assets/logo-nlw-esports.png"
import { GameCard, IGameCardProps } from "../../components/GameCard"
import { Header } from "../../components/Header"
import { styles } from "./styles"
import { GAMES } from "../../utils/games"

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Header
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard data={item as unknown as IGameCardProps} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  )
}
