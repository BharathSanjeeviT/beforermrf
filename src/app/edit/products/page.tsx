"use client";
import Navbar from "@/components/component/navbar";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/utils";
import { useSession } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
const Edit = () => {
  const [newproduct, setnewproduct] = useState("");
  const [newproductimage, setnewproductimage] = useState("");
  const [load, setLoad] = useState(true);
  const [sload, setsload] = useState(false);
  const [products, setProducts] = useState<
    Array<{ item: string; url: string }>
  >([]);
  const { token } = useSession();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/inventory`);
        console.log(data);
        setProducts(data.items);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);
  const addNewProduct = async () => {
    try {
      if (newproduct === "" || newproductimage === "") {
        alert("Please fill all fields");
        return;
      }
      setsload(true);
      const { data } = await axios.post(`${API_URL}/inventory/item`, {
        product: newproduct,
        url: newproductimage,
        token,
      });
      console.log(data);
      setProducts([...products, { item: newproduct, url: newproductimage }]);
    } catch (err) {
      alert("The product already exists");
      console.log(err);
    } finally {
      setsload(false);
    }
  };
  return (
    <>
			<Navbar name="Edit Inventory" />
      {load ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          Loading...
        </div>
      ) : (
        <div className="text-center min-h-screen bg-[#fff] py-5 px-5">
          <h2 className="text-center text-2xl font-semibold">
            {" "}
            Edit Inventory{" "}
          </h2>
          <div className="flex items-center justify-between p-4 rounded-lg mb-4">
            <div className="flex w-full justify-center items-center">
              <div className="text-center font-medium flex justify-center items-center flex-col w-full gap-2">
                <div className="flex">
                  <div className="flex w-full justify-center items-center">
                    <div className="my-1">New product name</div>
                    <Input
                      value={newproduct}
                      onChange={(e) => setnewproduct(e.target.value)}
                      className="mx-3 p-4"
                    />
                  </div>

                  <div className="flex w-full items-center justify-center">
                    <div className="my-1">New product image url</div>
                    <Input
                      value={newproductimage}
                      onChange={(e) => setnewproductimage(e.target.value)}
                      className="mx-3 p-4"
                    />
                  </div>
                </div>
                <button
                  onClick={addNewProduct}
                  className="bg-[#000] text-[#fff] p-3 rounded-lg"
                  disabled={sload}
                >
                  {sload ? "Loading..." : "Create"}
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
            {products.map((pro, idx) => (
              <div className="rounded-lg border bg-card p-4" key={idx}>
                {pro.item}
                <img
                  src={pro.url}
                  alt="Photo 1"
                  width="300"
                  height="200"
                  className="w-full object-cover rounded-lg mt-2"
                  style={{ aspectRatio: "300/200", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Edit;
