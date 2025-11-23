## API OVERVIEW
MoviesDatabase API provides comprehensive data on over 9 million titles (movies, series, episodes) and 11 million actors/crew members.

Includes details like YouTube trailer URLs, awards, biographies, and more.

Data is updated regularly: weekly for titles, daily for ratings and episodes.

🔧 Key Features & Endpoints
Titles: Search by filters, keywords, exact title, or IMDb ID.

Ratings: Retrieve average ratings and vote counts.

Episodes & Seasons: Get episode lists by series and season.

Actors: Search actors or get detailed info by IMDb ID.

Upcoming Titles: Discover future releases.

Utils: Access genre lists, title types, and curated title collections (e.g., top-rated, most popular).

📊 Query Parameters
Flexible filters include:

limit, page, titleType, year, genre, sort, info

info parameter allows selective data retrieval (e.g., cast, budget, awards).

🧰 Predefined Lists
Examples: most_pop_movies, top_boxoffice_200, top_rated_250, top_rated_series_250

Let me know if you'd like help using this API or building something with it!

## API Version
V1

## Available Endpoints

Certainly! Here's a section you can add to your documentation:

## Available Endpoints

Below are the main endpoints provided by the MoviesDatabase API, along with brief descriptions of their functionality:

- **`/titles`** – Retrieves a list of titles (movies, series, episodes) based on various filters and sorting options.
- **`/x/titles-by-ids`** – Returns multiple titles by providing an array of IMDb IDs.
- **`/titles/{id}`** – Fetches detailed information about a specific title using its IMDb ID.
- **`/titles/{id}/ratings`** – Retrieves the average rating and number of votes for a specific title.
- **`/titles/series/{id}`** – Lists all episodes of a series, including episode and season numbers.
- **`/titles/seasons/{id}`** – Returns the total number of seasons for a given series.
- **`/titles/series/{id}/{season}`** – Retrieves episodes for a specific season of a series.
- **`/titles/episode/{id}`** – Provides detailed information about a specific episode.
- **`/titles/x/upcoming`** – Lists upcoming titles based on filters and sorting.
- **`/titles/search/keyword/{keyword}`** – Searches for titles using a keyword.
- **`/titles/search/title/{title}`** – Searches for titles by name, with an option for exact matches.
- **`/titles/search/akas/{aka}`** – Searches for titles by alternate names (AKAs), case-sensitive and exact match only.
- **`/actors`** – Retrieves a list of actors based on filters like page and limit.
- **`/actors/{id}`** – Fetches detailed information about an actor using their IMDb ID.
- **`/title/utils/titleType`** – Returns available title types (e.g., movie, series).
- **`/title/utils/genres`** – Returns a list of available genres.
- **`/title/utils/lists`** – Lists predefined collections such as top-rated or most popular titles.

Let me know if you'd like this formatted for a specific platform or converted into a table!

## Request and Response Format
     **Response Format** - 
```{
  "results": [
    {
      "id": "tt1375666",
      "titleText": "Inception",
      "primaryImage": {
        "url": "https://example.com/image.jpg"
      },
      "titleType": "movie",
      "releaseDate": "2010-07-16",
      "genres": ["Action", "Sci-Fi"],
      "ratingsSummary": {
        "averageRating": 8.8,
        "numVotes": 2000000
      }
    }
  ],
  "page": 1,
  "next": true,
  "entries": 5
}
```
🔹 Request Format
Requests are made via HTTP GET calls to specific endpoints. Query parameters are optional and can be used to filter or sort results.

Example: Search Titles by Keyword

```
GET /titles/search/keyword/Inception
Optional Query Parameters:
```
**limit=5** – Limits the number of results returned

**info=mini_info** – Specifies the level of detail in the response

Full Example:
```
GET /titles/search/keyword/Inception?limit=5&info=mini_info
```
## Authentication
To access the MoviesDatabase API, you must authenticate your requests using an API key provided by RapidAPI.

**How to Authenticate**
All requests must include the following headers:
```
http
X-RapidAPI-Key: YOUR_API_KEY
X-RapidAPI-Host: moviesdatabase.p.rapidapi.com
```
**X-RapidAPI-Key**: Your unique API key obtained from your RapidAPI account.

**X-RapidAPI-Host**: The host name for the MoviesDatabase API, which is moviesdatabase.p.rapidapi.com.

📌 Example Request with Authentication
bash
```
curl --request GET \
  --url 'https://moviesdatabase.p.rapidapi.com/titles/search/keyword/Inception' \
  --header 'X-RapidAPI-Key: YOUR_API_KEY' \
  --header 'X-RapidAPI-Host: moviesdatabase.p.rapidapi.com'
```
Make sure to replace YOUR_API_KEY with your actual key from RapidAPI.

## Erro Handling 
Error Handling
When interacting with the MoviesDatabase API, it's important to anticipate and gracefully handle common error responses. This ensures your application remains stable and user-friendly even when issues arise.

⚠️ Common Error Responses
Status Code	Error Type	Description
400	Bad Request	The request is malformed or missing required parameters.
401	Unauthorized	Authentication failed. Check your API key and headers.
403	Forbidden	You don’t have permission to access the requested resource.
404	Not Found	The requested resource (e.g., title or actor ID) does not exist.
429	Too Many Requests	Rate limit exceeded. Wait before retrying.
500	Internal Server Error	A server-side error occurred. Try again later or contact support.
🛠️ Handling Errors in Code
Here are some best practices for managing errors in your application:

Validate inputs before sending requests to avoid 400 errors.

Check authentication headers and ensure your API key is active to prevent 401 errors.

Implement retry logic with exponential backoff for 429 and 500 errors.

Log error details for debugging and monitoring.

Display user-friendly messages when errors occur, rather than raw error codes.

📌 Example Error Handling (JavaScript)
javascript
```
fetch('https://moviesdatabase.p.rapidapi.com/titles/search/keyword/Inception', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Request failed:', error.message);
});
```
## Usage Limits and Best Practices
o ensure optimal performance and avoid disruptions when using the MoviesDatabase API, it's important to understand its usage limitations and follow recommended best practices.

🚦 Usage Limits
Rate Limiting: The API enforces request limits based on your RapidAPI subscription tier. Exceeding these limits may result in 429 Too Many Requests errors.

Pagination: Most endpoints support pagination via limit and page parameters to control the volume of data returned.

Data Scope: Some endpoints allow filtering with parameters like year, genre, or titleType to narrow results and reduce load.

✅ Best Practices
Use Pagination: Always include limit and page to avoid overwhelming the API and improve performance.

Filter Requests: Apply filters (e.g., year, genre, titleType) to target relevant data and reduce unnecessary traffic.

Cache Responses: Store frequently accessed data locally to minimize repeated API calls and stay within rate limits.

Handle Errors Gracefully: Implement retry logic and user-friendly error messages for common issues like rate limits or server errors.

Secure Your API Key: Store your API key in environment variables and avoid exposing it in client-side code.

Monitor Usage: Track your API usage via RapidAPI dashboard to stay within limits and optimize request patterns.