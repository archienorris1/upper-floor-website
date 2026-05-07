import type { Metadata } from 'next'
import LoginRedirect from './LoginRedirect'

export const metadata: Metadata = {
  title: 'Client Portal — Upper Floor',
  description: 'Access your Upper Floor client portal.',
  robots: 'noindex, nofollow',
}

export default function LoginPage() {
  return <LoginRedirect />
}
