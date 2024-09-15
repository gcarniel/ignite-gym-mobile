import { Platform } from 'react-native'
import { Box } from '@gluestack-ui/themed'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import { Exercise } from '@screens/exercise'
import { History } from '@screens/history'
import { Home } from '@screens/home'
import { Profile } from '@screens/profile'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'

type AppRoutes = {
  home: undefined
  history: undefined
  exercise: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig

  const iconSize = tokens.space[6]
  return (
    <Box bg="$gray700" flex={1}>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: tokens.colors.green500,
          tabBarInactiveTintColor: tokens.colors.gray200,
          tabBarStyle: {
            backgroundColor: tokens.colors.gray600,
            borderTopWidth: 0,
            height: Platform.OS === 'android' ? 'auto' : 96,
            paddingBottom: tokens.space['10'],
            paddingTop: tokens.space['6'],
          },
        }}
      >
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <HomeSvg fill={color} height={iconSize} width={iconSize} />
            ),
          }}
        />
        <Screen
          name="history"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <HistorySvg fill={color} height={iconSize} width={iconSize} />
            ),
          }}
        />
        <Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <ProfileSvg fill={color} height={iconSize} width={iconSize} />
            ),
          }}
        />
        <Screen
          name="exercise"
          component={Exercise}
          options={{ tabBarButton: () => null }}
        />
      </Navigator>
    </Box>
  )
}
