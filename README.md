# Slique #
A clean and soothing theme for Reddit. [View the demo](http://reddit.com/r/slique) for
markup required to style the sidebar.


### Installation ###
1. Click on [slique.css](https://raw.githubusercontent.com/leb2/slique/master/slique.css) and paste the code into your subreddit's stylesheet.
2. Upload the images in the images folder (but not the icons!) and hit save.

### Modules ###
If you don't want the hamburger dropdown menu, instead use the css from [slique_base.css](https://raw.githubusercontent.com/leb2/slique/master/slique_base.css) 

### Custom Build ###
If you know how to use the command line and want to build your own version of slique, the modifiable variables are in `sass/_variables.scss`.

1. Clone the project.
2. Install [Node](https://nodejs.org/en/) and run `npm install` in the project's base directory.
3. Install gulp with `npm install --global gulp`.
4. Edit `sass/_variables.scss` or any of the other sass files and run `gulp build` to produce the output css file.
5. Copy and paste the css from slique.css into your subreddit's stylesheet and upload the images.
