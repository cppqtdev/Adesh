# Adesh Singh — Portfolio

Personal portfolio of Adesh Singh, Qt QML Engineer & founder of [TechCoderHub](https://techcoderhub.com). Built with React + Vite. Design inspired by [jagmeet.cloud](https://jagmeet.cloud).

## Run locally

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
```

## Editing content

All text, links, experience, projects and skills live in one file: `src/data.js`. Edit it and the whole site updates.

To add your résumé, drop `resume.pdf` into `public/`.
To use a real photo, replace the `</>` placeholder in `src/components/About.jsx` with an `<img>` pointing to `public/avatar.png`.

## Structure

- `src/data.js` — all content
- `src/index.css` — all styling (dark terminal theme)
- `src/components/` — Nav, Hero, About, Experience, Projects, Skills, Contact, Footer
