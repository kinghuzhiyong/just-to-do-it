import './global.css'
import Navigator from '@/components/navigator/navigator'

export const metadata = {
    title: 'Just to do it',
    // description: 'Generated by Next.js',
}

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navigator />
                {children}
            </body>
        </html>
    )
}
