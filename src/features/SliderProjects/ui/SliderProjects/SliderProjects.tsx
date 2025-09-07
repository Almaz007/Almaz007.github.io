import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { Arrow } from "@/shared/ui";

interface Props {
    items: any[];
}

export function SliderProjects({ items }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 3,
            spacing: 30,
        },
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <div className="slider__block">
            {loaded && instanceRef.current && (
                <div className={styles["control"]}>
                    <Arrow
                        disabled={currentSlide === 0}
                        onClick={() => instanceRef.current?.prev()}
                        direction="left"
                    />
                    <Arrow
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                        onClick={() => instanceRef.current?.next()}
                        direction="right"
                    />
                </div>
            )}

            <div ref={sliderRef} className="keen-slider">
                {items.map((Item, index) => (
                    <div key={index} className="keen-slider__slide">
                        {Item}
                    </div>
                ))}
            </div>
        </div>
    );
}
