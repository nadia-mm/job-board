import { useRef, useEffect } from "react";

type Callback = () => void;

export const useIntersectionObserver = (callback: Callback) => {
  const observerRef = useRef<HTMLDivElement | null>(null); // Adjust the ref type based on what you are observing

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the first entry is intersecting
        if (entries[0].isIntersecting) {
          callback(); // Call the callback when in view
        }
      },
      { threshold: 1.0 } // You can adjust the threshold as needed
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef); // Start observing
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef); // Cleanup on unmount
      }
    };
  }, [callback]);

  return observerRef; // Return the ref to use in your component
};
