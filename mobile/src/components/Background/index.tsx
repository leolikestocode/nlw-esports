import { ImageBackground } from 'react-native';

import { styles } from './styles';
import backGroundImg from '../../assets/background-galaxy.png'

interface BackgroundProps {
  children: React.ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backGroundImg}
      defaultSource={backGroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
