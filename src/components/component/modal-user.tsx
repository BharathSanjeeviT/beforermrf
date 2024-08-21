import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { API_URL } from "@/lib/utils"
import { useSession } from "@/store"

const Modal = (
  { setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }
) => {

  const [load, setLoad] = useState(false)
  const [mobile, setMobile] = useState("")
  const { token } = useSession()

  const addUser = async () => {
    try {
      setLoad(true)
      const { data } = await axios.post(`${API_URL}/u`, {
        token,
        mobile
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    } finally {
      setLoad(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#fff] p-8 rounded shadow-lg relative rounded-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <div>
              <Label htmlFor="site-name">User Phone</Label>
              <Input id="site-name" className="my-1" placeholder="User Phone" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="mt-5 flex">
          <Button type="submit"
            onClick={addUser}
            disabled={load}
          >Add User</Button>
          <div className="mx-3">
            <Button
              variant="ghost"
              onClick={() => setOpenModal(false)}
            >Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal; 
