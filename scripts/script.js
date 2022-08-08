newE = (type) => document.createElement(type);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
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
    $(button).attr("data-toggle", "modal");
    $(button).attr("data-target", "projectModal");
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
    console.log(projectObj.id);
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
}

const updateWeather = () => {
    const fillWeatherInfo = async () => {
        const getWeather = async () => {
            try{
                const key = '7d98db344ac643c69ab184637222007';
                const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${contact.location}&aqi=no`;
                const responseURL = await fetch(url);
                response = responseURL.json();
                return response;
            }
            catch (ex) {
                return "";
            }
        }
        const weather = await getWeather();
        console.log(weather);
        if(weather != ""){
            const image = newE('img')
            image.src = 'http:' + weather.current.condition.icon;
            $('#temp').html(weather.current.temp_c + '°C');
            $('#icon').html(image)
        }
    }
    const fiveMinutes = 300000
    fillWeatherInfo();
    setInterval(fillWeatherInfo, fiveMinutes);
}
const setBackground = () => {
    if(parseInt(window.innerWidth) > 550){
        $('#background-video').css('background', 'url(images/bgVid.m4v)')
        $('#background-video').attr("src", 'images/bgVid.m4v')
        $('#projects').css('background-image', 'url(images/background3.jpg)');
        $('#contact').css('background-image', 'url(images/background2.webp)')
    }
}
/******************************************************************************* 
 * 
********************************************************************************/
$(document).ready(()=>{
    updateWeather();
    setContacts();
    loadProjects();
    startNavBarTime();
    setBackground();
});