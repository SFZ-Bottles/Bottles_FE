import {
  PageContainer,
  ProfileList,
  ProfileItem
} from "../styled-components/styled_Setting";

const PersonalInformation = () => {
  return (
    <PageContainer>
      <ProfileList>
        <ProfileItem>Profile Image</ProfileItem>
        <ProfileItem>ID</ProfileItem>
        <ProfileItem>Password</ProfileItem>
        <ProfileItem>E-mail</ProfileItem>
        <ProfileItem>Name</ProfileItem>
        <ProfileItem>Info</ProfileItem>
      </ProfileList>
    </PageContainer>
  );
}

export default PersonalInformation;