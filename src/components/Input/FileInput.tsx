import { ModalInput } from "../../style/styled_Modal";

function FileInput({ setText, children }: any) {
  return (
    <div>
      {children}
      <ModalInput onChange={(e: any) => setText(e.target.value)} />
    </div>
  );
}

export default FileInput;
