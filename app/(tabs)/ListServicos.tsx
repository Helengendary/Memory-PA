import { useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable } from 'react-native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import Services from "@/data/servicos.json"
import Colors from "@/data/colors.json"
import PickerDate from '@/components/PickerDate';
import Times from "@/data/times.json"

type Service =
{
    name : string;
    price : number;
    duration : number;
}[]

export default function ListServicos()
{
    const Selected = 2;
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    function UpdateDate(Date : Date)
    {
        Date.toISOString().substring(0, 10)
    }

    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Serviços</Text>
        </View>
        <View style={styles.CardContainer}>
            <FlatList
                data={Services}
                keyExtractor={(item) => (Math.random().toString() + item.id)}
                renderItem={(item) =>
                {
                    const Color = Colors.find((color) =>
                    {
                        if(color.type == item.item.type)
                        {
                            return color
                        }
                    })
                    return(
                        <View style={[styles.Card, {borderColor: Color?.color}]}>
                            <Text style={styles.MainText}>{item.item.name}</Text>
                            <View style={styles.Line}>
                                <Text style={styles.Price}>R$ {item.item.price.toFixed(2)}</Text>
                                <Text style={{fontSize: 16}}>{item.item.duration} min</Text>
                            </View>
                            {item.item.id == Selected ?
                            <>
                                <PickerDate onChange={(date : Date) => setDate(date)} value={date}/>
                                <View style={styles.TimeContainer}>
                                    {Times.map((item) =>
                                    {
                                        return(
                                        <Pressable onPress={() => setTime(item)} key={item}>
                                            <Text style={styles.Time}>{item}</Text>
                                        </Pressable>
                                        )
                                    })}
                                </View>
                            </> 
                            : <></>}
                        </View>
                    )
                }}
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
    Time:
    {
        backgroundColor: "#804c8a",
        color: "#ffffff",
        width: 80,
        fontSize: 16,
        padding: 10,
        fontWeight: "bold",
        borderRadius: 60,
        textAlign: "center"
    },
    TimeContainer:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: 'center'
    }
});
