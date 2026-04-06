import { useRef, useState } from "react";
import "./TiltedCard.css";
/**
 * TiltedCard Bileşeni
 * Tüm görsel ve animasyon ayarları bu dosya içindedir.
 */
export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight,
  containerWidth,
  imageHeight,
  imageWidth,
  rotateAmplitude,
  scaleOnHover,
  showTooltip,
  displayOverlayContent,
  overlayContent,
}) {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0);

  // Mouse hareketine göre açıyı hesaplayan fonksiyon
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    setRotate({
      x: (dy / yc) * rotateAmplitude,
      y: (dx / xc) * -rotateAmplitude,
    });
  };

  const handleMouseEnter = () => {
    setScale(scaleOnHover);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setScale(1);
    setRotate({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <>
      {/* Bileşene özel CSS stilleri */}
      <style>{`
        .tilted-card-figure {
          position: relative;
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tilted-card-inner {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .tilted-card-img {
          display: block;
          object-fit: cover; /* Üst kısmı göstermek için cover kullanıldı */
          object-position: top; /* Web sitesinin header kısmını odak noktası yapar */
          border-radius: 15px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          background: #111;
        }
        .browser-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          padding: 0 15px;
          gap: 6px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          z-index: 10;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }
        .tilted-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transform: translateZ(40px); /* Yazıyı kartın üstünde yüzdürür */
          pointer-events: none;
        }
        .tilted-card-caption {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: black;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          transition: opacity 0.3s;
        }
          
      `}</style>

      <div
        ref={containerRef}
        className="tilted-card-figure"
        style={{ width: containerWidth, height: containerHeight }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="tilted-card-inner"
          style={{
            width: imageWidth,
            height: imageHeight,
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${scale})`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <div className="browser-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <img
            src={imageSrc}
            alt={altText}
            className="tilted-card-img"
            style={{ width: imageWidth, height: imageHeight, paddingTop: '30px' }}
          />

          {displayOverlayContent && (
            <div className="tilted-card-overlay">
              {overlayContent}
            </div>
          )}

          {showTooltip && (
            <div className="tilted-card-caption" style={{ opacity }}>
              {captionText}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 