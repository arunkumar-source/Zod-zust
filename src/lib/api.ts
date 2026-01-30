import type { Work } from "@/Schema/validateSchema";


const api = "/api";

// Fetch all works
export const fetchWorks = async (): Promise<Work[]> => {
  try {
    console.log('Fetching works from:', `${api}`)
    const response = await fetch(`${api}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error('API returned non-JSON response');
    }
    
    const data = await response.json();
    console.log('Fetched data:', data)
    
    // Validate data structure
    if (!Array.isArray(data)) {
      console.warn('API returned non-array data:', data)
      return []
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching works:", error);
    // Return empty array if API fails
    return [];
  }
};

// Add a new work
export const addWork = async (data: { title: string; status: Work["status"] }): Promise<Work> => {
  try {
    const response = await fetch(`${api}/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newWork = await response.json();
    return newWork;
  } catch (error) {
    console.error("Error adding work:", error);
    throw error;
  }
};

// Update a work
export const updateWork = async (id: string, data: Partial<Work>): Promise<Work> => {
  try {
    const response = await fetch(`${api}/update/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedWork = await response.json();
    return updatedWork;
  } catch (error) {
    console.error("Error updating work:", error);
    throw error;
  }
};

// Delete a work
export const deleteWork = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${api}/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting work:", error);
    throw error;
  }
};
