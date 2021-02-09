import { applySnapshot, getSnapshot, types } from "mobx-state-tree"
import FileManagerType from "./fileManager"

// import ConstStore from "./constStore"

const MobxStore = types
  .model("store", {
    filemanager: FileManagerType,
  })
  .actions((self) => {
    let initialState
    return {
      afterCreate() {
        initialState = getSnapshot(self)
      },
      resetStore() {
        applySnapshot(self, initialState)
      },
    }
  })

const Store = MobxStore.create({
  filemanager: {
    defaultPath: "",
    path: [],
    wholeContent: [],
  },
})

export default Store
