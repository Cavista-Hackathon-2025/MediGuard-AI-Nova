import axios from "axios"

const BASE_URL = "https://mediguard-api.onrender.com/api/v1"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    })
    return config
  },
  (error) => {
    console.error("❌ Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor for logging
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠ No auth token found, API request might fail.");
    }
    return config;
  });


export const createAccount = async (fullName: string, email: string, password: string, phoneNumber: string) => {
  try {
    // Match the expected API payload structure
    const payload = {
      name: fullName,
      email_address: email,
      password: password,
      phone_number: phoneNumber,
    }

    console.log("📝 Creating account with payload:", payload)

    const response = await api.post("/users", payload)

    // Extract user data from the response matching the API structure
    const {
      data: {
        data: { user },
      },
    } = response

    // Store relevant user data
    const userData = {
      id: user.user_id,
      name: user.name,
      email: user.email_address,
      createdAt: user.created_at,
    }

    // Store auth data in localStorage
    localStorage.setItem("user", JSON.stringify(userData))

    return userData
  } catch (error) {
    console.error("Failed to create account:", error)
    throw error
  }
}

export const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email, password);
  
      const response = await api.post("/auth/login", {
        email_address: email,
        password,
      });
  
      console.log("Login API Response:", response);
  
      const { data } = response;
  
      if (data?.status === "success" && data.data?.token) {
        const token = data.data.token;
        const user = data.data.user; // ✅ Extract user details correctly
  
        if (!user) {
          console.error("❌ No user data returned from API!");
          throw new Error("Invalid user data from server.");
        }
  
        // ✅ Store token & user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
  
        console.log("✔ Token stored:", token);
        console.log("✔ User stored:", user);
  
        return user;
      } else {
        console.error("❌ Login failed, response:", data);
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("❌ Failed to login:", error);
  
      if (axios.isAxiosError(error) && error.response) {
        console.log("⚠ API Error Response:", error.response.data);
      }
  
      throw error;
    }
  };
  

// ✅ Symptom Checker (POST)
export const SymptomChecker = async (message: string) => {
  try {
    console.log("🔎 Checking symptoms:", message);
    const response = await api.post("/symptomchecker", { message });
    console.log("Symptom Checker API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to check symptoms:", error);
    throw error;
  }
};

// ✅ Get Symptom Data (GET)
export const GetSymptomChecker = async () => {
  try {
    console.log("📡 Fetching symptom data...");
    const response = await api.get("/symptomchecker");
    console.log("✔ Symptom Checker Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to get symptom data:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    localStorage.removeItem("user")
  } catch (error) {
    console.error("Failed to logout:", error)
    throw error
  }
}

export const getUserProfile = async () => {
  try {
    const userData = localStorage.getItem("user")
    if (!userData) {
      return null
    }
    return JSON.parse(userData)
  } catch (error) {
    console.error("Failed to get user profile:", error)
    throw error
  }
}

interface MedicationReminder {
  medication_remainder_id: string
  medication_name: string
  medication_dose: string
  medication_time: string
  repeat_interval: number
  medication_date: string
  last_sent: string | null
  schedule: string
}

interface MedicationReminderResponse {
  status: string
  message: string
  data: {
    medicationRemainders: MedicationReminder[] // Array of medication reminders
  }
}


interface MedicationRemindersResponse {
  status: string
  message: string
  data: {
    medicationRemainders: MedicationReminder[]
  }
}

export const createMedicationReminder = async (
  reminderData: Omit<MedicationReminder, "medication_remainder_id" | "schedule">,
) => {
  try {
    const response = await api.post<MedicationReminderResponse>("/medication-remainder/", reminderData)
    console.log("Medication Reminder Creation Response:", response.data)
    return response.data
  } catch (error) {
    console.error("Failed to create medication reminder:", error)
    throw error
  }
}

export const getMedicationReminders = async () => {
  try {
    const response = await api.get<MedicationRemindersResponse>("/medication-remainder")
    console.log("Medication Reminders Retrieved:", response.data)
    return response.data
  } catch (error) {
    console.error("Failed to get medication reminders:", error)
    throw error
  }
}



