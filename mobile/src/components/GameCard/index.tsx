import React from "react"
import {
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
} from "react-native"

import { LinearGradient } from "expo-linear-gradient"

import { styles } from "./styles"
import { THEME } from "../../theme"

export interface IGameCardProps {
  id: string
  title: string
  _count: {
    ads: number
  }
  bannerUrl: string
}

interface GameCardProps extends TouchableOpacityProps {
  data: IGameCardProps
}

export function GameCard({ data, ...rest }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>

          <Text style={styles.ads}>{data._count.ads} anúncio(s)</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}
