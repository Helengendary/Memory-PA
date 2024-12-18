import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable, Touchable, TouchableOpacity, TextInput } from 'react-native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import Services from "@/data/servicos.json"
import Colors from "@/data/colors.json"
import PickerDate from '@/components/PickerDate';
import Times from "@/data/times.json"
import {doc, getDocs, addDoc, setDoc, getDoc, collection} from 'firebase/firestore'
import { Firestore } from '@/services/firebase';

interface Servico
{
    id : number;
    name : string;
    price : number;
    duration : number;
    type : string;
}

interface Agendamento
{
    service : Servico
    time : string;
    date : string;
}

export default function ListServicos()
{
    const [newName, setNewName] = useState<string>("");
    const [newPrice, setNewPrice] = useState<string>("");
    const [newDuration, setNewDuration] = useState<string>("");
    const [newType, setNewType] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [Selected, SetSelected] = useState<Servico | null>(null)
    const [services, setServices] = useState<Servico[]>([])
    const [ReservedTimes, SetReservedTimes] = useState<boolean[]>([]);
    //const RNFS = require('react-native-fs');

    //const arquivo = RNFS.DocumentDirectoryPath + "/data/servicos.json"

    function findTimes()
    {
        let dateString = date.toISOString().substring(0, 10);
        getDocs(collection(Firestore, "Agendamentos"))
        .then((data) =>
        {
            const reserves = data.docs.filter((item) =>
            {
                if(item.data().date == dateString)
                {
                    return item
                }
            }).map((item) =>
            {
                return item.data().time;
            }).sort((a : string, b : string) => (a.localeCompare(b)))

            //console.log(reserves)

            let ResTimes = []

            for(let i = 0, j = 0; i < Times.length; ++i)
            {
                if(j < reserves.length && Times[i] == reserves[j])
                {
                    ResTimes.push(false)
                    ++j;
                }else
                {
                    ResTimes.push(true)
                }
            }

            SetReservedTimes(ResTimes);
        });
    }

    function GetServices()
    {
        getDocs(collection(Firestore, "Servicos"))
        .then((data) =>
        {
            let servicos : any = data.docs.map((item) => ({id: item.id ,...item.data()}))
            setServices(servicos);
        })
    }

    useEffect(() =>
    {
        GetServices()
        findTimes();
    }, [date, Selected])

    function SalvarAgendamento()
    {
        if(Selected == null || time == "")
        {
            return;
        }
        const Ag : Agendamento =
        {
            service: Selected,
            date: date.toISOString().substring(0, 10),
            time: time
        }
        SelectService(null);

        addDoc(collection(Firestore, "Agendamentos"), Ag);
    }

    function SelectService(Service : Servico | null)
    {
        SetSelected((prev) =>(prev == Service ? null : Service));
        setTime("");
        findTimes();
    }

    const newProduct = () => {
        addDoc(collection(Firestore, "Servicos"), {
            "name" : newName,
            "price" : parseFloat(newPrice),
            "duration" : parseInt(newDuration),
            "type" : newType
        });
        setModal(false);
        GetServices()
    }

    function CheckTimes()
    {
        let ret = false;
        ReservedTimes.forEach(item => {if(item){ret = true}});
        return ret;
    }

    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Serviços</Text>
        </View>
        <View style={styles.CardContainer}>
            <FlatList
                data={services}
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
                            <Pressable onPress={() => SelectService(item.item)}>
                                <Text style={styles.MainText}>{item.item.name}</Text>
                                <View style={styles.Line}>
                                    <Text style={styles.Price}>R$ {item.item.price.toFixed(2)}</Text>
                                    <Text style={{fontSize: 16}}>{item.item.duration} min</Text>
                                </View>
                            </Pressable>
                            {item.item.id == Selected?.id ?
                            <>
                                <View style={styles.DatetimeContainer}>
                                    <View style={styles.TimeDisplay}>
                                        <Text style={{fontSize: time == "" ? 17 : 12, color: "#49454f"}}>HH:MM</Text>
                                        {time != "" ? 
                                        <Text style={{fontSize: 17}}>{time}</Text>
                                        : <></>
                                        }
                                    </View>
                                    <PickerDate onChange={(date : Date) => {setDate(date); setTime(""); findTimes();}} value={date}/>
                                </View>
                                <View style={styles.TimeContainer}>
                                    {
                                        Times.map((item, index) =>
                                        {
                                            if(!ReservedTimes[index]|| Date.now() > Date.parse(date.toISOString().substring(0, 10) + "T" + item))
                                            {
                                                return(<></>)
                                            }
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
                                            );
                                        })
                                    }
                                </View>
                                {time == "" ?
                                    <></> : 
                                    <View style={{flexDirection: "row", gap: 10}}>
                                        <Pressable onPress={() => SalvarAgendamento()}>
                                            <Text style={styles.ConfirmBtn}>Confirmar</Text>
                                        </Pressable>
                                        <Pressable onPress={() => setTime("")}>
                                            <Text style={styles.CancelBtn}>Cancelar</Text>
                                        </Pressable>
                                    </View>
                                }
                            </> 
                            : <></>}
                        </View>
                    )
                }}
            />
        <View style={modal? styles.modal: {display: "none"}}>
            <Text style={{fontSize: 20}}>Novo Serviço</Text>
            <TextInput onChangeText={setNewName} style={styles.input} placeholder="Digite o nome do serviço"/>
            <TextInput onChangeText={setNewPrice} style={styles.input} placeholder="Digite o preço do serviço"/>
            <TextInput onChangeText={setNewDuration} style={styles.input} placeholder="Digite a duração do serviço"/>
            <TextInput onChangeText={setNewType} style={styles.input} placeholder="Digite o tipo do serviço"/>

            <TouchableOpacity style={{ alignItems: "center" , padding: 10, marginVertical: 10, marginHorizontal: 40, backgroundColor: "#824C8A", borderRadius: 12}} onPress={newProduct}><Text style={{color: "white"}}>Enviar</Text></TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setModal(!modal)} style={{ alignItems: "center" , padding: 10, marginVertical: 10, marginHorizontal: 40, backgroundColor: "#824C8A", borderRadius: 12}}><Text style={{color: "white"}}>Novo</Text></TouchableOpacity>
        </View>
    </>
    );
}

const styles = StyleSheet.create(
{
    modal: {
        right: 35,
        display: "flex", 
        height: "70%", 
        alignItems: "center", 
        position: "absolute", 
        padding: 20, 
        gap: 10, 
        backgroundColor: "white",
        borderRadius: 15
    },
    input: {
        padding: 10, 
        backgroundColor: "#824C8A", 
        borderRadius: 7, 
        color: "#dedede",
        width: 300,
        height: 60,
        fontSize: 15
    },
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
    },
    DatetimeContainer:
    {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#e7e0ec",
        flexWrap: "wrap",
        height: "auto",
        maxWidth: "100%"
    },
    TimeDisplay:
    {
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#98929d",
        borderBottomWidth: 1,
        minWidth: "auto",
        maxHeight: "auto",
        flex: 1,
        fontFamily: "sans-serif"
    }
});
