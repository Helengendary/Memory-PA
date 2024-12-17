import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="register" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="(user)" options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}

const styles = StyleSheet.create({
  white: {
    color: "#A52222"
  }
})