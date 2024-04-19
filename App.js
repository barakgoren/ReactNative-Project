import { React, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from './screens/HomeScreen';
import ShiftsScreen from './screens/ShiftsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [shifts, setShifts] = useState([]);

  const addShift = (shift) => {
    console.log('Adding shift:', shift);
    setShifts([...shifts, shift]);
  };

  const removeShift = (shift) => {
    setShifts(shifts.filter((s) => s !== shift));
  }

  return (
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
        })}
      >
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen addShift={addShift} removeShift={removeShift} />}
        />
        <Tab.Screen
          name="My Shifts"
          children={() => <ShiftsScreen shifts={shifts} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}