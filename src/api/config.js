const env = process.env.APP_ENV;

const config = {
  dev: {
    APP_API_URL: process.env.REACT_APP_API_URL,
  },
  stage: {
    APP_API_URL: process.env.REACT_APP_API_URL,
  },
  prod: {
    APP_API_URL: process.env.REACT_APP_API_URL,
  },
};

export const { APP_API_URL } = config[env] || config.dev;

export const login_path = '/users/login';
export const verification_code_path = '/users/otp';
export const email_verification_path = '/users/verification';
export const token_verification_path = '/users/token/verification';
export const logout_path = '/users/logout';
export const profile_path = '/users/profile';
export const forgot_password_path = '/users/password-reset-request';
export const change_password_path = '/users/password-reset';

export const dashboard_summary_path = '/dashboard/summary';
export const orders_overview_path = '/dashboard/orders-overview';
export const sales_graph_path = '/dashboard/sales-graph';
export const activity_log_path = '/users/activity-logs';

export const inventory_add_path = 'inventory/add';
export const inventory_list_path = 'inventory/list';
export const inventory_update_path = 'inventory/update';
export const inventory_delete_path = 'inventory/delete';

export const order_add_path = 'orders/add';
export const order_list_path = 'orders/list';
export const order_update_path = 'orders/update';
export const order_delete_path = 'orders/delete';

export const user_add_path = 'users/add';
export const user_list_path = 'users/list';
export const user_update_path = 'users/update';
export const user_delete_path = 'users/delete';

