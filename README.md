# Mother's Day Surprise

A tiny static Mother's Day microsite designed for GitHub Pages.

## Replace the mock images

The mock WebP files live in `assets/images/` and already use the final filenames. Replace any file with your finished artwork at the same path:

```text
assets/images/01-the-supermom.webp
assets/images/02-snuggle-squad.webp
assets/images/03-breakfast-boss.webp
assets/images/04-bedtime-hero.webp
assets/images/05-adventure-duo.webp
assets/images/06-the-comfort-queen.webp
assets/images/07-little-shadow.webp
assets/images/08-sunshine-mama.webp
assets/images/09-magic-hug.webp
assets/images/10-forever-team.webp
```

Recommended final image size: `1200x900` or another `4:3` image. WebP works best for GitHub Pages file size.

## Edit copy

Update the `copy` object near the top of `script.js`:

```js
const copy = {
  recipientLine: "For someone wonderful",
  message: "Happy Mother's Day..."
};
```

Card names, paths, and alt text are in the `cards` manifest in the same file.

## Publish

This is a no-build static site. Publish from the repository root in GitHub Pages.
