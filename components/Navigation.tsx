'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Home' },
        { href: '/inventory', label: 'Inventory' },
        { href: '/recipes', label: 'Recipe' },
        { href: '/sign-in', label: 'Sign-Ins' },
    ]

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    <Link
                        href="/"
                        className="text-xl sm:text-2xl font-bold text-amber-500"
                    >
                        BetoBar
                    </Link>

                    <div className="flex space-x-0.5 sm:space-x-1">
                        {links.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                                        isActive
                                            ? 'bg-amber-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}
