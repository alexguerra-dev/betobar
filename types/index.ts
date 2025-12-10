// Inventory Types
export type InventoryCategory = 'liquor' | 'mixer' | 'garnish' | 'bitters'

export interface InventoryItem {
    id: string
    name: string
    category: InventoryCategory
    quantity?: string
    description?: string
}

// Recipe Types
export interface Recipe {
    id: string
    name: string
    description: string
    ingredients: string[]
    instructions: string[]
    imageUrl?: string
    glassType?: string
}

// Sign-in Types
export interface SignIn {
    id: string
    guestName: string
    drinkName: string
    rating: 0 | 1 | 2 | 3 | 4 | 5
    comment: string
    date: string
}
