// Offline-first storage service for farmer app
// Backend-ready: this service can be extended to sync with APIs later

export interface CropObservation {
  id: string;
  cropId: string;
  date: string;
  photos: string[]; // base64 encoded images for offline storage
  notes: string;
  notesBangla: string;
  growthStage: 'nursery' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  healthStatus: 'healthy' | 'warning' | 'disease' | 'pest';
  synced: boolean; // for future backend sync
}

export interface LocalStorageData {
  observations: CropObservation[];
  lastSync: string | null;
}

class StorageService {
  private readonly STORAGE_KEY = 'farmer-app-data';

  // Get all data from local storage
  private getData(): LocalStorageData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : { observations: [], lastSync: null };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { observations: [], lastSync: null };
    }
  }

  // Save data to local storage
  private saveData(data: LocalStorageData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Save new observation
  saveObservation(observation: Omit<CropObservation, 'id' | 'synced'>): CropObservation {
    const data = this.getData();
    const newObservation: CropObservation = {
      ...observation,
      id: Date.now().toString(),
      synced: false,
    };
    
    data.observations.push(newObservation);
    this.saveData(data);
    return newObservation;
  }

  // Get all observations
  getObservations(): CropObservation[] {
    return this.getData().observations;
  }

  // Get observations for a specific crop
  getObservationsByCrop(cropId: string): CropObservation[] {
    return this.getData().observations.filter(obs => obs.cropId === cropId);
  }

  // Update observation
  updateObservation(id: string, updates: Partial<CropObservation>): boolean {
    const data = this.getData();
    const index = data.observations.findIndex(obs => obs.id === id);
    
    if (index !== -1) {
      data.observations[index] = { ...data.observations[index], ...updates, synced: false };
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Delete observation
  deleteObservation(id: string): boolean {
    const data = this.getData();
    const initialLength = data.observations.length;
    data.observations = data.observations.filter(obs => obs.id !== id);
    
    if (data.observations.length !== initialLength) {
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Get unsynced observations (for future backend sync)
  getUnsyncedObservations(): CropObservation[] {
    return this.getData().observations.filter(obs => !obs.synced);
  }

  // Mark observations as synced (for future backend sync)
  markAsSynced(observationIds: string[]): void {
    const data = this.getData();
    data.observations = data.observations.map(obs =>
      observationIds.includes(obs.id) ? { ...obs, synced: true } : obs
    );
    data.lastSync = new Date().toISOString();
    this.saveData(data);
  }

  // Clear all data (for testing or reset)
  clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const storageService = new StorageService();