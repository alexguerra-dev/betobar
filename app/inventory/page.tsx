import { inventory } from '@/data/inventory'
import { InventoryCategory } from '@/types'

export default function InventoryPage() {
    const categories: { key: InventoryCategory; label: string }[] = [
        { key: 'liquor', label: 'Liquors' },
        { key: 'mixer', label: 'Mixers' },
        { key: 'garnish', label: 'Garnishes' },
        { key: 'bitters', label: 'Bitters' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Bar Inventory
                </h1>
                <p className="text-gray-600 mb-8">
                    Everything we have available
                </p>

                <div className="space-y-8">
                    {categories.map(({ key, label }) => {
                        const items = inventory.filter(
                            (item) => item.category === key,
                        )

                        return (
                            <div
                                key={key}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                    {label}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {item.name}
                                            </h3>
                                            {item.quantity && (
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                            )}
                                            {item.description && (
                                                <p className="text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
