"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Modal from "./modal-user"
import axios from "axios"
import { API_URL } from "@/lib/utils"
import { UserType } from "@/lib/types"
import { useRouter } from "next/navigation"
import Navbar from "./navbar"

export function UsersLists() {
  const [search, setSearch] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [load, setLoad] = useState(true)
  const [users, setUsers] = useState<Array<UserType>>([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/u`)
        setUsers(data.users)
      } catch (err) {
        console.log(err)
      } finally {
        setLoad(false)
      }
    })()
  }, [])

  const pushToUserId = (user: UserType) => {
    router.push(`users/${user.u_id}`)
  }

  const openTheModal = () => {
    setOpenModal(true)
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.u_name.toLowerCase().includes(search.toLowerCase()))
  }, [search, users])

  return (
    <>
			<Navbar name="Users" />
      {load ? <div className="flex items-center justify-center min-h-screen w-full">Loading...</div> :
        <div className="container mx-auto px-4 md:px-6 py-8">
          {openModal && <Modal setOpenModal={setOpenModal} />}
          <div className="mb-6 flex justify-between items-center">
            <Input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md"
            />
            <button className="bg-[#000] text-[#fff] p-3 rounded-lg"
              onClick={openTheModal}
            >
              Add New User
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user) => (
              <button
                key={user.u_id}
                onClick={() => pushToUserId(user)}
                className="bg-card p-4 rounded-lg hover:bg-card/80 transition-colors shadow-md hover:shadow-lg"
              >
                <div className="font-medium">
                  {user.u_name ? user.u_name : "New User"}
                </div>
              </button>
            ))}
          </div>
        </div>
      }
    </>
  )
}
