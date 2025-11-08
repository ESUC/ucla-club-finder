
import NavigationBar from "../components/NavigationBar";
import "../css/About.css";

export const About = () => {
  const clubs = [
    { name: "President", description: "Description of Club 1" },
    { name: "Vice-President", description: "Description of Club 2" },
    { name: "Webmaster", description: "Description of Club 3" },
  ];

  return (
    <div className="about-container">
      <div className="header-container">
        <header>
          <h1>Learn more about ESUC and the team</h1>
        </header>
        <NavigationBar />
      </div>
      <section>
        <p>About ESUC</p>
      </section>
      <section>
        <h2>Leadership Team</h2>
        <ul>
          {clubs.map((club, index) => (
            <li key={index}>
              <strong>{club.name}</strong>: {club.description}
            </li>
          ))}
        </ul>
      </section>
      <footer>
        <p>&copy; 2023 My ESUC @ UCLA</p>
      </footer>
    </div>
  );
};


