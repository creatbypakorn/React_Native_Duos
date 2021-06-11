import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Audio } from "expo-av";



export default function RecorderScreen() {
    const [recording, setRecording] = useState(false);
    const [recordingUri, setRecordingUri] = useState("");

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            await recording.startAsync();
            setRecording(recording);
        } catch (err) {
            console.log("Nothing is recording", err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        setRecordingUri(recording.getURI());
        const title = new Date();
      
    }

    async function playRecording() {
        try {
            const { sound } = await Audio.Sound.createAsync({
                uri: recordingUri,
            });
            await sound.playAsync();
            sound.getStatusAsync();
        } catch (err) {
            console.log(err, Alert.alert("You have no recordings"));
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Recorder</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title={recording ? "Stop" : "Record"}
                    style={styles.button}
                    onPress={recording ? stopRecording : startRecording}
                />
            </View>
            {recording && <Text>You are recording right now</Text>}
            <View style={styles.buttonContainer}>
                <Button title="Play recording" onPress={playRecording} 
                
                />
            </View>
           

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
   
    buttonContainer: {
        margin: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        backgroundColor: "white"
    },

    title: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        borderWidth: 2.5,
        fontSize: 50,
        marginBottom: 50,
        textAlign: 'center'
    }
});
