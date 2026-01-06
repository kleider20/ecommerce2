// resources/js/Components/2026/HomeLayout/AutoSlider.jsx
import React, { useState, useEffect, useRef } from 'react';

/**
 * AutoSlider - Componente de slider automático reutilizable
 *
 * Props:
 * - items: Array de elementos a mostrar
 * - renderItem: Función que renderiza cada item
 * - autoPlay: Booleano para activar/desactivar reproducción automática
 * - interval: Tiempo en milisegundos entre cambios (default: 5000)
 * - showDots: Booleano para mostrar puntos de navegación
 * - showArrows: Booleano para mostrar flechas de navegación
 * - className: Clases CSS adicionales
 */
const AutoSlider = ({
  items = [],
  renderItem,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const sliderRef = useRef(null);

  // Efecto para la reproducción automática
  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, items.length, interval]);

  // Funciones de navegación
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % items.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + items.length) % items.length);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  // Reiniciar reproducción automática al hacer hover
  const handleMouseEnter = () => {
    if (autoPlay) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay) {
      setIsPlaying(true);
    }
  };

  if (items.length === 0) return null;

  return (
    <div
      ref={sliderRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider container */}
      <div className="relative">
        {/* Slide actual */}
        <div className="transition-opacity duration-500 ease-in-out">
          {renderItem(items[currentSlide], currentSlide)}
        </div>

        {/* Flechas de navegación */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Slide anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Siguiente slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Puntos de navegación */}
        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Controles de reproducción */}
        {autoPlay && items.length > 1 && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
            aria-label={isPlaying ? 'Pausar slider' : 'Reproducir slider'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AutoSlider;
