import {PlanData} from "./PlanData";
import RenderTableScan from "../components/nodes/RenderTableScan";

export class TableScan extends PlanData {

    public static LABEL = "TableScan";

    get tableName (): string {
        return this.attributes.get("table_name")!!;
    }

    component (): Function {
        return RenderTableScan;
    }
}