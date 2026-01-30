<template>
  <div class= "modal" @click="closeModal" ref="modal"> 
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter Location</label>

      <input
        type="text"
        id="city-name"
        placeholder="Search by city name"
        v-model="city"
      />
      <button @click="addCity">Add</button>
    </div>
  </div>
</template>

<script>
// import AddCity from '@/views/AddCity.vue';
import axios from 'axios';
import db from "../firebase/firebaseinit";
 import { collection, addDoc } from "firebase/firestore";

export default {
    name: "modal",
    props: ['APIkey'],
    data() {
        return {
            city: "",
        };
    },

   methods: {
  closeModal(e) {
    if (e.target === this.$refs.modal) {
      this.$emit("close-modal");
    }
  },

  async addCity() {
    if (this.city.trim() === "") {
      alert("Field cannot be empty");
      return;
    }

    try {
      //  Preluare date de la OpenWeather
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIkey}`
      );
      const data = res.data;

     
     
      const citiesRef = collection(db, "cities");

      //  Adaugă orașul în Firestore
      await addDoc(citiesRef, {
        city: this.city,
        currentWeather: data
      });

      //  Emit eveniment către App sau AddCity
      this.$emit("city-added", { city: this.city, currentWeather: data });

      //  Golește input și închide modalul
      this.city = "";
      this.$emit("close-modal");

    } catch (error) {
      console.error(error);
      alert("City not found or error saving to database");
    }
  },
},
};
</script>

<style lang="scss" scoped>
    .modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }

  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>