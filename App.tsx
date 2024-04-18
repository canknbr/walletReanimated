import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CardList from "./src/components/CardList";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      <CardList />
      <StatusBar style="light" />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
