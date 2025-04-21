// Central API module that handles all data fetching
// This can be easily replaced with real API calls in the future

import * as conversationsAPI from "./conversations";
import * as usersAPI from "./users";
import * as dashboardAPI from "./dashboard";
import * as analyticsAPI from "./analytics";

// Export all API functions
export { conversationsAPI, usersAPI, dashboardAPI, analyticsAPI };
