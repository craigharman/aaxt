# AAXT

AdonisJS AlpineJS htmlX and Tailwind.

## Transitions

You can choose between [HTMX Transitions](https://htmx.org/examples/animations/) or [Alpine Transitions](https://alpinejs.dev/directives/transition) to transition between content.

I currently prefer Alpine Transitions as the Transitions API is not widely supported and Alpine includes some nice defaults.

### For HTMX Transitions:

1. Add your CSS Animation to a .css file:
```css
/**
 * Animation for page transitions
 */
@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(90px); }
}

@keyframes slide-to-left {
  to { transform: translateX(-90px); }
}

.slide-it {
  view-transition-name: slide-it;
}

::view-transition-old(slide-it) {
  animation: 180ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
  600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}
::view-transition-new(slide-it) {
  animation: 420ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
  600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
```
2. Add the class name to the element you want to animate (eg. `slide-it`)
3. Add `transition:true` to the `hx-swap` attribute as follows `hx-swap="outerHTML show:window:top transition:true"`

### For Alpine Transitions

1. Add the Alpine transitions to the element you want to animate, eg. `<div id="content-wrapper" x-transition:enter.duration.500ms x-transition:leave.duration.400ms>
2. Add `transition:true` to the `hx-swap` attribute as follows `hx-swap="outerHTML show:window:top transition:true"`

### Using animate.css transitions

Similar to HTMX transitions you can add animate.css transitions via:

1. Install and import `animate.css` in your root `app.js` file.
2. Create View Transition API CSS to your .css file using Animate.css animations
```css
.bounce {
  view-transition-name: bounce;
}
::view-transition-old(bounce) {
  animation: bounceOutLeft; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
::view-transition-new(bounce) {
  animation: bounceInLeft; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
}
```
3. Add `transition:true` to the `hx-swap` attribute as follows `hx-swap="outerHTML show:window:top transition:true"`
