import { useRef } from "react";
import { CustomButton } from "../../styled-components/styled_Modal";

function UploadButton({label, onChange}: any){
    const ref: any = useRef(null);
    
    const onClick = () => {
        ref.current?.click();
        console.log("click!");
    };
    return(
        <CustomButton onClick={onClick}>
        {label}
        <input
        hidden
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        name="image-input"
        onChange={onChange}
        ref={ref}
        multiple
    />
    </CustomButton>
    )
}

export default UploadButton;