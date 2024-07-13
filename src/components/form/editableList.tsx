import { ClientEventEmitter } from "@/helpers/clientEventEmitter"
import { FormInput } from "./form";
import { EditIconComponent } from "../svgs/edit";
import { DeleteIconComponent } from "../svgs/delete";

export type EditableListItem = {
  displayName: string,
  editFormInputs: FormInput[]
}

export const EditableListComponent: React.FC<{
  list: EditableListItem[],
  eventEmitter: ClientEventEmitter
}> = ({ list, eventEmitter }) => {

    return(
        <div>
          {list.map((listItem) => (<div className="flex justify-end min-h-8 mb-2">
            <p className="flex-auto whitespace-pre">{listItem.displayName}</p>
            <EditIconComponent fillColor="#00acbb" className="ml-4"></EditIconComponent>
            <DeleteIconComponent fillColor="#c76e77" className="ml-4"></DeleteIconComponent>
          </div>))}
        </div>
    )
}