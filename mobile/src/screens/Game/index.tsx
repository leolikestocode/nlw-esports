import React, { useEffect, useState } from "react"
import { Entypo } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { GameParams } from "../../@types/navigation"
import logoImg from "../../assets/logo-nlw-esports.png"

import { Background } from "../../components/Background"
import { DuoCard, DuoCardProps } from "../../components/DuoCard"
import { Header } from "../../components/Header"
import { THEME } from "../../theme"

import { styles } from "./styles"
import { DuoMatch } from "../../components/DuoMatch"

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("")
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  function handleNavigation() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.96:3333/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuoSelected(data.discord))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetch(`http://192.168.15.96:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigation}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Header title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este jogo ainda
            </Text>
          )}
        />

        <DuoMatch
          onClose={() => setDiscordDuoSelected("")}
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  )
}
