export default function BaseLayout({ title, links, children, themeClass }) {
  return (
    <div className={`dashboard-shell ${themeClass}`}>
      <aside className="sidebar">
        <h3>AcademyOS</h3>
        <nav>
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} className="nav-item">
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>{title}</h2>
        </header>
        {children}
      </main>
    </div>
  );
}
