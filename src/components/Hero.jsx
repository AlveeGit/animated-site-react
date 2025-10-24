import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // GSAP animations can be added here

    //   hero title animation
    const hreoSplit = new SplitText(".title", { type: "chars, words" });
    hreoSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });
    gsap.from(hreoSplit.chars, {
      yPercent: 100,
      duration: 2,
      ease: "expo.out",
      stagger: 0.1,
    });

    //   subtitle animation
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.1,
      delay: 1,
    });

    //   leaf animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    //   video play animation
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const videoTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      videoTimeline.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">Mojo</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cold . Delicious . Simple</p>
              <p className="subtitle">
                The perfect cocktail <br /> for any occasion
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore itaque, repellendus quibusdam nobis repellat quis.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0 ">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
