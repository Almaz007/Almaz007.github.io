import { FaExchangeAlt, FaTerminal } from "react-icons/fa";

import { FaChartColumn } from "react-icons/fa6";
import { FiSliders } from "react-icons/fi";
import { LuBrainCircuit, LuTableProperties } from "react-icons/lu";
import { TRouteItem } from "../types";

export const routes: TRouteItem[] = [
    {
        id: 1,
        path: "terminal",
        text: "Терминал",
        icon: FaTerminal,
    },
    // {
    //     id: 2,
    //     path: "test",
    //     text: "Теcт",
    //     icon: FaRegLightbulb,
    // },
    {
        id: 3,
        path: "modemParametrs",
        text: "Параметры модема",
        icon: LuTableProperties,
    },
    {
        id: 23,
        path: "webSocketClient",
        text: "веб-сокеты",
        icon: LuTableProperties,
    },
    // {
    //     id: 4,
    //     path: "monitoring",
    //     text: "Мониторинг",
    //     icon: FiMonitor,
    // },

    // {
    //     id: 5,
    //     path: "maximeters",
    //     text: "Максиметры",
    //     icon: GiValve,
    // },
    // {
    //     id: 6,
    //     path: "eventLog",
    //     text: "Журнал событий",
    //     icon: FaBook,
    // },
    // {
    //     id: 7,
    //     path: "accidentLog",
    //     text: "Журнал аварий",
    //     icon: FaBookDead,
    // },
    {
        id: 8,
        path: "oscillograms",
        text: "Осциллограммы",
        icon: FaChartColumn,
    },
    {
        id: 19,
        path: "inputMatrix",
        text: "Матрица входных воздействий",
        icon: FiSliders,
    },
    {
        id: 9,
        path: "matrix",
        text: "Матрица выходных воздействий",
        icon: FiSliders,
    },

    {
        id: 10,
        path: "ustavki",
        text: "Уставки",
        icon: FaExchangeAlt,
    },
    {
        id: 11,
        path: "flexibleLogic",
        text: "Гибкая логика",
        icon: LuBrainCircuit,
    },
    {
        id: 12,
        path: "logicnAnalyzer",
        text: "Логический анализатор",
        icon: LuBrainCircuit,
    },
    // {
    //   id: 12,
    //   path: "settings",
    //   text: "Настройки",
    //   icon: IoMdSettings,
    //   links: [
    //     {
    //       id: 121,
    //       path: "settings/testing",
    //       text: "Тестирование",
    //     },
    //     {
    //       id: 122,
    //       path: "settings/generalSettings",
    //       text: "Общие настройки",
    //     },
    //     {
    //       id: 123,
    //       path: "settings/communicationSettings",
    //       text: "Настройки связи",
    //     },
    //   ],
    // },
    // {
    //   id: 13,
    //   path: "deviceInfo",
    //   text: "О устройстве",
    //   icon: MdPermDeviceInformation,
    // },
];
