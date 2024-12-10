import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function HomeScreen() {

  return (
    <>

    <View style={styles.imageProfile}>
      <Image source={require('../../assets/default.png')} style={{width:200, height:200}} />
    </View>

    <View>

      <View style={styles.campo}>
        <Text style={styles.miniText}>Username</Text>
        <Text style={styles.bigText}>Helena Picinin</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.miniText}>Email</Text>
        <Text style={styles.bigText}>helena@picinin</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.miniText}>Phone</Text>
        <Text style={styles.bigText}>(41) 99999-9999</Text>
      </View>

      <View style={[styles.campo, styles.button]}>
        <View>
          <Text style={styles.miniText}>CPF</Text>
          <Text style={styles.bigText}>xxx.xxx.xxx-xx</Text>
        </View>
        <TouchableOpacity><Image source={require("@/assets/eye.png")}/></TouchableOpacity> 
      </View>
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  miniText: {
    color: "#9E9E9E",
  },
  campo: {
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft:30
  },
  bigText: {
    fontSize:25
  },
  imageProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    paddingRight: 30
  }
});
