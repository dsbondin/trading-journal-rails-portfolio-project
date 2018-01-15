$(document).ready(function() {

  $("a.trades").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(trades) {
      let tradesHTML = ""
      trades.forEach(function(trade) {
        tradesHTML += "<li>" + trade.direction + " " + trade.instrument.symbol + "</li>"
      })
      $("div#trades").html(tradesHTML)
    })

  })
})
