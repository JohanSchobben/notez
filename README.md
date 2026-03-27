# Notez

Notez is an Angular-based note board app for creating and managing visual note spaces. It uses Angular 21, NgRx, and IndexedDB-friendly persistence tools to organize notes and widgets on a board-style interface.

## Features

- Create, open, and delete notes
- Place widgets on a note board
- Supported widget types:
  - debug
  - simple text
  - todo
  - image
- Drag-and-drop image adding
- Undo / redo support
- State management with NgRx
- Responsive UI styling with Tailwind CSS and SCSS

## Tech Stack

- Angular 21
- TypeScript 5.9
- NgRx Store / Effects / DevTools
- RxJS
- IDB
- Tailwind CSS

## Prerequisites

- Node.js 20+ recommended
- npm 10+

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Then open:

```text
http://localhost:4200
```

## Available Scripts

- `npm start` — start the dev server
- `npm run build` — build the app
- `npm run watch` — build in watch mode for development
- `npm test` — run tests

## Project Structure

```text
src/
app/
home-page/         # Notes list and note creation UI
notez/             # Board view, widgets, undo/redo logic
notez-explorer/    # Note list state and actions
shared/            # Shared models, helpers, and utilities
widgets/           # Widget components and defaults
store/             # App-wide state definitions
```

## Routing

- `/` — home page with the note list
- `/note/:id` — note board view

## Development Notes

- The app uses NgRx for state flow and actions.
- Widget content and metadata are managed through board interactions.
- Images can be added by dropping files onto the note board.

## Building

Create a production build with:

```bash
npm run build
```

## Testing

Run the test suite with:

```bash
npm test
```

## License

No license has been specified yet.
