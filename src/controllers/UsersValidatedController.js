const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class UsersValidatedController {
  async index(request, response) {
    const { user } = request;

    const userExists = await knex("users").select(["*"]).where({ id: user.id });
    if (userExists.length === 0) {
      throw new AppError('Unauthorized', 401);
    }

    return response.status(201).json();
  }
}

module.exports = UsersValidatedController;
