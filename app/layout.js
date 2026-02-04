import './globals.css'

export const metadata = {
  title: 'Halloon Media - 360° Media Solutions',
  description:
    'Your comprehensive media partner across UAE, KSA, Qatar, Kuwait & India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}