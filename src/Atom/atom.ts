import { atom } from "recoil";

interface ITemplate{
    id: string;
    url: string;
    text: string;
    file: any;
    species: string;
    order: number;
}

interface IAlbum{
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

export const albumState = atom<IAlbum>({
    key: 'albumState',
    default: {
        is_private: false,
        num: 0,
        user_id: '',
        title: '',
        preface: '',
        data: {
            pages: []
        }
    }
})

