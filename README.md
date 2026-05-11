# Mother's Day Surprise

A tiny static Mother's Day microsite designed for GitHub Pages.

## Images

The site uses five optimized WebP images in `assets/images/`:

```text
assets/images/01-the-storytime-reader.webp
assets/images/02-the-lifter.webp
assets/images/03-the-lifeguard.webp
assets/images/04-the-bedrock.webp
assets/images/05-the-netflix-lounger.webp
```

Card names, paths, and alt text are in the `cards` manifest near the top of `script.js`.

## Edit copy

Update the `copy` object near the top of `script.js`:

```js
const copy = {
  recipientLine: "Reason:"
};
```

## Publish

This is a no-build static site. Publish from the repository root in GitHub Pages.
