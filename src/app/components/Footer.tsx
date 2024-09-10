import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-center z-10">
      <ul className="flex gap-4 fixed bottom-0 w-full justify-between px-6 pb-2 portrait:text-[max(3.5vw,1.5rem)] landscape:text-[max(1.5vw,1.5rem)]">
        <li>
          <Link href="https://www.instagram.com/raul_benua">instagram</Link>
        </li>
        <li>
          <Link href="mailto:raulbenua@gmail.com">raulbenua@gmail.com</Link>
        </li>
        <li>
          <Link href="https://wa.me/+51941103338">whatsapp</Link>
        </li>
      </ul>
    </footer>
  )
}
