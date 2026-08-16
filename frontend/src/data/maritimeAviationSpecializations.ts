export interface SpecializationInfo {
  name: string;
  weight: number;
  category: string;
  demand: string;
  description: string;
  subjects: string[];
  roles: string[];
  rank?: number;
}

export const MARITIME_AVIATION_SPECIALIZATIONS_DATABASE: SpecializationInfo[] = [
  {
    rank: 1,
    name: "Nautical Science",
    weight: 90,
    category: "Maritime",
    demand: "High",
    description: "Study of the operation and navigation of ships.",
    subjects: ["Navigation", "Ship Stability", "Marine Meteorology"],
    roles: ["Deck Cadet", "Captain"]
  },
  {
    rank: 2,
    name: "Aviation Management",
    weight: 85,
    category: "Aviation",
    demand: "High",
    description: "Management of aviation industry, airports, and airlines.",
    subjects: ["Airport Management", "Air Traffic Control", "Aviation Law"],
    roles: ["Airport Manager", "Airline Operations Manager"]
  },
  {
    rank: 3,
    name: "Maritime Science & Ocean Engineering",
    weight: 88,
    category: "Maritime",
    demand: "High",
    description: "In-depth research on deep-sea hydrodynamic modeling, marine propulsion thermodynamics, structural design of shipping vessels, and eco-friendly fuels.",
    subjects: ["Ship Hydrodynamics", "Propulsion Thermodynamics", "Ocean Wave Mechanics", "Marine Fuel Chemistry"],
    roles: ["Marine Architect", "Ocean Research Officer", "Propulsion Field Specialist"]
  },
  {
    rank: 4,
    name: "Aeronautical Science & Flight Dynamics",
    weight: 92,
    category: "Aviation",
    demand: "Critical",
    description: "Explores structural design of sonic aircraft frames, flight controller software modeling, supersonic aerodynamic drag, and navigation kinematics.",
    subjects: ["Flight Dynamics & Control", "Supersonic Aerodynamics", "Avionics Computational Systems", "Navigation Kinematics"],
    roles: ["Aeronautical Scientist", "Aero Simulation Engineer", "Flight Control Programmer"]
  },
  {
    rank: 5,
    name: "Aircraft Maintenance Science & Safety Engineering",
    weight: 90,
    category: "Aviation",
    demand: "Critical",
    description: "Covers non-destructive metal testing (NDT), structural fatigue inspection models, digital sensor diagnostic boards, and engine overhaul protocols.",
    subjects: ["Non-Destructive Material Testing", "Aircraft Structural Fatigue", "Jet Turbine Diagnostics", "Aero Safety Protocols"],
    roles: ["Aircraft Maintenance Lead", "Aviation Safety Inspector", "Turbine Diagnostic Technician"]
  },
  {
    rank: 6,
    name: "Airline and Airport Management",
    weight: 89,
    category: "Aviation",
    demand: "High",
    description: "Logistical management of airport terminals, aircraft scheduling allocation, luggage handling flow automation, and aviation civil laws compliance.",
    subjects: ["Airport Logistics & Terminal Flow", "Aviation Laws & Treaties", "Airlines Fleet Scheduling", "Emergency Airport Responses"],
    roles: ["Terminal Director", "Airline Fleet Manager", "Aviation Relations Executive"]
  }
];
