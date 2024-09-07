'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { signIn, signUp } from '../utils/auth'

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await signUp(email, password)
        alert('Sign up successful! Please sign in.')
        setIsSignUp(false)
      } else {
        await signIn(email, password)
        router.push('/videos')
      }
    } catch (error) {
      console.error('Authentication error:', error)
      alert('Authentication failed. Please try again.')
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <p className="mt-4">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500">
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </Layout>
  )
}