# Pages for UI

## Home Page
 - Navbar with Logo, links, login
   - Logo clickable, brings to home page
   - Links in unordered list
   - Register / Login brings to login page, turns into logout when logged in.
 - Displays a list of movies (popular, latest)
   - Will get movies from database or API, depending on if we want to store main page movies in database.
   - Search component which dynamically queries API
 - Click movie to go to movie page
   - Use title id as the query param and for API

 ## Movie Page
 - Lots of info about movie in unordered list.
   - Queried from API using title ID from param
   - Ideally have loading bar or something
 - Second section filled with reviews about movie
   - This will be obtained from database, query uses title ID in review table, ordered by recency
   - Perhaps have unique IDs corresponding to their review ID so that one can jump right to it
 - Click user name of reviewer to go to user page
   - Use username as link param, either query by username or user ID.

 ## User Page
 - Info about user
   - Info obtained from database, query reviews by username or user ID, order by recency
 - User's reviews listed in order of recency
 - Click review to go to movie page
   - Will jump right to the review in question by using #ELEMENT param at end of link with review ID
