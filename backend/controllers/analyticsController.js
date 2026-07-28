const VisitorAnalytics = require('../models/VisitorAnalytics');
const sendResponse = require('../utils/responseHandler');
const asyncHandler = require('../middleware/asyncHandler');

// Track page visit hit
exports.trackVisit = asyncHandler(async (req, res) => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = days[now.getDay()];

  let record = await VisitorAnalytics.findOne({ date: dateStr });
  if (!record) {
    record = new VisitorAnalytics({
      date: dateStr,
      dayName: dayName,
      visitors: 1
    });
  } else {
    record.visitors += 1;
  }

  await record.save();
  return sendResponse(res, 200, 'Visit tracked', { visitors: record.visitors });
});

// Get past 7 days traffic data for Admin Dashboard
exports.getWeeklyTraffic = asyncHandler(async (req, res) => {
  const result = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate last 7 days array
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = days[d.getDay()];

    const record = await VisitorAnalytics.findOne({ date: dateStr });
    result.push({
      name: dayName,
      date: dateStr,
      visitors: record ? record.visitors : 0
    });
  }

  return sendResponse(res, 200, 'Weekly traffic fetched', result);
});
