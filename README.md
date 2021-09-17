# b2b_portal

This is the readme for the B2B Portal app that I have created for GA:SEIF 6 Project 2.

The purpose of this app is to allow a hypothetical spare parts supplier Bukit Timah Auto & Cycle Supplies Pte Ltd be able to easily and quickly sell products to their business customers such as workshops and service centres that specialize in repairing motor vehicles and bikes.

This will allow each sales person to be more efficient with his or her time, prospecting for new business instead of logging down routine sales from regular customers, thus enabling the business to scale up quickly.

The deployed and live app may be found on Heroku here:

https://ga-b2b-portal.herokuapp.com/

    				------------------------------------------

Structure and function

The B2B Portal is a CRUD (create, read, update, delete) app that uses the MVC (Model View Controller) structure and 7 RESTful routes - Getx4, Post, Put & Delete. All data is stored in MongoDB. The planning can be found here:

https://miro.com/app/board/o9J_l1NQXLE=/

The app initially starts with a 'home' page that contains links to a contact page, and also invites the user to log in or sign up. Any other pages besides the home and contact page are inaccessible by non-registered viwers or non-users. Should a non-user attempt to type in even the correct URL to access products, he or she will be blocked and shown an error message.

Upon logging in, a registered user is able to browse all the products on offer and make their purchase. They can view all the necessary information of each product ie: photos, technical information, price, stock, etc.

For now, any viewer may sign up as a user for the sake of demonstrating the signup function of the app. In reality, most sales people will be the one creating the account on behalf of the customer and passing them the credentials.

Staff may also log in as an admin, and they are granted extra privileges to add and delete products, as well as edit existing product information.

These privileged pages or routes, are protected from unauthorized access. Eg: Even if an unauthorized user ie: a csustomer typed in the correct URL to edit, add or delete a product, he or she would be blocked and shown an error message.

Upon the successful execution of signing up, logging in, creating a new product, editing a product, deleting a product and performing an unauthorized route access - an appropriate alert message is shown.

    				------------------------------------------

CRUD & RESTful routes

There exists 7 different types of routes:
/homepage, /contact (GET): Displays all the products, Gets and displays the 'contact us' details
/products/add (GET): Shows a form to create new products
/products(POST): Adds new product to the database
/products/:id (GET): Shows the info of one selected product
/products/:id/edit (GET): Shows a form to edit a product
/products/:id (PUT): Updates one product with information from the edit form
/products/:id (DELETE): Deletes one selected product

    				------------------------------------------

Partials

Partial HTMLs were used to eliminate the need to repeat HTML code for sections of the View pages that were repeated such as the header (which contains the navigation elements) and footer. All the alert messages were also put in one partial html file and called upon using 'if' statements and query parameters passed into the route URL.

    				------------------------------------------

Password encryption

Bcrypt was used to encrypt and salt user-entered passwords when they sign up for the first time. This increases the level of security for all users even in a worst case scenario where the website is hacked and user data is stolen.

    				------------------------------------------

User authentication

Express-session was used to detect when a particular user was logged in, or in session. This session information was stored in a .env file on the server side and referred to with an alias in the server.js file to ensure security. This enabled a middleware code to be written to protect certain routes from unauthorized users.

    				------------------------------------------

Route protection middleware

A middleware code was written as a separate JS file/function and imported and required/inserted as a parameter on certain routes that required user authentication.

---

Google maps

A Google maps iframe was inserted in the contact us page to allow users to navigate to the business's physical address
