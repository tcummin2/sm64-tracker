import Vue from 'vue'
import stages from '../Config/stages.json'

const utils = {
  toObject: (arr, func) => Object.assign(...arr.map(func)),
  mapObject(obj, func) {
    return this.toObject(Object.entries(obj), func)
  },
  flatten: arr => [].concat(...arr)
}

export const state = () => ({
  paintingMap: {},
  stars: {},
  showImages: true
})

export const getters = {
  getStageNameByPainting: state => painting => state.paintingMap[painting],
  selectedStages: state => Object.values(state.paintingMap).filter(stage => !!stage),
  getStarsByStage: state => name => state.stars[name],
  getStarsByCategoryByStage: (state, getters) => (stageName, category) => getters.getStarsByStage(stageName)[category],
  completedStages: state => Object.keys(state.stars)
    .filter(stage => utils.flatten(Object.values(state.stars[stage])).every(star => star)),
  isStageComplete: (state, getters) => stageName => getters.completedStages.includes(stageName),
  starCount: state => {
    var stars = Object.values(state.stars).map(stage => utils.flatten(Object.values(stage)))
    return utils.flatten(stars).filter(star => star).length
  }
}

export const mutations = {
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
    var floors = stages.filter(floor => floor.starCategories && Object.keys(floor.starCategories).length)

    Vue.set(state, 'paintingMap', utils.toObject(allStages, stage => ({ [stage.name]: '' })))

    Vue.set(state, 'stars', utils.toObject([...allStages, ...floors], stage => ({
      [stage.name]: utils.mapObject(stage.starCategories, ([s, numStars]) => ({
        [s]: new Array(numStars).fill(false)
      }))
    })))
  },
  setShowImages(state, newStyle) {
    state.showImages = newStyle
  }
}

export const actions = {
  assignStage({commit}, stageInfo) {
    commit('assignStage', stageInfo)
  },
  toggleStar({commit}, itemInfo) {
    commit('toggleStar', itemInfo)
  },
  resetState({commit}) {
    commit('resetState')
  },
  setShowImages({commit}, newStyle) {
    commit('setShowImages', newStyle)
  }
}
