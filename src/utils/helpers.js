/**
 * CheckElementImages
 * Utility function to check if an element contains images
 *
 * The function expects one paramater:
 * @param array arrImages: The array of images from the element
 * @return string
 */
export function checkElementImages(arrImages) {
  const reverseImages = arrImages.toReversed();
  for (let i = 0; i < reverseImages.length; i++) {
    if (i.label !== "") return reverseImages[i].label;
    return null;
  }
}
