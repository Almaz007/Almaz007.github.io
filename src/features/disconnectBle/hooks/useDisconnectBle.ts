import { useOscilogramStore } from "@/entities/oscilogram/indes";
import { useBleStore } from "@/shared/model";

export const useDisconnectBle = () => {
    const disconnectFromDevice = () => {
        const { addLog, device, boundHandleDisconnection } =
            useBleStore.getState();

        if (!device) return;

        device.removeEventListener(
            "gattserverdisconnected",
            boundHandleDisconnection
        );

        addLog(`Disconnecting from "${device.name}" bluetooth device...`);

        if (!device.gatt.connected) {
            addLog(`"${device.name}" bluetooth device is already disconnected`);
            return;
        }
        device.gatt.disconnect();

        addLog(`"${device.name}" bluetooth device disconnected`);
    };

    const disconnect = () => {
        const {
            characteristics: { chartCharacteristic, modemCharacteristic },
            handleModemParametrsChanged,
        } = useBleStore.getState();
        const { handleChartChanged } = useOscilogramStore.getState();

        disconnectFromDevice();

        if (modemCharacteristic) {
            modemCharacteristic.removeEventListener(
                "characteristicvaluechanged",
                handleModemParametrsChanged
            );
        }
        if (chartCharacteristic) {
            chartCharacteristic.removeEventListener(
                "characteristicvaluechanged",
                handleChartChanged
            );
        }

        useBleStore.setState({ device: null, characteristics: {} });
    };

    return { disconnect };
};
