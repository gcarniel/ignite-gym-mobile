import { Heading, HStack, Text, VStack, Icon } from '@gluestack-ui/themed'
import { UserPhoto } from './user-photo'
import { LogOut } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/use-auth'

import defaulUserPhotoImg from '@assets/userPhotoDefault.png'
import { api } from '@services/api'

export function HomeHeader() {
  const { signOut, user } = useAuth()
  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaulUserPhotoImg
        }
        w="$16"
        h="$16"
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Text color="$gray100" fontSize="$sm">
          Olá,
        </Text>
        <Heading color="$gray100" fontSize="$md">
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} color="$gray200" size="xl" />
      </TouchableOpacity>
    </HStack>
  )
}
