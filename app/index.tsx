import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Image, View, TextInput, TouchableOpacity, Text } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "@/services/firebase";

export default function LoginScreen() {

    const [show, setShow] = useState(true);
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    const signIn = () => {
        signInWithEmailAndPassword(Auth, mail, pass)
        .then(() => {
            router.push("/(user)");
        }).catch((err) => {
            alert(err.message);
        })
    }

    return (
        <>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Image style={styles.image} source={require("@/assets/logo.jpg")} width={200} height={200}></Image>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", gap: 20}}>
                    <TextInput onChangeText={setMail} style={styles.input} placeholder="Digite seu nome ou E-mail"/>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TextInput onChangeText={setPass} style={styles.input} placeholder="Digite sua Senha" secureTextEntry={show}/>
                        <TouchableOpacity onPress={() => {setShow(!show)}} style={{position: "absolute", right: 20, }}>
                            <Text style={styles.oio}>👁</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: "center", flex: 1}}>
                    <TouchableOpacity onPress={signIn} style={styles.button}><Text style={{color: "white"}}>Login</Text></TouchableOpacity>
                    <View style={{alignItems: "center", gap: 10}}>
                        <View style={{flexDirection: "row"}}>
                            <Text>Não tem conta?</Text>
                            <Link style={{ fontWeight: "bold" }} href={"/register"}><Text>Registre-se</Text></Link>
                        </View>
                        <Link style={{ fontWeight: "bold" }} href={"/forget"}><Text>Esqueceu sua Senha?</Text></Link>
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
    },
    oio: {
        fontSize: 20,
        color: "#ffffff"
    }
});
