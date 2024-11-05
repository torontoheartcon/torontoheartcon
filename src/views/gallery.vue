<template>
  <div class="text-white py-6">
    <div
      class="flex items-center justify-center font-bold xs:text-[4.5rem] lg:text-[3rem]  xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
    >
      Gallery
    </div>
    
    <div :class="`px-[5rem] lg:px-[8rem] py-12 grid lg:grid-cols-${listOut.length} gap-6 text-center`">
      <template v-for="data of listOut" v-bind:key="data">
        <div>
          <div class="xs:text-[3rem] lg:text-[2rem]  font-bold xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)] [text-shadow:_0_2px_5px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_5px_15px_#b5edff]">
            <button @click="viewPotos(data.Id)" class="lg:text-[2rem]  xs:[text-shadow:_0_10px_8px_rgb(99_102_241_/_0.8)] [text-shadow:_0_10px_8px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]">
              {{ data.title }} - {{ data.number }}
            </button>
          </div>
        </div>
      </template>
    </div>
    <div class="px-[6rem]">
      <div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <template v-for="photo of photoBaseData.photos" v-bind:key="photo">
              <img class="w-[100%] rounded-xl" :src="photo.thumbnails.card_cover.signedUrl" />
            </template>
          </div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiData } from '../tools/fetchData'

const photoDialog = ref(false)
const listOut: any = ref([])
const photoBaseData: any = ref({})

async function loadListGallery() {
  const data: any = await apiData(
    'm34b5ypnl6hdcpv/records?fields=title,number,Id&where=where=(status,eq,1)&shuffle=0&offset=0',
    'GET'
  )
  listOut.value = data.list

  if (photoBaseData.value = {}) {
    viewPotos(data.list[0].Id)
  }
}

async function viewPotos(Id: number) {
  const data: any = await apiData(
    `m34b5ypnl6hdcpv/records/${Id}`,
    'GET'
  )
  photoBaseData.value = data
}

onMounted(() => {
  loadListGallery()
})
</script>
