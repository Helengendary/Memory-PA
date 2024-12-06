import { useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text } from 'react-native';
import Services from "@/data/services.json"

type Service =
{
    name : string;
    price : number;
    duration : number;
}[]

export default function TabTwoScreen()
{
    return (
    <>
        <View>
            <FlatList
                data={Services}
                keyExtractor={(item) => (item.name)}
                renderItem={(item) =>
                (
                    <View>
                        <Text>{item.item.name}</Text>
                        <Text>R$ {item.item.price.toFixed(2)}</Text>
                        <Text>{item.item.duration} min</Text>
                    </View>
                )}
            />
        </View>
    </>
    );
}

const styles = StyleSheet.create({
});
