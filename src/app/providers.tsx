import { Provider as BalanceProvider } from "react-wrap-balancer"

/**
 * Providers wraps the site in any global client-side providers.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <BalanceProvider>{children}</BalanceProvider>
}
