import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import TiltedCard from './TiltedCard';
import project1 from '../assets/project1.jpg';
import project3 from '../assets/project3.jpg';
import silkVideo from '../assets/silk.webm';

const All = () => {
  const [showProducts, setShowProducts] = useState(false);

  // --- FORM DURUMU ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORM GÖNDERME FONKSİYONU ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Çift gönderimi önle

    setIsSubmitting(true);
    setStatus('Gönderiliyor...');

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 15000 // Mail gönderimi 1–2 sn sürebilir, 15 sn bekle
      });

      // 200 gelirse başarılı kabul et (backend success: true döndürüyor)
      if (response.status === 200 && (response.data?.success !== false)) {
        setStatus('✅ Mesaj başarıyla iletildi!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('❌ ' + (response.data?.message || response.data?.error || 'Beklenmeyen bir hata oluştu.'));
      }
    } catch (error) {
      console.error('Form gönderme hatası:', error);

      let errorMessage = 'Bir hata oluştu. ';

      if (error.response) {
        // Backend'den gelen hata
        errorMessage += error.response.data?.message || error.response.data?.error || `HTTP ${error.response.status}`;
      } else if (error.request) {
        // İstek gönderildi ama cevap alınamadı
        errorMessage += 'Backend sunucusuna bağlanılamadı. Lütfen backend\'in çalıştığından emin olun.';
      } else {
        // İstek hazırlanırken hata
        errorMessage += error.message || 'Bilinmeyen bir hata oluştu.';
      }

      setStatus('❌ ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productItems = [
    {
      title: "Semalı Fire Alarm",
      description: "Yanğın Təhlükəsizlik Sistemləri",
      image: project1,
      link: "https://semali-fire-alarm.vercel.app/"
    },
    {
      title: "Dr. Könül Mikayılova",
      description: "Akademik Portfolyo Web Saytı",
      image: project3,
      link: "https://konulmikayilova.com"
    }
  ];

  const skills = ["JavaScript", "HTML", "CSS", "React", "Bootstrap", "PHP", "Python", "Node.js", "C++", "SQL"];

  const languages = [
    { name: "Türkçe", level: 5 },
    { name: "Azerbaycanca", level: 5 },
    { name: "Rusça", level: 4 },
    { name: "İngilizce", level: 3 }
  ];

  const renderStars = (count) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={`star ${s <= count ? 'active' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="main-wrapper">
      <div className="hero">
        <video autoPlay muted loop playsInline className="hero-video-bg">
          <source src={silkVideo} type="video/webm" />
        </video>

        <div className="pipe-overlay"></div>

        <header className="header">
          <div className="logo">Zeynallı</div>
          <div className="product-link" onClick={() => setShowProducts(!showProducts)}>
            {showProducts ? "Close" : "Product"}
          </div>
        </header>

        <div className="content-wrapper">
          <motion.div
            className="left-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="main-title">Portfolyoma <br />Hoş Geldiniz</h1>
            <p className="info-text">
              Yazılım geliştirme, grafik tasarım ve yenilikçi dijital çözümler.
            </p>
            <a href="#contact">
              <button className="buy-btn">İletişime Geç</button>
            </a>
          </motion.div>

          <motion.div
            className="right-about-panel"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="about-content">
              <h3>HAKKIMDA</h3>
              <p>
                Ben Zeynallı.V, bilgisayar mühendisliği öğrencisiyim. Çocukluktan gelen çizim tutkumu grafik tasarım ve yazılımla birleştiriyorum.
                Estetik görselleri güçlü kodlarla harmanlayarak kullanıcı odaklı dijital projeler üretiyorum.
              </p>
              <div className="languages-section">
                <h3>DİLLER</h3>
                {languages.map((lang, index) => (
                  <motion.div key={index} className="language-item" whileHover={{ x: 5 }}>
                    <span className="language-name">{lang.name}</span>
                    {renderStars(lang.level)}
                  </motion.div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <h3>YETENEKLER</h3>
                <div className="skills-grid">
                  {skills.map((skill, index) => (
                    <motion.span key={index} className="skill-tag" whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showProducts && (
            <motion.div
              className="product-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ overflowY: 'auto', display: 'block', paddingTop: '100px' }}
            >
              <div className="close-trigger" onClick={() => setShowProducts(false)}>CLOSE</div>
              <div className="product-overlay-content">
                <div className="projects-grid">
                  {productItems.map((project, idx) => (
                    <motion.div
                      key={idx}
                      className="project-card-wrapper"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <TiltedCard
                        imageSrc={project.image}
                        altText={project.title}
                        captionText=""
                        containerHeight="530px"
                        containerWidth="100%"
                        imageHeight="530px"
                        imageWidth="100%"
                        rotateAmplitude={8}
                        scaleOnHover={1.05}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                          <div className="project-overlay-inner">
                            <h4 className="project-title-overlay">{project.title}</h4>
                            <p className="project-desc-overlay">{project.description}</p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                              Saytı Gör
                            </a>
                          </div>
                        }
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="contact-section">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <h2 className="contact-title">Birlikte Çalışalım</h2>
          <p className="contact-sub">Hayalinizdeki projeyi hayata geçirmek için projenizi anlatın.</p>
          <a href="https://zebsale.com" target="_blank" rel="noopener noreferrer">
            <motion.button className="rgb-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>TEKLİF ALIN</motion.button>
          </a>
        </motion.div>
      </section>

      <section className="footer-contact-section" id="contact">
        <div className="footer-container">
          <motion.div className="social-grid-modern" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="social-title">BAĞLANTI KUR</h3>
            <div className="social-cards-wrapper">
              {[
                { icon: "fab fa-instagram", name: "Instagram", url: "https://instagram.com/zeynallidesign", color: "#E1306C" },
                { icon: "fas fa-envelope", name: "Gmail", url: "mailto:zeynalli0204@gmail.com", color: "#DB4437" },
                { icon: "fab fa-github", name: "GitHub", url: "https://github.com/zeynalliv", color: "#f0f6fc" },
                { icon: "fab fa-linkedin-in", name: "LinkedIn", url: "https://linkedin.com/in/zeynalliv", color: "#0077b5" },
                { icon: "fab fa-whatsapp", name: "WhatsApp", url: "https://wa.me/+905342891802", color: "#25D366" },
                { icon: "fab fa-x-twitter", name: "X (Twitter)", url: "https://x.com/vaqif26", color: "#ffffff" }
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{ ['--card-color']: item.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="social-card-glow" style={{ background: item.color }} aria-hidden />
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-form-wrapper" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="form-inner">
              <h3>BİR PROJENİZ Mİ VAR?</h3>
              <p>Hemen mesajınızı bırakın, en kısa sürede dönüş yapayım.</p>

              <form className="modern-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Adınız"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Mesajınız..."
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="rgb-button small"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'GÖNDERİLİYOR...' : 'GÖNDERİ VER'}
                </button>
                {status && (
                  <p style={{
                    marginTop: '15px',
                    color: status.includes('✅') ? '#4ade80' : status.includes('❌') ? '#f87171' : '#fff',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {status}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default All;