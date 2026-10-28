const projects = {
  kiss: {category:"MICRO-DRAMA · AI FILM",title:"Kiss of Midnight",image:"assets/kiss-of-midnight.svg",video:"videos/WhatsApp%20Video%202026-10-27%20at%205.49.47%20PM%20(1).mp4",alt:"Cinematic night car scene from Kiss of Midnight",description:"Directed and developed AI-generated visual content for a vertical micro-drama, blending dark gothic romance with sleek modern aesthetics. Atmospheric lighting and mobile-first cinematic framing help capture an intense supernatural bond."},
  gothic: {category:"MICRO-DRAMA · DARK FANTASY",title:"Gothic Fantasy",image:"assets/gothic-fantasy.svg",video:"videos/WhatsApp%20Video%202026-10-27%20at%205.49.54%20PM.mp4",alt:"Vertical dramatic scene from Gothic Fantasy",description:"A dark fantasy vertical micro-drama set in an ominous gothic world, combining brooding architectural scale, moody night lighting, and suspenseful mobile-first cinematic storytelling."},
  badi: {category:"MUSIC VIDEO · AI VISUALS",title:"Badi Mushkil Hai",image:"assets/badi-mushkil.svg",alt:"Concept artwork for Badi Mushkil Hai",description:"An AI-generated music video reimagining a 2000s Bollywood romantic classic, blending nostalgic melody with surreal dreamlike artistry, fluid motion synthesis, and vibrant cinematic palettes."},
  hanuman: {category:"ACTION DRAMA · MYTHOLOGY",title:"Hanuman",image:"assets/hanuman.svg",alt:"Concept artwork for Hanuman",description:"A mythological action drama that brings ancient lore to life on an epic scale, blending high-octane action sequences, striking AI visual effects, and powerful cinematic storytelling."},
  jimmys: {category:"COMMERCIAL · PRODUCT FILM",title:"Jimmy’s Cocktails",image:"assets/jimmys-cocktails.svg",video:"videos/WhatsApp%20Video%202026-10-27%20at%205.48.34%20PM.mp4",alt:"Jimmy’s Cocktails product advertisement",description:"A vibrant AI commercial advertisement for signature cocktail mixers, capturing spontaneous celebration through high-speed macro cinematography, fluid motion control, kinetic lighting, and crisp color grading."},
  luxury: {category:"COMMERCIAL · PRODUCT FILM",title:"Luxury Product Film",image:"assets/jimmys-cocktails.svg",video:"videos/WhatsApp%20Video%202026-10-27%20at%205.54.47%20PM.mp4",alt:"Luxury jewelry product advertisement",description:"A detail-led jewelry spot built around reflective surfaces, close-up product framing, and polished visual styling."}
};
const dialog = document.querySelector("#project-dialog");
const dialogContent = dialog.querySelector(".dialog-content");
document.querySelectorAll("[data-project]").forEach(card => {
  const open = () => {
    const project = projects[card.dataset.project];
    if (!project || project.video) return;
    dialogContent.innerHTML = `<img src="${project.image}" alt="${project.alt}"><div class="dialog-body"><p class="eyebrow">${project.category}</p><h3>${project.title}</h3><p>${project.description}</p><a class="dialog-link" href="mailto:pramod.s.works@gmail.com?subject=${encodeURIComponent("Project enquiry — " + project.title)}">Discuss a similar project ↗</a><p><small>Artwork shown is concept artwork; replace with approved project stills for a production portfolio.</small></p></div>`;
    dialog.showModal();
  };
  card.querySelector(".project-image")?.addEventListener("click", event => {
    if (event.target.closest(".yt-controls")) return;
    const video = card.querySelector(".project-image video");
    if (video) {
      event.preventDefault();
      event.stopPropagation();
      if (video.paused) {
        document.querySelectorAll(".project-image video").forEach(other => { if (other !== video) other.pause(); });
        video.play().catch(() => {});
      } else video.pause();
      return;
    }
    open();
  });
});
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

document.querySelectorAll(".project-image video").forEach(video => {
  const card = video.closest(".project-card");
  const playButton = card?.querySelector("[data-inline-play]");
  const progress = card?.querySelector("[data-progress]");
  const timeLabel = card?.querySelector("[data-time]");
  if (!playButton || !progress || !timeLabel) return;
  const formatTime = seconds => Number.isFinite(seconds) ? Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60).toString().padStart(2, "0") : "0:00";
  const update = () => {
    playButton.textContent = video.paused ? "▶" : "Ⅱ";
    playButton.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
    if (Number.isFinite(video.duration) && video.duration > 0) {
      progress.value = Math.round(video.currentTime / video.duration * 1000);
      progress.style.setProperty("--progress", (video.currentTime / video.duration * 100) + "%");
      timeLabel.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);
    } else timeLabel.textContent = formatTime(video.currentTime);
  };
  playButton.addEventListener("click", async event => {
    event.stopPropagation();
    document.querySelectorAll(".project-image video").forEach(other => {
      if (other !== video) {
        other.pause();
        const otherButton = other.closest(".project-card")?.querySelector("[data-inline-play]");
        if (otherButton) { otherButton.textContent = "▶"; otherButton.setAttribute("aria-label", "Play video"); }
      }
    });
    if (video.paused) { try { await video.play(); } catch (error) {} } else video.pause();
    update();
  });
  progress.addEventListener("click", event => event.stopPropagation());
  progress.addEventListener("input", event => {
    event.stopPropagation();
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Number(progress.value) / 1000 * video.duration;
      update();
    }
  });
  video.addEventListener("timeupdate", update);
  video.addEventListener("loadedmetadata", update);
  video.addEventListener("play", update);
  video.addEventListener("pause", update);
  video.addEventListener("ended", update);
  update();
});

document.querySelector("#year").textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll(".project-card,.about-left,.about-right,.timeline-item,.extras > div,.section-head,.work-footer");
revealItems.forEach(item => item.classList.add("reveal"));
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));