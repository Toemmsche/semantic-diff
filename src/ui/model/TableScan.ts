import {PlanData} from "./PlanData";

export class TableScan extends PlanData {

    public static LABEL = "TableScan";

    get tableName(): string {
        return this.attributes.get("table_name")!!;
    }
    componentName(): string {
        return "renderTableScan";
    }
}