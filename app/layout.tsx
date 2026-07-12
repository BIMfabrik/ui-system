import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/registry/new-york/theme-provider/theme-provider"

export const metadata: Metadata = {
  title: "BIMfabrik UI System",
  description: "A restrained shadcn registry for application, editorial and spatial interfaces.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
