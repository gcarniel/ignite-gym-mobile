import { HistoryCard } from '@components/history-card'
import { Loading } from '@components/loading'
import { ScreenHeader } from '@components/screen-header'
import { ToastMessage } from '@components/toast-message'
import { HistoryByDayDTO } from '@dtos/history-dto'
import { Heading, Text, useToast, VStack } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/app-error'
import { useCallback, useState } from 'react'
import { SectionList } from 'react-native'

export function History() {
  const [history, setHistory] = useState<HistoryByDayDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/history')
      setHistory(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares'

      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3">
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            history.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="$gray200" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer execícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}
