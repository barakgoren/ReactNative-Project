import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ShiftCard({ shift }) {
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

    return (
        <View>
            {/* Single Shift Card */}
            <View style={styles.shiftCard}>
                <View style={{ flex: 2, padding: 10, borderEndColor: 'lightseagreen', borderEndWidth: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={styles.textTitle}>{fullDate}</Text>
                        <Text style={styles.dayDisplay}>{currentDay}</Text>
                    </View>
                    <Text>{`From: ${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')} - ${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, borderEndColor: 'lightseagreen', borderEndWidth: 1 }}>
                    <Text style={{ color: 'grey', fontSize: 10 }}>
                        Daily Hours
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 28 }}>{displayTime}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'grey', fontSize: 10 }}>
                        Daily Wage
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        <Text style={{ fontSize: 28 }}>{displayWage}</Text>
                        <Text style={{ fontSize: 16, color: 'grey' }}>₪</Text>
                    </View>
                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shiftCard: {
        flexDirection: 'row',
        margin: 8,
        backgroundColor: 'lightblue',
        borderColor: 'lightseagreen',
        borderWidth: 2,
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
    }
})