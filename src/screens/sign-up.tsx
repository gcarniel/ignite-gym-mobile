import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed'

import backgroudImg from '@assets/background.png'
import Logo from '@assets/logo.svg'
import { Input } from '@components/input'
import { Button } from '@components/button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const handleLogin = () => navigate('sign-in')

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={true}
    >
      <VStack flex={1}>
        <Image
          source={backgroudImg}
          defaultSource={backgroudImg}
          alt="pessoas treinando na academia"
          w={'$full'}
          h={624}
          position="absolute"
        />

        <VStack flex={1} px="$10" pb={'$16'}>
          <Center my={'$24'}>
            <Logo />

            <Text color="$gray100" fontSize="$sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap={'$2'}>
            <Heading color="$gray100">Crie sua conta</Heading>
            <Input placeholder="Nome" />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoFocus
              autoCapitalize="none"
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button
              title="Criar e acessar"
              onPress={() => console.log('Acessar')}
            />
          </Center>

          <Button
            title="Ir para o login"
            variant="outline"
            mt={'$12'}
            onPress={handleLogin}
          />
        </VStack>
      </VStack>
    </ScrollView>
  )
}
