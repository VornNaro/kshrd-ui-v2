//TODO: This function is created to scroll to top of the page
export const scrollToTop = {
   scroll: () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      })
   }
}