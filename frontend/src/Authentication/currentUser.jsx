const [currentUser, setCurrentUser] = useState({
  name: "Guest",
  role: "GUEST",
  isLoggedIn: false,
});

// 🔥 AUTO UPDATE WHEN STORAGE CHANGES
useEffect(() => {
  const updateUser = () => {
    const role = sessionStorage.getItem("academy_role");

    setCurrentUser({
      name: "Sok Dara",
      role: role ? role.toUpperCase() : "GUEST",
      isLoggedIn: !!role,
    });
  };

  updateUser(); // run on load

  window.addEventListener("storage", updateUser);

  return () => window.removeEventListener("storage", updateUser);
}, []);