{ admin: 
   { _id: '58b754355ae3a8549f64cf87',
     googleId: '111893810053247884920',
     displayName: 'Andrew Maidah',
     email: 'a.maidah@gmail.com',
     __v: 0 },
  electionTitle: 'My Test Election',
  candidates: [ 'Andrew', 'Tom' ],
  voters: 
   [ { fName: 'Elle', email: 'elle@elle.com' },
     { fName: 'Suzy', email: 'suzy@suzy.com' } ] }


const election1 = new Election({
  electionTitle: 'Test Election',
  admin: [admin1],
  ballots: [],
  candidates: ['A', 'B', 'C']
});

election1.ballots.push({
  voter: [voter1],
  votes: ['A', 'B', 'C']
})

mongoose.Types.ObjectId(id)

election1.save( err => {
  if (!err) {
    Election.find({})
    .populate('admin')
    .populate('ballots.voter')
    .exec( (err, elections) => {
      console.log(JSON.stringify(elections, null, 2));
    })
  }
})
