import { useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text } from 'react-native';
import Services from "@/data/servicos.json"

type Service =
{
    name : string;
    price : number;
    duration : number;
}[]

export default function ListServicos()
{
    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Serviços</Text>
        </View>
        <View style={styles.CardContainer}>
            <FlatList
                data={Services}
                keyExtractor={(item) => (Math.random().toString() + item.name)}
                renderItem={(item) =>
                (
                    <View style={styles.Card}>
                        <Text style={styles.MainText}>{item.item.name}</Text>
                        <View style={styles.Line}>
                            <Text style={styles.Price}>R$ {item.item.price.toFixed(2)}</Text>
                            <Text style={{fontSize: 16}}>{item.item.duration} min</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    </>
    );
}

const styles = StyleSheet.create(
{
    Card:
    {
        backgroundColor: "#ffffff",
        margin: 8,
        borderLeftWidth: 8,
        padding: 12,
        borderColor: "#408040",
        gap: 8,
        borderRadius: 8,
    },
    CardContainer:
    {
        backgroundColor: "#e8e8e8",
        height: "100%",
        overflow: "scroll",
        paddingBottom: 52
    },
    Line:
    {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    MainText:
    {
        fontWeight: "bold",
        fontSize: 24,
    },
    Price:
    {
        fontSize: 16,
        fontWeight: "600"
    },
    Title:
    {
        fontSize: 36,
        fontWeight: "bold",
        paddingVertical: 10
    },
    TitleContainer:
    {
        height: 52,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
});
