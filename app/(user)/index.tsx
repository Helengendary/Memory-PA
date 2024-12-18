import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable } from 'react-native';
import Colors from "@/data/colors.json"
import { doc, getDocs, collection } from "firebase/firestore"
import { Firestore } from '@/services/firebase';

interface Servico
{
    id : number;
    name : string;
    price : number;
    duration : number;
    type : string
}

interface Agendamento
{
    service : Servico
    time : string;
    date : string;
}

export default function Agendamentos()
{
    const [Data, SetData] = useState<any[]>([]);

    useEffect(() =>
    {
        getDocs(collection(Firestore, "Agendamentos"))
        .then((data) =>
        {
            SetData
            (
                data.docs.map((item => (item.data())))
                .filter((item) => {if(Date.now() < Date.parse(item.date + "T" + item.time)){return item}})
                .sort((a : any, b : any) => (Date.parse(a.date + "T" + a.time) - Date.parse(b.date + "T" + b.time)))
            )
        })
    },[]);

    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Agendamentos</Text>
        </View>
        <View style={styles.CardContainer}>
            {Data.length ? 
                <FlatList
                    data={Data}
                    keyExtractor={(item) => (Math.random().toString() + item.service.name)} 
                    renderItem={(item) =>
                    {
                        const Color = Colors.find((color) =>
                        {
                            if(color.type == item.item.service.type)
                            {
                                return color
                            }
                        })
                        let d = new Date(Date.parse(item.item.date + "T" + item.item.time));
                        return(
                        <View style={[styles.Card, {borderColor: Color?.color}]}>
                            <Text style={styles.MainText}>{item.item.service.name}</Text>
                            <View style={styles.Line}>
                                <Text style={styles.Price}>R$ {item.item.service.price.toFixed(2)}</Text>
                                <Text style={{fontSize: 16}}>{item.item.service.duration} min</Text>
                            </View>
                            <View style={styles.Line}>
                                <Text style={styles.Price}>{d.toLocaleDateString()}</Text>
                                <Text style={styles.Price}>{d.toLocaleTimeString()}</Text>
                            </View>
                            <Pressable><Text style={styles.CancelBtn}>Cancelar</Text></Pressable>
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
