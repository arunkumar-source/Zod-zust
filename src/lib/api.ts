interface Work {
  id: string
  title: string
  status: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'workdash_works'

const getWorksFromStorage = (): Work[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const saveWorksToStorage = (works: Work[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works))
}

export const fetchWorks = async (): Promise<Work[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getWorksFromStorage())
    }, 100)
  })
}

export const addWork = async (data: {
  title: string
  status: string
}): Promise<Work> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const works = getWorksFromStorage()
      const newWork: Work = {
        id: Date.now().toString(),
        title: data.title,
        status: data.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      works.push(newWork)
      saveWorksToStorage(works)
      resolve(newWork)
    }, 100)
  })
}

export const updateWork = async (id: string, data: any): Promise<Work> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const works = getWorksFromStorage()
      const index = works.findIndex(work => work.id === id)
      if (index === -1) {
        reject(new Error("Work not found"))
        return
      }
      works[index] = {
        ...works[index],
        ...data,
        updatedAt: new Date().toISOString()
      }
      saveWorksToStorage(works)
      resolve(works[index])
    }, 100)
  })
}

export const deleteWork = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const works = getWorksFromStorage()
      const filteredWorks = works.filter(work => work.id !== id)
      if (filteredWorks.length === works.length) {
        reject(new Error("Work not found"))
        return
      }
      saveWorksToStorage(filteredWorks)
      resolve()
    }, 100)
  })
}
