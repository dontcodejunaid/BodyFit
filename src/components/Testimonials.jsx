import './Testimonials.css';

/**
 * Self-contained section: the copy lives here as a default prop, so it can be
 * dropped in or moved without touching seedData, the context or global CSS.
 */
const defaultTestimonials = [
  {
    id: '1',
    name: 'Ananya Mehra',
    role: 'Member since 2021',
    rating: 5,
    quote:
      'I walked in unable to hold a plank for 30 seconds. Two years on, I deadlift my own bodyweight. The coaches correct your form every single session — that attention is what kept me here.',
  },
  {
    id: '2',
    name: 'Vikram Nair',
    role: 'Lost 18 kg in 8 months',
    rating: 5,
    quote:
      'The diet plan was built around my shifts, not some template. No crash cutting, no guesswork. My trainer checked in every week and adjusted it as the numbers moved.',
  },
  {
    id: '3',
    name: 'Sana Qureshi',
    role: 'Personal training client',
    rating: 5,
    quote:
      'Clean floor, working machines, zero ego. As a woman training late evenings, that last part mattered more than anything else on the brochure.',
  },
];

const Testimonials = ({ testimonials = defaultTestimonials }) => (
  <section className="testimonials-section" id="testimonials">
    <div className="testimonials-container">
      <header className="testimonials-header">
        <p className="testimonials-eyebrow">Testimonials</p>
        <h2 className="testimonials-title">Results our members talk about</h2>
        <p className="testimonials-subtitle">
          Real members, real numbers. Here is what training at BodyFit actually
          looks like once the novelty wears off.
        </p>
      </header>

      <div className="testimonials-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.id}>
            <p className="testimonial-rating" aria-label={`${item.rating} out of 5`}>
              <span aria-hidden="true">{'★'.repeat(item.rating)}</span>
            </p>

            <blockquote className="testimonial-quote">{item.quote}</blockquote>

            <footer className="testimonial-author">
              <span aria-hidden="true" className="testimonial-avatar">
                {item.name.charAt(0)}
              </span>
              <span>
                <span className="testimonial-name">{item.name}</span>
                <span className="testimonial-role">{item.role}</span>
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
