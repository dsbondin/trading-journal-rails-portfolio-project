$(document).ready(function() {
  loadTrades();
  loadInstruments();
  nextTrade();
  loadComments();
})

const loadTrades = function() {
  $("a.trades").click(function(e) {
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
  $("a.instruments").click(function(e) {
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
  $("a.trade_id").click(function(e) {
    let $nextId = parseInt($(this).attr("trade-id")) + 1;
    $.getJSON("/trades/" + $nextId).done(function(json) {
      // console.log(trade)
      if (!json.error) {
        // renderTrade(trade);
        let trade = new Trade(json);
        let tradeHTML = trade.renderTrade();
        $("#trade-container").html(tradeHTML);
        $(".trade_id").attr("trade-id", trade.id);
        $(".hide-when-no-trade").show();
        $("#comments").html("")
        $("button#show-comments").show()
      } else {
        renderEmptyTrade(json);
      }
    })
  })
}

class Trade {
  constructor(json) {
    this.id = json.id;
    this.direction = json.direction;
    this.date = json.created_at.slice(0, 10);
    this.entry = json.entry;
    this.exit = json.exit;
    this.size = json.quantity;
    this.notes = json.notes;
    this.instrument = json.instrument.symbol;
    this.trader = json.trader.email;
  }
    renderTrade() {
      return Trade.template(this)
    }
}

$(function() {
  Trade.source = $("#trade-template").html();
  Trade.template = Handlebars.compile(Trade.source);
})

const renderEmptyTrade = function(json) {
  $("#trade-container").html("<p>" + json.error + "<p>");
  $(".hide-when-no-trade").hide();
  $(".trade_id").attr("trade-id", json.id);
}

const loadComments = function() {
  $("button#show-comments").click(function() {
    let trade_id = $(this).attr("trade-id")
    $.getJSON("/trades/" + trade_id + "/comments").done(function(comments) {
      renderComments(comments);
    })
  })
}

const renderComments = function(comments) {
  if (comments.length > 0) {
    let commentsHTML = ""
    comments.forEach(function(comment) {
      commentsHTML += "<p>" + comment.trader.email + "<br>" + comment.body + "</p>";
      $("#comments").html(commentsHTML);
    })
  } else {
    $("#comments").text("No comments yet");
  }
  $("button#show-comments").hide();
}
