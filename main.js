const rssSites = {
  "FOX Latest": "https://moxie.foxnews.com/google-publisher/latest.xml",
  "FOX World": "https://moxie.foxnews.com/google-publisher/world.xml",
  "FOX Politics": "https://moxie.foxnews.com/google-publisher/politics.xml",
  "WSJ World": "https://feeds.a.dj.com/rss/RSSWorldNews.xml",
  "WSJ Market": "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
  "WSJ Tech": "https://feeds.a.dj.com/rss/RSSWSJD.xml",
  "NY Times US": "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
  "NY Times Politics": "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
  "NY Times Tech": "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  "EPOCH US Politics": "https://feed.theepochtimes.com/us/us-politics/feed",
  "EPOCH Companies": "https://feed.theepochtimes.com/business/companies/feed",
  "EPOCH Economy": "https://feed.theepochtimes.com/business/economies/feed",
  //"Yahoo News": "https://news.yahoo.com/rss/",
  //"Google News": "https://news.google.com/news/rss",
};

const proxyURL = 'https://thingproxy.freeboard.io/fetch/';

let currentSiteIndex = 0;
let currentFeedIndex = 0;
let parser = new RSSParser();
let currentFeed = [];

function displayCurrentSite() {
  let siteNames = Object.keys(rssSites);
  let siteName = siteNames[currentSiteIndex];

  if (siteName) {
    // Update the site title
    document.getElementById('site-title').textContent = siteName;

    // Fetch and parse the RSS feed based on the current site name
    let siteURL = rssSites[siteName];

    // Use the ThingProxy service to bypass CORS restrictions
    let proxySiteURL = proxyURL + encodeURIComponent(siteURL);

    parser.parseURL(proxySiteURL, function (err, feed) {
      if (err) {
        console.error(`Error fetching RSS feed for '${siteName}':`, err);
        return;
      }

      // Update the current feed and reset the feed index
      currentFeed = feed.items;
      currentFeedIndex = 0;

      // Display all items
      displayAllItems();
    });
  } else {
    console.error(`Site not found at index '${currentSiteIndex}'.`);
  }
}

function formatContent(content) {
  // Use a regular expression to remove HTML tags and replace certain entities
  const strippedContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&apos;/g, "'"); // Replace &apos; with '

  // You can further format the content as needed, e.g., removing extra spaces or line breaks
  // For simplicity, let's just return the stripped content in this example
  return strippedContent;
}

function displayAllItems() {
  //console.log('displayAllItems called');
  let articleContainer = document.getElementById('article-container');
  if (articleContainer) {
    articleContainer.innerHTML = ''; // Clear the existing content
    currentFeed.forEach((item, index) => {
      const formattedContent = formatContent(item.content);

      // Check if the item has a 'guid' property, and use it if available; otherwise, use 'link'
      let link;
      if (item.guid) {
        //console.log('guid: ', item.guid);
        link = item.guid;
      } else {
        //console.log('link: ', item.link);
        link = item.link
      }

      const itemHTML = `<h3><a href="${link}" target="_blank">${item.title}</a></h3><p>${formattedContent}</p>`;
      articleContainer.innerHTML += itemHTML;

      // Update the navigation bar for the current item
      document.getElementById('current-article-number').textContent = index + 1;
      document.getElementById('total-articles').textContent = currentFeed.length;
    });
  } else {
    // Log if the element is not found
    console.error('articleContainer not found');
  }
}




// Function to navigate to the next item
function nextItem() {
  if (currentSiteIndex < Object.keys(rssSites).length - 1) {
    currentSiteIndex++;
  } else {
    currentSiteIndex = 0; // Wrap around to the first feed
  }
  displayCurrentSite();
}

function previousItem() {
  if (currentSiteIndex > 0) {
    currentSiteIndex--;
  } else {
    currentSiteIndex = Object.keys(rssSites).length - 1; // Wrap around to the last feed
  }
  displayCurrentSite();
}


const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');

// Add event listeners for the buttons
nextButton.addEventListener('click', () => {
  // Call the function to navigate to the next item
  nextItem();
});

previousButton.addEventListener('click', () => {
  // Call the function to navigate to the previous item
  previousItem();
});

// Call displayCurrentSite to load the initial RSS feed
displayCurrentSite();
