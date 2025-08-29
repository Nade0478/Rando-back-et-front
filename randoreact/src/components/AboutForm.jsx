import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './About.css';


const AboutForm = () => {
    return (
        <section
            // className="presentation"
            // style={{
            //     backgroundImage: `url(`${process.env.REACT_APP_API_URL}/storage/public/uploads/cheminForet_1742477581.png`)`, // Assurez-vous que ce chemin est correct
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center'
            // }}
        >
            <div className="content">
                <h3>
                    Le site dédié aux amateurs de randonnée et d’activités en plein air.
                </h3>
                
                <block>
                <p>
                    RandoOuest est votre guide ultime pour découvrir les sentiers
                    de randonnée pédestre les plus beaux et variés du Grand Ouest
                    de la France. Que vous soyez novice ou expérimenté, notre site
                    vous propose des itinéraires adaptés, des conseils pratiques
                    et une communauté de passionnés.
                </p>
                </block>
                <p>
                    Commencez votre exploration dès aujourd'hui avec RandoOuest. Que vous
                    soyez en quête de randonnées en famille, de défis sportifs ou de moments
                    de détente en pleine nature, notre site a tout ce qu'il vous faut
                    pour organiser votre prochaine sortie.
                </p>
                <form>
                    <article>
                        <p>
                            Inscrivez-vous pour recevoir nos itinéraires et conseils exclusifs.
                        </p>
                        {/* Ajoutez des champs de formulaire ici si nécessaire */}
                    </article>
                </form>
            </div>
        </section>
    );
};

export default AboutForm;