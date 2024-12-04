"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "./ui/button";
import { Trash2Icon, Edit, Eye, EyeOff, ChevronDown } from "lucide-react";
import { cryptr } from "@/lib/encryptPass";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { del_pass } from "@/action/password-action";
import { EditModal } from "./edit-modal";
export interface LoadPasswordProps {
  id: string;
  username: string;
  userpassword: string;
  websitename: string;
  url: string;
}

export default function LoadPassword(props: LoadPasswordProps) {
  const [password, setPassword] = useState({ show: false, pass: "****" });
  const [plainpass,setPlainPass ] = useState("");
  const { toast } = useToast();

  const visiblePass = (userpassword: string) => {
    if(plainpass == ""){
      const pass = cryptr.decrypt(userpassword);
      setPlainPass(pass)
      if (!password.show) {
        setPassword({ show: true, pass: pass });
      } else {
        setPassword({ show: false, pass: "****" });
      }
    }

    else{
      if (!password.show) {
        setPassword({ show: true, pass: plainpass });
      } else {
        setPassword({ show: false, pass: "****" });
      }
    }


  };

  const deletePass = async (id: string) => {
    try {
      const res = await del_pass(id);
      if (res?.error) {

        toast({ title: res?.message, style: { color: "red" } });
      } else {
        toast({ title: res?.message, style: { color: "green" } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-4 px-5 ">
        <Collapsible.Root className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 text-[20px] ">
          <Collapsible.Trigger className="mb-2 w-full text-left hover:underline flex justify-between">
            {props.websitename} <ChevronDown/>
          </Collapsible.Trigger>
          <Collapsible.Content className="CollapsibleContent  ">
            <div className="space-y-0.5 rounded-lg border p-4 test-[16px]">
              <div className="text-[16px]">
                <span>User Name : </span> <span>{props.username}</span>
              </div>
              <div className="text-[16px]">
                <span>Website : </span> <span>{props.websitename}</span>
              </div>
              <div className="text-[16px]">
                <span>Password : </span> <span>{password.pass}</span>
                <Button
                  onClick={() => {
                    visiblePass(props.userpassword);
                  }}
                  variant="ghost"
                  className="m-1"
                >
                  {!password.show ? <Eye /> : <EyeOff />}
                </Button>
              </div>
              {props.url && (
                <div className="text-[16px]">
                  <span>URL : </span> <span>{props.url}</span>
                </div>
              )}
            </div>
            <div className="mt-3 flex w-full gap-2">
              <Button
                className="w-[50%] h-11"
                variant="destructive"
                onClick={() => deletePass(props.id)}
              >
                <Trash2Icon /> Delete
              </Button>
            <EditModal {...props} userpassword={plainpass==""?cryptr.decrypt(props.userpassword):plainpass}/>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </>
  );
}
