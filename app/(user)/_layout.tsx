import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text, Image, StyleSheet } from 'react-native';

export default function TabLayout() {

  return (
    <>
    <Tabs >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: () => (
            <>
              <Image source={require('../../assets/house.png')} />
            </>
          ),
          tabBarStyle: {
            backgroundColor: "#824C8A",
            padding: 10,
            height: "auto"
          }
        }}
      />
      <Tabs.Screen
        name="ListServicos"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: () => (
            <>
              <Image source={require('../../assets/calender.png')} />
            </>
          ),
          tabBarStyle: {
            backgroundColor: "#824C8A",
            padding: 10,
            height: "auto"
          }
        }}
      />
      <Tabs.Screen
        name="place"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: () => (
            <>
              <Image source={require('../../assets/market.png')} />
            </>
          ),
          tabBarStyle: {
            backgroundColor: "#824C8A",
            padding: 10,
            height: "auto"
          }
        }}
      />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: ' ',
            tabBarIcon: () => (
              <>
                <Image source={require('../../assets/profile.png')} />
              </>
            ),
            tabBarStyle: {
              backgroundColor: "#824C8A",
              padding: 10,
              height: "auto"
            }
          }}
        />
    </Tabs>
    </>
  );
}