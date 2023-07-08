/**
 * CheckElementImages
 * Utility function to check if an element contains images
 *
 * The function expects one paramater:
 * @param array arrImages: The array of images from the element
 * @return string
 */
export function checkElementImages(arrImages) {
  const reverseImages = [...arrImages].reverse();
  for (let i = 0; i < reverseImages.length; i++) {
    if (i.label !== "") return reverseImages[i].label;
    return null;
  }
}

/**
 * formatDateTimeToISODate
 * Utility function to convert datetime values to formatted date
 *
 * The function expects one parameter:
 * @param string dateTime: The raw datetime value
 * @return string
 */
export function formatDateTimeToISODate(dateTime) {
  return new Date(dateTime).toLocaleDateString();
}

/** formatMsToISODuration
 * Utility function to convert milliseconds values to formatted value
 *
 * The function expects one parameter:
 * @param string msTime: The raw milliseconds value
 * @return string
 */
export function formatMsToISODuration(msTime) {
  const date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, msTime));
  const dateElements = [
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ];
  return dateElements.map((s) => String(s).padStart(2, "0")).join(":");
}

/** checkIfObjectIsEmptu
 * Utility function to check if a certain object is empty or not
 *
 * The function expects one parameter:
 * @param object objectEl: The object to evaluate
 * @return boolean
 */
export function checkIfObjectIsEmpty(objectEl) {
  return Object.keys(objectEl).length === 0;
}
