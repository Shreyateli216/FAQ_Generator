export const MOCK_DRIFT_DATA = {
  lastDriftScan: "Today, 10:42 AM",
  driftScore: 12, // Lower is better
  status: "Healthy",
  recentEvents: [
    {
      id: "ev1",
      date: "Today, 08:30 AM",
      title: "New Search Term Detected",
      description: "Increase in users searching for 'offline mode API failover'.",
      actionNeeded: true
    },
    {
      id: "ev2",
      date: "Yesterday, 04:15 PM",
      title: "UI Update Deployed",
      description: "Visual drift detected in 'Settings' menu matching new primary blue hex.",
      actionNeeded: false
    },
    {
      id: "ev3",
      date: "2 days ago",
      title: "Documentation Synced",
      description: "RAG vectors updated with 4 new product release notes.",
      actionNeeded: false
    }
  ],
  trendChart: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Semantic Drift Index",
        data: [18, 16, 22, 14, 19, 11, 12],
        borderColor: "#A855F7",
        backgroundColor: "rgba(168, 85, 247, 0.2)",
      }
    ]
  }
};
