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
                    <Text style={styles.modalText}>Create a new shift</Text>
                    <View style={{margin:10}}>
                        <View style={styles.modalInputContainer}>
                            <Text>Started at:</Text>
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
                        <View style={styles.modalInputContainer}>
                            <Text>Ended at:</Text>
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
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', borderEndEndRadius: 16, borderBottomLeftRadius: 16, justifyContent: 'space-around' }}>
                            <Pressable style={{ ...styles.button, backgroundColor: 'red' }} onPress={() => setModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={createShift}>
                                <Text style={styles.textStyle}>Create Shift</Text>
                            </Pressable>
                        </View>
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalInputContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    modalText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 24,
    },
    button: {
        borderRadius: 10,
        margin: 5,
        marginTop: 0,
        padding: 10,
        elevation: 2,
        backgroundColor: theme.colors.text,
        flex: 1,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ShiftModal;