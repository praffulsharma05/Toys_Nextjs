'use client';

interface FilterBarProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  onClear: () => void;
}

export default function FilterBar({
  selectedAge,
  onAgeChange,
  selectedPrice,
  onPriceChange,
  onClear,
}: FilterBarProps) {
  return (
    <section className="filter-section">
      <div className="filter-box">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '24px' }}>
          {/* Age Filter */}
          <div className="filter-group">
            <label className="filter-label">Filter by Age</label>
            <div className="filter-select-wrap">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '18px' }}>
                child_care
              </span>
              <select
                value={selectedAge}
                onChange={(e) => onAgeChange(e.target.value)}
                className="filter-select"
              >
                <option value="All Ages">All Ages</option>
                <option value="0-2 Years">0-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="6-9 Years">6-9 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
              <span className="material-symbols-outlined" style={{ position: 'absolute', right: '12px', color: 'var(--color-on-surface-variant)', pointerEvents: 'none', fontSize: '18px' }}>
                keyboard_arrow_down
              </span>
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <label className="filter-label">Filter by Price</label>
            <div className="filter-select-wrap">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '18px' }}>
                payments
              </span>
              <select
                value={selectedPrice}
                onChange={(e) => onPriceChange(e.target.value)}
                className="filter-select"
              >
                <option value="Any Price">Any Price</option>
                <option value="Under ₹500">Under ₹500</option>
                <option value="₹500 - ₹1500">₹500 - ₹1500</option>
                <option value="₹1500+">₹1500+</option>
              </select>
              <span className="material-symbols-outlined" style={{ position: 'absolute', right: '12px', color: 'var(--color-on-surface-variant)', pointerEvents: 'none', fontSize: '18px' }}>
                keyboard_arrow_down
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-primary-toyjoy bouncy-btn">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              tune
            </span>
            <span>Apply Filters</span>
          </button>
          <button
            onClick={onClear}
            style={{ background: 'none', border: 'none', color: 'var(--color-on-surface-variant)', fontWeight: '700', fontSize: '14px', cursor: 'pointer', padding: '0 8px' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
}
