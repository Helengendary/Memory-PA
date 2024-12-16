import { useState } from 'react';
import { StyleSheet, Image, Platform, View, FlatList, Text } from 'react-native';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';

export default function PickerDate({onChange, value} : {onChange : Function, value : Date})
{
    return(
    <>
        <View>
            <DatePickerInput
                inputMode='start'
                onChange={(date) => {onChange(date)}}
                locale="pt"
                value={value}
            />
        </View>
    </>
    )
}