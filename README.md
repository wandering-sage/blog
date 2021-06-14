<div align="center">

<h1><a href="https://blog-heroku-s.herokuapp.com/">Blog (MERN)</a></h1>

<p>
  <strong>A Full Stack Website for bloging</strong>
  <br />
</p>

<p>
  <sub>Made with ❤︎ by
    <a href="https://github.com/wandering-sage">Shivam Kumar</a>
  </sub>
</p>
</div>


## Project in Action

<img src="/blog_ss.png">

## Getting Started
- Clone this repo and unzip the folder wherever you want.
- Launch your **Terminal** or **Command prompt**
- Change directory to where you unzipped this folder.
- OR copy these commands
```bash
cd Desktop
git clone https://github.com/wandering-sage/blog.git
cd blog
```

### Backend

-To start backend, change directory to api
```bash
cd api
```
- Type npm install to install the dependencies.
- Type npm run build, to transpile the code to ./dist
- Type npm start to start the program.
```bash
npm install
npm run build
npm start
```
- You can use npm dev to start a development server.
```bash
npm run dev
```
- The website will be running at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- Enjoy!

### FrontEnd
- To Launch FrontEnd of this porject, go inside client directory
```bash
cd client
```
- Type npm install to install the dependencies.
- Type npm start to launch.
```bash
npm install
npm start
```

## File Structure

### Backend
```
api
└───src
    │   index.js
    │   server.js
    │   
    ├───config
    │       dev.js
    │       index.js
    │       
    ├───resources
    │   ├───comment
    │   │       comment.controllers.js
    │   │       comment.model.js
    │   │       comment.router.js
    │   │       
    │   ├───like
    │   │       like.controllers.js
    │   │       like.model.js
    │   │       like.router.js
    │   │       
    │   ├───post
    │   │       post.controllers.js
    │   │       post.model.js
    │   │       post.router.js
    │   │       
    │   └───user
    │           user.controllers.js
    │           user.model.js
    │           user.router.js
    │           
    └───utils
            auth.js
            crud.js
            db.js
            error.js
```

### FrontEnd
```
client
└───src
    │   app.css
    │   App.js
    │   backend.js
    │   index.js
    │   user.js
    │
    ├───components
    │   ├───addComment
    │   ├───blogs
    │   ├───comment
    │   ├───header
    │   ├───navbar
    │   └───singleBlog
    └───pages
        ├───login
        ├───readBlog
        ├───signup
        └───writeBlog
```
