'use client';

import { useState, useRef, useEffect } from 'react';
import { X, SlidersHorizontal, Check, ChevronDown, RotateCcw, Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedAge: string;
  onAgeChange: (age: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  onClear: () => void;
}

const AGE_OPTIONS = ['All Ages', '0-2 Years', '3-5 Years', '6-9 Years'];
const PRICE_OPTIONS = ['Any Price', 'Under ₹500', '₹500 - ₹1500'];

export default function FilterBar({
  selectedAge,
  onAgeChange,
  selectedPrice,
  onPriceChange,
  onClear,
}: FilterBarProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const ageRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = (selectedAge && selectedAge !== 'All Ages') || (selectedPrice && selectedPrice !== 'Any Price');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ageRef.current && !ageRef.current.contains(e.target as Node)) {
        setAgeOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Filter Bar (Stylish Custom Floating Popovers) */}
      <section className="filter-section desktop-filter-bar">
        <div className="filter-box">
          <div className="filter-flex-group">
            {/* Custom Stylish Age Filter Dropdown */}
            <div className="custom-filter-dropdown" ref={ageRef}>
              <div className="filter-label-sub">
                Filter by Age
              </div>
              <button
                type="button"
                onClick={() => {
                  setAgeOpen(!ageOpen);
                  setPriceOpen(false);
                }}
                className={`custom-filter-trigger ${ageOpen ? 'custom-filter-trigger-active' : ''}`}
              >
                <div className="filter-trigger-flex">
                  <span className="material-symbols-outlined filter-icon">child_care</span>
                  <span>{selectedAge || 'All Ages'}</span>
                </div>
                <ChevronDown className={`filter-chevron-icon ${ageOpen ? 'nav-arrow-open' : 'nav-arrow-closed'}`} />
              </button>

              {ageOpen && (
                <div className="custom-filter-popover">
                  {AGE_OPTIONS.map((opt) => {
                    const isSelected = (selectedAge || 'All Ages') === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          onAgeChange(opt);
                          setAgeOpen(false);
                        }}
                        className={`custom-filter-option ${isSelected ? 'custom-filter-option-selected' : ''}`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="filter-check-icon" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom Stylish Price Filter Dropdown */}
            <div className="custom-filter-dropdown" ref={priceRef}>
              <div className="filter-label-sub">
                Filter by Price
              </div>
              <button
                type="button"
                onClick={() => {
                  setPriceOpen(!priceOpen);
                  setAgeOpen(false);
                }}
                className={`custom-filter-trigger ${priceOpen ? 'custom-filter-trigger-active' : ''}`}
              >
                <div className="filter-trigger-flex">
                  <span className="material-symbols-outlined filter-icon">payments</span>
                  <span>{selectedPrice || 'Any Price'}</span>
                </div>
                <ChevronDown className={`filter-chevron-icon ${priceOpen ? 'nav-arrow-open' : 'nav-arrow-closed'}`} />
              </button>

              {priceOpen && (
                <div className="custom-filter-popover">
                  {PRICE_OPTIONS.map((opt) => {
                    const isSelected = (selectedPrice || 'Any Price') === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          onPriceChange(opt);
                          setPriceOpen(false);
                        }}
                        className={`custom-filter-option ${isSelected ? 'custom-filter-option-selected' : ''}`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="filter-check-icon" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Stylish Action Buttons */}
          <div className="filter-actions">
            <button className="btn-show-toys bouncy-btn">
              <Sparkles className="filter-sparkle-icon" />
              <span>Show Toys</span>
            </button>
            <button
              onClick={onClear}
              className="btn-clear-all-stylish bouncy-btn"
            >
              <RotateCcw className="filter-clear-icon" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mobile Filter Bar Trigger Button */}
      <section className="mobile-filter-bar">
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="mobile-filter-trigger-btn bouncy-btn"
        >
          <SlidersHorizontal className="form-plus-icon" />
          <span>{hasActiveFilters ? 'Filters Applied 🎛️' : 'Filter Toys by Age & Price'}</span>
          {hasActiveFilters && (
            <span className="filter-active-badge">
              Active
            </span>
          )}
        </button>
      </section>

      {/* Mobile Bottom Sheet Modal (Interactive Filter Chips & Stylish Action Buttons) */}
      {isBottomSheetOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsBottomSheetOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-title">
                <SlidersHorizontal className="reviews-alert-icon text-primary" />
                <span>Filter Toys</span>
              </div>
              <button
                onClick={() => setIsBottomSheetOpen(false)}
                className="bottom-sheet-close-btn bouncy-btn"
              >
                <X className="reviews-close-icon" />
              </button>
            </div>

            {/* Filter Chips inside Bottom Sheet */}
            <div className="bottom-sheet-chips-col">
              <div>
                <label className="bottom-sheet-label">
                  Filter by Age
                </label>
                <div className="filter-chip-group">
                  {AGE_OPTIONS.map((opt) => {
                    const isSelected = (selectedAge || 'All Ages') === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => onAgeChange(opt)}
                        className={`filter-chip-btn bouncy-btn ${isSelected ? 'filter-chip-btn-active' : ''}`}
                      >
                        {isSelected && <Check className="filter-clear-icon" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="bottom-sheet-label">
                  Filter by Price
                </label>
                <div className="filter-chip-group">
                  {PRICE_OPTIONS.map((opt) => {
                    const isSelected = (selectedPrice || 'Any Price') === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => onPriceChange(opt)}
                        className={`filter-chip-btn bouncy-btn ${isSelected ? 'filter-chip-btn-active' : ''}`}
                      >
                        {isSelected && <Check className="filter-clear-icon" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Sheet Action Buttons */}
            <div className="bottom-sheet-actions-row">
              <button
                onClick={() => setIsBottomSheetOpen(false)}
                className="btn-show-toys bouncy-btn bottom-sheet-btn-show"
              >
                <Sparkles className="form-plus-icon" />
                <span>Show Toys</span>
              </button>
              <button
                onClick={() => {
                  onClear();
                  setIsBottomSheetOpen(false);
                }}
                className="btn-clear-all-stylish bouncy-btn bottom-sheet-btn-clear"
              >
                <RotateCcw className="filter-clear-icon" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
