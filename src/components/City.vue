<template>
  <div class="city">
    <i v-if="edit" @click="removeCity" class="far fa-trash-alt edit" ref="edit"></i>
    <span>{{ city.name }}</span>
    <div class="weather">
      <span>{{ city.temp }}&deg;</span>
   <img
  v-if="city.icon"
  :src="`/conditions/${city.icon}.svg`"
  alt="weather icon"
  width="50"
/>
    </div>
    <div class="video">
        <video
  v-if="city.icon"
  :src="`/videos/${city.icon}.mp4`"
  autoplay
  muted
  loop
  playsinline> </video>

  <div class="bg-overlay"></div>

    </div>
  </div>
</template>

<script>
    import db from '@/firebase/firebaseinit';
    import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
export default {

    name: "city",
    props: ['city', "edit"],
    created(){
       // console.log(this.city);
    },
    data () {
        return {
          id: null,
        }
    },
    methods: {
  async removeCity() {
    try {
      const citiesRef = collection(db, "cities"); // aici folosim collection din import
      const q = query(citiesRef, where("city", "==", this.city.name));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "cities", document.id));
      });
    } catch (err) {
      console.error("Error deleting city:", err);
    }
  },
    }
};
</script>

<style lang="scss" scoped>

    .city {
        display: flex;
        position: relative;
        flex-direction: column;
        padding: 20px;
        flex-basis: 50%;
        min-height: 250px;
        color: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

        .edit {
            border-radius: 0px 15px 0 0;
            border: 10px solid rgb(77, 77, 77);
            background-color: rgb(77, 77, 77) ;
            z-index: 10;
            font-size: 20px;
            position: absolute;
            bottom: 0px;
            left: 0px;
            
        }

        span {
            z-index: 1;
            text-transform: capitalize;
            display: block;
            font-size: 25px;
            font-weight: 600;
        }



        .weather {

            display: flex;
            z-index: 1;
            justify-content: flex-end;
            align-items: flex-end;
            flex: 1;

            span {
                font-size: 35px;
                margin-right: 8px;

            }

            img {
                height: 20px;
                width: auto;
            }
        }

            .video {
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                video {
                    height: 100%;
                    @media (min-width: 900px) {
                        height: auto;
                        width: 100%;
                    }
                }

                .bg-overlay {
                    position: absolute;
                    height: 100%;
                    
                    width: 100%;
                    top: 0;
                    background-color: rgba(0,0,0,0.2);
                }
            }

        }
    
    

</style>