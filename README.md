# GRAPHQL

Objectives

The objective of this project is to learn the GraphQL query language, by creating your own profile page.

You'll use the GraphQL endpoint which is provided by the platform (https://((DOMAIN))/api/graphql-engine/v1/graphql). You'll be able to query your own data to populate your profile page.

So that you can access your data, you'll need to create a login page.

Your profile must display three pieces of information which you may choose. For example:

Basic user identification
XP amount
grades
audits
skills
Beside those sections it will have a mandatory section for the generation of statistic graphs.

Instructions
You will have to create a profile UI where you can see your own school information. This information/data is present on the GraphQL endpoint, where you will have to query it.

The UI design is up to you. However, it must have a statistic section where you can generate graphs to see more about your journey and achievements on the school. This graphs must be done using SVG. You need to do at least two different statistic graphs for the data given. Bare in mind the principles of a good UI.

Using SVG you can create several types of graphs including interactive graphs and animated graph. It will be up to you to decide what type of graphs you are going to do.

Here are some possible combinations for the creation of the graphs:

XP earned in a time period (progress over time)
XP earned by project
Audit ratio
Projects PASS and FAIL ratio
Piscine (JS/Go) stats
PASS and FAIL ratio
Attempts for each exercise
Any other information you desire to display is welcome and will be noted.

Login Page
You'll need a JWT to access the GraphQL API. A JWT can be obtained from the signin endpoint (https://((DOMAIN))/api/auth/signin).

You may make a POST request to the signin endpoint, and supply your credentials using Basic authentication, with base64 encoding.

Your login page must function with both:

username:password
email:password
If the credentials are invalid, an appropriate error message must be displayed.

You must provide a method to log out.

When making GraphQL queries, you'll supply the JWT using Bearer authentication. It will only allow access to the data belonging to the authenticated user.

You may inspect the JWT to discover the ID of the authenticated user.

Hosting
Besides the creation of your own profile you will have to host it. There are several places where you can host your profile,
for example: github-pages, netlify and so on. You are free to choose the hosting place.
