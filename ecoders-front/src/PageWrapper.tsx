import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ReactNode } from 'react';


interface PageWrapperProps {
    children: ReactNode;
  }

function PageWrapper({ children}: PageWrapperProps ) {
  const location = useLocation();


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return children;
}

export default PageWrapper;