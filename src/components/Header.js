import React from 'react';

function Header() {
  const headerStyles = {
    backgroundColor: 'rgba(0,0,0,0.4)',
    color: '#FF6a95',
  };

  return (
    <header style={headerStyles}>
      <div className="header-container">
        <h2>ToDo List</h2>
      </div>
    </header>
  );
}

export default Header;
