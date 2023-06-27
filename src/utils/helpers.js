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

/**
 * ConvertDateTimeToDate
 * Utility function to convert datetime values to formatted date
 *
 * The function expects one parameter:
 * @param string dateTime: The raw datetime value
 * @return string
 */

export function convertDateTimeToDate(dateTime) {
  return new Date(dateTime).toLocaleDateString();
}

/** convertMillisecondsToMinutesAndSeconds
 * Utilit function to converte milliseconds values to formatted value
 *
 * The function expects one parameter:
 * @param string msTime: The raw milliseconds value
 * @return string
 */
export function convertMillisecondsToMinutesAndSeconds(msTime) {
  const minutes = Math.floor(msTime / (60 * 1000));
  const seconds = ((msTime % 6000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : 0) + seconds;
}
