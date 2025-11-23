import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (request: NextApiRequest, response: NextApiResponse)  {
if (request.method === "POST") {
  const { year, page, genre } = request.body;
  const date = new Date();

  // build the query params safely
  const query = new URLSearchParams({
    year: String(year || date.getFullYear()),
    sort: "year.decr",
    limit: "12",
    page: String(page),
  });

  if (genre) query.append("genre", genre);

  const url = `https://moviesdatabase.p.rapidapi.com/titles?${query.toString()}`;

  const resp = await fetch(url, {
    headers: {
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
      "x-rapidapi-key": process.env.MOVIE_API_KEY as string,
    },
  });

  console.log("FETCH URL:", url);
  console.log("STATUS:", resp.status);

  if (!resp.ok) {
    const text = await resp.text();
    console.error("API error:", text);
    throw new Error("Failed to fetch movies");
  }

  const moviesResponse = await resp.json();
  const movies: MoviesProps[] = moviesResponse.results || [];

  return response.status(200).json({ movies });
}

};