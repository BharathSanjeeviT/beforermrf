import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useSession } from "@/store";
import { DropDown } from "./persona-drop";
import _default from "react-datepicker/dist/popper_component";

const Modal = ({
  setOpenModal,
  uid,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  uid: string;
}) => {
  const [load, setLoad] = useState(false);
  const { token } = useSession();
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const addUser = async () => {
    try {
      setLoad(true);
			const body = {
        u_id: uid,
        r_name: selectedOption,
        token,
			}
			console.log(body)
      await axios.put(`${API_URL}/u/role`, body);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-[#fff] p-8 rounded shadow-lg relative rounded-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <div>
              <DropDown
                selectedOption={selectedOption}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex">
          <Button type="submit" onClick={addUser} disabled={load}>
            {load ? "Loading..." : "Submit"}
          </Button>
          <div className="mx-3">
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
