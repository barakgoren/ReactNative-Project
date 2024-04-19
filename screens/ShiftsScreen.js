import React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import Shift from '../models/Shift'
import ShiftCard from '../components/ShiftCard'

export default function ShiftsScreen({ shifts }) {

    const totalWage = shifts.reduce((total, shift) => {
        const totalTimeInHours = ((shift.endTime - shift.startTime) / 1000 / 60 / 60);
        const totalWage = (totalTimeInHours * 36.29);
        return total + totalWage;
    }, 0);

    return (
        <View style={styles.container}>
            {/* List of recorded shifts */}
            <FlatList
                data={shifts}
                renderItem={({ item }) => <ShiftCard shift={item} />}
            />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <Text style={{ fontSize: 24 }}>Total</Text>
                    <Text style={{ fontSize: 24 }}>{totalWage.toFixed(2)} ₪</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})
