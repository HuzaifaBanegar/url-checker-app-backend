**URL-CHECKER APP** This is a small project created in duration of 1 day. The project was given by quickblicks.io in order to check my coding competency in 2nd round of interview.

For Frontend code you can check the rep: https://github.com/HuzaifaBanegar/url-checker-app-frontend.git

The project is created using Following Tech Stacks:

Client side ->React
Styling-> Tailwind, Material UI
Backend -> NodeJs, Express
Deployment -> Netlify for Frontend and Render for Backend

**The project consists of following feature**:
1.**URL Input Field**: The form should have an input field where the user can enter a URL. The field should include validation to ensure that the URL is in the correct format and that it is a valid URL. (We should have submit button as well)

2. **Three Options:** The form should have three options for the user to select from: A) Check for a 200 Status: This option should check whether the URL returns a 200 status code or not. If the URL returns a 200 status code, the user should receive a success message. If it does not return a 200 status code, the user should receive an error message. B) SSL Certificate Verification: This option should check whether the SSL certificate of the URL is valid or not. If the certificate is valid, the user should receive a success message. If it is not valid, the user should receive an error message. C)Content of Robert.txt: This option should check whether the content of robert.txt file exists or not on the server. If the file exists, the user should receive a success message. If it does not exist, the user should receive an error message.

3. Mobile-Friendly UI: The form should have a mobile-friendly UI with a responsive layout that adjusts to different screen sizes. The UI should be intuitive and easy to use.

4. Rate Limiter: The API should include a rate limiter that limits the user to three API calls per five minutes to prevent excessive use.

Simple Method of use:

NOTE: PLEASE INSTALL ALLOW CORS extension in your Chrome browser(preferable)
Go to the netlify link: https://url-checker-app.netlify.app
Try out the app. Please let me know if it can be improved in any ways :)


In this we will go through the backend part:
**NOTE: All the routes goes through a limiter that checks if the API has been called 3 times within 5 minutes or not. If it is it prompts an error**
The project then has 3 routes: 
1. '/status': It takes url as a query and  check wheteher the given url return status 200 or not
2. '/ssl': It takes url as a query and checks whtere the cerificate is valid for SSL or not
3. '/readFile: It does not take anything as query/params or body, it just returns whether the server has file named "Robert.txt" in it


