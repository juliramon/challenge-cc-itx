/**
 * CheckElementImages
 * Utility function to check if an element contains images
 *
 * The function expects one paramater:
 * @param array arrImages: The array of images from the element
 * @return string
 */
export default function checkElementImages(arrImages) {
  for (let i = 0; i < arrImages.length; i++) {
    if (i.label !== "") {
      return arrImages[i].label;
    }

    return null;
  }
}
