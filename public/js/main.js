console.log('hey from main.js');

$(function() {
  console.log( "ready!" );
  $.get('/api/elections/58b8ae2ff59ba1a10ddc2b64/58b8ae2ff59ba1a10ddc2b68', res => {
    console.log(res);
  })
});

