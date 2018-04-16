# delius-in-performance
Experimental MELD interface for British Library exhibition of Delius.

This software is an application-level deployment of the MELD framework for
a digital exhibition of musical materials. Linked data and resources 
published elsewhere are gathered and used to create an interactive web resource
that could be embedded or linked to from a standard content management system.

## Installing
This software requires npm for installation. 

From the `delius-in-performance` directory, run:

`npm install`

This should download and install all required libraries.

## Running
`npm start`

This will start a webserver at localhost:8080 by default 
(this can be changed in `webpack.config.js`). 
The expected way to connect this to an externally visible website is through
mappings handled by your usual webserver
