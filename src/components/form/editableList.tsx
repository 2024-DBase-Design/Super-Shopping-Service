import { ClientEventEmitter } from "@/helpers/clientEventEmitter"
import { FormInput } from "./form";
import { EditIconComponent } from "../svgs/edit";
import { DeleteIconComponent } from "../svgs/delete";
import { useState } from "react";
import { PopUpComponent } from "../popUp/popUp";

export type EditableListItem = {
  displayName: string,
  editFormInputs: FormInput[]
}

export const EditableListComponent: React.FC<{
  list: EditableListItem[],
  name: string,
  eventEmitter: ClientEventEmitter
}> = ({ list, name, eventEmitter }) => {
  const [showPopup, setShowPopup] = useState(false);
  let currentAction: string = "nothing";

  eventEmitter.on("popUpClosed", ()=>{
    setShowPopup(false)
  })

  const EditItem = () => {
    currentAction = "Edit"
    setShowPopup(true)
    console.log(currentAction);
  }

  const DeleteItem = () => {
    currentAction = "Delete"
    //setShowPopup(true)
    console.log(currentAction);
  }

  const AddNew = () => {
    currentAction = "Add New"
    //setShowPopup(true)
    console.log(currentAction);
  }

  return(
      <div>
        {list.map((listItem) => (<div className="flex justify-end min-h-8 mb-2 items-center">
          <p className="flex-auto whitespace-pre">{listItem.displayName}</p>
          <div onClick={EditItem}>
            <EditIconComponent fillColor="#00acbb" className="ml-4"></EditIconComponent>
          </div>
          <div onClick={DeleteItem}>
            <DeleteIconComponent fillColor="#c76e77" className="ml-4"></DeleteIconComponent>
          </div>
          </div>))}
        <button onClick={AddNew} className="p-2 pl-4 pr-4 text-base mt-2">+ Add New {name}</button>
        <div>{ 
          showPopup && <PopUpComponent header={`${currentAction} ${name}`} content={undefined} buttons={["save"]} eventEmitter={eventEmitter}></PopUpComponent>  
        }</div>
      </div>
  )
}