export const Config = {
    radiusMeters: 20,
    teleportLocations: {
        entry: { label: "Einreise", coordinates: { x: -1037.2, y: -2737.9, z: 20.1 } },
        commandEnter: { label: "Dienstbereich", coordinates: { x: -1072.4, y: -2840.6, z: 20.8 } },
        commandExit: { label: "Vorheriger Standort", coordinates: { x: -1030.0, y: -2720.0, z: 20.8 } }
    },
    bans: {
        secondChanceHours: 2,
        exitDays: 4,
        permanentReason: "Verstoß gegen Einreisebestimmungen"
    },
    commands: {
        enterImmigration: "/rein",
        leaveImmigration: "/raus"
    },
    players: [
        { id: 1, name: "Synwox", callsign: "HRD", distance: 6 },
        { id: 2, name: "Mia", callsign: "HRD", distance: 9 },
        { id: 3, name: "Noah", callsign: "HRD", distance: 11 },
        { id: 4, name: "Lea", callsign: "HRD", distance: 14 }
    ]
};
