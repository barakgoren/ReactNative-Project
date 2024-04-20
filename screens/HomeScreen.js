import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet, Pressable, Animated, Easing } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shift from '../models/Shift';
import theme from '../utils/theme';
import AwesomeButton from 'react-native-really-awesome-button';

export default function HomeScreen({ addShift, removeShift }) {
    const myHourlyWage = 36.29;

    const [startTime, setStartTime] = useState(null);
    const [counter, setCounter] = useState(0);
    const [myDailyWage, setDailyWage] = useState(0.0);
    const [isRunning, setIsRunning] = useState(false);
    const animationValue = useRef(new Animated.Value(0)).current;

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
        // if (startTime) {
        //     return;
        // }
        const now = new Date();
        setStartTime(now);
        setIsRunning(true);
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
        setIsRunning(false);
        animationValue.setValue(0);
        await AsyncStorage.removeItem('startTime');
    };

    const handlePressIn = () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(animationValue).stop();
        animationValue.setValue(0);
    };

    const seconds = String(counter % 60).padStart(2, '0');
    const minutes = String(Math.floor(counter / 60) % 60).padStart(2, '0');
    const hours = String(Math.floor(counter / 3600)).padStart(2, '0');

    return (
        <View style={styles.center}>
            <Text style={styles.dailyWageText}>{myDailyWage.toFixed(2)} ₪</Text>
            <Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}`}</Text>
            <View style={{padding:30}}>
                {!isRunning && <Pressable delayLongPress={2000} onLongPress={startTimer} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.button}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            backgroundColor: 'green',
                            transform: [
                                {
                                    scale: animationValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    }),
                                },
                            ],
                        }}
                    />
                    <Text style={styles.buttonText}>Start</Text>
                </Pressable>}
                {isRunning && <Pressable
                    onPress={resetTimer}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : '#FF0000',
                        },
                        styles.stopButton,
                    ]}
                >
                    <Text style={styles.buttonText}>Stop</Text>
                </Pressable>}
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
        backgroundColor: theme.colors.background
    },
    dailyWageText: {
        color: theme.colors.text,
        fontSize: 70,
        fontWeight: 'bold',
    },
    timerText: {
        color: theme.colors.textSecondary,
    },
    button: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.lightGreen,
        borderRadius: 50, // Half of width and height
        overflow: 'hidden',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    stopButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: 100,
        height: 100,
    },
});

