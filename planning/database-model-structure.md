### Database Models

##### Structure

Pros: 
- easy to understand, Admins create election
- structure is nested logically from top down
Cons: 
- allows for just one admin
- potentially poor design at scale, admin model could potentially hold inifinite elections

- Admin
  - Elections (embedded into admin model )
    - Voters (referenced into above)
      - Unique URLs (embedded into each voter)

Or

Pros: 
- each election can hold multiple admins for bigger elections
- better structure as there is no possibility of infinitely growing data structure

Cons:
- potentially harder to modularize
- potentially more difficult search queries

- Election
  - Admin/s (referenced into election model)
  - Voters (referenced into election model)
    - Unique URLs (embedded into each vote)


