import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react';

export default function HomeScreen() {

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <>
    <TouchableOpacity onPress={pickImage}>
    <View style={styles.imageProfile}>
      <Image source={image? { uri: image } : require("@/assets/default.png")} style={{width:200, height:200, borderRadius: "50%"}} />
    </View>
    </TouchableOpacity>

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
          <Text style={styles.bigText}>123.456.789-55</Text>
        </View>
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
    fontSize: 20
  },
  imageProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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
