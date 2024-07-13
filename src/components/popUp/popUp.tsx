import { ClientEventEmitter } from "@/helpers/clientEventEmitter"
import { ReactNode } from "react"

export const PopUpComponent: React.FC<{
    header: string,
    content: ReactNode,
    buttons: string[],
    eventEmitter: ClientEventEmitter,
  }> = ({ header, content, buttons, eventEmitter }) => {
    
      return(
          <div>
            <div className="h-screen w-screen overflow-hidden fixed bg-black opacity-15 top-0 bottom-0"></div>
            <h1>{header}</h1>
          </div>
      )
  }