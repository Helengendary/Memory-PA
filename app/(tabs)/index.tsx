import { StyleSheet, Image, Platform, View, FlatList, Text, Pressable } from 'react-native';
import Data from "@/data/agendamentos.json"



export default function Agendamentos()
{
    return (
    <>
        <View style={styles.TitleContainer}>
            <Text style={styles.Title}>Agendamentos</Text>
        </View>
        <View style={styles.CardContainer}>
            <FlatList
                data={Data}
                keyExtractor={(item) => (Math.random().toString() + item.name)} 
                renderItem={(item) =>
                {
                    let d = new Date(Date.parse(item.item.date));
                    return(
                    <View style={styles.Card}>
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
