import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'
import { UserPhoto } from './user-photo'
import { LogOut } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/use-auth'

export function HomeHeader() {
  const { signOut } = useAuth()
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={{ uri: 'https://github.com/gcarniel.png' }}
        w="$16"
        h="$16"
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          Dunha{' '}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  )
}
