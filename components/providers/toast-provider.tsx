import { Toaster as SonnarToast } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"

const ToastProvider = () => {
  return (
    <>
      <Toaster />
      <SonnarToast />
    </>
  )
}

export default ToastProvider
