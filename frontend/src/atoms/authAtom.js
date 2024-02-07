import {atom} from 'recoil'

const authAtom = atom({
    key: 'authAtom',
    default: "login",
});

export default authAtom;