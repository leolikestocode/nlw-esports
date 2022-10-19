import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useState } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { CheckCircle } from "phosphor-react-native"
import { styles } from "./styles"
import { THEME } from "../../theme"
import { Header } from "../Header"
import * as Clipboard from "expo-clipboard"

interface DuoMatchProps extends ModalProps {
  discord: string
  onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
  const [isCopping, setIsCopping] = useState<boolean>(false)

  async function handleCopyDiscordUserToClipboard() {
    setIsCopping(true)
    await Clipboard.setStringAsync(discord)

    Alert.alert(
      "Discord copiado!",
      "Usuário copiado para a área de transferência"
    )
    setIsCopping(false)
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Header
            style={styles.Header}
            title="Let´s play!"
            subtitle="Agora é só começar a jogar!"
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordUserToClipboard}
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
