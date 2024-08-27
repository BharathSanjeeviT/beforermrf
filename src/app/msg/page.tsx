"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/utils";
import { useSession } from "@/store";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/component/navbar";
import { MessageType } from "@/lib/types";

const Message = () => {
  const [load, setLoad] = useState(true);
  const [sending, setSend] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<Array<MessageType>>([]);
  const { token } = useSession();
  const sendMessage = async () => {
    try {
      setSend(true);
      const { data } = await axios.post(`${API_URL}/notification`, {
        token,
        value: message,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setSend(false);
			window.location.reload();
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notification`);
				setData(data.notifications);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    })();
  }, []);
  return (
    <>
      {load ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col w-full min-h-screen bg-background">
          <Navbar name="Message Dashboard" />
          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-bold">Send a Message</h2>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="h-24"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button onClick={sendMessage}>
                {sending ? "Sending..." : "Send"}
              </Button>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-bold">Sent Messages</h2>
              <div className="space-y-4">
                {data.map((msg, idx) => (
                  <div className="flex items-start gap-4" key={idx}>
                    <div className="rounded-lg w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center">
                      <WebcamIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <span className="my-1"> {msg.value} </span>
                      <div className="text-xs text-muted-foreground">
                        Sent by {msg.u_name} on {new Date(msg.time).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
export default Message;

function WebcamIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  );
}
