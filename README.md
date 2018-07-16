MELD Test application
=====================
This repository contains a test application employing [http://github.com/oerc-music/meld](Music Encoding and Linked Data \(MELD\)). The application drawns on Linked Data and resources published elsewhere to create an interactive web resource that could be embedded or linked to from a standard content management system. As such, the application requires network connectivity to function.

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

Media playback issues in Ubuntu
---
Note: Ubuntu 18.04 doesn't by default support mp3 playback in firefox. To enable, run:

`sudo apt-get install gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly`
