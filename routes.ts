const baseRoute = `${process.env.NEXT_PUBLIC_DOMAIN}/api`;

export const ADMIN_API_ROUTES = {
  SIGNIN: `${baseRoute}/admin/sign-in`,
  CREATE_JOB: `${baseRoute}/admin/create-job`,
  JOB_DETAILS: `${baseRoute}/admin/job-details`,
  DASHBOARD_SCRAPING_CHART_DATA: "/admin/dashboard/scraping-chart-data",
  DASHBOARD_METRICS: "/admin/dashboard/metrics",
};

export const USER_API_ROUTES = {
  GET_ALL_TRIPS: "/all-trips",
  GET_CITY_TRIPS: "/city-trips",
  TRIP_DATA: `${baseRoute}/trips`,
  CREATE_BOOKING: `${baseRoute}/booking`,
  GET_USER_BOOKINGS: "/booking/get-bookings",
  FLIGHT_SCRAPE: "/flights/scrape",
  FLIGHT_SCRAPE_STATUS: "/flights/scrape-status",
  HOTELS_SCRAPE: "/hotels/scrape",
  HOTELS_SCRAPE_STATUS: "/hotels/scrape-status",
  GET_ALL_HOTELS: "/all-hotels",
  GET_ALL_BOOKINGS: "/booking",
};

export const AUTH_API_ROUTES = {
  SIGN_IN: `${baseRoute}/auth/sign-in`,
  SIGN_UP: `${baseRoute}/auth/sign-up`,
  ME: `${baseRoute}/auth/me`,
};
