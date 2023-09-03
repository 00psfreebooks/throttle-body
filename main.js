const newsSites = {
  "FOX News": "www.foxnews.com",
  "Wall Street Journal": "www.wsj.com",
  "Barrons": "www.barrons.com",
  "Forbes": "www.forbes.com",
  "CNN": "www.cnn.com",
  "CNBC": "www.cnbc.com",
  "Yahoo": "www.yahoo.com",
  "EPOCH Times": "www.theepochtimes.com",
  "Reuters": "www.reuters.com",
};

let currentSiteIndex = 0;

function displayCurrentSite() {
  let siteNames = Object.keys(newsSites);
  let siteName = siteNames[currentSiteIndex];
  let siteURL = newsSites[siteName];
  
  if (siteURL) {
    // Print the information about the current site to the console
    console.log(`Site Name: ${siteName}`);
    console.log(`Site URL: ${siteURL}`);

    siteURL = "https://12ft.io/proxy?q=" + siteURL;
    console.log(`Modded Site URL: ${siteURL}`);
    
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