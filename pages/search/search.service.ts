// import { http } from '/@/api/http'
// import ApiLink from '/@/api/apiLink'

// /**
//  * @method getSearchAll
//  * @param {string} keyword 关键字
//  * @param {string} viewUserId 浏览用户id
//  */
// export function getSearchAll(
//   keyword: string,
//   viewUserId: number,
//   page: Number = 1
// ) {
//   return http(ApiLink.searchAll, {
//     keyword,
//     viewUserId,
//     page,
//   })
// }
// /**
//  * @method getSearchByItemCategoryId
//  * @param {string} keyword 关键字
//  * @param {string} categoryId	浏览用户id
//  * @param {string} viewUserId 分类id
//  */
// export function getSearchByItemCategoryId(
//   keyword: string,
//   categoryId: number,
//   viewUserId: number
// ) {
//   return http(ApiLink.searchByItemCategoryId, {
//     keyword,
//     categoryId,
//     viewUserId,
//   })
// }

// /**
//  * @method getSearchByItemKeywordId
//  * @param {string} keyword 关键字
//  * @param {number} keywordId	标签id
//  * @param {number} viewUserId 浏览用户id
//  */
// export function getSearchByItemKeywordId(
//   keyword: string,
//   keywordId: number,
//   viewUserId: number
// ) {
//   return http(ApiLink.getSearchByItemKeywordId, {
//     keyword,
//     keywordId,
//     viewUserId,
//   })
// }
// /**
//  * @method getSearchByHostUserId
//  * @param {string} keyword 关键字
//  * @param {number} hostUserId	主持人id
//  * @param {number} viewUserId 浏览用户id
//  */
// export function getSearchByHostUserId(
//   keyword: string,
//   hostUserId: number,
//   viewUserId: number
// ) {
//   return http(ApiLink.getSearchByHostUserId, {
//     keyword,
//     hostUserId,
//     viewUserId,
//   })
// }
// /**
//  * @method getSearchByCars
//  * @param {string} keyword 关键字
//  * @param {number} categoryId	分类id
//  * @param {number} keywordId	标签id
//  * @param {number} hostUserId	主持人id
//  * @param {number} viewUserId 浏览用户id
//  */
// export function getSearchByCars(
//   keyword: string,
//   categoryId: number,
//   keywordId: number,
//   hostUserId: number,
//   viewUserId: number
// ) {
//   return http(ApiLink.getSearchByHostUserId, {
//     keyword,
//     categoryId,
//     keywordId,
//     hostUserId,
//     viewUserId,
//   })
// }
