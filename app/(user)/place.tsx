import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {

  return (
    <>
    <ScrollView>

      <View style={styles.title}>
        <Text style={styles.titleContainer}>UNIDADE</Text>

        <Text style={styles.subTitle}>Curitiba - Batel</Text>

        <Text style={styles.info}>R. Gonçalves Dias, 55</Text>
        <Text style={styles.info}>Fone: (41) 3340-2660</Text>
      
        <Image source={require("@/assets/salao.jpeg")} width={300} height={200}/>
        <Image source={require("@/assets/salao.jpeg")} width={300} height={200}/>
        <Image source={require("@/assets/salao.jpeg")} width={300} height={200}/>
      </View>
    </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 50,
    fontWeight:900,
  },
  subTitle: {
    fontSize: 40,
    fontWeight:900,
    padding: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: 'scroll',
  },
  info: {
    fontSize: 30,
    padding:8
  },
});
