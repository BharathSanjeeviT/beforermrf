import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { useSession } from "@/store";

const Modal = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [radius, setRadius] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSession();

  const addSite = async () => {
    if (lat && lon && name) {
      try {
        setLoading(true);
        const { data } = await axios.post(`${API_URL}/site`, {
          radius,
          token,
          name,
          latitude: lat,
          longitude: lon,
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setOpenModal(false);
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000] bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#fff] p-8 rounded shadow-lg relative rounded-lg">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input
              id="site-name"
              placeholder="Site Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Site Location</Label>
            <div className="py-3 flex flex-col gap-5">
              <div className="flex justify-center items-center">
                <Label className="mx-2" htmlFor="lat">
                  Latitude
                </Label>
                <Input
                  id="lat"
                  placeholder="latitude"
                  required
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center">
                <Label className="mx-2" htmlFor="lon">
                  Longitute
                </Label>
                <Input
                  id="lon"
                  placeholder="longitude"
                  required
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center">
                <Label className="mx-2" htmlFor="lon">
                  Radius
                </Label>
                <Input
                  id="lon"
                  placeholder="radius"
                  required
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex">
          <Button disabled={loading} type="submit" onClick={addSite}>
            {loading ? "loading" : "Add Site"}
          </Button>
          <div className="mx-3">
            <Button
              variant="ghost"
              onClick={() => setOpenModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
