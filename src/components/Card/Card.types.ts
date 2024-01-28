import { ReactNode } from "react";

export interface IUserCardProps {
  children?: ReactNode;
  onClick?: () => void;
}
export interface ImageProps {
  url: string;
  size?: number;
}
