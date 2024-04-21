import React, { useState } from 'react';
import { Modal, Pressable, View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Shift from '../models/Shift';
import theme from '../utils/theme';

function ShiftModal({ addShift, modalVisible, setModalVisible }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const createShift = () => {
        if (startDate.getTime() === endDate.getTime()) {
            alert('End date must be after start date');
            return;
        }
        const shift = new Shift(startDate, endDate);
        addShift(shift);
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalInputContainer}>
                        <Text>Select start date and time:</Text>
                        <DateTimePicker
                            value={startDate}
                            mode={'datetime'}
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setStartDate(selectedDate);
                                }
                            }}
                        />
                    </View>
                    <Text>
                        <Text>Select end date and time:</Text>
                        <DateTimePicker
                            value={endDate}
                            mode={'datetime'}
                            is24Hour={true}
                            display="clock"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setEndDate(selectedDate);
                                }
                            }}
                        />
                    </Text>
                    <View style={{ flexDirection: 'row', backgroundColor: 'red', justifyContent: 'space-between' }}>
                        <Button title="Create Shift" onPress={createShift} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        borderWidth: 3,
        borderColor: theme.colors.text,
        backgroundColor: theme.colors.lightGreen,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default ShiftModal;