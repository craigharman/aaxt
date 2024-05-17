# AAXT

The complete web stack including AdonisJS AlpineJS htmlX and Tailwind.

## Features

- Alpine, HTMX and Tailwind pre-installed and configured
- AdonisJS middleware to automatically send HTML fragments for HTMX requests
- Same URL for whole page vs required fragments
- Browser based caching middleware using etags and vary
- HTMX extension `no-load` to not request current page
- Edge templating engine

### Optional

- Animate.css for transitions
- [Penguin UI](https://www.penguinui.com/), [PineUI](https://devdojo.com/pines), [Shoelace](https://shoelace.style/) or [FrankenUI](https://www.franken-ui.dev/) CSS component libraries.

## Usage

To create a new AAXT project run:

```bash
npx degit craigharman/aaxt my-new-project
```

This will provide you with an AdonisJS project preconfigured with AlpineJS, HtmlX and Tailwind and with a few other bonus niceties to connect these technologies together.

AAXT uses Adonis's server side rendering to generate HTML pages but then caches to them to give your website/application the speed of a static rendered site. The steps to create yuor website content can be simplified to:

1. Create a new server-side page template in `/resources/views/pages`
2. Wrap the content in the AAXT default page template via `@templates.default({ title: 'Page title', description: 'Description for home goes here' })` 
3. Add HTMX requests to the page (or page components such as navigation bar) that will then request HTML Element ids from the server

That's it! Requests are automatically cached client and server side to reduce server resource usage and network requests. A basic demonstration is included to get you started and each step is explained in more detail below.

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
