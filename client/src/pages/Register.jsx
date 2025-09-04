import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../lib/api'
import useAuth from '../store/auth'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await api.post('/api/auth/register', { name, email, password})
      setAuth(data)
      toast.success('Account created!')
      navigate('/chat')
    } catch (e) {
      console.log("Error: ", e)
      toast.error(e?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur rounded-2xl p-8 shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold mb-6">Create account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button disabled={loading} className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 transition font-semibold">
            {loading ? 'Loading...' : 'Create account'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">Have an account? <Link className="text-brand-500" to="/login">Login</Link></p>
      </div>
    </div>
  )
}
