import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import worldCount from './screens/worldCount';
import countryCount from './screens/countryCount';
import countriesCount from './screens/countriesCount';
import stateCount from './screens/stateCount';
import Icon from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/FontAwesome';

const Tabs = createBottomTabNavigator();
const ScreenNavigation = ({navigation}) => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{activeTintColor: 'red', inactiveTintColor: 'black'}}>
        <Tabs.Screen
          name="World"
          component={worldCount}
          options={{
            tabBarIcon: () => {
              return (
                <View>
                  <Icon name="globe-outline" color="black" size={25} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="Country"
          component={countryCount}
          options={{
            tabBarIcon: () => {
              return (
                <View>
                  <Icon name="analytics" color="black" size={25} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="Countries"
          component={countriesCount}
          options={{
            tabBarIcon: () => {
              return (
                <View>
                  <Icon name="planet-outline" color="black" size={25} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="State"
          component={stateCount}
          options={{
            tabBarIcon: () => {
              return (
                <View>
                  <Icon name="layers-outline" size={25} />
                </View>
              );
            },
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;

const styles = StyleSheet.create({});
