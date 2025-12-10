import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'BetoBar',
    description: "Welcome to the Bar. Let's have a drink!",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
