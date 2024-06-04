import { Dispatch, useState } from "react";

type UseState = {
    value: any,
    setValue: Dispatch<any>
}

export type NewValue = {
    name: string,
    defaultValue: any
}

export class FormValues{
    private valueDictionary: Map<string, UseState> = new Map<string, UseState>();

    constructor(values: NewValue[]){
        for(const value of values){
            this.addNewValue(value);
        }
    }

    addNewValue(newValue: NewValue){
        const [value, setValue] = useState(newValue.defaultValue);
        this.valueDictionary.set(newValue.name, {value, setValue});
    }

    updateValue(name: string, newValue: any){
        this.valueDictionary.get(name)?.setValue(newValue);
    }

    getValue(name: string){
        return this.valueDictionary.get(name)?.value;
    }
}