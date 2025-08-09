# UseSpinDelay

A custom hook for showing a spinner only if the loading state lasts longer than a specified delay.

## Goal

Practice building complex and useful hooks.

## Details

- Show a spinner only if the loading state lasts longer than a specified delay.
- Once shown, keep it visible for at least a specified duration to avoid flickering.

## Parameters

- `loading`: A boolean indicating the loading state.
- `delay`: The delay in milliseconds before showing the spinner.
- `minDuration`: The minimum duration in milliseconds to keep the spinner visible.

## Setup

Clone the repo and install dependencies:

```bash
npm install
```

## Usage

```ts
import { useSpinDelay } from "./hooks/useSpinDelay";

const showSpinner = useSpinDelay(loading, delay, minDuration);
```
