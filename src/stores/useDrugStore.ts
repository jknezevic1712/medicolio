import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// types
import type { DrugData } from '@/assets/types/API'

const useDrugStore = defineStore(
  'drugs',
  () => {
    const drugs = ref<DrugData[]>([])

    const drugList = computed(() => {
      let formattedDrugList: string[] = []

      drugs.value.forEach((drugManufacturer) => {
        drugManufacturer.drugs.forEach((drug) => {
          formattedDrugList = [...formattedDrugList, drug.name + ` (${drug.strength})`]
        })
      })

      return formattedDrugList
    })

    const hasDrugs = computed(() => drugList.value.length > 0)

    function setDrugs(data: DrugData[]) {
      drugs.value = data
    }

    return { drugs, drugList, hasDrugs, setDrugs }
  },
  {
    persist: {
      storage: localStorage,
      key: 'medicolio-drugs'
    }
  }
)

export default useDrugStore
