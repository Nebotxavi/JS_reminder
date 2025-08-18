![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

# TextDiff app

Display live-updating text comparison between two blocks. As user types, defer expensive diff rendering.

## Goal and Lessons Learned

The initial goal was to practice the uncommon useDeferredValue hook. But after trying a while, the project demonstrated this was not a use case that would be solved by useDeferredValue but by a custom debouncer.
UseDeferredValue hook is a solution in similar cases where there is an asyncronous functionality, tipically an API call.
The debouncer solution introduces this asyncronous functionality, but since the debouncer itself already solve the problem, the useDeferredValue hook is not needed.
The project also introduces the LCS algorithm for text comparison.

## Dev setup

```
npm install
npm run dev
```
