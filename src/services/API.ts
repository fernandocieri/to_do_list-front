import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v0";

export const getDuties = async () => {
  try {
    const duties = await axios.get(`${BASE_URL}/duties/`);
    return duties.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

export const postDuty = async (name: string) => {
  try {
    const newDuty = await axios.post(`${BASE_URL}/duties/`, { name: name });
    console.log(newDuty);
    return newDuty.data.message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

export const patchDuty = async (id: string, name?: string, done?: boolean) => {
  try {
    await axios.patch(`${BASE_URL}/duties/${id}`, { name: name, done: done });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

export const deleteDuty = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/duties/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
