import UserService from "./userService";

export const modeNavigation = (path: string) => {
  if (UserService.isSecretMode()) {
    const pathArray = path.split("/");

    return [...pathArray.slice(0, 2), "annonymous", ...pathArray.slice(2)].join(
      "/"
    );
  } else return path;
};

export const pageLocation = (path: string, page: string) => {
  const pathArray = path.split("/");
  return pathArray.includes(page);
};
