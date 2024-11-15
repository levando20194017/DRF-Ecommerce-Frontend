import "../style.scss";
import React, { useState, useRef, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import item1 from '../../../assets/images/banner.jpg'
import item2 from '../../../assets/images/banner2.jpg'
import item3 from '../../../assets/images/content.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    offset: 200,
    duration: 400,
    easing: 'ease-in-sine',
    delay: 100,
});

const cards = [
    'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const HomeContentDiscount = () => {
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i),
    })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        api.start(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
        })
        if (!down && gone.size === cards.length)
            setTimeout(() => {
                gone.clear()
                api.start(i => to(i))
            }, 600)
    })

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 900);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="home-content">
            <h1 className="product-title mt-4">
                <span>P</span>
                <span>R</span>
                <span>O</span>
                <span>D</span>
                <span>U</span>
                <span>C</span>
                <span>T</span>
            </h1>
            <div className="d-flex container content-display mt-5">
                <div className="content-display_left" data-aos="zoom-out">
                    <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
                                aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" ></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div>
                                    <div className="carousel-caption text-start">
                                        <div className="wrapper">
                                            <div className="product-img" data-aos="zoom-in">
                                                <div className="list-img">
                                                    {props.map(({ x, y, rot, scale }, i) => (
                                                        <animated.div className="deck" key={i} style={{ x, y }}>
                                                            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                                                            <animated.div
                                                                {...bind(i)}
                                                                style={{
                                                                    transform: interpolate([rot, scale], trans),
                                                                    backgroundImage: `url(${cards[i]})`,
                                                                }}
                                                            />
                                                        </animated.div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="product-info" data-aos="fade-left">
                                                <div className="product-title">
                                                    <h2 className="mt-3">VIVA FLOWER</h2>
                                                </div>
                                                <span className={`discount ${isAnimating ? "animating" : ""}`}>
                                                    <span>-40%</span>
                                                </span>
                                                <div className="product-detail" style={{ color: "black" }}>
                                                    <div><h4>Ưu đãi cực hấp dẫn.</h4></div>
                                                    <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                                                        <div>
                                                            <div>4.9
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            375 Đánh giá
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            1203 Đã bán
                                                        </div>
                                                    </div>
                                                    <div className="mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <span style={{ borderBottom: "1px solid gray" }}>
                                                            Giá chỉ từ: <span style={{ color: "red", fontWeight: "bold" }}>169.000đ</span>
                                                        </span>
                                                    </div>
                                                    <div className="button-add">
                                                        <button> <i className="bi bi-cart4"></i> Add to cart</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <img style={{ borderRadius: "10px", height: "600px", width: "100vw" }} src={item2} />
                            </div>
                            <div className="carousel-item">
                                <div className='d-flex'>
                                    <div className="carousel-caption text-start">
                                        <div className="wrapper">
                                            <div className="product-img" data-aos="zoom-in">
                                                <div className="list-img">
                                                    {props.map(({ x, y, rot, scale }, i) => (
                                                        <animated.div className="deck" key={i} style={{ x, y }}>
                                                            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                                                            <animated.div
                                                                {...bind(i)}
                                                                style={{
                                                                    transform: interpolate([rot, scale], trans),
                                                                    backgroundImage: `url(${cards[i]})`,
                                                                }}
                                                            />
                                                        </animated.div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="product-info" data-aos="fade-left">
                                                <div className="product-title">
                                                    <h2 className="mt-3">VIVA FLOWER</h2>
                                                </div>
                                                <span className={`discount ${isAnimating ? "animating" : ""}`}>
                                                    <span>-40%</span>
                                                </span>
                                                <div className="product-detail" style={{ color: "black" }}>
                                                    <div><h4>Ưu đãi cực hấp dẫn.</h4></div>
                                                    <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                                                        <div>
                                                            <div>4.9
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            375 Đánh giá
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            1203 Đã bán
                                                        </div>
                                                    </div>
                                                    <div className="mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <span style={{ borderBottom: "1px solid gray" }}>
                                                            Giá chỉ từ: <span style={{ color: "red", fontWeight: "bold" }}>169.000đ</span>
                                                        </span>
                                                    </div>
                                                    <div className="button-add">
                                                        <button> <i className="bi bi-cart4"></i> Add to cart</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <img style={{ borderRadius: "10px", height: "600px", width: "100vw" }} src={item2} />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div>
                                    <div className="carousel-caption text-start">
                                        <div className="wrapper">
                                            <div className="product-img" data-aos="zoom-in">
                                                <div className="list-img">
                                                    {props.map(({ x, y, rot, scale }, i) => (
                                                        <animated.div className="deck" key={i} style={{ x, y }}>
                                                            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                                                            <animated.div
                                                                {...bind(i)}
                                                                style={{
                                                                    transform: interpolate([rot, scale], trans),
                                                                    backgroundImage: `url(${cards[i]})`,
                                                                }}
                                                            />
                                                        </animated.div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="product-info" data-aos="fade-left">
                                                <div className="product-title">
                                                    <h2 className="mt-3">VIVA FLOWER</h2>
                                                </div>
                                                <span className={`discount ${isAnimating ? "animating" : ""}`}>
                                                    <span>-40%</span>
                                                </span>
                                                <div className="product-detail" style={{ color: "black" }}>
                                                    <div><h4>Ưu đãi cực hấp dẫn.</h4></div>
                                                    <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                                                        <div>
                                                            <div>4.9
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                            </div>
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            375 Đánh giá
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            1203 Đã bán
                                                        </div>
                                                    </div>
                                                    <div className="mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <span style={{ borderBottom: "1px solid gray" }}>
                                                            Giá chỉ từ: <span style={{ color: "red", fontWeight: "bold" }}>169.000đ</span>
                                                        </span>
                                                    </div>
                                                    <div className="button-add">
                                                        <button> <i className="bi bi-cart4"></i> Add to cart</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <img style={{ borderRadius: "10px", height: "600px", width: "100vw" }} src={item3} />
                                </div>

                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}