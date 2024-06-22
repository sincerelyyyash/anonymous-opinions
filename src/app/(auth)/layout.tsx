export const metadata = {
  title: 'Anonymous Opinions',
  description: 'Dive into the World of Anonymous opinions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
