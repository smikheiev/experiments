import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
            <View style={styles.formControl}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput style={styles.textInput}></TextInput>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <Button onPress={() => {}} title="Submit" color="#841584" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  formControl: {
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  inputLabel: {
    fontSize: 30,
    paddingBottom: 10,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 24,
    height: 50,
  },
  buttonContainer: {
    justifyContent: "center",
    height: 80,
    borderWidth: 1,
  },
});
