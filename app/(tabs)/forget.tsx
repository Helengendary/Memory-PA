import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });

    return (
        <>
            <View style={{flex: 1, alignItems: "center"}}>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Text>Um E-mail de verificação foi mandado para {email}. Digite o código de verificação abaixo</Text>
                </View>
                <View style={{flex: 2, flexDirection: "row", gap: 10}}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    testID="my-code-input"
                    renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={ getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                    )}
                />
                </View>
                <View style={{ flex: 0.5, alignItems: "center"}}>
                    <TouchableOpacity style={styles.button}>Registre-se</TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    button: {
        padding: 12,
        backgroundColor: "#824C8A",
        color: "#dedede",
        borderRadius: 7,
        width: 200,
        alignItems: "center",
        marginBottom: 10
    },
    root: {
        flex: 1, padding: 20
    },
    title: {
        textAlign: 'center', fontSize: 30
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
});
