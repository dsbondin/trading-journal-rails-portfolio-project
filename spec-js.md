# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.
trades#show is rendered on a single page with the ability to scroll through each individual trade
- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.
traders/:id/trades, traders/:id/instruments and trades/:id/comments are rendered with jQuery and AMS
- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.
trade has many comments which are rendered via JSON
- [x] Use your Rails API and a form to create a resource and render the response without a page refresh.
trade/:id/comments/new -> trade/:id/comments/create are rendered on a single page
- [x] Translate JSON responses into js model objects.
I'm using two classes: Trade and Comment to instantiate returned JSON and render instance attributes into HTML.
- [x] At least one of the js model objects must have at least one method added by your code to the prototype.
Trade class has renderTrade(), get PNL() and profitLoss() prototype methods, Comment class is using a renderComment() prototype method.

Confirm
- [x] You have a large number of small Git commits
around 30 for this assessment
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message

All JS is in these two files:

app/assets/javascripts/trading_journal.js
app/assets/javascripts/comments.js
