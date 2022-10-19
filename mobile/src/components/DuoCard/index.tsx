import { Text, TouchableOpacity, View } from 'react-native';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface DuoCardProps {
  hourEnd: string;
  hourStart: string;
  id: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />

      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} ano(s)`}
      />

      <DuoInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart[0]}${data.hourStart[1]}h - ${data.hourEnd[0]}${data.hourEnd[1]}h`}
      />

      <DuoInfo
        label='Chamada de áudio?'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? 'green' : 'red'}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
