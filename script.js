newE = (type) => document.createElement(type);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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
    // $(button).on('click', showProject.bind(this, project));
    $(button).html("More");
    $(cardBody).append(button);
    $(cardMain).append(card);
    return cardMain;
}

$(document).ready(()=>{$('#projectsBody').append(projectCardMaker(projects[0]));$('#projectsBody').append(projectCardMaker(projects[0]));$('#projectsBody').append(projectCardMaker(projects[0]));$('#projectsBody').append(projectCardMaker(projects[0]));$('#projectsBody').append(projectCardMaker(projects[0]));})