import axios from "axios";

const API_URL = "http://localhost:9090/api"; // backend base URL

// ---------------- Actors ----------------

// Create a new actor
export const createActor = async (actorData) => {
  const response = await axios.post(`${API_URL}/actors`, actorData);
  return response.data.data || response.data; // return the created actor directly
};

// Get actor by ID
export const getActorById = async (id) => {
  const response = await axios.get(`${API_URL}/actors/${id}`);
  return response.data.data || response.data;
};

// Get actors by role (FARMER, DISTRIBUTOR, RETAILER)
export const getActorsByRole = async (role) => {
  const response = await axios.get(`${API_URL}/actors/role/${role}`);
  return response.data.data || []; // return array of actors directly
};

// ---------------- Produces ----------------

// Add a new produce
export const addProduce = async (produceData) => {
  const response = await axios.post(`${API_URL}/produces`, produceData);
  return response.data.data || response.data;
};

// Get produce by ID
export const getProduceById = async (id) => {
  const response = await axios.get(`${API_URL}/produces/${id}`);
  return response.data.data || response.data;
};

// Get produces owned by a specific actor
export const getProducesByOwner = async (actorId) => {
  const response = await axios.get(`${API_URL}/produces/owner/${actorId}`);
  return response.data.data || [];
};

// Get **all produces** (new endpoint)
export const getAllProduces = async () => {
  const response = await axios.get(`${API_URL}/produces/all`);
  return response.data.data || response.data; // return array of produces
};



// Transfer produce from one actor to another
export const transferProduce = async (transferData) => {
  const response = await axios.post(`${API_URL}/produces/transfer`, transferData);
  return response.data.data || response.data;
};

// Get produce history by produceId
export const getProduceHistory = async (produceId) => {
  const response = await axios.get(`${API_URL}/produces/${produceId}/history`);
 
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};





// ---------------- Dashboard / Counts ----------------


export const getTotalProducesCount = async () => {
  const response = await axios.get(`${API_URL}/produces/count`);
  return response.data.data || response.data; 
};

export const getProducesCountByStatus = async (status) => {
  const response = await axios.get(`${API_URL}/produces/count/status/${status}`);
  return response.data.data || response.data; 
};

export const getProducesCountByOwner = async (ownerId) => {
  const response = await axios.get(`${API_URL}/produces/count/owner/${ownerId}`);
  return response.data.data || response.data;
};