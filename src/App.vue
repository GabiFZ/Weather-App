<script setup>
import { RouterLink, RouterView } from 'vue-router'
//import HelloWorld from './components/HelloWorld.vue'
import Navigation from './components/Navigation.vue'
import Modal from './components/Modal.vue'

</script>

<template>
  <div class="main">
     
        <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
       <Navigation v-on:add-city="toggleModal" v-on:edit-city="toggleEdit" />
       
    <header>
      
    </header>
  <RouterView v-slot="{ Component }">
  <component 
    :is="Component" 
    :cities="cities"
    :edit="edit" 
  />
  </RouterView>
  </div>
</template>

<script>
import axios from 'axios';
import db from "./firebase/firebaseinit";
import { collection, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import Navigation from './components/Navigation.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Modal
  },
  data() {
    return {
      APIkey: "3d6415fa951c28a6aa5fb254dc9050ee",
      cities: [],
      modalOpen: null,
      edit: null,
    };
  },
  created() {
    this.getCityWeather();
  },
  methods: {
  async getCityWeather() {
  const citiesRef = collection(db, "cities");

  onSnapshot(citiesRef, async snapshot => {
    for (const change of snapshot.docChanges()) {
      
      if (change.type === "added") {
        const docData = change.doc.data();
        const docRef = doc(db, "cities", change.doc.id);

        try {
          if (!docData.weatherData) {
            const cityName = docData.city;

            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${this.APIkey}`
            );

            const data = response.data;

            await updateDoc(docRef, { weatherData: data });

            this.cities.push({
              name: cityName,
              temp: Math.round(data.main.temp),
              icon: data.weather[0].icon
            });

          } else {
            this.cities.push({
              name: docData.city,
              temp: Math.round(docData.weatherData.main.temp),
              icon: docData.weatherData.weather[0].icon
            });
          }

        } catch (err) {
          console.error("Error fetching weather for city:", docData.city, err);
        }
      }

      // Schimbările de tip "removed" trebuie verificate separat
      if (change.type === "removed") {
        const cityName = change.doc.data().city;
        this.cities = this.cities.filter(city => city.name !== cityName);
      }
    }
  });
},


  toggleModal() {
    this.modalOpen = !this.modalOpen;
  },
  toggleEdit() {
    this.edit = !this.edit;
  }
},
};
</script>

<style lang="scss">
// header {
//   line-height: 1.5;
//   max-height: 100vh;
// }

// .logo {
//   display: block;
//   margin: 0 auto 2rem;
// }

// nav {
//   width: 100%;
//   font-size: 12px;
//   text-align: center;
//   margin-top: 2rem;
// }

// nav a.router-link-exact-active {
//   color: var(--color-text);
// }

// nav a.router-link-exact-active:hover {
//   background-color: transparent;
// }

// nav a {
//   display: inline-block;
//   padding: 0 1rem;
//   border-left: 1px solid var(--color-border);
// }

// nav a:first-of-type {
//   border: 0;
// }

// @media (min-width: 1024px) {
//   header {
//     display: flex;
//     place-items: center;
//     padding-right: calc(var(--section-gap) / 2);
//   }

//   .logo {
//     margin: 0 2rem 0 0;
//   }

//   header .wrapper {
//     display: flex;
//     place-items: flex-start;
//     flex-wrap: wrap;
//   }

//   nav {
//     text-align: left;
//     margin-left: -1rem;
//     font-size: 1rem;
//     padding: 1rem 0;
//     margin-top: 1rem;
//   }
// }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.main {
max-width: 1024px;
margin: 0 auto;
height: 100vh;


  .container {
    padding: 0 20px;
  }

}
</style>
