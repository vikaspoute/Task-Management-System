const BASE_URL = "http://localhost:8080";

const urlList = {
  authenticator: {
    LOGIN: `${BASE_URL}/user/login`,
    CURRENT_USER: `${BASE_URL}/user/current-user`,
  },
  user: {
    CREATE_USER: `${BASE_URL}/user/register-user`,
    GET_USERS: `${BASE_URL}/user/get-users`,
    GET_USER_BY_ID: `${BASE_URL}/user/get-user/`,
    DELETE_USER: `${BASE_URL}/user`,
    UPDATE_USER: `${BASE_URL}/user`,
  },
  task: {
    CREATE_TASK: `${BASE_URL}/task/add-task`,
    GET_TASKS: `${BASE_URL}/task/all-tasks`,
    DELETE_TASKS: `${BASE_URL}/task/delete-task/`,
    UPDATE_TASKS: `${BASE_URL}/task/update-task`,
    GET_TASK_BY_ID: `${BASE_URL}/task`
  }
};

export default urlList;
