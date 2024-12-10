import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Image, View, TextInput, TouchableOpacity } from "react-native"

export default function LoginScreen() {

    const [show, setShow] = useState(true);

    return (
        <>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Image style={styles.image} source={require("../../assets/logo.jpg")} width={200} height={200}></Image>
                </View>
                <View style={{flex: 1, justifyContent: "center", gap: 20}}>
                    <TextInput style={styles.input} placeholder="Digite seu nome ou E-mail"/>
                    <TextInput style={styles.input} placeholder="Digite sua Senha" secureTextEntry={show}/>
                </View>
                <View style={{alignItems: "center", flex: 1}}>
                    <TouchableOpacity style={styles.button}>Login</TouchableOpacity>
                    <View style={{flexDirection: "row"}}>
                        Não tem conta?
                        <Link style={{ fontWeight: "bold" }} href={"/register"}> Registre-se</Link>
                    </View>
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
        width: 200,
        height: 200,
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
    }
});
