/*

Redo link organization

Site name, Site Link


Have a 12ft.io link generator function.
*/

const newsSites = {
    "BBC News": "https://www.bbc.com/news",
    "CNN": "https://www.cnn.com",
    "The New York Times": "https://www.nytimes.com",
    "The Guardian": "https://www.theguardian.com",
    "Reuters": "https://www.reuters.com",
    "Associated Press": "https://apnews.com",
    "Al Jazeera": "https://www.aljazeera.com",
    "Bloomberg": "https://www.bloomberg.com",
    "Fox News": "https://www.foxnews.com",
    "NPR": "https://www.npr.org"
  };


function updateProgressTracker() {
    const numsitesInCategory = Object.keys(siteLinks[currentsiteCategory]).length;
    const percentageCompleted = (currentsiteIndex + 1) / numsitesInCategory * 100;
    const progressTracker = document.getElementById('progress-tracker');
    progressTracker.innerText = `${currentsiteIndex + 1} of ${numsitesInCategory}`;

    const progressBarForeground = document.getElementById('progress-bar-foreground');
    progressBarForeground.style.width = `${percentageCompleted}%`;
}

let currentSiteIndex = 0;

function displayCurrentSite() {
    let siteNames = Object.keys(newsSites);
    let siteName = siteNames[currentSiteIndex];
    let siteURL = newsSites[siteName];
    
    if (siteURL) {
      // Print the information about the current site to the console
      console.log(`Site Name: ${siteName}`);
      console.log(`Site URL: ${siteURL}`);
      
      // Update the site title or perform other actions as needed
      document.getElementById('site-title').textContent = siteName;
      document.getElementById('site-player').src = siteURL;
    } else {
      console.error(`Site '${siteName}' not found in newsSites.`);
    }
  }
  

// Function to navigate to the next site
function nextSite() {
  if (currentSiteIndex < Object.keys(newsSites).length - 1) {
    currentSiteIndex++;
    displayCurrentSite();
  }
}

// Function to navigate to the previous site
function previousSite() {
  if (currentSiteIndex > 0) {
    currentSiteIndex--;
    displayCurrentSite();
  }
}


const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

// Add event listeners for the buttons
nextButton.addEventListener('click', () => {
    // Call the function to navigate to the next site
    nextSite();
});

previousButton.addEventListener('click', () => {
    // Call the function to navigate to the previous site
    previousSite();
});

displayCurrentSite();