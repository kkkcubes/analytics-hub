import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header />
        {children}
      </div>
    </div>
  );
}