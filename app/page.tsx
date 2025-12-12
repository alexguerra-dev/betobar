import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-amber-900">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        Welcome to BetoBar
                    </h1>
                    <p className="text-2xl text-amber-300 mb-2">
                        The Home Bar Experience
                    </p>
                    <p className="text-gray-300 text-lg">
                        Explore our inventory, discover cocktail recipes, and
                        share your experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link
                        href="/inventory"
                        className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                        <div className="text-4xl mb-4">🍾</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Bar Inventory
                        </h2>
                        <p className="text-gray-600">
                            See all available liquors, mixers, garnishes, and
                            bitters in stock
                        </p>
                    </Link>

                    <Link
                        href="/recipes"
                        className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                        <div className="text-4xl mb-4">📖</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Recipe Book
                        </h2>
                        <p className="text-gray-600">
                            Browse our collection of classic cocktail recipes to
                            choose from
                        </p>
                    </Link>

                    <Link
                        href="/sign-in"
                        className="bg-white rounded-lg shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-1"
                    >
                        <div className="text-4xl mb-4">✍️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Sign-In Book
                        </h2>
                        <p className="text-gray-600">
                            Rate your drink and share your thoughts with future
                            guests
                        </p>
                    </Link>
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-amber-900 bg-opacity-50 rounded-lg p-8 inline-block">
                        <p className="text-amber-100 text-xl italic">
                            "A good cocktail is like a fine piece of art - it
                            should be savored and appreciated."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
