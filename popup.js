// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiToken', 'datasetId'], (result) => {
    document.getElementById('apiToken').value = result.apiToken || '';
    document.getElementById('datasetId').value = result.datasetId || '';
  });

  // Add event listeners to buttons
  document.getElementById('saveBtn').addEventListener('click', saveContent);
  document.getElementById('clearBtn').addEventListener('click', clearSettings);
});

// Save settings when input values change
document.getElementById('apiToken').addEventListener('change', saveSettings);
document.getElementById('datasetId').addEventListener('change', saveSettings);

function saveSettings() {
  const apiToken = document.getElementById('apiToken').value;
  const datasetId = document.getElementById('datasetId').value;
  
  chrome.storage.sync.set({
    apiToken: apiToken,
    datasetId: datasetId
  });
}

function clearSettings() {
  chrome.storage.sync.clear(() => {
    document.getElementById('apiToken').value = '';
    document.getElementById('datasetId').value = '';
    showStatus('Settings cleared', 'success');
  });
}

function showStatus(message, type = '') {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
  setTimeout(() => {
    status.textContent = '';
    status.className = 'status';
  }, 3000);
}

async function saveContent() {
  const apiToken = document.getElementById('apiToken').value;
  const datasetId = document.getElementById('datasetId').value;

  if (!apiToken || !datasetId) {
    showStatus('Please enter API token and Knowledge Base ID', 'error');
    return;
  }

  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Execute script to get page content
    const [{result: pageContent}] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Get page title and content
        const title = document.title;
        const content = document.body.innerText;
        return { title, content };
      }
    });

    // Send content to Dify API
    const response = await fetch(`http://localhost:80/v1/datasets/${datasetId}/document/create_by_text`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: pageContent.title,
        text: pageContent.content,
        indexing_technique: "high_quality",
        process_rule: {
          mode: "automatic"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    showStatus('Content saved successfully!', 'success');
  } catch (error) {
    console.error('Error:', error);
    showStatus('Failed to save content. Please check your settings.', 'error');
  }
} 