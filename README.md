# GO2 markets technical assignment by Kiryl Sauko 🚀

## Application starting 🛠️
Since the application is quite simple you don't need to run any command here. You just need to open the `index.html` file in your browser and everything is going to work. 

## Demo 🧑‍💻
I deployed the application via GitHub pages, so if you prefer to test it in this way feel free to reach the application by this link [https://kirillsavko.github.io/go2-assignment/](https://kirillsavko.github.io/go2-assignment/).

## General information ℹ️
I decided to go with the simplest approach - pure HTML, CSS and JS. The application is not big or tricky and there is no need to use a framework in my opinion. It would've been too much here. <br />
Every commit has detailed information, so if you have a question about implementation please have a look at the commit message, it might contain the answer!

### HTML 
I tried to write it as much as possible semantically correct HTML including using correct tags and additional attributes.

### CSS
I decided to go with the BEM methodology for selectors naming. I've used it a lot in the past and I do believe it's a great one. If you want to learn more about this please check this link out [https://en.bem.info/methodology/quick-start/](https://en.bem.info/methodology/quick-start/). <br />
For the declaration order of CSS properties I always use the approach below. I like how the order works from the logical perspective (the most important properties in the top). It keeps all properties in the order which is cool because you don't need extra effort for writing it, and you always know where a property is regardless the selector or CSS file.
1) Positioning;
2) Block model (`display, width, height, padding, margin`);
3) Font;
4) Appearance (`background, border` etc.);
5) Everything else (`transition, cursor` etc.).

### JS
In the beginning I thought that I was going to write less JS code, but when I started working with JS I changed my opinion. <br />
I wanted to keep as much logic as I could outside of JS, for example the country code select. In the beginning it almost didn't interact with JS, but then I recognized that it's not worth to be that strict about extracting that much logic from JS because user experience was affected by that. Some components didn't work as I would like to have them working from the UX perspective which is bad because UX should be treated one of the most important things in WEB if not the most important. So, that's why I decided to stop this idea and use JS to achieve better user experience.

### Questions
If you have any questions, or you would like to discuss something regarding the coding challenge please feel free to contact me, I would love answer all questions you might have! <br />
Email for the contact: [kirillsavko25@gmail.com](mailto:kirillsavko25@gmail.com).

## P.S.
I'd like to thank everyone who was involved in creating this coding challenge. On one hand it's not big, but on other hand you have to think about many things in this challenge. It also made me to remember some things which is always cool because it kinda refreshes your skill! Thanks!
