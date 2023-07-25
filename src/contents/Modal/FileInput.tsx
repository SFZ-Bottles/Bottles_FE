import { useRef } from "react";
import { ModalInput } from "../../styled-components/styled_Modal";

function FileInput({setText,children}: any){

    return(
        <div>
            {children}
            <ModalInput onChange={(e: any) => setText(e.target.value)}/>
        </div>
    )
}

export default FileInput;