import { useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable } from 'react-native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import Services from "@/data/servicos.json"
import Colors from "@/data/colors.json"
import PickerDate from '@/components/PickerDate';
import Times from "@/data/times.json"

interface Servico
{
    id : number;
    name : string;
    price : number;
    duration : number;
}

interface Agendamento
{
    service : Servico
    time : string;
    date : string;
}

export default function ListServicos()
{
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [Selected, SetSelected] = useState<Servico | null>(null)

    function findTimes()
    {
        let dateString = date.toISOString().substring(0, 10);
    }

    function SalvarAgendamento()
    {
     //   const Ag : Agendamento =
        {

        }
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
                            <Pressable onPress={() => SetSelected(item.item)}>
                                <Text style={styles.MainText}>{item.item.name}</Text>
                                <View style={styles.Line}>
                                    <Text style={styles.Price}>R$ {item.item.price.toFixed(2)}</Text>
                                    <Text style={{fontSize: 16}}>{item.item.duration} min</Text>
                                </View>
                            </Pressable>
                            {item.item.id == Selected?.id ?
                            <>
                                <PickerDate onChange={(date : Date) => {setDate(date); setTime("");}} value={date}/>
                                <View style={styles.TimeContainer}>
                                    {Times.map((item) =>
                                    {
                                        return(
                                        <Pressable onPress={() => setTime(item)} key={item}>
                                            <Text
                                                style={
                                                [
                                                    styles.Time,
                                                    item == time ? {backgroundColor: "#b07cba"} : {backgroundColor: "#804c8a"}
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </Pressable>
                                        )
                                    })}
                                </View>
                                {time == "" ?
                                    <></> : 
                                    <View style={{flexDirection: "row", gap: 10}}>
                                        <Pressable style={styles.ConfirmBtn}>
                                            Confirmar
                                        </Pressable>
                                        <Pressable style={styles.CancelBtn}>
                                            Cancelar
                                        </Pressable>
                                    </View>
                                }
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
    },
    ConfirmBtn:
    {
        backgroundColor: "#20c020",
        borderRadius: 16,
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "arial",
        paddingHorizontal: 8,
        paddingVertical: 2,
        width: 128,
        textAlign: "center"
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
