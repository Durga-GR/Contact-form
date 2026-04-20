# Contact Form with JavaScript Validation

A simple contact form with client-side input validation built using HTML, CSS, and vanilla JavaScript.

## Files

```
contact-form/
├── index.html      # Form structure
├── style.css       # Styling and validation state styles
├── validate.js     # Validation logic
└── README.md
```

## Features

- Validates Name, Email, and Message fields on submit
- Inline error messages below each field
- Live re-validation as you type (after first interaction)
- Blur validation when leaving a field
- Email format checked with regex
- Blocks submission if any field is invalid
- Green success banner on valid submission (auto-hides after 5s)
- Form resets after successful submission

## Validation Rules

| Field   | Rules                                      |
|---------|--------------------------------------------|
| Name    | Required, minimum 2 characters             |
| Email   | Required, must match valid email format    |
| Message | Required, minimum 10 characters            |

## How to Run

Just open `index.html` in any modern browser — no server or dependencies needed.

```bash
# Or with VS Code Live Server
# Right-click index.html → Open with Live Server
```

## Edge Cases Handled

- Empty fields
- Whitespace-only input (trimmed before validation)
- Invalid email formats (e.g. `user@`, `@domain.com`, `nodomain`)
- Short name or message below minimum length
- Special characters in name/message are allowed

## Email Regex

```js
/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
```

Matches standard email formats: `user@domain.com`, `user.name+tag@sub.domain.org`, etc.
