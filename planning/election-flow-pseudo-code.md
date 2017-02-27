### Election Flow Pseudo Code

##### As an election admin, I want to login and logout, so that my activities are unique to my identity.
- Admin logs in or creates account

##### As an election admin, I want to see details unique to my account, so that I can get stuff done.
##### As an election admin, I want to view details of an election, so I can do stuff to it.
- Is taken to profile page showing results of previous elections
  - Can click on running election to view current totals

##### As an election admin, I want to create a copy of a template (hardcoded) election, so that people can vote on some generic stuff.
- Option to create a new basic election 
  - Save election to database
- Form with email field and first name field
  - CSV parsing to come later
- Generate unique URLs for each user
  - Save and add each user to individual election database
  - www.better.vote/elections/:election1/:08749dg44
  - Only allow users to vote if <:08749dg44> exists as a valid voting point 
    - Look up <:election1> in database, get all individual url id's for matching
  - Integrate unique user passcodes later so folks cannot guess the valid voting urls

##### As a voter for a basic election, I want to view the voting page, so that I can see the super unique candidates.
##### [As a voter, I want to submit a vote in a basic election, so that my choice is heard.](https://waffle.io/amaidah/better-vote/cards/58b3c8808dd48b2e000fce61)
- Voters get link manually
  - Email integration later
- Voters navigate to <unique url>
  - Must show Welcome, <unique name>
  - Must show candidate set

##### [As an election admin, I want to close a basic election, so that decisions get made.](https://waffle.io/amaidah/better-vote/cards/58b3c88ebacffc15001f81e6)
- Admin navigates to election details page and clicks a close election button
  - Users navigating to their unique urls see an "election closed" message
    - Displays "You voted for <name>" or "You did not vote"

##### [As an election admin, I want to view results from an instant-runoff election, so that I can declare a winner.](https://waffle.io/amaidah/better-vote/cards/58b3c89baf847e2800245846)
- Separate button in election details page to calculate results using IRV algo


