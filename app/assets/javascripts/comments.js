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
    let commentsHTML = "<p><b>Comments</b></p>"
    comments.forEach(function(comment) {
      commentsHTML += "<p>" + comment.trader.email + "<br>" + comment.body + "</p>";
      $("#comments").html(commentsHTML);
    })
  } else {
    $("#comments").text("No comments yet");
  }
  $("button#show-comments").hide();
  $("button#add-comment").show();
}
