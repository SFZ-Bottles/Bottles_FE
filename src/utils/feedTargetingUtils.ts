import UserService from "./userService";

export const feedTargeting = (target: string | undefined): string => {
  if (target) {
    return target;
  } else {
    if (UserService.isSecretMode()) return "recommended";
    else return "follow";
  }
};
