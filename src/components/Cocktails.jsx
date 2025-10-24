import { cocktailLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Cocktails = () => {
  useGSAP(() => {
    // Parallax Effect
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom top",
        scrub: true,
      },
    });

    parallaxTimeline.from("#c-left-leaf", { x: -100, y: 100 });
    parallaxTimeline.from("#c-right-leaf", { x: 100, y: 100 });
  }, []);
  return (
    <section id="cocktails" className="noisy">
      <img
        src="/images/cocktail-left-leaf.png"
        alt="cocktails-left-leaf"
        id="c-left-leaf"
      />

      <img
        src="/images/cocktail-right-leaf.png"
        alt="cocktails-right-leaf"
        id="c-right-leaf"
      />

      <div className="list">
        <div className="popular">
          <h2>Popular drinks : </h2>
          <ul>
            {cocktailLists.map(({ name, country, details, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {details}
                  </p>
                </div>
                <span>{price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Loved drinks : </h2>
          <ul>
            {cocktailLists.map(({ name, country, details, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {details}
                  </p>
                </div>
                <span>{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
