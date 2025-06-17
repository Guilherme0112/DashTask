import { unmaskValue } from "../utils/maskValue";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function fetchColumns() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/column`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchColumn(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/column/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function saveColumn(column) {
  try {

    column.valueForKM = unmaskValue(column.valueForKM);

    const formData = new FormData();
    formData.append("name", column.name || "");
    formData.append("dateOfFleet", column.dateOfFleet || "");
    formData.append("startKM", column.startKM || "");
    formData.append("endKM", column.endKM || "");
    formData.append("valueForKM", column.valueForKM ?? 0);
    
    // Request
    const res = await fetch(`${BACKEND_URL}/api/column`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteColumn(id) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/column/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
