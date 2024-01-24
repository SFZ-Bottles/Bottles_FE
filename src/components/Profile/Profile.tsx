import * as S from "./Profile.styles";
import { StyleProps } from "./Profile.types";

export const Profile = ({ src, width = 15, height = 15 }: StyleProps) => {
  return <S.UserProfile src={src} width={width} height={height} />;
};

export default Profile;
