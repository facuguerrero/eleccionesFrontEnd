import React from 'react';
import './About.scss'

class About extends React.Component {

    render() {
        return (
            <div className="main-about flex-column white-bc-color-light">
                <div className="text-container">
                    <span className="black-font-color-light font-xlg bold-text">Sobre el proyecto</span>
                    <p className="font-md fifth-font-color">
                        Análisis en tiempo real de las elecciones presidenciales argentinas del 2019 en Twitter
                    </p>
                    <p className="font-xmd black-font-color-light">
                        Se busca analizar el comportamiento de los usuarios en la red social Twitter
                        y calcular, a través del análisis del contenido publicado por dichos usuarios, métri-
                        cas que nos permitan determinar la afinidad de los mismos hacia ciertos candidatos a
                        presidente y vicepresidente de la República Argentina y la similitud entre el contenido
                        que comparten.
                    </p>
                    <p className="font-xmd black-font-color-light">
                        El cálculo de las métricas se realiza día a día, teniendo en cuenta siempre los
                        datos obtenidos en el día y los ya existentes en el sistema, con el objetivo de analizar
                        la evolución temporal de las mismas.
                    </p>
                    <p className="font-xmd black-font-color-light">
                        A través del análisis de las métricas generadas se propone entender las similitu-
                        des y diferencias entre los usuarios que muestran afinidad hacia un candidato u otro,
                        como así también las tendencias y flujos de opinión entre los usuarios que muestran
                        afinidad hacia uno u otro candidato.
                    </p>
                    <div className="h"/>
                    <span className="black-font-color-light font-lg bold-text">Involucrados</span>
                    <p className="font-md fifth-font-color">
                        El proyecto se desarrolla por los alumnos de la carrera Ingeniería en Informática de
                        la Universidad de Buenos Aires
                    </p>
                    <ul>
                    <li className="margin-about font-xmd black-font-color-light list-item-about">
                        Facundo Ismael GUERRERO</li>
                    <li className="margin-about font-xmd black-font-color-light list-item-about">
                        Marcos Ezequiel SCHAPIRA</li>
                    <li className="margin-about font-xmd black-font-color-light list-item-about">
                        Rodrigo DE ROSA</li>
                    </ul>
                    <p className="font-md fifth-font-color">
                        Con los tutores
                    </p>
                    <ul>
                        <li className="margin-about font-xmd black-font-color-light list-item-about">
                            Dr. José Ignacio ALVAREZ-HAMELIN</li>
                        <li className="margin-about font-xmd black-font-color-light list-item-about">
                            Dr. Mariano Gastón BEIRÓ</li>
                    </ul>
                    <div className="h"/>
                    <span className="black-font-color-light font-lg bold-text">
                        Estado del desarrollo</span>
                    <p className="font-md fifth-font-color">
                        Fecha tentativa de finalización: Noviembre 2019
                    </p>
                    <p className="font-xmd black-font-color-light">
                        El proyecto se encuentra en una etapa de desarrollo constante en la que se
                        agregará contenido y modificará el mismo diariamente.
                    </p>
                </div>
            </div>
        );
    }

}

export default About;
