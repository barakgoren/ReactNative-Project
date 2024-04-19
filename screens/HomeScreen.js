import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shift from '../models/Shift';

export default function HomeScreen({ addShift, removeShift }) {
    const myHourlyWage = 36.29;

    const [startTime, setStartTime] = useState(null);
    const [counter, setCounter] = useState(0);
    const [myDailyWage, setDailyWage] = useState(0.0);

    useEffect(() => {
        const loadStartTime = async () => {
            const savedStartTime = await AsyncStorage.getItem('startTime');
            if (savedStartTime) {
                setStartTime(new Date(savedStartTime));
            }
        };
        loadStartTime();
    }, []);

    useEffect(() => {
        let interval = null;
        if (startTime) {
            interval = setInterval(() => {
                const now = new Date();
                const secondsPassed = Math.floor((now - startTime) / 1000);
                setCounter(secondsPassed);
                setDailyWage((secondsPassed / 3600) * myHourlyWage);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [startTime]);

    const startTimer = async () => {
        if (startTime) {
            return;
        }
        const now = new Date();
        setStartTime(now);
        await AsyncStorage.setItem('startTime', now.toString());
    };

    const resetTimer = async () => {
        if (!startTime) {
            return;
        }
        const newShift = new Shift(startTime, new Date());
        addShift(newShift);
        setStartTime(null);
        setCounter(0);
        setDailyWage(0.0);
        await AsyncStorage.removeItem('startTime');
    };

    const seconds = String(counter % 60).padStart(2, '0');
    const minutes = String(Math.floor(counter / 60) % 60).padStart(2, '0');
    const hours = String(Math.floor(counter / 3600)).padStart(2, '0');

    return (
        <View style={styles.center}>
            <Text style={styles.dailyWageText}>{myDailyWage.toFixed(2)} ₪</Text>
            <Text>{`${hours}:${minutes}:${seconds}`}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Start" onPress={startTimer} />
                <Button title="Reset" onPress={resetTimer} />
            </View>
        </View>
    )
}

// Create a style for centering the text
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    dailyWageText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});

