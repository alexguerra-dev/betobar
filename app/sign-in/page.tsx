'use client'

import { useState } from 'react'
import { SignIn } from '@/types'

// In a real app, this would be stored in a database
const initialSignIns: SignIn[] = [
    {
        id: '1',
        guestName: 'John Doe',
        drinkName: 'Old Fashioned',
        rating: 5,
        comment: "Absolutely perfect! Best cocktail I've had in a while.",
        date: '2024-12-05T18:30:00Z',
    },
    {
        id: '2',
        guestName: 'Jane Smith',
        drinkName: 'Mojito',
        rating: 4,
        comment: 'Very refreshing, would definitely have again!',
        date: '2024-12-06T19:15:00Z',
    },
]

export default function SignInBookPage() {
    const [signIns, setSignIns] = useState<SignIn[]>(initialSignIns)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        guestName: '',
        drinkName: '',
        rating: 0 as 0 | 1 | 2 | 3 | 4 | 5,
        comment: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newSignIn: SignIn = {
            id: Date.now().toString(),
            ...formData,
            date: new Date().toISOString(),
        }

        setSignIns([newSignIn, ...signIns])
        setFormData({
            guestName: '',
            drinkName: '',
            rating: 0,
            comment: '',
        })
        setShowForm(false)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-2xl ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        )
    }

    const renderStarInput = () => {
        return (
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                rating: star as 0 | 1 | 2 | 3 | 4 | 5,
                            })
                        }
                        className={`text-4xl transition-colors ${
                            star <= formData.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        } hover:text-yellow-300`}
                    >
                        ★
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Guest Sign-In Book
                        </h1>
                        <p className="text-gray-600">
                            Share your cocktail experience
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                    >
                        {showForm ? 'Cancel' : '+ New Sign-In'}
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Sign In
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="guestName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="guestName"
                                    required
                                    value={formData.guestName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            guestName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="drinkName"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Drink You Had *
                                </label>
                                <input
                                    type="text"
                                    id="drinkName"
                                    required
                                    value={formData.drinkName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            drinkName: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Enter the drink name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating *
                                </label>
                                {renderStarInput()}
                            </div>

                            <div>
                                <label
                                    htmlFor="comment"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Comment *
                                </label>
                                <textarea
                                    id="comment"
                                    required
                                    value={formData.comment}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            comment: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Share your thoughts about the drink..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                            >
                                Submit Sign-In
                            </button>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Past Sign-Ins
                    </h2>
                    {signIns.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                            No sign-ins yet. Be the first to share your
                            experience!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {signIns.map((signIn) => (
                                <div
                                    key={signIn.id}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {signIn.guestName}
                                            </h3>
                                            <p className="text-amber-600 font-medium">
                                                {signIn.drinkName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {renderStars(signIn.rating)}
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(signIn.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">
                                        "{signIn.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
