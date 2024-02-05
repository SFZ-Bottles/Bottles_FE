import * as S from "./Profile.styles";
import { StyleProps } from "./Profile.types";

export const Profile = ({ src, size = 15 }: StyleProps) => {
  return <S.UserProfile src={src} size={size} />;
};

export default Profile;
