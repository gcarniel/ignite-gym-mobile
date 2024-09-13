import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { SignIn } from '@screens/sign-in'
import { SignUp } from '@screens/sign-up'

type AuthRoutes = {
  'sign-in': undefined
  'sign-up': undefined
}

export type AuthNavigatorRoutesProps = NativeStackScreenProps<AuthRoutes>
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="sign-in" component={SignIn} />
      <Screen name="sign-up" component={SignUp} />
    </Navigator>
  )
}
