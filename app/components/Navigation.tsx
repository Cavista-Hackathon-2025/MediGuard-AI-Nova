import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around">
        <li>
          <Link href="/dashboard" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/medication-list" className="text-white hover:underline">
            Medication List
          </Link>
        </li>
        <li>
          <Link href="/symptom-checker" className="text-white hover:underline">
            Symptom Checker
          </Link>
        </li>
        <li>
          <Link href="/drug-interaction" className="text-white hover:underline">
            Drug Interaction
          </Link>
        </li>
        <li>
          <Link href="/emergency-assistance" className="text-white hover:underline">
            Emergency Help
          </Link>
        </li>
      </ul>
    </nav>
  )
}

