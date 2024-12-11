import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'register',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="forget"
        options={{
          title: 'forget',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
