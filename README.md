#  WeatherApp – Real-Time Weather Application (Vue 3)

##  Project Title & Theme
**WeatherApp** is a real-time weather application built with **Vue 3** that allows users to add cities and view current weather conditions using dynamic icons and background videos.

---

##  Project Description
WeatherApp is a single-page application that retrieves live weather data from the **OpenWeather API** and stores city data in **Firebase Firestore**.  
The application updates automatically in real time whenever a city is added or removed, without requiring a page refresh.

Each city displays:
- City name
- Current temperature
- Weather icon
- Background video depending on weather conditions and day/night state

---

##  Implemented Features
-  Add cities by name
-  Fetch real-time weather data from OpenWeather API
-  Real-time synchronization using Firebase Firestore (`onSnapshot`)
-  Dynamic videos and icons based on weather and time of day
-  Edit mode for deleting cities
-  Responsive grid layout
-  Fast development using Vite

---

##  Weather & Day/Night Logic
The OpenWeather API provides an `icon` code (e.g. `01d`, `04n`):
- The number represents the weather condition (clear, clouds, rain, etc.)
- `d` = day, `n` = night

This `icon` code is used directly to load:
- Weather icons: `/conditions/{icon}.svg`
- Background videos: `/videos/{icon}.mp4`

No additional logic is needed to determine day or night.

---

##  Technologies Used
- **Vue 3**
- **Vite**
- **Vue Router**
- **Axios**
- **Firebase Firestore**
- **OpenWeather API**
- **SCSS**
- **Font Awesome**

---

##  Project Setup & Running Instructions

### Install dependencies
```sh
npm install
npm run dev