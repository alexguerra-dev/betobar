import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const { rows } = await sql`
      SELECT 
        id,
        guest_name as "guestName",
        drink_name as "drinkName",
        rating,
        comment,
        created_at as date
      FROM sign_ins 
      ORDER BY created_at DESC
    `

        return NextResponse.json(rows)
    } catch (error) {
        console.error('Error fetching sign-ins:', error)
        return NextResponse.json(
            { error: 'Failed to fetch sign-ins' },
            { status: 500 },
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { guestName, drinkName, rating, comment } = body

        // Validation
        if (!guestName || !drinkName || rating === undefined || !comment) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            )
        }

        if (rating < 0 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 0 and 5' },
                { status: 400 },
            )
        }

        const { rows } = await sql`
      INSERT INTO sign_ins (guest_name, drink_name, rating, comment)
      VALUES (${guestName}, ${drinkName}, ${rating}, ${comment})
      RETURNING 
        id,
        guest_name as "guestName",
        drink_name as "drinkName",
        rating,
        comment,
        created_at as date
    `

        return NextResponse.json(rows[0], { status: 201 })
    } catch (error) {
        console.error('Error creating sign-in:', error)
        return NextResponse.json(
            { error: 'Failed to create sign-in' },
            { status: 500 },
        )
    }
}
