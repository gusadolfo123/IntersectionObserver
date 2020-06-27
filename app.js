window.addEventListener("load", function (event) {
  let observers = [];

  startup();

  function startup() {
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    let targets = document.querySelectorAll(".services-item");
    targets.forEach((item, i) => {
      observers[i] = new IntersectionObserver(
        intersectionCallback,
        observerOptions
      );
      observers[i].observe(item);
    });
  }

  function intersectionCallback(entries) {
    entries.forEach(function (entry) {
      let box = entry.target;
      let visiblePct = Math.floor(entry.intersectionRatio * 100);
      console.log(visiblePct);
      if (visiblePct === 100) box.style.opacity = 1;
      else if (visiblePct < 100 && visiblePct > 90) {
        box.style.opacity = 1;
      } else if (visiblePct < 90 && visiblePct > 80) {
        box.style.opacity = 0.9;
      } else if (visiblePct < 80 && visiblePct > 70) {
        box.style.opacity = 0.8;
      } else if (visiblePct < 70 && visiblePct > 60) {
        box.style.opacity = 0.7;
      } else if (visiblePct < 60 && visiblePct > 50) {
        box.style.opacity = 0.6;
      } else if (visiblePct < 50 && visiblePct > 40) {
        box.style.opacity = 0.5;
      } else if (visiblePct < 40 && visiblePct > 30) {
        box.style.opacity = 0.4;
      } else if (visiblePct < 30 && visiblePct > 20) {
        box.style.opacity = 0.3;
      } else if (visiblePct < 20 && visiblePct > 10) {
        box.style.opacity = 0.2;
      } else if (visiblePct < 10 && visiblePct > 0) {
        box.style.opacity = 0.1;
      }
    });
  }
});
