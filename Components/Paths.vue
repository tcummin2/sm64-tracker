<template>
  <div class="paths">
    <div class="title">
      Paths
    </div>
    <div v-for="(path, i) in paths"
      :key="i"
      class="path"
    >
      <span v-for="(stage, j) in path" :key="j">
        <stage-display
          :stageName="stage"
          :leadsTo="j + 1 < path.length ? path[j + 1] : path[1]"
        />
        <span v-if="j + 1 < path.length">
          =>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StageDisplay from './StageDisplay'

const setDifference = (arr1, arr2) => {
  let a = new Set(arr1)
  let b = new Set(arr2)
  return [...new Set([...a].filter(x => !b.has(x)))]
}

export default {
  name: 'Paths',
  components: { StageDisplay },
  computed: {
    ...mapState(['paintingMap']),
    paths() {
      var allPaths = Object.keys(this.paintingMap)
        .filter(painting => this.paintingMap[painting])
        .map(painting => this.recursivelyFindPathFromPainting(painting, painting))

      allPaths.sort((a, b) => b.length - a.length)
      return this.joinPaths(allPaths)
    }
  },
  methods: {
    recursivelyFindPathFromPainting(originalPainting, painting) {
      var associatedStage = this.paintingMap[painting]
      if (!associatedStage || originalPainting === associatedStage) {
        return [painting]
      }

      return [painting, ...this.recursivelyFindPathFromPainting(originalPainting, associatedStage)]
    },
    joinPaths(paths) {
      return paths.reduce((pathList, currentPath, i) => {
        var newPath = []
        var firstStage = currentPath[0]
        var pathAlreadyAdded = pathList.some((otherPath, j) => i !== j && !setDifference(currentPath, otherPath).length)

        while (!pathAlreadyAdded) {
          newPath.push(...currentPath)
          var lastStage = currentPath[currentPath.length - 1]

          var otherPath = paths.find(path => path[0] === lastStage)
          if (otherPath) {
            var indexOfFirstStage = otherPath.indexOf(firstStage)
            var newArr = indexOfFirstStage > -1
              ? otherPath.slice(1, indexOfFirstStage + 1)
              : otherPath.slice(1)
            newPath.push(...newArr)
            if (indexOfFirstStage > -1) break
          } else {
            break
          }
        }

        if (newPath.length) pathList.push(newPath)
        return pathList
      }, [])
    }
  }
}
</script>

<style lang="scss" scoped>
.paths {
  max-width: 380px;
}

.path {
  padding: 5px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid white;
  }
}
</style>
