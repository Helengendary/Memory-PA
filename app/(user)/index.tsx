import { Image, StyleSheet, Platform, Text } from 'react-native';

export default function HomeScreen() {

  const icone = {
    uri: '../../assets/mar.jpg'
};

  return (
    <>

    <Image source={icone} style={{width: 200, height: 100, marginBottom: 10}} />

    <Text>fsdfsdf</Text>

    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
