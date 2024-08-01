'use client';

import { ClientEventEmitter } from '@/helpers/clientEventEmitter';
import FormComponent, { FormInput } from './form';
import { EditIconComponent } from '../svgs/edit';
import { DeleteIconComponent } from '../svgs/delete';
import { useState } from 'react';
import { PopUpComponent } from '../popUp/popUp';

export type EditableListItem = {
  displayName: string;
  id: number;
  editFormInputs: FormInput[];
  customHeader?: string;
  customContent?: JSX.Element;
  customIcon?: JSX.Element;
};

export type ButtonOptions = {
  edit: boolean;
  delete: boolean;
  addNew: boolean;
  custom: boolean;
};

export const EditableListComponent: React.FC<{
  list: EditableListItem[];
  name: string;
  eventEmitter: ClientEventEmitter;
  buttonOptions?: ButtonOptions;
  showText?: boolean;
  addNewFormInputs?: FormInput[];
}> = ({
  list,
  name,
  eventEmitter,
  buttonOptions = {
    edit: true,
    delete: true,
    addNew: true,
    custom: false
  },
  showText = true,
  addNewFormInputs = list.length > 0
    ? list[0].editFormInputs.map((i) => {
        const newInput = JSON.parse(JSON.stringify(i));
        newInput.defaultValue = null;
        return newInput;
      })
    : []
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [content, setContent] = useState(<div>loading...</div>);
  const [buttons, setButtons] = useState(['']);
  const [currentAction, setCurrentAction] = useState(name);
  let i = 0;

  eventEmitter.on('popUpClosed', () => {
    setShowPopup(false);
  });

  const EditItem = (item: EditableListItem) => {
    setCurrentAction('Edit ' + name);
    setContent(
      <FormComponent
        id={item.id}
        inputs={item.editFormInputs}
        submitName="Save"
        submitAction={(formData) => eventEmitter.emit('edit', [formData, item.id])}
      ></FormComponent>
    );
    setButtons([]);
    setShowPopup(true);
  };

  const DeleteItem = (item: EditableListItem) => {
    setCurrentAction('Delete ' + name);
    setContent(
      <div>
        <div>
          You are about to delete the following:<br></br>
          {item.displayName}
        </div>
        <div className={'flex justify-center ' + (buttons?.length === 0 ? '' : 'mt-5')}>
          <button className="mt-5" onClick={() => eventEmitter.emit('delete', item.id)}>
            Confirm
          </button>
        </div>
      </div>
    );
    setButtons([]);
    setShowPopup(true);
  };

  const CustomContent = (item: EditableListItem) => {
    setCurrentAction(item.customHeader ?? 'NO_CUSTOM_HEADER');
    setContent(item.customContent ?? <div></div>);
    setButtons([]);
    setShowPopup(true);
  };

  const AddNew = () => {
    setCurrentAction('Add New');
    setContent(
      <FormComponent
        inputs={addNewFormInputs}
        submitName="Create"
        submitAction={(formData) => eventEmitter.emit('addNew', formData)}
      ></FormComponent>
    );
    setButtons([]);
    setShowPopup(true);
  };

  return (
    <div>
      {list.map((listItem) => (
        <div className="flex justify-end min-h-8 mb-2 items-center" key={i++}>
          {showText && <p className="flex-auto whitespace-pre">{listItem.displayName}</p>}
          {buttonOptions.edit && (
            <button onClick={() => EditItem(listItem)} className="bg-none p-0">
              <EditIconComponent fillColor="#00acbb" className="ml-4"></EditIconComponent>
            </button>
          )}
          {buttonOptions.delete && (
            <button onClick={() => DeleteItem(listItem)} className="bg-none p-0">
              <DeleteIconComponent fillColor="#c76e77" className="ml-4"></DeleteIconComponent>
            </button>
          )}
          {buttonOptions.custom && (
            <button onClick={() => CustomContent(listItem)} className="bg-none p-0">
              {listItem.customIcon ?? (
                <EditIconComponent fillColor="#00acbb" className="ml-4"></EditIconComponent>
              )}
            </button>
          )}
        </div>
      ))}
      {buttonOptions.addNew && (
        <button onClick={AddNew} className="p-2 pl-4 pr-4 text-base mt-2">
          + Add New {name}
        </button>
      )}
      <div>
        {showPopup && (
          <PopUpComponent
            header={currentAction}
            content={content}
            buttons={buttons}
            eventEmitter={eventEmitter}
          ></PopUpComponent>
        )}
      </div>
    </div>
  );
};
