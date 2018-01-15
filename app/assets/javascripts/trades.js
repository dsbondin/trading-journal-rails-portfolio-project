$(document).ready(function() {

  $("a.trades").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(trades) {
      // debugger
      let tradesHTML = ""
      trades.forEach(function(trade) {
        tradesHTML += "<li><a href='/trades/" + trade.id +"'>" + trade.direction + " " + trade.instrument.symbol + "</a></li>"
      })
      $("div#trades ol").html(tradesHTML)
    })

  })
})
