import { useRef } from "react";
function UploadButton({ label, onChange }: any) {
  const ref: any = useRef(null);

  const onClick = () => {
    ref.current?.click();
    console.log("click!");
  };
  return (
    <div onClick={onClick}>
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
    </div>
  );
}

export default UploadButton;
