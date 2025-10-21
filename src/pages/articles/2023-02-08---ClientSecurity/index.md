---
layout: post
draft: false
path: '/posts/clineSideSecurity'
tags:
  - 'Javascript'
  - 'Security'
  - 'React'
title: Client side security
date: '2023-02-08T14:02:03.284Z'
description: 'When you ship your code to production, it is exposed to public access. But you need to ensure that it cannot be vulnerable to any kind of attacks. How to do that?'
category: 'javascript'
---

Front end (Client side) code is meant to be run on browsers, on a client machine of a random user.
Anyone with a internet connection can access it. When they interact with the UI, in-response the UI interacts with the backend.

So it is necessary to make it as secure as possible, since even a small gap can bring down an entire product.

There are multiple ways to secure wbsites from attacks.

## 1. Sanitizing the inputs

Any input given by the user, will be saved in a database and in some cases will be served to other users;

For example consider a comment section, where one person's reply on a post is displayed to other users who see the post. If this comment has some executable script in it, almost anyone who simply visits the page gets attacked.
![Web security](./preview.jpg)

So as a first and most important precaution, all input fields in a site must be sanitized

What is sanitising? Sanitising is the process of stripping down the exectables like <code>\<script \/\></code>, Javacript:URL() or event handlers like onclick(), onfocus() etc... from a given input, to avoid SQL code injection and Cross site scripting.

Let's say you have a WYSIWYG/Rich-text editor in your site to get user input for a conversation in a ticket.
This html input once submitted, will be rendered as HTML in the list of conversations made. This conversation can have inline-images, tables, text content with inline styles etc...

React has a attribute "dangerouslySetInnerHTML" to render html in the DOM. To avoid XSS attacks, this html must be sanitized.

It is a best practice to do it before sending the input to BE, like below.

    {
      images: [],
      attachments: [],
      content: dompurify.sanitize(this.props.template) || ''
    }

and also before rendering in the DOM

    <div
      dangerouslySetInnerHTML={{
        __html: dompurify.sanitize(modalData)
      }}
    />

[DOMPurify](https://www.npmjs.com/package/dompurify) is a Javascript library, that extensively sanitizes HTML.

## 2. Content Security Policy (CSP)

If you have experience building web apps, you probably must have heard about CORS(Cross origin resource sharing). So basically, it is a security measure to safegaurd data from unauthorised access. In order to share resource with other origins, you have whitelist them explicitly.

CSP comes under this category, this policy helps control/restrict, all the resources loaded in your web app/site using the domain they are served from. This helps in preventing XSS attacks on your site.
This response header must be present in every response from the server.

You have to include all the whitelisted domains in their respective directive: list of domains.

Meaning, there are multiple types of resources and each type has to mentioned in a one or more directive in csp. If the resource's domain is not mentioned in the CSP header, browsers just blocks it.

    default-src: 'self';
    script-src: 'report-sample' 'self' 'wasm-unsafe-eval' https://www.google-analytics.com/analytics.js https://www.googletagmanager.com/gtag/js assets.codepen.io production-assets.codepen.io https://js.stripe.com 'sha256-XNBp89FG76amD8BqrJzyflxOF9PaWPqPqvJfKZPCv7M=' 'sha256-YCNoU9DNiinACbd8n6UPyB/8vj0kXvhkOni9/06SuYw=' 'sha256-PZjP7OR6mBEtnvXIZfCZ5PuOlxoDF1LDZL8aj8c42rw=';
    script-src-elem: 'report-sample' 'self' 'wasm-unsafe-eval' https://www.google-analytics.com/analytics.js https://www.goog…usercontent.com firefoxusercontent.com profile.stage.mozaws.net profile.accounts.firefox.com developer.mozilla.org mdn.dev interactive-examples.mdn.mozilla.net interactive-examples.mdn.allizom.net wikipedia.org upload.wikimedia.org https://mdn.github.io/shared-assets/ https://mdn.dev/ https://*.google-analytics.com https://*.googletagmanager.com www.gstatic.com;
    manifest-src: 'self';
    media-src: 'self' archive.org videos.cdn.mozilla.net https://mdn.github.io/shared-assets/;
    child-src: 'self';
    worker-src: 'self';

This is a sample CSP response header from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)'s site.

<hr />

If you need to load a image, let's say from "unsplash.com" _https://images.unsplash.com/photo-1701311310084-159429e16320_

![Sample Image from Unsplash](https://images.unsplash.com/photo-1701311310084-159429e16320?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070)

This domain must be mentioned in img-src directive.

    img-src: 'self' https://images.unsplash.com/photo-1701311310084-159429e16320

'self' is to allow resource from same origin, and also note that i have added the complete URL of the image, specifying that only this image from unsplash is allowed.

If I load another image, from the same domain "unsplash.com" it will not be loaded _https://images.unsplash.com/photo-1694375073673-fc3f0b706d8c_

![Sample Image from Unsplash](https://images.unsplash.com/photo-1694375073673-fc3f0b706d8c)

If you open, developer tools -> console you could see a error saying "Refused to load the image" because it violates the Content Security Policy

![CSP error in console](./csp-error.png)

    img-src: 'self' https://images.unsplash.com

If I mention only the domain in img-src directive, any image from the domain will be loaded.

To visialise better, i have used the img-src above. It works almost the same for scripts, fonts, styles, js files etc...

You could check out all the directives available here...

<previewbox-link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#fetch_directives"> </previewbox-link>

## 3. Content Security Policy (CSP) - frame-ancestors directive

Clickjacking is also a possible issue in sites that involve payment and payment related activities. An attacker can load your site in a `iframe` inside a decoy site and place the "Payment" button behind a "Download APK" button or "Get Link" button for eg...

The receiver details will be pre-filled with the attacker's aaccount details but will not be visible.

Once the user clicks the button to download a app or get a movie link, behind the scenes the users money would be transferred to the attacker without his knowledge.

To prevent this, CSP has a directive called **frame-ancestors**, meaning site's which has these specific directive in CSP headers cannot be loaded in a iframe in aother site, unless explicitly mentioned in the directive.

    frame-ancestors 'self' https://example.org https://example.com https://store.example.com;

## 4. reCaptcha

Adding recaptcha to your site helps prevent bot attacks, abusive traffic etc...

It's a free service provided by google to detect suspicious activity and automated activity and avoid it.

#### a. Text based recaptcha

This was the first method to diffrentiate a user from a bot, an image is diaplyed with distorted text. Ths user has to find what is written and provide in the input to pass this test.

But bots became smarter with pattern detection and text identification and starting craking this easily.

#### b. Image based recaptcha

To counter the bots, google came up with image based recaptcha in the next version, displayed a text and bunch of images. The user has to select all the images that matched the given text.

On top of that, the user's activity like the cursor movements, click position on the images were also monitored. Since humans don't move the mouse in a straight line or click on images/button in the same coordinates every single time.

### How to use it?

Just load a script given in the [docs for recaptcha v3](https://developers.google.com/recaptcha/docs/v3) with your secret key

    <script src="https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key"></script>

Once the script is added, `grecaptcha` will be available in the window. Whenever you want to validate the user, call the `grecaptcha.execute()` function, the recaptcha registers and validates the user session and sends a token as response.

Let's add this to a form submission step, on clicking the submit button the `grecaptcha.execute()` is called and on receiving the token as response, we are sending the token received along with the user data to backend.

Once the submission is received in backend, the token is verified my making a post request to _https://www.google.com/recaptcha/api/siteverify_, which will send a response with a **success** property.

If **success** is true backend can use move forward with the submission process. If **success** is false, the **error-codes** in the response can be used to display a fitting error message in the UI.

    {
      "success": true|false,
      "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
      "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
      "error-codes": [...]        // optional
    }

**The token sent from recaptcha will expire in two minutes**

Start following these practices from early stages of development, to make your site as secure as possible.
