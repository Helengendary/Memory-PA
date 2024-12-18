import { Link, router } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { StyleSheet, Image, View, TextInput, TouchableOpacity, Text } from "react-native"
import { Auth } from "@/services/firebase";

export default function LoginScreen() {

    const [ show, setShow ] = useState(true);
    const [ email, setEmail ] = useState('')
    const [ pass, setPass ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    const signUp = () => {
        createUserWithEmailAndPassword(Auth, email, pass)
        .then(() => {
            router.navigate('/');
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
                    <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Digite seu E-mail"/>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TextInput style={styles.input} onChangeText={setPass} value={pass} placeholder="Digite sua Senha" secureTextEntry={show}/>
                        <TouchableOpacity onPress={() => {setShow(!show)}} style={{position: "absolute", right: 20}}>
                            <Text style={styles.oio}>👁</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TextInput style={styles.input} onChangeText={setConfirmPass} value={confirmPass} placeholder="Confirme sua Senha" secureTextEntry={show}/>
                        <TouchableOpacity onPress={() => {setShow(!show)}} style={{position: "absolute", right: 20}}>
                            <Text style={styles.oio}>👁</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: "center", flex: 1}}>
                    <TouchableOpacity onPress={signUp} style={styles.button}><Text style={{color: "white"}}>Register</Text></TouchableOpacity>
                    <View style={{flexDirection: "row"}}>
                        <Text>Já possui uma conta?</Text>
                        <Link style={{ fontWeight: "bold" }} href={"/"}> Login</Link>
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
