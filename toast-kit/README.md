![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

# Toast Kit

A simple React toast notification package built as a practice project to learn creating reusable packages and using React portals.

## Goal

This package was created to practice building a React component library with React Portal usage and package bundling using Vite.

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Build the package:

```bash
npm run build
```

## Usage

1- In the toast-kit package folder, run:

```bash
npm link
```

2. In your project, run:

```bash
npm link toast-kit
```

3. Import and use the Toast component:

```tsx
import { ToastManager } from "toast-kit";

function App() {
  return (
    <>
      <ToastManager />
      {/* your app code */}
    </>
  );
}
```

4. Use the showToast function to display a toast:

```tsx
import { showToast } from "toast-kit";

showToast({
  type: "success",
  title: "Success!",
  message: "Your action was successful.",
  duration: 3000,
  position: "bottom-right",
});
```
