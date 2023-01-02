# Changelog
## DuckDB
- does not output estimated cardinality?

new operators:
- COLUMN_DATA_SCAN -> for now classified as regualr table scan
- STREAMING_LIMIT -> for now classified as regular limit
- UNGROUPED_AGGREGATE -> appears to occur when only aggregates present in select -> aggregate with no group by

# TODO
- [x] use XML as transfer format
- [x] check react-node-flow and other libs
  - [x] setup custom node and min example with react-node-flow
- [x] maybe use additional layer for normalization and layouting (queryplandiff -> layout & normalize -> render)
- [x] add coordinate offset
- [x] pass metadata around, e.g. type, runtime and computed costs of a plan
- [ ] advanced layouting of second plan, maybe distnace from middle and max left max right
- [ ] find better integration of react flow into state management library
- [X] double render with acutal heights and widths
- [x] use query plan results 
- [DONE] result collections
  - [DONE] add picker for selection
  - move picker
- [IP] use delta plans and collapse identical trees
  - add option to only collpase identical subtrees or all
- nicer names for DBMS
- convert plans to generic format
  - remove projections from Duckdb
  - 
- runtime in duckdb
- [DONE] switching between unified and match -> separate componenets for the views
- compute custom types via lambda
- [DONE] extract node layouter sub component
- use constant node id
- move to d3-hierarchy
- fix broken matchings on identical trees
- enhance grammar
- use collapse expand example from website
  - or implement custom hide (display: none/visibility: 0) on custom edges and nodes
- [IP] use material ui and style nodes
- add details to nodes, highlight updates/moves
- early execution: good when selectivity is high, can remove
- early probe: early probe of other hash table for elimination
- how to deal with tempscan?
- CTEs: find
- cannot unexpand
- inlinetable: constants
- multiway
- remove unnecessary operators from duckdb
- parse cardinalities from postgres
- hash uses grammar properties
- match state
- maybe remove <T> parameter where not needed
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


# must do until meeting
- two way diff view with match higlighting
- bencharmk result details in comparison view
- some details on the nodes






