import { useState, useEffect, useRef } from 'react';

interface MapPosition {
  scale: number;
  translateX: number;
  translateY: number;
}

export const useSvgMapInteractions = (svgRef: React.RefObject<SVGSVGElement>) => {
  const [position, setPosition] = useState<MapPosition>({
    scale: 1,
    translateX: 0,
    translateY: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // Handle zooming
  const handleZoom = (zoomIn: boolean) => {
    setPosition(prev => {
      const newScale = zoomIn ? 
        Math.min(prev.scale * 1.2, 3) : // Zoom in (max 3x)
        Math.max(prev.scale / 1.2, 0.5); // Zoom out (min 0.5x)
      
      return {
        ...prev,
        scale: newScale,
      };
    });
  };

  // Reset map position
  const resetPosition = () => {
    setPosition({
      scale: 1,
      translateX: 0,
      translateY: 0
    });
  };

  // Apply transforms to SVG
  useEffect(() => {
    if (svgRef.current) {
      const svg = svgRef.current;
      try {
        svg.style.transform = `scale(${position.scale}) translate(${position.translateX}px, ${position.translateY}px)`;
        svg.style.transformOrigin = 'center';
        svg.style.transition = isDragging ? 'none' : 'transform 0.3s ease';
      } catch (err) {
        console.error('Error applying transform:', err);
      }
    }
  }, [position, isDragging, svgRef]);

  // Event handlers for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = (e.clientX - startPosition.x) / position.scale;
    const deltaY = (e.clientY - startPosition.y) / position.scale;
    
    setPosition(prev => ({
      ...prev,
      translateX: prev.translateX + deltaX,
      translateY: prev.translateY + deltaY
    }));
    
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    handleZoom,
    resetPosition,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    position
  };
};
