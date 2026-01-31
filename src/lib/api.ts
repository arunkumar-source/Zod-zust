import type { Work } from "@/Schema/validateSchema";


const getApiBase = () => {
  if (import.meta.env.DEV) {
    return "/api"; 
  }
  return "https://workbackend.vercel.app/"; 
};

const api = getApiBase();

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
    // Return sample data for testing since backend doesn't have full CRUD endpoints
    console.warn('Using sample data for testing drag and drop functionality');
    return [
      {
        id: "sample-1",
        title: "Sample Task 1 - Try dragging me!",
        status: "todo" as const,
        createdAt: new Date().toISOString(),
      },
      {
        id: "sample-2", 
        title: "Sample Task 2 - In Progress",
        status: "inprogress" as const,
        createdAt: new Date().toISOString(),
      },
      {
        id: "sample-3",
        title: "Sample Task 3 - Done", 
        status: "done" as const,
        createdAt: new Date().toISOString(),
      }
    ];
  }
};

// Add a new work
export const addWork = async (data: { title: string; status: Work["status"] }): Promise<Work> => {
  // In production, backend doesn't have add endpoint, so use fallback
  if (!import.meta.env.DEV) {
    console.warn('Backend does not support adding works. Using local fallback.');
    const newWork: Work = {
      id: `local-${Date.now()}`,
      title: data.title,
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    return newWork;
  }

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
    // Fallback: create local work item
    const newWork: Work = {
      id: `local-${Date.now()}`,
      title: data.title,
      status: data.status,
      createdAt: new Date().toISOString(),
    };
    console.warn('Created local work item:', newWork);
    return newWork;
  }
};

// Update a work
export const updateWork = async (id: string, data: Partial<Work>): Promise<Work> => {
  // In production, backend doesn't have update endpoint, so use fallback
  if (!import.meta.env.DEV) {
    console.warn('Backend does not support updating works. Using local fallback.');
    
    // Get the current work from localStorage or return a basic one
    const existingWorks = JSON.parse(localStorage.getItem('workdash-storage') || '{}');
    const currentWork = existingWorks.state?.works?.find((w: Work) => w.id === id);
    
    if (!currentWork) {
      throw new Error(`Work with id ${id} not found`);
    }
    
    const updatedWork: Work = {
      ...currentWork,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return updatedWork;
  }

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
    // Fallback: create mock updated work
    const updatedWork: Work = {
      id,
      title: "Updated Task",
      status: data.status || "todo",
      createdAt: new Date().toISOString(),
      ...data,
    };
    console.warn('Created mock updated work:', updatedWork);
    return updatedWork;
  }
};

// Delete a work
export const deleteWork = async (id: string): Promise<void> => {
  // In production, backend doesn't have delete endpoint, so use fallback
  if (!import.meta.env.DEV) {
    console.warn('Backend does not support deleting works. Using local fallback.');
    return; // Just return success
  }

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
    // Fallback: just log the deletion
    console.warn('Mock deleted work item:', id);
    // Don't throw error so UI can continue
  }
};
