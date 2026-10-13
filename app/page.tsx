"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const instagram = "https://www.instagram.com/pm_usa77";
const navigation = [{ href: "#studio", label: "The studio" }, { href: "#services", label: "The details" }, { href: "#approach", label: "The approach" }, { href: "#faq", label: "Good to know" }];
const services = [
  { number: "01", title: "Brows", subtitle: "The frame", text: "Explore shape, softness, and definition that complements your features.", image: "/images/iris-brows.webp", alt: "AI editorial close-up of natural eyebrow hairs and an eye", crop: "brow-crop" },
  { number: "02", title: "Lips", subtitle: "The color", text: "A conversation about balanced color, subtle definition, and your preferred finish.", image: "/images/iris-lips.webp", alt: "AI editorial close-up of softly colored rose lips", crop: "lip-crop" },
  { number: "03", title: "Eyes", subtitle: "The expression", text: "Discuss delicate eye definition and ask the studio which techniques are available.", image: "/images/iris-portrait.webp", alt: "AI beauty campaign portrait showing natural brows and lowered eyes", crop: "eye-crop" }
];
const faqs = [
  { question: "Where should I begin?", answer: "Start with a conversation. Share the look you have in mind with the studio and ask about suitability, available techniques, and what to expect before arranging treatment." },
  { question: "How can I book a consultation?", answer: "Call (201) 772-0804 or visit @pm_usa77 on Instagram to ask about consultation availability. Your appointment is confirmed directly by the studio; this website does not reserve a time." },
  { question: "What should I know about preparation and aftercare?", answer: "Ask the artist for the instructions specific to your treatment, as well as a clear explanation of risks, healing, follow-up, and suitability. Confirm the studio’s current safety and aftercare protocols before your appointment." },
  { question: "Where is the studio?", answer: "The public professional directory lists IRIS Permanent Makeup Studio in Jersey City, New Jersey. Confirm the exact address, suite, and arrival instructions with the studio before your visit." },
  { question: "Are these photographs client results?", answer: "These images are original AI-generated beauty campaign concepts. They show the visual direction of this demo and do not depict IRIS clients, treatment results, or the actual studio. Visit the studio’s Instagram to explore its own work." }
];

function Arrow({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`arrow-icon ${down ? "arrow-down" : ""}`}><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Flower({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" className={`flower-symbol ${className}`} viewBox="0 0 100 100" fill="none"><g stroke="currentColor" strokeWidth="1.1"><ellipse cx="50" cy="50" rx="16" ry="43" /><ellipse cx="50" cy="50" rx="16" ry="43" transform="rotate(60 50 50)" /><ellipse cx="50" cy="50" rx="16" ry="43" transform="rotate(120 50 50)" /><circle cx="50" cy="50" r="7" /></g></svg>;
}
function ButtonLink({ href, children, variant = "primary", className = "", external = false }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "light"; className?: string; external?: boolean }) {
  return <a href={href} className={`button button-${variant} ${className}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}><span className="button-label">{children}</span><span className="button-arrow"><Arrow /></span></a>;
}
function ThemeButton({ dark, onClick }: { dark: boolean; onClick: () => void }) {
  return <button type="button" className="icon-button theme-button" onClick={onClick} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} aria-pressed={dark} title={`${dark ? "Light" : "Dark"} mode`}><span className={`theme-icon ${dark ? "show-sun" : "show-moon"}`}><svg className="sun-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg><svg className="moon-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" strokeLinejoin="round" /></svg></span></button>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [ambientPaused, setAmbientPaused] = useState(false);
  const [mobileBookingVisible, setMobileBookingVisible] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNavigation = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setMobileBookingVisible(true);
      return;
    }
    const visibleActions = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleActions.add(entry.target);
        else visibleActions.delete(entry.target);
      }
      setMobileBookingVisible(visibleActions.size === 0);
    });
    document.querySelectorAll(".hero-actions, .booking-actions").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const readStoredTheme = () => { try { return localStorage.getItem("iris-theme"); } catch { return null; } };
    setDark(document.documentElement.dataset.theme === "dark");
    const onSystemTheme = () => { if (readStoredTheme() === null) { document.documentElement.dataset.theme = preference.matches ? "dark" : "light"; setDark(preference.matches); } };
    preference.addEventListener("change", onSystemTheme);
    return () => preference.removeEventListener("change", onSystemTheme);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    const closeOnOutside = (event: PointerEvent) => { if (event.target instanceof Node && !mobileNavigation.current?.contains(event.target) && !menuButton.current?.contains(event.target)) setMenuOpen(false); };
    const closeOnDesktop = () => { if (window.innerWidth > 1100) setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown); document.addEventListener("pointerdown", closeOnOutside); window.addEventListener("resize", closeOnDesktop);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", closeOnOutside); window.removeEventListener("resize", closeOnDesktop); };
  }, [menuOpen]);
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const updateMotion = () => {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) { delete root.dataset.motion; }
      else {
        root.dataset.motion = "ready";
        observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer?.unobserve(entry.target); } }); }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
        document.querySelectorAll(".reveal").forEach((element) => observer?.observe(element));
      }
    };
    let frame = 0;
    const updateScroll = () => { frame = 0; const range = root.scrollHeight - window.innerHeight; root.style.setProperty("--scroll-progress", String(range > 0 ? Math.min(1, window.scrollY / range) : 0)); root.style.setProperty("--hero-drift", preference.matches || window.innerWidth < 960 ? "0px" : `${Math.min(window.scrollY * .06, 36)}px`); root.dataset.scrolled = window.scrollY > 24 ? "true" : "false"; };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateScroll); };
    updateMotion(); updateScroll(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); preference.addEventListener("change", updateMotion);
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); preference.removeEventListener("change", updateMotion); delete root.dataset.motion; };
  }, []);
  const toggleTheme = () => { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; try { localStorage.setItem("iris-theme", next ? "dark" : "light"); } catch { /* Theme works without storage. */ } };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="reading-progress" aria-hidden="true" /><div className="header-inner"><a className="wordmark" href="#top" aria-label="IRIS Permanent Makeup Studio home">IRIS<span>PERMANENT MAKEUP</span></a><nav className="desktop-navigation" aria-label="Main navigation">{navigation.map((link) => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}</nav><div className="header-actions"><ThemeButton dark={dark} onClick={toggleTheme} /><ButtonLink href="#book" className="header-booking">Let’s talk</ButtonLink><button type="button" ref={menuButton} className={`icon-button menu-button ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div></div><nav id="mobile-navigation" ref={mobileNavigation} className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>{navigation.map((link, index) => <a key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span className="micro-label">0{index + 1}</span>{link.label}<Arrow /></a>)}<a href="#book" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="mobile-consultation">Book a consultation <Arrow /></a><p className="micro-label">Jersey City, New Jersey</p></nav></header>

    <main id="main" data-ambient-paused={ambientPaused}>
      <section id="top" className="hero section-shell"><div className="hero-copy"><p className="eyebrow hero-intro"><span className="tiny-orbit" aria-hidden="true" />Permanent makeup · Jersey City</p><h1 className="display hero-heading"><span className="hero-line">The art of</span><span className="hero-line hero-italic"><em>quiet</em><span className="hero-rule" aria-hidden="true" /></span><span className="hero-line">confidence.</span></h1><p className="hero-description">A little definition. A little less effort.<br />A beauty ritual that feels entirely your own.</p><div className="hero-actions"><ButtonLink href="#book">Book a consultation</ButtonLink><a href={instagram} target="_blank" rel="noopener noreferrer" className="text-link">Explore Instagram <Arrow /></a></div><a className="hero-scroll text-link" href="#studio"><span className="scroll-orbit"><Arrow down /></span><span className="micro-label">A closer look</span></a></div><div className="hero-art"><div className="hero-art-outline" aria-hidden="true" /><figure className="hero-portrait media-frame"><Image src="/images/iris-portrait.webp" alt="AI-generated beauty campaign portrait of a fictional woman in sculptural warm light" fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 48vw, 640px" priority className="image-cover" /><figcaption className="image-credit">AI editorial concept</figcaption></figure><div className="hero-seal"><Flower /><span>Beauty, beautifully<br /><em>considered.</em></span></div><div className="hero-side-note micro-label">Softness is a statement</div><div className="hero-art-caption"><span className="micro-label">IRIS / The beauty edit</span><span className="micro-label">No. 01</span></div></div></section>

      <div className="signature-strip"><div className="signature-track" aria-hidden="true">{[0, 1].map((repeat) => <div className="signature-set" key={repeat}><span>Less routine.</span><Flower /><em>More you.</em><Flower /><span>Quiet artistry.</span><Flower /><em>Considered beauty.</em><Flower /></div>)}</div><button type="button" className="icon-button motion-toggle" aria-label={ambientPaused ? "Resume decorative animations" : "Pause decorative animations"} aria-pressed={ambientPaused} title={ambientPaused ? "Resume motion" : "Pause motion"} onClick={() => setAmbientPaused(!ambientPaused)}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{ambientPaused ? <path d="m9 5 10 7-10 7V5Z" strokeLinejoin="round" /> : <path d="M9 5v14M15 5v14" strokeLinecap="round" />}</svg></button></div>

      <section id="studio" className="studio-section section-shell section-spacing"><div className="studio-image-block reveal"><figure className="studio-image media-frame"><Image src="/images/iris-still-life.webp" alt="AI editorial still life of an ivory iris flower, stone, and brass mirror" fill sizes="(max-width: 720px) 90vw, 500px" className="image-cover" /><figcaption className="image-credit">AI editorial concept</figcaption></figure><span className="studio-image-caption micro-label">A study in softness · IRIS</span><div className="studio-image-accent" aria-hidden="true" /></div><div className="studio-copy reveal reveal-delay-1"><p className="eyebrow">01 / The studio</p><h2 className="display section-heading">Beauty in the<br /><em>smallest details.</em></h2><p className="lead-copy">An introduction to IRIS Permanent Makeup Studio, based in Jersey City, New Jersey.</p><p className="body-copy">Explore a quieter approach to beauty, then start a conversation about the look you have in mind. Ask about the available treatments, your individual suitability, and the details that matter to you.</p><div className="studio-facts"><div><span className="display">Jersey City</span><span className="micro-label">New Jersey</span></div><div><span className="display">@pm_usa77</span><span className="micro-label">The studio’s Instagram</span></div></div><a href={instagram} target="_blank" rel="noopener noreferrer" className="text-link">Get to know the studio <Arrow /></a></div></section>

      <section id="services" className="services-section section-spacing"><div className="section-shell"><div className="section-topline reveal"><p className="eyebrow">02 / The details</p><span className="small-note">Concept menu · availability to confirm</span></div><div className="services-heading reveal"><h2 className="display section-heading">A softer kind<br />of <em>statement.</em></h2><p className="body-copy">Three beauty directions to explore in a consultation. Confirm the studio’s current services and techniques before booking.</p></div><div className="services-grid">{services.map((service, index) => <article key={service.number} className={`service-card reveal reveal-delay-${index}`}><a className="service-image media-frame" href="#book" aria-label={`Discuss ${service.title.toLowerCase()} with the studio`}><Image src={service.image} alt={service.alt} fill sizes="(max-width: 720px) 90vw, (max-width: 1100px) 30vw, 420px" className={`image-cover ${service.crop}`} /><span className="service-number micro-label">/{service.number}</span><span className="service-image-arrow"><Arrow /></span><span className="image-credit">AI editorial concept</span></a><div className="service-title"><h3 className="display">{service.title}</h3><span className="micro-label">{service.subtitle}</span></div><p className="body-copy">{service.text}</p><a href="#book" className="text-link service-link">Explore in consultation <Arrow /></a></article>)}</div><p className="media-disclosure reveal">Original AI campaign imagery. Explore the studio’s own work on its <a href={instagram} target="_blank" rel="noopener noreferrer" className="inline-link">Instagram profile</a>.</p></div></section>

      <section id="approach" className="approach-section section-shell section-spacing"><div className="approach-copy reveal"><p className="eyebrow">03 / The conversation</p><h2 className="display section-heading">Begin with<br /><em>intention.</em></h2><p className="body-copy">Good questions make room for thoughtful decisions. Here’s what to discuss with your artist.</p><Flower className="approach-flower" /></div><div className="approach-steps">{[{ title: "Your features. Your vision.", text: "Share your goals and ask what is suitable for your features, skin, and existing permanent makeup." }, { title: "The details, before you decide.", text: "Discuss technique, shape, color, pricing, risks, and the appointment plan before committing to treatment." }, { title: "Care beyond the appointment.", text: "Request the studio’s specific preparation, healing, aftercare, and follow-up guidance." }].map((step, index) => <div className={`approach-step reveal reveal-delay-${index}`} key={step.title}><span className="step-number display">0{index + 1}</span><div><h3>{step.title}</h3><p className="body-copy">{step.text}</p></div></div>)}</div></section>

      <section className="editorial-moment"><div className="section-shell reveal"><p className="eyebrow">The IRIS edit</p><p className="display">A little more ease.<br /><em>A little more you.</em></p><Flower /></div></section>

      <section id="faq" className="faq-section section-shell section-spacing"><div className="faq-intro reveal"><p className="eyebrow">04 / Good to know</p><h2 className="display section-heading">The little<br /><em>questions.</em></h2><p className="body-copy">A thoughtful beginning starts with a little clarity.</p><a href="#book" className="text-link">Have something else in mind? <Arrow /></a></div><div className="faq-list reveal reveal-delay-1">{faqs.map((faq, index) => <div className={`faq-item ${openFaq === index ? "is-open" : ""}`} key={faq.question}><h3><button type="button" className="faq-button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} id={`faq-question-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.question}</span><span className="faq-plus" aria-hidden="true"><span /><span /></span></button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={openFaq !== index} className="faq-panel"><div><p className="body-copy">{faq.answer}</p></div></div></div>)}</div></section>

      <section id="book" className="booking-section"><div className="booking-orbit" aria-hidden="true" /><div className="booking-orbit orbit-two" aria-hidden="true" /><div className="section-shell booking-inner reveal"><div><p className="eyebrow">A conversation, then a possibility</p><h2 className="display">Your face.<br /><em>Your signature.</em></h2></div><div className="booking-details"><p>Let’s talk about the look<br />you have in mind.</p><div className="booking-actions"><ButtonLink href="tel:+12017720804" variant="light">Call the studio</ButtonLink><ButtonLink href={instagram} variant="outline" external>Connect on Instagram</ButtonLink></div><a href="tel:+12017720804" className="booking-phone text-link">(201) 772-0804 <Arrow /></a><p className="booking-note">Appointments, pricing, the exact studio address, and current services are confirmed directly with IRIS.</p></div></div></section>

      <footer className="site-footer section-shell"><div className="footer-top"><a className="wordmark" href="#top" aria-label="Back to IRIS home">IRIS<span>PERMANENT MAKEUP</span></a><p>Jersey City, New Jersey<br /><a href={instagram} target="_blank" rel="noopener noreferrer" className="inline-link">@pm_usa77</a></p><a href="#top" className="text-link">Back to top <Arrow /></a></div><div className="footer-bottom"><span>IRIS · Website concept</span><span>AI editorial imagery · does not depict client results</span><a href="https://micropigmentation.org/member-search/" target="_blank" rel="noopener noreferrer" className="inline-link">Business details: public directory</a></div></footer>
    </main>
    {mobileBookingVisible ? <div className="mobile-booking-bar"><a href="tel:+12017720804" className="mobile-call" aria-label="Call IRIS at 201 772 0804"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m7 3 3 5-2 2c1 3 3 5 6 6l2-2 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z" strokeLinejoin="round" /></svg></a><ButtonLink href="#book">Book a consultation</ButtonLink></div> : null}
  </>;
}
