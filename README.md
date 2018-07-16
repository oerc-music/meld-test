MELD Test application
=====================
This repository contains a test application employing [Music Encoding and Linked Data (MELD)](http://github.com/oerc-music/meld). The application drawns on Linked Data and resources published elsewhere to create an interactive web resource that could be embedded or linked to from a standard content management system. As such, *the application requires network connectivity to function*.

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

Web server configuration:
----
Running the application will start a webserver at localhost:8080 by default. 
This can be changed in `package.json`, by editing the line:

 `"start": "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --host localhost --port 8080"`
 
The expected way to connect this to an externally visible website is through
mappings handled by your usual webserver.

Expected outcome
----------------
When loaded in-browser, you should see 6 TEST labels, each attached to different media resources:

* TEST 1: a sample IIIF image in a leaflet canvas
* TEST 2: musical score for a string quartet rendered as SVG (from an MEI file, using Verovio)
* TEST 3: a video player with controls (unstyled)
* TEST 4: two audio players with controls
* TEST 5: Some HTML-rendered text (from a TEI file, using CETEIcean)
* TEST 6: Some non-IIIF images

To test the interaction handlers:
* Click on the "highlight" link in TEST 5 and check that it highlights the first phrase of the violin I part in TEST 2.
* Hover the cursor over words underlined with squiggly lines in TEST 5 and check that it makes additional descriptive text appear in definition boxes to the lower right of the screen. 

If all tests render, and the interactions work as described, you should be all set.

Media playback issues in Ubuntu
---
Note: Ubuntu 18.04 doesn't by default support mp3 playback in firefox. To enable, run:

`sudo apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly`
