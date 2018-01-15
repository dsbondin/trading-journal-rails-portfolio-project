$(document).ready(function() {
  loadTrades();
  loadInstruments();
  nextTrade();
})

const loadTrades = function() {
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
}

const loadInstruments = function() {
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
}

const nextTrade = function() {
  $("a.next_trade").click(function(e){
    e.preventDefault();
    $.getJSON(this.href).success(function(trade) {
      console.log(trade)
      const source = $("trade_template").innerHTML;
      const template = Handlebars.compile(source);
      const html = template(trade)
    })
  })
}
