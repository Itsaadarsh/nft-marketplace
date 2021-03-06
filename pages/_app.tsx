import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav className='border-b p-6'>
        <p className='text-4xl font-bold'>F500 Marketplace</p>
        <div className='flex mt-4'>
          <Link href="/">
            <a className="mr-4 text-green-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-green-500">Sell NFT</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-green-500">My NFTs</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-green-500">My Dashboard</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )

}

export default MyApp
