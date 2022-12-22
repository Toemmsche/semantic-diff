export const DBMS = {
    Umbra: "Umbra",
    Hyper: "Hyper",
    DuckDB: "DuckDB",
    PostgreSQL: "PostgreSQL"
} as const;

export type DBMS = keyof typeof DBMS