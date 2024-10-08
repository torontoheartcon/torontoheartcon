<template>
  <div class="grid grid-cols-1 gap-2 px-[5rem] lg:px-[4rem] py-[1rem]">
    <div class="text-center pt-[1rem]">
      <span class="text-[3rem] text-white font-black xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]">
        We will start
      </span>
    </div>
    <div class="lg:px-[15rem] text-center pb-[3rem]">
      <vue-countdown :time="time" :interval="100" v-slot="{ days, hours, minutes, seconds }">
        <div class="grid lg:grid-cols-4 text-white gap-[1rem]">
          <div class="grid lg:grid-cols-1">
            <div class="xs:text-[6rem] lg:text-[3.5rem] font-black text-[#d6d493]">
              {{ days }}
            </div>
            <div class="font-bold xs:text-[4rem] lg:text-[1.5rem]">
              Days
            </div>
          </div>
          <div class="grid lg:grid-cols-1">
            <div class="xs:text-[6rem] lg:text-[3.5rem] font-black text-[#d6d493]">
              {{ hours }}
            </div>
            <div class="font-bold xs:text-[4rem] lg:text-[1.5rem]">
              Hours 
            </div>
          </div>
          <div class="grid lg:grid-cols-1">
            <div class="xs:text-[6rem] lg:text-[3.5rem] font-black text-[#d6d493]">
              {{ minutes }}
            </div>
            <div class="font-bold xs:text-[4rem] lg:text-[1.5rem]">
              Minutes
            </div>
          </div>
          <div class="grid lg:grid-cols-1">
            <div class="xs:text-[6rem] lg:text-[3.5rem] font-black text-[#d6d493]">
              {{ seconds }}
            </div>
            <div class="font-bold xs:text-[4rem] lg:text-[1.5rem]">
              Seconds
            </div>
          </div>
        </div>
      </vue-countdown>
    </div>
    <div class="lg:px-[6rem] grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
      <div class="lg:px-[4rem] xs:px-[0rem]">
        <iframe
          v-if="baseEventData.googleMapLink"
          class="rounded-xl lg:col-sapn-full lg:h-[100%] xs:h-[30rem] xs:w-[100%] lg:w-[100%]"
          :src="`https://www.google.com/maps/${baseEventData.googleMapLink}`"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
      <div class="xl:col-span-3 xl:px-[8rem]">
        <div
          class="xs:text-[4.2rem] lg:text-[2rem] text-white font-black hover:drop-shadow-lg xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
        >
          {{ baseEventData.formattedHeldDate }} - {{ baseEventData.formattedCloseDate }}
        </div>
        <div class="py-2">
          <div
            class="xs:text-[4.2rem] lg:text-[1.8rem] text-white font-black hover:drop-shadow-lg xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
          >
            {{ baseEventData.address }}, {{ baseEventData.city }}, {{ baseEventData.provinceCode }}
          </div>
          <div
            class="xs:text-[4.2rem] lg:text-[1.8rem] text-white font-black hover:drop-shadow-lg xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
          >
            {{ baseEventData.postCode }}
          </div>
        </div>
        <div class="py-2">
          <div class="lg:text-[1rem]  xs:text-[2rem] text-white font-black hover:drop-shadow-lg">
            {{ baseEventData.description }}
          </div>
        </div>
        <div class="py-2">
          <button
            class="lg:text-[1rem] xs:text-[3rem] font-bold bg-[#241137] lg:p-3 xs:p-6 rounded-xl shadow-2xl shadow-white/50 hover:bg-[#130126]"
            @click="loadAdmissionPage(baseEventData.TicketSaleURL)"
          >
          Get Admission
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { apiData } from '../tools/fetchData'

const baseEventData: any = ref({})
let time: any = ref('')

async function loadBaseInfo() {
  const data: any = await apiData(
    'me247s03emizeov/records?where=where%3D%28status%2Ceq%2C1%29&limit=25&shuffle=0&offset=0',
    'GET'
  )
  const eventData: any = data.list[0]

  const originalHeldDate = new Date(eventData.heldDate)
  const originalCloseDate = new Date(eventData.closeDate)

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York', // UTC-4 (Eastern Standard Time)
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  const optionsTime: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York', // UTC-4 (Eastern Standard Time)
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  const finalHeldDate = originalHeldDate.toLocaleString('en-US', options)

  let finalCloseDate = ''

  if (originalHeldDate.toDateString() === originalCloseDate.toDateString()) {
    finalCloseDate = originalCloseDate.toLocaleTimeString('en-US', optionsTime)
  } else {
    finalCloseDate = originalCloseDate.toLocaleString('en-US', options)
  }

  baseEventData.value = {
    ...eventData,
    formattedHeldDate: finalHeldDate,
    formattedCloseDate: finalCloseDate
  }

  let heldDateString = baseEventData.value.heldDate


  const futureDate: any = new Date(heldDateString.replace(' ', 'T'))
  const now: any = new Date()
  time.value = futureDate - now
}

onMounted(() => {
  loadBaseInfo()
})

function loadAdmissionPage(url: string) {
  window.open(url, '_blank')!.focus()
}
</script>
