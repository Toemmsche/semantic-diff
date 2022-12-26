import {PlanData} from "./PlanData";
import RenderTableScan from "../components/nodes/RenderTableScan";
import RenderTempScan from "../components/nodes/RenderTempScan";

export class TempScan extends PlanData {

    public static LABEL = "TempScan";

    get scannedId(): string {
        return this.attributes.get("scanned_id")!!;
    }
    component(): Function {
        return RenderTempScan;
    }
}