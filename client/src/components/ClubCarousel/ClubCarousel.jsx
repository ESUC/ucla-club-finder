import { useState, useEffect, useRef } from 'react';
import './ClubCarousel.css';

const ClubCarousel = ({ title, clubs = [] }) => {
  const carouselRef = useRef(null);
  const [scrollState, setScrollState] = useState({ canScrollLeft: false, canScrollRight: true });

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const canScrollLeft = scrollLeft > 0;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding errors
      setScrollState({ canScrollLeft, canScrollRight });
    }
  };

  useEffect(() => {
    // Check initial scroll position
    checkScrollPosition();

    // Add scroll listener
    const carousel = carouselRef.current;
    const handleScroll = () => checkScrollPosition();

    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    // Also check on resize
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [clubs.length]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300; // Scroll by card width + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Check position after a short delay to account for smooth scrolling
      setTimeout(() => checkScrollPosition(), 100);
    }
  };

  return (
    <div className="club-carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        <span className="carousel-count">{clubs.length}</span>
      </div>
      <div className="carousel-wrapper">
        <button
          className={`carousel-arrow carousel-arrow-left ${!scrollState.canScrollLeft ? 'disabled' : ''}`}
          onClick={() => scrollCarousel('left')}
          disabled={!scrollState.canScrollLeft}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="carousel-container" ref={carouselRef}>
          <div className="carousel-track">
            {clubs.map((club, index) => (
              <div key={club._id || club.id || index} className="club-card">
                <div className="club-card-image">
                  {(club.img || club.logo) ? (
                    <img src={club.img || club.logo} alt={club.abbreviation || club.name || ''} className="club-logo" />
                  ) : (
                    <div className="club-logo-placeholder"></div>
                  )}
                </div>
                <p className="club-card-name">{club.abbreviation || club.name || club.clubName || 'Club'}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className={`carousel-arrow carousel-arrow-right ${!scrollState.canScrollRight ? 'disabled' : ''}`}
          onClick={() => scrollCarousel('right')}
          disabled={!scrollState.canScrollRight}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClubCarousel;

