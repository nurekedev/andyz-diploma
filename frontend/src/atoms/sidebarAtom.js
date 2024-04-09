import { atom } from "recoil";

// Атом для хранения состояния открытия сайдбара
export const isOpenState = atom({
    key: "isOpenState",
    default: localStorage.getItem("sidebarOpen") || null // Правильно использовать функцию для значения по умолчанию
});
