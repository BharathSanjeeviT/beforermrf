"use client"

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { API_URL } from '@/lib/utils'
import { useSession } from '@/store'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useSession()
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/u/admin`, {
        uname: username,
        pass: password
      })
      signIn(data.token)
    } catch (err: any) {
			console.log(err)
      alert("wrong password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-background px-4 md:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={submitForm}
        >
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              className='my-2'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className='my-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {<span> {loading ? 'Loading...' : 'Login'} </span>}
          </Button>
        </form>
      </div>
    </div>
  )
}
