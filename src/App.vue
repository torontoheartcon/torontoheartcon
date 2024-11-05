<script setup lang="ts">
import { useGlobalStore } from '@/stores/test'
import { onMounted, ref } from 'vue';
import { apiData } from './tools/fetchData'

const globalStore = useGlobalStore()
const GetAdmissionURL = ref('')


const onClick = () => {
  globalStore.routeKey++
}

function clickToIG() {
  window.open('https://www.instagram.com/torontoheartcon/', '_blank')!.focus()
}

function GetAdmission(url: string) {
  window.open(url, '_blank')!.focus()
}

async function loadBaseInfo() {
  const data: any = await apiData(
    'me247s03emizeov/records?where=where%3D%28status%2Ceq%2C1%29&limit=25&shuffle=0&offset=0',
    'GET'
  )
  const eventData: any = data.list[0]

  GetAdmissionURL.value = eventData.TicketSaleURL
}

onMounted(() => {
  loadBaseInfo()
})
</script>
<template>
  <div class="bg-cover w-screen min-h-screen bg-gradient-to-r from-[#330831] to-[#134b75] py-15 text-white">
    <div class="flex items-center justify-center">
      <img class="h-[180px]" src="/icon.png" />
    </div>
    <div class="py-2 xs:text-[4rem] lg:text-[1.5rem] grid grid-cols-1 lg:grid-cols-8 gap-3 lg:px-[6rem]">
      <button @click="$router.push('/')">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Home
        </div>
      </button>
      <button @click="$router.push('/about')">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          About Us
        </div>
      </button>
      <button @click="$router.push('/guests')">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Guests
        </div>
      </button>
      <button @click="$router.push('/photographers')">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
        Photographers
        </div>
      </button>
      <button @click="$router.push('/vendors')">
        <div
          class="text-white font-black hover:drop-shadow-lg [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Venders
        </div>
      </button>
      <button @click="$router.push('/gallerys')">
        <div
          class="text-white font-black hover:drop-shadow-lg [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Gallery
        </div>
      </button>
      <button @click="$router.push('/contact-us')">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Contact Us
        </div>
      </button>
      <button @click="clickToIG()">
        <div
          class="text-white font-black hover:drop-shadow-lg  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Our Instagram
        </div>
      </button>
    <!--  <button @click="GetAdmission(GetAdmissionURL)">
        <div
          class="text-white font-black hover:drop-shadow-lg [text-shadow:_0_5px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          Get Admission
        </div>
      </button>-->
    </div>

    <div>
      <router-view />
    </div>
    <div class="py-12 text-white text-center xs:text-[2.6rem] sm:text-[2rem] lg:text-[1.1rem] ">
      © Toronto Heartcon. All Rights Reserved. @ {{ new Date().getFullYear() }}
    </div>
  </div>
</template>

<style scoped></style>
