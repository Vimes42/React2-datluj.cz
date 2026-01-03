import './style.css';

interface LandingPageProps {
    handleClick: () => void;
}

export const LandingPage = ({handleClick}: LandingPageProps) => {
    
    return (
        <div className="landing-page">
            <h2>Nauč se psát rychle na klávesnici!</h2>
            <p>V této hře jde o to, napsat za minutu co nejvíce slov správně.</p>
            <button className="btn_start" onClick={handleClick}>Jdeme na to!</button>
        </div>
        )
}