import * as S from "./SideBar.styles";
import { Props } from "./SideBar.types";

function SideBar({ children }: Props) {
  return (
    <>
      <S.Container>{children}</S.Container>;
    </>
  );
}

export default SideBar;
