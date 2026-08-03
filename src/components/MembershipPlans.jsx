import { initialMemberships } from '../data/seedData';
import './MembershipPlans.css';

/**
 * Self-contained section: it only reads from seedData, so it can be dropped in
 * or moved without touching the context, the storage layer, or global CSS.
 */
const MembershipPlans = ({ plans = initialMemberships }) => (
  <section className="membership-section" id="membership">
    <div className="membership-container">
      <header className="membership-header">
        <p className="membership-eyebrow">Membership Plans</p>
        <h2 className="membership-title">Pick the plan that fits your goal</h2>
        <p className="membership-subtitle">
          No joining fee, no lock-in. Upgrade or pause your plan at any time.
        </p>
      </header>

      <div className="plans-grid">
        {plans.map((plan, index) => {
          // Seed names read "Basic (Gym Only)" — split the tier from its detail.
          const [tier, detail] = plan.name.replace(')', '').split(' (');
          const [amount, period] = plan.price.split('/');
          const isFeatured = index === 1;

          return (
            <article
              className={`plan-card ${isFeatured ? 'featured' : ''}`}
              key={plan.id}
            >
              {isFeatured && <span className="plan-badge">Most Popular</span>}

              <div className="plan-heading">
                <h3 className="plan-tier">{tier}</h3>
                {detail && <p className="plan-detail">{detail}</p>}
              </div>

              <p className="plan-price">
                <span className="plan-amount">{amount}</span>
                {period && <span className="plan-period">/{period}</span>}
              </p>
              <p className="plan-duration">Billed for {plan.duration}</p>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true" className="feature-tick">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="plan-cta" type="button">
                Choose {tier}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default MembershipPlans;
