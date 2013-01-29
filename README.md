#olin.js #3 — client side JS

We'll be covering javascript on the client side.

## A few points, motivated by HW feedback

**Recap**:

* **Express** is a *server* library. It is an abstraction for Node. Reference is here: <http://nodejs.org/api/>
* **Jade** is a way to make *templates*, HTML pages that can have strings and other content easily added into them. Refernce is here: <http://naltatis.github.com/jade-syntax-docs/>
* **Mongoose** is a *database* library. It is an abstraction for MongoDB. Reference is here: <http://mongoosejs.com/docs/guide.html>

**Mongoose queries** 

This:

```
Person.find({name,"ronald"}, function (err,person) {
  console.log(person)
})
```

is equivalent to:

```
Person.find({name,"ronald"}).exec(function (err,person) {
  console.log(person)
})
```

The second one is cleaner, and lets you chain stuff other functions inbetween the call to **find** and **exec**, like this:

```
people
  .where("name","ronald")
  .where('age').gte(25)
  .where('interests').in(['movies', 'long walks', 'mongoDB'])
  .select('name', 'age', 'interests')
  .skip(20)
  .limit(10)
  .asc('age')
  .exec(function (err,people) {
    console.log(people)
  });
```

But why do we need `exec` at the end? According to the [mongoose docs](http://mongoosejs.com/docs/2.7.x/docs/query.html) 

```
Query.exec
  Executes the query passing the results to the optional callback.
```

Mongoose tries to be smart and holds off on executing most queries. Take for example our previous query where we changed 

```
people
  .where("name","ronald")
  .where('age').gte(25)
  .where('interests').in(['movies', 'long walks', 'mongoDB'])
  .select('name', 'age', 'interests')
  .skip(20)
  .limit(10)
  .asc('age')
  .exec(function (err,people) {
    console.log(people)
  });
```

We could do this same thing by the following pesudocode

```js
people.find({"name", "ronald"}, function(err, ronalds) {
  ronalds.find({"age":{"$gt":25}}, function(err, twentyFives) {
    twentyFives.find({"interests":{"$in":['movies', 'long walks', 'mongoDB']}}, function (err, sameInterests) {
      // do more call back functions in here
      ...
      ...
    });
  });
});
```

The difference between **chaining** the method calls to people and having a bazillion callbacks is

* tons of callbacks end up looking really ugly. Imagine 7 nested callbacks. WTF is going on?
* Each callback is actually making Mongo execute the query, which makes 7 in total. If you chain, Mongoose attempts to be smart about it and creates ONE super complicated Mongo Query that it executes only once.

There are ton of commands you can chain to a Mongoose query, check out the page [here](http://mongoosejs.com/docs/2.7.x/docs/query.html) for a description of all of them.

**Text Editing**

Sublime Text is the best text editor. Get it.

*Install on Ubuntu:*

```
sudo add-apt-repository ppa:webupd8team/sublime-text-2
sudo apt-get update
sudo apt-get install sublime-text
```

*Install on OSX:*

Download it [here](http://c758482.r82.cf2.rackcdn.com/Sublime%20Text%202.0.1.dmg)

*Some Handy commands:*

Comment chunk of code: `command + /` (OSX) or `ctrl + /` (Linux)

**Restart Server Automatically**

Install `supervisor` to automatically restart your server whenever you make a change to your code. No more having to restart your server manually!

Run:

```
sudo npm install -g supervisor
```

Then instead of `node app.js`, you can do:

```
supervisor app.js
```

## The drill

You know it. *Fork this repository*, then:

```
$ git clone https://github.com/______/olinjs-3.git
$ cd olinjs-3
$ express
$ [sudo] npm install
$ node app
Express server listening on port 3000
```

### Static Content

In your application folder exists a folder `public/images`. In this directory either save or `wget` this image and name it "david.jpg":

![https://twimg0-a.akamaihd.net/profile_images/1584353041/267776_10150244291269010_590714009_7743869_8142651_n.jpg](https://twimg0-a.akamaihd.net/profile_images/1584353041/267776_10150244291269010_590714009_7743869_8142651_n.jpg)

Run your server (`node app`) and go to [http://localhost:3000/images/david.jpg](http://localhost:3000/images/david.jpg). And that's how you store images! And movies, stylesheets, and scripts! Think of all the cat pictures! You'll build the next Reddit in no time.

<!--

### Sessions

Last class we showed you how to use a database. This class we're going to quickly introduce the concept of sessions. A **session** is a data store that is unique to each user's web browser, but the information is only visible to the server. Think of it as giving each user a unique order number, and when they request a webpage, you can customize it to their liking&mdash;but if they lose their order number, that information is gone. Thus, it's generally only appropriate to store some kinds of data in a session, like what account the user is logged in as or temporary settings. Depending on the user's setup, the next time they close their browser the session may be cleared.

Let's compare the types of ways we can store information.

1. **Sessions.** A session is any temporary information about the person requesting a webpage. If a user logs in, you can add their username to their **session**. If they come back in a week and haven't cleared their cookies, they will still be logged in. If they clear their cookies, next time they go to your webpage, they start a new session.
1. **Database.** A database is for long-term data storage you never want deleted (unintentionally). You would store a user's username in a session, but store their name, date of birth, and dreams in a database. That way their information outlives them closing their browser window.

For completeness sake, let's consider other ways we can explore data:

1. **Cookies.** Cookies are strings of information you store on a user's computer. Unlike sessions, cookies are generally in plaintext, i.e. a user can go ahead and edit their cookies. Cookies would be useful to store a user's preferred font size, but not their username, lest someone evil go ahead and set `document.cookie = 'username=supersecretadmindad'`. Muy mal.
1. **Global variables.** You might hear them described as "bad" or "evil" but our only consideration is that global variables go away when your server resets. On Heroku, your server might reset as often as every 10 minutes! Don't expect global variables to last long.
1. **Files.** Though we haven't covered it yet, Node can read and write files on your computer. Heroku doesn't let you write files, however, so we are going to remain willfully ignorant for a while.

-->

## Quick overview on HTML

**H**yper **T**ext **M**arkup **L**anguage is what is used to describe web pages. HTML consists of a set of **tags** that tell your browser what to render on your page, interspersed with text. A *start tag* looks like this `<tag>` and is finished with an *end tag* `</tag>`. A start tag can also include *attributes*, like `<a href="http://olinjs.github.com/">Olin.js is awesome</a>`. Here `href` is an attribute with the quoted value `http://olinjs.github.com/` and the content `Olin.js is awesome`.

You can right click any webpage and click "View Source", and you'll see what HTML any page is made of. Pretty neat.

Every webpage follows this structure:

```html
<!DOCTYPE html>
<html>
 <head>
   ... some information goes here ...
 </head>
 <body>
   ... some content go here ...
 </body>
</html>
```

Inbetween head `tags` are **metadata**. The `<title>` tag sets the title of the tab you are viewing. `<meta>` tags include informations for Search Engine Optimization for showing up on Google. In addition, you can add `<script>` tags in your header; we'll get to that in your moment.

All of your content goes in your `<body>`. **`<div>`** tags are the most basic tag, and denote a box, any kind of box, that stores other tags and content. To denote text which is more specific, you can use more specific tags:

* `<p>...</p>` is a paragraph of text. `<h1>...</h1>` is a heading, the font size reflects this. There are headings `h1` through `h6`.
* `<span>...</span>` denotes a span of *inline text*. You use a span where the text is inside a paragraph and next to other text, and you use a div for entire block of text.
* `<b>...</b>` is bold text; `<i>...</i>` is italic text.
* `<a href="http://google.com/">...</a>` makes a *hyperlink*, which is the foundation of the entire internet.
* `<img src="http://avatars.io/facebook/timcameronryan">` is an image. Note that there is no `</img>` tag, in this case.

You can nest these tags arbitrarily (in most cases):

```html
<body>
  <h1>I'm a heading!</h1>
  <div>
    <p>I'm in a div!<p>
    <span> I'm also in a div!</span>
    <div><b>Divception!</b></div>
  </div>
</body>
```

Those of you unfamiliar with HTML should really go through [the W3C HTML tutorial](http://www.w3schools.com/html/html_intro.asp).

Great, now you can understand these non-nerdy nerd shirts. See, I told you this class would be useful.

![http://johngushue.typepad.com/photos/uncategorized/2007/03/23/body_html_code_tshirt.gif](http://johngushue.typepad.com/photos/uncategorized/2007/03/23/body_html_code_tshirt.gif)

## Client-side JavaScript

JavaScript is a language. Node (server-side) is a "platform". Your browser (client-side) is also a "platform" that runs JavaScript, with a lot of different capabilities.

**What is client-side JS good for?** Before, we used JavaScript to serve websites. Now we'll use client-side JS to add *interactivity* to a page. You used Jade in the last lesson to make templates that display content, forms, etc. After a user gets your template, though, they can't do much until they submit a form or go to a new page. With client-side JS, we can make your website much more useful and powerful.

**One important caveat:** client-side code knows nothing about your server. For all it cares you could be running Python, Ruby, ALGOL or on a [Commodore 64](www.c64web.com). So when you write JavaScript in Node.js, you can't run the same functions in your web browser. We'll explain later how to make them communicate with each other.



**A simple example.** Go to your webpage. If you're using Chrome 

## jQuery

* What is a client side library?

Included via \<script\> tags.

* introduce jQuery. Why do we use it?

Makes editing HTML easy

* What does $() do?

Go to your console and type

```js
$('p').hide()
```

Now type

```js
$('p').show()
```

Then type

```js
$('p').css('background', 'blue')
```

*And then type*

```js
$('p').text("I'm sick of typing $()!")
```

(But do type this out by hand, since you'll be doing this a lot.)

You get the idea! jQuery is a <s>fun</s> way to mix and mash up HTML that a user is viewing. jQuery is nearly universal, and a large, large percentage of the top 100 websites use it. The reason? There is a manual way to do each of these tasks, and it's grueling. 

* Do some DOM manipulations.

Oh look you can make colors change and change text and create cat images

* Show some jQuery libraries.

EW no

## Communication between the Server and the Client: Ajax

**Ajax** refers to communicating between a web page and a server using JavaScript. 

Communication between the client and the server-side using HTTP requests.

* Why is it useful? Give some examples

Communicating a list

* Run through $.get, $.post, and $.ajax

* Simple "TODO" list app
