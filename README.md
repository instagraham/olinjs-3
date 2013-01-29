#olin.js #3 — client side JS

We'll be covering javascript on the client side.

## Recap

* **Express** is a *server* library. It is an abstraction for Node.
* **Jade** is a way to make *templates*, HTML pages that can have strings and other content easily added into them.
* **Mongoose** is a *database* library. It is an abstraction for MongoDB.

## Two More Express Features

You know the drill. Fork this repository, then:

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

### Sessions

Last class we showed you how to use a database. This class we're going to quickly introduce the concept of sessions. A **session** is a data store that is unique to each user's web browser, but the information is only visible to the server. Think of it as giving each user a unique order number, and when they request a webpage, you can customize it to their liking&mdash;but if they lose their order number, that information is gone. Thus, it's generally only appropriate to store some kinds of data in a session, like what account the user is logged in as or temporary settings. Depending on the user's setup, the next time they close their browser the session may be cleared.

Let's compare the types of ways we can store information.

1. **Sessions.** A session is any temporary information about the person requesting a webpage. If a user logs in, you can add their username to their **session**. If they come back in a week and haven't cleared their cookies, they will still be logged in. If they clear their cookies, next time they go to your webpage, they start a new session.
1. **Database.** A database is for long-term data storage you never want deleted (unintentionally). You would store a user's username in a session, but store their name, date of birth, and dreams in a database. That way their information outlives them closing their browser window.

For completeness sake, let's consider other ways we can explore data:

1. **Cookies.** Cookies are strings of information you store on a user's computer. Unlike sessions, cookies are generally in plaintext, i.e. a user can go ahead and edit their cookies. Cookies would be useful to store a user's preferred font size, but not their username, lest someone evil go ahead and set `document.cookie = 'username=supersecretadmindad'`. Muy mal.
1. **Global variables.** You might hear them described as "bad" or "evil" but our only consideration is that global variables go away when your server resets. On Heroku, your server might reset as often as every 10 minutes! Don't expect global variables to last long.
1. **Files.** Though we haven't covered it yet, Node can read and write files on your computer. Heroku doesn't let you write files, however, so we are going to remain willfully ignorant for a while.

## Client-side JavaScript

JavaScript is a language. Node is a "platform". Your browser is also a "platform" that runs JavaScript. There are similarities and differences, so prepare your cognitive dissonance engines.

### Client vs Server-side

Client-side JavaScript is a script that runs in your browser. Effectively, client-side code knows nothing about your server. For all it cares you could be running Python, Ruby, ALGOL or on a [Commodore 64](www.c64web.com). This complicates things.

**What is client-side JS good for?** Before we were serving up webpages. Client-side JS is all about interactivity. You used Jade to make templates that display content, forms, etc. Beyond the limits of what a template can accomplish, client-side JS picks up the slack.

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
