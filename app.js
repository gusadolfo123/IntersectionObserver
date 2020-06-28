window.addEventListener("load", function (event) {
  let page = 1;
  let loading = false;
  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  };

  let observers = [];

  startup();

  async function startup() {
    await getData(page);

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
      if (visiblePct === 100) {
        box.style.opacity = 1;
      } else if (visiblePct < 100 && visiblePct > 90) {
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

  async function getBackImage(imagePath) {
    let image = "";
    if (imagePath !== null) {
      image = await fetch(`https://image.tmdb.org/t/p/w300${imagePath}`)
        .then((response) => {
          return response.blob();
        })
        .then((data) => {
          var objectURL = URL.createObjectURL(data);
          return objectURL;
        })
        .catch((err) => console.log(err));
    }

    return image || "./assets/image1.jpg";
  }

  async function callMovies(page) {
    const movies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=4a99f059286e8f1fda13d537d9ae444b&language=es-ES&page=${page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => data.results)
      .catch((err) => console.log(err));

    return movies;
  }

  async function getData(page) {
    const movies = await callMovies(page);
    movies.forEach(async (item) => {
      await createItem(item);
    });
  }

  async function createItem(item) {
    const imagePath = await getBackImage(item.backdrop_path);
    let card = `<div class="services-item">
          <div class="card">
            <div class="card__title">
              <img src="${imagePath}" alt="" class="card__title-img" />
            </div>
            <div class="card__body">
              <p>
               ${item.overview.substring(0, 100)}...
              </p>
            </div>
            <div class="card__footer">
              <p class="card_footer-price">${item.title}</p>
            </div>
          </div>
        </div>`;

    let root = document.querySelector(".services");
    root.innerHTML += card;
    let observers = [];
    let targets = document.querySelectorAll(".services-item");
    targets.forEach((item, i) => {
      observers[i] = new IntersectionObserver(
        intersectionCallback,
        observerOptions
      );
      observers[i].observe(item);
    });
  }
  window.onscroll = async function (ev) {
    documentHeight = window.innerHeight + window.scrollY;
    bodyHeight = document.body.offsetHeight;

    if (documentHeight >= bodyHeight - 100) {
      if (!loading) {
        loading = true;
        page += 1;
        await getData(page);
        loading = false;
      }
    }
  };
});
