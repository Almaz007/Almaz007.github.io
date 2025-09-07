import { createWithEqualityFn } from "zustand/traditional";
import { TBleStore } from "../../types/terminal";
import { v4 as uuidv4 } from "uuid";

export const useBleStore = createWithEqualityFn<TBleStore>((set, get) => ({
    device: null,
    characteristics: {},
    logs: [],
    uuids: {
        serviceUuid1: "00000115-0000-1000-8000-00805f9b34fb", //"cd4f599f-9198-4f9a-974f-ed9eacee3996",
        sendCharacteristicUuid: "00000116-0000-1000-8000-00805f9b34fb", //"ddafdc80-2f61-4845-8b14-f6ed2c3617ce",
        chartCharacteristicUiid: "00000117-0000-1000-8000-00805f9b34fb", //"e1835cd1-9d87-4391-91a2-fbb26efd081c",

        pwa_config_service_UUID: "00000101-0000-1000-8000-00805f9b34fb", //"cd4f599f-9198-4f9a-974f-ed9eacee3996",
        pwa_config_service_rx_chararcteristic_UUID:
            "00000102-0000-1000-8000-00805f9b34fb",
        pwa_config_service_tx_chararcteristic_UUID:
            "00000103-0000-1000-8000-00805f9b34fb",

        oscill_service_UUID: "00000118-0000-1000-8000-00805f9b34fb", //"cd4f599f-9198-4f9a-974f-ed9eacee3996",
        oscill_service_rx_chararcteristic_UUID:
            "00000119-0000-1000-8000-00805f9b34fb",
        oscill_service_tx_chararcteristic_UUID:
            "00000120-0000-1000-8000-00805f9b34fb",

        //terminalCharacteristicUuid: //"e1835cd1-9d87-4391-91a2-fbb26efd081c",
        //chartCharacteristicUiid: "00000117-0000-1000-8000-00805f9b34fb",
        //modemCharacteristicUuid: "00000104-0000-1000-8000-00805f9b34fb", //"beaca6fd-61cd-439b-ba95-e57cebe10521",
    },
    modemParameters: {
        timestamp: 0,
        timestampSubSeconds: 0,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        is_valid: 0,
        fix: 0,
        gp_sats_in_use: 0,
        gl_sats_in_use: 0,
        bd_sats_in_use: 0,
        gp_sats_in_view: 0,
        gl_sats_in_view: 0,
        bd_sats_in_view: 0,
        ppsFlag: 0,
    },
    clearLogs() {
        set({ logs: [] });
    },
    connect: async () => {
        const {
            addLog,
            requestBluetoothDevice,
            connectDeviceAndCacheCharacteristic,
            startNotifications,
        } = get();

        try {
            await requestBluetoothDevice();
            await connectDeviceAndCacheCharacteristic();
            await startNotifications();
        } catch (err: any) {
            addLog(`Error: ${err?.message}`, "err");
        }
    },
    boundHandleDisconnection: () => {
        const { device, addLog } = get();
        addLog(`"${device.name}"  bluetooth device disconnected`);
    },
    addLog: (message, type = "") => {
        const { logs } = get();
        const newMessage = { id: uuidv4(), message, type };

        set({ logs: [...logs, newMessage] });
    },
    requestBluetoothDevice: async () => {
        const { addLog, boundHandleDisconnection, uuids } = get();
        addLog("Requesting bluetooth device...");

        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [
                uuids.oscill_service_UUID,
                uuids.pwa_config_service_UUID,
                uuids.serviceUuid1,
            ],
        });

        addLog(`${device.name} bluetooth device selected`);
        device.addEventListener(
            "gattserverdisconnected",
            boundHandleDisconnection
        );
        set({ device });
    },
    connectDeviceAndCacheCharacteristic: async () => {
        const { uuids, addLog, device } = get();

        addLog("Connecting to GATT server...");
        const server = await device.gatt.connect();

        addLog("GATT server connected, getting services...");

        const service1 = await server.getPrimaryService(uuids.serviceUuid1);
        const pwa_config_service = await server.getPrimaryService(
            uuids.pwa_config_service_UUID
        );
        const oscill_service = await server.getPrimaryService(
            uuids.oscill_service_UUID
        );

        addLog("Services founded, getting characteristics...");

        const pwa_config_service_rx_chararcteristic =
            await pwa_config_service.getCharacteristic(
                uuids.pwa_config_service_rx_chararcteristic_UUID
            );

        const pwa_config_service_tx_chararcteristic =
            await pwa_config_service.getCharacteristic(
                uuids.pwa_config_service_tx_chararcteristic_UUID
            );

        const chartCharacteristic = await service1.getCharacteristic(
            uuids.chartCharacteristicUiid
        );

        // const sendCharacteristic = await service1.getCharacteristic(
        //     uuids.sendCharacteristicUuid
        // );

        // const oscill_service_rx_chararcteristic =
        //     await oscill_service.getCharacteristic(
        //         uuids.oscill_service_rx_chararcteristic_UUID
        //     );

        const oscill_service_tx_chararcteristic =
            await oscill_service.getCharacteristic(
                uuids.oscill_service_tx_chararcteristic_UUID
            );

        // const modemCharacteristic = await service1.getCharacteristic(
        //     uuids.modemCharacteristicUuid
        // );

        addLog("Characteristics found");
        set({
            characteristics: {
                pwa_config_service_rx_chararcteristic,
                pwa_config_service_tx_chararcteristic,
                oscill_service_tx_chararcteristic,
                //modemCharacteristic,
                chartCharacteristic,
            },
        });
    },
    handleModemParametrsChanged: (event) => {
        const { addLog } = get();

        const uint8array = new Uint8Array(event.target.value.buffer);

        const view = new DataView(
            uint8array.buffer,
            uint8array.byteOffset,
            uint8array.byteLength
        );
        let offset = 0;

        const timestamp = view.getUint32(offset, true);
        offset += 4;
        let timestampSubSeconds = view.getUint32(offset, true);

        timestampSubSeconds = timestampSubSeconds / 169356432.0;

        offset += 4;

        const latitudeRaw = view.getInt32(offset, true);
        const latitude = latitudeRaw / 65536;
        offset += 4;

        const longitudeRaw = view.getInt32(offset, true);
        const longitude = longitudeRaw / 65536;
        offset += 4;

        const altitudeRaw = view.getInt32(offset, true);
        const altitude = altitudeRaw / 65536;
        offset += 4;

        const is_valid = view.getUint8(offset);
        offset += 1;
        const fix = view.getUint8(offset);
        offset += 1;
        const gp_sats_in_use = view.getUint8(offset);
        offset += 1;
        const gl_sats_in_use = view.getUint8(offset);
        offset += 1;
        const bd_sats_in_use = view.getUint8(offset);
        offset += 1;
        const gp_sats_in_view = view.getUint8(offset);
        offset += 1;
        const gl_sats_in_view = view.getUint8(offset);
        offset += 1;
        const bd_sats_in_view = view.getUint8(offset);
        offset += 1;
        const ppsFlag = view.getUint8(offset);
        offset += 1;

        set({
            modemParameters: {
                timestamp,
                timestampSubSeconds,
                latitude,
                longitude,
                altitude,
                is_valid,
                fix,
                gp_sats_in_use,
                gl_sats_in_use,
                bd_sats_in_use,
                gp_sats_in_view,
                gl_sats_in_view,
                bd_sats_in_view,
                ppsFlag,
            },
        });

        // set({ timerValue: formatTimestamp(+stringValue) });
        addLog("modem parametrs received", "in");
    },
    handleTerminalChanged: (event) => {
        const { addLog } = get();

        const stringValue = new TextDecoder().decode(event.target.value);
        addLog(stringValue, "in");
    },

    startNotifications: async () => {
        const {
            addLog,
            characteristics: { pwa_config_service_tx_chararcteristic },
        } = get();

        addLog("Starting notifications...");
        await pwa_config_service_tx_chararcteristic.startNotifications();
        //await oscill_service_tx_chararcteristic.startNotifications();

        // modemCharacteristic.addEventListener(
        //     "characteristicvaluechanged",
        //     handleModemParametrsChanged
        // );

        addLog("Notifications started");
    },
    send: async (text: string) => {
        const {
            characteristics: { sendCharacteristic },
            device,
            addLog,
        } = get();
        try {
            text = String(text || "");

            // Return rejected promise immediately if data is empty.
            if (!text) {
                throw new Error("нельзя отправить пустые данные");
            }

            if (!device || !sendCharacteristic) {
                throw new Error("необходимо подключиться к устройству");
            }

            await sendCharacteristic.writeValue(new TextEncoder().encode(text));

            addLog(text, "out");
        } catch (err: any) {
            addLog(`Error: ${err.message}`, "err");
        }
    },
    sendConfig: async (jsonStr: string) => {
        const {
            characteristics: { pwa_config_service_rx_chararcteristic },
            device,
            addLog,
        } = get();
        try {
            if (!jsonStr) {
                throw new Error("нельзя отправить пустые данные");
            }

            if (!device || !pwa_config_service_rx_chararcteristic) {
                throw new Error("необходимо подключиться к устройству");
            }

            await pwa_config_service_rx_chararcteristic.writeValue(
                new TextEncoder().encode(jsonStr)
            );

            addLog("конфигурация была отпралена", "out");
        } catch (err: any) {
            addLog(`Error: ${err.message}`, "err");
        }
    },
}));
