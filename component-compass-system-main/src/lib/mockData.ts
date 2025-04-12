import { Component, LendingRecord, Notification } from "./types";

export const mockComponents: Component[] = [
  {
    id: "1",
    name: "Arduino Uno",
    totalQuantity: 50,
    availableQuantity: 30,
    description: "Microcontroller board based on the ATmega328P",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "2",
    name: "Raspberry Pi 4",
    totalQuantity: 20,
    availableQuantity: 5,
    description: "Single-board computer with 4GB RAM",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    expectedRestock: new Date("2025-05-15")
  },
  {
    id: "3",
    name: "Breadboard",
    totalQuantity: 100,
    availableQuantity: 75,
    description: "Solderless prototyping board",
    imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c"
  },
  {
    id: "4",
    name: "LED (Red)",
    totalQuantity: 500,
    availableQuantity: 450,
    description: "Basic 5mm red LED",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: "5",
    name: "Resistor Kit",
    totalQuantity: 30,
    availableQuantity: 28,
    description: "Kit containing various resistor values",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: "6",
    name: "ESP32",
    totalQuantity: 40,
    availableQuantity: 22,
    description: "Wi-Fi & Bluetooth microcontroller",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    expectedRestock: new Date("2025-06-10")
  }
];

export const mockLendings: LendingRecord[] = [
  {
    id: "1",
    rollNumber: "22CSA52",
    componentId: "1",
    componentName: "Arduino Uno",
    quantity: 1,
    borrowDate: new Date("2023-03-15"),
    returnDate: new Date("2023-03-22"),
    status: "returned"
  },
  {
    id: "2",
    rollNumber: "22CSA52",
    componentId: "3",
    componentName: "Breadboard",
    quantity: 2,
    borrowDate: new Date("2023-04-05"),
    returnDate: null,
    status: "approved"
  },
  {
    id: "3",
    rollNumber: "21ECE45",
    componentId: "2",
    componentName: "Raspberry Pi 4",
    quantity: 1,
    borrowDate: new Date("2023-04-10"),
    returnDate: null,
    status: "approved"
  },
  {
    id: "4",
    rollNumber: "23CSB12",
    componentId: "5",
    componentName: "Resistor Kit",
    quantity: 1,
    borrowDate: new Date("2023-03-28"),
    returnDate: new Date("2023-04-15"),
    status: "returned"
  },
  {
    id: "5",
    rollNumber: "21ECE45",
    componentId: "4",
    componentName: "LED (Red)",
    quantity: 10,
    borrowDate: new Date("2023-04-02"),
    returnDate: null,
    status: "approved"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Borrow Request",
    message: "Student 22CSA52 requested to borrow Arduino Uno (1 unit)",
    type: "borrow-request",
    lendingId: "6",
    date: new Date("2025-04-08T10:30:00"),
    read: false
  },
  {
    id: "2",
    title: "New Return Request",
    message: "Student 21ECE45 requested to return Raspberry Pi 4 (1 unit)",
    type: "return-request",
    lendingId: "3",
    date: new Date("2025-04-08T09:15:00"),
    read: false
  },
  {
    id: "3",
    title: "New Borrow Request",
    message: "Student 23CSB12 requested to borrow ESP32 (2 units)",
    type: "borrow-request",
    lendingId: "7",
    date: new Date("2025-04-07T14:45:00"),
    read: true
  },
  {
    id: "4",
    title: "New Return Request",
    message: "Student 22CSA52 requested to return Breadboard (2 units)",
    type: "return-request",
    lendingId: "2",
    date: new Date("2025-04-07T11:20:00"),
    read: true
  },
];

export const mockPendingLendings: LendingRecord[] = [
  {
    id: "6",
    rollNumber: "22CSA52",
    componentId: "1",
    componentName: "Arduino Uno",
    quantity: 1,
    borrowDate: new Date("2025-04-08"),
    returnDate: null,
    purpose: "IoT Project",
    status: "pending"
  },
  {
    id: "7",
    rollNumber: "23CSB12",
    componentId: "6",
    componentName: "ESP32",
    quantity: 2,
    borrowDate: new Date("2025-04-07"),
    returnDate: null,
    purpose: "Smart Home Project",
    status: "pending"
  },
];

const allLendings = [...mockLendings, ...mockPendingLendings];

export const getLendingsByRollNumber = (rollNumber: string): LendingRecord[] => {
  return allLendings.filter(lending => lending.rollNumber === rollNumber);
};

export const getUnreturnedLendingsByRollNumber = (rollNumber: string): LendingRecord[] => {
  return allLendings.filter(lending => 
    lending.rollNumber === rollNumber && lending.returnDate === null
  );
};

export const getLendingById = (id: string): LendingRecord | undefined => {
  return allLendings.find(lending => lending.id === id);
};

export const updateLendingStatus = (id: string, status: LendingRecord['status']): void => {
  const index = allLendings.findIndex(lending => lending.id === id);
  if (index !== -1) {
    allLendings[index] = { ...allLendings[index], status };
  }
};

export const formatDate = (date: Date | null): string => {
  if (!date) return "Not returned";
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
