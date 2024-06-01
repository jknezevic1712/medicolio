import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// types
import type { Drug, DrugData } from '@/assets/types/API'

export const useDrugStore = defineStore('drugs', () => {
  const drugs = ref<DrugData[]>([])

  const drugList = computed(() => {
    let drugList: Drug[] = []

    drugs.value.forEach((drugManufacturer) => {
      drugManufacturer.drugs.forEach((drug) => {
        drugList = [...drugList, drug]
      })
    })

    return drugList
  })

  const hasDrugs = computed(() => drugList.value.length > 0)

  function setDrugs(data: DrugData[]) {
    drugs.value = data
  }

  return { drugs, drugList, hasDrugs, setDrugs }
})
