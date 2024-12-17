import { useKeenSlider } from "keen-slider/react";
import Arrow from "./Arrow";
import { Link } from "react-router-dom";

function Gallery({ slidesPerView = 3, items = [] }) {
  // Accept items prop

  // Default items if none are provided
  const defaultItems = [
    {
      banner:
        "https://i.pinimg.com/736x/0a/fa/b1/0afab1ff2416d9da680f527c6fe06419.jpg",
      // link: "#link1",
    },
    {
      banner:
        "https://i.pinimg.com/736x/7a/d4/27/7ad42704853ac6d77de1695224404749.jpg",
      // link: "#link2",
    },
    {
      banner:
        "https://i.pinimg.com/736x/df/e2/bf/dfe2bf83f10b7a8c665d7ad47889c5d2.jpg",
      // link: "#link3",
    },
    {
      banner:
        "https://i.pinimg.com/736x/43/50/56/435056f51ad4f0918d5f318938b6a5a6.jpg",
      // link: "#link4",
    },
    {
      banner:
        "https://i.pinimg.com/736x/69/9f/70/699f70c8f4229a7f77020d43e56198d4.jpg",
      // link: "#link5",
    },
  ];

  // Use provided items or fallback to default items
  const img = (items.length > 0 ? items : defaultItems).map((item) => ({
    src: item.banner,
    href: item.link,
  }));

  const renderBanner = img.map((item, index) => {
    return (
      <div className="flex justify-center items-center" key={index}>
        <div className={`keen-slider__slide number-slide${index + 1}`}>
          <Link to={item.href}>
            <figure className="flex items-center justify-around w-full">
              <img
                src={item.src}
                alt=""
                className="w-full h-[200px] max-h-80 rounded-lg"
              />
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
        perView: slidesPerView,
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
