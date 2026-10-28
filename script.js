const projects = {
  kiss: {category:"MICRO-DRAMA · AI FILM",title:"Kiss of Midnight",image:"assets/kiss-of-midnight.svg",alt:"Concept artwork for Kiss of Midnight",description:"Directed and developed AI-generated visual content for a vertical micro-drama, blending dark gothic romance with sleek modern aesthetics. Atmospheric lighting and mobile-first cinematic framing help capture an intense supernatural bond."},
  gothic: {category:"MICRO-DRAMA · DARK FANTASY",title:"Gothic Fantasy",image:"assets/gothic-fantasy.svg",alt:"Concept artwork for Gothic Fantasy",description:"A dark fantasy vertical micro-drama set in an ominous gothic world, combining brooding architectural scale, moody night lighting, and suspenseful mobile-first cinematic storytelling."},
  badi: {category:"MUSIC VIDEO · AI VISUALS",title:"Badi Mushkil Hai",image:"assets/badi-mushkil.svg",alt:"Concept artwork for Badi Mushkil Hai",description:"An AI-generated music video reimagining a 2000s Bollywood romantic classic, blending nostalgic melody with surreal dreamlike artistry, fluid motion synthesis, and vibrant cinematic palettes."},
  hanuman: {category:"ACTION DRAMA · MYTHOLOGY",title:"Hanuman",image:"assets/hanuman.svg",alt:"Concept artwork for Hanuman",description:"A mythological action drama that brings ancient lore to life on an epic scale, blending high-octane action sequences, striking AI visual effects, and powerful cinematic storytelling."},
  jimmys: {category:"COMMERCIAL · PRODUCT FILM",title:"Jimmy’s Cocktails",image:"assets/jimmys-cocktails.svg",alt:"Concept artwork for Jimmy’s Cocktails",description:"A vibrant AI commercial advertisement for signature cocktail mixers, capturing spontaneous celebration through high-speed macro cinematography, fluid motion control, kinetic lighting, and crisp color grading."}
};
const dialog = document.querySelector("#project-dialog");
const dialogContent = dialog.querySelector(".dialog-content");
document.querySelectorAll("[data-project]").forEach(card => {
  const open = () => {
    const project = projects[card.dataset.project];
    if (!project) return;
    dialogContent.innerHTML = `<img src="${project.image}" alt="${project.alt}"><div class="dialog-body"><p class="eyebrow">${project.category}</p><h3>${project.title}</h3><p>${project.description}</p><a class="dialog-link" href="mailto:pramod.s.works@gmail.com?subject=${encodeURIComponent("Project enquiry — " + project.title)}">Discuss a similar project ↗</a><p><small>Artwork shown is concept artwork; replace with approved project stills for a production portfolio.</small></p></div>`;
    dialog.showModal();
  };
  card.querySelector("button")?.addEventListener("click", open);
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.querySelector("#year").textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll(".project-card,.about-left,.about-right,.timeline-item,.extras > div,.section-head,.work-footer");
revealItems.forEach(item => item.classList.add("reveal"));
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));