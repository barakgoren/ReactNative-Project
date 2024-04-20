import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import theme from '../utils/theme';

export default function ShiftCard({ shift, removeShift }) {
    const startTime = new Date(shift.startTime);
    const endTime = new Date(shift.endTime);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[startTime.getDay()];

    const fullDate = `${startTime.getDate().toString().padStart(2, 0)}/${startTime.getMonth().toString().padStart(2, 0)}/${startTime.getFullYear()}`;

    const totalTimeInHours = ((endTime - startTime) / 1000 / 60 / 60).toFixed(4);
    const totalWage = (totalTimeInHours * 36.29).toFixed(4);

    // For display
    const displayTime = parseFloat(totalTimeInHours).toFixed(2);
    const displayWage = parseFloat(totalWage).toFixed(2);

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-101, -100, -50, 0],
            outputRange: [20, 20, 0, 0],
        });
        return (
            <RectButton style={styles.rightAction} onPress={() => {
                removeShift(shift);
            
            }}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}
                >
                    Delete
                </Animated.Text>
            </RectButton>
        );
    };

    return (
        <View style={styles.shiftCard}>
            <View style={{overflow:'hidden', borderRadius:6}}>
                <Swipeable renderRightActions={renderRightActions}>
                    <View style={{ flexDirection: 'row', backgroundColor: theme.colors.lightGreen }}>
                        <View style={{ flex: 3, padding: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={styles.textTitle}>{fullDate}</Text>
                                <Text style={styles.dayDisplay}>{currentDay}</Text>
                            </View>
                            <Text>{`From: ${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')} - ${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`}</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'grey', fontSize: 10, paddingHorizontal: 10 }}>
                                Daily Hours
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ fontSize: 28 }}>{displayTime}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 2 }}>
                            <Text style={{ color: 'grey', fontSize: 10 }}>
                                Daily Wage
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ fontSize: 28 }}>{displayWage}</Text>
                                <Text style={{ fontSize: 16, color: 'grey' }}>₪</Text>
                            </View>
                        </View>
                    </View>
                </Swipeable>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    shiftCard: {
        margin: 8,
        backgroundColor: 'grey',
        borderColor: 'lightseagreen',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 8,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 8,
    },
    dayDisplay: {
        fontSize: 14,
        marginLeft: 5,
        color: 'gray',
    },
    rightAction: {
        justifyContent: 'center',
        width: 90,
        backgroundColor: 'red',
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
    },
})