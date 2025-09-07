import { ChartList } from "@/widgets/chartsList";

import { ImportExportBtns } from "@/widgets/exporImportOscilogramData";

export const Oscillograms = () => {
    return (
        <div>
            <ImportExportBtns />
            <ChartList />
        </div>
    );
};
