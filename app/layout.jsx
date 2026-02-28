import './globals.css'
import SmoothScroller from '../components/SmoothScroller'

export const metadata = {
  title: 'Halloon Media - 360° Media Solutions',
  description:
    'Your comprehensive media partner across UAE, KSA, Qatar, Kuwait & India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  )
}