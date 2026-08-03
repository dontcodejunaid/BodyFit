import Navbar from './components/Navbar.jsx';
import MembershipPlans from './components/MembershipPlans.jsx';
import Testimonials from './components/Testimonials.jsx';

function App() {
  return (
    <div>
      <Navbar />
      {/* Rest of your existing page components */}
      <MembershipPlans />
      <Testimonials />
    </div>
  );
}

export default App;
