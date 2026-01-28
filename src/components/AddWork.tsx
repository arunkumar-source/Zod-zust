import { userStore } from "../store/userStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { useState } from "react";

export default function AddWork() {
  const addWork = userStore((state) => state.addWork)
  const error=userStore((s)=>s.error)
  const [title, SetTitle] = useState("")
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [discription, setDiscription] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWork({
      title, status, discription
    })
    SetTitle("");
    setStatus("todo");
    setDiscription("")
  

  };

  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center">
      {error? <p className="text-destructive border border-red-600 rounded-2xl p-3 text-2xl">Please fill all fields</p>:null}
      <form onSubmit={handleSubmit} className="w-[20rem]">
        <FieldGroup>
          <Field>
            <FieldLabel>Title:</FieldLabel>
            <Input value={title} onChange={(e)=>SetTitle(e.target.value)} type="text" />
          </Field>
          <Field>
            <FieldLabel>Status:</FieldLabel>
            <NativeSelect value={status} onChange={(e)=>setStatus(e.target.value as 
              "todo"|"in-progress"|"done"
            )}>
              <NativeSelectOption value={"todo"} >Todo</NativeSelectOption>
              <NativeSelectOption value={"in-progress"}>In-progress</NativeSelectOption>
              <NativeSelectOption value={"done"}>Done</NativeSelectOption>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>Description:</FieldLabel>
            <Input value={discription} onChange={(e)=>setDiscription(e.target.value)} type="text" />
          </Field>
          <Field>
            <Button type="submit" className="">Add Work</Button>
          </Field>
        </FieldGroup>
      </form>
    </div >
  );
}
