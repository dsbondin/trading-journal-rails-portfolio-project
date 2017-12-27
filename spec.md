# Specifications for the Rails Assessment

Specs:
- [x] Using Ruby on Rails for the project

- [x] Include at least one has_many relationship (x has_many y e.g. User has_many Recipes)
// Trader has_many :trades, Instrument has_many :trades

- [x] Include at least one belongs_to relationship (x belongs_to y e.g. Post belongs_to User)
// Trade belongs_to :trader, belongs_to :instrument

- [x] Include at least one has_many through relationship (x has_many y through z e.g. Recipe has_many Items through Ingredients)
// Trader has_many :instruments, Instrument has_many :traders

- [x] The "through" part of the has_many through includes at least one user submittable attribute (attribute_name e.g. ingredients.quantity)
// instrument.symbol submitted through new trade form

- [x] Include reasonable validations for simple model objects (list of model objects with validations e.g. User, Recipe, Ingredient, Item)

- [x] Include a class level ActiveRecord scope method (model object & class method name and URL to see the working feature e.g. User.most_recipes URL: /users/most_recipes)
// '/trades/best', '/trades/worst'

- [x] Include a nested form writing to an associated model using a custom attribute writer (form URL, model name e.g. /recipe/new, Item)
// '/traders/1/trades/new', creates a new instance of the Instrument model

- [x] Include signup (how e.g. Devise)
// Devise
- [x] Include login (how e.g. Devise)
// Devise
- [x] Include logout (how e.g. Devise)
// Devise
- [x] Include third party signup/login (how e.g. Devise/OmniAuth)
// Omniauth through Devise (facebook, github)
- [x] Include nested resource show or index (URL e.g. users/2/recipes)
// traders/1/trades
- [x] Include nested resource "new" form (URL e.g. recipes/1/ingredients)
// traders/2/trades/new
- [x] Include form display of validation errors (form URL e.g. /recipes/new)
// trades/new

Confirm:
- [x] The application is pretty DRY
- [x] Limited logic in controllers
- [x] Views use helper methods if appropriate
- [x] Views use partials if appropriate
