export interface Props {
  value: string;
  width?: string;
  color?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
