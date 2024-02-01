import { useRef } from "react";
import styled from "styled-components";
import { FlexCenterCSS } from "../../style/commonStyle";

interface UploadProps {
  label: string;
  onChange: any;
  type: string;
  children?: React.ReactNode;
}

function UploadButton({ onChange, type, children }: UploadProps) {
  const ref: any = useRef(null);

  const onClick = () => {
    ref.current?.click();
    console.log("click!");
  };
  return (
    <S.Wrapeer onClick={onClick}>
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
      {children}
    </S.Wrapeer>
  );
}

const S = {
  Wrapeer: styled.div`
    ${FlexCenterCSS}
  `,
};

export default UploadButton;
