# VodafoneE-Commerce

I wanted to note some of my implementations and faults.

1- I implemented the project to only translate everything that I wrote, and not translate any kind of data fetched from outside the project, that's why you may notice that the products and categories will still be in english.

2- In Edit/Add Product, I wanted the "Category" Form control to be a dropdown but for some reason angular material's and bootstrap's dropdowns were so buggy in my project that i had to remove them. So, at the end, it had to be a disabled text input form control to whatever category u came from. I should note that the button "Add Product" would only appear when u choose a category.

3- Since this project does not include a database, I tried my best to mimic a db's functions using product-service.ts. I mimicked a a local db that could lazy load any function or data along with the optimistic developing approach. Everything related to data would be depicted correctly as long as you don't refresh the page, doing so will reset everything including the user's authentication.

## Walkthrough of the project

1- There are 2 types of users, a user and an admin.

- The 2 accounts are: username: user, password: user AND username: admin, password: admin

2- User can only Sign In, View Categories, View Products, Change Pages' Language, and Log Out.
3- Admin can do everything the user can do, also admin can Add Product, Edit Product, and Delete Product.

4- I should note that in order to see the respective changes, you should not refresh the page and that since my "local db" only fetches products from the chosen category and not "all categories", any change will be seen only if U EXECUTE WHATEVER FUNCTION OF AN ADMIN ON A PRODUCT, THEN VIEW THAT SAME CATEGORY AGAIN RIGHT AFTER IT. Because, as mentioned, everytime i fetch products from a DIFFERENT category, it OVERWRITES all the changes to the previous chosen one.

### Correct Scenario

Step 1: Sign in as admin
Step 2: Choose a category (let's say electronics)
Step 3: Edit/Add/Delete a product
Step 4: Go back to categories screen either by pressing the browser's back button or pressing on the website's icon/title.
Step 5: Choose the same category(electronics) to view the changes

### Wrong Scenario

Step 5: Choose a different category, where that would lead to erasing all the updates to the "electronics" category and fetching a new category.
Step 6: Go back to "electronics", and see that all data has been reset.
