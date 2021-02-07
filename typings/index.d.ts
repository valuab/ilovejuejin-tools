import { IRootHttpState } from '~/api/apiPublic/index'
import { accessorType } from '~/store/index'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $http: IRootHttpState
    $accessor: typeof accessorType
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: IRootHttpState
    $accessor: typeof accessorType
  }
}
