import './BoardComponent.css';

const BoardComponent = () => {
  const executive = [
    { name: 'Justin Xu', role: 'External Vice President', image: 'https://www.esuc.ucla.edu/assets/img/team/Justin.svg' },
    { name: 'Jerard Agravante', role: 'President', image: 'https://www.esuc.ucla.edu/assets/img/team/Jerard.svg' },
    { name: 'Clara Yee', role: 'Internal Vice President', image: 'https://www.esuc.ucla.edu/assets/img/team/Clara.svg' },
  ];

  const officers = [
    { name: 'Tyler Lam', role: 'Corporate Director', image: 'https://www.esuc.ucla.edu/assets/img/team/Tyler.svg' },
    { name: 'Jennie Ren', role: 'Treasurer', image: 'https://www.esuc.ucla.edu/assets/img/team/Jennie.svg' },
    { name: 'Lian Elsa Linton', role: 'Webmaster', image: 'https://www.esuc.ucla.edu/assets/img/team/Lian.svg' },
    { name: "Aidan O'Leary", role: 'Alumni Relations & Community Chair', image: 'https://www.esuc.ucla.edu/assets/img/team/Aidan.svg' },
    { name: 'Ela Defne Erkan', role: 'Publicity Chair', image: 'https://www.esuc.ucla.edu/assets/img/team/Defne.svg' },
    { name: 'Chris Wang', role: 'Secretary', image: 'https://www.esuc.ucla.edu/assets/img/team/Chris.svg' },
  ];

  return (
    <section className="board-section">
      <h2 className="board-title">The Board</h2>
      
      {/* Executive Section */}
      <div className="board-subsection">
        <h3 className="board-subtitle">EXECUTIVE</h3>
        <div className="board-grid board-grid-executive">
          {executive.map((member, index) => (
            <div key={index} className="board-card">
              <div className="board-avatar">
                <img src={member.image} alt={member.name} className="board-avatar-image" />
              </div>
              <p className="board-name">{member.name}</p>
              <p className="board-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Officers Section */}
      <div className="board-subsection">
        <h3 className="board-subtitle">OFFICERS</h3>
        <div className="board-grid board-grid-officers">
          {officers.map((member, index) => (
            <div key={index} className="board-card">
              <div className="board-avatar">
                <img src={member.image} alt={member.name} className="board-avatar-image" />
              </div>
              <p className="board-name">{member.name}</p>
              <p className="board-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardComponent;

