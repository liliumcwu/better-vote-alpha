console.log('hey from ballot.js')

const candWrap = document.querySelector('.candidate-wrapper');

var dataAll;
var votes;
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
    let html = '<ul class="candidate-ul" id="simpleList"><h5 class="flow-text">Top Choice</h5>';
    for (let i = 0; i < votes.length; i++) {
      html += `<li class="flow-text candidate-li" data-id="${votes[i]}">${votes[i]}</li>`;
    }
    html += '<h5 class="flow-text">Bottom Choice</h5></ul>'
    console.log(html)
    candWrap.innerHTML = html;
    Sortable.create(simpleList, { /* options */ });
  })
});
