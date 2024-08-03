# EX1 - React

1. Create 2 components in the same page App.tx
2. `<WhatsYourName />` - will present your name
3. `<HowDoILookLike/>` - will show an image from web

# EX2 -

1. split your components to DIFF files under components folder
2. each component will have her own folder + tsx file.

# EX3 -

1. Add iD + type to each joke in the UI

# Homework 3.7

- following our React Lesson, Create a `CountriesPage` Component
- the page will show a list of all countries - image+country name
- use import static json file with the data ( copy paste the data into `countries.json` file)
- create a `SingleCountryCard` which recieve the relevant props and present the data

# Ex 1 - 7.6

- Move all inline CSS from react-103/my-first-react-client/src/components/jokes/single-joke.tsx to
  `singleJoke.module.css` file

# Ex 2 - 7.6

- Setting the color of the h1 in the main page, to be part of the style

# Ex 3 - 7.6

- Implement "You Like This" functionality in Single Joke Component, in case the user clicks the button "Like" he will see the Text "You Like This", in case the user will click again text will be hidden - toggle!

# Ex 4 - 7.6

- Single joke component - Dont show the punch line! if the user click on button "Show my punchline"
- so show the user the punch line, and hide the button, default punch like is hidden

# Ex 5 - 7.6

- implement another filter `<button>Show Only long punchline (more than 10 characters) </button>`
- when clicking on the button the list will present only the jokes with long punchline












# Homework

## based on In the countries solution - continue to last homework

1. implement search filter by country name
2. implement visit button in each country - when clicking on the `visit` the AddComment component will presented
3. implement country AddComment functionality by adding a comment to each country
4. implement filter - filter all the countries that are more than 10M population count.



# Ex - 1 10.7 
1. implement API request using useEffect hook for countries api
# Ex - 2 10.7 
2. searching country by name- implement API request on each input text change, using useEffect dependency array


# Homework 10.7
1. Go over the last lesson and learn what we did deeply!
2. Read about useEffect cleanup in google, try to understand when we need to use it. https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
3. read about react router dom  https://reactrouter.com/en/main



# Ex - 1 14.7
- support Delete movie from favorite!

# Ex - 2 14.7
- Add new Route to your application
- Route name will be - Products
- Add navigation from all routes to Products and from products to the rest of the routes

# Homework - 14.7 
1. Refactor the Movies Application (my-first-react-client) to work with Routing.
2. Pages: MoviesPage, CountriesPage, use the main navigation for routing - Links ( combine between homework and class project) 


3. try to create MoviePage - SINGLE MOVIE PAGE, when clicking on the "Go to Movie page" on each card the application will navigate to new page with the movie Id and request - hint: the movie id should be in the query param `/movie/id1234`



# Ex1 - Routing 17.7
1. Implement A routing to Single movie page By Title
2. you will need to implement `getMovieByTitle`
3. use the routing `/movie/title/:movieTitle`
4. create new component `MovieTitleResult`



# Homework 17.7
- Add a new feature to our application
1. Statistics Page - show HARDCODED movies data `[{movieName: "scream" , numberOfLikes: 50},
{movieName: "scream2" , numberOfLikes: 30},{movieName: "scream3" , numberOfLikes: 30}
]` on chart
2. use https://mui.com/x/react-charts/     
3. read about context Api - useContext (https://react.dev/reference/react/createContext)





# Ex - 1 21.7
1. Create Settings Component Page 
2. Add a feature to support toggle between local time and utc 
localtime = toLocaleString() utc- toISOString()
3. use the following UI : https://mui.com/material-ui/react-switch/
4. use Context API




# Homework 21.7 
in the following homework use - useContext .
1. Support in the setting changing the Application theme - light / dart
2. dark mode - card - black, text - white, light mode - current.
3. Show statistics page based on favorites - Movie/Series in pie chart
4. try to save the favorites in Local storage


# Homework 28.7
1. Create New Button in the movies page - called, "Save All Movies"
2. the button will add all the movies to a new context key - called historySearch.
3. create new Chart in the statistics page - History Search
4. the chart will be a bar chart that shows aggregation of your movies number per years 
for example {2022: 10, 2020: 1, 2024: 40, 1999: 5}
5. add DDL - drop down list to filter the chart result by "Type" 
6. Create "Clear History" Button that will clean your search history 
7. support Local storage
8. support useMemo in the aggregation calculation from 4.




# EX 1 - 31.7 
1. support theme action in our reducer
2. theme controlled in setting page, and reflected on home page.




# Homework
1. Support useReducer & useContext in the following Task
2. Audit page
3. audit page will show what the user did in his application
For example
- User Added <MovieName> to favorite <Time>
- User Removed <MovieName> from favorite <Time>
- User search for <MovieName> <Time>
- User Saved to history <X> movies <Time>

Real Example:
- User Added 'Bad Boys' to favorite '7/31/2024, 8:41:07 PM'
- User Saved to history 20 movies '7/31/2024, 8:50:07 PM'

4. present all the list of operations in a new Page called Audit page.
5. add simple text filter by movie name on the audit operations
6. support chart size settings