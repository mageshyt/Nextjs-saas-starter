import { Toaster as SonnarToast } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"

const ToastProvider = () => {
  return (
    <>
      <Toaster />
      <SonnarToast richColors closeButton />
    </>
  )
}

export default ToastProvider
