const API_URL = process.env.JOB_API_URL;

// get jobs from API
export async function GetJobs() {

  try {
    
      if (!API_URL) {
      throw new Error('JOB_API_URL missing in .env');
    }

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return {
      valid: true,
      data
    };

  } catch (error) {

    console.error(error);

    return {
      valid: false,
      error: 'Cannot fetch WeLoveDevs API'
    };
  }
}

