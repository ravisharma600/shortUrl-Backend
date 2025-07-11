URL Shortener Backend

A simple Node.js + Express + MongoDB-based backend to shorten URLs, track clicks, and support automatic expiry.  
Includes features like rate limiting, validation, and TTL cleanup of expired documents.

Features

- Shortens valid URLs using `nanoid`
- Prevents duplicate shortened URLs
- Click tracking (`clicks`)
- Expiry time for each short URL
- MongoDB TTL index to auto-delete expired links
- Rate limiting to prevent abuse
- Input validation for both URLs and expiry dates

Setup:
  Install dependencies
    npm install
  
  Create .env file in backend/ directory
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/your-db-name
    BASE_URL=http://localhost:3000
  
  Start the server
    node app.js

  Output on console/Terminal:
    Mongodb connected localhost
    Server is running at port 3000
    
API Endpoints:

POST /shorten 

  Creates a new short URL.
  Request:
  {
    "url": "https://example.com",
    "expireAt": "2025-07-15T14:30:00.000Z"  // optional
  }
  If expireAt is not provided, a default expiry of 24 hours is applied.
  Duplicate full URLs return the existing short URL with 409.

  Response:
  "http://localhost:3000/O70KTcP"
  
GET /:code

  Redirects the user to the full URL if valid and not expired.
  Example:
    GET http://localhost:3000/O70KTcP
    Increments the clicks count.
  Returns 404 Not Found if code is invalid or expired.

Postman Collection:

  For POST /shorten
  
    body - raw
    contentType-JSON
    Example:
    {
      "url":"https://google.com",
      "expireAt":"2025-07-11T15:06:00.000Z"
    }
  For GET/:code
  
    url - http://localhost:3000/<code>
    Example:
       http://localhost:3000/TpmkfgV
   


Author Ravi Sharma
ravibasotra2@gmail.com
