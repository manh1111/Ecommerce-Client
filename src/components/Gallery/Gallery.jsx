import { useKeenSlider } from "keen-slider/react";
import Arrow from "./Arrow";
import { Link } from "react-router-dom";

function Gallery() {
  const items = [
    {
      banner:
        "https://photo-zmp3.zmdcdn.me/banner/1/4/5/3/1453793acd6e99638c757e7db976e01f.jpg",
      link: "#link1",
    },
    {
      banner:
        "https://photo-zmp3.zmdcdn.me/banner/3/8/b/2/38b2ee1fa054de2b745e4e7d27fb2db0.jpg",
      link: "#link2",
    },
    {
      banner:
        "https://photo-zmp3.zmdcdn.me/banner/1/4/5/3/1453793acd6e99638c757e7db976e01f.jpg",
      link: "#link3",
    },
    {
      banner:
        "https://photo-zmp3.zmdcdn.me/banner/5/0/3/b/503b76b9c1d5102e06fe07c26b507a5c.jpg",
      link: "#link4",
    },
    {
      banner:
        "https://photo-zmp3.zmdcdn.me/banner/b/d/d/e/bddeb09c0439d7fb5ce1b28751400483.jpg",
      link: "#link5",
    },
  ];

  const img = items.map((item) => ({
    src: item.banner,
    href: item.link,
  }));

  const renderBanner = img.map((item, index) => {
    return (
      <div className="flex justify-center items-center" key={index}>
        <div className={`keen-slider__slide number-slide${index + 1}`}>
          <Link to="/">
            <figure className="flex items-center justify-around w-full">
              <img src={item.src} alt="" className="w-full h-full rounded-lg" />
            </figure>
          </Link>
        </div>
      </div>
    );
  });

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        perView: 3,
        spacing: 25,
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("animationStarted", nextTimeout);
        slider.on("updated", nextTimeout);
        slider.on("destroyed", clearNextTimeout);
      },
    ]
  );
  return (
    <div className="relative pt-8 group">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 opacity-0 group-hover:opacity-100">
        <Arrow
          left
          onClick={(e) => {
            e.stopPropagation() || instanceRef.current.prev();
          }}
        />
      </div>

      <div
        ref={sliderRef}
        className="keen-slider flex overflow-hidden relative"
      >
        {renderBanner}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 opacity-0 group-hover:opacity-100">
        <Arrow
          onClick={(e) => e.stopPropagation() || instanceRef.current.next()}
        />
      </div>
    </div>
  );
}

export default Gallery;
