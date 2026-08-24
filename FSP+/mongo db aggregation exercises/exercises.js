// mongodb aggregation drills on throwaway data. nothing here touches your projects.
//
//   npm i mongoose dotenv
//   MONGO_URI=mongodb://localhost:27017/aggdrills   (in .env)
//   node agg-exercises.js seed     <- wipes and refills the drill db
//   node agg-exercises.js 4        <- runs exercise 4
//
// each exercise: the question, an empty array for your attempt, the answer right under it.
// the runner uses your array if you filled it in, otherwise it falls back to mine.

require("dotenv").config();
const mongoose = require("mongoose");

const oid = (s) => new mongoose.Types.ObjectId("6500000000000000000000" + s);
const days = (n) => new Date(Date.now() - n * 86400000);

// agents
const AGENTS = [
  { _id: oid("a1"), name: "Riya" },
  { _id: oid("a2"), name: "Karan" },
  { _id: oid("a3"), name: "Meera" },
  { _id: oid("a4"), name: "Dev" },
];

// tickets: status enum, priority enum, hours number, agent ref, watchers array, dates
const TICKETS = [
  {
    title: "login 500 error",
    status: "Resolved",
    priority: "High",
    hours: 3,
    agent: oid("a1"),
    watchers: [oid("a2"), oid("a3")],
    createdAt: days(20),
    resolvedAt: days(2),
  },
  {
    title: "refund not credited",
    status: "Resolved",
    priority: "Medium",
    hours: 5,
    agent: oid("a1"),
    watchers: [oid("a3")],
    createdAt: days(15),
    resolvedAt: days(3),
  },
  {
    title: "crash on upload",
    status: "Open",
    priority: "High",
    hours: 8,
    agent: oid("a2"),
    watchers: [oid("a1"), oid("a4")],
    createdAt: days(9),
    resolvedAt: null,
  },
  {
    title: "cannot reset password",
    status: "Resolved",
    priority: "Low",
    hours: 1,
    agent: oid("a2"),
    watchers: [],
    createdAt: days(30),
    resolvedAt: days(6),
  },
  {
    title: "slow dashboard",
    status: "Pending",
    priority: "High",
    hours: 6,
    agent: oid("a3"),
    watchers: [oid("a1")],
    createdAt: days(12),
    resolvedAt: null,
  },
  {
    title: "invoice pdf blank",
    status: "Resolved",
    priority: "Medium",
    hours: 2,
    agent: oid("a3"),
    watchers: [oid("a2"), oid("a4")],
    createdAt: days(11),
    resolvedAt: days(1),
  },
  {
    title: "duplicate emails",
    status: "Open",
    priority: "Low",
    hours: 2,
    agent: oid("a3"),
    watchers: [],
    createdAt: days(4),
    resolvedAt: null,
  },
  {
    title: "sso login loop",
    status: "Resolved",
    priority: "High",
    hours: 9,
    agent: oid("a4"),
    watchers: [oid("a1")],
    createdAt: days(25),
    resolvedAt: days(5),
  },
  {
    title: "csv export missing",
    status: "Pending",
    priority: "Medium",
    hours: 4,
    agent: oid("a4"),
    watchers: [oid("a2")],
    createdAt: days(7),
    resolvedAt: null,
  },
  {
    title: "otp delay on mobile",
    status: "Resolved",
    priority: "Low",
    hours: 3,
    agent: oid("a1"),
    watchers: [oid("a4")],
    createdAt: days(18),
    resolvedAt: days(4),
  },
  {
    title: "dark mode broken",
    status: "Open",
    priority: "Medium",
    hours: 2,
    agent: oid("a2"),
    watchers: [oid("a3")],
    createdAt: days(2),
    resolvedAt: null,
  },
  {
    title: "webhook retries fail",
    status: "Resolved",
    priority: "High",
    hours: 7,
    agent: oid("a2"),
    watchers: [oid("a1"), oid("a3"), oid("a4")],
    createdAt: days(21),
    resolvedAt: days(6),
  },
];

const PRIORITY_RANK = { High: 1, Medium: 2, Low: 3 };

// ---- 1 --------------------------------------------------------
// Show every ticket that is still not resolved and is marked High priority.
// Return the whole ticket document, don't reshape anything.
// You should get 2 back.
// One stage is enough here. It is the same filter object you would pass to find().
const q1 = [];

// answer
const a1 = [{ $match: { priority: "High", status: { $ne: "Resolved" } } }];

// ---- 2 --------------------------------------------------------
// Count how many tickets are sitting in each status.
// Output should look like [{ status: "Resolved", count: 7 }, ...], biggest first,
// and it should NOT have an _id field in it.
// You are bucketing documents, so you need the stage that collapses many docs into few.
// Careful: the _id inside that stage means "what am I bucketing by", not the document id.
const q2 = [];

// answer
const a2 = [
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $project: { _id: 0, status: "$_id", count: 1 } },
  { $sort: { count: -1 } },
];

// ---- 3 --------------------------------------------------------
// For everything that is not resolved yet, add up the hours still outstanding
// and tell me how many tickets that is.
// Expected: 5 tickets, 22 hours total.
// This is one single number for the whole collection, not a number per group,
// so think about what you use as the bucket key when there are no buckets.
const q3 = [];

// answer
const a3 = [
  { $match: { status: { $ne: "Resolved" } } },
  {
    $group: {
      _id: null,
      totalHours: { $sum: "$hours" },
      ticketCount: { $sum: 1 },
    },
  },
];
// _id: null means one bucket holding everything.
// comes back as an array of one, or an empty array if nothing matched,
// so read it as out[0]?.totalHours ?? 0

// ---- 4 --------------------------------------------------------
// Who has closed the most tickets? Count resolved tickets per agent and show the
// agent's actual name, not their id. Busiest agent first.
// Expected: Riya 3, Karan 2, then Meera and Dev with 1 each.
// The names live in a different collection, so you need to join.
// Order matters: you count first, and after that the _id of each row IS the agent id,
// which is what you join on.
const q4 = [];

// answer
const a4 = [
  { $match: { status: "Resolved" } },
  { $group: { _id: "$agent", count: { $sum: 1 } } },
  {
    $lookup: {
      from: "agents",
      localField: "_id",
      foreignField: "_id",
      as: "info",
    },
  },
  { $unwind: "$info" },
  { $project: { _id: 0, agentId: "$_id", agentName: "$info.name", count: 1 } },
  { $sort: { count: -1 } },
];
// $lookup always hands back an array, even for a single match, hence the $unwind.
// this pair is what populate() does under the hood.

// ---- 5 --------------------------------------------------------
// How many tickets is each person watching?
// Expected: Riya 4, Meera 4, Dev 4, Karan 3.
// The catch: watchers is an array, so one ticket can belong to three people.
// If you bucket on the array itself, [Riya, Karan] and [Riya, Meera] count as two
// completely different groups, which is not what you want. Flatten it first.
const q5 = [];

// answer
const a5 = [
  { $unwind: "$watchers" }, // one doc per watcher. tickets with [] drop out here.
  { $group: { _id: "$watchers", watching: { $sum: 1 } } },
  {
    $lookup: {
      from: "agents",
      localField: "_id",
      foreignField: "_id",
      as: "info",
    },
  },
  { $unwind: "$info" }, // different job: unpacking a join result, always length 1
  { $project: { _id: 0, name: "$info.name", watching: 1 } },
  { $sort: { watching: -1 } },
];
// two unwinds in one pipeline doing two unrelated things. know the difference.

// ---- 6 --------------------------------------------------------
// Sort all 12 tickets so the most urgent ones come first.
// Sorting on the priority field directly gives you High, Low, Medium, because it is
// a string and strings sort alphabetically. Useless.
// So: give each ticket a number (High 1, Medium 2, Low 3), sort on that number,
// then remove the number again so it never reaches the frontend.
const q6 = [];

// answer
const a6 = [
  {
    $addFields: {
      rank: {
        $switch: {
          branches: [
            { case: { $eq: ["$priority", "High"] }, then: PRIORITY_RANK.High },
            {
              case: { $eq: ["$priority", "Medium"] },
              then: PRIORITY_RANK.Medium,
            },
            { case: { $eq: ["$priority", "Low"] }, then: PRIORITY_RANK.Low },
          ],
          default: 99,
        },
      },
    },
  },
  { $sort: { rank: 1 } },
  { $project: { rank: 0 } }, // exclusion only, you cant mix 1s and 0s in one $project
];

// ---- 7 --------------------------------------------------------
// Same urgency sort, but paginated: give me page 2 with 5 tickets per page.
// Two things that will bite you.
// One: skipping and limiting has to happen after the sort, otherwise you are
// paginating a random pile.
// Two: 5 tickets share the same priority, and mongo does not promise a stable order
// for ties, so the same ticket can show up on page 1 and again on page 2.
// Add a second field to sort on to break the tie.
const page = 2;
const limit = 5;

const q7 = [];

// answer
const a7 = [
  a6[0], // same $addFields as above
  { $sort: { rank: 1, createdAt: -1 } }, // createdAt breaks the tie
  { $skip: (page - 1) * limit },
  { $limit: limit },
  { $project: { rank: 0 } },
];

// ---- 8 --------------------------------------------------------
// Data for a bar chart: how many tickets were resolved on each of the last 7 days.
// Expected: 6 rows, and one of those days has 2 tickets on it.
// The trap: resolvedAt is a full timestamp down to the millisecond, so bucketing on
// it raw gives you one bucket per ticket. Turn it into a "2026-08-24" string first
// and bucket on that.
const q8 = [];

// answer
const a8 = [
  { $match: { status: "Resolved", resolvedAt: { $gte: days(7) } } },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$resolvedAt" } },
      count: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
];

// ---- 9 --------------------------------------------------------
// One row per agent showing their name, total hours logged, average hours per
// ticket (rounded to 1 decimal), and how many tickets they have. Most hours first.
// Expected: Karan 18h over 4 tickets, Dev 13h over 2, Riya 11h over 3, Meera 10h over 3.
// You can run more than one accumulator off the same bucketing stage.
const q9 = [];

// answer
const a9 = [
  {
    $group: {
      _id: "$agent",
      totalHours: { $sum: "$hours" },
      avgHours: { $avg: "$hours" },
      tickets: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "agents",
      localField: "_id",
      foreignField: "_id",
      as: "info",
    },
  },
  { $unwind: "$info" },
  {
    $project: {
      _id: 0,
      name: "$info.name",
      totalHours: 1,
      avgHours: { $round: ["$avgHours", 1] },
      tickets: 1,
    },
  },
  { $sort: { totalHours: -1 } },
];

// ---- 10 -------------------------------------------------------
// Filter tickets by a specific agent, then count them by status.
// Expected for Karan: 2 Open, 2 Resolved.
// The id below is a string, the way it arrives from req.query in a real route.
// find() quietly converts that string into an ObjectId for you using the schema.
// An aggregation does not: it goes straight to the driver, so a string is compared
// against an ObjectId, matches nothing, and returns [] with no error at all.
// Convert it yourself.
const agentIdFromUrl = "6500000000000000000000a2"; // pretend this is req.query.agent

const q10 = [];

// answer
const a10 = [
  { $match: { agent: new mongoose.Types.ObjectId(agentIdFromUrl) } },
  { $group: { _id: "$status", count: { $sum: 1 } } },
];
// swap in the raw string and run it again. empty array, no error. that is the lesson.

// ---------------------------------------------------------------

const MINE = {
  1: q1,
  2: q2,
  3: q3,
  4: q4,
  5: q5,
  6: q6,
  7: q7,
  8: q8,
  9: q9,
  10: q10,
};
const ANSWERS = {
  1: a1,
  2: a2,
  3: a3,
  4: a4,
  5: a5,
  6: a6,
  7: a7,
  8: a8,
  9: a9,
  10: a10,
};

async function seed(db) {
  await db.collection("agents").deleteMany({});
  await db.collection("tickets").deleteMany({});
  await db.collection("agents").insertMany(AGENTS);
  await db.collection("tickets").insertMany(TICKETS);
  console.log(`seeded ${AGENTS.length} agents, ${TICKETS.length} tickets`);
}

async function main() {
  const arg = process.argv[2];
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;

  if (arg === "seed") {
    await seed(db);
  } else {
    const n = Number(arg) || 1;
    const mine = MINE[n];
    const pipeline = mine && mine.length ? mine : ANSWERS[n];
    console.log(
      `exercise ${n}, running ${mine && mine.length ? "yours" : "the answer"}`,
    );
    const out = await db.collection("tickets").aggregate(pipeline).toArray();
    console.dir(out, { depth: null });
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
