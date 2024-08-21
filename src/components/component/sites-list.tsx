"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Modal from "./modal-site"
import { API_URL } from "@/lib/utils"
import axios from "axios"
import { SiteType } from "@/lib/types"

export function SitesList() {

  const [load, setLoad] = useState(true)
  const [sites, setSites] = useState<Array<SiteType>>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/site`)
        setSites(data.sites)
      } catch (err) {
        console.log(err)
      } finally {
        setLoad(false)
      }
    })()
  }, [])

  const [openModal, setOpenModal] = useState(false)
  const openTheModal = () => {
    setOpenModal(true)
  }
  const filteredSites = useMemo(() => {
    return sites.filter((site) => site.s_name.toLowerCase().includes(search.toLowerCase()))
  }, [search, sites])
  return (
    load ? <div className="flex items-center justify-center min-h-screen w-full"
    >Loading...</div> :
      <div className="container mx-auto px-4 md:px-6 py-8">
        {openModal && <Modal setOpenModal={setOpenModal} />}
        <div className="mb-6">
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
              Add New Site
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSites.map((site) => (
            <Link
              key={site.s_id}
              href="#"
              className="bg-card p-4 rounded-lg hover:bg-card/80 transition-colors shadow-md hover:shadow-lg"
              prefetch={false}
            >
              <div className="font-medium">{site.s_name}</div>
            </Link>
          ))}
        </div>
      </div>
  )
}

