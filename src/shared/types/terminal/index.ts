// import {BluetoothRemoteGATTServer}

type TMessageType = "err" | "in" | "out" | "";

export type TLog = {
    id: string;
    message: string;
    type: TMessageType;
};
type TModemParameters = {
    timestamp: number;
    timestampSubSeconds: number;
    latitude: number;
    longitude: number;
    altitude: number;
    is_valid: number;
    fix: number;
    gp_sats_in_use: number;
    gl_sats_in_use: number;
    bd_sats_in_use: number;
    gp_sats_in_view: number;
    gl_sats_in_view: number;
    bd_sats_in_view: number;
    ppsFlag: number;
};

export interface TBleStore {
    device: any;
    characteristics: Record<string, any>;
    logs: TLog[];
    uuids: Record<string, string>;
    modemParameters: TModemParameters;
    clearLogs: () => void;
    addLog: (message: string, type?: TMessageType) => void;
    connect: () => Promise<undefined>;
    requestBluetoothDevice: () => Promise<undefined>;
    connectDeviceAndCacheCharacteristic: () => Promise<undefined>;
    startNotifications: () => Promise<undefined>;
    send: (text: string) => Promise<undefined>;
    sendConfig: (text: string) => Promise<undefined>;
    boundHandleDisconnection: () => void;
    handleModemParametrsChanged: (event: any) => void;
    handleTerminalChanged: (event: any) => void;
}
