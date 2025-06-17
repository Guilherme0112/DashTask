import { convertNegative } from "../utils/maskValue";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function saveTopic(topic, id, isNegative) {

    const formData = new FormData();
    formData.append("name", topic.name);
    formData.append("description", topic.description);
    formData.append("value", convertNegative(topic.value, isNegative));
    formData.append("column_id", topic.columnId);
    if (id) formData.append("_method", "PATCH");

    try {
        const res = await fetch(id
            ? `${BACKEND_URL}/api/topics/${id}`
            : `${BACKEND_URL}/api/topics`, {
            method: "POST",
            credentials: "include",
            body: formData
        });

        if (!res.ok) {
            const error = await res.json();
            throw error;
        }

        const data = await res.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export async function deleteTopic(id) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/topics/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!res.ok) {
            const error = await res.json();
            throw error;
        }

    } catch (error) {
        throw error;
    }

}