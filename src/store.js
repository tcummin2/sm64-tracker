import Vue from 'vue'
import Vuex from 'vuex'
import stages from './stages.json'

Vue.use(Vuex)

const utils = {
  toObject: (arr, func) => Object.assign(...arr.map(func)),
  mapObject(obj, func) {
    return this.toObject(Object.entries(obj), func)
  }
}

const state = {
  paintingMap: {},
  stars: {},
  displayStyle: 'image'
}

const getters = {
  getStageNameByPainting: state => painting => state.paintingMap[painting],
  selectedStages: state => Object.values(state.paintingMap).filter(stage => !!stage),
  getStarsByStage: state => name => state.stars[name],
  getStarsByCategoryByStage: (state, getters) => (stageName, category) => getters.getStarsByStage(stageName)[category],
  displayStyle: state => state.displayStyle
}

const mutations = {
  assignStage(state, { painting, stage }) {
    Object.keys(state.paintingMap).forEach(mappedStage => {
      if (state.paintingMap[mappedStage] === stage) {
        Vue.set(state.paintingMap, mappedStage, '')
      }
    })
    Vue.set(state.paintingMap, painting, stage)
  },
  toggleStar(state, { stageName, category, starIndex }) {
    var stage = state.stars[stageName]
    Vue.set(stage[category], starIndex, !stage[category][starIndex])
  },
  resetState(state) {
    var allStages = [].concat(...stages.map(floor => floor.stages))
    Vue.set(state, 'paintingMap', utils.toObject(allStages, stage => ({ [stage.name]: '' })))
    Vue.set(state, 'stars', utils.toObject(allStages, stage => ({
      [stage.name]: utils.mapObject(stage.starCategories, ([s, numStars]) => ({
        [s]: new Array(numStars).fill(false)
      }))
    })))
  },
  changeDisplayStyle(state, newStyle) {
    state.displayStyle = newStyle
  }
}

const actions = {
  assignStage({commit}, stageInfo) {
    commit('assignStage', stageInfo)
  },
  toggleStar({commit}, itemInfo) {
    commit('toggleStar', itemInfo)
  },
  resetState({commit}) {
    commit('resetState')
  },
  changeDisplayStyle({commit}, newStyle) {
    commit('changeDisplayStyle', newStyle)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})