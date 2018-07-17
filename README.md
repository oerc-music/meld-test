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

Testing with self-hosted media resources
-----
* Download copies of all media resources and Linked Data (RDF nquads and JSON-LD) files and place them in a web-accessible path on your server:
   - https://meld.linkedmusic.org/resources/test/Late-Swallows-opening.mei
   - https://meld.linkedmusic.org/resources/test/Late-Swallows-Villiers-opening.mp3
   - https://meld.linkedmusic.org/resources/test/brigg-fair-p8.mp3
   - https://meld.linkedmusic.org/resources/test/Late-Swallows-opening-vln1.mp4
   - https://meld.linkedmusic.org/resources/test/meld-test.tei
   - https://meld.linkedmusic.org/resources/test/villiers-score.png
   - https://meld.linkedmusic.org/resources/test/brigg-fair-beecham-p8-ii.jpg
   - https://meld.linkedmusic.org/resources/test/ms_mus_1745-2-5_146v.jpg
   - https://meld.linkedmusic.org/resources/test/Late-Swallows.nq
   - https://meld.linkedmusic.org/resources/test/Brigg-Fair.nq
   - https://meld.linkedmusic.org/resources/test/meld-test.json-ld

OR, for convenience: 

* download and extract the following tarball which contains all of the resources listed above:
http://meld.linkedmusic.org/resources/test/meld-test-data.tgz

* Ensure your web server is configured so that the resources can be served from their new location

* Change the URI basenames in `meld-test.json-ld`, `Late-Swallows.nq`, and `Brigg-Fair.nq` to point to your new location:
   - Replace `https://meld.linkedmusic.org/resources/test/` with `https://your-server-here.example/path/to/resources/`



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

* TEST 1: a sample IIIF image in a leaflet canvas served from https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json
* TEST 2: musical score for a string quartet rendered as SVG (from an MEI file, using Verovio) served from https://meld.linkedmusic.org/companion/mei/Late-Swallows-opening.mei
* TEST 3: a video player with controls (unstyled) served from https://meld.linkedmusic.org/companion/audio/Late-Swallows-opening-vln1.mp4
* TEST 4: two audio players with controls, served from https://meld.linkedmusic.org/companion/audio/Late-Swallows-Villiers-opening.mp3 and https://meld.linkedmusic.org/companion/audio/brigg-fair-p8.mp3
* TEST 5: Some HTML-rendered text (from a TEI file, using CETEIcean) served from https://meld.linkedmusic.org/companion/audio/brigg-fair-p8.mp3
* TEST 6: Some non-IIIF images served from https://meld.linkedmusic.org/companion/images/villiers-score.png, https://meld.linkedmusic.org/companion/images/brigg-fair-beecham-p8-i.jpg, https://meld.linkedmusic.org/companion/images/brigg-fair-beecham-p8-ii.jpg, and https://meld.linkedmusic.org/companion/images/ms_mus_1745!2!5_146v.jpg

To test the interaction handlers:
* Click on the "highlight" link in TEST 5 and check that it highlights the first phrase of the violin I part in TEST 2.
* Hover the cursor over words underlined with squiggly lines in TEST 5 and check that it makes additional descriptive text appear in definition boxes to the lower right of the screen. 

If all tests render, and the interactions work as described, you should be all set.

Media playback issues in Ubuntu
---
Note: Ubuntu 18.04 doesn't by default support mp3 playback in firefox. To enable, run:

`sudo apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly`
