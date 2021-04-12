import { Context } from '@nuxt/types'

export default ({ route, redirect }: Context) => {
  if (route.fullPath.includes('share')) {
    let search: any = route.query.search || ''
    search = search.replace(/-/g, '=').replace(/_/g, '&')
    const position = search.indexOf('pathName=')
    const pathName = search.slice(position + 9)
    const path = `/${pathName}?${search}`
    redirect(path)
  }
}
