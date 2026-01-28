import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { userStoreState } from "@/store/userStore";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddWork() {
  const [inputValue, setInputValue] = useState("");
  const [id, setid] = useState(0);
  const addWork = userStoreState((s) => s.addWork);
  const error = userStoreState((s) => s.error);
  const removeWork = userStoreState((s) => s.removeWork);
  const updateWork = userStoreState((s) => s.updateWork);

  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = id + 1;
    setid(newId);
    addWork({ id: newId, name: inputValue, checked: false });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="text-center justify-center">
        {error && (
          <div className="text-red-500 w-full h-10 border border-red-500 rounded-2xl p-2">
            {"An error occurred while adding work,min 1 char"}
          </div>
        )}
        <form className="flex flex-row gap-4 m-9">
          <Input
            className="w-100"
            placeholder="add work"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button onClick={handleAddWork}>Add Work</Button>
        </form>
        <div className="flex flex-col gap-2 border border-black p-5 rounded">
          <div className="text-3xl font-bold">List</div><hr className="border-black"/>
          {userStoreState((s) => s.works).map((work) => (
            <div className="flex flex-row gap-5" key={work.id}>
              <Checkbox className="justify-center mt-3" onCheckedChange={() => updateWork(work.id, {...work, checked: !work.checked? true : false})} />

              <div className="border w-full border-gray-200 p-2 rounded">
                {work.name} 
              </div>
              <Button className="w-fit h-fit" onClick={() => removeWork(work.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
