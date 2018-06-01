/* Setup.js

    Sets up a document with the default nav and footer.

*/


/**
 * Set-up navigation and footer of given page.
 * @return {undefined} Nothing is returned.
 */
function setupPage(){
    
    document.getElementsByTagName("nav")[0].innerHTML = '<ul> <li class="left"><a class="" href="index.html" id="nav-home">Home</a></li> <li class="left"><a class="" href="work.html" id="nav-work">Work</a></li> <li class="left"><a class="" href="projects.html" id="nav-projects">Projects</a></li> <li class="right"><a class="" href="about.html" id="nav-about">About</a></li> </ul>';
    document.getElementsByTagName("footer")[0].innerHTML = '<div class="description left"> <a class="title"> About Me </a> <br> <a class="text"> Just another programmer :v </a> <br> <div class="skills"> <a tooltip="Experienced In PHP" href="http://php.net/">PHP</a> <a tooltip="Experience With Multiple APIs">API</a> <a tooltip="Experienced In SQL; Small And Large Operations!" href="https://www.mysql.com/">SQL</a> <a tooltip="Experienced In CSS" href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a> <a tooltip="Experienced In Java Since I Was 12!" href="https://www.java.com/en/">Java</a> <a tooltip="Experienced With JSONs" href="http://www.json.org/">JSON</a> <a tooltip="Experienced In HTML" href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML</a> <a tooltip="Experienced In Mongo; Small And Large Operations!" href="https://www.mongodb.com/">Mongo</a> <a tooltip="Experienced In Python Since I Was 16!" href="https://www.python.org/">Python</a> <a tooltip="Experienced In Node.js" href="https://nodejs.org/en/">Node.js</a> <a tooltip="Experienced In Javascript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Javascript</a> <a tooltip="Experienced In 2D Design">2D Design</a> <a tooltip="Game Developing Is What Started It All!">Game Developer</a> </div> </div> <div class="contact right"> <a class="title"> Contact Info </a> <br> <a class="text"> You can find and contact me at the following: </a> <br> <div class="info"> <a href="mailto:ccpotential@gmail.com" target="_blank">E-Mail: ccpotential@gmail.com</a> <br> <a href="https://github.com/ClarkThyLord" target="_blank">GitHub: ClarkThyLord</a> <br> <a href="https://discordapp.com/" target="_blank">Discord: Clark thy Lord#7042</a> </div> </div>';
    
}


/**
 * Update navigation's bar currect tab.
 * @param {string} ID of navigation object to set as selected; Options: nav-home, nav-work, nav-projects, nav-about.
 * @return {undefined} Nothing is returned.
 */
function navActivate(element_id){
    
    document.getElementById(element_id).classList.add("active");
    
}
