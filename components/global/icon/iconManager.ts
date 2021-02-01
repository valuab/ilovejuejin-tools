import type { Component } from 'vue'
import SearchOrange from '@icons/icon_search_orange.svg'
import ListView from '@icons/icon_list_view.svg'
import ListComment from '@icons/icon_list_comment.svg'
import OptionAndroid from '@icons/icon_option_android.svg'
import OptionApple from '@icons/icon_option_apple.svg'
import OptionH5 from '@icons/icon_option_h5.svg'
import OptionWechat from '@icons/icon_option_wechat.svg'
import OptionWeibo from '@icons/icon_option_weibo.svg'
import CloseBlack from '@icons/icon_close_black.svg'
import CloseOrange from '@icons/icon_close_orange.svg'
import ArrowWhite from '@icons/icon_arrow_white.svg'
import IndexChange from '@icons/index_change.svg'
import ListSwitchUnable from '@icons/icon_list_switch_unable.svg'
import ListSwitchNormal from '@icons/icon_list_switch_normal.svg'
import ArrowOrange from '@icons/icon_arrow_orange.svg'

/** ****** SideMenu START ********/
import NavHome from '@icons/icon_nav_home.svg'
import NavStar from '@icons/icon_nav_star.svg'
import NavSort from '@icons/icon_nav_sort.svg'
import NavKol from '@icons/icon_nav_kol.svg'
import NavTriangle from '@icons/icon_nav_triangle.svg'
/** ****** SideMenu END ********/

/** ****** HeaderLogo START ********/
import LogoApp from '@icons/logo_app.svg'
import LogoDjcars from '@icons/logo_djcars.svg'
import LogoGame from '@icons/logo_game.svg'
import LogoMall from '@icons/logo_mall.svg'
import LogoObservation from '@icons/logo_observation.svg'
import LogoQuestion from '@icons/logo_question.svg'
import LogoYue from '@icons/logo_yue.svg'
import LogoCar from '@icons/icon_car_1.svg'
import LogoTaobao from '@icons/icon_home_taobao.svg'
import LogoTmall from '@icons/icon_home_tianmao.svg'
/** ****** HeaderLogo END ********/

export type IconType =
  | 'SearchOrange'
  | 'ListView'
  | 'ListComment'
  | 'NavHome'
  | 'NavStar'
  | 'NavSort'
  | 'NavKol'
  | 'NavTriangle'
  | 'OptionAndroid'
  | 'OptionApple'
  | 'OptionH5'
  | 'OptionWechat'
  | 'OptionWeibo'
  | 'CloseBlack'
  | 'CloseOrange'
  | 'ArrowWhite'
  | 'IndexChange'
  | 'ListSwitchUnable'
  | 'ListSwitchNormal'
  | 'ArrowOrange'
  | 'LogoApp'
  | 'LogoDjcars'
  | 'LogoGame'
  | 'LogoMall'
  | 'LogoObservation'
  | 'LogoQuestion'
  | 'LogoYue'
  | 'LogoCar'
  | 'LogoTaobao'
  | 'LogoTmall'

/**
 * 引入要使用的svg
 * example:
 * <icon icon="SearchOrange" />
 */
const iconManager: Record<IconType, Component> = {
  SearchOrange,
  ListView,
  ListComment,
  NavHome,
  NavStar,
  NavSort,
  NavKol,
  NavTriangle,
  OptionAndroid,
  OptionApple,
  OptionH5,
  OptionWechat,
  OptionWeibo,
  CloseBlack,
  CloseOrange,
  ArrowWhite,
  IndexChange,
  ListSwitchUnable,
  ListSwitchNormal,
  ArrowOrange,
  LogoApp,
  LogoDjcars,
  LogoGame,
  LogoMall,
  LogoObservation,
  LogoQuestion,
  LogoYue,
  LogoCar,
  LogoTaobao,
  LogoTmall,
}

export default iconManager
