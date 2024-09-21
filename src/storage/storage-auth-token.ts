import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_STORAGE } from './storage-config'

type StorageAuthTokenProps = {
  token: string
  refreshToken: string
}

export async function storageAuthTokenSave({
  token,
  refreshToken,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_STORAGE,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE)

  const { token, refreshToken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return { token, refreshToken }
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE)
}
