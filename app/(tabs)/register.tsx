import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Image, View, TextInput, TouchableOpacity, Text } from "react-native"

export default function LoginScreen() {

    const [show, setShow] = useState(true);

    return (
        <>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Image style={styles.image} source={require("../../assets/logo.jpg")} width={200} height={200}></Image>
                </View>
                <View style={{flex: 2, gap: 20}}>
                    <TextInput style={styles.input} placeholder="Nome"/>
                    <TextInput style={styles.input} placeholder="E-mail"/>
                    <TextInput style={styles.input} placeholder="CPF"/>
                    <TextInput style={styles.input} placeholder="Telefone"/>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={show}/>
                        <TouchableOpacity onPress={() => {setShow(!show)}} style={{position: "absolute", right: 20, }}>
                            <Text style={styles.oio}>👁</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TextInput style={styles.input} placeholder="Confirme sua Senha" secureTextEntry={show}/>
                        <TouchableOpacity onPress={() => {setShow(!show)}} style={{position: "absolute", right: 20, }}>
                            <Text style={styles.oio}>👁</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 0.5, alignItems: "center"}}>
                    <TouchableOpacity style={styles.button}>Registre-se</TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    input: {
        padding: 10, 
        backgroundColor: "#824C8A", 
        borderRadius: 7, 
        color: "#dedede",
        width: 300,
        height: 60,
        fontSize: 15
    },
    image : {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    button: {
        padding: 12,
        backgroundColor: "#824C8A",
        color: "#dedede",
        borderRadius: 7,
        width: 200,
        alignItems: "center",
        marginBottom: 10
    },
    oio: {
        fontSize: 20,
        color: "#ffffff"
    }
});
