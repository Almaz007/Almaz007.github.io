import { lazy } from "react";

const FlexibleLogic = lazy(() => import("@/pages/flexibleLogic"));
const Matrix = lazy(() => import("@/pages/matrix"));
const InputMatrixPage = lazy(() => import("@/pages/inputMatrixPage"));
const ModemParametrs = lazy(() => import("@/pages/modemParametrs"));
const Oscillograms = lazy(() => import("@/pages/oscillograms"));
const Terminal = lazy(() => import("@/pages/terminalPage"));
const Setpoints = lazy(() => import("@/pages/setpoints"));
const WelcomePage = lazy(() => import("@/pages/welcome"));
const WebSocketClient = lazy(() => import("@/pages/webSocketTest"));
const LogicnAnalyzer = lazy(() => import("@/pages/logicAnalyzer"));

export const pages = {
    welcome: WelcomePage,
    terminal: Terminal,
    modemParametrs: ModemParametrs,
    webSocketClient: WebSocketClient,
    flexibleLogic: FlexibleLogic,
    oscillograms: Oscillograms,
    matrix: Matrix,
    inputMatrix: InputMatrixPage,
    ustavki: Setpoints,
    logicnAnalyzer: LogicnAnalyzer,
};
