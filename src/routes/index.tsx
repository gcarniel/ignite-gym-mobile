import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
// import { AuthRoutes } from './auth.routes'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { AppRoutes } from './app.route'

export function Routes() {
  const theme = DefaultTheme

  theme.colors.background = gluestackUIConfig.tokens.colors.gray700
  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  )
}
