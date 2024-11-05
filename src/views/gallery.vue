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
    <TransitionRoot as="template" :show="photoDialog">
    <Dialog class="relative z-10" @close="photoDialog = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold text-gray-900">Deactivate account</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="open = false">Deactivate</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="open = false" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
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
