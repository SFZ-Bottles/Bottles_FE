import { atom } from "recoil";

export const SignupState = atom({
    key: 'SignupState',
    default: {
        id: '',
        password: '',
        name: '',
        email: '',
        intro: ''
    }
})

export const signupPage = atom({
    key: 'signupPage',
    default: 1
})