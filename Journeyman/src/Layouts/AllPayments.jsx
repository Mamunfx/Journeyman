import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { FaCreditCard, FaCoins } from 'react-icons/fa'

export default function AllPayments() {
  const { user } = useContext(AuthContext)
  const [payments, setPayments] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!user?.email) {
      setError('You must be logged in to view your purchases.')
      setLoading(false)
      return
    }
    fetch(`http://localhost:3000/payments/user/${user.email}`)
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).message || 'Failed to load')
        return res.json()
      })
      .then(data => setPayments(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading your purchases…</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }
  if (payments.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No purchase history found.</p>
      </div>
    )
  }

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-[#66b3b3]">
        Your Purchase History
      </h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {payments.map((p, i) => (
          <div
            key={i}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {/* Header Accent */}
            <div
              className="h-2 bg-gradient-to-r from-[#66b3b3] to-teal-400"
            />
            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FaCoins className="text-[#66b3b3] text-2xl" />
                <div>
                  <p className="text-2xl font-bold text-[#065555]">
                    {p.coins} Coins
                  </p>
                  <p className="text-gray-500 text-sm">
                    Purchased on{' '}
                    {new Date(p.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-400 text-xl" />
                <p className="text-gray-700">
                  Paid <span className="font-semibold">${p.amount}</span> via{' '}
                  <span className="capitalize">{p.method}</span>
                </p>
              </div>
              {p.payment_info && (
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                  <p>Name: {p.payment_info.cardName}</p>
                  <p>Card: •••• {p.payment_info.cardNumber.slice(-4)}</p>
                  <p>Expiry: {p.payment_info.expiry}</p>
                </div>
              )}
            </div>
            {/* Footer Tag */}
            <div className="px-6 py-3 bg-gray-50 text-right">
              <span className="inline-block bg-[rgb(102,179,179)] text-white text-xs font-medium px-2 py-1 rounded-full">
                #{p._id.slice(-6)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}