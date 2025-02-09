document.addEventListener('DOMContentLoaded', async () => {
    const partyForm = document.getElementById('partyForm');
    const partyList = document.getElementById('partyList');
  
    // Fetch party data from the API and render it
    try {
      const response = await fetch('https://fsa-async-await.herokuapp.com/api/workshop/parties');
      const data = await response.json();
      renderPartyList(data);
    } catch (error) {
      console.log(error);
    }
  
    // Handle form submission
    partyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const location = document.getElementById('location').value;
      const description = document.getElementById('description').value;
  
      // Create a new party object
      const newParty = {
        name,
        date,
        time,
        location,
        description
      };
  
      // Send a POST request to add the new party
      try {
        const response = await fetch('https://fsa-async-await.herokuapp.com/api/workshop/parties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newParty)
        });
        const data = await response.json();
  
        // Add the new party to the party list
        renderParty(data);
  
        // Clear the form inputs
        partyForm.reset();
      } catch (error) {
        console.log(error);
      }
    });
  
    // Handle party deletion
    partyList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('delete-button')) {
        const partyId = event.target.dataset.partyId;
  
        // Send a DELETE request to remove the party
        try {
          await fetch(`https://fsa-async-await.herokuapp.com/api/workshop/parties/${partyId}`, {
            method: 'DELETE'
          });
  
          // Remove the deleted party from the party list
          event.target.parentElement.remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  
    // Render the party list
    function renderPartyList(parties) {
      parties.forEach(party => {
        renderParty(party);
      });
    }
  
    // Render a party item
    function renderParty(party) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${party.name}</strong><br>
        Date: ${party.date}<br>
        Time: ${party.time}<br>
        Location: ${party.location}<br>
        Description: ${party.description}<br>
        <button class="delete-button" data-party-id="${party.id}">Delete</button>
      `;
      partyList.appendChild(li);
    }
  });