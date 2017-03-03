console.log('hey from ballot.js')

const candWrap = document.querySelector('.candidate-wrapper'),
      candidateBtn = document.querySelector('.candidate-rank-btn'),
      $candidates = $('.candidate-ul'),
      $mainWrap = $('.main-wrap');

var dataAll;
var votes;
var rankedVotes = [];
var path = window.location.pathname.substring(9)

console.log(path)

//Refactor this
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
    console.log(dataAll.data.ballot.hasVoted);
    if (dataAll.data.ballot.hasVoted) {
      $mainWrap.html(`<h4 class="center-align flow-text">You have already voted.<br><br>Thank you for participating.</h4><h5 class="center-align flow-text">If you feel this is in error, please contact your administrator: ${dataAll.data.admin}.</h5>`);
      return false;
    }
    candWrap.innerHTML = html;
    Sortable.create(simpleList, {animation: 200 /* options */ });
    console.log(simpleList)
  })
});

function handleClickCandidate(evt) {
  rankedVotes = [];
  console.log(simpleList);
  var length = simpleList.children.length;
  for (let i = 0; i < length; i++) {
    rankedVotes.push(simpleList.children[i].dataset.id);
  }
  console.log(rankedVotes);
  $.post(`/ballots/${path}`, {rankedVotes}, res => {
    console.log(res);
    if (res.status === 200) {
      $mainWrap.html('<h4 class="center-align flow-text">Thank you for voting!</h4>')
    }
  })
}

candidateBtn.addEventListener('click', handleClickCandidate);
