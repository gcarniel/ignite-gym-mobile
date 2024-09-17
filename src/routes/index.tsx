import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
// import { AuthRoutes } from './auth.routes'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { AppRoutes } from './app.route'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/use-auth'

export function Routes() {
  const theme = DefaultTheme
  const { user } = useAuth()
  console.log(user)

  theme.colors.background = gluestackUIConfig.tokens.colors.gray700
  return (
    <NavigationContainer theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
  )
}
