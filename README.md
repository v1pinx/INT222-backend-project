
# Shrinky
A simple URL shortener built using Node.js, EJS, and MongoDB.
## Features

-   Shorten long URLs into concise, shareable links
-   Redirect users to the original URL when they access the short link
-   Track the number of times each short link has been accessed

## Tech Stack

-   **Backend:** Node.js (Express.js)
-   **Frontend:** EJS (Embedded JavaScript Templates)
-   **Database:** MongoDB
    

## Usage
-   Enter a long URL in the input field on the homepage and generate a short link.
-   Use the short link to redirect to the original URL.
-   View access statistics for each shortened URL.

## Folder Structure

```
url-shortener/
│── controller/    
│── middleware/     
│── models/         
│── public/        
│── routes/        
│── service/       
│── views/          
│── .gitignore      
│── db.js          
│── index.js        
```

## License

This project is licensed under the MIT License.
