"use client"
import { Input } from "@/components/ui/input"
import { useState } from "react"
const Edit = () => {
  const [workers, setWorkers] = useState([
    "mason",
    "carpenter",
    "plumber",
    "electrician",
    "painter",
    "welder"
  ])
  const [newWorker, setNewWorker] = useState("")
  return (
    <>
      <div className="text-center min-h-screen bg-[#f3f4f6] py-5 px-5">
        <h2 className="text-center text-2xl font-semibold"> Edit Workers </h2>
        <div className="flex items-center justify-between p-4 rounded-lg mb-4">
          <div className="flex w-full justify-center items-center">
            <div className="text-center text-xl font-medium flex justify-center items-center">
              Create a new worker
            </div>
            <Input
              value={newWorker}
              onChange={(e) => setNewWorker(e.target.value)}
              className="mx-3 w-1/2"
            />
            <button
              onClick={() => {
                setWorkers([...workers, newWorker])
                setNewWorker("")
              }}
              className="bg-[#000] text-[#fff] p-3 rounded-lg"
            >
              Create
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
          {workers.map((user, idx) => (
            <button
              key={idx}
              className="bg-card p-4 rounded-lg hover:bg-card/80 transition-colors shadow-md hover:shadow-lg"
            >
              <div className="font-medium">
                {user}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
export default Edit;
