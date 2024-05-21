# AAXT

The complete web stack including AdonisJS AlpineJS htmlX and Tailwind.

## Features

- Alpine, HTMX and Tailwind pre-installed and configured
- AdonisJS middleware to automatically send HTML fragments for HTMX requests
- Same URL for whole page vs required fragments
- Server (using [Bentocache](https://bentocache.dev)) and Browser (using ETag) caching enabled by default
- HTMX extension `no-load` to not request current page
- Edge templating engine

### Optional

- Animate.css for transitions
- [Penguin UI](https://www.penguinui.com/), [PineUI](https://devdojo.com/pines), [Shoelace](https://shoelace.style/) or [FrankenUI](https://www.franken-ui.dev/) CSS component libraries.

## Usage

To create a new AAXT project run:

```bash
npx degit craigharman/aaxt my-new-project
cd my-new-project
npm i
npm run dev
```

This will provide you with an AdonisJS project preconfigured with AlpineJS, HtmlX and Tailwind and with a few other bonus niceties to connect these technologies together. **It is recommended that you have a basic understanding of HTMX and AlpineJS before you start but it is not required, and hopefully AAXT is easy enough to get up and running with.**

AAXT uses Adonis's server side rendering to generate HTML pages but then caches to them to give your website/application the speed of a static rendered site. The steps to create yuor website content can be simplified to:

1. Create a new server-side page (in `/resources/views/pages`) or template (in `/resources/views/components/templates) or use the default one. 
2. Create a page in `/resources/views/pages/` using the AAXT default page template via `@templates.default({ title: 'Page title', description: 'Description for home goes here' })`
3. Add HTMX requests to the page (or page components such as navigation bar) that will then request HTML Element ids from the server

That's it! AAXT will build all the pages you create in their entirety but return fragments to the client when an HTMX request is made. Requests are automatically cached client and server side to reduce server resource usage and network requests. A basic demonstration is included to get you started and each step is explained in more detail below.

## Creating pages

AAXT pages use Edge templates in Adonis JS. You are free to use them in any way you want but a recommended quick start has been supplied to help you get started.

### Default template

The default template is a wrapper for the main page and is located in `/recources/views/components/templates/default.edge`. It is placed in the components folder so it can be referenced in other pages with `@templates.default({ title: 'Home', description: 'Description for home goes here' })`. Note we can pass a page title and description to the template using parameters.

The template is a very simple wrapper that contains a couple of Edge variables (for the title and description) and then some embedded components including the navigation and the main slot which is where your page content will go. Also note the `id="content-wrapper"` attribute in the wrapping div. This is going to be our HTMX `target` when we traverse pages.

### Pages

Create a page that uses the default template by wrapping some HTML in edge tags:

```html
@templates.default({ title: 'Home', description: 'Description for home goes here' })
<div>Your html goes here.</div>
@end
```
Your HTML can contain HTMX and AlpineJS and even Edge logic and components.
Pages will be injected into HTMX targets, in this case into the `content-wrapper` element.

> Don't forget to add your page route to `routes.ts` like any normal AdonisJS route. The advantage of AAXT is that you only need the one route regardless of if the page is expecting a page or a component!

### Triggers

HTMX triggers make a client based request back to the server for more content. To navigate from one page to another we add a link with some additional HTMX attributes as follows:

```html
<a href="/" preload hx-get="/" hx-trigger="click" hx-select-oob="#navigation,#content-wrapper"
          hx-vals='{"elements": "#navigation,#content-wrapper"}' hx-replace-url="true" hx-ext="no-load">Page</a>
```

Here we have a standard `a` element with an `href` - we keep this to allow the user to be able to navigate even if Javascript is turned off. The remaining attributes are our HTMX ones and they help AAXT identify how to handle the request. A breakdown of these attributes and their specific relation to AAXT is included below:

| Attribute        | Required? | HTMX Usage                                     | AAXT Description                                                                                                         |
| ---------------- | --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| preload          | N         | Preload the URL                                | Makes switching between pages much quicker by prefetching in the background.                                             |
| hx-swap          | N         | Control how the response is swapped in.        | By default AAXT uses outerHTML                                                                                           |
| hx-get           | Y         | Make a GET request to '/'                      | Request the elements that make up the '/' route in `routes.ts`                                                           |
| hx-trigger       | Y         | The request is triggered by a click event.     | -                                                                                                                        |
| hx-select-oob    | Y         | Out of band swap of elements                   | AAXT will return both these elements so we need HTMX to expect them. If only targeting one element, this can be omitted. |
| hx-vals          | Y         | Send some additional data to the server        | Tell the server what elements we want generated and returned.  If only targeting one element, this can be omitted.       |
| hx-replace-url   | N         | Replace the browser's URL with the request URL | Required if URL needs to change.                                                                                         |
| hx-ext="no-load" | N         | Load an HTMX extension                         | "no-load" stops HTMX requesting a page if we are already on that URL.                                                    |

> Note that HTMX allows us to hoist any repeated attributes to the parent element so we don't need to repeat them on every link. That is what we have done in `navigation.edge`.

#### Using hx-boost

You may see all the attributes above and think, its much easier to just use [hx-boost](https://htmx.org/attributes/hx-boost/). While AAXT certainly supports this the disadvantage is you will be increasing the amount of traffic sent between the server and browser, as hx-boost requires the entire page. If this is not a consideration for your setup, then you can use `hx-boost` out of the box as described in the [HTMX documentation](https://htmx.org/attributes/hx-boost/).

## Requesting HTML Fragments (or components)

If you want to load individual HTML components or fragments simply add a route to `routes.ts` that renders the component explcitly via `` then use HTMX in the page view to request it:

```html
<button hx-get="/quote" hx-trigger="click" hx-target="#quote">
      Click to load
</button>
<div id="quote">This text will be replaced with whatever returns from the /quote endpoint.</div>
```

## Caching

Both server side and browser side caching are configured via AdonisJS Middlewares. They are configured with "sane defaults" whereby the server should be serving cached versions of your HTML a majority of the time. However you are able to configure server side caching via the `./config/cache.ts` file which takes a [BentoCache](https://bentocache.dev) configuration.

Server caching of edge templates is done on a URL + HTMX requested targets basis. This has the advantage of quicker response times but at the expense of caching more duplicate data. If storage is a concern you can remove the `server_cache_middleware` from `kernel.ts` and instead just cache the whole page output by editing `htmx_middleware.ts` to retrieve the page from cache.

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
