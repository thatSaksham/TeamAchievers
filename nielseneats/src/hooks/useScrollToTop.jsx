import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//a custom hook to scroll to the top of the page whenever the route changes

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
