import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { CityProvider, CityContext } from './src/context/CityContext';
import CitySelectorScreen from './src/screens/CitySelectorScreen';
import NewsFeedScreen from './src/screens/NewsFeedScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import EmergencyAlertsScreen from './src/screens/EmergencyAlertsScreen';
import NewsWebViewScreen from './src/screens/NewsWebViewScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { city, selectCity } = useContext(CityContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'Alerts') {
            iconName = focused ? 'warning' : 'warning-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366F1', // Indigo 500
        tabBarInactiveTintColor: '#94A3B8', // Slate 400
        headerShown: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
          elevation: 0,
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#F1F5F9',
        },
        headerTitleStyle: {
          fontWeight: '800',
          color: '#1E293B',
          fontSize: 18,
        }
      })}
    >
      <Tab.Screen
        name="News"
        component={NewsFeedScreen}
        options={{
          title: `News in ${city || 'City'}`,
          headerRight: () => (
            <Ionicons
              name="location-outline"
              size={24}
              color="#6366F1"
              style={{ marginRight: 20 }}
              onPress={() => selectCity(null)} // Reset city to trigger selector
            />
          )
        }}
      />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Alerts" component={EmergencyAlertsScreen} options={{ title: 'Emergency Alerts' }} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { city, loading } = useContext(CityContext);

  if (loading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!city ? (
          <Stack.Screen
            name="CitySelector"
            component={CitySelectorScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="ArticleDetails"
          component={NewsWebViewScreen}
          options={{ title: 'Article' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <CityProvider>
      <AppNavigator />
    </CityProvider>
  );
}
