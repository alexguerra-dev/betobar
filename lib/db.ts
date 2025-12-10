import { sql } from '@vercel/postgres'

export async function createTables() {
    try {
        // Create sign_ins table
        await sql`
      CREATE TABLE IF NOT EXISTS sign_ins (
        id SERIAL PRIMARY KEY,
        guest_name VARCHAR(255) NOT NULL,
        drink_name VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

        console.log('Tables created successfully')
    } catch (error) {
        console.error('Error creating tables:', error)
        throw error
    }
}

export { sql }
