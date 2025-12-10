// Run this script to initialize the database tables
// Usage: tsx scripts/init-db.ts

import { config } from 'dotenv'
import { createClient } from '@vercel/postgres'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

async function main() {
    console.log('Initializing database...')

    const connectionString =
        process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL

    if (!connectionString || connectionString === '{your_connection_string}') {
        console.error('❌ Error: POSTGRES_URL is not set or is a placeholder.')
        console.error(
            'Please add your actual Vercel Postgres connection string to .env.local',
        )
        process.exit(1)
    }

    console.log('Connecting to database...')

    // Use POSTGRES_URL_NON_POOLING for direct connections in scripts
    const client = createClient({
        connectionString,
    })

    await client.connect()

    try {
        // Create sign_ins table
        await client.sql`
      CREATE TABLE IF NOT EXISTS sign_ins (
        id SERIAL PRIMARY KEY,
        guest_name VARCHAR(255) NOT NULL,
        drink_name VARCHAR(255) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
        comment TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

        console.log('✅ Database initialized successfully!')
        console.log('Table "sign_ins" created.')
    } catch (error) {
        console.error('❌ Failed to initialize database:', error)
        throw error
    } finally {
        await client.end()
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Fatal error:', error)
        process.exit(1)
    })
