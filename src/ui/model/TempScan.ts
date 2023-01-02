import {PlanData} from "./PlanData";
import RenderPlanNode from "../components/nodes/RenderPlanNode";

export class TempScan extends PlanData {

    public static LABEL = "TempScan";

    get scannedId (): string {
        return this.attributes.get("scanned_id")!!;
    }

    component (): Function {
        return RenderPlanNode;
    }
}