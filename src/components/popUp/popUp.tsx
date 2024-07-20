import { ClientEventEmitter } from "@/helpers/clientEventEmitter"
import { ReactNode } from "react"
import styles from "./popUp.module.scss"

export const PopUpComponent: React.FC<{
    header: string,
    content: ReactNode,
    buttons?: string[],
    eventEmitter: ClientEventEmitter,
  }> = ({ header, content, buttons = [], eventEmitter }) => {
    
      return(
          <div>
            <div className="h-screen w-screen overflow-hidden fixed bg-black opacity-15 top-0 left-0"></div>
            <div className="flex fixed justify-center items-center h-screen w-screen top-0 left-0">
              <div className={"bg-white rounded-lg fixed p-7 " + styles.popUpBody}>
                <h1 className={styles.stickyHeader}>{header}</h1>
                <button onClick={()=>eventEmitter.emit("popUpClosed")} className={"close-button " + styles.stickyX}></button>
                <br></br><br></br>
                {content}
                <div className={"flex justify-center " + (buttons?.length === 0 ? "" : "mt-5")}>
                  {buttons?.map((button) => (<button onClick={()=>eventEmitter.emit(button)}>{button}</button>))}
                </div>
              </div>
            </div>
          </div>
      )
  }