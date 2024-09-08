import { Center, Heading, Image, Text, VStack } from '@gluestack-ui/themed'

import backgroudImg from '@assets/background.png'
import Logo from '@assets/logo.svg'

export function SignIn() {
  return (
    <VStack flex={1} bg="$gray700">
      <Image
        source={backgroudImg}
        defaultSource={backgroudImg}
        alt="pessoas treinando na academia"
        w={'$full'}
        h={624}
        position="absolute"
      />

      <Center my={'$24'}>
        <Logo />

        <Text color="$gray100" fontSize="$sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="$gray100">Acesse sua conta</Heading>
      </Center>
    </VStack>
  )
}
