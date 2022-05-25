export {
  getFile,
  getImage,
}

const mainFolder = '/client/build/'
const imageFolder = mainFolder + 'images/'

function getFile(file: string) {
  return mainFolder + file
}

function getImage(image: string) {
  return imageFolder + image
}