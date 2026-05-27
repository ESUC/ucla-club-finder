import './BoardComponent.css';

const BoardComponent = () => {
  const executive = [
    { name: 'Lian Elsa Linton', role: 'External Vice President', image: '/board/Lian_Elsa_Linton_EVP.png' },
    { name: 'Justin Xu', role: 'President', image: '/board/Justin_Xu_President.png' },
    { name: 'Aidan O\'Leary', role: 'Internal Vice President', image: '/board/Aidan_O_Leary_IVP.png' },
    { name: 'Megan Lu', role: 'Treasurer', image: '/board/Megan_Lu_Treasurer.png' },
  ];

  const officers = [
    { name: 'Grace Li', role: 'Secretary', image: '/board/Grace_Li_Secratary.png' },
    { name: 'Anastasia Yang', role: 'Co-Webmaster', image: '/board/Anastasia_Yang_Co-Webmaster.png' },
    { name: 'Carter Ballow', role: 'Co-Webmaster', image: '/board/Carter_Ballow_Co-Webmaster.png' },
    { name: "Darren Schuttinger", role: 'Alumni Relations Chair', image: '/board/Darren_ Schuttinger_Alumni_Relations_Chair.png' },
    { name: 'Conner Lam', role: 'Corporate Chair', image: '/board/Conner_Lam_Corporate_Chair.png' },
    { name: 'Alina Wang', role: 'Publicity Chair', image: '/board/Alina_Wang_Publicity.png' },
    { name: "Al Ponce", role: 'Membership Chair', image: '/board/Al_Ponce_Membership_Chair.png' },
    { name: 'Joanne Yu', role: 'Social Chair', image: '/board/Joanne_Yu_Social_Chair.png' },
    { name: 'Sarah AlSabah', role: 'Wellness Chair', image: '/board/Sarah_AlSabah_Wellness_Chair.png' },
    { name: "Natalie Ngo", role: 'Facilities Manager', image: '/board/Natalie_Ngo_Facilities_Manager.png' },
    { name: 'Evelyn Han', role: 'Historian & Transfer Representative', image: '/board/Evelyn_Han_Historian.png' }
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

