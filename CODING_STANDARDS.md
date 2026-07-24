# Frontend Coding Standards

## CSS & Styling Rules

### ✅ Use CSS Classes Only

* Always use `className` for styling.
* Define styles in external `.css`, `.module.css`, or approved styling files.
* Keep styling separate from component logic.

**✅ Good**

```jsx
<button className="primary-btn">Save</button>
```

```css
.primary-btn {
  background-color: #2563eb;
  color: white;
  border-radius: 6px;
}
```

---

### ❌ Do Not Use Inline Styles

Avoid inline styling unless there is a genuine runtime requirement (for example, dynamically calculated dimensions or positions).

**❌ Bad**

```jsx
<button
  style={{
    backgroundColor: "blue",
    color: "white"
  }}
>
  Save
</button>
```

---

### ❌ Do Not Hardcode Colors in Components

Never write color values directly inside JSX.

**❌ Bad**

```jsx
<div style={{ color: "#ff0000" }} />
```

**✅ Good**

```jsx
<div className="error-text" />
```

```css
.error-text {
  color: var(--danger-color);
}
```

---

### ✅ Reuse Existing Classes

Before creating new CSS:

* Check whether a similar class already exists.
* Reuse utility classes when possible.
* Avoid duplicate styles.

---

### ✅ Use CSS Variables for Colors

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #475569;
  --danger-color: #dc2626;
  --success-color: #16a34a;
}
```

Use:

```css
.button {
  background: var(--primary-color);
}
```

instead of

```css
background: #2563eb;
```

---

### ✅ Keep CSS Organized

Recommended structure:

```
src/
 ├── components/
 │     ├── Button/
 │     │      Button.jsx
 │     │      Button.css
 │     ├── Card/
 │            Card.jsx
 │            Card.css
```

---

### Naming Convention

Use meaningful class names.

✅ Good

```css
.product-card
.checkout-button
.user-profile
.navbar-link
```

❌ Bad

```css
.box1
.red
.style
.test
```

---

### General Rules

* No inline CSS.
* No hardcoded colors inside components.
* No `!important` unless absolutely necessary.
* Keep components focused on logic and markup.
* Keep all design tokens (colors, spacing, typography) centralized.
* Use semantic and reusable class names.
* Remove unused CSS before committing.
* Ensure responsive styles for mobile, tablet, and desktop where applicable.
* No `console.log()` in committed code.
* ❌ No debugger statements.
* ❌ No unused variables or imports.
* ❌ No `var`; use `const` or `let`.
* ❌ No commits with lint errors.
* ✅ Auto-format with Prettier before commit.
* ✅ Consistent import ordering.
* ✅ Require `===`/`!==` instead of loose equality.
* ✅ Validate commit messages.
* ✅ Enforce lint checks again in CI to prevent bypassing local hooks.
