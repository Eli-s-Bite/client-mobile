import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import HomeIcon from '@/assets/icons/home.svg';
import OrdersIcon from '@/assets/icons/orders.svg';
import CartIcon from '@/assets/icons/cart.svg';
import ProfileIcon from '@/assets/icons/profile.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon
              width={size}
              height={size}
              stroke={
                focused ? color : colorScheme === 'dark' ? 'white' : 'black'
              }
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused, color, size }) => (
            <OrdersIcon
              width={size}
              height={size}
              stroke={
                focused ? color : colorScheme === 'dark' ? 'white' : 'black'
              }
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused, color, size }) => (
            <CartIcon
              width={size}
              height={size}
              stroke={
                focused ? color : colorScheme === 'dark' ? 'white' : 'black'
              }
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused, color, size }) => (
            <ProfileIcon
              width={size}
              height={size}
              stroke={
                focused ? color : colorScheme === 'dark' ? 'white' : 'black'
              }
              fill={focused ? color : 'transparent'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
