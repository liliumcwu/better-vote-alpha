### REST API Design

#### Resource

###### Admin

GET /elections
GET /elections/<:election1>

###### Voter

GET /elections/<:election1>/<:unique>

##### Unique URL Problem

1st parameter <:election1> will route to catch all


