const axios = require('axios');

// Replace with your API base URL
const apiBaseUrl = 'https://data.exactspace.co/exactapi';

async function fetchUserProfileByEmail(email) {
  try {
    const response = await axios.get(`${apiBaseUrl}/userprofiles?filter={"where":{"email":"${email}"}}`);
    const userProfile = response.data[0]; // Assuming only one user is returned
    return userProfile;
  } catch (error) {
    throw new Error('Error fetching user profile:', error.message);
  }
}

async function updateUserProfile(userProfileId, newEmail) {
  try {
    // Fetch the user profile by email
    const userProfile = await fetchUserProfileByEmail('peeyushsrj@gmail.com');

    if (!userProfile) {
      console.log('User profile not found.');
      return;
    }

    // Update email and username
    userProfile.email = newEmail;
    userProfile.username = newEmail; // You can adjust this as needed

    // Send POST request to update endpoint
    const updateResponse = await axios.post(`${apiBaseUrl}/update`, userProfile);

    if (updateResponse.status === 200) {
      console.log('User profile updated successfully.');
    } else {
      console.log('Failed to update user profile.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

const newEmailId = 'newemail@example.com'; // Replace with the new email
updateUserProfile(newEmailId);
