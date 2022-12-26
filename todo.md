# Changelog
## DuckDB
- does not output estimated cardinality?

new operators:
- COLUMN_DATA_SCAN -> for now classified as regualr table scan
- STREAMING_LIMIT -> for now classified as regular limit
- UNGROUPED_AGGREGATE -> appears to occur when only aggregates present in select -> aggregate with no group by

# TODO
- [x] use XML as transfer format
- [ ] check react-node-flow and other libs
  - [x] setup custom node and min example with react-node-flow
- [ ] maybe use additional layer for normalization and layouting (queryplandiff -> layout & normalize -> render)
- [x] add coordinate offset
- [x] pass metadata around, e.g. type, runtime and computed costs of a plan
- [ ] advanced layouting of second plan, maybe distnace from middle and max left max right
- [ ] find better integration of react flow into state management library

# Until next meeting
- delta tree or subflows or both
- collections of plans
- hash uses grammar properties
- match state
- double render with acutal heights and widths
- maybe remove <T> parameter where not needed

## Semantic-diff
- [x] Add generic Tree<T>
- Use generator instaed of preOrder
- remove cast hack

# Meeting notes 9.12
- hyper and umbra prebuilds
- focus on 
  - generate format (maybe substrait)
  - visualization using a new rendereer (maybe react-flow)
  - diffing with your algorithm
- diff can use tree graph for now
- remove unnecessary operators from duckdb
- parse cardinalities from postgres


# Meeting
- does total runtime include repeasts?
- good paper for umbra operator overview?

- use delta plans and collapse identical trees
- use collapsed subflows
- collections
- early execution: good when selectivity is high, can remove
- early probe: early probe of other hash table for elimination
- CTEs: find 
- inlinetable: constants
- multiway


