
import { signIn } from '@/app/actions/auth'
import NotificationContext from '@/context/NotificationContext'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface AuthFetchProps {
  endpoint: string
  redirectRoute?: string
  formData: unknown
  options?: AxiosRequestConfig<unknown>
}

export function useAuthFetch () {
  const { showNotification } = useContext(NotificationContext)
  const router = useRouter()

  const authRouter = async ({
    endpoint,
    formData,
    redirectRoute,
    options
  }: AuthFetchProps) => {
    try {
      const { data } = await axios.post(
        `/api/auth/${endpoint}`,
        formData,
        options
      )
      console.log("notificaciones")

      showNotification({
        msj: data.message,
        open: true,
        status: 'success'
      })

      console.log(data)

      signIn(data.token)

      if (redirectRoute) router.push(redirectRoute)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showNotification({
        msj: error.message || 'An error occurred',
        open: true,
        status: 'error'
      })
    }
  }

  return authRouter
}