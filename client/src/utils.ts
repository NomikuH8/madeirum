export {
  getFile,
  getProfileImage,
}

const mainFolder = '/client/build/'
const imageFolder = mainFolder + 'images/pfps/'

function getFile(file: string) {
  return mainFolder + file
}

function getProfileImage(image: string) {
  return imageFolder + image
}