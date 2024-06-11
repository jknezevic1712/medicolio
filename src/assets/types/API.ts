export type DrugAPIResponse = {
  meta: {
    disclaimer: string
    terms: string
    license: string
    last_updated: string
    results: {
      skip: number
      limit: number
      total: number
    }
  }
  results: [
    {
      submissions: [
        {
          submission_type: string
          submission_number: string
          submission_status: string
          submission_status_date: string
          submission_class_code: string
          submission_class_code_description: string
        },
        {
          submission_type: string
          submission_number: string
          submission_status: string
          submission_status_date: string
        },
        {
          submission_type: string
          submission_number: string
          submission_status: string
          submission_status_date: string
          submission_class_code: string
          submission_class_code_description: string
        },
        {
          submission_type: string
          submission_number: string
          submission_status: string
          submission_status_date: string
          review_priority: string
          submission_class_code: string
          submission_class_code_description: string
        }
      ]
      application_number: string
      sponsor_name: string
      openfda: {
        application_number: string[]
        brand_name: string[]
        generic_name: string[]
        manufacturer_name: string[]
        product_ndc: string[]
        product_type: string[]
        route: string[]
        substance_name: string[]
        rxcui: string[]
        spl_id: string[]
        spl_set_id: string[]
        package_ndc: string[]
        unii: string[]
      }
      products: [
        {
          product_number: string
          reference_drug: string
          brand_name: string
          active_ingredients: [
            {
              name: string
              strength: string
            }
          ]
          reference_standard: string
          dosage_form: string
          route: string
          marketing_status: string
          te_code: string
        },
        {
          product_number: string
          reference_drug: string
          brand_name: string
          active_ingredients: [
            {
              name: string
              strength: string
            }
          ]
          reference_standard: string
          dosage_form: string
          route: string
          marketing_status: string
          te_code: string
        }
      ]
    }
  ]
}

export type Drug = {
  id: string
  name: string
  strength: string
}
export type DrugData = {
  id: number
  route: string
  dosage_form: string
  drugs: Drug[]
}

export type UserAuthResData = {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}
