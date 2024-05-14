import React from 'react'
import Feature from "../Feature/Feature.jsx"
import Hero from "../Hero/Hero.jsx"
/* Données pour chaque composant feature */
import featureJson from "../../data/feature.json"

function MainHome() {
    const features = featureJson.features;
    console.log(features)
  return (
    <>
        <Hero />
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {features.map((feature, index) => (
                <Feature
                key={"feature"+index}
                paragraph={feature.paragraph}
                image={feature.image}
                title={feature.title}
                alt={feature.alt}
                />
            ))}
        </section>
    </>
  )
}

export default MainHome