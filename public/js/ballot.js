console.log('hey from ballot.js')

const candWrap = document.querySelector('.candidate-wrapper'),
      candidateBtn = document.querySelector('.candidate-rank-btn'),
      $candidates = $('.candidate-ul');

var dataAll;
var votes;
var rankedVotes = [];
var path = window.location.pathname.substring(9)

console.log(path)

$(function() {
  console.log( "ready!" );
  $.get(`/api/elections/${path}`, res => {
    console.log(res);
  })
  .then( data => {
    console.log('hi')
    dataAll = data;
  })
  .then( () => {
    console.log(dataAll.data.ballot.votes)
    votes = dataAll.data.ballot.votes;
  })
  .then( () => {
    let html = '<h5 class="flow-text">Top Choice</h5><ul class="candidate-ul" id="simpleList">';
    for (let i = 0; i < votes.length; i++) {
      html += `<li class="flow-text candidate-li" data-id="${votes[i]}">${votes[i]}</li>`;
    }
    html += '</ul><h5 class="flow-text">Bottom Choice</h5>'
    console.log(html)
    candWrap.innerHTML = html;
    Sortable.create(simpleList, {animation: 200 /* options */ });
    console.log(simpleList)
  })
});

function handleClickCandidate(evt) {
  rankedVotes = [];
  console.log('clicked');
  // var order = simpleList.toArray();
  console.log(simpleList);
  // console.log($candidates);
  // console.log(simpleList.children.length)
  var length = simpleList.children.length;
  // console.log(simpleList.children[0].textContent)
  // console.log(simpleList.children[0].dataset.id)
  for (let i = 0; i < length; i++) {
    // console.log(simpleList.children[i].dataset.id);
    rankedVotes.push(simpleList.children[i].dataset.id);
  }
  console.log(rankedVotes);
}

candidateBtn.addEventListener('click', handleClickCandidate);
