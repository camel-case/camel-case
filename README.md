# **camel-case**

![newspulsedemo](https://dl.dropboxusercontent.com/u/106304615/news-pulse.gif)

##### https://news-pulse.herokuapp.com

### Quick Start
`$ git clone https://github.com/camel-case/camel-case.git`  
`$ cd camel-case`  
`$ npm install`  
`$ npm serve`  
`$ npm bundle`  

### Stack
+ React
+ React-Redux
+ React-Router
+ React-Router-Redux
+ Redux
+ Redux-Thunk
+ Firebase
+ Babel
+ Webpack
+ d3-scale

### Background

News-pulse is a new way to read and react to daily trending articles from the New York Times. Users simply need to hover over a pulsating orb, which in turn reveals an article headline and a small snippet from that article. After reading the article users can click a reaction that best represents their feelings towards the situation. Depending on what emotion dominates each of the articles, the color of the orb changes. If more people participate in inputting a reaction, the orb pulsates even faster. All reactions from users are displayed in real-time through an open stream to the Firebase database.

### Legend:
**Red** = Angry || 😠  
**Blue** = Sad || 😥  
**Black** = Afraid || 😨  
**Green** = Happy || 😃  

The speed of the pulsating orbs is dicatated by the relative user engagement with a particular article on the page. To access other sections of the New York Times, click the hamburger menu located at the top left. To access past articles and reactions click on the date located at top right.
