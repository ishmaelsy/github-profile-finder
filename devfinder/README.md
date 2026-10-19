# DevFinder

DevFinder is a small React app for looking up developers on GitHub. Type a username to see their profile, stats and repositories, then save the profiles you want to come back to.

**Live site:**  https://devfinder-by-sybercodes.vercel.app/

## Features
- Search any GitHub username (with input checking and recent searches)
- Profile page with stats, plus repo sorting, language filter and pagination
- Save profiles and view them later (kept in the browser with localStorage)
- Loading, error (user not found, rate limit, no internet) and empty states
- Works on phones and desktops

## Built with
React, React Router, Vite, and the [GitHub REST API](https://docs.github.com/en/rest) (no API key needed).

## How to run
1. Install [Node.js](https://nodejs.org)
2. `npm install`
3. `npm run dev`, then open the link shown in the terminal

## Pages
| URL | Page |
| --- | --- |
| `/` | Home: search, recent searches, example profiles |
| `/user/:username` | Profile: stats and repositories (dynamic route) |
| `/saved` | Saved profiles |
| `/about` | About |

## Project structure
```
src/
  components/   navbar, footer, searchbar, profilecard, stattile, repocard
  pages/        home, profile, saved, about
  App.jsx       routes + saved profiles state
  main.jsx      entry point
```

## Note
GitHub allows 60 requests per hour without logging in, and each profile view uses 2. If you hit the limit, the app shows a message. Wait a few minutes and try again.



Built by Ishmael SY. 
2026 Nolap Technologies Internship Final project 