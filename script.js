
window.addEventListener('DOMContentLoaded', doTheStuff);

function doTheStuff() {
    console.log('The stuff is being done!!!!');
    const navLinks = document.getElementById('page-nav');
    const mobileNavShowButton = document.getElementById('mobile-nav-show-button');

    mobileNavShowButton.addEventListener('click', event => {
        if (navLinks.classList.contains('opened')) {
            navLinks.classList.remove('opened');
        } else {
            navLinks.classList.add('opened');
        }
    });

    // note...
    // I am listening to the PARENT item of the links
    // this is an example of "event bubbling"
    // when the link is clicked the event "bubbles up" to each parent item
    // so I only have to listen to the one element (#page-nave) for click events
    // instead of needing to add a click listener to each nav item individually
    // event.target contains the element that was actually clicked
    navLinks.addEventListener('click', event => {
        console.log('WE GOT A CLICK', event.target);

        // if it's not a link we don't want the event it won't have an href
        if (event.target.tagName !== 'A') {
            return;
        }

        // the a would try to navigate to a new page (whatever is in href) without this... this prevents that
        event.preventDefault();

        const eventHref = event.target.getAttribute('href');

        if (!eventHref.startsWith('#')) {
            alert('INVALID LINK!!!');
            return;
        }

        const targetPage = document.getElementById('page-' + eventHref.replace('#', ''));

        if (!targetPage) {
            alert('TARGET PAGE NOT FOUND!!!');
        }

        // remove "showing" class from ALL inner-content elements
        const contentElements = document.getElementsByClassName('inner-content');
        Array.from(contentElements).forEach(element => element.classList.remove('showing'));

        // add "showing" to the one we want to show
        targetPage.classList.add('showing');

        // also close the nav
        navLinks.classList.remove('opened');
    });
}