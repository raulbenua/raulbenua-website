import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-center z-10">
      <ul className="flex gap-4 fixed bottom-0 w-full justify-between px-6 pb-2 portrait:text-[min(4vw,2rem)] landscape:text-[min(1.5vw,1.5rem)]">
        <li>
          <Link href="https://www.instagram.com/raul_benua" target="_blank">
            instagram
          </Link>
        </li>
        <li>
          <Link href="mailto:raulbenua@gmail.com" target="_blank">
            info@raulbenua.com
          </Link>
        </li>
        <li>
          <Link href="/files/2024-Portfolio-Raul-Benua.pdf" target="_blank">
            portfolio
          </Link>
        </li>
      </ul>
    </footer>
  )
}
