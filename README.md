# Better.vote :bulb: :earth_americas:
##### An Instant Runoff Voting Idea

## Contributors

- [Thomas Wu](https://www.linkedin.com/in/tom-wu) (Product)
- Andrew Maidah (Tech)

## Technology Used

#### Front End:

Angular1 | Materialize.css | HTML | CSS | Javascript | jQuery | Sortable

#### Back End:

Node.js | Express | MongoDB | Mongoose | HandlebarsJS

## Getting Started

1. Run `$ npm install` then `$ npm start`
2. Make sure `mongod` is running
3. Navigate to `http://localhost:1776` in a browser
4. Login, create election
5. Navigate to unique voter urls to place votes
6. Navigate back to admin panel to close election and find winner

### Planning

#### Wireframes:

![Layout](https://raw.githubusercontent.com/amaidah/better-vote-alpha/master/public/assets/layout-sketch.jpg)

#### User Stories & Pseudo Code:

[https://github.com/amaidah/better-vote-alpha/blob/master/planning/election-flow-pseudo-code.md](https://github.com/amaidah/better-vote-alpha/blob/master/planning/election-flow-pseudo-code.md)

#### Waffle.io Project Board

[https://waffle.io/amaidah/better-vote-alpha](https://waffle.io/amaidah/better-vote-alpha)

#### Other Planning:

[https://github.com/amaidah/better-vote-alpha/tree/master/planning](https://github.com/amaidah/better-vote-alpha/tree/master/planning)

## Next Steps

### Unsolved Issues

- Must go to profile page first so that Angular Factory pulls correct data
  - Therefore, cannot refresh on election page
- Recursive algorithm does not take into account ties or multiple attemps to find winner
  - Will fix in ReactJS implementation later

### Planned Features

- Refactor into ReactJS
- Implement email to voter feature
- Implement 4 digit unique voter password sent in email

## IRV Methodology

##### Basic Flowchart of IRV process

![IRV Flowchart](https://upload.wikimedia.org/wikipedia/commons/b/b9/IRV_counting_flowchart.svg)

Credit: [Wiki](https://en.wikipedia.org/wiki/Instant-runoff_voting#Process)

![Advanced IRV](https://raw.githubusercontent.com/amaidah/better-vote-alpha/master/public/assets/two-method-flow.png)

## Project Context

### The Motivation

- Partisan politics and ideologies threaten the American democratic process. Humans are naturally tribal, and the two-party system is further reinforced and exacerbated by what is effectively binary voting.
- Information-based approaches to addressing partisanship have been largely ineffective. A free press and fact-checking have done little to check a system that is easily manipulated by extremists.

### The Hypothesis

- With an instant-runoff voting system (https://en.wikipedia.org/wiki/Instant-runoff_voting), the two-party system can be weakened. Through such a system, voters will think less in binary terms, and fringe candidates can demonstrate incremental progress, both through polling (also instant-runoff  rather than binary) and through results
- Separately, with online voting, we can move closer towards accountability, greater efficiency/access, and perhaps to a purer form of democracy (frequent referendums and propositions become practical).
- Changes will have to be slow; Americans are unfamiliar with instant-runoff voting, and distrustful of online voting.

### The Idea

##### A tool to allow organizations of all kinds to run simple yet sophisticated, free, online elections/polls.

- Admin interface to:

  - Create elections (define voting method, options demographic indentifiers, candidates, and issues)
  - Manage voter pool (manual csv input, integration with external services, and potentially an internal voter registration/pool system)
  - Interact with voter pool (messaging throughout election to stimulate turnout)
  - Process results (including potential advanced analytics to provide public transparency, and to provide feedback to candidates)

- Voter interface to:

  - Register for an election
  - Vote in an election
  - Track results

### The Goal

- Introduce a stable interaction method, by which instant-runoff and online voting can be eased into the public mindset through incremental exposure.
- If Americans become accustomed to instant-runoff and online voting in more mundane life activities (internal company polls/referendums, student body elections, club elections, and local elections), they will be more receptive to instant-runoff and online voting on a national stage.
- Even before this hits the national stage, there will be benefits on the local stage (local governments can have more active constituent involvement, improve the viability of fringe candidates, and bridge partisan divides).
