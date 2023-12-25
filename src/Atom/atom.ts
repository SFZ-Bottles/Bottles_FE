import { atom } from "recoil";
import UserService from "../utils/userService";

interface ITemplate {
  data: string;
  species: string; // required
  order: number; // required
  content: any;
}

interface IAlbum {
  is_private: boolean;
  num: number;
  user_id: string;
  title: string;
  preface: string;
  data: {
    pages: ITemplate[];
  };
}

export const SignupState = atom({
  key: "SignupState",
  default: {
    id: "",
    pw: "",
    name: "",
    email: "",
    info: "",
  },
});

export const signupPage = atom<number>({
  key: "signupPage",
  default: 1,
});

export const templateState = atom<ITemplate[]>({
  key: "templateState",
  default: [],
});

export const albumState = atom<IAlbum>({
  key: "albumState",
  default: {
    is_private: false,
    num: 0,
    user_id: "",
    title: "",
    preface: "",
    data: {
      pages: [],
    },
  },
});

export const contentState = atom<any>({
  key: "contentState",
  default: [],
});

export const themeState = atom<boolean>({
  key: "themeState",
  default: UserService.isSecretMode(),
});
