// utils
import API_ENDPOINTS from '@/assets/API'
// types
import type { DrugAPIResponse, DrugData } from '@/assets/types/API'

export default function useAPI() {
  async function fetchMedications() {
    const res: DrugAPIResponse = await (await fetch(API_ENDPOINTS.drugs)).json()
    const drugList: DrugData[] = []

    res.results.forEach((drugManufacturer) => {
      drugManufacturer.products.forEach((drugItem, manufacturerIdx) => {
        drugList[manufacturerIdx] = {
          ...drugList[manufacturerIdx],
          id: manufacturerIdx,
          route: drugItem.route,
          dosage_form: drugItem.dosage_form
        }

        drugItem.active_ingredients.forEach((drug, drugIdx) => {
          drugList[manufacturerIdx] = {
            ...drugList[manufacturerIdx],
            drugs: [
              {
                id: drug.name + '-' + drugIdx,
                ...drug
              }
            ]
          }
        })
      })
    })

    return drugList
  }

  return {
    fetchMedications
  }
}
