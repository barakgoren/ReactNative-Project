import { React, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import HomeScreen from './screens/HomeScreen';
import ShiftsScreen from './screens/ShiftsScreen';
import theme from './utils/theme';

const Tab = createBottomTabNavigator();

export default function App() {

  const [shifts, setShifts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addShift = (shift) => {
    console.log('Adding shift:', shift);
    setShifts([...shifts, shift]);
  };

  const removeShift = (shift) => {
    // create an alert that asks the user if they are sure they want to delete the shift
    // if they press 'Yes', remove the shift from the list
    // if they press 'No', the shift should return to the list
    Alert.alert(
      'Delete Shift',
      'Are you sure you want to delete this shift?',
      [
        {
          text: 'Yes',
          onPress: () => setShifts(shifts.filter(s => s !== shift))
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed')
        }
      ]
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'My Shifts') {
                iconName = 'list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'lightseagreen',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: theme.colors.lightGreen,
              borderTopColor: theme.colors.lightGreen,
            },
            headerStyle: {
              backgroundColor: theme.colors.lightGreen,
            },
            headerTintColor: theme.colors.text,
            
          })}
        >
          <Tab.Screen
            name="Home"
            children={() => <HomeScreen addShift={addShift} removeShift={removeShift} />}
          />
          <Tab.Screen
            name="My Shifts"
            children={() => <ShiftsScreen modalVisible={modalVisible} setModalVisible={setModalVisible} shifts={shifts} setShifts={setShifts} removeShift={removeShift} />}
            options={{
              headerRight: () => (
                <Pressable
                  style={{ marginRight: 10 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Ionicons name="add" size={20} color="lightseagreen" />
                </Pressable>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}