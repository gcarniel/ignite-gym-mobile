import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { gluestackUIConfig } from '../../config/gluestack-ui.config'
import { AppRoutes } from './app.route'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/use-auth'
import { Loading } from '@components/loading'

export function Routes() {
  const theme = DefaultTheme

  const { user, isLoading } = useAuth()

  theme.colors.background = gluestackUIConfig.tokens.colors.gray700

  if (isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer theme={theme}>
      {user?.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
