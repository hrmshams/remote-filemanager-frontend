import { types } from "mobx-state-tree"
export default types
  .model({
    defaultPath: types.string,
    path: types.array(types.frozen()),
    wholeContent: types.array(types.frozen()),
  })
  .actions((self) => ({
    setPath(path) {
      self.path = path
    },
    setDefaultPath(dpath) {
      self.defaultPath = dpath
    },
    setWholeContent(wcontent) {
      self.wholeContent = wcontent
    },
    extendWholeContent(pathArr, subContent) {
      let desiredFolderRef
      let content = [...self.wholeContent]
      for (let p of pathArr) {
        desiredFolderRef = content[p.id]
        content = desiredFolderRef.content
      }
      desiredFolderRef.content = subContent
    },
  }))
