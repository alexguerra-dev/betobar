import { recipes } from '@/data/recipes'

export default function RecipesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Recipe Book
                </h1>
                <p className="text-gray-600 mb-8">Choose your cocktail</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="bg-linear-to-r from-amber-500 to-orange-600 h-32 flex items-center justify-center">
                                <h2 className="text-2xl font-bold text-white text-center px-4">
                                    {recipe.name}
                                </h2>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 mb-4 italic">
                                    {recipe.description}
                                </p>

                                {recipe.glassType && (
                                    <p className="text-sm text-gray-500 mb-4">
                                        <span className="font-semibold">
                                            Glass:
                                        </span>{' '}
                                        {recipe.glassType}
                                    </p>
                                )}

                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Ingredients:
                                    </h3>
                                    <ul className="space-y-1">
                                        {recipe.ingredients.map(
                                            (ingredient, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-gray-700 flex items-start"
                                                >
                                                    <span className="text-amber-600 mr-2">
                                                        •
                                                    </span>
                                                    <span>{ingredient}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Instructions:
                                    </h3>
                                    <ol className="space-y-1">
                                        {recipe.instructions.map(
                                            (instruction, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-gray-700 flex items-start"
                                                >
                                                    <span className="text-amber-600 mr-2 font-semibold">
                                                        {idx + 1}.
                                                    </span>
                                                    <span>{instruction}</span>
                                                </li>
                                            ),
                                        )}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
