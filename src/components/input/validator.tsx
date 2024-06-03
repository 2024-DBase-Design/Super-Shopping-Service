import React from 'react';

export class ValidationRule {
    fieldName: string = "this field";
    private readonly validationTest: (value: any, fieldName: string) => string;

    constructor(validationTest: (value: any, fieldName: string) => string) {
        this.validationTest = validationTest;
    }

    public checkValue(value: any): string {
        return this.validationTest(value, this.fieldName);
    }
}

export const ErrorMessageComponent: React.FC<{ messages: string[], className?: string}> = ({ messages, className=""}) => {
    /*let combinedMessage: string = "";
    for(let i: number = 0; i < messages.length; i++){
        let currentMessage: string = messages[i];
        if(i === 0){
            let firstMessageButFirstCharUppercase = currentMessage[0].toUpperCase() + currentMessage.substring(2);
            combinedMessage += firstMessageButFirstCharUppercase;
        }
        else if(i === messages.length - 1){
            combinedMessage += ", and " + currentMessage;
        }
        else{
            combinedMessage += ", " + currentMessage;
        }
    }*/
    return (
        <><div className={`${className} error`}>
            {messages[0]}
        </div></>
    );
  };