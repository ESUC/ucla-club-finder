import './BoardComponent.css';

const BoardComponent = () => {
  const executive = [
    { name: 'Name Placeholder', role: 'President' },
    { name: 'Name Placeholder', role: 'External Vice President' },
    { name: 'Name Placeholder', role: 'Internal Vice President' },
  ];

  const officers = [
    { name: 'Name Placeholder', role: 'Corporate Director' },
    { name: 'Name Placeholder', role: 'Treasurer' },
    { name: 'Name Placeholder', role: 'Webmaster' },
    { name: 'Name Placeholder', role: 'Alumni Relations/Community Chair' },
    { name: 'Name Placeholder', role: 'Publicity Chair' },
    { name: 'Name Placeholder', role: 'Secretary' },
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
                <svg width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
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
                <svg width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                </svg>
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

