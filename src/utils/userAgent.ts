const userAgent = navigator.userAgent.toLowerCase()
export const isMobile = /iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent)
export const isTablet = /ipad|android 3.0|android 4.0/.test(userAgent)
