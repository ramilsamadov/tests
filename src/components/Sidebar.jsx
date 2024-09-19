import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <form className="d-flex p-2">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-success" type="submit">Search</button>
        {/* X işareti burada, Search butonunun hemen sonrasında */}
        <button className="close-btn" onClick={toggleSidebar}>✕</button>
      </form>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Add</a></li>
        <li><a href="#">Update</a></li>
        <li><a href="#">Users</a></li>
        <li><a href="#">Find by Id</a></li>
        <li><a href="#">Find by Balance</a></li>
        <li><a href="#">Login</a></li>
        <li><a href="#">Register</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
