import { atom } from "recoil";

interface ITemplate{
    id: string;
    url: string;
    text: string;
    file: any;
}

export const SignupState = atom({
    key: 'SignupState',
    default: {
        id: '',
        password: '',
        name: '',
        email: '',
        intro: ''
    }
});

export const signupPage = atom({
    key: 'signupPage',
    default: 1
});

export const templateState = atom<ITemplate[]>({
    key: 'templateState',
    default: []
});

