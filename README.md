MELD Test application
=====================
This repository contains a test application employing [Music Encoding and Linked Data (MELD)](http://github.com/oerc-music/meld). The application drawns on Linked Data and resources published elsewhere to create an interactive web resource that could be embedded or linked to from a standard content management system. As such, the application requires network connectivity to function.

Installing
-----------
MELD has been tested and is known to work on Mac OSX, and on Ubuntu and Fedora Linux distributions.

On a clean install of Ubuntu 18.04: 
* Install git:
``sudo apt install git``

* Install npm:
``sudo apt install npm``

* Clone this git repository:
``git clone https://github.com/oerc-music/meld-test``

* Change directory into the repository:
``cd meld-test``

* Download and install required npm libraries:
``npm install``

* Run the application:
`npm start`

This will start a webserver at localhost:8080 by default 
(this can be changed in `webpack.config.js`). 
The expected way to connect this to an externally visible website is through
mappings handled by your usual webserver

Expected outcome
----------------
When loaded in-browser, several media resources will be loaded:
* Musical score for a string quartet rendered as SVG (from an MEI file)
* Sample IIIF image in a Leaflet canvas
* Two audio playback controls
* One video player with controls
* Some sample text rendered as HTML (from a TEI file)
* Four images of musical score (PNG and JPG)

To test the interaction handlers:
* When clicking on the link labeled "[click to test score highlighting]", the first phrase for Violin I in the SVG score at the top of the page should be highlighted in blue.
* Hovering the cursor over words underlined with squiggly lines should make additional descriptive text appear in definition boxes to the lower right of the screen. 

Media playback issues in Ubuntu
---
Note: Ubuntu 18.04 doesn't by default support mp3 playback in firefox. To enable, run:

`sudo apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly`
