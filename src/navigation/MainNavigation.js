import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import MainScreen from '../screens/MainScreen.js';
import Footer from '../components/footer/Footer.js';
import Header from '../components/header/Header.js';
import UserProfile from '../screens/UserProfile.js';
import General_Pet_Med_Screen from '../screens/General_Pet_Med_Screen.js';
import MedScreen from '../screens/MedScreen.js';
import InfoPage from '../screens/InfoPage.js';
import { IconButton, Icon } from 'native-base';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
const Main = createNativeStackNavigator();

const FooterTabs = createBottomTabNavigator();
const FooterStackScreen = (props) => {
  return (
    <FooterTabs.Navigator tabBar={(props) => <Footer {...props} />}>
      <FooterTabs.Screen
        name='Main'
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <FooterTabs.Screen
        name='Profile'
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <FooterTabs.Screen
        name='Info_page'
        component={InfoPage}
        options={({ navigation }) => ({
          title: 'Pet Information Page',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate('Main')}
              icon={<Icon as={Ionicons} name='arrow-back' size={6} />}
            />
          ),
        })}
      />
      <FooterTabs.Screen
        name='Med_page'
        component={General_Pet_Med_Screen}
        options={({ navigation }) => ({
          title: 'Medecine Pet Information',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.navigate('Main')}
              icon={<Icon as={Ionicons} name='arrow-back' size={6} />}
            />
          ),
        })}
      />
      <FooterTabs.Screen
        name='Med_screen'
        component={MedScreen}
        options={({ navigation }) => ({
          title: 'Medecine information',
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              icon={<Icon as={Ionicons} name='arrow-back' size={6} />}
            />
          ),
        })}
      />
    </FooterTabs.Navigator>
  );
};

const AllPageNavs = createNativeStackNavigator();
const AllPageNaveStack = (props) => {
  return (
    <AllPageNavs.Navigator>
      <AllPageNavs.Screen
        name='Footer'
        component={FooterStackScreen}
        options={{ headerShown: false }}
      />
    </AllPageNavs.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Main.Navigator>
        <Main.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Main.Screen
          name='AllNavigation'
          component={AllPageNaveStack}
          options={{ header: (props) => <Header {...props} /> }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
