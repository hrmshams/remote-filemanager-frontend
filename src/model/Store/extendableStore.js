/* 
  this is a custom store for mutable data
*/

let ExtendableStore = {
  filemanager: {
    wholeContent: [],
  },

  setWholeContent(wcontent) {
    ExtendableStore.filemanager.wholeContent = wcontent
  },
  extendWholeContent(pathArr, subContent) {
    let desiredFolderRef
    let content = ExtendableStore.filemanager.wholeContent

    for (let p of pathArr) {
      desiredFolderRef = content[p.id]
      content = desiredFolderRef.content
    }
    desiredFolderRef.content = subContent
  },
}

export default ExtendableStore
