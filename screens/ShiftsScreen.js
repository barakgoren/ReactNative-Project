import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, Button, Modal, Pressable } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Shift from '../models/Shift'
import ShiftCard from '../components/ShiftCard'
import ShiftModal from '../components/ShiftModal'
import theme from '../utils/theme'

export default function ShiftsScreen({ shifts, setShifts, removeShift, modalVisible, setModalVisible }) {
    const [date, setDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const createShift = (shift) => {
        setShifts([...shifts, shift]);
        setModalVisible(false);
    };

    const deleteShift = (shift) => {
        removeShift(shift);
    };

    const incrementMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
    };

    const decrementMonth = () => {
        setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
    };

    const filteredShifts = shifts.filter(shift => {
        const shiftDate = new Date(shift.startTime);
        return shiftDate.getMonth() === date.getMonth() && shiftDate.getFullYear() === date.getFullYear();
    });

    const sortedShifts = filteredShifts.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const totalWage = filteredShifts.reduce((total, shift) => {
        const totalTimeInHours = ((shift.endTime - shift.startTime) / 1000 / 60 / 60);
        const totalWage = (totalTimeInHours * 36.29);
        return total + totalWage;
    }, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button color={'lightseagreen'} title="<" onPress={decrementMonth} />
                <Text style={styles.dateText}>{monthNames[date.getMonth()]} {date.getFullYear()}</Text>
                <Button color={'lightseagreen'} title=">" onPress={incrementMonth} />
            </View>

            <ShiftModal modalVisible={modalVisible} setModalVisible={setModalVisible} addShift={createShift} />

            {sortedShifts < 1 && <Text style={{ textAlign: 'center', padding: 10 }}>No shifts added here yet...</Text>}
            <FlatList
                data={filteredShifts}
                renderItem={({ item }) => <ShiftCard shift={item} removeShift={removeShift} />}
                keyExtractor={item => item.id}
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
        backgroundColor: theme.colors.background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    dateText: {
        fontSize: 22
    }
})
