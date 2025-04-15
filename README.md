# Bonus-Assignment-Master-Level-Web-Application
This application is a mock-up site for Pizza Palace. A restaurant where the user can order pizzas. The user can sign-up / log-in using local storage to store and validate the user's information.
If a user is logged in, pizza orders are stored and available to see in the History Tab
DEMO: https://jaysandjay.github.io/Bonus/index.html

# APIs
* Geolocation API - Shows the users location
* Open-Meteo - Shows the Weather based on the user's location
* Typed.js - Shows typing animation on home page
* Grid.js - An advanced Table plugin to display the orders
* Bootstrap - Used for common CSS

# Features
* Log-in / sign-up form
* Grid display for orders
* Tabs for pages
* Form to order pizzas
* Card display for menu items

# Challenges
I had challenges getting Grid.Js to repeatedly show, after trial and error and reading the docs, I found out that the API can not render
a grid inside a div that is not empty. I then worked around the problem to be able to render the grid more than once.

# Walk Through
The Home page shows the restaurant name and message using the typed API

![image](https://github.com/user-attachments/assets/51719b11-1a3c-470e-8f73-0b67427a587f)


The user is asked to share their location, if the user accepts, the location will show with the current weather

![image](https://github.com/user-attachments/assets/7a9755e6-5103-43a2-9735-42cf97afadc5)
![image](https://github.com/user-attachments/assets/bab26885-fb0d-407a-a169-38d054f3ea8a)


When signing in, the form will validate if the user exists with local storage. If they do not then the user will be promted "User not found"

![image](https://github.com/user-attachments/assets/7801bd20-a468-4730-be72-91e761f2297d)


When the user is signed in, the following message apears in the login tab with the option to sign out

![image](https://github.com/user-attachments/assets/189b489e-3ae2-413b-b550-b679bb05a1f7)


If the User is not logged in, the following appears on the History tab

![image](https://github.com/user-attachments/assets/63e1d3ff-2bef-4672-b17d-7d64ecd458c1)


If the user is logged in and they have past orders, buttons will appear with the date and id of the order

![image](https://github.com/user-attachments/assets/b5609baf-f6a5-4555-89d3-b1996bf277f2)


When the order buttons are clicked, The order will appear in a grid format using the grid API

![image](https://github.com/user-attachments/assets/da0fc6d4-4897-4da1-9d63-8d1445a37502)


On the order page, the user can insert the quantities wanted for each pizza and click the ADD button to create the order. The input values are saved until the order had been ordered with the order button.

![image](https://github.com/user-attachments/assets/8e9a54d4-1065-41e6-949c-f25549827c4a)


The order will apear in a grid format using the grid API

![image](https://github.com/user-attachments/assets/81c7065a-5f70-45e8-b803-375ef941c0af)


When ordered, the user is prompted with a message to show it has been successful

![image](https://github.com/user-attachments/assets/38de1108-b75a-4d80-b8ef-9e64485d07d0)


The menu page shows each pizza available with a discription and a button to bring them to the order page

![image](https://github.com/user-attachments/assets/d692eeb7-303a-4f37-97df-4672e0d04fcc)





