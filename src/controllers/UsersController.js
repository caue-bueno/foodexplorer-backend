const AppError = require('../utils/AppError');


class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name) {
      throw new AppError('O nome é obrigatório');
    }

    const userExists = await knex("users").select(["*"]).where("users.email", email)
    if (userExists.length > 0) {
      throw new AppError('Este email já está em uso!');
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    return response.json({ name, email, password: hashedPassword });
  }
}

module.exports = UsersController;
