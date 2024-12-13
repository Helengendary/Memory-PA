import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable } from 'react-native';
import Colors from "@/data/colors.json"

interface Agendamento
{
    name : string
    price : number
    duration : number
    date : string
    type : string
}

export default function Agendamentos()
{
    const [Data, SetData] = useState<Agendamento[]>([]);
    useEffect(() =>
    {

    });

    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Agendamentos</Text>
        </View>
        <View style={styles.CardContainer}>
            {Data.length ? 
                <FlatList
                    data={Data}
                    keyExtractor={(item) => (Math.random().toString() + item.name)} 
                    renderItem={(item) =>
                    {
                        const Color = Colors.find((color) =>
                        {
                            if(color.type == item.item.type)
                            {
                                return color
                            }
                        })
                        let d = new Date(Date.parse(item.item.date));
                        return(
                        <View style={[styles.Card, {borderColor: Color?.color}]}>
                            <Text style={styles.MainText}>{item.item.name}</Text>
                            <View style={styles.Line}>
                                <Text style={styles.Price}>R$ {item.item.price.toFixed(2)}</Text>
                                <Text style={{fontSize: 16}}>{item.item.duration} min</Text>
                            </View>
                            <View style={styles.Line}>
                                <Text style={styles.Price}>{d.toLocaleDateString()}</Text>
                                <Text style={styles.Price}>{d.toLocaleTimeString()}</Text>
                            </View>
                            <Pressable style={styles.CancelBtn}>Cancelar</Pressable>
                        </View>
                        )
                    }}
                />
                :
                <Text style={[styles.MainText, {textAlign: 'center'}]}>Nenhum agendamento</Text>
            }
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
    },
    CancelBtn:
    {
        backgroundColor: "#C02020",
        borderRadius: 16,
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "arial",
        paddingHorizontal: 8,
        paddingVertical: 2,
        width: 108,
        textAlign: "center"
    }
});
