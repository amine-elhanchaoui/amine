
import './Home.css'
import me from '../../dist/imgs/ana.jpeg'
export default function Home() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h2>Welcome to My Projects</h2>
            <img className='me' src={me} alt="" />
            <div className='home'>
                <p className='pres'>Hi, I’m Amine, a passionate Full Stack Developer with a strong interest in building modern, scalable, and user-friendly web applications.

                    I work with JavaScript, React, Node.js, PHP, and REST APIs, and I enjoy turning ideas into clean, functional, and efficient digital solutions.

                    I have experience working on real-world projects, handling both frontend and backend development, integrating third-party APIs, and solving technical problems step by step. I focus on writing clean, maintainable code, optimizing performance, and delivering a smooth user experience.

                    Beyond coding, I’m constantly learning new technologies, improving my skills, and challenging myself through new projects. My goal is to grow as a developer and contribute to impactful products within professional teams.</p>
                <p className='tech'>
                    Programming Languages & Technologies:
                    <span>JavaScript, PHP, React, Node.js, Express, REST APIs, HTML, CSS, Git</span>

                </p>
            </div>
        </div>
    );
}