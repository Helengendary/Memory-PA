import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="Agendamentos"
        options={{
          title: 'agendamentos',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="ListServicos"
        options={{
          title: 'servicos',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
