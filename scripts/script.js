newE = (type) => document.createElement(type);
/******************************************************************************* 
 * @param {Object} project - Object containing the information for each project  
 * @return {Object} - returns card object to append to the Dom
 * @description - Creates project cards to be used on the dom
********************************************************************************/
const projectCardMaker = (project) => {
    const cardMain = newE('div');
    $(cardMain).addClass('projectCard');

    const card = newE('div');
    card.id = project.id;
    $(card).addClass('content');
    
    const imageContainer = newE('div');
    $(imageContainer).addClass('imgCont')
    const cardImage = newE('img');
    cardImage.src = project.sourceImage;
    $(imageContainer).append(cardImage);
    $(card).append(imageContainer)

    const cardBody = newE('div');
    $(cardBody).addClass('contentText');
    $(card).append(cardBody);

    const cardTitle = newE('h2');
    $(cardTitle).html(project.title);
    $(cardBody).append(cardTitle);

    const cardText = newE('p');
    $(cardText).html(project.description);
    $(cardBody).append(cardText);

    const button = newE('button');
    $(button).on('click', showProject.bind(this, project));
    $(button).html("More");
    const buttonCont = newE('div');
    $(buttonCont).addClass('buttonCont');
    $(buttonCont).append(button);
    // $(cardBody).append(button);
    $(cardMain).append(card, buttonCont);
    return cardMain;
}
/******************************************************************************* 
 * @param {Object} projectObj - Object containing the information for each project
 * @description - Appends information of a given type to the modal
********************************************************************************/
const showProject = (projectObj) => {
    $('#myModal').css("display","flex");
    $('.modalDescription').html(projectObj.writeUp.summary);
    $('.modalProjectSkills').html(projectObj.writeUp.tools);
    $('.modalProjectTitle').html(projectObj.title);
    $('.modalImageContainer').css('background-image',`url('${projectObj.sourceImage}')`);
    if(projectObj.writeUp.url == 'n/a'){
        $('#modalDemo').removeAttr('href');
        $('#modalDemo').addClass('noLink');
    }
    else{
        $('#modalDemo').attr('href', projectObj.writeUp.url);
        $('#modalDemo').removeClass('noLink');
    }
    $('#modalGit').attr('href', projectObj.writeUp.github);
}
/******************************************************************************* 
 * @description - runs an interval updating the clock displayed in PDT 
********************************************************************************/
const startNavBarTime = () => {
    const theTime = () => {
        const date = new Date();
        const option = { timeZone: contact.timeZone, timeZoneName: 'short'}
        $('#time').html(date.toLocaleTimeString('en-US', option));
    }
    theTime();
    setInterval(theTime, 1000);
}
/******************************************************************************* 
 * @description - Iterates through each element in the projects array and appends the 
 * returned value from projectCardMaker() to the Projects Body
********************************************************************************/
const loadProjects = () => {
    projects.forEach((project) => {
        $('#projectsBody').append(projectCardMaker(project));
    });
}
/******************************************************************************* 
 * @description - sets the relevant links to the Contact section
********************************************************************************/
const setContacts = () => {
    $('#github').attr('href', contact.github);
    $('#linkedin').attr('href', contact.linkedin);
    $('#emailadd').attr('href', `mailto:${contact.email}`);
    // $('#resumeAttach').attr('href', 'docs/resume.pdf');
}
/*******************************************************************************
 * @description - Gets the weather information from API Call and populates it to
 * the navbar, runs 5 minute interval to keep information updated.
 *******************************************************************************/
const updateWeather = () => {
    const fillWeatherInfo = async () => {
        const getWeather = async () => {
            try{
                const key = '7d98db344ac643c69ab184637222007';
                const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${contact.location}&aqi=no`;
                const responseURL = await fetch(url);
                response = responseURL.json();
                return response;
            }
            catch (ex) {
                return "";
            }
        }
        const weather = await getWeather();
        if(weather != ""){
            const image = newE('img')
            image.src = 'http:' + weather.current.condition.icon;
            $('#temp').html(weather.current.temp_c + '°C');
            $('#icon').html(image)
        }
    }
    const fiveMinutes = 300000
    $('#location').html(contact.location + ': ')
    fillWeatherInfo();
    setInterval(fillWeatherInfo, fiveMinutes);
}
//Sets initial Background
const setBackground = () => {
    pixelWidth = 900;
    if(parseInt(window.innerWidth) > pixelWidth){
        $('#background-video').css('background', 'url(images/bgVid.m4v)')
        $('#background-video').attr("src", 'images/bgVid.m4v')
    }
}
//Small easter Egg, clicking the red square in Contact Me turns it into a circle (or back to a Square)
const circle = () => {
    const border = $('#contactSquare').css('border-radius');
    let size;
    size = border == "50px" ? size = 0 : size = 50;
    $('#contactSquare').css("border-radius", size);
}
//Populates the About Me Section
const addAboutContent = () => {
    $('#aboutIntro').html(aboutMe.aboutIntro);
    $('#aboutImmersion').html(aboutMe.aboutImmersion);
    $('#aboutHobbies').html(aboutMe.aboutHobbies);
    $('#aboutMuse').html(aboutMe.aboutMuse);
    $('#aboutCaption').html(aboutMe.aboutCaption);
}
/******************************************************************************* 
 * @description Document Ready function that calls everything needed to fill in the content and run API calls
********************************************************************************/
$(document).ready(()=>{
    updateWeather();
    setContacts();
    addAboutContent();
    loadProjects();
    startNavBarTime();
    setBackground();
});
/*******************************************************************************
 * @description Functionality to remove Modal
 ******************************************************************************/
$('.close').on("click",()=>{$('#myModal').fadeOut(600)})
$(window).on("click", function(event) {
    if (event.target.id == 'myModal')
        $('#myModal').fadeOut(500);
});

/******************************************************************************* 
 * Event Listeners / Anonymous Functions
********************************************************************************/
/** @description - Smooth scrolling functionality */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/** @description - Resize event that will Render in / Remove the Alexandra Falls video depending on size of viewports */ 
$(window).resize(()=>{
    pixelWidth = 900;
    background = $('#background-video').css('background') == 'url(images/bgVid.m4v)' ? true : false; 
    if(parseInt(window.innerWidth) >= pixelWidth && !background){
        $('#background-video').css('background', 'url(images/bgVid.m4v)')
        $('#background-video').attr("src", 'images/bgVid.m4v')
    }
    else if(parseInt(window.innerWidth) < pixelWidth && background){
        $('#background-video').css('background', '');
        $('#background-video').removeAttr('src');
    }
});

$('#contactSquare').on("click", circle);

/** @description - Makes Project Cards Disappear to reveal the Alexandra Falls video */
$('.projectTitle').on("click", () => {
    let set = $('.projectCard').css('display') == 'block' ? "none" : 'block';
    let bgColor = $('.projectCard').css('display') == 'block'? "green" : ''; 
    $('.projectCard').css('display', set);
    $('.projectTitle').css('background-color', bgColor)
});
