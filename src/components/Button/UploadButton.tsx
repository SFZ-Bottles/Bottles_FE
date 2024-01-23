import { useRef } from "react";
import CustomButton from "./CustomButton";

interface UploadProps {
  label: string;
  onChange: any;
  type: string;
}

function UploadButton({ onChange, type }: UploadProps) {
  const ref: any = useRef(null);

  const onClick = () => {
    ref.current?.click();
    console.log("click!");
  };
  return (
    <div onClick={onClick}>
      <input
        hidden
        type="file"
        accept={
          type !== "video"
            ? "image/jpg,image/png,image/jpeg,image/svg"
            : "video/mp4"
        }
        name="image-input"
        style={{ display: "none" }}
        onChange={onChange}
        ref={ref}
        multiple
      />
      <CustomButton name="Edit" />
    </div>
  );
}

export default UploadButton;
