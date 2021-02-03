import { Context } from '@nuxt/types'

export default (context: Context) => {
  const axios = context.$axios
  axios.defaults.headers.test = '666'
}
