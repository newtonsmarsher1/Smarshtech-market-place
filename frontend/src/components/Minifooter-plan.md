# Implementation Plan - Animated Minifooter

Add a persistent, tiny, and animated "Powered by Clouds Technologies" attribution to the bottom left of the screen.

## Proposed Changes

### [Frontend] Components
#### [NEW] [Minifooter.tsx](file:///c:/Users/PC/Desktop/online%20market/frontend/src/components/Minifooter.tsx)
- Create a fixed component for the bottom left.
- Use `text-[9px]` for the "tiny" requirement.
- Add a subtle pulse or gradient animation.

#### [MODIFY] [layout.tsx](file:///c:/Users/PC/Desktop/online%20market/frontend/src/app/layout.tsx)
- Import and include `Minifooter` inside the `RootLayout` so it appears on all pages.

## Verification Plan
### Manual Verification
- Verify the minifooter appears at the bottom left.
- Confirm it is tiny and has a subtle animation.
- Ensure it doesn't overlap critical UI elements (like the floating preference ball).
