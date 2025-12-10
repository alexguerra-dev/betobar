'use client'

import { useState, useEffect } from 'react'
import { SignIn } from '@/types'

export default function SignInBookPage() {
    const [signIns, setSignIns] = useState<SignIn[]>([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        guestName: '',
        drinkName: '',
        rating: 0 as 0 | 1 | 2 | 3 | 4 | 5,
        comment: '',
    })

    // Fetch sign-ins on mount
    useEffect(() => {
        fetchSignIns()
    }, [])

    const fetchSignIns = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch('/api/sign-ins')
            if (!response.ok) throw new Error('Failed to fetch sign-ins')
            const data = await response.json()
            setSignIns(data)
        } catch (err) {
            setError('Failed to load sign-ins. Please try again.')
            console.error('Error fetching sign-ins:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setSubmitting(true)
            setError(null)

            const response = await fetch('/api/sign-ins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to submit sign-in')
            }

            const newSignIn = await response.json()
            setSignIns([newSignIn, ...signIns])
            setFormData({
                guestName: '',
                drinkName: '',
                rating: 0,
                comment: '',
            })
            setShowForm(false)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to submit sign-in',
            )
            console.error('Error submitting sign-in:', err)
        } finally {
            setSubmitting(false)
        }
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
                {error && (
                    <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

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
                        {showForm ? 'Cancel' : '+ Sign-In'}
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                                    placeholder="Share your thoughts about the drink..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {submitting
                                    ? 'Submitting...'
                                    : 'Submit Sign-In'}
                            </button>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Past Sign-Ins
                    </h2>
                    {loading ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                            Loading sign-ins...
                        </div>
                    ) : signIns.length === 0 ? (
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
