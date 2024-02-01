import { CSSProp } from "styled-components";

export interface StylesProps {
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  $customStyle?: CSSProp;
}
