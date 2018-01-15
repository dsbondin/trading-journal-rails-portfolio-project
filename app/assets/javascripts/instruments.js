$(document).ready(function() {

  $("a.instruments").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(instruments) {
      // debugger
      let instrumentsHTML = ""
      instruments.forEach(function(instrument) {
        instrumentsHTML += "<li><a href='/instruments/" + instrument.id +"'>" + instrument.symbol + "</a></li>"
      })
      $("div#instruments ol").html(instrumentsHTML)
    })

  })
})
